const express = require('express');
const router = express.Router();

const { addTeam } = require('../controllers/playerTeamController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, addTeam);
module.exports = router;