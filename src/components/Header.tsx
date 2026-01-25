import React, { useState } from 'react';
import { 
  Home, 
  Music2, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Heart, 
  Moon, 
  Sun, 
  User,
  Menu,
  X 
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems = [
    { name: 'INÍCIO', icon: <Home size={18} />, active: true },
    { name: 'MÚSICA', icon: <Music2 size={18} /> },
    { name: 'PROGRAMAÇÃO', icon: <Calendar size={18} /> },
    { name: 'EVENTOS', icon: <Trophy size={18} /> },
    { name: 'DEVOCIONAL', icon: <BookOpen size={18} /> },
    { name: 'MEUS SONS', icon: <Heart size={18} /> },
  ];

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO - Agora focado no Brasil conforme sua intenção */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-black tracking-tighter text-black dark:text-white">
              PRAISE FM <span className="text-orange-500">BRASIL</span>
            </h1>
          </div>

          {/* NAVEGAÇÃO DESKTOP - Exatamente como no site anterior */}
          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className={`flex items-center gap-2 text-xs font-bold tracking-widest transition-colors hover:text-orange-500 ${
                  item.active ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>

          {/* AÇÕES (TEMA E LOGIN) */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">
              <User size={18} />
              ENTRAR
            </button>
          </div>

          {/* BOTÃO MOBILE */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 dark:text-gray-400"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE EXPANSÍVEL */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="block px-3 py-4 text-base font-bold text-gray-400 hover:text-orange-500 border-b border-gray-900"
              >
                {item.name}
              </a>
            ))}
            <button className="w-full text-left px-3 py-4 text-orange-500 font-bold">
              ENTRAR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;