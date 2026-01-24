import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// CONTEXTOS
import { AuthProvider } from './contexts/AuthContext';
import { LivePlayerProvider } from './contexts/LivePlayerContext';
// Removido o ThemeProvider temporariamente para evitar erro de "Module not found"

// COMPONENTES
// Usando importações nomeadas { } para garantir compatibilidade com seus arquivos
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import Playlist from './components/Playlist';
import Footer from './components/Footer';

// PÁGINAS (Comentadas até que os arquivos sejam criados na pasta /pages)
// import Login from './pages/Login';
// import Favorites from './pages/Favorites';

// CORREÇÃO DA TELA BRANCA: Importação nomeada conforme o erro do console
import { LivePlayerBar } from './components/LivePlayerBar'; 

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            {/* onNavigateToProgram adicionado para resolver o erro de propriedade obrigatória */}
            <Hero onNavigateToProgram={() => {}} />
            <Playlist />
          </main>
        } />
        {/* Adicione as rotas de Login e Favoritos aqui quando os arquivos estiverem prontos */}
      </Routes>
      <Footer />
      {/* O Player Bar fixo no rodapé */}
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