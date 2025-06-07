const express = require('express');
const router = express.Router();
const { getLiveMatches } = require('../controllers/liveMatchController');

router.get('/', getLiveMatches);

module.exports = router;
