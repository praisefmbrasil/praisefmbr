import React, { useState, useEffect } from 'react';
import { Music, Loader2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  
  const displayedTracks = tracks
    .filter(track => track.isMusic !== false)
    .slice(0, 4);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      const newArtworks = { ...artworks };
      let changed = false;

      for (const track of displayedTracks) {
        const key = `${track.artist}-${track.title}`;
        if (!newArtworks[key] && !track.artwork) {
          try {
            const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(track.artist + ' ' + track.title)}&media=music&limit=1`;
            const itunesResponse = await fetch(itunesUrl);
            
            let foundImage = '';
            
            if (itunesResponse.ok && itunesResponse.status !== 204) {
              const text = await itunesResponse.text();
              if (text && text.trim().length > 0) {
                try {
                  const itunesData = JSON.parse(text);
                  if (itunesData.results && itunesData.results.length > 0) {
                    foundImage = itunesData.results[0].artworkUrl100;
                  }
                } catch (parseErr) {
                  console.debug("Erro ao processar imagem do iTunes");
                }
              }
            }

            if (!foundImage) {
              foundImage = `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
            }

            newArtworks[key] = foundImage;
            changed = true;
          } catch (error) {
            newArtworks[key] = `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
            changed = true;
          }
        }
      }
      if (changed) setArtworks(newArtworks);
      setIsLoading(false);
    };

    if (displayedTracks.length > 0) fetchArtworks();
  }, [tracks]);

  return (
    <section className="bg-white dark:bg-[#121212] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Cabeçalho de Seção estilo Editorial */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ff6600] pl-6">
          <div>
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white tracking-tighter uppercase">Recentemente Tocadas</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">As últimas faixas na Praise FM</p>
          </div>
          <Music className="w-8 h-8 text-[#ff6600] opacity-20" />
        </div>
        
        <div className="w-full">
          {/* Header da Tabela */}
          <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-gray-900 dark:border-white text-[11px] font-bold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest">
            <div className="col-span-8 md:col-span-6">Música</div>
            <div className="col-span-4 md:col-span-6">Artista</div>
          </div>

          <div className="flex flex-col">
            {displayedTracks.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#ff6600] mb-4" />
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">
                  Buscando histórico...
                </p>
              </div>
            ) : (
              displayedTracks.map((track, idx) => {
                const key = `${track.artist}-${track.title}`;
                const artworkUrl = artworks[key] || track.artwork || `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
                
                return (
                  <div key={idx} className="grid grid-cols-12 gap-4 py-5 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
                    {/* Coluna da Música */}
                    <div className="col-span-8 md:col-span-6 flex items-center space-x-6">
                      <span className="text-[11px] text-gray-400 w-4 font-bold tabular-nums">0{idx + 1}</span>
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-gray-800 flex-shrink-0 shadow-sm overflow-hidden">
                        <img 
                          src={artworkUrl} 
                          alt="" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
                          }}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 truncate uppercase tracking-tight">
                          {track.title}
                        </span>
                        <span className="md:hidden text-xs text-[#ff6600] font-medium truncate">
                          {track.artist}
                        </span>
                      </div>
                    </div>

                    {/* Coluna do Artista (Desktop) */}
                    <div className="hidden md:col-span-6 md:block">
                      <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 truncate block font-normal uppercase tracking-tighter">
                        {track.artist}
                      </span>
                    </div>

                    {/* Mobile Artist Info (Fallback for grid) */}
                    <div className="col-span-4 md:hidden flex justify-end">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Rodapé da seção */}
        <div className="mt-8 flex justify-end">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6600] hover:text-gray-900 dark:hover:text-white transition-colors">
            Ver playlist completa →
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;