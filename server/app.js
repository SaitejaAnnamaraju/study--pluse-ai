import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import adaptiveRouter from './routes/adaptive.js';
import aiRouter from './routes/ai.js';
import catalogRouter from './routes/catalog.js';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(serverDir, '../.env') });
dotenv.config({ path: path.resolve(serverDir, '.env'), override: true });

const app = express();

const allowedOrigin = process.env.CLIENT_URL;
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigin && origin === allowedOrigin) return callback(null, true);
    if (/^https:\/\/.+\.vercel\.app$/.test(origin)) return callback(null, true);
    if (/^https:\/\/.+\.github\.io$/.test(origin)) return callback(null, true);
    if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin ${origin}`));
  }
}));
app.use(express.json({ limit: '5mb' }));

app.get('/', (req, res) => {
  res.json({
    status: 'StudyPulse AI API running',
    database: mongoose.connection.readyState === 1 ? 'mongodb' : 'demo-memory'
  });
});

app.use('/api/catalog', catalogRouter);
app.use('/api/adaptive', adaptiveRouter);
app.use('/api/ai', aiRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

export async function connectDatabase() {
  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 0) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 1500 });
    console.log('MongoDB connected');
  } catch {
    console.log('MongoDB not connected; running in demo memory mode');
  }
}

export default app;
