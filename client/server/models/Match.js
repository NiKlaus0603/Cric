const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match_id: { type: String, required: true, unique: true },
  format: { type: String, enum: ['T20', 'ODI', 'TEST'], required: true },
  status: { type: String, enum: ['LIVE', 'UPCOMING', 'RESULT'], required: true },
  teams: {
    home: { type: String, required: true },
    away: { type: String, required: true },
  },
  scores: {
    home: { type: String, default: '' },
    away: { type: String, default: '' },
  },
  overs: { type: String, default: '' }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
