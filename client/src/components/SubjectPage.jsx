import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { subjects } from '../data/demoData.js';
import { fetchRoadmap } from '../lib/api.js';

export default function SubjectPage() {
  const { subjectId } = useParams();
  const [roadmap, setRoadmap] = useState([]);
  const subject = subjects.find((item) => item.id === subjectId) || subjects[0];

  useEffect(() => {
    fetchRoadmap(subject.id).then((data) => setRoadmap(data.roadmap));
  }, [subject.id]);

  return (
    <section className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Subject insights</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{subject.name}</h2>
          <p className="mt-2 text-slate-300">{subject.description} - personalized analytics and learning path.</p>
        </div>
        <div className="rounded-3xl bg-slate-950/80 px-5 py-4 text-right">
          <div className="text-sm text-slate-400">Progress</div>
          <div className="mt-2 text-3xl font-semibold text-cyan-300">{subject.progress}%</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-3xl bg-slate-950/80 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Accuracy</div>
          <div className="mt-3 text-4xl font-semibold text-white">{subject.accuracy}%</div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-cyan-400" style={{ width: `${subject.accuracy}%` }} />
          </div>
        </div>
        <div className="space-y-4 rounded-3xl bg-slate-950/80 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Retention</div>
          <div className="mt-3 text-4xl font-semibold text-white">{subject.retention}%</div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-violet-400" style={{ width: `${subject.retention}%` }} />
          </div>
        </div>
        <div className="space-y-4 rounded-3xl bg-slate-950/80 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Level</div>
          <div className="mt-3 text-4xl font-semibold text-white">{subject.level}</div>
          <p className="mt-2 text-slate-300">AI will adjust next topic difficulty and explanation style.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-950/80 p-6">
          <h3 className="text-xl font-semibold text-white">Weak topics</h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            {subject.weakTopics.map((topic) => (<li key={topic} className="rounded-3xl bg-white/5 px-4 py-3">{topic}</li>))}
          </ul>
        </div>
        <div className="rounded-3xl bg-slate-950/80 p-6">
          <h3 className="text-xl font-semibold text-white">AI roadmap preview</h3>
          <div className="mt-4 space-y-3">
            {roadmap.map((entry) => (
              <div key={entry.week} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400"><span>{entry.week}</span><span>{entry.goal}</span></div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                  {entry.tasks.map((task) => (<li key={task}>{task}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
