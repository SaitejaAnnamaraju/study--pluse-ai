export const subjects = [
  {
    id: 'dbms',
    name: 'DBMS',
    description: 'Database design, SQL, and normalization.',
    color: 'from-cyan-400 to-blue-700',
    level: 'Intermediate',
    progress: 42,
    accuracy: 75,
    retention: 68,
    weakTopics: ['Normalization', 'ACID Transactions'],
    strongTopics: ['SQL Basics', 'ER Modeling']
  },
  {
    id: 'os',
    name: 'Operating Systems',
    description: 'Processes, memory, scheduling, and concurrency.',
    color: 'from-violet-400 to-indigo-700',
    level: 'Beginner',
    progress: 28,
    accuracy: 63,
    retention: 60,
    weakTopics: ['Virtual Memory', 'Thread synchronization'],
    strongTopics: ['Process Lifecycle', 'CPU Scheduling']
  }
];

export const onboardingOptions = {
  educationLevels: ['BTech', 'BE', 'Degree', 'Diploma', 'Other'],
  departments: ['CSE', 'IT', 'ECE', 'Mechanical', 'Civil', 'AI & DS'],
  subjects: ['DBMS', 'Operating Systems', 'Java', 'Python', 'Data Structures']
};

export const demoMilestones = [
  { title: 'XP', value: 1520 },
  { title: 'Streak', value: '9 Days' },
  { title: 'Badges', value: '4 Achieved' }
];

export const demoHistory = [
  { date: '2026-05-12', subject: 'DBMS', score: 78, type: 'Knowledge Test' },
  { date: '2026-05-14', subject: 'OS', score: 62, type: 'Video Comprehension' },
  { date: '2026-05-15', subject: 'DBMS', score: 84, type: 'Final Assessment' }
];
