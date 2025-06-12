const express = require('express');
const router = express.Router();
const { fetchLiveMatches } = require('../services/cricketApiService');

router.get('/', async (req, res) => {
  try {
    const matches = await fetchLiveMatches();
    res.json(matches);
  } catch (err) {
    console.error('❌ Failed to fetch live matches:', err.message);
    res.status(500).json({ error: 'Failed to fetch live matches' });
  }
});

module.exports = router;
