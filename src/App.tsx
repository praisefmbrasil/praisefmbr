import React, { useState, useRef, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './AppRouter';
import Footer from './components/Footer';
import LivePlayerBar from './components/LivePlayerBar';
import { Program } from './types';
import { SCHEDULES } from './constants';

const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<any>(null);
  const [trackHistory, setTrackHistory] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light'
  );
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('praise-theme', theme);
  }, [theme]);

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
    <div className="min-h-screen flex flex-col pb-[120px] bg-white text-black dark:bg-[#121212] dark:text-white transition-colors">
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