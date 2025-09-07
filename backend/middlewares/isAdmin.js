const { USER_ROLE } = require('../constants/role');

module.exports = () => {
	return (req, res, next) => {
		if (req.user.role !== USER_ROLE.ADMIN) {
			res.send({ error: 'Доступ запрещен' });

			return;
		}

		next();
	};
};
