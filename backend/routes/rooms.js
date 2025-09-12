const express = require('express');
const { getRooms, getRoom, createRoom, updateRoom, deleteRoom } = require('../controllers/rooms');
const { getRoomReviews, createReview, deleteReview } = require('../controllers/reviews');
const mapRoom = require('../helpers/mapRoom');
const mapReview = require('../helpers/mapReview');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			sortBy = 'price',
			sortOrder = 'asc',
			type,
			minPrice,
			maxPrice,
			guests,
		} = req.query;

		const filters = { type, minPrice, maxPrice, guests };
		const sort = { sortBy, sortOrder };
		const pagination = { page, limit };

		const result = await getRooms(filters, sort, pagination);

		res.send({
			data: result.rooms.map(mapRoom),
			pagination: result.pagination,
		});
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при получении номеров' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await getRoom(req.params.id);

		res.send({ data: mapRoom(room) });
	} catch (error) {
		if (error.message === 'Номер не найден') {
			res.status(404).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при получении номера' });
		}
	}
});

router.post('/', authenticated, isAdmin(), upload.array('photos', 10), async (req, res) => {
	try {
		const photos = req.files
			? req.files.map((file) => {
					return `/uploads/rooms/${file.filename}`;
			  })
			: [];

		const room = await createRoom({ ...req.body, photos });

		res.send({ data: mapRoom(room) });
	} catch (error) {
		if (error.message === 'Номер комнаты уже занят!') {
			res.status(409).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при создании номера' });
		}
	}
});

router.patch('/:id', authenticated, isAdmin(), async (req, res) => {
	try {
		const room = await updateRoom(req.params.id, req.body);

		if (!room) {
			return res.status(404).send({ error: 'Номер не найден' });
		}

		res.send({ data: mapRoom(room) });
	} catch (error) {
		if (error.message === 'Номер комнаты уже занят!') {
			res.status(409).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при обновлении номера' });
		}
	}
});

router.delete('/:id', authenticated, isAdmin(), async (req, res) => {
	try {
		const room = await deleteRoom(req.params.id);

		if (!room) {
			return res.status(404).send({ error: 'Номер не найден' });
		}

		res.send({ data: 'Номер успешно удален' });
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при удалении номера' });
	}
});

router.get('/:roomId/reviews', async (req, res) => {
	try {
		const reviews = await getRoomReviews(req.params.roomId);
		res.send({ data: reviews.map(mapReview) });
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при получении отзывов' });
	}
});

router.post('/:roomId/reviews', authenticated, async (req, res) => {
	try {
		const review = await createReview(req.params.roomId, req.user.id, req.body.comment);

		res.send({ data: mapReview(review) });
	} catch (error) {
		if (error.message === 'Комната не найдена') {
			res.status(404).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при создании отзыва' });
		}
	}
});

router.delete('/:roomId/reviews/:id', authenticated, isAdmin(), async (req, res) => {
	try {
		await deleteReview(req.params.id);
		res.send({ data: 'Отзыв удален' });
	} catch (error) {
		if (error.message === 'Отзыв не найден') {
			res.status(404).send({ error: error.message });
		} else {
			res.status(500).send({ error: error.message || 'Ошибка при удалении отзыва' });
		}
	}
});

module.exports = router;
