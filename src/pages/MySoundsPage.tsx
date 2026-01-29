import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { FavoriteItem } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MySoundsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, toggleFavorite } = useAuth();

  const removeFavorite = (item: FavoriteItem) => {
    toggleFavorite(item);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onNavigate={navigate} 
        currentPage={location.pathname} 
      />
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-10">My Sounds</h1>

        {favorites.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎵</div>
            <p className="text-gray-400 text-lg">You have no saved items yet.</p>
            <p className="text-gray-500 mt-2">Start exploring and save your favorite programs, tracks, and devotionals!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition"
            >
              <img
                src={item.image || '/images/placeholder.jpg'}
                alt={item.title}
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => navigate(`/${item.type}/${item.id}`)}
              />

              <div className="p-5">
                <span className="text-[10px] uppercase tracking-widest text-orange-500">
                  {item.type}
                </span>

                <h3 className="text-lg font-bold mt-2 cursor-pointer" onClick={() => navigate(`/${item.type}/${item.id}`)}>
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(item);
                  }}
                  className="mt-4 text-xs text-red-400 hover:text-red-500 uppercase font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MySoundsPage;