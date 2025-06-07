const mongoose = require('mongoose');
const Match = require('../models/match');

const mongoURI = 'mongodb://root:t8nvM5VtdRLamlSv@ac-40ztbch-shard-00-00.faybwjq.mongodb.net:27017,ac-40ztbch-shard-00-01.faybwjq.mongodb.net:27017,ac-40ztbch-shard-00-02.faybwjq.mongodb.net:27017/?ssl=true&replicaSet=atlas-yat5wm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(async () => {
    await Match.deleteMany();
    await Match.insertMany([
      {
        match_id: 'match123',
        format: 'T20',
        status: 'LIVE',
        teams: { home: 'India', away: 'Australia' },
        scores: { home: '145/3', away: '110/2' },
        overs: '16.2'
      },
      {
        match_id: 'match456',
        format: 'ODI',
        status: 'UPCOMING',
        teams: { home: 'Pakistan', away: 'New Zealand' },
      }
    ]);
    console.log('✅ Matches seeded');
    process.exit();
  })
  .catch(err => console.error('❌ Seeding failed:', err));
