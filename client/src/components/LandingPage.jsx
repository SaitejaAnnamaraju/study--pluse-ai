import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { demoMilestones } from '../data/demoData.js';

export default function LandingPage({ user }) {
  return (
    <section className="space-y-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-100">AI-Powered Adaptive Learning</span>
            <h2 className="text-4xl font-semibold text-white">Your personalized AI mentor for every subject.</h2>
            <p className="max-w-xl text-slate-300">StudyPulse AI learns how you learn best and continuously adapts study plans, difficulty, explanations, and quizzes to suit your rhythm.</p>
            <div className="flex flex-wrap gap-3">
              <NavLink to={user ? '/dashboard' : '/login'} className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">Get Started</NavLink>
              <NavLink to="/onboarding" className="rounded-full bg-white/10 px-6 py-3 text-sm text-white transition hover:bg-white/20">Complete Onboarding</NavLink>
            </div>
          </div>
          <div className="space-y-4 rounded-[2rem] bg-slate-900/80 p-6 shadow-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Hackathon Demo</p>
            <h3 className="text-2xl font-semibold text-white">Daily learning snapshot</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {demoMilestones.map((card) => (
                <motion.div key={card.title} whileHover={{ y: -4 }} className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'AI Mentor', description: 'Ask questions, get analogies, and receive step-by-step explanations on demand.' },
          { title: 'Adaptive Testing', description: 'Assess performance from knowledge tests to video and text learning insight.' },
          { title: 'Personalized Roadmaps', description: 'Dynamic learning plans with daily goals, weekly milestones, and review cycles.' }
        ].map((feature) => (
          <div key={feature.title} className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glass">
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
