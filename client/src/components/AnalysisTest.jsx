import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';

const stages = ['knowledge', 'video', 'reading'];

export default function AnalysisTest({ profile, setAnalysis, setRoadmap }) {
  const navigate = useNavigate();
  const subjectId = profile?.subject || 'java';
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stageStartedAt, setStageStartedAt] = useState(Date.now());
  const [questionStartedAt, setQuestionStartedAt] = useState({});
  const [stageResults, setStageResults] = useState({});
  const [videoProgress, setVideoProgress] = useState(0);
  const [readingCompleted, setReadingCompleted] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    api.subject(subjectId).then(setSubject);
  }, [subjectId]);

  const currentStage = stages[stage];

  useEffect(() => {
    if (!subjectId) return;
    api.questions(subjectId, currentStage).then((data) => {
      setQuestions(data.questions);
      setAnswers({});
      setStageStartedAt(Date.now());
      setQuestionStartedAt({});
      setVideoProgress(0);
      setReadingCompleted(false);
      setReadingTime(0);
    });
  }, [subjectId, currentStage]);

  useEffect(() => {
    if (currentStage !== 'reading' || readingCompleted) return undefined;
    const timer = setInterval(() => setReadingTime((time) => time + 1), 1000);
    return () => clearInterval(timer);
  }, [currentStage, readingCompleted]);

  const selectedQuestions = useMemo(() => {
    if (currentStage === 'reading' && !readingCompleted) return [];
    if (currentStage === 'video' && videoProgress < 70) return [];
    return questions;
  }, [currentStage, questions, readingCompleted, videoProgress]);

  const beginQuestion = (questionId) => {
    setQuestionStartedAt((prev) => prev[questionId] ? prev : { ...prev, [questionId]: Date.now() });
  };

  const choose = (question, selected) => {
    const questionStart = questionStartedAt[question.id] || stageStartedAt;
    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        ...question,
        selected,
        stageDuration: Math.max(1, Math.round((Date.now() - stageStartedAt) / 1000)),
        attentionScore: currentStage === 'video' ? videoProgress : currentStage === 'reading' ? Math.min(100, readingTime * 2) : 0,
        timeTaken: Math.max(3, Math.round((Date.now() - questionStart) / 1000))
      }
    }));
  };

  const completeStage = async () => {
    const payloadAnswers = selectedQuestions.map((question) => answers[question.id]).filter(Boolean);
    if (payloadAnswers.length !== selectedQuestions.length) return;
    const result = await api.evaluateStage({ subjectId, stageType: currentStage, answers: payloadAnswers });
    const nextResults = { ...stageResults, [currentStage]: result };
    setStageResults(nextResults);
    setAnswers({});
    setStageStartedAt(Date.now());
    setQuestionStartedAt({});

    if (stage < 2) {
      setStage(stage + 1);
      return;
    }

    const detected = await api.detectProfile({
      subjectId,
      knowledge: nextResults.knowledge,
      video: nextResults.video,
      reading: nextResults.reading
    });
    const roadmapData = await api.roadmap({ subjectId, profile: detected });
    const subjectRecords = JSON.parse(localStorage.getItem('sp-subject-records') || '{}');
    const updatedRecords = {
      ...subjectRecords,
      [subjectId]: {
        subjectId,
        subjectName: subject?.name || subjectId,
        analysis: detected,
        stageResults: nextResults,
        roadmap: roadmapData,
        topicResults: subjectRecords[subjectId]?.topicResults || {},
        status: 'active',
        updatedAt: new Date().toISOString()
      }
    };
    setAnalysis(detected);
    setRoadmap(roadmapData);
    localStorage.setItem('sp-analysis', JSON.stringify(detected));
    localStorage.setItem('sp-roadmap', JSON.stringify(roadmapData));
    localStorage.setItem('sp-subject-records', JSON.stringify(updatedRecords));
    navigate('/dashboard');
  };

  if (!profile) {
    return <div className="glass rounded-xl p-6">Complete profile setup before the mandatory AI analysis test.</div>;
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="glass rounded-xl p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Mandatory AI analysis test</p>
        <h2 className="mt-2 text-3xl font-semibold">Level {stage + 1}: {currentStage.toUpperCase()} analysis</h2>
        <p className="mt-2 text-slate-300">Roadmap generation is locked until all three levels are completed for {subject?.name || subjectId}.</p>

        {currentStage === 'video' && (
          <div className="mt-6 space-y-4">
            <div className="aspect-video overflow-hidden rounded-xl bg-slate-950">
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${subject?.introVideo || 'grEKMHGYyns'}`} title="Subject intro" allowFullScreen />
            </div>
            <label className="block text-sm text-slate-300">Video watch progress: {videoProgress}%
              <input className="mt-2 w-full" type="range" min="0" max="100" value={videoProgress} onChange={(e) => setVideoProgress(Number(e.target.value))} />
            </label>
          </div>
        )}

        {currentStage === 'reading' && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-slate-950/70 p-5 leading-7 text-slate-200">{subject?.paragraph}</div>
            <button onClick={() => setReadingCompleted(true)} className="rounded-full bg-white/10 px-4 py-2 text-sm">Completed Reading</button>
            <span className="ml-3 text-sm text-cyan-200">Reading time: {readingTime}s</span>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {selectedQuestions.length === 0 && currentStage !== 'knowledge' && (
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-sm text-cyan-50">
              {currentStage === 'video' ? 'Watch at least 70% of the video to unlock visual-retention questions.' : 'Click Completed Reading to unlock text-comprehension questions.'}
            </div>
          )}
          {selectedQuestions.map((question) => (
            <div key={question.id} className="rounded-xl border border-white/10 bg-slate-950/70 p-5">
              <div className="flex justify-between gap-3">
                <h3 className="font-semibold">{question.question}</h3>
                <span className="text-xs text-cyan-200">{question.topic}</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button key={option} onFocus={() => beginQuestion(question.id)} onMouseEnter={() => beginQuestion(question.id)} onClick={() => choose(question, option)} className={`rounded-lg border px-4 py-3 text-left text-sm ${answers[question.id]?.selected === option ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-slate-900/80'}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={completeStage} disabled={selectedQuestions.length === 0 || Object.keys(answers).length !== selectedQuestions.length} className="mt-6 w-full rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 disabled:opacity-50">
          {stage < 2 ? 'Complete this level' : 'Detect learning style and generate adaptive roadmap'}
        </button>
      </div>

      <aside className="space-y-4">
        {stages.map((item, index) => (
          <div key={item} className={`glass rounded-xl p-5 ${index === stage ? 'ring-1 ring-cyan-300' : ''}`}>
            <h3 className="font-semibold capitalize">{item} analysis</h3>
            <p className="mt-2 text-sm text-slate-300">{stageResults[item] ? `${stageResults[item].accuracy}% accuracy, ${stageResults[item].averageReactionTime}s avg reaction` : index < stage ? 'Complete' : index === stage ? 'Current' : 'Locked'}</p>
          </div>
        ))}
      </aside>
    </section>
  );
}
