const express = require('express');
const router = express.Router();
const { fetchAllPlayers } = require('../services/cricketApiService');

router.get('/', async (req, res) => {
  try {
    const players = await fetchAllPlayers();
    res.json(players);
  } catch (err) {
    console.error('❌ Failed to fetch players:', err.message);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

module.exports = router;
