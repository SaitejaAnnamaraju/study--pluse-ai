import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const hasKey = Boolean(process.env.OPENAI_API_KEY?.trim());
const openai = hasKey ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

function localMentor(messages = [], context = {}) {
  const latest = messages.at(-1)?.content || 'help me study';
  const subject = context.subject || 'selected subject';
  const topic = context.topic || 'current topic';
  const level = context.category || 'Beginner';
  const style = context.learningStyle || 'adaptive';
  const progress = context.roadmapProgress || [];
  const weakConcepts = context.weakConcepts || [];
  const recentProgress = progress.length ? ` Recent progress: ${progress.map((item) => `${item.topic} ${item.accuracy}%`).join(', ')}.` : '';
  const weakHint = weakConcepts.length ? ` Focus especially on weak concepts: ${weakConcepts.join(', ')}.` : '';

  if (/quiz/i.test(latest)) {
    return `Adaptive ${subject} quiz for ${level} on ${topic}: 1. Define the concept. 2. Pick the correct use case. 3. Trace one example. 4. Find the bug. 5. Explain why your answer works.${weakHint} I will adjust difficulty after your score.`;
  }

  if (/roadmap|plan/i.test(latest)) {
    return `Study plan for ${subject}: work on ${topic}, use ${style} resources first, practice for 25 minutes, take the topic completion quiz, then revise weak concepts.${recentProgress}`;
  }

  return `Let me explain ${topic} in ${subject} for a ${level} learner using your ${style} preference. First understand the purpose, then one targeted example, then one practice question.${weakHint}${recentProgress}`;
}

router.post('/chat', async (req, res) => {
  const { messages = [], context = {} } = req.body;

  if (!openai) {
    return res.json({ mode: 'demo', response: localMentor(messages, context) });
  }

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_API_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are StudyPulse AI, an adaptive learning mentor. Tailor explanations by selected subject, learning style, category, weak concepts, retention, and reaction speed.' },
      { role: 'system', content: `Context: ${JSON.stringify(context)}` },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 600
  });

  res.json({ mode: 'openai', response: response.choices?.[0]?.message?.content || 'No response generated.' });
});

export default router;
