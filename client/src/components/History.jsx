export default function HistoryPage({ profile }) {
  const subjectRecords = readStoredRecords();
  const subjects = Object.values(subjectRecords);
  const history = profile?.history || [];
  const records = history.length > 0 ? history : [
    { date: '2026-05-12', subject: 'DBMS', score: 78, type: 'Knowledge Test' },
    { date: '2026-05-14', subject: 'OS', score: 62, type: 'Video Comprehension' },
    { date: '2026-05-15', subject: 'DBMS', score: 84, type: 'Final Assessment' }
  ];

  return (
    <section className="space-y-6">
      <div className="glass-card rounded-xl border border-white/10 p-6 shadow-glass">
        <h2 className="text-3xl font-semibold">Learning History</h2>
        <p className="mt-3 text-slate-300">Review active subjects, completed subjects, past tests, accuracy history, learning time, and progress snapshots.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {subjects.map((subject) => {
          const stageResults = subject.stageResults || {};
          const topicResults = Object.values(subject.topicResults || {});
          const avgTopic = topicResults.length ? Math.round(topicResults.reduce((sum, item) => sum + (item.mastery || 0), 0) / topicResults.length) : 0;

          return (
            <div key={subject.subjectId} className="glass-card rounded-xl border border-white/10 p-6 shadow-glass">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">{subject.status || 'active'} subject</p>
                  <h3 className="mt-2 text-2xl font-semibold">{subject.subjectName}</h3>
                </div>
                <div className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-100">{subject.analysis?.learningStyle}</div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-white/10 p-3 text-sm">Initial: {subject.analysis?.averageAccuracy || 0}%</div>
                <div className="rounded-lg bg-white/10 p-3 text-sm">Topics: {topicResults.length}</div>
                <div className="rounded-lg bg-white/10 p-3 text-sm">Mastery: {subject.finalReport?.finalScore || avgTopic || 0}%</div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                {Object.values(stageResults).map((stage) => (
                  <div key={stage.stageType} className="flex justify-between rounded-lg bg-slate-950/70 px-4 py-3">
                    <span className="capitalize">{stage.stageType}</span>
                    <span>{stage.accuracy}% accuracy, {stage.averageReactionTime}s reaction</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div key={`${record.date}-${record.subject}-${record.type}`} className="rounded-xl border border-white/10 bg-slate-950/80 p-5 sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-slate-400">{record.date} - {record.type}</div>
              <h3 className="mt-2 text-xl font-semibold text-white">{record.subject}</h3>
            </div>
            <div className="mt-4 flex items-center gap-3 sm:mt-0">
              <div className="rounded-full bg-cyan-500/15 px-4 py-3 text-sm text-cyan-200">Score: {record.score}%</div>
              <div className="rounded-full bg-white/5 px-4 py-3 text-sm text-slate-200">Subject progress snapshot</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function readStoredRecords() {
  try {
    return JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
  } catch {
    localStorage.removeItem('sp-subject-records');
    return {};
  }
}
