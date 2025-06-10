const insights = require('../utils/mockInsights');

const getMatchInsights = (req, res) => {
  const matchId = req.params.matchId;
  const data = insights[matchId];

  if (!data) {
    return res.status(404).json({ error: 'Insights not found' });
  }

  res.json(data);
};

module.exports = { getMatchInsights };
