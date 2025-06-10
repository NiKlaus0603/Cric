const teams = require('../utils/mockTeams');

const getTeams = (req, res) => {
  res.json(teams);
};

module.exports = { getTeams };
