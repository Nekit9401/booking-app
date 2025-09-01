const Booking = require('../models/Booking');

const checkRoomAvailability = async (roomId, checkIn, checkOut, excludeBookingId = null) => {
	const query = {
		room: roomId,
		status: 'active',
		checkIn: { $lt: checkOut },
		checkOut: { $gt: checkIn },
	};

	if (excludeBookingId) {
		query._id = { $ne: excludeBookingId };
	}

	const existingBooking = await Booking.findOne(query);
	return !existingBooking;
};

const createBooking = async (bookingData) => {
	const { room, checkIn, checkOut } = bookingData;

	const isAvailable = await checkRoomAvailability(room, checkIn, checkOut);
	if (!isAvailable) {
		throw new Error('Номер недоступен на выбранные даты');
	}

	const booking = await Booking.create(bookingData);

	await booking.populate('user', 'login');
	await booking.populate('room', 'number');

	return booking;
};

const getUserBookings = async (userId) => {
	return Booking.find({ user: userId }).populate('user', 'login').populate('room', 'number');
};

const getAllBookings = async () => {
	return Booking.find().populate('user', 'login').populate('room', 'number').sort({ createdAt: -1 });
};

const cancelBooking = async (bookingId, userId, isAdmin = false) => {
	const booking = await Booking.findById(bookingId);

	if (!booking) {
		throw new Error('Бронирование не найдено');
	}

	if (String(booking.user) !== userId && !isAdmin) {
		throw new Error('Недостаточно прав для отмены бронирования');
	}

	return Booking.findByIdAndUpdate(
		bookingId,
		{ status: 'cancelled' },
		{ returnDocument: 'after', runValidators: true }
	)
		.populate('user', 'login')
		.populate('room', 'number');
};

const updateBooking = async (bookingId, userId, updatedData, isAdmin = false) => {
	const { room, checkIn, checkOut } = updatedData;

	const booking = await Booking.findById(bookingId);

	if (!booking) {
		throw new Error('Бронь не найдена');
	}

	if (String(booking.user) !== userId && !isAdmin) {
		throw new Error('Недостаточно прав для изменения бронирования');
	}

	const isAvailable = await checkRoomAvailability(room, checkIn, checkOut);
	if (!isAvailable) {
		throw new Error('Номер недоступен на выбранные даты');
	}

	return Booking.findByIdAndUpdate(bookingId, updatedData, { returnDocument: 'after', runValidators: true })
		.populate('user', 'login')
		.populate('room', 'number');
};

module.exports = {
	createBooking,
	getUserBookings,
	getAllBookings,
	cancelBooking,
	updateBooking,
	checkRoomAvailability,
};
