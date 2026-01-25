import React, { useState, useEffect, useRef } from 'react';

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
  const isMounted = useRef(true);

  const displayedTracks = tracks
    .filter(track => track.isMusic !== false)
    .slice(0, 4);

  useEffect(() => {
    isMounted.current = true;
    
    const fetchAllArtworks = async () => {
      const newArtworks = { ...artworks };
      let hasUpdates = false;

      // Filtra apenas as que precisam de busca para não repetir trabalho
      const tasks = displayedTracks.map(async (track) => {
        const key = `${track.artist}-${track.title}`;
        if (newArtworks[key] || track.artwork) return;

        try {
          const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(track.artist + ' ' + track.title)}&media=music&limit=1`;
          const response = await fetch(itunesUrl);
          
          if (response.ok) {
            const data = await response.json();
            if (data.results?.length > 0) {
              newArtworks[key] = data.results[0].artworkUrl100.replace('100x100bb', '200x200bb');
              hasUpdates = true;
              return;
            }
          }
        } catch (e) {
          console.debug("iTunes fetch failed for", key);
        }

        // Fallback se falhar ou não encontrar
        newArtworks[key] = `https://picsum.photos/seed/${encodeURIComponent(key)}/200/200`;
        hasUpdates = true;
      });

      await Promise.all(tasks);

      if (hasUpdates && isMounted.current) {
        setArtworks(newArtworks);
      }
    };

    if (displayedTracks.length > 0) fetchAllArtworks();

    return () => { isMounted.current = false; };
  }, [tracks]);

  return (
    <section className="bg-white dark:bg-[#121212] py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-8 border-b-2 border-gray-900 dark:border-white pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
            Tocadas Recentemente
          </h2>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff6600]">
            Histórico Live
          </span>
        </div>
        
        <div className="flex flex-col">
          {displayedTracks.length === 0 ? (
            <div className="py-20 text-center text-gray-400 font-medium uppercase tracking-widest text-xs">
              Nenhuma faixa encontrada no registro.
            </div>
          ) : (
            displayedTracks.map((track, idx) => {
              const key = `${track.artist}-${track.title}`;
              const artworkUrl = artworks[key] || track.artwork || `https://picsum.photos/seed/${encodeURIComponent(key)}/200/200`;
              
              return (
                <div key={idx} className="grid grid-cols-12 gap-4 py-6 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all group cursor-default">
                  
                  {/* Track Info */}
                  <div className="col-span-12 md:col-span-7 flex items-center space-x-6">
                    <span className="hidden md:block text-[11px] font-bold text-gray-300 dark:text-gray-600 w-4">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden relative shadow-sm">
                      <img 
                        src={artworkUrl} 
                        alt="" 
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                      />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate uppercase tracking-tight">
                        {track.title}
                      </h3>
                      <span className="text-sm md:hidden text-[#ff6600] font-bold uppercase tracking-widest mt-1">
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Artist Column */}
                  <div className="hidden md:block md:col-span-5">
                    <span className="text-lg text-gray-500 dark:text-gray-400 font-medium uppercase tracking-tight group-hover:text-[#ff6600] transition-colors">
                      {track.artist}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;