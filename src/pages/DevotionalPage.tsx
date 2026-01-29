import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { FavoriteItem } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DevotionalPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useAuth(); // ✅ Removido 'favorites' (não usado)

  const devotionalItems: FavoriteItem[] = [
    {
      id: '1',
      type: 'devotional',
      title: 'Deus é Fiel',
      subtitle: 'Confie no Senhor de todo o seu coração',
      image: '/devotional1.jpg'
    },
    {
      id: '2',
      type: 'devotional', 
      title: 'Paz em Cristo',
      subtitle: 'Deixo-vos a paz, a minha paz vos dou',
      image: '/devotional2.jpg'
    }
  ];

  const handleToggleFavorite = (item: FavoriteItem) => {
    toggleFavorite(item);
  };

  const isItemFavorite = (item: FavoriteItem): boolean => {
    return isFavorite(item.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ✅ CORREÇÃO: currentPage em vez de currentPath */}
      <Header 
        onNavigate={navigate} 
        currentPage={location.pathname} // ✅ Corrigido
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Devocionais Diários
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Momentos de reflexão e conexão com Deus através de mensagens inspiradoras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {devotionalItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/devocional/${item.id}`)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(item);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isItemFavorite(item)
                      ? 'bg-yellow-400 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isItemFavorite(item) ? '★' : '☆'}
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevotionalPage;