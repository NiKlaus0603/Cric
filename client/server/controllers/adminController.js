const matches = require('../utils/mockMatches');

const addMatch = (req, res) => {
  const newMatch = req.body;

  if (!newMatch.match_id) {
    return res.status(400).json({ error: 'Match ID is required.' });
  }

  matches.push(newMatch);
  return res.status(201).json({ message: 'Match added successfully!', match: newMatch });
};

const getAllMatches = (req, res) => {
  res.json(matches);
};

module.exports = { addMatch, getAllMatches };
