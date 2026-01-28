// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DevotionalSection from './components/DevotionalSection';
import LivePlayerBar from './components/LivePlayerBar';

// Tipos
import type { Program, FavoriteItem } from './types';

// Constantes
import { programs, favoriteItems } from './constants';

const App: React.FC = () => {
  // Simula o programa ao vivo (último programa ativo)
  const liveProgram: Program | undefined = programs[0]; // ou lógica real para "On Air"

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <Navbar />

        {/* Player ao vivo */}
        <LivePlayerBar streamUrl="https://stream.zeno.fm/olisuxy9v3vtv" />

        {/* Rotas */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero */}
                <Hero favoriteItems={favoriteItems} liveProgram={liveProgram} />

                {/* Seção de devocionais */}
                <DevotionalSection items={favoriteItems.filter(i => i.type === 'devotional')} />
              </>
            }
          />

          <Route
            path="/programs"
            element={<Hero favoriteItems={favoriteItems} liveProgram={liveProgram} />}
          />

          <Route
            path="/favorites"
            element={<DevotionalSection items={favoriteItems} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
