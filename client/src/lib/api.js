import {
  offlineCatalog,
  offlineEvaluateStage,
  offlineMentor,
  offlineProfile,
  offlineQuestions,
  offlineRoadmap,
  offlineSubject,
  offlineTaskEvaluate,
  offlineTaskQuiz
} from './offlineStudy.js';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:4000');
const REQUEST_TIMEOUT_MS = 20000;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeout || REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
      signal: controller.signal
    });
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      throw new Error(data?.error || data?.message || `Request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export const fetchQuestions = (subjectId, stage) => request(`/api/catalog/subjects/${subjectId}/questions${stage ? `?stage=${stage}` : ''}`)
  .catch(() => offlineQuestions(subjectId, stage));
export const sendChatMessage = (messages, context = {}) => request('/api/ai/chat', { method: 'POST', body: JSON.stringify({ messages, context }) })
  .catch(() => ({ mode: 'offline', response: offlineMentor({ messages, context }) }));
export const analyzeProfile = (payload) => request('/api/adaptive/profile', { method: 'POST', body: JSON.stringify(payload) })
  .catch(() => offlineProfile(payload));
export const fetchRoadmap = (subjectId, profile = {}) => request('/api/adaptive/roadmap', { method: 'POST', body: JSON.stringify({ subjectId, profile }) })
  .catch(() => offlineRoadmap({ subjectId, profile }));

export const api = {
  catalog: () => request('/api/catalog').catch(() => offlineCatalog()),
  subject: (subjectId) => request(`/api/catalog/subjects/${subjectId}`).catch(() => offlineSubject(subjectId)),
  questions: (subjectId, stage) => request(`/api/catalog/subjects/${subjectId}/questions${stage ? `?stage=${stage}` : ''}`).catch(() => offlineQuestions(subjectId, stage)),
  evaluateStage: (payload) => request('/api/adaptive/stage', { method: 'POST', body: JSON.stringify(payload) }).catch(() => offlineEvaluateStage(payload)),
  detectProfile: (payload) => request('/api/adaptive/profile', { method: 'POST', body: JSON.stringify(payload) }).catch(() => offlineProfile(payload)),
  roadmap: (payload) => request('/api/adaptive/roadmap', { method: 'POST', body: JSON.stringify(payload) }).catch(() => offlineRoadmap(payload)),
  taskQuiz: (payload) => request('/api/adaptive/task-quiz', { method: 'POST', body: JSON.stringify(payload) }).catch(() => offlineTaskQuiz(payload)),
  taskEvaluate: (payload) => request('/api/adaptive/task-evaluate', { method: 'POST', body: JSON.stringify(payload) }).catch(() => offlineTaskEvaluate(payload)),
  efficiencyCheck: (payload) => request('/api/adaptive/efficiency', { method: 'POST', body: JSON.stringify(payload) }),
  topicResult: (payload) => request('/api/adaptive/topic-result', { method: 'POST', body: JSON.stringify(payload) }),
  chat: (payload) => request('/api/ai/chat', { method: 'POST', body: JSON.stringify(payload) }).catch(() => ({
    mode: 'offline',
    response: offlineMentor(payload)
  }))
};
