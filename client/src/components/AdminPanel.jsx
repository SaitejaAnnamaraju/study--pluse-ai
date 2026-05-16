export default function AdminPanel() {
  const modules = [
    ['Course Management', 'Create B.Tech, Degree, Diploma, and custom courses.'],
    ['Department Management', 'Map departments such as CSE, AIML, ECE, IT to courses.'],
    ['Subject Management', 'Create subject-specific tests, resources, videos, and topic trees.'],
    ['Test Management', 'Configure MCQ, video, reading, coding, and final mastery tests.'],
    ['Resource Uploads', 'Upload PDFs, notes, videos, article links, and practice sets.'],
    ['Analytics Monitoring', 'Monitor category distribution, weak topics, and student progress.'],
    ['User Management', 'View users, active subjects, history, and readiness reports.']
  ];

  return (
    <section className="space-y-6">
      <div className="glass rounded-xl p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Admin dashboard</p>
        <h2 className="mt-2 text-3xl font-semibold">Platform control center</h2>
        <p className="mt-2 text-slate-300">This panel is structured for MongoDB/Firebase-backed management. Demo controls show the intended production modules.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map(([title, detail]) => (
          <div key={title} className="glass rounded-xl p-5">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{detail}</p>
            <button className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm">Open module</button>
          </div>
        ))}
      </div>
    </section>
  );
}
