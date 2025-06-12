// /server/cron/sync.js
const cron = require('node-cron');
const mongoose = require('mongoose');
require('dotenv').config();

const { updateMatches } = require('../scripts/updateLiveMatches');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected for cron');

    // ⏱ Run every 60 seconds
    cron.schedule('*/1 * * * *', async () => {
      console.log('🔁 [CRON] Syncing live matches...');
      await updateMatches();
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
