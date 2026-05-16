import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeProfile } from '../lib/api.js';

export default function OnboardingPage({ onProfile, onboardingOptions }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationLevel: 'BTech',
    department: 'CSE',
    year: '1st Year',
    subjects: ['DBMS'],
    resumeText: '',
    github: '',
    linkedIn: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const profilePayload = {
      fullName: form.fullName,
      email: form.email,
      educationLevel: form.educationLevel,
      department: form.department,
      subjects: form.subjects,
      githubUrl: form.github,
      linkedInUrl: form.linkedIn,
      resumeText: form.resumeText
    };
    const profileData = await analyzeProfile(profilePayload);
    onProfile(profileData);
    setLoading(false);
    setMessage('AI profile analysis complete — your roadmap is ready.');
    setTimeout(() => navigate('/dashboard'), 800);
  };

  return (
    <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
      <h2 className="text-3xl font-semibold">Student Onboarding</h2>
      <p className="mt-3 text-slate-300">Tell StudyPulse about your profile so the AI can generate a personalized learning strategy.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Full Name
            <input value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="Name" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Email
            <input value={form.email} onChange={(e) => updateField('email', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="Email" />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Phone Number
            <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="Phone" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Educational Level
            <select value={form.educationLevel} onChange={(e) => updateField('educationLevel', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none">
              {onboardingOptions.educationLevels.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Department
            <select value={form.department} onChange={(e) => updateField('department', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none">
              {onboardingOptions.departments.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            Current Year / Semester
            <input value={form.year} onChange={(e) => updateField('year', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="e.g. 3rd Year" />
          </label>
        </div>
        <div className="space-y-4">
          <label className="text-sm text-slate-300">Subject Selection</label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {onboardingOptions.subjects.map((subject) => (
              <button type="button" key={subject} onClick={() => updateField('subjects', [subject])} className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${form.subjects.includes(subject) ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-cyan-400'}`}>
                {subject}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            GitHub Profile URL
            <input value={form.github} onChange={(e) => updateField('github', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="https://github.com/" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            LinkedIn Profile URL
            <input value={form.linkedIn} onChange={(e) => updateField('linkedIn', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="https://linkedin.com/" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-300">
          Resume / CV Summary (optional)
          <textarea value={form.resumeText} onChange={(e) => updateField('resumeText', e.target.value)} rows={4} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="Paste resume summary or career goals..." />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-slate-400">AI profile analysis will create your personalized roadmap and learning style report.</div>
          <button disabled={!form.fullName || !form.email} className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Analyzing...' : 'Finish Onboarding'}</button>
        </div>
        {message && <p className="rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      </form>
    </div>
  );
}
