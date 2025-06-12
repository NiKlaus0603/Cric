const WebSocket = require('ws');
const Match = require('../models/match');

exports.initWebSocket = () => {
    const socket = new WebSocket(`wss://api.cricapi.com/v1/stream?apikey=${process.env.CD_API_KEY}`);

  socket.on('open', () => {
    console.log('🟢 WebSocket connected to CricketData.org');
  });

  socket.on('message', async (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === 'live_score_update') {
        const m = data.payload;

        await Match.findOneAndUpdate(
          { match_id: m.id },
          {
            score: m.score,
            status: m.status,
            updatedAt: new Date()
          },
          { upsert: true }
        );

        console.log(`⚡ Real-time update saved for match ${m.id}`);
      }
    } catch (err) {
      console.error('❌ WebSocket message error:', err.message);
    }
  });

  socket.on('error', (err) => {
    console.error('❌ WebSocket connection error:', err.message);
  });

  socket.on('close', () => {
    console.log('🔴 WebSocket disconnected');
  });
};
