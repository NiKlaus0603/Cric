const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
