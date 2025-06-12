const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const { updateMatches } = require('./updateLiveMatches');

(async () => {
  try {
    // Connect to MongoDB using only URI (no deprecated options)
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Run match updater and log number of matches synced
    const syncedCount = await updateMatches(); // assumes updateMatches returns count
    console.log(`✅ ${syncedCount} matches synced to MongoDB from SportMonks`);

    // Exit cleanly
    process.exit(0);
  } catch (err) {
    console.error('❌ Trigger failed:', err.message);
    console.error(err); // full stack trace for deeper debugging
    process.exit(1);
  }
})();

/* 
// 🚫 WebSocket usage disabled – REST API polling only
// const WebSocket = require('ws');
// const ws = new WebSocket('wss://api.sportmonks.com/...?token=...');
// ws.on('message', ...);
// 🔒 WebSocket requires premium subscription – use REST polling instead
*/
