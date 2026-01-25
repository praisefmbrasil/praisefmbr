import React, { useState, useEffect, useRef } from 'react';
import { Program, Podcast, DayOfWeek } from './types';
import { registerSW } from 'virtual:pwa-register';

// COMPONENTES (Certifique-se de que os caminhos estão corretos)
import ProgramDetail from './components/ProgramDetail';
import NewReleasesPage from './pages/NewReleasesPage';
import Hero from './components/Hero';

// CONFIGURAÇÃO DA PRAISE FM BRASIL
const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv'; // URL que você forneceu
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const App: React.FC = () => {
  // Estados para Áudio e Metadados
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<any>(null);
  const [view, setView] = useState<'home' | 'program-detail' | 'new-releases'>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Inicializar Áudio e PWA
  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    registerSW({ immediate: true });

    // Conectar aos Metadados da rádio Brasil
    const connectMetadata = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      
      eventSourceRef.current = new EventSource(METADATA_URL);
      eventSourceRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLiveMetadata(data);
      };
    };

    connectMetadata();
    return () => {
      eventSourceRef.current?.close();
      audioRef.current?.pause();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Funções de Navegação (Resolvendo erro 2741)
  const handleBack = () => setView('home');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tighter">
          PRAISE FM <span className="text-orange-500">BRASIL</span>
        </h1>
      </header>

      <main>
        {view === 'home' && (
          <Hero 
            onPlayClick={togglePlay} 
            isPlaying={isPlaying} 
            currentTrack={liveMetadata?.stream_title || "Sintonizando..."}
            onViewSchedule={() => setView('program-detail')}
          />
        )}

        {/* Detalhe do Programa (Resolvendo erro 2322) */}
        {view === 'program-detail' && selectedProgram && (
          <ProgramDetail 
            program={selectedProgram}
            onBack={handleBack}
            onViewSchedule={() => {}} 
            onListenClick={togglePlay} // Propriedade agora esperada
            isPlaying={isPlaying}
          />
        )}

        {/* Novas Releases (Resolvendo erro 2741) */}
        {view === 'new-releases' && (
          <NewReleasesPage onBack={handleBack} />
        )}
      </main>

      {/* MINI PLAYER FIXO */}
      <div className="fixed bottom-0 w-full bg-gray-900 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-orange-500 font-bold uppercase">Ao Vivo</p>
          <p className="text-sm truncate">{liveMetadata?.stream_title || "Praise FM Brasil"}</p>
        </div>
        <button 
          onClick={togglePlay}
          className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition"
        >
          {isPlaying ? "Pausar" : "Ouvir Agora"}
        </button>
      </div>
    </div>
  );
};

export default App;