import express from 'express';
import { computeEfficiency, detectLearningProfile, evaluateStage, evaluateTask, generateAdaptiveRoadmap, generateTaskQuiz, recommendResources } from '../services/adaptiveEngine.js';
import { getMemoryRecords, saveLearningRecord } from '../services/learningStore.js';

const router = express.Router();

router.post('/stage', async (req, res) => {
  const result = evaluateStage(req.body);
  await saveLearningRecord({ type: 'analysis_stage', subjectId: req.body.subjectId, payload: result });
  res.json(result);
});

router.post('/profile', async (req, res) => {
  const profile = detectLearningProfile(req.body);
  await saveLearningRecord({ type: 'learning_profile', subjectId: req.body.subjectId, payload: profile });
  res.json(profile);
});

router.post('/roadmap', async (req, res) => {
  const profile = req.body.profile || {};
  const subjectId = req.body.subjectId || 'java';
  const result = {
    roadmap: generateAdaptiveRoadmap({ subjectId, profile }),
    resources: recommendResources({ subjectId, learningStyle: profile.learningStyle })
  };
  await saveLearningRecord({ type: 'adaptive_roadmap', subjectId, payload: result });
  res.json(result);
});

router.post('/task-quiz', (req, res) => {
  const { subjectId = 'java', topic = '' } = req.body;
  res.json(generateTaskQuiz({ subjectId, topic }));
});

router.post('/task-evaluate', async (req, res) => {
  const { subjectId = 'java', topic = '', answers = [] } = req.body;
  const evaluation = evaluateTask({ subjectId, topic, answers });
  const weak = evaluation.accuracy < 60;
  const result = {
    ...evaluation,
    nextDifficulty: weak ? 'Easier guided path' : evaluation.accuracy > 85 ? 'Advanced challenge path' : 'Balanced adaptive path',
    recommendation: weak
      ? `Revise ${topic} with simpler resources, then retake a short quiz.`
      : `Continue to the next topic. Your timing (${evaluation.averageReactionTime}s) is acceptable.`,
    adaptation: weak
      ? {
          action: 'reduce_difficulty',
          roadmapChange: 'Add beginner explanations, revision videos, and easier practice before the next topic.',
          revisionRequired: true
        }
      : evaluation.accuracy > 85
        ? {
            action: 'increase_difficulty',
            roadmapChange: 'Unlock harder quizzes, advanced examples, and real-world challenges.',
            revisionRequired: false
          }
        : {
            action: 'maintain_balanced_path',
            roadmapChange: 'Continue with mixed concept and practice resources.',
            revisionRequired: false
          }
  };
  await saveLearningRecord({ type: 'topic_result', subjectId, payload: result });
  res.json(result);
});

router.post('/efficiency', async (req, res) => {
  const { analysis = {}, taskResults = [] } = req.body;
  const result = computeEfficiency({ analysis, taskResults });
  await saveLearningRecord({ type: 'final_subject_mastery', subjectId: req.body.subjectId, payload: result });
  res.json(result);
});

router.post('/topic-result', (req, res) => {
  const { score = 0, timeTaken = 0, topic = 'current topic' } = req.body;
  const weak = score < 60;
  res.json({
    topic,
    mastery: score,
    nextDifficulty: weak ? 'Easier guided path' : score > 85 ? 'Advanced challenge path' : 'Balanced adaptive path',
    recommendation: weak
      ? `Revise ${topic} with simpler resources, then retake a short quiz.`
      : `Continue to the next topic. Your timing (${timeTaken}s) is acceptable.`
  });
});

router.get('/records', (req, res) => {
  res.json({ records: getMemoryRecords() });
});

export default router;
