require('dotenv').config();
const axios = require('axios');

const BASE = process.env.SPORTMONKS_BASE_URL;
const TOKEN = process.env.SPORTMONKS_API_KEY;

(async () => {
  try {
    const res = await axios.get(`${BASE}/fixtures`, {
      params: {
        api_token: TOKEN,
        include: 'localteam,visitorteam,league',
        per_page: 5
      }
    });

    const fixtures = res.data.data;
    console.log("✅ Fixtures fetched:", fixtures.length);
    console.dir(fixtures.slice(0, 2), { depth: null });

  } catch (err) {
    console.error("❌ Fixture test failed:", err.message);
  }
})();
