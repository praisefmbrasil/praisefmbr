import React, { useState, useRef, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Importação de Componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import RecentlyPlayed from './components/RecentlyPlayed';
import LivePlayerBar from './components/LivePlayerBar';
import ProgramDetail from './components/ProgramDetail';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';

// Importação de Páginas
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
import type { Program } from './types';

const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const BLOCKED_METADATA_KEYWORDS = [
  'praise fm', 'praisefm', 'commercial', 'spot', 'promo', 'ident', 'sweeper',
  'intro', 'outro', 'announcement', 'station id', 'jingle', 'teaser'
];

const getBrazilTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour12: false, hour: 'numeric', minute: 'numeric'
  };
  const [h, m] = new Intl.DateTimeFormat('pt-BR', options).format(now).split(':').map(Number);
  return { day: now.getDay(), total: h * 60 + m };
};

interface LiveMetadata {
  artist: string;
  title: string;
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
  if (loading) return <div className="min-h-screen bg-black"></div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// COMPONENTE PRINCIPAL DE CONTEÚDO
const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'dark');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Lógica de Programação "No Ar"
  const { currentProgram, queue } = useMemo(() => {
    const { day, total } = getBrazilTime();
    const schedule = SCHEDULES[day] || SCHEDULES[1];
    
    const currentIndex = schedule.findIndex(p => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end === 0 || end <= start) end = 1440; // 24h
      return total >= start && total < end;
    });
    
    return { 
      currentProgram: currentIndex !== -1 ? schedule[currentIndex] : schedule[0],
      queue: schedule.slice(currentIndex + 1, currentIndex + 5)
    };
  }, [location.pathname]); // Atualiza ao mudar de página ou a cada re-render

  // Inicialização do Áudio
  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.crossOrigin = "anonymous";
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
      audioRef.current.src = STREAM_URL;
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const activeTab = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

  return (
    <div className={`min-h-screen flex flex-col pb-[120px] transition-colors duration-300 ${theme === 'dark' ? 'dark bg-black' : 'bg-white'}`}>
      <Navbar 
        activeTab={activeTab} 
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      />
      
      <main className="flex-grow">
        {selectedProgram ? (
          <ProgramDetail 
            program={selectedProgram} 
            onBack={() => setSelectedProgram(null)} 
            onViewSchedule={() => { setSelectedProgram(null); navigate('/schedule'); }} 
            onListenClick={togglePlayback}
            isPlaying={isPlaying}
          />
        ) : (
          <Routes>
            <Route path="/" element={
              <>
                <Hero onListenClick={togglePlayback} isPlaying={isPlaying} onNavigateToProgram={setSelectedProgram} />
                <RecentlyPlayed tracks={trackHistory} />
              </>
            } />
            <Route path="/music" element={<Playlist />} />
            <Route path="/schedule" element={<ScheduleList onNavigateToProgram={setSelectedProgram} onBack={() => navigate('/')} />} />
            <Route path="/presenters" element={<PresentersPage onNavigateToProgram={setSelectedProgram} />} />
            <Route path="/devotional" element={<DevotionalPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
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

// COMPONENTE ROOT (Onde o Router DEVE ficar)
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