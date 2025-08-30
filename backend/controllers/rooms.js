const Room = require('../models/Room');

const getRooms = async () => {
	return Room.find();
};

const getRoom = async (id) => {
	return Room.findById(id);
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
