const express = require('express');
const router = express.Router();
const { votePoll, getPollResults } = require('../controllers/pollController');

router.post('/', votePoll);
router.get('/:matchId', getPollResults);

module.exports = router;
