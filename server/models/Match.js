const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  match_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: String,

  teams: [String], // e.g., ['India', 'Australia']

  format: String,  // T20, ODI, TEST, etc.
  status: String,  // LIVE, UPCOMING, FINISHED

  score: {
    r: Number,
    w: Number,
    o: String
  },

  date: {
    type: Date,
    required: false // ✅ Allow null for fallback API or failed parse
  },

  note: String, // e.g., "India won by 5 wickets"
  toss_winner: String,
  winner: String,
  venue_id: Number,

  league: {
    id: Number,
    name: String,
    code: String,
    image_path: String
  },

  teams_meta: {
    local: {
      id: Number,
      name: String,
      code: String,
      image_path: String
    },
    visitor: {
      id: Number,
      name: String,
      code: String,
      image_path: String
    }
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  source: {
    type: String,
    enum: ['SportMonks', 'Cricbuzz', 'Unknown'],
    default: 'SportMonks'
  }
});

module.exports = mongoose.model('Match', matchSchema);
