// /server/routes/live-db.js
const express = require('express');
const router = express.Router();
const Match = require('../models/match');

router.get('/', async (req, res) => {
  try {
    const { format, status } = req.query;
    const filters = {};

    if (format) filters.format = format;
    if (status) filters.status = status;

    const matches = await Match.find(filters).sort({ date: 1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
