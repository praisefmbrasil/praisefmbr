import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import RecentlyPlayed from './components/RecentlyPlayed';
import LivePlayerBar from './components/LivePlayerBar';
import ProgramDetail from './components/ProgramDetail';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';

// Páginas
import PresentersPage from './pages/PresentersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

// Constantes e tipos
import { SCHEDULES } from './constants';
import { Program } from './types';

// --- CONFIGURAÇÕES ---
const STREAM_URL = 'https://stream.zeno.fm/hvwifp8ezc6tv';

const getBrasiliaDayAndTotalMinutes = () => {
  const now = new Date();
  const brasiliaDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );

  const h = brasiliaDate.getHours();
  const m = brasiliaDate.getMinutes();

  return {
    day: brasiliaDate.getDay(),
    total: h * 60 + m,
  };
};

interface LiveMetadata {
  artist: string;
  title: string;
  playedAt?: Date;
  isMusic?: boolean;
}

// --- COMPONENTES AUXILIARES ---
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-white dark:bg-[#121212]" />;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// --- CONTEÚDO PRINCIPAL ---
const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () =>
      (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light'
  );
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // --- PROGRAMAÇÃO ATUAL ---
  const { currentProgram, queue } = useMemo(() => {
    const { day, total } = getBrasiliaDayAndTotalMinutes();
    const schedule = SCHEDULES[day as keyof typeof SCHEDULES] || SCHEDULES[1];

    const currentIndex = schedule.findIndex((p: Program) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);

      const start = sH * 60 + sM;
      const end = eH === 0 ? 24 * 60 : eH * 60 + eM;

      return total >= start && total < end;
    });

    return {
      currentProgram:
        currentIndex !== -1 ? schedule[currentIndex] : schedule[0],
      queue:
        currentIndex !== -1
          ? schedule.slice(currentIndex + 1, currentIndex + 5)
          : [],
    };
  }, [location.pathname]);

  // --- TEMA ---
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  // --- ÁUDIO ---
  useEffect(() => {
    const audio = new Audio(STREAM_URL);
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(prev => !prev);
  };

  const handleNavigateToProgram = (program: Program) => {
    setSelectedProgram(program);
    window.scrollTo(0, 0);
  };

  const activeTab =
    location.pathname === '/'
      ? 'home'
      : location.pathname.split('/')[1];

  const isAuthView = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white text-black dark:bg-[#121212] dark:text-white transition-colors duration-300">
      {!isAuthView && (
        <Navbar
          activeTab={activeTab}
          theme={theme}
          onToggleTheme={() =>
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
          }
        />
      )}

      <main className="flex-grow">
        {selectedProgram ? (
          <ProgramDetail
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
            onViewSchedule={() => {
              setSelectedProgram(null);
              navigate('/schedule');
            }}
            onListenClick={togglePlayback}
            isPlaying={isPlaying}
          />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero
                    onListenClick={togglePlayback}
                    isPlaying={isPlaying}
                    liveMetadata={liveMetadata}
                    onNavigateToProgram={handleNavigateToProgram}
                  />
                  <RecentlyPlayed tracks={trackHistory} />
                </>
              }
            />

            <Route
              path="/schedule"
              element={
                <ScheduleList
                  onNavigateToProgram={handleNavigateToProgram}
                  onBack={() => navigate('/')}
                />
              }
            />

            <Route
              path="/presenters"
              element={
                <PresentersPage
                  onNavigateToProgram={handleNavigateToProgram}
                />
              }
            />
            <Route path="/music" element={<Playlist />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {!isAuthView && <Footer />}

      {currentProgram && (
        <LivePlayerBar
          isPlaying={isPlaying}
          onTogglePlayback={togglePlayback}
          program={currentProgram}
          liveMetadata={liveMetadata}
          queue={queue}
          audioRef={audioRef}
        />
      )}
    </div>
  );
};

// --- EXPORT FINAL ---
const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
