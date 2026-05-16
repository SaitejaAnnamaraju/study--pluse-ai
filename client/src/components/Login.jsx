import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLogin = () => {
    const user = {
      fullName: fullName || 'Student Learner',
      email,
      isAuthenticated: true,
      createdAt: Date.now()
    };
    onLogin(user);
    navigate('/onboarding');
  };

  const handleGoogleLogin = () => {
    const user = {
      fullName: 'Google User',
      email: 'student@google.com',
      isAuthenticated: true,
      createdAt: Date.now()
    };
    onLogin(user);
    navigate('/onboarding');
  };

  return (
    <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
      <h2 className="text-3xl font-semibold">Welcome back to StudyPulse</h2>
      <p className="mt-3 text-slate-300">Login to resume your adaptive learning journey with personalized tasks and AI mentor support.</p>
      <div className="mt-8 space-y-4">
        <button onClick={handleGoogleLogin} className="w-full rounded-3xl bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
          Continue with Google
        </button>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <label className="block text-sm text-slate-300">Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none" placeholder="Full Name" />
          <label className="mt-4 block text-sm text-slate-300">Email address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none" placeholder="email@example.com" />
          <button onClick={handleLogin} disabled={!email} className="mt-6 w-full rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
            Continue with Email
          </button>
        </div>
      </div>
    </div>
  );
}
