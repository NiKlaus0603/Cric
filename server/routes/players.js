const express = require('express');
const router = express.Router();
const { addPlayer } = require('../controllers/playerTeamController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, addPlayer);
module.exports = router;