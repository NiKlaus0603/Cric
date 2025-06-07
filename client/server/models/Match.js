const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  match_id: { type: String, required: true, unique: true },
  format: { type: String, enum: ['T20', 'ODI', 'TEST'], required: true },
  status: { type: String, enum: ['UPCOMING', 'LIVE', 'RESULT'], required: true },
  teams: {
    home: { type: String, required: true },
    away: { type: String, required: true },
  },
  scores: {
    home: { type: String, default: '' }, // e.g. "120/3"
    away: { type: String, default: '' },
  },
  overs: { type: String, default: '' }, // e.g. "13.2"
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', MatchSchema);
