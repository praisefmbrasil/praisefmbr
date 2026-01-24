import React, { useState, useRef, useEffect, useMemo } from 'react';
// Corrigido: Importação correta da biblioteca lucide-react
import { Play, Music, Heart, Info, ExternalLink, Pause, Loader2, X, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// LISTA DE ARTISTAS GOSPEL BRASILEIROS
const MASTER_ARTISTS = [
  "Fernandinho", "Aline Barros", "Anderson Freire", "Gabriela Rocha", 
  "Preto no Branco", "Isadora Pompeo", "Morada", "Kemuel", 
  "Bruna Karla", "Cassiane", "Thalles Roberto", "Casa Worship", 
  "Diante do Trono", "Fernanda Brum", "Leonardo Gonçalves",
  "Nivea Soares", "Paulo Neto", "Julia Vitória", "Sarah Beatriz", "Gabriel Guedes"
];

const ARCHIVE_DATA = [
  { date: "24 Out", artists: ["Fernandinho", "Gabriela Rocha", "Morada"] },
  { date: "23 Out", artists: ["Aline Barros", "Anderson Freire", "Isadora Pompeo"] },
  { date: "22 Out", artists: ["Preto no Branco", "Casa Worship", "Kemuel"] },
  { date: "21 Out", artists: ["Bruna Karla", "Cassiane", "Thalles Roberto"] }
];

type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl?: string;
};

const getRotationSeed = () => {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  return Math.floor(Date.now() / oneDayInMs);
};

const shuffleWithSeed = (array: any[], seed: number) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % shuffled.length;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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

const Playlist: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePreview, setActivePreview] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentArtists = useMemo(() => {
    const seed = getRotationSeed();
    return shuffleWithSeed(MASTER_ARTISTS, seed).slice(0, 12);
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const results: Track[] = [];
        for (const artist of currentArtists) { 
          const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&entity=song&limit=1&country=br`);
          if (res.ok) {
            const data = await res.json();
            if (data.results && data.results.length > 0) results.push(data.results[0]);
          }
        }
        setTracks(results);
      } catch (e) {
        console.error("Erro ao carregar playlist");
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [currentArtists]);

  const togglePreview = (track: Track) => {
    if (!track.previewUrl || !audioRef.current) return;
    if (activePreview === track.trackId) {
      audioRef.current.pause();
      setActivePreview(null);
    } else {
      audioRef.current.src = track.previewUrl;
      audioRef.current.play().catch(() => setActivePreview(null));
      setActivePreview(track.trackId);
    }
  };

  return (
    <div className="bg-[#f2f2f2] dark:bg-[#000] min-h-screen transition-colors duration-300">
      <audio ref={audioRef} onEnded={() => setActivePreview(null)} />
      
      {/* HEADER */}
      <div className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-white/5 py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
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

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-[#ff6600] animate-spin mb-4" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">Atualizando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tracks.map(track => (
              <PlaylistCard 
                key={track.trackId} 
                track={track} 
                isPlaying={activePreview === track.trackId}
                onTogglePlay={() => togglePreview(track)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;