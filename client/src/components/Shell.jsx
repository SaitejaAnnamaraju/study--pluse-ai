import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const links = [
  ['/', 'Home'],
  ['/profile', 'Profile Setup'],
  ['/analysis', 'AI Analysis Test'],
  ['/dashboard', 'Dashboard'],
  ['/history', 'History'],
  ['/admin', 'Admin Panel']
];

export default function Shell({ children, user, theme, setTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <div className={theme === 'light' ? 'light-shell min-h-screen' : 'min-h-screen text-white'}>
      <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6">
        <header className="glass mb-4 rounded-xl p-4 shadow-glow">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Adaptive learning intelligence</p>
              <h1 className="mt-2 text-3xl font-semibold">StudyPulse AI</h1>
              <p className="mt-1 text-sm text-slate-300">Analyzes how students learn, then adapts roadmap, resources, tests, and mentor support.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {user?.fullName ? <span className="rounded-full bg-white/10 px-4 py-2 text-sm">{user.fullName}</span> : null}
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Theme
              </button>
            </div>
          </div>
        </header>
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-2">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950' : 'rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 ring-1 ring-white/10'}>
                {label}
              </NavLink>
            ))}
          </nav>
          {location.pathname !== '/' && (
            <button onClick={goBack} className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-300/20 transition hover:bg-cyan-300/10">
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
