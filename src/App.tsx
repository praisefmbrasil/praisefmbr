// src/App.tsx

import { useState, useEffect, useMemo } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LivePlayerProvider, usePlayer } from './contexts/LivePlayerContext';

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

/* ================= UTIL ================= */

const getSaoPauloDayAndTotalMinutes = () => {
  const now = new Date();
  const sp = new Date(
    now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  );
  return {
    day: sp.getDay(),
    total: sp.getHours() * 60 + sp.getMinutes(),
  };
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

/* ================= APP CONTENT ================= */

const AppContent = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () =>
      (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light'
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { isPlaying, togglePlay, currentTrack } = usePlayer();

  const { day, total } = getSaoPauloDayAndTotalMinutes();

  const currentProgram = useMemo(() => {
    const schedule = SCHEDULES[day] || SCHEDULES[0];

    return (
      schedule.find(p => {
        const [sH, sM] = p.startTime.split(':').map(Number);
        const [eH, eM] = p.endTime.split(':').map(Number);
        let start = sH * 60 + sM;
        let end = eH * 60 + eM;
        if (end <= start) end += 1440;
        return total >= start && total < end;
      }) || schedule[0]
    );
  }, [day, total]);

  /* ================= THEME ================= */

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  const isAppRoute = location.pathname === '/app';
  const activeTab =
    location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white dark:bg-[#121212] transition-colors">
      {!isAppRoute && (
        <Navbar
          activeTab={activeTab}
          theme={theme}
          onToggleTheme={() =>
            setTheme(t => (t === 'light' ? 'dark' : 'light'))
          }
        />
      )}

      <main className="flex-grow">
        {selectedProgram ? (
          <ProgramDetail
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
            onViewSchedule={() => navigate('/schedule')}
          />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero
                    onNavigateToProgram={setSelectedProgram}
                    onListenClick={togglePlay}
                    isPlaying={isPlaying}
                    liveMetadata={currentTrack}
                  />
                  <RecentlyPlayed />
                </>
              }
            />

            <Route path="/music" element={<Playlist />} />
            <Route
              path="/schedule"
              element={<ScheduleList onNavigateToProgram={setSelectedProgram} />}
            />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/artists" element={<FeaturedArtistsPage />} />
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

            <Route path="/live-recordings" element={<LiveRecordingsPage />} />
            <Route path="/new-releases" element={<NewReleasesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {!isAppRoute && <Footer />}

      {/* 🔥 LivePlayerBar aparece SOMENTE quando estiver tocando */}
      {!isAppRoute && isPlaying && <LivePlayerBar />}
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
