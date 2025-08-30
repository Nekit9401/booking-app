const mongoose = require('mongoose');
const { USER_ROLE } = require('../constants/role');

const UserSchema = mongoose.Schema(
	{
		login: {
			type: String,
			required: [true, 'Логин обязателен'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Пароль обязателен'],
			minlength: [6, 'Пароль должен быть не менее 6 символов'],
		},
		role: {
			type: Number,
			default: USER_ROLE.CLIENT,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
