import React, { useEffect, useMemo, useState } from 'react';
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

  const displayedTracks = useMemo(
    () =>
      tracks
        .filter(track => track.isMusic !== false)
        .slice(0, 4),
    [tracks]
  );

  useEffect(() => {
    if (displayedTracks.length === 0) return;

    const fetchArtworks = async () => {
      const newArtworks: Record<string, string> = {};
      let changed = false;

      for (const track of displayedTracks) {
        const key = `${track.artist}-${track.title}`;

        if (artworks[key] || track.artwork) continue;

        try {
          const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
            `${track.artist} ${track.title}`
          )}&media=music&limit=1`;

          const response = await fetch(itunesUrl);
          let image = '';

          if (response.ok) {
            const text = await response.text();
            if (text) {
              const data = JSON.parse(text);
              image = data?.results?.[0]?.artworkUrl100 || '';
            }
          }

          if (!image) {
            image = `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
          }

          newArtworks[key] = image;
          changed = true;
        } catch {
          newArtworks[key] = `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
          changed = true;
        }
      }

      if (changed) {
        setArtworks(prev => ({ ...prev, ...newArtworks }));
      }
    };

    fetchArtworks();
  }, [displayedTracks, artworks]);

  return (
    <section className="bg-white dark:bg-[#121212] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ff6600] pl-6">
          <div>
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white tracking-tighter uppercase">
              Recentemente Tocadas
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              As últimas faixas na Praise FM
            </p>
          </div>
          <Music className="w-8 h-8 text-[#ff6600] opacity-20" />
        </div>

        {/* Tabela */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-gray-900 dark:border-white text-[11px] font-bold uppercase tracking-widest mb-2">
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
              const artwork =
                artworks[key] ||
                track.artwork ||
                `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;

              return (
                <div
                  key={key}
                  className="grid grid-cols-12 gap-4 py-5 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
                >
                  <div className="col-span-8 md:col-span-6 flex items-center space-x-6">
                    <span className="text-[11px] text-gray-400 w-4 font-bold tabular-nums">
                      0{idx + 1}
                    </span>

                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-sm">
                      <img
                        src={artwork}
                        alt=""
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={e => {
                          (e.target as HTMLImageElement).src =
                            `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 truncate uppercase">
                        {track.title}
                      </span>
                      <span className="md:hidden text-xs text-[#ff6600] truncate">
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-6">
                    <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 uppercase truncate block">
                      {track.artist}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

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
