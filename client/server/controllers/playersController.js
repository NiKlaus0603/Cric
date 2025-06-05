const players = require('../utils/mockPlayers');

const getPlayers = (req, res) => {
  res.json(players);
};

module.exports = { getPlayers };
