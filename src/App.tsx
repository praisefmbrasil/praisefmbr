import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// CONTEXTOS
import { AuthProvider } from './contexts/AuthContext';
import { LivePlayerProvider } from './contexts/LivePlayerContext';
// O ThemeProvider foi removido para evitar o erro de "Module not found" visto no terminal

// COMPONENTES
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import Playlist from './components/Playlist';
import Footer from './components/Footer';

// CORREÇÃO DA TELA BRANCA: Importação nomeada correta
import { LivePlayerBar } from './components/LivePlayerBar'; 

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            {/* onNavigateToProgram adicionado para satisfazer o TypeScript */}
            <Hero onNavigateToProgram={() => {}} />
            <Playlist />
          </main>
        } />
        {/* Adicione as rotas de Login/Favorites aqui apenas quando criar os arquivos em /pages */}
      </Routes>
      <Footer />
      <LivePlayerBar />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LivePlayerProvider>
        <Router>
          <AppContent />
        </Router>
      </LivePlayerProvider>
    </AuthProvider>
  );
}