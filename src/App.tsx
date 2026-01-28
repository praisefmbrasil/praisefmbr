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

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import RecentlyPlayed from './components/RecentlyPlayed';
import LivePlayerBar from './components/LivePlayerBar';
import ProgramDetail from './components/ProgramDetail';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';

import DevotionalPage from './pages/DevotionalPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MySoundsPage from './pages/MySoundsPage';
import ProfilePage from './pages/ProfilePage';
import FeaturedArtistsPage from './pages/FeaturedArtistsPage';
import PresentersPage from './pages/PresentersPage';
import NewReleasesPage from './pages/NewReleasesPage';
import LiveRecordingsPage from './pages/LiveRecordingsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import FeedbackPage from './pages/FeedbackPage';
import EventsPage from './pages/EventsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';

import { SCHEDULES } from './constants';
import { Program } from './types';

/* ===============================
   STREAM CONFIG
================================ */
const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';
const METADATA_URL =
  'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const BLOCKED_METADATA_KEYWORDS = [
  'praise fm',
  'commercial',
  'promo',
  'station id',
  'jingle',
  'announcement',
];

/* ===============================
   HELPERS
================================ */
const getBrazilDayAndMinutes = () => {
  const now = new Date();
  const brazil = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );
  return {
    day: brazil.getDay(),
    total: brazil.getHours() * 60 + brazil.getMinutes(),
  };
};

/* ===============================
   TYPES
================================ */
interface LiveMetadata {
  artist: string;
  title: string;
  playedAt?: Date;
  isMusic?: boolean;
}

/* ===============================
   UTILS
================================ */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

/* ===============================
   APP CONTENT
================================ */
const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'dark'
  );

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { day, total } = getBrazilDayAndMinutes();

  /* ===============================
     SCHEDULE LOGIC
  ================================ */
  const { currentProgram, queue } = useMemo(() => {
    const schedule = SCHEDULES[day] || SCHEDULES[1];
    const index = schedule.findIndex((p) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      const end = eH === 0 ? 1440 : eH * 60 + eM;
      return total >= start && total < end;
    });

    return {
      currentProgram: schedule[index !== -1 ? index : 0],
      queue: schedule.slice(index + 1, index + 5),
    };
  }, [day, total]);

  /* ===============================
     THEME
  ================================ */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  /* ===============================
     RESET PROGRAM ON ROUTE CHANGE
  ================================ */
  useEffect(() => {
    setSelectedProgram(null);
  }, [location.pathname]);

  /* ===============================
     STREAM METADATA
  ================================ */
  useEffect(() => {
    const es = new EventSource(METADATA_URL);
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        const title = data.streamTitle || '';
        if (!title.includes(' - ')) return;

        const [artist, song] = title.split(' - ').map((s: string) => s.trim());
        const isMusic = !BLOCKED_METADATA_KEYWORDS.some((k) =>
          title.toLowerCase().includes(k)
        );

        const meta: LiveMetadata = {
          artist,
          title: song,
          playedAt: new Date(),
          isMusic,
        };

        setLiveMetadata(meta);

        if (isMusic) {
          setTrackHistory((h) => [meta, ...h].slice(0, 10));
        }
      } catch {}
    };

    return () => es.close();
  }, []);

  /* ===============================
     AUDIO
  ================================ */
  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.volume = 0.8;
    return () => audioRef.current?.pause();
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const activeTab =
    location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

  /* ===============================
     RENDER
  ================================ */
  return (
    <div className="min-h-screen flex flex-col bg-black text-white pb-[120px]">
      <Navbar
        activeTab={activeTab}
        theme={theme}
        onToggleTheme={() =>
          setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
        }
      />

      <main className="flex-grow">
        {selectedProgram ? (
          <ProgramDetail
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
            onViewSchedule={() => navigate('/schedule')}
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
                    onNavigateToProgram={setSelectedProgram}
                  />
                  <RecentlyPlayed tracks={trackHistory} />
                </>
              }
            />

            <Route path="/music" element={<Playlist />} />
            <Route path="/new-releases" element={<NewReleasesPage />} />
            <Route path="/live-recordings" element={<LiveRecordingsPage />} />
            <Route path="/artists" element={<FeaturedArtistsPage />} />
            <Route
              path="/schedule"
              element={
                <ScheduleList
                  onNavigateToProgram={setSelectedProgram}
                  onBack={() => navigate('/')}
                />
              }
            />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/presenters" element={<PresentersPage />} />
            <Route path="/devotional" element={<DevotionalPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />

            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route
              path="/my-sounds"
              element={
                <ProtectedRoute>
                  <MySoundsPage />
                </ProtectedRoute>
              }
            />
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
          liveMetadata={liveMetadata}
          queue={queue}
          audioRef={audioRef}
        />
      )}
    </div>
  );
};

/* ===============================
   ROOT
================================ */
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
