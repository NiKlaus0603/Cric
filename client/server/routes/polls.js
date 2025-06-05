const express = require('express');
const router = express.Router();
const { vote, getResults } = require('../controllers/pollController');

router.post('/', vote); // POST /api/polls
router.get('/:matchId', getResults); // GET /api/polls/:matchId

module.exports = router;
