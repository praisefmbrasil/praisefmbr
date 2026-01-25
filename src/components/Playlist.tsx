import React, { useState, useRef, useEffect } from 'react';
import { Play, Music, Heart, Info, ExternalLink, Pause, Loader2, X, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getDailyBrazilianPlaylist } from '../utils/mockTracks';

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

  useEffect(() => {
    const loadPlaylist = () => {
      const dailyTracks = getDailyBrazilianPlaylist();
      setTracks(dailyTracks);
      setLoading(false);
    };
    const timer = setTimeout(loadPlaylist, 800);
    return () => clearTimeout(timer);
  }, []);

  const togglePreview = (track: Track) => {
    if (activePreview === track.trackId) {
      setActivePreview(null);
    } else {
      setActivePreview(track.trackId);
    }
  };

  const aList = tracks.slice(0, 4);
  const bList = tracks.slice(4, 8);
  const cList = tracks.slice(8, 12);

  return (
    <div className="bg-[#f2f2f2] dark:bg-[#000] min-h-screen transition-colors duration-300">
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
            <div className="flex-grow overflow-y-auto p-6 space-y-4 text-black dark:text-white">
              <p className="text-sm opacity-50 uppercase tracking-widest">Edições anteriores indisponíveis no momento.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-white/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[#ff6600] mb-4">
            <Music className="w-4 h-4" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">Seleção Oficial Praise FM Brasil</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter mb-6 dark:text-white leading-none">Playlist</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-normal leading-tight uppercase">
            Curadoria diária. O som definitivo da <span className="text-black dark:text-white font-medium">Praise FM Brasil</span>.
          </p>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-[#ff6600] animate-spin mb-4" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">A carregar...</p>
          </div>
        ) : (
          <>
            <PlaylistSection title="Lista A" subtitle="Em Alta" list={aList} activePreview={activePreview} onToggle={togglePreview} />
            <PlaylistSection title="Lista B" subtitle="Em Ascensão" list={bList} activePreview={activePreview} onToggle={togglePreview} opacity="opacity-60" />
            <PlaylistSection title="Lista C" subtitle="Novidades" list={cList} activePreview={activePreview} onToggle={togglePreview} opacity="opacity-40" />
          </>
        )}
      </div>
    </div>
  );
};

// Componente Auxiliar para Secções
const PlaylistSection = ({ title, subtitle, list, activePreview, onToggle, opacity = "" }: any) => (
  <section className="mb-24">
    <div className={`flex items-baseline space-x-4 mb-10 border-b-4 border-black dark:border-white pb-4 ${opacity}`}>
      <h2 className="text-4xl font-medium uppercase tracking-tighter dark:text-white">{title}</h2>
      <span className="text-[#ff6600] text-sm font-medium uppercase tracking-widest">{subtitle}</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {list.map((track: Track) => (
        <PlaylistCard 
          key={track.trackId} 
          track={track} 
          isPlaying={activePreview === track.trackId}
          onTogglePlay={() => onToggle(track)}
        />
      ))}
    </div>
  </section>
);

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
      image: track.artworkUrl100,
      type: 'track' 
    });
  };

  return (
    <div className="group relative bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img src={track.artworkUrl100} alt={track.trackName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <button onClick={onTogglePlay} className="w-14 h-14 bg-[#ff6600] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-2xl">
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
        </div>
        <button onClick={handleFavorite} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${isFavorite(track.trackId.toString()) ? 'bg-red-500 text-white opacity-100' : 'bg-black/20 text-white hover:bg-[#ff6600] opacity-0 group-hover:opacity-100'}`}>
          <Heart className={`w-4 h-4 ${isFavorite(track.trackId.toString()) ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white leading-tight truncate uppercase tracking-tighter">{track.trackName}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-[10px] font-normal uppercase tracking-[0.2em] mt-1">{track.artistName}</p>
      </div>
    </div>
  );
};

export default Playlist;