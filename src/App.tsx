import React, { useState, useEffect, useRef } from 'react'; // Resolve erro 'useState'
import Header from './components/Header'; // Resolve erro 'Header'
import Hero from './components/Hero';     // Resolve erro 'Hero'
import NewReleasesPage from './pages/NewReleasesPage'; // Resolve erro 'NewReleasesPage'
import { registerSW } from 'virtual:pwa-register';

// CONFIGURAÇÃO PRAISE FM BRASIL
const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const App: React.FC = () => {
  // Estados de Navegação e Áudio
  const [currentPage, setCurrentPage] = useState<'inicio' | 'musica' | 'programacao' | 'eventos'>('inicio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState({ stream_title: "SINTONIZANDO..." });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Resolve erros de 'isPlaying' e 'liveMetadata' sendo usados antes da definição
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL);
    }
    registerSW({ immediate: true });

    const connectMetadata = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      eventSourceRef.current = new EventSource(METADATA_URL);
      eventSourceRef.current.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.stream_title) setLiveMetadata(data);
        } catch (err) { console.error(err); }
      };
    };
    connectMetadata();
    return () => eventSourceRef.current?.close();
  }, []);

  // Resolve erro 'togglePlay'
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* O Header agora recebe as funções de navegação corretamente */}
      <Header 
        onNavigate={(page: any) => setCurrentPage(page)} 
        currentPage={currentPage} 
      />

      <main>
        {currentPage === 'inicio' && (
          <Hero 
            onPlayClick={togglePlay} 
            isPlaying={isPlaying} 
            currentTrack={liveMetadata.stream_title}
            onViewSchedule={() => setCurrentPage('programacao')}
          />
        )}

        {currentPage === 'musica' && (
          <NewReleasesPage onBack={() => setCurrentPage('inicio')} />
        )}

        {currentPage === 'programacao' && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-4xl font-black uppercase text-orange-500">Programação Brasil</h2>
            <p className="text-gray-400 mt-4">Em breve, a grade completa dos seus programas favoritos.</p>
            <button onClick={() => setCurrentPage('inicio')} className="mt-8 border border-white px-6 py-2 uppercase text-xs font-bold">Voltar</button>
          </div>
        )}
      </main>

      {/* Mini Player Fixo para garantir que o áudio não pare ao navegar */}
      <footer className="fixed bottom-0 w-full bg-[#121212] border-t border-white/10 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <p className="text-xs font-bold truncate uppercase">{liveMetadata.stream_title}</p>
        </div>
        <button onClick={togglePlay} className="bg-orange-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">
          {isPlaying ? "PAUSAR" : "OUVIR"}
        </button>
      </footer>
    </div>
  );
};

export default App;