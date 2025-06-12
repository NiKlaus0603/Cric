const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const Match = require('../models/match');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await Match.deleteMany({});
    console.log(`🧹 Cleared ${result.deletedCount} old match records.`);
    process.exit();
  } catch (err) {
    console.error('❌ Failed to clear match data:', err.message);
    process.exit(1);
  }
})();
