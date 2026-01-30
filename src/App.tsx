import React, { useState, useRef, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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

// Páginas e Constantes
import { SCHEDULES } from './constants';
import { Program } from './types';

const STREAM_URL = 'https://stream.zeno.fm/hvwifp8ezc6tv';

// --- COMPONENTES AUXILIARES ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- COMPONENTE PRINCIPAL ---
const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<any>(null);
  const [trackHistory, setTrackHistory] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light'
  );
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Estados derivados (Props da Navbar)
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
  const isAuthView = ['/login', '/signup'].includes(location.pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

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

  // O RETURN PRECISA ESTAR AQUI DENTRO (Antes da última chave do AppContent)
  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white text-black dark:bg-[#121212] dark:text-white transition-colors">
      
      {/* Navbar com as props obrigatórias */}
      {!isAuthView && (
        <Navbar 
          activeTab={activeTab} 
          theme={theme}
          onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        />
      )}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero onListenClick={togglePlayback} isPlaying={isPlaying} liveMetadata={liveMetadata} onNavigateToProgram={handleNavigateToProgram} />
              <RecentlyPlayed tracks={trackHistory} />
            </>
          } />
          
          <Route path="/schedule" element={
            <ScheduleList 
              onNavigateToProgram={handleNavigateToProgram} 
              onBack={() => navigate('/')} 
            />
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthView && <Footer />}
    </div>
  ); 
}; // <-- ESTA CHAVE FECHA O APPCONTENT

// --- EXPORT DEFAULT ---
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