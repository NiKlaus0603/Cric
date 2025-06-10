const Match = require('../models/match');

// ✅ Add new match to MongoDB
const addMatch = async (req, res) => {
  try {
    const newMatch = await Match.create(req.body);
    res.status(201).json({ message: 'Match added successfully!', match: newMatch });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add match', details: error.message });
  }
};

// ✅ Get all matches
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve matches' });
  }
};

// ✅ Update match by ID
const updateMatch = async (req, res) => {
  try {
    const updated = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update match' });
  }
};

// ✅ Delete match by ID
const deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete match' });
  }
};

module.exports = { addMatch, getAllMatches, updateMatch, deleteMatch };
