const { verify } = require('../helpers/token');
const User = require('../models/User');

module.exports = async (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		res.send({ error: 'Пользователь не авторизован' });

		return;
	}

	const tokenData = verify(token);

	const user = await User.findOne({ _id: tokenData.id });

	if (!user) {
		res.send({ error: 'Пользователь не имеет доступа!' });

		return;
	}

	req.user = user;

	next();
};
