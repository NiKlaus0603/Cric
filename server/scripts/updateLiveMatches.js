const mongoose = require('mongoose');
require('dotenv').config();

const { fetchLiveMatches } = require('../services/cricketApiService');
const Match = require('../models/match');

async function updateMatches() {
  try {
    const matches = await fetchLiveMatches();

    let count = 0;

    for (let m of matches) {
      // ✅ Defensive Date Parsing
      let safeDate = null;
      if (m.date && (typeof m.date === 'number' || typeof m.date === 'string' || m.date instanceof Date)) {
        const d = new Date(m.date);
        if (!isNaN(d.getTime())) {
          safeDate = d;
        } else {
          console.warn(`❌ Invalid date value for match ${m.name}:`, m.date);
        }
      }

      console.log(`⏺ Saving: ${m.name} [${m.source || 'Unknown'}]`);

      const updated = await Match.findOneAndUpdate(
        { match_id: m.match_id },
        {
          match_id: m.match_id,
          name: m.name,
          teams: m.teams,
          format: m.format || 'T20',
          status: m.status || 'UPCOMING',
          score: m.score || null,
          date: safeDate, // ✅ Always valid or null
          note: m.note || null,
          toss_winner: m.toss_winner || null,
          winner: m.winner || null,
          venue_id: m.venue_id || null,
          league: m.league || null,
          teams_meta: m.teams_meta || null,
          updatedAt: new Date(),
          source: m.source || 'Unknown'
        },
        { upsert: true, new: true }
      );

      if (updated) count++;
    }

    console.log(`✅ ${count} matches synced from ${matches[0]?.source || 'SportMonks/Cricbuzz'}`);
  } catch (err) {
    console.error('❌ Match sync failed:', err.message);
  }
}

// CLI-compatible
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => updateMatches().finally(() => mongoose.disconnect()))
    .catch(err => console.error('❌ MongoDB connection failed:', err.message));
}

module.exports = { updateMatches };
