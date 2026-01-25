import React, { useState, useEffect, useRef } from 'react'; // ✅ Importações essenciais
import Header from './components/Header';
import Hero from './components/Hero';
import NewReleasesPage from './pages/NewReleasesPage';

const STREAM_URL = 'https://stream.zeno.fm/olisuxy9v3vtv';

const App: React.FC = () => {
  // ✅ Estado de navegação
  const [currentPage, setCurrentPage] = useState<'inicio' | 'musica' | 'programacao' | 'eventos'>('inicio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState({ stream_title: "SINTONIZANDO..." });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
  }, []);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onNavigate={(page) => setCurrentPage(page)} currentPage={currentPage} />

      <main>
        {/* ✅ Troca dinâmica de conteúdo baseada no clique do menu */}
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
          <div className="p-20 text-center">
            <h2 className="text-4xl font-black text-orange-500">PROGRAMAÇÃO BRASIL</h2>
            <button onClick={() => setCurrentPage('inicio')} className="mt-8 text-white underline">Voltar</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;