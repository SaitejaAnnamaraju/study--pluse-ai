import express from 'express';
import { catalog, demoUsers, subjects } from '../data/catalog.js';

const router = express.Router();

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const getStageQuestions = (subject, stage = 'knowledge') => {
  const pool = shuffle(subject.mcqs);
  if (stage === 'video') return pool.slice(0, Math.min(3, pool.length));
  if (stage === 'reading') return pool.slice(-Math.min(3, pool.length));
  return pool.slice(0, Math.min(5, pool.length));
};

router.get('/', (req, res) => {
  res.json({ catalog, subjects: Object.values(subjects), demoUsers });
});

router.get('/subjects/:subjectId', (req, res) => {
  const subject = subjects[req.params.subjectId];
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  res.json(subject);
});

router.get('/subjects/:subjectId/questions', (req, res) => {
  const subject = subjects[req.params.subjectId];
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  const stage = (req.query.stage || 'knowledge').toLowerCase();
  res.json({ questions: getStageQuestions(subject, stage) });
});

export default router;
