const Player = require('../models/Player');
const Team = require('../models/Team');

// Add player
const addPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add player' });
  }
};

// Add team
const addTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add team' });
  }
};

module.exports = { addPlayer, addTeam };
