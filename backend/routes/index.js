const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/rooms', require('./rooms'));

module.exports = router;
