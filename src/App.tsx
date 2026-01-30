import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import RecentlyPlayed from './components/RecentlyPlayed';
import LivePlayerBar from './components/LivePlayerBar';
import ProgramDetail from './components/ProgramDetail';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';

import DevotionalPage from './pages/DevotionalPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PresentersPage from './pages/PresentersPage';
import EventsPage from './pages/EventsPage';

import { SCHEDULES } from './constants';
import type { Program } from './types';

const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';

/* =======================
   TIME — BRASIL REAL
======================= */
const getBrazilTime = () => {
  const now = new Date();

  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short'
  }).formatToParts(now);

  const hour = Number(parts.find(p => p.type === 'hour')?.value);
  const minute = Number(parts.find(p => p.type === 'minute')?.value);

  const weekdayMap: Record<string, number> = {
    dom: 0, seg: 1, ter: 2, qua: 3, qui: 4, sex: 5, sáb: 6
  };

  const dayLabel = parts.find(p => p.type === 'weekday')?.value
    ?.slice(0, 3)
    .toLowerCase();

  return {
    day: weekdayMap[dayLabel ?? 'seg'],
    totalMinutes: hour * 60 + minute
  };
};

/* =======================
   UTILS
======================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-black" />;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

/* =======================
   APP CONTENT
======================= */
const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'dark'
  );
  const [clock, setClock] = useState(getBrazilTime());

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ⏱️ CLOCK LOOP */
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getBrazilTime());
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  /* 🌙 THEME */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  /* 🎧 AUDIO INIT */
  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.crossOrigin = 'anonymous';
    audioRef.current.volume = 0.8;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  /* 🔊 FADE ENGINE (BBC STYLE) */
  const fadeAudio = (
    audio: HTMLAudioElement,
    from: number,
    to: number,
    duration = 400
  ) => {
    const steps = 20;
    const stepTime = duration / steps;
    const delta = (to - from) / steps;
    let current = from;

    const interval = setInterval(() => {
      current += delta;
      audio.volume = Math.min(1, Math.max(0, current));

      if (
        (delta > 0 && current >= to) ||
        (delta < 0 && current <= to)
      ) {
        audio.volume = to;
        clearInterval(interval);
      }
    }, stepTime);
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      fadeAudio(audio, audio.volume, 0);
      setTimeout(() => audio.pause(), 450);
    } else {
      audio.src = STREAM_URL;
      audio.volume = 0;
      await audio.play();
      fadeAudio(audio, 0, 0.8);
    }

    setIsPlaying(p => !p);
  };

  /* 📻 PROGRAMAÇÃO */
  const { currentProgram, queue } = useMemo(() => {
    const schedule = SCHEDULES[clock.day] || SCHEDULES[1];

    const index = schedule.findIndex(p => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);

      const start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end <= start) end += 1440;

      return clock.totalMinutes >= start && clock.totalMinutes < end;
    });

    return {
      currentProgram: index >= 0 ? schedule[index] : schedule[0],
      queue: schedule.slice(index + 1, index + 5)
    };
  }, [clock]);

  const activeTab =
    location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white dark:bg-black transition-colors">
      <Navbar
        activeTab={activeTab}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      />

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
                    program={currentProgram}
                    currentMinutes={clock.totalMinutes}
                    onListenClick={togglePlayback}
                    isPlaying={isPlaying}
                    onNavigateToProgram={setSelectedProgram}
                  />
                  <RecentlyPlayed tracks={[]} />
                </>
              }
            />
            <Route path="/music" element={<Playlist />} />
            <Route
              path="/schedule"
              element={
                <ScheduleList
                  onNavigateToProgram={setSelectedProgram}
                  onBack={() => navigate('/')}
                />
              }
            />
            <Route
              path="/presenters"
              element={<PresentersPage onNavigateToProgram={setSelectedProgram} />}
            />
            <Route path="/devotional" element={<DevotionalPage />} />
            <Route path="/events" element={<EventsPage />} />
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

      <Footer />

      {currentProgram && (
        <LivePlayerBar
          isPlaying={isPlaying}
          onTogglePlayback={togglePlayback}
          program={currentProgram}
          queue={queue}
          audioRef={audioRef}
        />
      )}
    </div>
  );
};

/* =======================
   ROOT
======================= */
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
}
