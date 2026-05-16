import { LineChart, Line, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';

const progressData = [
  { day: 'Mon', completion: 32, accuracy: 58 },
  { day: 'Tue', completion: 44, accuracy: 62 },
  { day: 'Wed', completion: 55, accuracy: 65 },
  { day: 'Thu', completion: 70, accuracy: 72 },
  { day: 'Fri', completion: 77, accuracy: 79 },
  { day: 'Sat', completion: 84, accuracy: 83 },
  { day: 'Sun', completion: 92, accuracy: 88 }
];

export default function AnalyticsPage() {
  return (
    <section className="space-y-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
        <h2 className="text-3xl font-semibold">Subject Analytics</h2>
        <p className="mt-3 text-slate-300">Track your accuracy trends, completion percentage, and focus performance over the week.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glass">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Completion Trend</h3>
              <p className="text-slate-400">Daily roadmap progress and learning consistency.</p>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" tick={{ fill: '#a5b4fc' }} axisLine={false} />
                <YAxis tick={{ fill: '#a5b4fc' }} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1124', border: '1px solid #334155' }} />
                <Line type="monotone" dataKey="completion" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#22d3ee' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glass">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Accuracy Score</h3>
              <p className="text-slate-400">How your subject accuracy has improved this week.</p>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" tick={{ fill: '#a5b4fc' }} axisLine={false} />
                <YAxis tick={{ fill: '#a5b4fc' }} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1124', border: '1px solid #334155' }} />
                <Bar dataKey="accuracy" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'Focus Score', value: '81%', description: 'AI estimates concentration based on study consistency.' },
          { title: 'Retention', value: '74%', description: 'Measured from comprehension tasks and review cycles.' },
          { title: 'Mastery', value: '68%', description: 'Your AI-driven mastery score for the active subject.' }
        ].map((card) => (
          <div key={card.title} className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glass">
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-4xl font-bold text-cyan-300">{card.value}</p>
            <p className="mt-3 text-slate-400">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
