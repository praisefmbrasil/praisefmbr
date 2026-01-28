import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Heart } from "lucide-react";
import { FavoriteItem } from "../types";

export interface Track {
  id: string;
  title: string;
  artist: string;
  image?: string;
}

interface PlaylistProps {
  tracks: Track[];
}

const Playlist: React.FC<PlaylistProps> = ({ tracks }) => {
  const { toggleFavorite, isFavorite } = useAuth();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Playlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => {
          const favItem: FavoriteItem = {
            id: track.id,
            type: "track",
            title: track.title,
            subtitle: track.artist,
            image: track.image,
          };

          const favorite = isFavorite(favItem);

          return (
            <div key={track.id} className="bg-white dark:bg-[#111] p-4 rounded shadow hover:shadow-lg transition">
              {track.image && (
                <img src={track.image} alt={track.title} className="w-full h-40 object-cover rounded mb-4" />
              )}
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="text-gray-500 text-sm">{track.artist}</p>

              <button
                className={`mt-4 flex items-center gap-2 ${favorite ? "text-red-500" : "text-[#ff6600]"}`}
                onClick={() => toggleFavorite(favItem)}
              >
                <Heart fill={favorite ? "currentColor" : "none"} />
                {favorite ? "Remover dos favoritos" : "Favoritar"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Playlist;
