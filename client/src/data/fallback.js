export const fallbackSubjects = [
  { id: 'java', name: 'Java' },
  { id: 'dbms', name: 'DBMS' },
  { id: 'dsa', name: 'DSA' },
  { id: 'webdev', name: 'Web Development' }
];

export const fallbackCatalog = {
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
  subjects: [
    { id: 'java', name: 'Java' },
    { id: 'dbms', name: 'DBMS' },
    { id: 'dsa', name: 'DSA' },
    { id: 'webdev', name: 'Web Development' },
    { id: 'python', name: 'Python' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'digital-electronics', name: 'Digital Electronics' },
    { id: 'embedded-c', name: 'Embedded C' },
    { id: 'signals', name: 'Signals and Systems' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'statistics', name: 'Statistics' }
  ]
};
