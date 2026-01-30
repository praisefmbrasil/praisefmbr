import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Music, Heart, Trash2, Play, Radio } from 'lucide-react';

const MySoundsPage: React.FC = () => {
  const { favorites, toggleFavorite, loading } = useAuth();

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-[#080808]">
      <div className="w-12 h-12 border-[6px] border-gray-100 border-t-[#ff6600] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#080808] min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header da Biblioteca */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-black dark:border-white pb-8">
          <div>
            <div className="flex items-center space-x-3 text-[#ff6600] mb-4 font-black uppercase tracking-[0.3em] text-[10px]">
              <Heart className="w-4 h-4 fill-current" />
              <span>Biblioteca Particular</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none italic">Meus Sons</h1>
          </div>
          <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 mt-6 md:mt-0">
            <p className="font-black uppercase tracking-widest text-[10px]">
              {favorites.length} {favorites.length === 1 ? 'Item Salvo' : 'Itens Salvos'}
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          /* Estado Vazio */
          <div className="text-center py-40 bg-gray-50 dark:bg-[#111] border-2 border-dashed border-gray-200 dark:border-white/10">
            <Music className="w-24 h-24 text-gray-200 dark:text-white/5 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-gray-300 dark:text-gray-700 uppercase tracking-tighter">Sua biblioteca está vazia</h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-4 max-w-sm mx-auto leading-relaxed">
              Clique no coração em suas músicas e devocionais favoritos para salvá-los aqui.
            </p>
          </div>
        ) : (
          /* Grid de Favoritos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {favorites.map((fav) => (
              <div key={fav.id} className="group relative bg-white dark:bg-[#0f0f0f] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img 
                    src={fav.image} 
                    alt={fav.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Overlay de Play */}
                  <div className="absolute inset-0 bg-[#ff6600]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button className="w-20 h-20 bg-white text-black flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <Play className="w-10 h-10 fill-current" />
                    </button>
                  </div>

                  {/* Tag de Tipo */}
                  <div className="absolute top-0 left-0">
                    <span className="bg-[#ff6600] text-white text-[9px] font-black uppercase px-4 py-2 flex items-center space-x-2">
                      {fav.item_type === 'devotional' ? <Radio className="w-3 h-3" /> : <Music className="w-3 h-3" />}
                      <span>{fav.item_type === 'devotional' ? 'Devocional' : 'Música'}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none mb-2 group-hover:text-[#ff6600] transition-colors line-clamp-2">
                    {fav.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[9px] mb-6">
                    {fav.subtitle}
                  </p>
                  
                  <button 
                    onClick={() => toggleFavorite({ id: fav.item_id })}
                    className="flex items-center space-x-3 text-[10px] font-black text-gray-400 hover:text-red-600 uppercase tracking-[0.2em] transition-colors pt-6 border-t border-gray-100 dark:border-white/10 w-full group/remove"
                  >
                    <Trash2 className="w-4 h-4 group-hover/remove:shake" />
                    <span>Remover da Biblioteca</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer de Suporte */}
      <div className="mt-20 py-12 bg-gray-100 dark:bg-[#050505] text-center">
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.5em]">
          Praise FM Brasil — Sua adoração em qualquer lugar
        </p>
      </div>
    </div>
  );
};

export default MySoundsPage;