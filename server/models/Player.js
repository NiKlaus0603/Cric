const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['batsman', 'bowler', 'allrounder'], required: true },
  image: { type: String },
  stats: {
    runs: Number,
    wickets: Number,
    matches: Number,
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
