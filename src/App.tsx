import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { registerSW } from 'virtual:pwa-register';

// CONFIGURAÇÃO OFICIAL PRAISE FM BRASIL
const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<{ stream_title: string }>({ 
    stream_title: "SINTONIZANDO..." 
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Inicializa o áudio
    audioRef.current = new Audio(STREAM_URL);
    registerSW({ immediate: true });

    // Conexão de Metadados em Tempo Real
    const connectMetadata = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      eventSourceRef.current = new EventSource(METADATA_URL);
      
      eventSourceRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.stream_title) {
            setLiveMetadata(data);
          }
        } catch (e) {
          console.error("Erro nos metadados", e);
        }
      };
    };

    connectMetadata();
    return () => eventSourceRef.current?.close();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 1. O Header que estava faltando (com todos os menus) */}
      <Header />

      <main>
        {/* 2. O Hero com a tipografia e botões idênticos ao original */}
        <Hero 
          onPlayClick={togglePlay} 
          isPlaying={isPlaying} 
          currentTrack={liveMetadata.stream_title}
          onViewSchedule={() => console.log("Ver programação")}
        />
      </main>

      {/* 3. Footer/Mini Player de Suporte */}
      <footer className="fixed bottom-0 w-full bg-[#121212] border-t border-gray-800 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="text-[10px] text-orange-500 font-black uppercase">Ao Vivo</p>
            <p className="text-sm font-bold truncate max-w-[200px]">{liveMetadata.stream_title}</p>
          </div>
        </div>
        <button 
          onClick={togglePlay}
          className="bg-orange-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase hover:scale-105 transition-transform"
        >
          {isPlaying ? "PAUSAR" : "OUVIR AGORA"}
        </button>
      </footer>
    </div>
  );
};

export default App;