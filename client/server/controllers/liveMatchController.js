const liveMatches = require('../utils/dummyLiveMatches');

const getLiveMatches = (req, res) => {
  const { format, team, status } = req.query;

  let filtered = [...liveMatches];

  if (format) {
    filtered = filtered.filter(match => match.format === format);
  }

  if (team) {
    filtered = filtered.filter(match =>
      match.teams.home === team || match.teams.away === team
    );
  }

  if (status) {
    filtered = filtered.filter(match => match.status === status);
  }

  res.status(200).json(filtered);
};

module.exports = { getLiveMatches };
