const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const liveMatchRoutes = require('./routes/LiveMatches');
const pollRoutes = require('./routes/polls');
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');
const insightRoutes = require('./routes/insights');
const predictionRoutes = require('./routes/predictions');
const commentRoutes = require('./routes/comments');

app.use('/api/comments', commentRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/live-matches', liveMatchRoutes);

module.exports = app;
