const express = require('express');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');
const {
	getUserBookings,
	getAllBookings,
	createBooking,
	updateBooking,
	cancelBooking,
} = require('../controllers/booking');
const { USER_ROLE } = require('../constants/role');
const mapBooking = require('../helpers/mapBooking');

const router = express.Router({ mergeParams: true });

router.get('/my', authenticated, async (req, res) => {
	try {
		const bookings = await getUserBookings(req.user.id);
		res.send({ data: bookings.map(mapBooking) });
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при получении бронирований' });
	}
});

router.get('/', authenticated, isAdmin(), async (req, res) => {
	try {
		const bookings = await getAllBookings();
		res.send({ data: bookings.map(mapBooking) });
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при получении бронирований' });
	}
});

router.post('/', authenticated, async (req, res) => {
	try {
		const booking = await createBooking({
			...req.body,
			user: req.user.id,
		});
		res.send({ data: mapBooking(booking) });
	} catch (error) {
		if (
			error.message === 'Дата выезда не может раньше даты заезда' ||
			error.message === 'Номер недоступен на выбранные даты'
		) {
			res.status(409).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при создании бронирования' });
		}
	}
});

router.patch('/:id', authenticated, async (req, res) => {
	try {
		const isAdminUser = req.user.role === USER_ROLE.ADMIN;
		const booking = await updateBooking(req.params.id, req.user.id, req.body, isAdminUser);

		if (!booking) {
			return res.status(404).send({ error: 'Бронь не найдена!' });
		}

		res.send({ data: mapBooking(booking) });
	} catch (error) {
		if (error.message === 'Недостаточно прав для изменения бронирования') {
			res.status(403).send({ error: error.message });
		} else if (error.message === 'Номер недоступен на выбранные даты') {
			res.status(409).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при изменении бронирования' });
		}
	}
});

router.patch('/:id/cancel', authenticated, async (req, res) => {
	try {
		const isAdminUser = req.user.role === USER_ROLE.ADMIN;
		const booking = await cancelBooking(req.params.id, req.user.id, isAdminUser);

		if (!booking) {
			return res.status(404).send({ error: 'Бронь не найдена!' });
		}

		res.send({ data: mapBooking(booking) });
	} catch (error) {
		if (error.message === 'Недостаточно прав для отмены бронирования') {
			res.status(403).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при отмене бронирования' });
		}
	}
});

module.exports = router;
