import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Importação de Componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecentlyPlayed from './components/RecentlyPlayed';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';

// Importação de Páginas
import PresentersPage from './pages/PresentersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

// Importação de Tipos
import { Program } from './types';

interface RouterProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onListenClick: () => void;
  isPlaying: boolean;
  liveMetadata: any;
  trackHistory: any[];
  onNavigateToProgram: (program: Program) => void;
}

const AppRouter: React.FC<RouterProps> = ({ 
  theme, 
  onToggleTheme, 
  onListenClick, 
  isPlaying, 
  liveMetadata, 
  trackHistory,
  onNavigateToProgram 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define a aba ativa e se é uma vista de autenticação
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
  const isAuthView = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {/* Resolve o erro da Navbar passando as 3 props obrigatórias */}
      {!isAuthView && (
        <Navbar 
          activeTab={activeTab} 
          theme={theme} 
          onToggleTheme={onToggleTheme} 
        />
      )}

      <Routes>
        <Route path="/" element={
          <>
            <Hero 
              onListenClick={onListenClick} 
              isPlaying={isPlaying} 
              liveMetadata={liveMetadata} 
              onNavigateToProgram={onNavigateToProgram} 
            />
            <RecentlyPlayed tracks={trackHistory} />
          </>
        } />

        <Route path="/music" element={<Playlist />} />

        <Route path="/schedule" element={
          <ScheduleList 
            onNavigateToProgram={onNavigateToProgram} 
            onBack={() => navigate('/')} 
          />
        } />

        <Route path="/presenters" element={<PresentersPage onNavigateToProgram={onNavigateToProgram} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;