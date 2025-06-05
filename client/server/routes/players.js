const express = require('express');
const router = express.Router();
const { getPlayers } = require('../controllers/playersController');

router.get('/', getPlayers);

module.exports = router;
