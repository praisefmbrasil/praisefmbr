import React, { useState, useRef, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router';
import Footer from './components/Footer';
import LivePlayerBar from './components/LivePlayerBar';
import { Program } from './types';
import { SCHEDULES } from './constants';

// Stream oficial da Praise FM Brasil
const STREAM_URL = 'https://stream.zeno.fm/f3766utp6v8uv';

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<any>(null);
  const [trackHistory, setTrackHistory] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'dark' // Iniciando em dark para o look USA
  );
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Aplica o tema dark/light na raiz do site
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

  // Inicializa o áudio apenas uma vez
  useEffect(() => {
    const audio = new Audio(STREAM_URL);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
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
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col pb-[120px] bg-white text-black dark:bg-[#0b0b0b] dark:text-white transition-colors">
      {/* O AppRouter recebe as props e injeta na Navbar moderna */}
      <AppRouter 
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        onListenClick={togglePlayback}
        isPlaying={isPlaying}
        liveMetadata={liveMetadata}
        trackHistory={trackHistory}
        onNavigateToProgram={handleNavigateToProgram}
      />

      <Footer />
      
      {/* Player de rodapé igual ao da versão USA */}
      <LivePlayerBar 
        isPlaying={isPlaying} 
        onTogglePlayback={togglePlayback} 
        program={SCHEDULES[1][0]} 
        liveMetadata={liveMetadata}
        queue={[]}
        audioRef={audioRef}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
}