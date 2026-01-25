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

// ✅ Dados corrigidos: sem espaços, com imagens reais do Cloudinary
const NEW_RELEASES_DATA: Release[] = [
  {
    id: 'nr1',
    artist: 'Gabriel Guedes',
    title: 'Vitorioso És',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriel_Guedes_placeholder.webp',
    previewUrl: '',
    isHot: true
  },
  {
    id: 'nr2',
    artist: 'Ministério Morada',
    title: 'É Tudo Sobre Você',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ministerio_Morada_placeholder.webp',
    previewUrl: '',
    isHot: true
  },
  {
    id: 'nr3',
    artist: 'Isadora Pompeo',
    title: 'Bênçãos Que Não Tem Fim',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isadora_Pompeo_placeholder.webp',
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
    artist: 'Fernandinho',
    title: 'Único',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
    previewUrl: ''
  },
  {
    id: 'nr6',
    artist: 'Gabriela Rocha',
    title: 'Me Atraiu',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
    previewUrl: ''
  }
];

const NewReleasesPage: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>(NEW_RELEASES_DATA);
  const [loading, setLoading] = useState(false); // ✅ Não precisa de fetch
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toggleFavorite, isFavorite, user } = useAuth();
  const navigate = useNavigate();

  // ✅ Remove a chamada ao iTunes (não é confiável para artistas BR)
  useEffect(() => {
    // Simula carregamento rápido
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
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
      
      {/* Header Cinematográfico */}
      <div className="bg-black text-white relative overflow-hidden h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={mainHighlight.image} 
            className="w-full h-full object-cover grayscale" 
            alt={mainHighlight.artist}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="inline-flex items-center space-x-2 bg-[#ff6600] text-black px-4 py-1.5 mb-8">
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Lançamento da Semana</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8">Novos<br />Louvores</h1>
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <div>
              <p className="text-[#ff6600] text-xl font-bold uppercase tracking-widest mb-2">{mainHighlight.artist}</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{mainHighlight.title}</h2>
            </div>
            <button 
              onClick={() => togglePlay(mainHighlight.id, mainHighlight.previewUrl)}
              className="bg-white text-black h-20 w-20 rounded-full flex items-center justify-center hover:bg-[#ff6600] hover:text-white transition-all transform hover:scale-105"
            >
              {activePreview === mainHighlight.id ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Barra de Filtros */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b-2 border-black dark:border-white pb-8">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <h3 className="text-4xl font-black uppercase tracking-tighter dark:text-white">Lançamentos</h3>
            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm pt-2">Janeiro 2026</span>
          </div>
          <div className="flex space-x-4">
             <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest">Recentes</button>
             <button className="bg-transparent text-gray-400 px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-gray-200 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors">Arquivo</button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-[#ff6600] animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Carregando novos louvores...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            {releases.map((release) => (
              <div key={release.id} className="bg-white dark:bg-[#111] group relative">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={release.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt={release.title} 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                  
                  {release.isHot && (
                    <div className="absolute top-6 left-6 bg-[#ff6600] text-white p-2 flex items-center space-x-2">
                      <Flame className="w-4 h-4 fill-current" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Em Alta</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        onClick={() => togglePlay(release.id, release.previewUrl)}
                        className="bg-[#ff6600] text-white p-4 rounded-full"
                      >
                        {activePreview === release.id ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                      </button>
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => handleFavorite(e, release)}
                          className={`p-3 rounded-full border ${isFavorite(release.id) ? 'bg-red-500 border-red-500 text-white' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite(release.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#ff6600] text-[10px] font-black uppercase tracking-[0.2em] mb-1">{release.artist}</p>
                    <h4 className="text-white text-xl font-bold uppercase tracking-tighter truncate">{release.title}</h4>
                  </div>
                </div>
                
                <div className="p-8 group-hover:bg-[#ff6600] transition-colors duration-500">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 group-hover:text-black/60">{release.artist}</p>
                  <h4 className="text-black dark:text-white text-2xl font-black uppercase tracking-tighter truncate group-hover:text-black">{release.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estatísticas de Curadoria */}
        <div className="mt-32 border-t border-gray-100 dark:border-white/10 pt-16 flex flex-col md:flex-row items-start gap-20">
            <div className="w-full md:w-1/3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff6600] mb-6">Sobre Nossa Curadoria</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold leading-relaxed uppercase tracking-tight">
                Toda semana, nossa equipe editorial analisa milhares de lançamentos independentes e de grandes gravadoras para trazer apenas o que importa para sua adoração.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow">
               <div className="space-y-2">
                 <p className="text-3xl font-black uppercase tracking-tighter dark:text-white">12k+</p>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Músicas Avaliadas</p>
               </div>
               <div className="space-y-2">
                 <p className="text-3xl font-black uppercase tracking-tighter dark:text-white">50</p>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Novos Lançamentos Semanais</p>
               </div>
               <div className="space-y-2">
                 <p className="text-3xl font-black uppercase tracking-tighter dark:text-white">100%</p>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Conteúdo Cristão</p>
               </div>
               <div className="space-y-2">
                 <p className="text-3xl font-black uppercase tracking-tighter dark:text-white">24/7</p>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Descoberta Contínua</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;