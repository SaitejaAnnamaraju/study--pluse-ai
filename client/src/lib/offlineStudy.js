const subjects = {
  java: {
    id: 'java',
    name: 'Java',
    introVideo: 'grEKMHGYyns',
    paragraph: 'Java is an object-oriented programming language used to build reliable applications. Core Java learning begins with variables, data types, control flow, arrays, methods, classes, objects, inheritance, polymorphism, exceptions, collections, and threads.',
    beginnerTopics: ['Variables', 'Data Types', 'Loops', 'Arrays', 'Methods'],
    intermediateTopics: ['Exception Handling', 'Collections', 'Generics', 'Streams', 'JDBC'],
    advancedTopics: ['JVM Internals', 'Multithreading', 'Spring Boot', 'Microservices', 'System Design'],
    mcqs: [
      { id: 'j1', topic: 'Variables', question: 'Which keyword creates a subclass in Java?', options: ['extends', 'inherits', 'super', 'using'], answer: 'extends', difficulty: 1 },
      { id: 'j2', topic: 'Arrays', question: 'Array index starts from which value?', options: ['0', '1', '-1', 'Depends on JVM'], answer: '0', difficulty: 1 },
      { id: 'j3', topic: 'OOPs', question: 'Runtime polymorphism is commonly achieved using...', options: ['method overriding', 'method hiding only', 'package import', 'comments'], answer: 'method overriding', difficulty: 2 },
      { id: 'j4', topic: 'Exception Handling', question: 'Which block runs whether an exception occurs or not?', options: ['finally', 'catch', 'throw', 'throws'], answer: 'finally', difficulty: 2 },
      { id: 'j5', topic: 'Methods', question: 'What does method overloading mean?', options: ['same method name with different parameters', 'same variable twice', 'deleting a method', 'thread locking'], answer: 'same method name with different parameters', difficulty: 2 }
    ]
  },
  dbms: {
    id: 'dbms',
    name: 'DBMS',
    introVideo: 'ztHopE5Wnpc',
    paragraph: 'DBMS helps store, organize, and retrieve data reliably. Important concepts include tables, keys, ER diagrams, SQL queries, normalization, transactions, indexing, concurrency control, and recovery.',
    beginnerTopics: ['Tables', 'Keys', 'ER Diagrams', 'SQL Basics', 'Constraints'],
    intermediateTopics: ['Joins', 'Normalization', 'Transactions', 'Indexing', 'Views'],
    advancedTopics: ['Concurrency Control', 'Query Optimization', 'Recovery', 'Distributed Databases', 'Database Security'],
    mcqs: [
      { id: 'd1', topic: 'SQL Basics', question: 'Which SQL command reads records?', options: ['SELECT', 'DELETE', 'DROP', 'COMMIT'], answer: 'SELECT', difficulty: 1 },
      { id: 'd2', topic: 'Keys', question: 'A primary key must be...', options: ['unique and not null', 'always text', 'duplicated', 'optional'], answer: 'unique and not null', difficulty: 1 },
      { id: 'd3', topic: 'Normalization', question: 'Normalization mainly reduces...', options: ['redundancy', 'security', 'queries', 'tables'], answer: 'redundancy', difficulty: 2 },
      { id: 'd4', topic: 'Transactions', question: 'ACID isolation prevents...', options: ['unexpected transaction interference', 'all indexes', 'all joins', 'all users'], answer: 'unexpected transaction interference', difficulty: 2 },
      { id: 'd5', topic: 'Indexing', question: 'Indexes are mainly used to improve...', options: ['read performance', 'duplicate storage', 'password length', 'table names'], answer: 'read performance', difficulty: 3 }
    ]
  },
  dsa: {
    id: 'dsa',
    name: 'DSA',
    introVideo: 'RBSGKlAvoiM',
    paragraph: 'Data Structures and Algorithms teach how to organize data and solve problems efficiently. Start with arrays, strings, stacks, queues, linked lists, trees, graphs, hashing, sorting, searching, and complexity analysis.',
    beginnerTopics: ['Arrays', 'Strings', 'Stacks', 'Queues', 'Complexity Basics'],
    intermediateTopics: ['Linked Lists', 'Trees', 'Hashing', 'Sorting', 'Recursion'],
    advancedTopics: ['Graphs', 'Dynamic Programming', 'Greedy Algorithms', 'Advanced Trees', 'Interview Patterns'],
    mcqs: [
      { id: 's1', topic: 'Stacks', question: 'Which structure follows LIFO?', options: ['Stack', 'Queue', 'Graph', 'Tree'], answer: 'Stack', difficulty: 1 },
      { id: 's2', topic: 'Arrays', question: 'Binary search requires data to be...', options: ['sorted', 'encrypted', 'duplicated', 'deleted'], answer: 'sorted', difficulty: 1 },
      { id: 's3', topic: 'Trees', question: 'A node without children is called...', options: ['leaf', 'root only', 'edge', 'cycle'], answer: 'leaf', difficulty: 2 },
      { id: 's4', topic: 'Graphs', question: 'BFS usually uses a...', options: ['queue', 'stack only', 'compiler', 'database'], answer: 'queue', difficulty: 2 }
    ]
  },
  webdev: {
    id: 'webdev',
    name: 'Web Development',
    introVideo: 'nu_pCVPKzTk',
    paragraph: 'Web development combines HTML, CSS, JavaScript, browser behavior, APIs, backend logic, databases, authentication, deployment, performance, and accessibility.',
    beginnerTopics: ['HTML', 'CSS', 'JavaScript Basics', 'Responsive Design', 'DOM'],
    intermediateTopics: ['React', 'APIs', 'Node.js', 'Express', 'MongoDB'],
    advancedTopics: ['Authentication', 'Performance', 'Testing', 'Deployment', 'System Design'],
    mcqs: [
      { id: 'w1', topic: 'HTML', question: 'Which tag creates a hyperlink?', options: ['a', 'div', 'p', 'span'], answer: 'a', difficulty: 1 },
      { id: 'w2', topic: 'CSS', question: 'Flexbox is mainly used for...', options: ['layout', 'database', 'routing', 'encryption'], answer: 'layout', difficulty: 1 },
      { id: 'w3', topic: 'React', question: 'React state changes usually cause...', options: ['re-render', 'database deletion', 'server shutdown', 'CSS removal'], answer: 're-render', difficulty: 2 },
      { id: 'w4', topic: 'APIs', question: 'Express is commonly used to build...', options: ['backend APIs', 'image files', 'CPU chips', 'spreadsheets'], answer: 'backend APIs', difficulty: 2 }
    ]
  }
};

const generatedSubjects = [
  ['python', 'Python', 'rfscVS0vtbw', 'Python learning starts with variables, control flow, functions, collections, modules, file handling, exceptions, object-oriented programming, packages, APIs, testing, and automation.', ['Variables', 'Data Types', 'Conditionals', 'Loops', 'Functions'], ['Collections', 'Modules', 'File Handling', 'Exceptions', 'OOP'], ['Decorators', 'Async IO', 'FastAPI', 'Testing', 'Automation Pipelines']],
  ['ml', 'Machine Learning', 'GwIo3gDZCVQ', 'Machine learning studies how models learn patterns from data. Core areas include data preprocessing, supervised learning, regression, classification, clustering, evaluation, feature engineering, and model deployment.', ['Data Preprocessing', 'Regression', 'Classification', 'Model Evaluation', 'Feature Basics'], ['Clustering', 'Regularization', 'Feature Engineering', 'Pipelines', 'Model Selection'], ['Neural Networks', 'MLOps', 'Explainability', 'Model Serving', 'Production Monitoring']],
  ['digital-electronics', 'Digital Electronics', 'M0mx8S05v60', 'Digital electronics focuses on binary logic, gates, boolean algebra, combinational circuits, sequential circuits, flip-flops, counters, registers, memory, and digital system design.', ['Number Systems', 'Logic Gates', 'Boolean Algebra', 'K-Maps', 'Combinational Circuits'], ['Multiplexers', 'Flip-Flops', 'Counters', 'Registers', 'Memory Basics'], ['FSM Design', 'Timing Analysis', 'Verilog Basics', 'FPGA Flow', 'Digital System Design']],
  ['embedded-c', 'Embedded C', 'V7nP2T4hH2o', 'Embedded C applies C programming to microcontrollers and hardware. Students learn pointers, registers, bit operations, interrupts, timers, serial communication, sensors, and firmware design.', ['C Basics', 'Pointers', 'Bitwise Operators', 'Registers', 'GPIO'], ['Timers', 'Interrupts', 'UART', 'ADC', 'Sensor Interfacing'], ['RTOS Basics', 'Device Drivers', 'Low Power Design', 'Firmware Testing', 'Hardware Debugging']],
  ['signals', 'Signals and Systems', 'r18Gi8lSkfM', 'Signals and systems studies signal representation, transforms, convolution, frequency response, sampling, filters, and system behavior in time and frequency domains.', ['Signal Types', 'System Properties', 'Convolution', 'Fourier Series', 'Sampling'], ['Fourier Transform', 'Laplace Transform', 'Z Transform', 'Filters', 'Frequency Response'], ['DSP Basics', 'Stability Analysis', 'Filter Design', 'State Space', 'Communication Signals']],
  ['cloud', 'Cloud Computing', '2LaAJq1lB1Q', 'Cloud computing covers virtualized infrastructure, storage, networking, containers, serverless functions, security, monitoring, deployment automation, and scalable system design.', ['Cloud Basics', 'Virtual Machines', 'Storage', 'Networking', 'IAM'], ['Containers', 'Serverless', 'Databases', 'Monitoring', 'CI/CD'], ['Kubernetes', 'Cloud Security', 'Cost Optimization', 'High Availability', 'Cloud Architecture']],
  ['statistics', 'Statistics', 'xxpc-HPKN28', 'Statistics supports data analysis through descriptive measures, probability, distributions, sampling, hypothesis testing, correlation, regression, and inference.', ['Mean Median Mode', 'Probability', 'Distributions', 'Sampling', 'Variance'], ['Hypothesis Testing', 'Correlation', 'Regression', 'Confidence Intervals', 'ANOVA'], ['Bayesian Statistics', 'Time Series', 'Experimental Design', 'Multivariate Analysis', 'Statistical Modeling']]
];

generatedSubjects.forEach(([id, name, introVideo, paragraph, beginnerTopics, intermediateTopics, advancedTopics]) => {
  subjects[id] = {
    id,
    name,
    introVideo,
    paragraph,
    beginnerTopics,
    intermediateTopics,
    advancedTopics,
    mcqs: beginnerTopics.map((topic, index) => ({
      id: `${id}-${index + 1}`,
      topic,
      question: `Which option best represents the role of ${topic} in ${name}?`,
      options: ['Core concept', 'Deployment platform only', 'Design color', 'Unrelated syntax'],
      answer: 'Core concept',
      difficulty: index < 2 ? 1 : 2
    }))
  };
});

const genericSubject = (id) => ({
  ...subjects.webdev,
  id,
  name: id.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ')
});

const getSubject = (subjectId = 'java') => subjects[subjectId] || genericSubject(subjectId);
const avg = (items) => items.length ? items.reduce((sum, value) => sum + value, 0) / items.length : 0;
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

export function offlineCatalog() {
  return {
    catalog: {
      courses: [
        {
          id: 'btech',
          name: 'B.Tech',
          departments: [
            { id: 'cse', name: 'CSE', subjects: ['java', 'dbms', 'dsa', 'webdev'] },
            { id: 'aiml', name: 'AIML', subjects: ['python', 'ml', 'dsa', 'webdev'] },
            { id: 'ece', name: 'ECE', subjects: ['digital-electronics', 'embedded-c', 'signals'] },
            { id: 'it', name: 'IT', subjects: ['java', 'dbms', 'webdev', 'cloud'] }
          ]
        },
        {
          id: 'degree',
          name: 'Degree',
          departments: [
            { id: 'computer-science', name: 'Computer Science', subjects: ['python', 'dbms', 'webdev'] },
            { id: 'data-science', name: 'Data Science', subjects: ['python', 'ml', 'statistics'] }
          ]
        }
      ]
    },
    subjects: Object.values(subjects)
  };
}

export function offlineSubject(subjectId) {
  return getSubject(subjectId);
}

export function offlineQuestions(subjectId, stage = 'knowledge') {
  const questions = getSubject(subjectId).mcqs;
  if (stage === 'video') return { questions: questions.slice(0, 3) };
  if (stage === 'reading') return { questions: questions.slice(-3) };
  return { questions: questions.slice(0, 5) };
}

export function offlineEvaluateStage({ subjectId = 'java', answers = [], stageType = 'knowledge' }) {
  const subject = getSubject(subjectId);
  const total = Math.max(answers.length, 1);
  const correct = answers.filter((item) => item.selected === item.answer).length;
  const accuracy = Math.round((correct / total) * 100);
  const possibleMarks = answers.reduce((sum, item) => sum + Number(item.difficulty || 1), 0) || total;
  const obtainedMarks = answers.reduce((sum, item) => sum + (item.selected === item.answer ? Number(item.difficulty || 1) : 0), 0);
  const averageReactionTime = Math.round(avg(answers.map((item) => Number(item.timeTaken || 0)).filter(Boolean)) || 18);

  return {
    subject: subject.name,
    stageType,
    accuracy,
    marks: obtainedMarks,
    totalMarks: possibleMarks,
    marksPercentage: Math.round((obtainedMarks / possibleMarks) * 100),
    correct,
    total,
    averageReactionTime,
    speed: averageReactionTime <= 12 ? 'Fast' : averageReactionTime <= 24 ? 'Moderate' : 'Slow',
    weakConcepts: [...new Set(answers.filter((item) => item.selected !== item.answer).map((item) => item.topic))],
    strongConcepts: [...new Set(answers.filter((item) => item.selected === item.answer).map((item) => item.topic))],
    retention: stageType === 'knowledge' ? Math.max(40, accuracy - 5) : Math.max(35, Math.min(96, accuracy + 6)),
    stageDuration: Math.round(Number(answers[0]?.stageDuration || 0)),
    attentionScore: Math.round(Number(answers[0]?.attentionScore || 0)),
    engagement: Math.max(45, Math.min(98, 100 - averageReactionTime + correct * 3))
  };
}

export function offlineProfile({ knowledge, video, reading }) {
  const averageAccuracy = Math.round(avg([knowledge?.accuracy || 0, video?.accuracy || 0, reading?.accuracy || 0]));
  const retentionScore = clamp(avg([video?.retention || 0, reading?.retention || 0]));
  const marksScore = clamp(avg([knowledge?.marksPercentage || 0, video?.marksPercentage || 0, reading?.marksPercentage || 0]));
  const compositeScore = clamp((marksScore * 0.45) + (averageAccuracy * 0.35) + (retentionScore * 0.2));
  const category = compositeScore >= 82 ? 'Professional / Advanced' : compositeScore >= 58 ? 'Intermediate' : 'Beginner';

  return {
    learningStyle: (video?.retention || 0) >= (reading?.retention || 0) ? 'Visual Learner' : 'Reading/Text Learner',
    category,
    compositeScore,
    marksScore,
    retentionScore,
    comprehensionScore: clamp(avg([video?.accuracy || 0, reading?.accuracy || 0])),
    reactionScore: clamp(100 - (((knowledge?.averageReactionTime || 22) - 8) * 4)),
    averageAccuracy,
    averageReactionTime: Math.round(avg([knowledge?.averageReactionTime || 20, video?.averageReactionTime || 20, reading?.averageReactionTime || 20])),
    consistency: 75,
    confidence: Math.max(42, Math.min(96, averageAccuracy + 6)),
    retention: retentionScore,
    weakConcepts: [...new Set([...(knowledge?.weakConcepts || []), ...(video?.weakConcepts || []), ...(reading?.weakConcepts || [])])],
    strongConcepts: [...new Set([...(knowledge?.strongConcepts || []), ...(video?.strongConcepts || []), ...(reading?.strongConcepts || [])])]
  };
}

export function offlineRoadmap({ subjectId = 'java', profile = {} }) {
  const subject = getSubject(subjectId);
  const topics = profile.category === 'Professional / Advanced'
    ? subject.advancedTopics
    : profile.category === 'Intermediate'
      ? subject.intermediateTopics
      : subject.beginnerTopics;

  return {
    roadmap: topics.map((topic, index) => ({
      id: `${subject.id}-${index + 1}`,
      week: `Week ${Math.floor(index / 2) + 1}`,
      topic,
      difficulty: profile.category || 'Beginner',
      explanationDepth: 'balanced theory and tasks',
      resourceType: profile.learningStyle || 'adaptive',
      dailyGoal: `Study ${topic} for 30 minutes`,
      task: `Complete guided ${topic} practice`,
      mandatoryAssessment: '5-question topic completion assessment required',
      resources: [],
      revisionResources: [],
      revisionTrigger: 'Normal spaced revision'
    })),
    resources: []
  };
}

export function offlineTaskQuiz({ subjectId = 'java', topic = 'current topic' }) {
  return {
    topic,
    questions: getSubject(subjectId).mcqs.slice(0, 5)
  };
}

export function offlineTaskEvaluate({ subjectId = 'java', topic = '', answers = [] }) {
  const stage = offlineEvaluateStage({ subjectId, answers, stageType: 'topic' });
  return {
    ...stage,
    topic,
    mastery: stage.accuracy,
    masteryLevel: stage.accuracy >= 85 ? 'Strong' : stage.accuracy >= 60 ? 'Developing' : 'Needs Revision',
    recommendation: stage.accuracy < 60 ? `Revise ${topic}, then retake a short quiz.` : `Continue to the next topic.`
  };
}

export function offlineMentor({ messages = [], context = {} }) {
  const latest = String(messages.at(-1)?.content || '').trim();
  const topic = context.topic || context.subject || 'your current topic';

  if (/^(hi|hello|hey|hii|helle)/i.test(latest)) {
    return 'Hello! I am your StudyPulse AI mentor. Ask me for concept help, coding support, quizzes, or a study plan.';
  }
  if (/quiz|test/i.test(latest)) {
    return `Here is a quick quiz on ${topic}: define it, pick one use case, solve one example, find one mistake, and explain why the correct answer works.`;
  }
  if (/roadmap|plan/i.test(latest)) {
    return `Study plan for ${topic}: learn the concept, watch or read one resource, practice for 25 minutes, then take a short quiz.`;
  }
  if (/java/i.test(latest)) {
    return 'Java is an object-oriented programming language used for apps, backend services, and enterprise systems. Next action: ask for a simple Java program.';
  }

  return `Let me explain ${topic} simply: understand the purpose first, see one example, then answer one small question. Next action: ask me for an example.`;
}
