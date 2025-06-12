const app = require('./app'); 
const PORT = process.env.PORT || 9091;
const cron = require('node-cron');
const { updateMatches } = require('./scripts/updateLiveMatches');
require('dotenv').config();
const mongoose = require('mongoose');
// ✅ Ensure dotenv is loaded before using environment variables

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

// Run job every 30s
cron.schedule('*/30 * * * * *', () => {
  updateMatches();
});


const { initWebSocket } = require('./services/socketHandler');
initWebSocket();
