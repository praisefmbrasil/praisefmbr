// src/App.tsx

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LivePlayerProvider } from './contexts/LivePlayerContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import RecentlyPlayed from './components/RecentlyPlayed';
import { LivePlayerBar } from './components/LivePlayerBar';
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

/* ================= STREAM PRAISE FM BRASIL ================= */

const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const BLOCKED_METADATA_KEYWORDS = [
  'praise fm', 'praisefm', 'comercial', 'spot', 'promo', 'identificação',
  'vinheta', 'intro', 'outro', 'anúncio', 'jingle', 'bumper', 'teaser'
];

/* ================= UTIL ================= */

const getSaoPauloDayAndTotalMinutes = () => {
  const now = new Date();
  const sp = new Date(now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
  return { day: sp.getDay(), total: sp.getHours() * 60 + sp.getMinutes() };
};

interface LiveMetadata {
  artist: string;
  title: string;
  artwork?: string;
  playedAt?: Date;
  isMusic?: boolean;
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

/* ================= APP CONTENT ================= */

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light'
  );
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { day, total } = getSaoPauloDayAndTotalMinutes();

  const { currentProgram } = useMemo(() => {
    const schedule = SCHEDULES[day] || SCHEDULES[0];
    const current =
      schedule.find(p => {
        const [sH, sM] = p.startTime.split(':').map(Number);
        const [eH, eM] = p.endTime.split(':').map(Number);
        let start = sH * 60 + sM;
        let end = eH * 60 + eM;
        if (end <= start) end += 1440;
        return total >= start && total < end;
      }) || schedule[0];

    return { currentProgram: current };
  }, [day, total]);

  /* ================= THEME ================= */

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  /* ================= STREAM METADATA ================= */

  useEffect(() => {
    const es = new EventSource(METADATA_URL);
    eventSourceRef.current = es;

    es.onmessage = e => {
      try {
        const data = JSON.parse(e.data);
        const title = data.streamTitle || '';
        if (!title.includes(' - ')) return;

        const [artist, ...rest] = title.split(' - ');
        const song = rest.join(' - ').trim();
        const cleanArtist = artist.trim();

        const isMusic = !BLOCKED_METADATA_KEYWORDS.some(k =>
          `${cleanArtist} ${song}`.toLowerCase().includes(k)
        );

        const meta: LiveMetadata = {
          artist: cleanArtist,
          title: song,
          playedAt: new Date(),
          isMusic
        };

        setLiveMetadata(meta);

        if (isMusic) {
          setTrackHistory(h =>
            h.length && h[0].title === song ? h : [meta, ...h].slice(0, 10)
          );
        }
      } catch {}
    };

    return () => es.close();
  }, []);

  /* ================= AUDIO ================= */

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.volume = 0.8;
    return () => audioRef.current?.pause();
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(p => !p);
  };

  const handleNavigateToProgram = (program: Program) => {
    setSelectedProgram(program);
    window.scrollTo(0, 0);
  };

  const isAppRoute = location.pathname === '/app';
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white dark:bg-[#121212]">
      {!isAppRoute && (
        <Navbar
          activeTab={activeTab}
          theme={theme}
          onToggleTheme={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
        />
      )}

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
                    onNavigateToProgram={handleNavigateToProgram}
                  />
                  <RecentlyPlayed tracks={trackHistory} />
                </>
              }
            />
            <Route path="/music" element={<Playlist />} />
            <Route path="/schedule" element={<ScheduleList onNavigateToProgram={handleNavigateToProgram} />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/artists" element={<FeaturedArtistsPage />} />
            <Route path="/presenters" element={<PresentersPage onNavigateToProgram={handleNavigateToProgram} />} />
            <Route path="/devotional" element={<DevotionalPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/my-sounds" element={<ProtectedRoute><MySoundsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {!isAppRoute && <Footer />}
      {!isAppRoute && currentProgram && <LivePlayerBar />}
    </div>
  );
};

/* ================= ROOT ================= */

export default function App() {
  return (
    <AuthProvider>
      <LivePlayerProvider>
        <HashRouter>
          <ScrollToTop />
          <AppContent />
        </HashRouter>
      </LivePlayerProvider>
    </AuthProvider>
  );
}
