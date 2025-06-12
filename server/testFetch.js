// testFetch.js
require('dotenv').config(); // Load .env variables
const { fetchLiveMatches } = require('./services/cricketApiService');

// Print out the BASE and TOKEN to verify .env is loaded
console.log("🔍 Checking ENV Vars:");
console.log("🔍 SPORTMONKS_BASE_URL =", process.env.SPORTMONKS_BASE_URL);
console.log("🔍 SPORTMONKS_API_KEY  =", process.env.SPORTMONKS_API_KEY?.slice(0, 8) + '...');

(async () => {
  try {
    const matches = await fetchLiveMatches();
    console.log("✅ Number of matches fetched:", matches.length);

    if (matches.length > 0) {
      console.dir(matches.slice(0, 2), { depth: null });
    } else {
      console.warn("⚠️ No live matches returned from SportMonks.");
    }
  } catch (err) {
    console.error("❌ Error during test fetch:", err.message);
  }
})();
