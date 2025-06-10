const express = require('express');
const router = express.Router();
const { getLiveMatches } = require('../controllers/liveMatchController');

router.get('/', getLiveMatches);
// router.get('/:id', getMatchById); // if used, must define `getMatchById`

module.exports = router;