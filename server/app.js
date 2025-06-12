const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();
const path = require('path');
// ✅ Ensure dotenv is loaded before using environment variables
// ✅ Importing dotenv at the top to ensure environment variables are loaded
// ✅ Importing necessary modules


const app = express(); // ✅ This must come before using app

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// ✅ API Routes
const liveMatchRoutes = require('./routes/LiveMatches');
const pollRoutes = require('./routes/polls');
const teamRoutes = require('./routes/teams');
const insightRoutes = require('./routes/insights');
const predictionRoutes = require('./routes/predictions');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');
const externalLiveRoutes = require('./routes/liveExternal');
const playerRoutes = require('./routes/players');
const liveDbCheck = require('./routes/liveDbCheck');

app.use('/api/live-db', liveDbCheck);
app.use('/api/players', playerRoutes);
app.use('/api/live-external', externalLiveRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/live-matches', liveMatchRoutes);

// ✅ Serve React frontend build (must come last)
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


module.exports = app;
