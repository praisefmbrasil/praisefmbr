import React, { useState, useEffect } from 'react';
import { Music, Clock } from 'lucide-react';

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

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ tracks }) => {
  const [artworks, setArtworks] = useState<Record<string, string>>({});
  
  const displayedTracks = tracks
    .filter(track => track.isMusic !== false)
    .slice(0, 4);

  const toSentenceCase = (text: string) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      const newArtworks = { ...artworks };
      let changed = false;

      for (const track of displayedTracks) {
        const key = `${track.artist}-${track.title}`;
        if (!newArtworks[key] && !track.artwork) {
          try {
            const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(track.artist + ' ' + track.title)}&media=music&limit=1`;
            const itunesResponse = await fetch(itunesUrl);
            
            if (itunesResponse.ok) {
              const data = await itunesResponse.json();
              if (data.results && data.results.length > 0) {
                // Trocamos artworkUrl100 por uma versão maior (200x200) para melhor qualidade
                newArtworks[key] = data.results[0].artworkUrl100.replace('100x100', '200x200');
                changed = true;
              }
            }
          } catch (error) {
            newArtworks[key] = `https://picsum.photos/seed/${encodeURIComponent(key)}/200/200`;
            changed = true;
          }
        }
      }
      if (changed) setArtworks(newArtworks);
    };

    if (displayedTracks.length > 0) fetchArtworks();
  }, [tracks]);

  return (
    <section className="bg-white dark:bg-[#000] py-16 transition-colors duration-300 antialiased">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white tracking-tighter uppercase">
            Tocadas Recentemente
          </h2>
          <div className="h-[1px] flex-grow mx-6 bg-gray-100 dark:bg-white/5 hidden md:block"></div>
          <button className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#ff6600] hover:text-black dark:hover:text-white transition-colors">
            Ver Histórico Completo
          </button>
        </div>
        
        <div className="w-full">
          {/* Header da Tabela */}
          <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-100 dark:border-white/10 text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">
            <div className="col-span-8 md:col-span-7">Título / Álbum</div>
            <div className="col-span-4 md:col-span-5 text-right md:text-left">Artista</div>
          </div>

          <div className="flex flex-col">
            {displayedTracks.length === 0 ? (
              <div className="py-20 text-center">
                <Music className="w-8 h-8 text-gray-200 dark:text-white/10 mx-auto mb-4" />
                <p className="text-gray-400 text-[11px] uppercase tracking-widest font-light">
                  Carregando trilha sonora...
                </p>
              </div>
            ) : (
              displayedTracks.map((track, idx) => {
                const key = `${track.artist}-${track.title}`;
                const artworkUrl = artworks[key] || track.artwork || `https://picsum.photos/seed/${encodeURIComponent(key)}/200/200`;
                
                return (
                  <div key={idx} className="grid grid-cols-12 gap-4 py-5 border-b border-gray-50 dark:border-white/5 items-center group">
                    {/* Coluna Título */}
                    <div className="col-span-8 md:col-span-7 flex items-center space-x-6">
                      <span className="hidden md:block text-[11px] text-gray-300 dark:text-gray-600 font-medium w-4">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gray-100 dark:bg-white/5 flex-shrink-0 overflow-hidden rounded-sm">
                        <img 
                          src={artworkUrl} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[15px] md:text-lg font-medium text-gray-900 dark:text-gray-100 truncate tracking-tight">
                          {toSentenceCase(track.title)}
                        </span>
                        <div className="flex items-center space-x-2 text-[10px] text-gray-400 uppercase tracking-widest md:hidden">
                           <span>{toSentenceCase(track.artist)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Coluna Artista (Desktop) */}
                    <div className="hidden md:block md:col-span-5">
                      <span className="text-[15px] text-gray-500 dark:text-gray-400 font-light tracking-wide">
                        {toSentenceCase(track.artist)}
                      </span>
                    </div>

                    {/* Coluna Tempo (Opcional - Estilo BBC) */}
                    <div className="col-span-4 md:hidden flex justify-end">
                       <Clock className="w-3.5 h-3.5 text-gray-300 dark:text-gray-700" />
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