const Booking = require('../models/Booking');
const Room = require('../models/Room');

const getRooms = async (filters = {}, sort = {}, pagination = {}) => {
	const { type, minPrice, maxPrice, guests } = filters;

	const { sortBy = 'price', sortOrder = 'asc' } = sort;

	const { page = 1, limit = 6 } = pagination;

	const query = {};

	if (type) {
		query.type = type;
	}

	if (minPrice || maxPrice) {
		query.price = {};

		if (minPrice) query.price.$gte = parseInt(minPrice);
		if (maxPrice) query.price.$lte = parseInt(maxPrice);
	}

	if (guests) {
		query.guests = parseInt(guests);
	}

	const sortOptions = {};
	sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

	const [rooms, totalCount] = await Promise.all([
		Room.find(query)
			.sort(sortOptions)
			.skip((page - 1) * limit)
			.limit(parseInt(limit)),
		Room.countDocuments(query),
	]);

	return {
		rooms,
		pagination: {
			page: parseInt(page),
			limit: parseInt(limit),
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	};
};

const getRoomBookings = async (roomId) => {
	const bookings = await Booking.find({
		room: roomId,
		status: 'active',
	}).select('checkIn checkOut');

	return bookings;
};

const getRoom = async (id) => {
	const room = await Room.findById(id);

	if (!room) {
		throw new Error('Номер не найден');
	}

	const bookings = await getRoomBookings(id);

	return {
		...room.toObject(),
		bookings,
	};
};

const createRoom = async (data) => {
	const existingRoom = await Room.findOne({ number: data.number });
	if (existingRoom) {
		throw new Error('Номер комнаты уже занят!');
	}

	return Room.create(data);
};

const updateRoom = async (id, data) => {
	if (data.number) {
		const existingRoom = await Room.findOne({ number: data.number, _id: { $ne: id } });
		if (existingRoom) {
			throw new Error('Номер комнаты уже занят!');
		}
	}

	return Room.findByIdAndUpdate(id, data, { returnDocument: 'after' });
};

const deleteRoom = async (id) => {
	await Booking.deleteMany({ room: id });

	return Room.deleteOne({ _id: id });
};

module.exports = {
	getRooms,
	getRoom,
	createRoom,
	updateRoom,
	deleteRoom,
};
