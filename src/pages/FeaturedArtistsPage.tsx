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
    id: 'art_br_1', 
    name: 'Fernandinho', 
    genre: 'Worship / Rock Cristão', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp', 
    hits: ['Faz Chover', 'Galileu', 'Uma Nova História'] 
  },
  { 
    id: 'art_br_2', 
    name: 'Gabriela Rocha', 
    genre: 'Worship / Adoração', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp', 
    hits: ['Lugar Secreto', 'Diz', 'Me Atraiu'] 
  },
  { 
    id: 'art_br_3', 
    name: 'Isaias Saad', 
    genre: 'Worship Moderno', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp', 
    hits: ['Oousado Amor', 'Enche-me', 'Bondade de Deus'] 
  },
  { 
    id: 'art_br_4', 
    name: 'Aline Barros', 
    genre: 'Gospel / Pop Cristão', 
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp', 
    hits: ['Ressuscita-me', 'Sonda-me, Usa-me', 'Vitória no Deserto'] 
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
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300 font-sans">
      {/* Header Editorial */}
      <div className="bg-black text-white py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff6600]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-[#ff6600] mb-6">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">O Pulso da Praise FM Brasil</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">Artistas<br />Em Destaque</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-normal uppercase tracking-tight leading-tight">
            Os sons que definem uma geração de fé. Sessões exclusivas e mergulhos profundos nos artistas por trás dos maiores hinos de adoração do país.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl dark:text-white uppercase font-black tracking-tight border-l-4 border-[#ff6600] pl-4">Em Alta na Rádio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 mt-8">
          {FEATURED_ARTISTS.map((artist) => {
            const followed = isFavorite(artist.id);
            return (
              <div 
                key={artist.id} 
                onClick={() => handleArtistClick(artist.name)}
                className="group relative aspect-square overflow-hidden bg-black cursor-pointer"
              >
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500">
                  <span className="text-[#ff6600] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                    {artist.genre}
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#ff6600] transition-colors duration-300">
                    {artist.name}
                  </h3>
                  
                  {/* Top 3 Songs */}
                  <div className="mt-4 h-0 group-hover:h-auto overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                    <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest mb-3 flex items-center">
                      <Music className="w-3 h-3 mr-2 text-[#ff6600]" /> Principais Faixas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {artist.hits.map((hit, i) => (
                        <button 
                          key={i} 
                          onClick={(e) => handleSongClick(e, artist.name, hit)}
                          className="bg-white/10 text-white text-[8px] px-2 py-1 uppercase tracking-widest backdrop-blur-md border border-white/10 hover:bg-[#ff6600] transition-all"
                        >
                          {hit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button 
                    onClick={(e) => handleFollowArtist(e, artist)}
                    className={`p-3 rounded-full transition-all ${followed ? 'bg-white text-[#ff6600]' : 'bg-[#ff6600] text-white'}`}
                  >
                    {followed ? <Check className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seção de Envio de Músicas */}
        <div className="mt-24 bg-gray-50 dark:bg-[#111] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between border border-gray-100 dark:border-white/5">
           <div className="flex flex-col md:flex-row items-center md:space-x-10 text-center md:text-left mb-10 md:mb-0">
             <div className="w-20 h-20 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black shadow-xl mb-6 md:mb-0">
               <Users className="w-10 h-10" />
             </div>
             <div className="max-w-md">
               <h4 className="text-3xl font-black uppercase tracking-tighter dark:text-white leading-none mb-4">Envie sua Música</h4>
               <p className="text-gray-500 text-sm font-normal uppercase tracking-tight leading-relaxed">
                 Apoiamos a próxima geração. Se você cria música que inspira, queremos ouvir sua história e seu som para potencial inclusão na nossa programação.
               </p>
             </div>
           </div>
           <button 
             onClick={() => navigate('/feedback?type=music')}
             className="bg-[#ff6600] text-white px-10 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all whitespace-nowrap flex items-center space-x-3"
           >
             <span>Enviar Minha Faixa</span>
             <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtistsPage;