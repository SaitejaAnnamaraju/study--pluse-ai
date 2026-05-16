import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel.jsx';
import AnalysisTest from './components/AnalysisTest.jsx';
import Chatbot from './components/Chatbot.jsx';
import Dashboard from './components/Dashboard.jsx';
import HistoryPage from './components/History.jsx';
import Home from './components/Home.jsx';
import ProfileSetup from './components/ProfileSetup.jsx';
import Shell from './components/Shell.jsx';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('sp-user') || 'null'));
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('sp-profile') || 'null'));
  const [analysis, setAnalysis] = useState(() => JSON.parse(localStorage.getItem('sp-analysis') || 'null'));
  const [roadmap, setRoadmap] = useState(() => JSON.parse(localStorage.getItem('sp-roadmap') || 'null'));

  return (
    <Shell user={user} theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileSetup setUser={setUser} setProfile={setProfile} />} />
        <Route path="/analysis" element={<AnalysisTest profile={profile} setAnalysis={setAnalysis} setRoadmap={setRoadmap} />} />
        <Route path="/dashboard" element={<Dashboard profile={profile} analysis={analysis} roadmap={roadmap} setAnalysis={setAnalysis} setRoadmap={setRoadmap} setProfile={setProfile} />} />
        <Route path="/history" element={<HistoryPage profile={profile} />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Chatbot profile={profile} analysis={analysis} roadmap={roadmap} />
    </Shell>
  );
}
