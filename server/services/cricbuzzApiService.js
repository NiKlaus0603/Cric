const axios = require('axios');

const RAPID_API_KEY = process.env.RAPIDAPI_KEY;
const BASE_URL = 'https://cricbuzz-cricket.p.rapidapi.com';

const headers = {
  'x-rapidapi-key': RAPID_API_KEY,
  'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
};

/**
 * Safe date parser: handles Unix timestamp or ISO string
 */
function parseDateSafe(raw) {
  if (!raw) return null;

  // If number or numeric string (Unix ms)
  if (typeof raw === 'number' || /^\d+$/.test(raw)) {
    const date = new Date(Number(raw));
    return isNaN(date.getTime()) ? null : date;
  }

  // If string ISO
  const date = new Date(raw);
  return isNaN(date.getTime()) ? null : date;
}

exports.fetchLiveFromCricbuzz = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/matches/v1/live`, { headers });
    const matches = res.data?.typeMatches || [];

    const flattened = [];

    for (const group of matches) {
      for (const matchWrapper of group.seriesMatches || []) {
        const matchInfo = matchWrapper?.seriesAdWrapper?.matches?.[0]?.matchInfo;
        if (!matchInfo) continue;

        // Debug log to trace the raw date value
        console.log('📅 Raw startDate from Cricbuzz:', matchInfo.startDate);

        flattened.push({
          match_id: matchInfo.matchId,
          name: `${matchInfo.team1?.teamName || 'Team A'} vs ${matchInfo.team2?.teamName || 'Team B'}`,
          teams: [matchInfo.team1?.teamName, matchInfo.team2?.teamName],
          score: null,
          format: group.matchType || 'Unknown',
          status: matchInfo.status || 'UNKNOWN',
          date: parseDateSafe(matchInfo.startDate),
          updatedAt: new Date(),
          source: 'Cricbuzz'
        });
      }
    }

    console.log(`✅ Cricbuzz returned ${flattened.length} fallback matches.`);
    return flattened;
  } catch (err) {
    console.error('❌ Cricbuzz API error:', err.message);
    return [];
  }
};
