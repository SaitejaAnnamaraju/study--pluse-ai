import { motion } from 'framer-motion';
import { ArrowRight, Brain, LineChart, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  ['Knowledge', 'Subject-specific MCQ baseline with accuracy and difficulty handling.'],
  ['Video', 'Visual learning analysis through watch progress and retention questions.'],
  ['Reading', 'Paragraph comprehension, reading speed, and text retention detection.'],
  ['Adaptation', 'Learning style, category, roadmap, resources, and tests update continuously.']
];

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="grid min-h-[560px] overflow-hidden rounded-xl border border-white/10 bg-slate-950 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <span className="w-fit rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 ring-1 ring-cyan-300/20">Not an LMS. Not a quiz app. A learning intelligence system.</span>
          <h2 className="mt-6 text-5xl font-semibold leading-tight sm:text-6xl">Analyze how a student learns.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">StudyPulse AI measures knowledge, reaction speed, retention, comprehension, and behavior before generating any roadmap. Every subject gets its own adaptive path.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/profile" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">Start Profile <ArrowRight size={18} /></Link>
            <Link to="/analysis" className="rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/10">Run AI Analysis</Link>
          </div>
        </div>
        <div className="flex items-center bg-[linear-gradient(145deg,#111827,#082f49)] p-8">
          <div className="w-full rounded-xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-200">Live adaptive engine</p>
                <h3 className="text-2xl font-semibold">Student learning profile</h3>
              </div>
              <Sparkles className="text-cyan-300" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {cards.map(([title, detail], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-lg bg-white/10 p-4 transition duration-300 hover:-translate-y-1">
                  <h4 className="font-semibold">{title}</h4>
                  <p className="mt-2 text-sm text-slate-300">{detail}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-cyan-300/10 p-4 text-cyan-50"><Brain /> <p className="mt-2 text-sm">Style detection</p></div>
              <div className="rounded-lg bg-emerald-300/10 p-4 text-emerald-50"><LineChart /> <p className="mt-2 text-sm">Analytics</p></div>
              <div className="rounded-lg bg-orange-300/10 p-4 text-orange-50"><ShieldCheck /> <p className="mt-2 text-sm">Skill analysis</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
