import { Bot, Send, X } from 'lucide-react';
import { useState } from 'react';
import { api } from '../lib/api.js';

const mentorPrompts = [
  'What is Java?',
  'Explain DBMS with example',
  'Difference between stack and queue',
  'Generate quiz',
  'Make study plan',
  'I am confused'
];

export default function Chatbot({ profile, analysis, roadmap }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'I am StudyPulse AI. Ask me for concept help, coding support, quiz generation, or roadmap guidance.' }]);

  const send = async (text = input) => {
    if (!text.trim()) return;
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const result = await api.chat({
        messages: next,
        context: {
          subject: profile?.subject,
          topic: getCurrentTopic(profile, roadmap),
          category: analysis?.category,
          learningStyle: analysis?.learningStyle,
          weakConcepts: analysis?.weakConcepts || [],
          roadmapProgress: getRoadmapProgress(profile)
        }
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: result.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'I could not reach the AI service right now, but you can ask again after checking the server is running. For example, ask "What is Java?" or "Explain DBMS".' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="glass mb-3 w-[390px] max-w-[calc(100vw-1.5rem)] rounded-xl p-4 shadow-glow">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-semibold">AI Learning Assistant</h3>
              <p className="text-xs text-slate-300">{profile?.subject || 'No subject'} - {analysis?.learningStyle || 'analysis pending'}</p>
            </div>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="max-h-80 space-y-3 overflow-auto pr-2">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'assistant' ? 'rounded-lg bg-slate-950/80 p-3 text-sm' : 'ml-8 rounded-lg bg-cyan-300/15 p-3 text-sm'}>
                {message.content}
              </div>
            ))}
            {loading && <div className="rounded-lg bg-slate-950/80 p-3 text-sm text-slate-300">Thinking...</div>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {mentorPrompts.map((item) => (
              <button key={item} onClick={() => send(item)} className="rounded-full bg-white/10 px-3 py-1 text-xs">{item}</button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm outline-none" placeholder="Ask StudyPulse AI..." />
            <button onClick={() => send()} className="rounded-lg bg-cyan-400 px-3 text-slate-950"><Send size={16} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-4 font-semibold text-slate-950 shadow-glow">
        <Bot size={18} /> AI Mentor
      </button>
    </div>
  );
}

function getCurrentTopic(profile, roadmap) {
  const subjectId = profile?.subject;
  const records = JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
  const completed = records[subjectId]?.topicResults || {};
  const nextTopic = (roadmap?.roadmap || []).find((item) => !completed[item.id]);
  return nextTopic?.topic || Object.values(completed).at(-1)?.topic || 'current topic';
}

function getRoadmapProgress(profile) {
  const subjectId = profile?.subject;
  const records = JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
  const topicResults = Object.values(records[subjectId]?.topicResults || {});
  return topicResults.map((result) => ({
    topic: result.topic,
    accuracy: result.accuracy,
    masteryLevel: result.masteryLevel
  }));
}
