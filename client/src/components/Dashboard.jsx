import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../lib/api.js';

export default function Dashboard({ profile, analysis, roadmap, setAnalysis, setRoadmap, setProfile }) {
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [taskResults, setTaskResults] = useState({});
  const [efficiencyResult, setEfficiencyResult] = useState(null);
  const [loadingTask, setLoadingTask] = useState(false);
  const [loadingEfficiency, setLoadingEfficiency] = useState(false);

  const subjectId = profile?.subject || 'java';

  const metrics = useMemo(() => [
    ['Category', analysis?.category],
    ['Learning Style', analysis?.learningStyle],
    ['Accuracy', `${analysis?.averageAccuracy || 0}%`],
    ['Reaction Time', `${analysis?.averageReactionTime || 0}s`],
    ['Retention', `${analysis?.retention || 0}%`],
    ['Consistency', `${analysis?.consistency || 0}%`]
  ], [analysis]);

  useEffect(() => {
    const subjectRecords = JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
    setTaskResults(subjectRecords[subjectId]?.topicResults || {});
    setEfficiencyResult(subjectRecords[subjectId]?.finalReport || null);
  }, [subjectId]);

  const roadmapItems = roadmap?.roadmap || [];
  const completedAllTasks = roadmapItems.length > 0 && Object.keys(taskResults).length === roadmapItems.length;

  const startNewSubject = () => {
    setAnalysis(null);
    setRoadmap(null);
    localStorage.removeItem('sp-analysis');
    localStorage.removeItem('sp-roadmap');
    navigate('/profile');
  };

  const openTaskQuiz = async (item) => {
    setLoadingTask(true);
    const quiz = await api.taskQuiz({ subjectId, topic: item.topic });
    setQuizQuestions(quiz.questions);
    setActiveTask(item);
    setQuizAnswers({});
    setLoadingTask(false);
  };

  const selectQuizAnswer = (questionId, selected) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: selected }));
  };

  const submitTaskQuiz = async () => {
    const answers = quizQuestions.map((question) => ({
      id: question.id,
      topic: question.topic,
      answer: question.answer,
      difficulty: question.difficulty,
      selected: quizAnswers[question.id],
      timeTaken: 15
    })).filter((item) => item.selected);

    if (!answers.length) return;
    setLoadingTask(true);
    const result = await api.taskEvaluate({ subjectId, topic: activeTask.topic, answers });
    const updatedResults = { ...taskResults, [activeTask.id]: result };
    const subjectRecords = JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
    const updatedRecord = {
      ...(subjectRecords[subjectId] || {}),
      subjectId,
      subjectName: profile.subject,
      analysis,
      roadmap,
      topicResults: updatedResults,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('sp-subject-records', JSON.stringify({ ...subjectRecords, [subjectId]: updatedRecord }));
    setTaskResults(updatedResults);
    setActiveTask(null);
    setQuizQuestions([]);
    setQuizAnswers({});
    setLoadingTask(false);
  };

  const runEfficiencyCheck = async () => {
    setLoadingEfficiency(true);
    const results = Object.values(taskResults);
    const response = await api.efficiencyCheck({ subjectId, analysis, taskResults: results });
    setEfficiencyResult(response);

    const historyRecord = {
      date: new Date().toISOString().slice(0, 10),
      subject: profile.subject,
      score: response.finalScore,
      type: 'Final Efficiency Check'
    };
    const updatedProfile = {
      ...profile,
      history: [...(profile.history || []), historyRecord],
      completedSubjects: [...new Set([...(profile.completedSubjects || []), profile.subject])],
      activeSubjects: (profile.activeSubjects || []).filter((subject) => subject !== profile.subject)
    };
    const subjectRecords = JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
    localStorage.setItem('sp-subject-records', JSON.stringify({
      ...subjectRecords,
      [subjectId]: {
        ...(subjectRecords[subjectId] || {}),
        finalReport: response,
        status: 'completed',
        updatedAt: new Date().toISOString()
      }
    }));

    setProfile(updatedProfile);
    localStorage.setItem('sp-profile', JSON.stringify(updatedProfile));
    setLoadingEfficiency(false);
  };

  if (!profile || !analysis) {
    return <div className="glass rounded-xl p-6">Complete profile setup and the mandatory AI analysis test to unlock the adaptive dashboard.</div>;
  }

  const completedTasks = Object.values(taskResults);
  const analyticsRows = completedTasks.map((result) => ({
    topic: result.topic,
    accuracy: result.accuracy,
    timeTaken: result.timeTaken,
    correct: result.correct,
    incorrect: result.incorrect,
    completionDate: result.completionDate,
    masteryLevel: result.masteryLevel
  }));
  const weeklyData = completedTasks.map((result, index) => ({
    day: `T${index + 1}`,
    accuracy: result.accuracy,
    mastery: result.mastery,
    reaction: result.averageReactionTime
  }));
  const subjectMasteryData = completedTasks.map((result) => ({
    name: result.topic,
    value: result.mastery
  }));

  return (
    <section className="space-y-6">
      <div className="glass rounded-xl p-6 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Adaptive dashboard</p>
            <h2 className="mt-2 text-3xl font-semibold">{profile.subject.toUpperCase()} personalized learning intelligence</h2>
            <p className="mt-2 text-slate-300">Roadmap, resources, tests, and explanation depth are generated from the selected subject and analysis test results.</p>
          </div>
          <button onClick={startNewSubject} className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300 transition hover:bg-white/10">
            Start another subject
          </button>
        </div>
      </div>

      <div className="grid gap-4 metric-grid">
        {metrics.map(([label, value]) => (
          <div key={label} className="glass rounded-xl p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <h3 className="mt-2 text-2xl font-semibold">{value}</h3>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-xl p-6">
          <h3 className="text-2xl font-semibold">AI-generated adaptive roadmap</h3>
          <div className="mt-5 space-y-4">
            {roadmapItems.map((item) => {
              const result = taskResults[item.id];
              return (
                <div key={item.id} className="rounded-xl border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <p className="text-sm text-cyan-200">{item.week}</p>
                      <h4 className="text-xl font-semibold">{item.topic}</h4>
                    </div>
                    <div className="space-y-2 text-right">
                      <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs">{item.difficulty}</span>
                      <button onClick={() => openTaskQuiz(item)} disabled={loadingTask} className="block rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
                        {result ? 'Retake topic test' : 'Run topic test'}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{item.explanationDepth}</p>
                  <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                    <div className="rounded-lg bg-white/10 p-3">Daily goal: {item.dailyGoal}</div>
                    <div className="rounded-lg bg-white/10 p-3">Task: {item.task}</div>
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {['videos', 'reading', 'pdfs', 'practice'].map((type) => {
                      const resources = (item.resources || []).filter((resource) => resource.type === type);
                      if (!resources.length) return null;
                      return (
                        <div key={type} className="rounded-lg bg-white/5 p-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{type}</p>
                          <div className="space-y-2">
                            {resources.map((resource) => (
                              <a key={`${item.id}-${resource.title}`} href={resource.url} target="_blank" rel="noreferrer" className="block rounded-md bg-slate-950/70 p-2 text-xs text-slate-200 hover:text-cyan-200">
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {result && (
                    <div className="mt-4 rounded-xl bg-slate-900/80 p-4 text-sm text-slate-200">
                      <p className="font-semibold">Topic result:</p>
                      <p className="mt-2">Mastery: {result.mastery}%</p>
                      <p>Reaction: {result.averageReactionTime}s</p>
                      <p className="mt-2 text-cyan-200">{result.recommendation}</p>
                      {result.adaptation && (
                        <p className="mt-2 text-orange-200">Adaptive action: {result.adaptation.roadmapChange}</p>
                      )}
                      {result.adaptation?.revisionRequired && (
                        <div className="mt-3 space-y-2">
                          <p className="font-semibold">Revision resources:</p>
                          {(item.revisionResources || []).map((resource) => (
                            <a key={`${item.id}-${resource.title}-revision`} href={resource.url} target="_blank" rel="noreferrer" className="block rounded-md bg-orange-300/10 p-2 text-xs text-orange-100">
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold">Personalized resources</h3>
            <div className="mt-4 space-y-3">
              {(roadmap?.resources || []).map((resource) => (
                <a key={resource.url || resource.title} href={resource.url} target="_blank" rel="noreferrer" className="block rounded-lg bg-cyan-300/10 p-4 text-sm text-cyan-50 ring-1 ring-cyan-300/20">
                  {resource.title || resource}
                </a>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold">Weak and strong concepts</h3>
            <p className="mt-4 text-sm text-orange-200">Weak: {analysis.weakConcepts?.join(', ') || 'None detected'}</p>
            <p className="mt-2 text-sm text-emerald-200">Strong: {analysis.strongConcepts?.join(', ') || 'Pending more tests'}</p>
          </div>
          {completedAllTasks && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold">Final efficiency check</h3>
              <p className="mt-3 text-sm text-slate-300">Run one final AI-generated efficiency test after completing every roadmap topic quiz.</p>
              <button onClick={runEfficiencyCheck} disabled={loadingEfficiency} className="mt-4 w-full rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">
                {efficiencyResult ? 'Refresh efficiency summary' : 'Run final efficiency test'}
              </button>
              {efficiencyResult && (
                <div className="mt-5 space-y-3 rounded-xl bg-slate-900/80 p-4 text-sm text-slate-200">
                  <p className="font-semibold">Composite score: {efficiencyResult.finalScore}%</p>
                  <p>{efficiencyResult.summary}</p>
                  <p>Mastery average: {efficiencyResult.averageMastery}%</p>
                  <p>Reaction average: {efficiencyResult.averageResponse}s</p>
                  <p className="text-cyan-200">{efficiencyResult.recommendation}</p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {activeTask && (
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">AI task test</p>
              <h2 className="mt-2 text-3xl font-semibold">{activeTask.topic} quiz</h2>
              <p className="mt-2 text-slate-300">Answer the AI-generated questions for this roadmap task.</p>
            </div>
            <button onClick={() => { setActiveTask(null); setQuizQuestions([]); setQuizAnswers({}); }} className="rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-200">Close</button>
          </div>

          <div className="mt-6 space-y-4">
            {quizQuestions.map((question) => (
              <div key={question.id} className="rounded-xl border border-white/10 bg-slate-950/70 p-5">
                <p className="font-semibold">{question.question}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <button key={option} onClick={() => selectQuizAnswer(question.id, option)} className={`rounded-lg border px-4 py-3 text-left text-sm ${quizAnswers[question.id] === option ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-slate-900/80'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={submitTaskQuiz} disabled={loadingTask} className="mt-6 w-full rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 disabled:opacity-50">
            Submit task quiz answers
          </button>
        </div>
      )}

      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold">Topic analytics table</h3>
        {!analyticsRows.length ? (
          <div className="mt-5 rounded-xl border border-dashed border-white/20 bg-slate-950/50 p-6 text-sm text-slate-300">No analytics available yet. Complete roadmap topic assessments to generate performance data.</div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  {['Topic', 'Accuracy', 'Time Taken', 'Correct Answers', 'Incorrect Answers', 'Completion Date', 'Mastery Level'].map((heading) => (
                    <th key={heading} className="border-b border-white/10 px-3 py-3 font-medium">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analyticsRows.map((row) => (
                  <tr key={`${row.topic}-${row.completionDate}`} className="border-b border-white/5">
                    <td className="px-3 py-3">{row.topic}</td>
                    <td className="px-3 py-3">{row.accuracy}%</td>
                    <td className="px-3 py-3">{row.timeTaken}s</td>
                    <td className="px-3 py-3">{row.correct}</td>
                    <td className="px-3 py-3">{row.incorrect}</td>
                    <td className="px-3 py-3">{row.completionDate}</td>
                    <td className="px-3 py-3">{row.masteryLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {completedTasks.length > 0 && (
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold">Weekly growth</h3>
          <div className="mt-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" tick={{ fill: '#cbd5e1' }} />
                <YAxis tick={{ fill: '#cbd5e1' }} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155' }} />
                <Line dataKey="accuracy" stroke="#22d3ee" strokeWidth={3} />
                <Line dataKey="mastery" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold">Reaction speed trend</h3>
          <div className="mt-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" tick={{ fill: '#cbd5e1' }} />
                <YAxis tick={{ fill: '#cbd5e1' }} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155' }} />
                <Bar dataKey="reaction" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold">Subject mastery chart</h3>
          <div className="mt-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={subjectMasteryData} dataKey="value" nameKey="name" outerRadius={100} fill="#22d3ee" label />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
