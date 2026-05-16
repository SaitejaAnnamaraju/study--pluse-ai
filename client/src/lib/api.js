const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export const fetchQuestions = (subjectId, stage) => request(`/api/catalog/subjects/${subjectId}/questions${stage ? `?stage=${stage}` : ''}`);

export const api = {
  catalog: () => request('/api/catalog'),
  subject: (subjectId) => request(`/api/catalog/subjects/${subjectId}`),
  questions: (subjectId, stage) => request(`/api/catalog/subjects/${subjectId}/questions${stage ? `?stage=${stage}` : ''}`),
  evaluateStage: (payload) => request('/api/adaptive/stage', { method: 'POST', body: JSON.stringify(payload) }),
  detectProfile: (payload) => request('/api/adaptive/profile', { method: 'POST', body: JSON.stringify(payload) }),
  roadmap: (payload) => request('/api/adaptive/roadmap', { method: 'POST', body: JSON.stringify(payload) }),
  taskQuiz: (payload) => request('/api/adaptive/task-quiz', { method: 'POST', body: JSON.stringify(payload) }),
  taskEvaluate: (payload) => request('/api/adaptive/task-evaluate', { method: 'POST', body: JSON.stringify(payload) }),
  efficiencyCheck: (payload) => request('/api/adaptive/efficiency', { method: 'POST', body: JSON.stringify(payload) }),
  topicResult: (payload) => request('/api/adaptive/topic-result', { method: 'POST', body: JSON.stringify(payload) }),
  chat: (payload) => request('/api/ai/chat', { method: 'POST', body: JSON.stringify(payload) })
};
