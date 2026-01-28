import React from "react";
import { FavoriteItem } from "../types/FavoriteItem";

const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: "1",
    title: "Madrugada com Cristo",
    subtitle: "Samuel Andrade",
    image: "/images/program-1.jpg",
    type: "program",
  },
  {
    id: "2",
    title: "Graça Abundante",
    subtitle: "Praise Music",
    image: "/images/track-1.jpg",
    type: "track",
  },
  {
    id: "3",
    title: "Devocional – Fé Diária",
    image: "/images/devotional.jpg",
    type: "devotional",
  },
];

const MySoundsPage: React.FC = () => {
  const [favorites, setFavorites] = React.useState<FavoriteItem[]>(MOCK_FAVORITES);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-black mb-10">My Sounds</h1>

      {favorites.length === 0 && (
        <p className="text-gray-400">You have no saved items yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(item => (
          <div
            key={item.id}
            className="bg-[#111] border border-white/10 rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-square object-cover"
            />

            <div className="p-5">
              <span className="text-[10px] uppercase tracking-widest text-orange-500">
                {item.type}
              </span>

              <h3 className="text-lg font-bold mt-2">{item.title}</h3>

              {item.subtitle && (
                <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
              )}

              <button
                onClick={() => removeFavorite(item.id)}
                className="mt-4 text-xs text-red-400 hover:text-red-500 uppercase"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySoundsPage;
