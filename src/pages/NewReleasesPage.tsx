import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Zap, Flame, Calendar, Plus, Heart, Share2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Release {
  id: string;
  artist: string;
  title: string;
  image: string;
  previewUrl: string;
  isHot?: boolean;
}

const NEW_RELEASES_DATA: Release[] = [
  {
    id: 'nr1',
    artist: 'Fernandinho',
    title: 'Eis-me Aqui',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
    previewUrl: '',
    isHot: true
  },
  {
    id: 'nr2',
    artist: 'Gabriela Rocha',
    title: 'Me Atraiu',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
    previewUrl: '',
    isHot: true
  },
  {
    id: 'nr3',
    artist: 'Isaias Saad',
    title: 'Bondade de Deus',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp',
    previewUrl: ''
  },
  {
    id: 'nr4',
    artist: 'Aline Barros',
    title: 'Jeová Jireh',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp',
    previewUrl: ''
  },
  {
    id: 'nr5',
    artist: 'Morada',
    title: 'É Tudo Sobre Você',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800',
    previewUrl: ''
  },
  {
    id: 'nr6',
    artist: 'Casa Worship',
    title: 'A Casa É Sua',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    previewUrl: ''
  }
];

const NewReleasesPage: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>(NEW_RELEASES_DATA);
  const [loading, setLoading] = useState(true);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toggleFavorite, isFavorite, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviews = async () => {
      const updated = await Promise.all(NEW_RELEASES_DATA.map(async (item) => {
        try {
          const searchTerm = encodeURIComponent(`${item.artist} ${item.title}`);
          const res = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=song&limit=1`);
          
          if (res.ok) {
            const json = await res.json();
            if (json.results && json.results.length > 0) {
              const track = json.results[0];
              return { 
                ...item, 
                previewUrl: track.previewUrl || item.previewUrl,
                image: track.artworkUrl100 ? track.artworkUrl100.replace("100x100", "800x800") : item.image
              };
            }
          }
        } catch (e) {
          console.debug("Falha ao buscar preview para:", item.title);
        }
        return item;
      }));
      setReleases(updated);
      setLoading(false);
    };
    fetchPreviews();
  }, []);

  const togglePlay = (id: string, url: string) => {
    if (!url || !audioRef.current) return;
    if (activePreview === id) {
      audioRef.current.pause();
      setActivePreview(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play().catch(() => setActivePreview(null));
      setActivePreview(id);
    }
  };

  const handleFavorite = (e: React.MouseEvent, release: Release) => {
    e.stopPropagation();
    if (!user) return navigate('/login');
    toggleFavorite({
      id: release.id,
      title: release.title,
      host: release.artist,
      image: release.image,
      type: 'track'
    });
  };

  const mainHighlight = releases[0];

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      <audio ref={audioRef} onEnded={() => setActivePreview(null)} />
      
      {/* Hero Section - A Nova Onda */}
      <div className="bg-black text-white relative overflow-hidden h-[75vh] flex items-center">
        <div className="absolute inset-0 opacity-50">
          <img 
            src={mainHighlight.image} 
            className="w-full h-full object-cover grayscale blur-[2px]" 
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="inline-flex items-center space-x-2 bg-[#ff6600] text-white px-4 py-2 mb-8">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Single da Semana</span>
          </div>
          <h1 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 italic">A Nova<br />Onda</h1>
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <div>
              <p className="text-[#ff6600] text-2xl font-black uppercase tracking-widest mb-2">{mainHighlight.artist}</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">{mainHighlight.title}</h2>
            </div>
            <button 
              onClick={() => togglePlay(mainHighlight.id, mainHighlight.previewUrl)}
              className="bg-[#ff6600] text-white h-24 w-24 rounded-none flex items-center justify-center hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-[10px_10px_0px_rgba(255,102,0,0.3)]"
            >
              {activePreview === mainHighlight.id ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Filtros e Título */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b-4 border-black dark:border-white pb-10">
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
            <h3 className="text-5xl font-black uppercase tracking-tighter dark:text-white italic">Esta Semana</h3>
            <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 font-black uppercase tracking-widest text-[10px]">Jan 2026</span>
          </div>
          <div className="flex space-x-2">
             <button className="bg-[#ff6600] text-white px-8 py-3 text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_black] dark:shadow-[4px_4px_0px_white]">Recentes</button>
             <button className="bg-transparent text-gray-400 px-8 py-3 text-[11px] font-black uppercase tracking-widest border border-gray-200 dark:border-white/10 hover:text-black dark:hover:text-white transition-colors">Arquivo</button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-16 h-16 text-[#ff6600] animate-spin mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Escaneando novos hinos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-white/10 border-x border-b border-gray-200 dark:border-white/10">
            {releases.map((release) => (
              <div key={release.id} className="bg-white dark:bg-[#080808] group relative overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={release.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    alt={release.title} 
                  />
                  
                  {release.isHot && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 flex items-center space-x-2 z-20">
                      <Flame className="w-4 h-4 fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Em Alta</span>
                    </div>
                  )}

                  {/* Overlay de Ações ao passar o mouse */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm">
                    <button 
                      onClick={() => togglePlay(release.id, release.previewUrl)}
                      className="bg-[#ff6600] text-white p-6 mb-6 hover:scale-110 transition-transform"
                    >
                      {activePreview === release.id ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                    </button>
                    <div className="flex space-x-3">
                      <button 
                        onClick={(e) => handleFavorite(e, release)}
                        className={`p-4 border ${isFavorite(release.id) ? 'bg-red-600 border-red-600 text-white' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(release.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-4 border border-white/20 text-white hover:bg-white hover:text-black">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Info Card */}
                <div className="p-10 group-hover:bg-[#ff6600] transition-colors duration-500 min-h-[160px] flex flex-col justify-center">
                  <p className="text-[#ff6600] text-[11px] font-black uppercase tracking-[0.2em] mb-2 group-hover:text-black/50">{release.artist}</p>
                  <h4 className="text-black dark:text-white text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-black">{release.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estatísticas de Curadoria */}
        <div className="mt-40 border-t-4 border-black dark:border-white pt-20 flex flex-col lg:flex-row items-start gap-24">
           <div className="w-full lg:w-1/3">
             <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#ff6600] mb-8">Sobre Nossa Curadoria</h4>
             <p className="text-gray-500 dark:text-gray-400 text-lg font-bold leading-tight uppercase tracking-tighter">
                Toda semana, nossa equipe editorial analisa centenas de lançamentos para entregar apenas o que realmente importa para sua adoração.
             </p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 flex-grow w-full">
              <div className="space-y-3">
                <p className="text-5xl font-black uppercase tracking-tighter dark:text-white italic">12k+</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Músicas<br />Avaliadas</p>
              </div>
              <div className="space-y-3">
                <p className="text-5xl font-black uppercase tracking-tighter dark:text-white italic">50</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Novas Entradas<br />Semanais</p>
              </div>
              <div className="space-y-3">
                <p className="text-5xl font-black uppercase tracking-tighter dark:text-white italic">100%</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Foco em<br />Adoração</p>
              </div>
              <div className="space-y-3">
                <p className="text-5xl font-black uppercase tracking-tighter dark:text-white italic">24/7</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Descoberta<br />Global</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;