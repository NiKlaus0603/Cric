// /server/services/cricketApiService.js
const axios = require('axios');
const { fetchLiveFromCricbuzz } = require('./cricbuzzApiService');

const BASE = process.env.SPORTMONKS_BASE_URL;
const TOKEN = process.env.SPORTMONKS_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE,
  timeout: 10000,
  params: {
    api_token: TOKEN
  }
});

exports.fetchLiveMatches = async () => {
  try {
    const res = await axiosInstance.get('/livescores', {
      params: {
        include: 'localteam,visitorteam,runs,league'
      }
    });

    const sportmonksData = res.data.data || [];

    if (sportmonksData.length > 0) {
      console.log(`✅ SportMonks returned ${sportmonksData.length} live matches.`);
      return sportmonksData.map(m => ({ ...m, source: 'SportMonks' }));
    }

    console.warn('⚠️ No live matches from SportMonks. Falling back to Cricbuzz...');
    const cricbuzzData = await fetchLiveFromCricbuzz();
    return cricbuzzData;

  } catch (err) {
    console.error('❌ Error fetching live matches:', err.message);
    return [];
  }
};
