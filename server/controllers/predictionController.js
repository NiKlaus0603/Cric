const Prediction = require('../models/Prediction');

const submitPrediction = async (req, res) => {
  const { matchId, name, batsman, bowler } = req.body;
  if (!matchId || !name || !batsman || !bowler)
    return res.status(400).json({ error: 'Missing fields' });

  await Prediction.create({ matchId, name, batsman, bowler });
  res.json({ message: 'Prediction saved!' });
};

const getPredictions = async (req, res) => {
  const predictions = await Prediction.find({ matchId: req.params.matchId });
  res.json(predictions);
};

module.exports = { submitPrediction, getPredictions };
