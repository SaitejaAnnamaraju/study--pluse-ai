import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sendChatMessage } from '../lib/api.js';

const suggestedPrompts = [
  'Explain DBMS normalization in simple words.',
  'Give me a quick quiz on operating systems.',
  'Recommend a study plan for next week.'
];

export default function ChatWidget({ userContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your StudyPulse AI mentor. Ask me anything about your learning path.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [open, messages]);

  const sendMessage = async (messageText) => {
    const userMessage = { role: 'user', content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const result = await sendChatMessage(updatedMessages, userContext);
      setMessages((prev) => [...prev, { role: 'assistant', content: result.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Unable to reach the AI assistant. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrompt = (prompt) => {
    setInput(prompt);
    sendMessage(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl border border-white/10 p-4 shadow-glass"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div>
                <h2 className="text-lg font-semibold">AI Study Mentor</h2>
                <p className="text-sm text-slate-300">Context-aware tutoring for your current subject.</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white">Close</button>
            </div>
            <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
              {messages.map((message, index) => (
                <div key={index} className={message.role === 'assistant' ? 'rounded-2xl bg-slate-900/90 p-3 text-sm text-slate-100' : 'rounded-2xl bg-slate-700/80 p-3 text-sm text-white self-end'}>
                  {message.content}
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button key={prompt} onClick={() => handlePrompt(prompt)} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100 transition hover:bg-slate-700">
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask the AI mentor..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
                />
                <button disabled={loading || !input.trim()} onClick={() => sendMessage(input.trim())} className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? 'Thinking...' : 'Send'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((prev) => !prev)} className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 p-4 shadow-glass text-slate-950 transition hover:scale-105">
        AI Tutor
      </button>
    </div>
  );
}
