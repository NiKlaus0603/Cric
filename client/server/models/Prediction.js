const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  name: { type: String, required: true },
  batsman: { type: String, required: true },
  bowler: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
