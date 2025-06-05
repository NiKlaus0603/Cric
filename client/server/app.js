import express, { json } from 'express';
import cors from 'cors';
const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
import liveMatchRoutes from './routes/LiveMatches';
import pollRoutes from './routes/polls';
app.use('/api/polls', pollRoutes);
app.use('/api/live-matches', liveMatchRoutes);

export default app;
