const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// GET /api/live-db?format=T20&status=LIVE
router.get('/', async (req, res) => {
  try {
    const { format, status } = req.query;
    const filters = {};

    if (format) filters.format = format;
    if (status) filters.status = status;

    const matches = await Match.find(filters).sort({ date: 1 });
    res.json(matches);
  } catch (err) {
    console.error('❌ Error fetching live matches:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/live-db/:id → fetch a single match by match_id
router.get('/:id', async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);
    if (isNaN(matchId)) {
      return res.status(400).json({ error: 'Invalid match ID' });
    }

    const match = await Match.findOne({ match_id: matchId });
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json(match);
  } catch (err) {
    console.error('❌ Error fetching match by ID:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
