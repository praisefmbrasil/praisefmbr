// src/components/RecentlyPlayed.tsx
import type { FC } from 'react'; // apenas tipo
import { useState, useEffect } from 'react';
// import { Music } from 'lucide-react'; // descomente se quiser usar o ícone

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

const RecentlyPlayed: FC<RecentlyPlayedProps> = ({ tracks }) => {
  const [artworks, setArtworks] = useState<Record<string, string>>({});

  const displayedTracks = tracks.filter(t => t.isMusic !== false).slice(0, 4);

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
            const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
              track.artist + ' ' + track.title
            )}&media=music&limit=1`;

            const res = await fetch(itunesUrl);
            if (res.ok) {
              const data = await res.json();
              if (data.results?.length) {
                newArtworks[key] = data.results[0].artworkUrl100;
                changed = true;
              }
            }
          } catch {
            newArtworks[key] = `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;
            changed = true;
          }
        }
      }

      if (changed) setArtworks(newArtworks);
    };

    if (displayedTracks.length > 0) fetchArtworks();
  }, [tracks]);

  return (
    <section className="bg-white dark:bg-[#000] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight uppercase">
          Tocadas Recentemente
        </h2>

        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 dark:border-white/10 text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest">
            <div className="col-span-8 md:col-span-6">Música</div>
            <div className="col-span-4 md:col-span-6">Artista</div>
          </div>

          <div className="flex flex-col">
            {displayedTracks.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                A rádio está em modo de música contínua.
              </div>
            ) : (
              displayedTracks.map((track, idx) => {
                const key = `${track.artist}-${track.title}`;
                const artworkUrl =
                  artworks[key] || track.artwork || `https://picsum.photos/seed/${encodeURIComponent(key)}/100/100`;

                return (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div className="col-span-8 md:col-span-6 flex items-center space-x-4">
                      <span className="text-[13px] text-gray-400 w-5 font-normal">{idx + 1}.</span>
                      <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-200 dark:bg-gray-800 flex-shrink-0">
                        <img src={artworkUrl} alt="" className="w-full h-full object-cover transition-all" />
                      </div>
                      <span className="text-sm md:text-[15px] font-normal text-gray-900 dark:text-gray-100 truncate pr-4">
                        {toSentenceCase(track.title)}
                      </span>
                    </div>

                    <div className="col-span-4 md:col-span-6">
                      <span className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400 truncate block font-normal">
                        {toSentenceCase(track.artist)}
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
