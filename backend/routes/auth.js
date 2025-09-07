const express = require('express');
const { register, login, checkAuth } = require('../controllers/users');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

router.get('/me', async (req, res) => {
	try {
		const token = req.cookies.token;

		const user = await checkAuth(token);

		res.send({ error: null, user: mapUser(user) });
	} catch (error) {
		if (error.message === 'Токен не предоставлен' || error.message === 'Пользователь не найден') {
			return res.status(401).send({ error: error.message });
		}
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).send({ error: 'Неверный токен' });
		}
		if (error.name === 'TokenExpiredError') {
			return res.status(401).send({ error: 'Токен истек' });
		}
		res.status(500).send({ error: 'Ошибка сервера' });
	}
});

router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) });
	} catch (error) {
		if (error.message === 'Логин уже занят!') {
			res.status(409).send({ error: error.message });
		} else if (error.message === 'Пароль не должен быть пустым') {
			res.status(400).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Неизвестная ошибка' });
		}
	}
});

router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) });
	} catch (error) {
		if (error.message === 'Пользователь не найден!' || error.message === 'Неверный пароль!') {
			res.status(401).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Неизвестная ошибка' });
		}
	}
});

router.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
