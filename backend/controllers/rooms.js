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
	console.log(room.toObject());

	return {
		...room.toObject(),
		bookings,
	};
};

const createRoom = async (data) => {
	const existingRoom = await Room.findOne({ number: data.number });
	if (existingRoom) {
		throw new Error('Номер с таким числом уже существует');
	}

	return Room.create(data);
};

const updateRoom = async (id, data) => {
	if (data.number) {
		const existingRoom = await Room.findOne({ number: data.number });
		if (existingRoom) {
			throw new Error('Номер с таким числом уже существует');
		}
	}

	return Room.findByIdAndUpdate(id, data, { returnDocument: 'after' });
};

const deleteRoom = (id) => {
	return Room.deleteOne({ _id: id });
};

module.exports = {
	getRooms,
	getRoom,
	createRoom,
	updateRoom,
	deleteRoom,
};
