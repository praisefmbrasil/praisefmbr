import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useArtists } from '../hooks/useArtists'; // ✅ Corrigido: caminho correto
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ✅ Definição do tipo Artist (se não existir em outro lugar)
interface Artist {
  id: string;
  name: string;
  genre: string;
  image?: string;
  biography?: string;
}

const FeaturedArtistsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { artists, loading, error } = useArtists();
  const { isFavorite, toggleFavorite } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando artistas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar artistas</h2>
          <p className="text-gray-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigate={navigate} 
        currentPage={location.pathname} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Artistas em Destaque
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra os artistas cristãos que estão marcando presença na Praise FM Brasil
          </p>
        </div>

        {artists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎶</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Nenhum artista encontrado</h2>
            <p className="text-gray-600 mb-6">Tente novamente mais tarde ou verifique sua conexão com a internet</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Recarregar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artists.map((artist: Artist) => ( // ✅ Corrigido: definir tipo do artista
              <div 
                key={artist.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/artist/${artist.id}`)}
              >
                <div className="relative">
                  <img
                    src={artist.image || '/default-artist.jpg'}
                    alt={artist.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({
                        id: artist.id,
                        type: 'artist',
                        title: artist.name,
                        subtitle: artist.genre,
                        image: artist.image
                      });
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                      isFavorite(artist.id)
                        ? 'bg-yellow-400 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isFavorite(artist.id) ? '★' : '☆'}
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {artist.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{artist.genre}</p>
                  <p className="text-gray-500 text-sm">
                    {artist.biography?.substring(0, 100)}{artist.biography?.length > 100 ? '...' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FeaturedArtistsPage;