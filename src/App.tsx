import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import ProgramsPage from './pages/ProgramsPage';
import DevotionalPage from './pages/DevotionalPage';
import FeaturedArtistsPage from './pages/FeaturedArtistsPage';
import PresentersPage from './pages/PresentersPage';
import MySoundsPage from './pages/MySoundsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Página de erro 404
const NotFoundPage = () => (
  <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Página não encontrada</p>
      <button 
        onClick={() => window.history.back()}
        className="bg-[#ff6600] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black transition"
      >
        Voltar
      </button>
    </div>
  </div>
);

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6600]"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
          <Header 
            onNavigate={navigate} 
            currentPage={location.pathname} 
          />
          
          <main className="pt-20">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Rotas protegidas */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/programs" 
                element={
                  <ProtectedRoute>
                    <ProgramsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/devotionals" 
                element={
                  <ProtectedRoute>
                    <DevotionalPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/artists" 
                element={
                  <ProtectedRoute>
                    <FeaturedArtistsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/presenters" 
                element={
                  <ProtectedRoute>
                    <PresentersPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/my-sounds" 
                element={
                  <ProtectedRoute>
                    <MySoundsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;