const express = require('express');
const router = express.Router();
const { submitPrediction, getPredictions } = require('../controllers/predictionController');

router.post('/', submitPrediction); // POST /api/predictions
router.get('/:matchId', getPredictions); // GET /api/predictions/:matchId

module.exports = router;
