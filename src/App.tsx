import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LivePlayerBar from './components/LivePlayerBar';

// Pages
import HomePage from './pages/HomePage';
import NewReleasesPage from './pages/NewReleasesPage';
import PresentersPage from './pages/PresentersPage';
import SchedulePage from './pages/SchedulePage';
import EventsPage from './pages/EventsPage';
import DevotionalPage from './pages/DevotionalPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import MySoundsPage from './pages/MySoundsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import FeedbackPage from './pages/FeedbackPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';

// Player state (simplificado)
const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';

const AppShell: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.crossOrigin = 'anonymous';
    audioRef.current.volume = 0.8;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(p => !p);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-releases" element={<NewReleasesPage />} />
          <Route path="/presenters" element={<PresentersPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/devotional" element={<DevotionalPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/cookies" element={<CookiesPolicyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/my-sounds" element={<MySoundsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Player global BBC-style */}
      <LivePlayerBar
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        audioRef={audioRef}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </AuthProvider>
  );
}
