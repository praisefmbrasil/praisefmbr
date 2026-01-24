import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LivePlayerProvider } from './contexts/LivePlayerContext';
import { ThemeProvider } from './contexts/ThemeContext';

// COMPONENTES
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Playlist from './components/Playlist';
import Podcasts from './components/Podcasts';
import Footer from './components/Footer';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

// CORREÇÃO DA TELA BRANCA: Importação nomeada conforme o seu arquivo
import { LivePlayerBar } from './components/LivePlayerBar'; 

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Playlist />
            <Podcasts />
          </main>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
      {/* O Player Bar fica fixo no rodapé em todas as páginas */}
      <LivePlayerBar />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LivePlayerProvider>
          <Router>
            <AppContent />
          </Router>
        </LivePlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}