import React, { useState } from 'react';
import { Home, Music2, Calendar, Trophy, Menu, X } from 'lucide-react';

// ✅ Define as propriedades que o Header aceita para navegar
interface HeaderProps {
  onNavigate: (page: 'inicio' | 'musica' | 'programacao' | 'eventos') => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'inicio' as const, name: 'INÍCIO', icon: <Home size={18} /> },
    { id: 'musica' as const, name: 'MÚSICA', icon: <Music2 size={18} /> },
    { id: 'programacao' as const, name: 'PROGRAMAÇÃO', icon: <Calendar size={18} /> },
    { id: 'eventos' as const, name: 'EVENTOS', icon: <Trophy size={18} /> },
  ];

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter text-white">
          PRAISE FM <span className="text-orange-500">BRASIL</span>
        </h1>

        <nav className="hidden lg:flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 text-xs font-bold tracking-widest transition-colors ${
                currentPage === item.id ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;