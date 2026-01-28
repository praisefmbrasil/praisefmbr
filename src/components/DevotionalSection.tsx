import React from "react";
import { useAuth, FavoriteItem } from "../contexts/AuthContext";
import { Heart } from "lucide-react";

export interface Devotional {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

interface DevotionalSectionProps {
  devotionals: Devotional[];
}

const DevotionalSection: React.FC<DevotionalSectionProps> = ({ devotionals }) => {
  const { toggleFavorite, isFavorite } = useAuth();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Devocionais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devotionals.map((dev) => {
          const favItem: FavoriteItem = {
            id: dev.id,
            type: "devotional",
            title: dev.title,
            subtitle: dev.subtitle,
            image: dev.image,
          };

          const favorite = isFavorite(favItem);

          return (
            <div key={dev.id} className="bg-white dark:bg-[#111] p-4 rounded shadow hover:shadow-lg transition">
              {dev.image && (
                <img src={dev.image} alt={dev.title} className="w-full h-40 object-cover rounded mb-4" />
              )}
              <h3 className="text-xl font-semibold">{dev.title}</h3>
              {dev.subtitle && <p className="text-gray-500 text-sm">{dev.subtitle}</p>}

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

export default DevotionalSection;
