const express = require('express');
const router = express.Router();
const { getMatchInsights } = require('../controllers/insightController');

router.get('/:matchId', getMatchInsights);

module.exports = router;
