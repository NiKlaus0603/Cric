const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ MongoDB Atlas Connection
const mongoURI = 'mongodb://root:t8nvM5VtdRLamlSv@ac-40ztbch-shard-00-00.faybwjq.mongodb.net:27017,ac-40ztbch-shard-00-01.faybwjq.mongodb.net:27017,ac-40ztbch-shard-00-02.faybwjq.mongodb.net:27017/?ssl=true&replicaSet=atlas-yat5wm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));


// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const liveMatchRoutes = require('./routes/LiveMatches');
const pollRoutes = require('./routes/polls');
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');
const insightRoutes = require('./routes/insights');
const predictionRoutes = require('./routes/predictions');
const commentRoutes = require('./routes/comments');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

app.use('/api/media', mediaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/live-matches', liveMatchRoutes);

module.exports = app;
