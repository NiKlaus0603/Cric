const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  captain: { type: String },
  nrr: Number,
  wins: Number,
  losses: Number
});

module.exports = mongoose.model('Team', TeamSchema);
