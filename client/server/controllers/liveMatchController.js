const Match = require('../models/match');

const getLiveMatches = async (req, res) => {
  try {
    const { format, team, status } = req.query;

    const query = {};

    if (status) query.status = status;
    if (format) query.format = format;
    if (team) {
      query.$or = [
        { 'teams.home': team },
        { 'teams.away': team }
      ];
    }

    const matches = await Match.find(query).sort({ date: -1 });
    res.json(matches);
  } catch (err) {
    console.error('❌ Error fetching matches:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getLiveMatches };
