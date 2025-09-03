const express = require('express');
const { getRooms, getRoom, createRoom, updateRoom, deleteRoom, getRoomTypes } = require('../controllers/rooms');
const mapRoom = require('../helpers/mapRoom');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');

const router = express.Router({ mergeParams: true });

router.get('/types', (req, res) => {
	const roomTypes = getRoomTypes();

	res.send({ data: roomTypes });
});

router.get('/', async (req, res) => {
	try {
		const rooms = await getRooms();

		res.send({ data: rooms.map(mapRoom) });
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при получении номеров' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const room = await getRoom(req.params.id);

		if (!room) {
			return res.status(404).send({ error: 'Номер не найден' });
		}

		res.send({ data: mapRoom(room) });
	} catch (error) {
		res.status(500).send({ error: error.message || 'Ошибка при получении номера' });
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
		if (error.message === 'Номер с таким числом уже существует') {
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
		if (error.message === 'Номер с таким числом уже существует') {
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

module.exports = router;
