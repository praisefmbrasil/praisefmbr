import React from 'react';
import { Star, Music, Users, Play, ArrowRight, Heart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  hits: string[];
}

const FEATURED_ARTISTS: Artist[] = [
  { 
    id: 'art_1', 
    name: 'Fernandinho', 
    genre: 'Christian Rock / Worship', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp', 
    hits: ['Faz Chover', 'Galileu', 'Todas as Coisas'] 
  },
  { 
    id: 'art_2', 
    name: 'Isaias Saad', 
    genre: 'Worship / Pop', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp', 
    hits: ['Oousado Amor', 'Bondade de Deus', 'Enche-me'] 
  },
  { 
    id: 'art_3', 
    name: 'Gabriela Rocha', 
    genre: 'Worship', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp', 
    hits: ['Lugar Secreto', 'Diz', 'Atos 2'] 
  },
  { 
    id: 'art_4', 
    name: 'Aline Barros', 
    genre: 'Gospel / Pop', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp', 
    hits: ['Ressuscita-me', 'Sonda-me', 'Vitória no Deserto'] 
  }
];

const FeaturedArtistsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useAuth();

  const handleArtistClick = (artistName: string) => {
    navigate(`/music?search=${encodeURIComponent(artistName)}`);
  };

  const handleSongClick = (e: React.MouseEvent, artistName: string, songName: string) => {
    e.stopPropagation();
    navigate(`/music?search=${encodeURIComponent(artistName + ' ' + songName)}`);
  };

  const handleFollowArtist = (e: React.MouseEvent, artist: Artist) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite({
      id: artist.id,
      title: artist.name,
      subtitle: artist.genre,
      image: artist.image,
      type: 'artist'
    });
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Editorial Header */}
      <div className="bg-black text-white py-20 md:py-32 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff6600]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-[#ff6600] mb-8">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">O Pulso da Praise FM Brasil</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-10">Artistas em<br />Destaque</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl font-bold uppercase tracking-[0.1em] leading-relaxed">
            Os sons que definem uma geração de fé. Sessões exclusivas e mergulhos profundos nos artistas por trás dos maiores hinos de adoração do Brasil.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-400 dark:text-gray-500 mb-12 border-l-4 border-[#ff6600] pl-4">Em Rotação Atual</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          {FEATURED_ARTISTS.map((artist) => {
            const followed = isFavorite(artist.id);
            return (
              <div 
                key={artist.id} 
                onClick={() => handleArtistClick(artist.name)}
                className="group relative aspect-[16/10] overflow-hidden bg-black cursor-pointer shadow-2xl"
              >
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <span className="text-[#ff6600] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                    {artist.genre}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#ff6600] transition-colors duration-300 mb-6">
                    {artist.name}
                  </h3>
                  
                  {/* Top Tracks selection - Visible on Hover */}
                  <div className="mt-4 overflow-hidden opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4 flex items-center">
                      <Music className="w-3 h-3 mr-2 text-[#ff6600]" /> Melhores Faixas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {artist.hits.map((hit, i) => (
                        <button 
                          key={i} 
                          onClick={(e) => handleSongClick(e, artist.name, hit)}
                          className="bg-white/10 text-white text-[9px] px-4 py-2 font-black uppercase tracking-widest backdrop-blur-md border border-white/10 hover:bg-[#ff6600] hover:border-[#ff6600] transition-all"
                        >
                          {hit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 flex flex-col space-y-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={(e) => handleFollowArtist(e, artist)}
                    className={`p-5 rounded-full shadow-2xl transition-all ${followed ? 'bg-white text-[#ff6600]' : 'bg-[#ff6600] text-white hover:bg-white hover:text-black'}`}
                  >
                    {followed ? <Check className="w-6 h-6 stroke-[3px]" /> : <Heart className="w-6 h-6 stroke-[3px]" />}
                  </button>
                  <div className="bg-black/50 text-white p-5 rounded-full shadow-2xl backdrop-blur-md border border-white/10">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submissions Section */}
        <div className="mt-32 bg-gray-50 dark:bg-[#0a0a0a] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between border border-gray-100 dark:border-white/5 transition-colors shadow-inner">
           <div className="flex flex-col md:flex-row items-center md:space-x-12 text-center md:text-left mb-10 md:mb-0">
              <div className="w-24 h-24 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black shadow-2xl mb-8 md:mb-0">
                <Users className="w-10 h-10" />
              </div>
              <div className="max-w-md">
                <h4 className="text-4xl font-black uppercase tracking-tighter dark:text-white leading-none mb-6 text-[#ff6600]">Novos Talentos</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-[0.1em] leading-relaxed">
                  Apoiamos a próxima geração. Se você cria música que inspira, queremos ouvir sua história e seu som para potencial inclusão em nossa programação.
                </p>
              </div>
           </div>
           <button 
             onClick={() => navigate('/feedback?type=music')}
             className="bg-[#ff6600] text-white px-12 py-7 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-xl active:scale-95 whitespace-nowrap flex items-center space-x-4"
           >
             <span>Envie Sua Faixa</span>
             <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtistsPage;