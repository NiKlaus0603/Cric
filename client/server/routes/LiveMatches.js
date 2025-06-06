const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// GET /api/live-matches
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.format) filter.format = req.query.format;
    if (req.query.team) {
      filter.$or = [
        { 'teams.home': req.query.team },
        { 'teams.away': req.query.team }
      ];
    }

    const matches = await Match.find(filter).sort({ createdAt: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// OPTIONAL: POST (for admin to add matches manually)
router.post('/', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json({ message: 'Match saved', match });
  } catch (err) {
    res.status(400).json({ error: 'Match creation failed', details: err.message });
  }
});

module.exports = router;
