import { useEffect, useMemo, useState } from 'react';
import { fetchQuestions } from '../lib/api.js';
import { subjects } from '../data/demoData.js';

const stageTitles = ['Knowledge Test', 'Video Learning', 'Text Learning'];

export default function AssessmentPage({ user, onLearningStyle, onSkillLevel }) {
  const [stage, setStage] = useState(0);
  const [subjectId, setSubjectId] = useState('dbms');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [videoProgress, setVideoProgress] = useState(0);
  const [textTime, setTextTime] = useState(0);
  const [result, setResult] = useState(null);

  const stageKeys = ['knowledge', 'video', 'reading'];

  useEffect(() => {
    fetchQuestions(subjectId, stageKeys[stage]).then((data) => setQuestions(data.questions || []));
  }, [subjectId, stage]);

  useEffect(() => {
    const timer = setInterval(() => setTextTime((time) => time + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const subject = useMemo(() => subjects.find((item) => item.id === subjectId), [subjectId]);

  const handleSelectAnswer = (questionId, option) => setAnswers((prev) => ({ ...prev, [questionId]: option }));

  const computeScore = () => {
    const correct = questions.filter((question) => answers[question.id] === question.answer).length;
    return Math.round((correct / questions.length) * 100);
  };

  const handleCompleteStage = () => {
    if (stage === 0) {
      const score = computeScore();
      if (score > 80) onSkillLevel('Intermediate');
      if (score > 90) onSkillLevel('Advanced/Professional');
    }
    if (stage === 1) {
      if (videoProgress > 80) onLearningStyle('Visual Learner');
    }
    if (stage === 2) {
      if (textTime > 40) onLearningStyle('Text-Based Learner');
      const finalSkill = videoProgress > 80 && textTime > 40 ? 'Intermediate' : 'Beginner';
      onSkillLevel(finalSkill);
      setResult({ score: computeScore(), style: textTime > 40 ? 'Text-Based Learner' : 'Mixed Learner' });
    }
    if (stage < stageTitles.length - 1) setStage((prev) => prev + 1);
  };

  return (
    <section className="space-y-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Initial assessment</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Stage {stage + 1}: {stageTitles[stage]}</h2>
            <p className="mt-3 text-slate-300">Complete this stage to help StudyPulse identify your knowledge level, retention, and attention style.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 px-5 py-4 text-right text-sm text-slate-100">
            <div>Current Subject</div>
            <div className="mt-2 text-lg font-semibold text-white">{subject.name}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
          {stage === 0 && (
            <div className="space-y-6">
              <p className="text-slate-300">Answer the knowledge questions based on your selected subject. The AI will measure accuracy, response time, and confidence patterns.</p>
              <div className="space-y-5">
                {questions.map((question) => (
                  <div key={question.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                    <h3 className="font-semibold text-white">{question.question}</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {question.options.map((option) => (
                        <button key={option} type="button" onClick={() => handleSelectAnswer(question.id, option)} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${answers[question.id] === option ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-white/10 bg-slate-900/80 text-slate-300 hover:border-cyan-400'}`}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === 1 && (
            <div className="space-y-6">
              <p className="text-slate-300">Watch the video, track your progress, then answer the comprehension questions below.</p>
              <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
                <iframe className="h-full w-full" src="https://www.youtube.com/embed/V2kLa-DqLnA" title="Educational Video" allowFullScreen />
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Video completion</span>
                  <span>{videoProgress}%</span>
                </div>
                <input type="range" min="0" max="100" value={videoProgress} onChange={(e) => setVideoProgress(Number(e.target.value))} className="mt-4 w-full" />
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="space-y-6">
              <p className="text-slate-300">Read the passage carefully. The timer enforces a minimum engagement period before completion.</p>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-200">
                <p>Normalization reduces duplicate data and improves database consistency. A strong design helps queries run faster and avoids update anomalies.</p>
                <p className="mt-4">Focus on why relationships matter and how schema design affects both performance and learner understanding.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-300">
                Time spent reading: <span className="font-semibold text-white">{textTime}s</span>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <div className="glass-card rounded-[2rem] border border-white/10 p-6 shadow-glass">
            <h3 className="text-xl font-semibold">Assessment overview</h3>
            <div className="mt-4 text-slate-300">Stage progress helps StudyPulse detect your best learning path and adapt difficulty dynamically.</div>
            <div className="mt-5 space-y-3">
              {stageTitles.map((title, index) => (
                <div key={title} className={`rounded-3xl p-4 ${index === stage ? 'bg-cyan-500/10 border border-cyan-400' : 'bg-white/5'}`}>
                  <div className="flex items-center justify-between text-sm text-slate-300">{title}<span>{index === stage ? 'Current' : index < stage ? 'Complete' : 'Locked'}</span></div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleCompleteStage} className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            {stage < stageTitles.length - 1 ? 'Finish Stage' : 'See Results'}
          </button>
          {result ? (
            <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Result</p>
              <div className="mt-3 text-2xl font-semibold text-white">Score: {result.score}%</div>
              <p className="mt-2">Detected learning style: <strong>{result.style}</strong></p>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
