const predictions = require('../utils/mockPredictions');

const submitPrediction = (req, res) => {
  const { matchId, name, batsman, bowler } = req.body;

  if (!predictions[matchId]) predictions[matchId] = [];

  predictions[matchId].push({ name, batsman, bowler });

  res.status(200).json({ message: 'Prediction saved!' });
};

const getPredictions = (req, res) => {
  const matchId = req.params.matchId;
  res.json(predictions[matchId] || []);
};

module.exports = { submitPrediction, getPredictions };
