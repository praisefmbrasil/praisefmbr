import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';

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

// ✅ Mapa de artistas gospel brasileiros → imagem no Cloudinary
const ARTIST_ARTWORK_MAP: Record<string, string> = {
  "Aline Barros": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp",
  "Gabriela Rocha": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp",
  "Fernandinho": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp",
  "Isaias Saad": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp",
  "Ana Paula Valadão": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ana_Paula_Valad%C3%A3o_qkqjvz.webp",
  "Davi Sacer": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Davi_Sacer_gxgkqh.webp",
  "Ludmila Ferber": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ludmila_Ferber_vy8vqj.webp",
  "Paulo César Baruk": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Paulo_C%C3%A9sar_Baruk_wnrj1h.webp",
  "Mariana Valadão": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Mariana_Valad%C3%A3o_yd1qwu.webp",
  "Anderson Freire": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Anderson_Freire_jkqkxn.webp",
  "Cassiane": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Cassiane_zcplqx.webp",
  "Ton Carfi": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ton_Carfi_r1xqhk.webp",
  // Adicione mais conforme necessário
};

// ✅ Fallback genérico (logo Praise FM)
const FALLBACK_ARTWORK = "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp";

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks }) => {
  const [artworks, setArtworks] = useState<Record<string, string>>({});
  
  const displayedTracks = tracks
    .filter(track => track.isMusic !== false)
    .slice(0, 4);

  useEffect(() => {
    const resolveArtworks = () => {
      const newArtworks: Record<string, string> = {};
      let changed = false;

      for (const track of displayedTracks) {
        const key = `${track.artist}-${track.title}`;
        if (!artworks[key]) {
          // ✅ Prioridade 1: artwork já fornecido
          if (track.artwork) {
            newArtworks[key] = track.artwork;
          }
          // ✅ Prioridade 2: mapa local de artistas
          else if (ARTIST_ARTWORK_MAP[track.artist]) {
            newArtworks[key] = ARTIST_ARTWORK_MAP[track.artist];
          }
          // ✅ Prioridade 3: fallback genérico
          else {
            newArtworks[key] = FALLBACK_ARTWORK;
          }
          changed = true;
        }
      }

      if (changed) {
        setArtworks(prev => ({ ...prev, ...newArtworks }));
      }
    };

    if (displayedTracks.length > 0) {
      resolveArtworks();
    }
  }, [tracks, artworks]);

  return (
    <section className="bg-white dark:bg-[#000] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-regular text-gray-900 dark:text-white mb-6 tracking-tight">Músicas Recentes</h2>
        
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 dark:border-white/10 text-sm font-regular text-gray-900 dark:text-gray-100 mb-1">
            <div className="col-span-8 md:col-span-6">Música</div>
            <div className="col-span-4 md:col-span-6">Artista</div>
          </div>

          <div className="flex flex-col">
            {displayedTracks.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm border-b border-gray-100 dark:border-white/5">
                Nenhuma música recente encontrada.
              </div>
            ) : (
              displayedTracks.map((track, idx) => {
                const key = `${track.artist}-${track.title}`;
                const artworkUrl = artworks[key] || FALLBACK_ARTWORK;
                
                return (
                  <div 
                    key={idx} 
                    className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div className="col-span-8 md:col-span-6 flex items-center space-x-4">
                      <span className="text-[13px] text-gray-500 w-5 font-normal">{idx + 1}.</span>
                      <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-200 dark:bg-gray-800 flex-shrink-0">
                        <img 
                          src={artworkUrl} 
                          alt={`${track.title} - ${track.artist}`} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_ARTWORK;
                          }}
                        />
                      </div>
                      <span className="text-sm md:text-[15px] font-normal text-gray-900 dark:text-gray-100 truncate pr-4">
                        {track.title}
                      </span>
                    </div>
                    <div className="col-span-4 md:col-span-6">
                      <span className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400 truncate block font-normal">
                        {track.artist}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;