import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DevotionalSection from './components/DevotionalSection';
import LivePlayerBar from './components/LivePlayerBar';
import type { Program, FavoriteItem } from './types';
import { programs, favoriteItems } from './constants';

const App: React.FC = () => {
  const liveProgram: Program | undefined = programs[0];

  return (
    <Router>
      <div className="app">
        <Navbar />
        <LivePlayerBar streamUrl="https://stream.zeno.fm/olisuxy9v3vtv" />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero favoriteItems={favoriteItems} liveProgram={liveProgram} />
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
