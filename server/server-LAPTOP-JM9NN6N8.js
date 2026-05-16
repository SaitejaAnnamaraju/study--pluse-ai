import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import aiRouter from './routes/ai.js';
import adaptiveRouter from './routes/adaptive.js';
import catalogRouter from './routes/catalog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '5mb' }));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(() => console.log('MongoDB not connected; running in demo memory mode'));
}

app.get('/', (req, res) => {
  res.json({ status: 'StudyPulse AI API running', database: mongoose.connection.readyState === 1 ? 'mongodb' : 'demo-memory' });
});

app.use('/api/catalog', catalogRouter);
app.use('/api/adaptive', adaptiveRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`StudyPulse AI API listening on http://localhost:${PORT}`);
});
