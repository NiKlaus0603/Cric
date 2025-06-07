const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  matchId: { type: String },
  caption: { type: String },
  url: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);
