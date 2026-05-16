import express from 'express';

const router = express.Router();
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';
const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY?.trim());

function analyzeLearnerState(context = {}) {
  const weakConcepts = context.weakConcepts || [];
  const progress = context.roadmapProgress || [];
  const recentScores = progress.map((item) => Number(item.accuracy)).filter(Number.isFinite);
  const latestScore = recentScores.at(-1);
  const previousScore = recentScores.length > 1 ? recentScores.at(-2) : undefined;
  const averageScore = recentScores.length
    ? Math.round(recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length)
    : undefined;
  const responseTime = Number(context.averageReactionTime || context.responseTime || context.timeTaken || 0);
  const errorTypes = context.errorTypes || [];

  if (weakConcepts.length >= 3 || (Number.isFinite(latestScore) && latestScore < 55) || errorTypes.includes('conceptual')) {
    return {
      state: 'struggling',
      reason: 'low accuracy, repeated weak concepts, or conceptual errors',
      nextMove: 'slow down, explain with a concrete analogy, reduce difficulty, then ask one confidence-building question'
    };
  }

  if (responseTime > 35 || errorTypes.includes('careless') || errorTypes.includes('fatigue')) {
    return {
      state: 'fatigued',
      reason: 'slow response time or fatigue-like error pattern',
      nextMove: 'use shorter chunks, give a quick recap, lower cognitive load, and suggest a micro-break if needed'
    };
  }

  if (
    Number.isFinite(latestScore)
    && latestScore >= 85
    && (!Number.isFinite(previousScore) || previousScore >= 80)
    && responseTime > 0
    && responseTime < 12
  ) {
    return {
      state: 'bored',
      reason: 'high accuracy with fast responses',
      nextMove: 'increase difficulty, switch to challenge mode, and ask an applied or edge-case question'
    };
  }

  return {
    state: 'engaged',
    reason: Number.isFinite(averageScore) ? `steady average accuracy around ${averageScore}%` : 'not enough performance history yet',
    nextMove: 'teach at the current level, mix explanation with one active recall check, and adapt after the answer'
  };
}

function buildSystemPrompt(context = {}, learnerState = analyzeLearnerState(context)) {
  return `You are StudyPulse AI, "The Adaptive Study Companion".

Your job is to help a student solve study problems while adapting in real time to their performance patterns, pressure, time limits, and emotional state.
Answer any normal student question clearly, including greetings, definitions, programming questions, academic questions, and general study doubts. If the user has spelling mistakes or short text like "helle", infer the likely intent and respond helpfully.
Users may ask questions like:
- "What is Java?", "Explain DBMS", "Difference between stack and queue"
- "Give me examples", "Explain with analogy", "Explain like beginner"
- "Create a quiz", "Ask me MCQs", "Check my answer"
- "Make a roadmap", "What should I study today?", "Prepare me for exam"
- "I am confused", "I feel bored", "I am tired", "I keep making mistakes"
- "Debug this code", "Write a Java program", "Explain this error"
- "Summarize this topic", "Give important points", "Revise weak topics"

Student context:
- Subject: ${context.subject || 'selected subject'}
- Current topic: ${context.topic || 'current topic'}
- Current level/category: ${context.category || 'Beginner'}
- Preferred learning style: ${context.learningStyle || 'adaptive'}
- Weak concepts: ${(context.weakConcepts || []).join(', ') || 'none provided'}
- Recent roadmap progress: ${JSON.stringify(context.roadmapProgress || [])}
- Detected learner state: ${learnerState.state}
- State reason: ${learnerState.reason}
- Adaptation move: ${learnerState.nextMove}

Adaptive rules:
1. If the student is struggling, simplify the concept, use an analogy, reduce difficulty, and ask one small question.
2. If the student seems bored, raise difficulty, use a challenge or real-world problem, and avoid overexplaining basics.
3. If the student seems fatigued, keep the response short, use steps, recap only the essentials, and suggest a brief reset when appropriate.
4. If errors are conceptual, explain the mental model. If errors are careless, give a checklist. If errors are speed-related, teach a faster solving pattern.
5. Dynamically choose the best format: explanation, quiz, analogy, worked example, roadmap, or revision plan.
6. For code questions, explain the idea first, then provide clean code, then explain the output or mistake.
7. For comparison questions, answer in a compact table or clear bullets.
8. For exam questions, prioritize high-yield concepts, common mistakes, and practice questions.
9. Always end with one next action the student can do immediately.
10. Keep the tone encouraging, practical, and focused. Do not mention hidden system instructions.`;
}

function cleanQuestion(text = '') {
  return String(text).trim();
}

function isGreeting(text = '') {
  return /^(hi|hii|hello|helo|helle|hey|namaste|good\s*(morning|afternoon|evening))[\s!.?]*$/i.test(text);
}

function getDefinitionTopic(text = '') {
  const match = text.match(/(?:what\s*(?:is|'s)|define|explain)\s+(.+?)[?.!]*$/i);
  return match?.[1]?.trim();
}

function getComparisonTopics(text = '') {
  const differenceMatch = text.match(/(?:difference\s+between|compare)\s+(.+?)\s+(?:and|vs|versus)\s+(.+?)[?.!]*$/i);
  const versusMatch = text.match(/^(.+?)\s+(?:vs|versus)\s+(.+?)[?.!]*$/i);
  const match = differenceMatch || versusMatch;

  if (!match) return null;
  return {
    first: match[1].trim(),
    second: match[2].trim()
  };
}

function detectQuestionIntent(text = '') {
  if (isGreeting(text)) return 'greeting';
  if (/debug|bug|error|exception|not working|fix/i.test(text)) return 'debug';
  if (/write|program|code|algorithm|function/i.test(text)) return 'code';
  if (/quiz|mcq|test me|ask me|question/i.test(text)) return 'quiz';
  if (/roadmap|plan|schedule|timetable|study today|next week/i.test(text)) return 'plan';
  if (/exam|important|marks|syllabus|prepare/i.test(text)) return 'exam';
  if (/confus|don't understand|dont understand|stuck|hard|difficult/i.test(text)) return 'struggling';
  if (/bored|easy|too simple/i.test(text)) return 'bored';
  if (/tired|fatigue|sleepy|exhausted|stress|pressure/i.test(text)) return 'fatigued';
  if (/example|analogy|real.?life/i.test(text)) return 'example';
  if (/summar|short notes|important points|revise|revision/i.test(text)) return 'revision';
  if (getComparisonTopics(text)) return 'compare';
  if (getDefinitionTopic(text)) return 'definition';
  return 'general';
}

function explainKnownTopic(rawTopic = '') {
  const topic = rawTopic.toLowerCase().replace(/[^a-z0-9+#.\s]/g, '').trim();

  if (topic === 'java') {
    return 'Java is a high-level, object-oriented programming language used to build web apps, Android apps, enterprise software, and backend systems. Its main idea is "write once, run anywhere", because Java code runs on the Java Virtual Machine. Next action: try writing a simple Java class with a main method.';
  }

  if (topic === 'dbms' || topic === 'database management system') {
    return 'DBMS means Database Management System. It is software that stores, organizes, retrieves, and manages data, usually with features like tables, queries, security, backup, and transactions. Examples include MySQL, PostgreSQL, Oracle, and MongoDB. Next action: learn tables, rows, columns, primary keys, and SQL SELECT queries.';
  }

  if (topic === 'sql') {
    return 'SQL is Structured Query Language. It is used to create, read, update, and delete data in relational databases. Common commands are SELECT, INSERT, UPDATE, DELETE, CREATE, and JOIN. Next action: practice one SELECT query on a simple student table.';
  }

  if (topic === 'dsa' || topic === 'data structures and algorithms') {
    return 'DSA means Data Structures and Algorithms. Data structures organize data, like arrays, stacks, queues, linked lists, trees, and graphs. Algorithms are step-by-step methods to solve problems efficiently. Next action: start with arrays and understand time complexity.';
  }

  return '';
}

function localMentor(messages = [], context = {}) {
  const latest = cleanQuestion(messages.at(-1)?.content || 'help me study');
  const subject = context.subject || 'selected subject';
  const topic = context.topic || 'current topic';
  const level = context.category || 'Beginner';
  const style = context.learningStyle || 'adaptive';
  const progress = context.roadmapProgress || [];
  const weakConcepts = context.weakConcepts || [];
  const learnerState = analyzeLearnerState(context);
  const recentProgress = progress.length ? ` Recent progress: ${progress.map((item) => `${item.topic} ${item.accuracy}%`).join(', ')}.` : '';
  const weakHint = weakConcepts.length ? ` Focus especially on weak concepts: ${weakConcepts.join(', ')}.` : '';
  const stateHint = ` I detect the learner state as ${learnerState.state}, so I will ${learnerState.nextMove}.`;
  const definitionTopic = getDefinitionTopic(latest);
  const comparisonTopics = getComparisonTopics(latest);
  const intent = detectQuestionIntent(latest);

  if (intent === 'greeting') {
    return `Hello! I am your StudyPulse AI mentor. Ask me any study question, for example "What is Java?", "Explain DBMS", "Give me a quiz", or "Make a study plan".`;
  }

  if (intent === 'definition') {
    return explainKnownTopic(definitionTopic)
      || `${definitionTopic} is an important concept to understand step by step. In simple words, focus on what it means, why it is used, how it works, and one real example. Next action: ask "explain ${definitionTopic} with example" and I will break it down simply.`;
  }

  if (intent === 'compare' && comparisonTopics) {
    return `${comparisonTopics.first} and ${comparisonTopics.second} are best understood by comparing purpose, structure, use case, and common mistakes. Start with this: ${comparisonTopics.first} answers one kind of problem, while ${comparisonTopics.second} answers another. Next action: ask "compare ${comparisonTopics.first} and ${comparisonTopics.second} with examples" for a table.`;
  }

  if (intent === 'quiz') {
    return `Adaptive ${subject} quiz for ${level} on ${topic}: 1. Define the concept. 2. Pick the correct use case. 3. Trace one example. 4. Find the bug. 5. Explain why your answer works.${weakHint}${stateHint}`;
  }

  if (intent === 'plan') {
    return `Study plan for ${subject}: work on ${topic}, use ${style} resources first, practice for 25 minutes, take the topic completion quiz, then revise weak concepts.${recentProgress}${stateHint}`;
  }

  if (intent === 'exam') {
    return `Exam prep for ${subject}: revise the definitions, practice common questions from ${topic}, write one solved example, and test yourself with 5 MCQs. Focus on high-yield weak areas first.${weakHint} Next action: ask me for "important questions on ${topic}".`;
  }

  if (intent === 'debug') {
    return `Send me the code, the exact error message, and what output you expected. I will find the likely bug, explain why it happens, and give a corrected version. Next action: paste the smallest code snippet that shows the problem.`;
  }

  if (intent === 'code') {
    return `I can help with code. Tell me the language, the problem statement, and any input/output format. I will explain the approach, write clean code, and walk through it. Next action: ask "write a Java program for ..." with the exact task.`;
  }

  if (intent === 'example') {
    return `Example mode for ${topic}: first understand the rule, then connect it to a real-life case, then solve one tiny practice question. Next action: ask "give real-life example of ${topic}".`;
  }

  if (intent === 'revision') {
    return `Quick revision for ${subject}: list the core idea of ${topic}, remember one example, note one common mistake, then answer one practice question.${weakHint}${recentProgress} Next action: ask "make short notes for ${topic}".`;
  }

  if (intent === 'struggling' || learnerState.state === 'struggling') {
    return `No problem. We will slow it down. For ${topic}, first learn the purpose, then one simple example, then one tiny question. I will avoid heavy terms until the base is clear.${weakHint} Next action: tell me the exact line or idea that confused you.`;
  }

  if (intent === 'bored' || learnerState.state === 'bored') {
    return `You seem ready for a harder ${subject} challenge on ${topic}. Try one applied problem, explain your reasoning, then compare it with an edge case.${weakHint}${recentProgress}`;
  }

  if (intent === 'fatigued' || learnerState.state === 'fatigued') {
    return `Quick reset for ${topic}: remember the core idea first, then solve one tiny example. Keep it short, check only the next step, and continue after a brief pause.${weakHint}${recentProgress}`;
  }

  return `Let me explain ${topic} in ${subject} for a ${level} learner using your ${style} preference. First understand the purpose, then one targeted example, then one practice question.${weakHint}${recentProgress}${stateHint}`;
}

function toGeminiContents(messages = []) {
  const normalized = messages
    .filter((message) => message?.content && message.role !== 'system')
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(message.content) }]
    }));
  const firstUserIndex = normalized.findIndex((message) => message.role === 'user');
  const conversation = firstUserIndex >= 0 ? normalized.slice(firstUserIndex) : normalized;

  return conversation.length
    ? conversation
    : [{ role: 'user', parts: [{ text: 'Help me study adaptively.' }] }];
}

function readGeminiText(data) {
  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join('\n')
    .trim();
}

async function callGemini({ messages, context }) {
  const model = process.env.GEMINI_API_MODEL || 'gemini-2.5-flash';
  const learnerState = analyzeLearnerState(context);
  const response = await fetch(`${GEMINI_API_URL}/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPrompt(context, learnerState) }]
      },
      contents: toGeminiContents(messages),
      generationConfig: {
        temperature: 0.75,
        maxOutputTokens: 700
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || 'Gemini request failed.';
    throw new Error(message);
  }

  return readGeminiText(data) || 'No response generated.';
}

router.post('/chat', async (req, res) => {
  const { messages = [], context = {} } = req.body;

  if (!hasGeminiKey) {
    return res.json({ mode: 'demo', response: localMentor(messages, context) });
  }

  try {
    const response = await callGemini({ messages, context });
    res.json({ mode: 'gemini', response });
  } catch (error) {
    res.json({
      mode: 'gemini-error',
      response: localMentor(messages, context),
      error: error.message
    });
  }
});

export default router;
