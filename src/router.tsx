import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Program } from './types';

// Importação dos seus componentes
import Hero from './components/Hero';
import RecentlyPlayed from './components/RecentlyPlayed';
import Playlist from './components/Playlist';
import ScheduleList from './components/ScheduleList';
import PresentersPage from './pages/PresentersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

// Interface para as props do Router, caso você as use
interface RouterProps {
  onListenClick: () => void;
  isPlaying: boolean;
  liveMetadata: any;
  trackHistory: any[];
  handleNavigateToProgram: (program: Program) => void;
}

const AppRouter: React.FC<RouterProps> = ({ 
  onListenClick, 
  isPlaying, 
  liveMetadata, 
  trackHistory,
  handleNavigateToProgram 
}) => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={
        <>
          <Hero 
            onListenClick={onListenClick} 
            isPlaying={isPlaying} 
            liveMetadata={liveMetadata} 
            onNavigateToProgram={handleNavigateToProgram} 
          />
          <RecentlyPlayed tracks={trackHistory} />
        </>
      } />

      {/* Schedule Page - ONDE ESTAVA O ERRO */}
      <Route 
        path="/schedule" 
        element={
          <ScheduleList 
            onNavigateToProgram={handleNavigateToProgram} 
            onBack={() => navigate('/')} // Função onBack adicionada para satisfazer a ScheduleListProps
          />
        } 
      />

      {/* Outras Rotas */}
      <Route path="/music" element={<Playlist />} />
      <Route path="/presenters" element={<PresentersPage onNavigateToProgram={handleNavigateToProgram} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Fallback para Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;