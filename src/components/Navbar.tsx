import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'programs' | 'favorites'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-left">
        <Link to="/" className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</Link>
        <Link to="/programs" className={activeTab === 'programs' ? 'active' : ''} onClick={() => setActiveTab('programs')}>Programação</Link>
        <Link to="/favorites" className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>Favoritos</Link>
      </div>
      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
