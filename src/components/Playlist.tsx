import React, { useState, useRef, useEffect } from 'react';
import { Play, Music, Heart, Info, ExternalLink, Pause, Loader2, X, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ✅ Importa o mock de músicas brasileiras
import { getDailyBrazilianPlaylist } from '../utils/mockTracks';

// ✅ Define a interface Track
interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
}

const Playlist: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePreview, setActivePreview] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ Simula carregamento rápido da playlist brasileira
  useEffect(() => {
    const loadPlaylist = () => {
      const dailyTracks = getDailyBrazilianPlaylist().map((t, idx) => ({
        ...t,
        previewUrl: '', // opcional: adicione URL de áudio depois
      }));
      setTracks(dailyTracks);
      setLoading(false);
    };

    const timer = setTimeout(loadPlaylist, 800);
    return () => clearTimeout(timer);
  }, []);

  const togglePreview = (track: Track) => {
    // 💡 Se quiser pré-visualização no futuro, descomente:
    // if (!track.previewUrl || !audioRef.current) return;
    console.log(`Pré-visualização de "${track.trackName}" por ${track.artistName} - implementação futura.`);
    
    if (activePreview === track.trackId) {
      // audioRef.current?.pause();
      setActivePreview(null);
    } else {
      // audioRef.current.src = track.previewUrl;
      // audioRef.current.play().catch(() => setActivePreview(null));
      setActivePreview(track.trackId);
    }
  };

  const aList = tracks.slice(0, 4);
  const bList = tracks.slice(4, 8);
  const cList = tracks.slice(8, 12);

  return (
    <div className="bg-[#f2f2f2] dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* ✅ Audio ref (mantido para futuro uso) */}
      <audio ref={audioRef} onEnded={() => setActivePreview(null)} />
      
      {/* Modal de Arquivo */}
      {showArchive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#111] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-[#ff6600] text-white">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Arquivo de Playlists</h2>
              </div>
              <button onClick={() => setShowArchive(false)} className="p-2 hover:bg-black/20 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {/* Exemplo de arquivo (você pode preencher com dados reais depois) */}
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="p-5 border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-[#ff6600] transition-colors group cursor-default">
                  <span className="text-[10px] font-black text-[#ff6600] uppercase tracking-[0.2em] mb-2 block">{new Date(Date.now() - idx * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}</span>
                  <h3 className="text-lg font-black dark:text-white uppercase tracking-tight mb-3">Artistas em Destaque</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Aline Barros", "Gabriela Rocha", "Fernandinho"].map((artist, aIdx) => (
                      <span key={aIdx} className="bg-white dark:bg-black px-3 py-1 text-xs font-regular border border-gray-200 dark:border-white/10 dark:text-gray-300">
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-white/10 text-center">
              <p className="text-xs text-gray-400 uppercase font-regular tracking-widest">Últimas 4 edições diárias</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-white/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[#ff6600] mb-4">
            <Music className="w-4 h-4" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">Seleção Oficial Praise FM Brasil</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter mb-6 dark:text-white leading-none">Playlist</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-normal leading-tight uppercase">
            Curadoria diária. O som definitivo da <span className="text-black dark:text-white font-medium">Praise FM Brasil</span>, com os maiores louvores nacionais que impactam sua jornada de fé.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-[#ff6600] animate-spin mb-4" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">Atualizando Playlist Diária...</p>
          </div>
        ) : (
          <>
            {aList.length > 0 && (
              <section className="mb-24">
                <div className="flex items-baseline space-x-4 mb-10 border-b-4 border-black dark:border-white pb-4">
                  <h2 className="text-4xl font-medium uppercase tracking-tighter dark:text-white">Lista A</h2>
                  <span className="text-[#ff6600] text-sm font-medium uppercase tracking-widest">Em Alta</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {aList.map(track => (
                    <PlaylistCard 
                      key={track.trackId} 
                      track={track} 
                      isPlaying={activePreview === track.trackId}
                      onTogglePlay={() => togglePreview(track)}
                    />
                  ))}
                </div>
              </section>
            )}

            {bList.length > 0 && (
              <section className="mb-24">
                <div className="flex items-baseline space-x-4 mb-10 border-b-4 border-black/20 dark:border-white/20 pb-4">
                  <h2 className="text-4xl font-medium uppercase tracking-tighter dark:text-white opacity-60">Lista B</h2>
                  <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">Em Ascensão</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {bList.map(track => (
                    <PlaylistCard 
                      key={track.trackId} 
                      track={track}
                      isPlaying={activePreview === track.trackId}
                      onTogglePlay={() => togglePreview(track)}
                    />
                  ))}
                </div>
              </section>
            )}

            {cList.length > 0 && (
              <section className="mb-24">
                <div className="flex items-baseline space-x-4 mb-10 border-b-4 border-black/10 dark:border-white/10 pb-4">
                  <h2 className="text-4xl font-medium uppercase tracking-tighter dark:text-white opacity-40">Lista C</h2>
                  <span className="text-gray-300 text-sm font-medium uppercase tracking-widest">Novidades</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {cList.map(track => (
                    <PlaylistCard 
                      key={track.trackId} 
                      track={track}
                      isPlaying={activePreview === track.trackId}
                      onTogglePlay={() => togglePreview(track)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <div className="bg-white dark:bg-[#111] p-12 mt-20 border border-gray-200 dark:border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center space-x-8">
              <div className="w-16 h-16 bg-[#ff6600] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Info className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-medium uppercase tracking-tighter dark:text-white">Rotação Diária</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mt-2 uppercase font-normal tracking-tight leading-relaxed">
                  A <span className="text-[#ff6600] font-medium">Playlist Praise FM Brasil</span> é atualizada a cada 24 horas. Selecionamos os louvores mais impactantes do cenário gospel nacional para inspirar sua caminhada com Deus.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowArchive(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-[10px] font-medium uppercase tracking-[0.3em] flex items-center space-x-3 hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-lg active:scale-95"
            >
              <span>Ver Playlists Anteriores</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Componente interno PlaylistCard (mantido igual)
const PlaylistCard: React.FC<{ track: Track; isPlaying: boolean; onTogglePlay: () => void }> = ({ track, isPlaying, onTogglePlay }) => {
  const { toggleFavorite, isFavorite, user } = useAuth();
  const navigate = useNavigate();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return navigate('/login');
    toggleFavorite({ 
      id: track.trackId.toString(), 
      title: track.trackName, 
      host: track.artistName, 
      image: track.artworkUrl100.replace("100x100", "600x600"),
      type: 'track' 
    });
  };

  return (
    <div className="group relative bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={track.artworkUrl100.replace("100x100", "600x600")} 
          alt={track.trackName} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <button 
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="w-14 h-14 bg-[#ff6600] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-2xl"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
        </div>
        <button 
          onClick={handleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${isFavorite(track.trackId.toString()) ? 'bg-red-500 text-white opacity-100' : 'bg-black/20 text-white hover:bg-[#ff6600] opacity-0 group-hover:opacity-100'}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite(track.trackId.toString()) ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white leading-tight truncate uppercase tracking-tighter">
          {track.trackName}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] font-normal uppercase tracking-[0.2em] mt-1">
          {track.artistName}
        </p>
      </div>
    </div>
  );
};

export default Playlist;