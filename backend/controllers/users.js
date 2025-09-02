const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate, verify } = require('../helpers/token');

const checkAuth = async (token) => {
	if (!token) {
		throw new Error('Токен не предоставлен');
	}

	const tokenData = verify(token);

	const user = await User.findById(tokenData.id);

	if (!user) {
		throw new Error('Пользователь не найден');
	}

	return user;
};

const register = async (login, password) => {
	const candidate = await User.findOne({ login });

	if (candidate) {
		throw new Error('Логин уже занят!');
	}

	if (!password) {
		throw new Error('Пароль не должне быть пустым');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ login, password: passwordHash });
	const token = generate({ id: user.id });

	return { user, token };
};

const login = async (login, password) => {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error('Пользователь не найден!');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Неверный пароль!');
	}

	const token = generate({ id: user.id });

	return { token, user };
};

module.exports = {
	register,
	login,
	checkAuth,
};
