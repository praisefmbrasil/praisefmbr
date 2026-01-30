import React, { useState, useEffect } from 'react';
import { Music, History } from 'lucide-react';

interface Track {
  artist: string;
  title: string;
  artwork?: string;
  playedAt?: Date;
  isMusic?: boolean;
}

interface RecentlyPlayedProps {
  tracks: Track[];
}

// Mapeamento de artistas do Cloudinary fornecidos 
const CLOUDINARY_ARTISTS: Record<string, string> = {
  'Fernandinho': 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
  'Isaias Saad': 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp',
  'Gabriela Rocha': 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
  'Aline Barros': 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp'
};

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks }) => {
  const [artworks, setArtworks] = useState<Record<string, string>>({});
  
  const displayedTracks = tracks
    .filter(track => track.isMusic !== false)
    .slice(0, 4);

  useEffect(() => {
    const fetchArtworks = async () => {
      const newArtworks = { ...artworks };
      let changed = false;

      for (const track of displayedTracks) {
        const key = `${track.artist}-${track.title}`;
        
        // 1. Verifica se é um dos artistas mapeados do Cloudinary 
        if (CLOUDINARY_ARTISTS[track.artist]) {
          newArtworks[key] = CLOUDINARY_ARTISTS[track.artist];
          changed = true;
          continue;
        }

        // 2. Busca no iTunes se não houver artwork prévia
        if (!newArtworks[key] && !track.artwork) {
          try {
            const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(track.artist + ' ' + track.title)}&media=music&limit=1`;
            const itunesResponse = await fetch(itunesUrl);
            
            if (itunesResponse.ok) {
              const itunesData = await itunesResponse.json();
              if (itunesData.results && itunesData.results.length > 0) {
                newArtworks[key] = itunesData.results[0].artworkUrl100.replace('100x100', '400x400');
                changed = true;
              }
            }
          } catch (error) {
            console.debug("Erro ao buscar capa no iTunes");
          }
        }
      }
      if (changed) setArtworks(newArtworks);
    };

    if (displayedTracks.length > 0) fetchArtworks();
  }, [tracks]);

  return (
    <section className="bg-white dark:bg-[#121212] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3 mb-10">
          <History className="w-6 h-6 text-[#ff6600]" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tighter uppercase">
            Tocadas Recentemente
          </h2>
        </div>
        
        <div className="w-full">
          {/* Header da Tabela */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-gray-900 dark:border-white/20 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            <div className="col-span-8 md:col-span-6">Música</div>
            <div className="col-span-4 md:col-span-6">Artista</div>
          </div>

          <div className="flex flex-col">
            {displayedTracks.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <Music className="w-12 h-12 text-gray-300 mb-4 opacity-20" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Nenhuma música encontrada no histórico.
                </p>
              </div>
            ) : (
              displayedTracks.map((track, idx) => {
                const key = `${track.artist}-${track.title}`;
                const artworkUrl = artworks[key] || track.artwork || `https://picsum.photos/seed/${encodeURIComponent(key)}/200/200`;
                
                return (
                  <div key={idx} className="grid grid-cols-12 gap-4 py-6 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all group cursor-default">
                    {/* Coluna Música */}
                    <div className="col-span-8 md:col-span-6 flex items-center space-x-5">
                      <span className="text-[11px] font-bold text-[#ff6600] w-6">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="w-14 h-14 bg-gray-200 dark:bg-[#1a1a1a] flex-shrink-0 relative overflow-hidden shadow-md">
                        <img 
                          src={artworkUrl} 
                          alt={track.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Music className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 truncate pr-4 uppercase tracking-tighter">
                        {track.title}
                      </span>
                    </div>

                    {/* Coluna Artista */}
                    <div className="col-span-4 md:col-span-6">
                      <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 truncate block font-medium uppercase tracking-tight">
                        {track.artist}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Call to action ou link para histórico completo (opcional) */}
        <div className="mt-10 flex justify-end">
           <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff6600] transition-colors">
              Ver histórico completo →
           </button>
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;