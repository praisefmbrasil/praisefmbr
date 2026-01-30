import React, { useState, useRef, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Importação de componentes e constantes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import RecentlyPlayed from './components/RecentlyPlayed';
import LivePlayerBar from './components/LivePlayerBar';
import ProgramDetail from './components/ProgramDetail';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';
import { SCHEDULES } from './constants';
import { Program } from './types';

// Importação de Páginas
import DevotionalPage from './pages/DevotionalPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MySoundsPage from './pages/MySoundsPage';
import ProfilePage from './pages/ProfilePage';
import FeaturedArtistsPage from './pages/FeaturedArtistsPage';
import PresentersPage from './pages/PresentersPage';
import AppHomePage from './pages/AppHomePage';

// --- CONFIGURAÇÕES E HELPERS (Definidos fora para serem encontrados) ---
const STREAM_URL = 'https://stream.zeno.fm/hvwifp8ezc6tv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/hvwifp8ezc6tv';

const BLOCKED_METADATA_KEYWORDS = ['praise fm', 'commercial', 'spot', 'promo', 'jingle'];

const getBrasiliaDayAndTotalMinutes = () => {
  const now = new Date();
  const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const h = brasiliaDate.getHours();
  const m = brasiliaDate.getMinutes();
  return { day: brasiliaDate.getDay(), total: h * 60 + m };
};

interface LiveMetadata {
  artist: string;
  title: string;
  playedAt?: Date;
  isMusic?: boolean;
}

// --- COMPONENTES AUXILIARES ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-white dark:bg-[#121212]"></div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// --- CONTEÚDO PRINCIPAL DO APP ---
const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<any>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Cálculo da programação atual
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
      currentProgram: currentIndex !== -1 ? schedule[currentIndex] : schedule[0], 
      queue: schedule.slice(currentIndex + 1, currentIndex + 5) 
    };
  }, [location.pathname]); // Atualiza ao mudar de rota ou tempo

  // Efeito de Tema
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  // Efeito de Áudio Inicial
  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.crossOrigin = "anonymous";
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
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
    setIsPlaying(!isPlaying);
  };

  const handleNavigateToProgram = (program: Program) => {
    setSelectedProgram(program);
    window.scrollTo(0, 0);
  };

  const isAppView = location.pathname === '/app';
  const isAuthView = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col pb-[120px] dark:bg-[#121212] transition-colors">
      {!isAppView && !isAuthView && (
        <Navbar 
          activeTab={location.pathname === '/' ? 'home' : location.pathname.split('/')[1]} 
          theme={theme}
          onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        />
      )}
      
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
                <Hero onListenClick={togglePlayback} isPlaying={isPlaying} liveMetadata={liveMetadata} onNavigateToProgram={handleNavigateToProgram} />
                <RecentlyPlayed tracks={trackHistory} />
              </>
            } />
            <Route path="/app" element={<AppHomePage />} />
            <Route path="/schedule" element={<ScheduleList onNavigateToProgram={handleNavigateToProgram} onBack={() => navigate('/')} />} />
            <Route path="/presenters" element={<PresentersPage onNavigateToProgram={handleNavigateToProgram} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      {!isAppView && !isAuthView && <Footer />}
      
      {!isAppView && currentProgram && (
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

// --- EXPORT DEFAULT (O ponto de entrada) ---
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