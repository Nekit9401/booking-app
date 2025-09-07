const Booking = require('../models/Booking');
const Room = require('../models/Room');

const getRooms = async () => {
	return Room.find();
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
