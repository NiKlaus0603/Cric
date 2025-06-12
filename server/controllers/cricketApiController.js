const axios = require('axios');

const fetchLiveMatches = async (req, res) => {
  try {
    const response = await axios.get('https://api.cricapi.com/v1/cricScore', {
      params: {
        apikey: process.env.CD_API_KEY
      }
    });

    res.json(response.data); // contains 'data': [matches...]
  } catch (err) {
    console.error('❌ Error from Cricket API:', err.message);
    res.status(500).json({ error: 'Failed to fetch live match data' });
  }
};

module.exports = { fetchLiveMatches };
