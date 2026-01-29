// src/components/DevotionalSection.tsx
import React from "react";
import { Heart } from "lucide-react";
import { useAuth, FavoriteItem } from "../contexts/AuthContext";

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
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Devocionais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devotionals.map((item) => {
          const favItem: FavoriteItem = { ...item, type: "devotional" };
          const favorite = isFavorite(favItem);

          return (
            <div 
              key={item.id} 
              className="bg-white dark:bg-[#111] p-4 rounded shadow hover:shadow-lg transition"
            >
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-40 object-cover rounded mb-4" 
                />
              )}
              <h3 className="text-xl font-semibold dark:text-white">{item.title}</h3>
              {item.subtitle && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.subtitle}</p>
              )}

              <button
                className="mt-4 flex items-center gap-2 text-[#ff6600] hover:opacity-80 transition"
                onClick={() => toggleFavorite(favItem)}
              >
                <Heart className={favorite ? "fill-[#ff6600]" : ""} />
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
