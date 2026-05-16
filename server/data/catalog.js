export const catalog = {
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
};

const makeSubject = ({ id, name, video, paragraph, beginnerTopics, intermediateTopics, advancedTopics }) => ({
  id,
  name,
  introVideo: video,
  paragraph,
  beginnerTopics,
  intermediateTopics,
  advancedTopics,
  resources: {
    visual: [`${name} concept walkthrough video`, `${name} animated visual notes`, `${name} architecture infographic`],
    reading: [`${name} structured notes`, `${name} official documentation guide`, `${name} revision article`],
    practice: [`${name} MCQ drill`, `${name} lab exercise set`, `${name} project challenge`]
  },
  mcqs: beginnerTopics.slice(0, 5).map((topic, index) => ({
    id: `${id}-${index + 1}`,
    topic,
    question: `Which option best represents the role of ${topic} in ${name}?`,
    options: ['Core concept', 'Deployment platform only', 'Design color', 'Unrelated syntax'],
    answer: 'Core concept',
    difficulty: index < 2 ? 1 : 2
  }))
});

export const subjects = {
  java: {
    id: 'java',
    name: 'Java',
    introVideo: 'grEKMHGYyns',
    paragraph: 'Java is an object-oriented programming language used to build reliable applications. Core Java learning begins with variables, data types, control flow, arrays, methods, classes, objects, inheritance, polymorphism, exceptions, collections, and threads.',
    beginnerTopics: ['Variables', 'Data Types', 'Loops', 'Arrays', 'Methods', 'OOP Basics'],
    intermediateTopics: ['Exception Handling', 'Collections', 'Generics', 'Streams', 'JDBC', 'Unit Testing'],
    advancedTopics: ['JVM Internals', 'Multithreading', 'Spring Boot', 'Microservices', 'System Design', 'Performance Tuning'],
    resources: {
      visual: ['Java full course video', 'OOP animation', 'Memory model infographic'],
      reading: ['Oracle Java documentation', 'Collections notes PDF', 'Exception handling article'],
      practice: ['OOP MCQ drill', 'Array coding set', 'Collections coding kata']
    },
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
    resources: {
      visual: ['Normalization visual guide', 'SQL joins animation', 'Transaction timeline video'],
      reading: ['DBMS notes PDF', 'SQL documentation', 'Normalization article'],
      practice: ['SQL query lab', 'ER design task', 'Normalization worksheet']
    },
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
    resources: {
      visual: ['Tree traversal animation', 'Graph BFS video', 'Sorting visualization'],
      reading: ['Big-O notes', 'Tree article', 'Graph documentation'],
      practice: ['Array patterns', 'Stack problems', 'Graph traversal set']
    },
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
    resources: {
      visual: ['React crash course', 'CSS layout video', 'API flow diagram'],
      reading: ['MDN docs', 'React documentation', 'Express guide'],
      practice: ['Portfolio build', 'API integration task', 'Auth mini project']
    },
    mcqs: [
      { id: 'w1', topic: 'HTML', question: 'Which tag creates a hyperlink?', options: ['a', 'div', 'p', 'span'], answer: 'a', difficulty: 1 },
      { id: 'w2', topic: 'CSS', question: 'Flexbox is mainly used for...', options: ['layout', 'database', 'routing', 'encryption'], answer: 'layout', difficulty: 1 },
      { id: 'w3', topic: 'React', question: 'React state changes usually cause...', options: ['re-render', 'database deletion', 'server shutdown', 'CSS removal'], answer: 're-render', difficulty: 2 },
      { id: 'w4', topic: 'APIs', question: 'Express is commonly used to build...', options: ['backend APIs', 'image files', 'CPU chips', 'spreadsheets'], answer: 'backend APIs', difficulty: 2 }
    ]
  },
  python: makeSubject({
    id: 'python',
    name: 'Python',
    video: 'rfscVS0vtbw',
    paragraph: 'Python learning starts with variables, control flow, functions, collections, modules, file handling, exceptions, object-oriented programming, packages, APIs, testing, and automation.',
    beginnerTopics: ['Variables', 'Data Types', 'Conditionals', 'Loops', 'Functions'],
    intermediateTopics: ['Collections', 'Modules', 'File Handling', 'Exceptions', 'OOP'],
    advancedTopics: ['Decorators', 'Async IO', 'FastAPI', 'Testing', 'Automation Pipelines']
  }),
  ml: makeSubject({
    id: 'ml',
    name: 'Machine Learning',
    video: 'GwIo3gDZCVQ',
    paragraph: 'Machine learning studies how models learn patterns from data. Core areas include data preprocessing, supervised learning, regression, classification, clustering, evaluation, feature engineering, and model deployment.',
    beginnerTopics: ['Data Preprocessing', 'Regression', 'Classification', 'Model Evaluation', 'Feature Basics'],
    intermediateTopics: ['Clustering', 'Regularization', 'Feature Engineering', 'Pipelines', 'Model Selection'],
    advancedTopics: ['Neural Networks', 'MLOps', 'Explainability', 'Model Serving', 'Production Monitoring']
  }),
  'digital-electronics': makeSubject({
    id: 'digital-electronics',
    name: 'Digital Electronics',
    video: 'M0mx8S05v60',
    paragraph: 'Digital electronics focuses on binary logic, gates, boolean algebra, combinational circuits, sequential circuits, flip-flops, counters, registers, memory, and digital system design.',
    beginnerTopics: ['Number Systems', 'Logic Gates', 'Boolean Algebra', 'K-Maps', 'Combinational Circuits'],
    intermediateTopics: ['Multiplexers', 'Flip-Flops', 'Counters', 'Registers', 'Memory Basics'],
    advancedTopics: ['FSM Design', 'Timing Analysis', 'Verilog Basics', 'FPGA Flow', 'Digital System Design']
  }),
  'embedded-c': makeSubject({
    id: 'embedded-c',
    name: 'Embedded C',
    video: 'V7nP2T4hH2o',
    paragraph: 'Embedded C applies C programming to microcontrollers and hardware. Students learn pointers, registers, bit operations, interrupts, timers, serial communication, sensors, and firmware design.',
    beginnerTopics: ['C Basics', 'Pointers', 'Bitwise Operators', 'Registers', 'GPIO'],
    intermediateTopics: ['Timers', 'Interrupts', 'UART', 'ADC', 'Sensor Interfacing'],
    advancedTopics: ['RTOS Basics', 'Device Drivers', 'Low Power Design', 'Firmware Testing', 'Hardware Debugging']
  }),
  signals: makeSubject({
    id: 'signals',
    name: 'Signals and Systems',
    video: 'r18Gi8lSkfM',
    paragraph: 'Signals and systems studies signal representation, transforms, convolution, frequency response, sampling, filters, and system behavior in time and frequency domains.',
    beginnerTopics: ['Signal Types', 'System Properties', 'Convolution', 'Fourier Series', 'Sampling'],
    intermediateTopics: ['Fourier Transform', 'Laplace Transform', 'Z Transform', 'Filters', 'Frequency Response'],
    advancedTopics: ['DSP Basics', 'Stability Analysis', 'Filter Design', 'State Space', 'Communication Signals']
  }),
  cloud: makeSubject({
    id: 'cloud',
    name: 'Cloud Computing',
    video: '2LaAJq1lB1Q',
    paragraph: 'Cloud computing covers virtualized infrastructure, storage, networking, containers, serverless functions, security, monitoring, deployment automation, and scalable system design.',
    beginnerTopics: ['Cloud Basics', 'Virtual Machines', 'Storage', 'Networking', 'IAM'],
    intermediateTopics: ['Containers', 'Serverless', 'Databases', 'Monitoring', 'CI/CD'],
    advancedTopics: ['Kubernetes', 'Cloud Security', 'Cost Optimization', 'High Availability', 'Cloud Architecture']
  }),
  statistics: makeSubject({
    id: 'statistics',
    name: 'Statistics',
    video: 'xxpc-HPKN28',
    paragraph: 'Statistics supports data analysis through descriptive measures, probability, distributions, sampling, hypothesis testing, correlation, regression, and inference.',
    beginnerTopics: ['Mean Median Mode', 'Probability', 'Distributions', 'Sampling', 'Variance'],
    intermediateTopics: ['Hypothesis Testing', 'Correlation', 'Regression', 'Confidence Intervals', 'ANOVA'],
    advancedTopics: ['Bayesian Statistics', 'Time Series', 'Experimental Design', 'Multivariate Analysis', 'Statistical Modeling']
  })
};

export const demoUsers = [
  { name: 'Ananya', subject: 'Java', category: 'Intermediate', accuracy: 78, streak: 9 },
  { name: 'Rohan', subject: 'DBMS', category: 'Beginner', accuracy: 61, streak: 5 },
  { name: 'Meera', subject: 'DSA', category: 'Professional', accuracy: 91, streak: 16 }
];
