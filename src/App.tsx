import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

/* Layout */
import Header from './components/Header';
import Footer from './components/Footer';

/* Pages */
import HomePage from './pages/HomePage';
import ListenLivePage from './pages/ListenLivePage';
import SchedulePage from './pages/SchedulePage';
import PresentersPage from './pages/PresentersPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import NewReleasesPage from './pages/NewReleasesPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/* =========================
   APP
========================= */

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white flex flex-col">

          {/* Header fixo (BBC-style) */}
          <Header />

          {/* Conteúdo principal */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listen" element={<ListenLivePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/presenters" element={<PresentersPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/program/:id" element={<ProgramDetailPage />} />
              <Route path="/new-releases" element={<NewReleasesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>

          {/* Footer editorial */}
          <Footer />

        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
