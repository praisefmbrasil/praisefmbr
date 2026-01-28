import React from "react";
import { useAuth, FavoriteItem } from "../contexts/AuthContext";
import { Heart } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  image?: string;
}

interface FeaturedArtistsPageProps {
  artists: Artist[];
}

const FeaturedArtistsPage: React.FC<FeaturedArtistsPageProps> = ({ artists }) => {
  const { toggleFavorite, isFavorite } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Artistas em Destaque</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => {
          const favItem: FavoriteItem = {
            id: artist.id,
            type: "artist",
            title: artist.name,
            image: artist.image,
          };

          const favorite = isFavorite(favItem);

          return (
            <div key={artist.id} className="bg-white dark:bg-[#111] p-4 rounded shadow hover:shadow-lg transition">
              {artist.image && (
                <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <h2 className="text-2xl font-semibold">{artist.name}</h2>

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
    </div>
  );
};

export default FeaturedArtistsPage;
