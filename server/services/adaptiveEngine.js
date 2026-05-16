import { subjects } from '../data/catalog.js';

const avg = (items) => items.length ? items.reduce((sum, value) => sum + value, 0) / items.length : 0;
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const subjectResourceLinks = {
  java: {
    videos: [
      { title: 'Java Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=GoXwIVyNvX0' },
      { title: 'Java Tutorial for Beginners - Programming with Mosh', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34' },
      { title: 'Java Full Course - Bro Code', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo' }
    ],
    reading: [
      { title: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/' },
      { title: 'Oracle Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/' },
      { title: 'Baeldung Java Guides', url: 'https://www.baeldung.com/java-tutorial' }
    ],
    pdfs: [
      { title: 'Java Language Specification PDF', url: 'https://docs.oracle.com/javase/specs/jls/se21/jls21.pdf' }
    ],
    practice: [
      { title: 'Exercism Java Practice', url: 'https://exercism.org/tracks/java' },
      { title: 'HackerRank Java Practice', url: 'https://www.hackerrank.com/domains/java' }
    ]
  },
  dbms: {
    videos: [
      { title: 'Database Systems Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=4cWkVbC2bNE' },
      { title: 'SQL Tutorial - freeCodeCamp', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' }
    ],
    reading: [
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/current/' },
      { title: 'MySQL Documentation', url: 'https://dev.mysql.com/doc/' },
      { title: 'W3Schools SQL Tutorial', url: 'https://www.w3schools.com/sql/' }
    ],
    pdfs: [
      { title: 'Database System Concepts Slides PDF', url: 'https://www.db-book.com/db7/slides-dir/PDF-dir/ch1.pdf' }
    ],
    practice: [
      { title: 'SQLBolt Interactive SQL', url: 'https://sqlbolt.com/' },
      { title: 'HackerRank SQL Practice', url: 'https://www.hackerrank.com/domains/sql' }
    ]
  },
  dsa: {
    videos: [
      { title: 'Data Structures Easy to Advanced - freeCodeCamp', url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM' },
      { title: 'Algorithms Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=8hly31xKli0' }
    ],
    reading: [
      { title: 'CP Algorithms', url: 'https://cp-algorithms.com/' },
      { title: 'GeeksforGeeks DSA Tutorial', url: 'https://www.geeksforgeeks.org/data-structures/' },
      { title: 'VisuAlgo Visualizations', url: 'https://visualgo.net/en' }
    ],
    pdfs: [
      { title: 'Open Data Structures PDF', url: 'https://opendatastructures.org/ods-java.pdf' }
    ],
    practice: [
      { title: 'LeetCode Problemset', url: 'https://leetcode.com/problemset/' },
      { title: 'HackerRank Data Structures', url: 'https://www.hackerrank.com/domains/data-structures' }
    ]
  },
  webdev: {
    videos: [
      { title: 'HTML CSS JavaScript Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=mU6anWqZJcc' },
      { title: 'React Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' }
    ],
    reading: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
      { title: 'React Documentation', url: 'https://react.dev/learn' },
      { title: 'Express Documentation', url: 'https://expressjs.com/' }
    ],
    pdfs: [
      { title: 'HTML Standard Multipage', url: 'https://html.spec.whatwg.org/multipage/' }
    ],
    practice: [
      { title: 'Frontend Mentor Challenges', url: 'https://www.frontendmentor.io/challenges' },
      { title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' }
    ]
  }
};

const defaultLinks = subjectResourceLinks.webdev;

export function evaluateStage({ subjectId, answers = [], stageType = 'knowledge' }) {
  const subject = subjects[subjectId] || subjects.java;
  const correct = answers.filter((item) => item.selected === item.answer).length;
  const total = Math.max(answers.length, 1);
  const accuracy = Math.round((correct / total) * 100);
  const possibleMarks = answers.reduce((sum, item) => sum + Number(item.difficulty || 1), 0) || total;
  const obtainedMarks = answers.reduce((sum, item) => sum + (item.selected === item.answer ? Number(item.difficulty || 1) : 0), 0);
  const marksPercentage = Math.round((obtainedMarks / possibleMarks) * 100);
  const reactionTimes = answers.map((item) => Number(item.timeTaken || 0)).filter(Boolean);
  const averageReactionTime = Math.round(avg(reactionTimes) || 18);
  const stageDuration = Math.round(Number(answers[0]?.stageDuration || 0));
  const attentionScore = Math.round(Number(answers[0]?.attentionScore || 0));
  const weakConcepts = answers.filter((item) => item.selected !== item.answer).map((item) => item.topic);
  const strongConcepts = answers.filter((item) => item.selected === item.answer).map((item) => item.topic);
  const behaviorLift = stageType === 'video'
    ? Math.min(12, Math.round(attentionScore / 10))
    : stageType === 'reading'
      ? Math.max(-8, Math.min(10, Math.round((stageDuration - 20) / 8)))
      : 0;
  const retention = stageType === 'video' || stageType === 'reading'
    ? Math.max(35, Math.min(96, accuracy + (averageReactionTime < 20 ? 8 : -6) + behaviorLift))
    : Math.max(40, accuracy - 5);

  return {
    subject: subject.name,
    stageType,
    accuracy,
    marks: obtainedMarks,
    totalMarks: possibleMarks,
    marksPercentage,
    correct,
    total,
    averageReactionTime,
    speed: averageReactionTime <= 12 ? 'Fast' : averageReactionTime <= 24 ? 'Moderate' : 'Slow',
    weakConcepts: [...new Set(weakConcepts)],
    strongConcepts: [...new Set(strongConcepts)],
    retention,
    stageDuration,
    attentionScore,
    engagement: Math.max(45, Math.min(98, 100 - averageReactionTime + correct * 3 + Math.round(attentionScore / 8)))
  };
}

export function detectLearningProfile({ knowledge, video, reading }) {
  const reactionScore = clamp(100 - (((knowledge?.averageReactionTime || 22) - 8) * 4));
  const retentionScore = clamp(avg([video?.retention || 0, reading?.retention || 0]));
  const comprehensionScore = clamp(avg([video?.accuracy || 0, reading?.accuracy || 0]));
  const marksScore = clamp(avg([knowledge?.marksPercentage || knowledge?.accuracy || 0, video?.marksPercentage || video?.accuracy || 0, reading?.marksPercentage || reading?.accuracy || 0]));
  const scores = {
    problemSolving: knowledge?.accuracy || 0,
    visual: video?.retention || 0,
    textual: reading?.retention || 0
  };
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const averageAccuracy = Math.round(avg([knowledge?.accuracy || 0, video?.accuracy || 0, reading?.accuracy || 0]));
  const averageReaction = Math.round(avg([knowledge?.averageReactionTime || 20, video?.averageReactionTime || 20, reading?.averageReactionTime || 20]));
  const consistency = Math.max(35, 100 - Math.round(Math.abs((knowledge?.accuracy || 0) - averageAccuracy) + Math.abs((video?.accuracy || 0) - averageAccuracy) + Math.abs((reading?.accuracy || 0) - averageAccuracy)) / 2);
  const compositeScore = clamp((marksScore * 0.3) + (averageAccuracy * 0.25) + (retentionScore * 0.2) + (comprehensionScore * 0.15) + (reactionScore * 0.1));
  const category = compositeScore >= 82 && averageReaction <= 18 && retentionScore >= 75
    ? 'Professional / Advanced'
    : compositeScore >= 58 && averageAccuracy >= 50
      ? 'Intermediate'
      : 'Beginner';

  return {
    learningStyle: top[0] === 'visual' ? 'Visual Learner' : top[0] === 'textual' ? 'Reading/Text Learner' : 'Problem-Solving Learner',
    category,
    compositeScore,
    marksScore,
    retentionScore,
    comprehensionScore,
    reactionScore,
    averageAccuracy,
    averageReactionTime: averageReaction,
    consistency,
    confidence: Math.max(42, Math.min(96, averageAccuracy + (averageReaction < 18 ? 8 : 0))),
    retention: Math.round(avg([video?.retention || 0, reading?.retention || 0])),
    weakConcepts: [...new Set([...(knowledge?.weakConcepts || []), ...(video?.weakConcepts || []), ...(reading?.weakConcepts || [])])],
    strongConcepts: [...new Set([...(knowledge?.strongConcepts || []), ...(video?.strongConcepts || []), ...(reading?.strongConcepts || [])])]
  };
}

export function generateAdaptiveRoadmap({ subjectId, profile }) {
  const subject = subjects[subjectId] || subjects.java;
  const topics = profile.category === 'Professional / Advanced'
    ? subject.advancedTopics
    : profile.category === 'Intermediate'
      ? subject.intermediateTopics
      : subject.beginnerTopics;

  return topics.map((topic, index) => ({
    id: `${subject.id}-${index + 1}`,
    week: `Week ${Math.floor(index / 2) + 1}`,
    topic,
    difficulty: profile.category,
    explanationDepth: profile.category === 'Beginner' ? 'simple examples and guided practice' : profile.category === 'Intermediate' ? 'balanced theory and tasks' : 'advanced projects and challenges',
    resourceType: profile.learningStyle,
    dailyGoal: `Study ${topic} for ${profile.category === 'Beginner' ? 30 : 45} minutes`,
    task: profile.category === 'Professional / Advanced' ? `Build or solve an advanced ${topic} challenge` : `Complete guided ${topic} practice`,
    mandatoryAssessment: '5-question topic completion assessment required',
    resources: buildTopicResources({ subjectId, topic, category: profile.category, learningStyle: profile.learningStyle }),
    revisionResources: buildTopicResources({ subjectId, topic, category: 'Beginner', learningStyle: profile.learningStyle }).slice(0, 3),
    revisionTrigger: profile.weakConcepts.includes(topic) ? 'High priority revision' : 'Normal spaced revision'
  }));
}

function buildTopicResources({ subjectId, topic, category, learningStyle }) {
  const links = subjectResourceLinks[subjectId] || defaultLinks;
  const style = learningStyle || 'Problem-Solving Learner';
  const counts = style === 'Visual Learner'
    ? { videos: 3, reading: 1, pdfs: 1, practice: 1 }
    : style === 'Reading/Text Learner'
      ? { videos: 1, reading: 3, pdfs: 2, practice: 1 }
      : { videos: 1, reading: 1, pdfs: 1, practice: 3 };
  const levelPrefix = category === 'Professional / Advanced' ? 'Advanced' : category === 'Intermediate' ? 'Practical' : 'Beginner-friendly';
  const from = (type, count) => links[type].slice(0, count).map((item) => ({ ...item, type, focus: `${levelPrefix} ${topic}` }));

  return [
    ...from('videos', counts.videos),
    ...from('reading', counts.reading),
    ...from('pdfs', counts.pdfs),
    ...from('practice', counts.practice)
  ];
}

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export function generateTaskQuiz({ subjectId, topic }) {
  const subject = subjects[subjectId] || subjects.java;
  const matched = subject.mcqs.filter((item) => item.topic === topic);
  const fallback = subject.mcqs.filter((item) => !matched.includes(item));
  const base = shuffle([...matched, ...fallback]);
  const generated = Array.from({ length: Math.max(0, 6 - base.length) }, (_, index) => ({
    id: `${subject.id}-${topic.toLowerCase().replace(/\s+/g, '-')}-g${index + 1}`,
    topic,
    question: `${index % 2 === 0 ? 'Conceptual' : 'Applied'} check: what is the best next step when working with ${topic}?`,
    options: ['Understand the concept and apply it in a small example', 'Skip fundamentals', 'Memorize only names', 'Ignore errors'],
    answer: 'Understand the concept and apply it in a small example',
    difficulty: index < 2 ? 1 : 2
  }));
  const selected = [...base, ...generated].slice(0, 6).map(({ id, topic: itemTopic, question, options, difficulty, answer }) => ({
    id,
    topic: itemTopic,
    question,
    options,
    difficulty,
    answer
  }));

  return {
    topic,
    questions: selected
  };
}

export function evaluateTask({ subjectId, topic, answers = [] }) {
  const subject = subjects[subjectId] || subjects.java;
  const pool = subject.mcqs;
  const validAnswers = answers.filter((item) => item && item.selected);
  const total = Math.max(validAnswers.length, 1);
  const correct = validAnswers.filter((item) => {
    const original = pool.find((question) => question.id === item.id);
    return (original?.answer || item.answer) === item.selected;
  }).length;
  const accuracy = Math.round((correct / total) * 100);
  const reactionTimes = validAnswers.map((item) => Number(item.timeTaken || 0)).filter(Boolean);
  const averageReactionTime = Math.round(avg(reactionTimes) || 20);

  return {
    topic,
    accuracy,
    mastery: accuracy,
    averageReactionTime,
    correct,
    total,
    incorrect: Math.max(0, total - correct),
    completionDate: new Date().toISOString().slice(0, 10),
    masteryLevel: accuracy >= 85 ? 'Strong' : accuracy >= 60 ? 'Developing' : 'Needs Revision',
    improvementRate: accuracy >= 85 ? 'Accelerating' : accuracy >= 60 ? 'Stable' : 'Needs intervention',
    timeTaken: Math.max(10, averageReactionTime * total),
    weakConcepts: validAnswers.filter((item) => {
      const original = pool.find((question) => question.id === item.id);
      return (original?.answer || item.answer) !== item.selected;
    }).map((item) => item.topic),
    strongConcepts: validAnswers.filter((item) => {
      const original = pool.find((question) => question.id === item.id);
      return (original?.answer || item.answer) === item.selected;
    }).map((item) => item.topic)
  };
}

export function computeEfficiency({ analysis, taskResults = [] }) {
  const averageMastery = Math.round(avg(taskResults.map((result) => result.mastery || 0)));
  const averageResponse = Math.round(avg(taskResults.map((result) => result.averageReactionTime || 20)));
  const finalScore = Math.round((analysis.averageAccuracy * 0.4) + (averageMastery * 0.6));
  const performance = finalScore >= 85 ? 'Highly efficient' : finalScore >= 70 ? 'Efficient' : 'Needs improvement';
  const recommendation = finalScore >= 85
    ? 'Continue to new subjects and practice with confidence. Your efficiency is strong.'
    : finalScore >= 70
      ? 'Review weaker topics and retake a short test after one week.'
      : 'Revisit the roadmap tasks and repeat guided quizzes to strengthen your efficiency.';

  return {
    finalScore,
    performance,
    averageMastery,
    averageResponse,
    recommendation,
    summary: `Your roadmap task efficiency is ${performance.toLowerCase()} with a ${finalScore}% composite score.`
  };
}

export function recommendResources({ subjectId, learningStyle }) {
  return buildTopicResources({ subjectId, topic: 'current roadmap topic', category: 'Intermediate', learningStyle });
}
