const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true },
  votes: {
    type: Map,
    of: Number,
    default: {}
  },
  total: { type: Number, default: 0 }
});

module.exports = mongoose.model('Poll', PollSchema);
