const mongoose = require('mongoose');
const { ROOM_TYPES } = require('../constants/room-types');

const RoomSchema = mongoose.Schema(
	{
		number: {
			type: Number,
			required: [true, 'Номер комнаты обязателен'],
			unique: true,
		},
		type: {
			type: Number,
			required: [true, 'Тип номера обязателен'],
			enum: [ROOM_TYPES.ECONOM, ROOM_TYPES.STANDART, ROOM_TYPES.LUX],
		},
		description: {
			type: String,
			required: [true, 'Описание обязательно'],
		},
		price: {
			type: Number,
			required: [true, 'Цена за сутки обязательна'],
			min: [0, 'Цена не может быть отрицательной'],
		},
		guests: {
			type: Number,
			required: [true, 'Количество гостей обязательно'],
			min: [1, 'Номер должен быть минимум для 1 гостя'],
		},
		photos: [String],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);
