import React, { useEffect, useState } from 'react';
import { Home, Music2, Calendar, Trophy, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'inicio' | 'musica' | 'programacao' | 'eventos') => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { id: 'inicio' as const, name: 'INÍCIO', icon: Home },
    { id: 'musica' as const, name: 'MÚSICA', icon: Music2 },
    { id: 'programacao' as const, name: 'PROGRAMAÇÃO', icon: Calendar },
    { id: 'eventos' as const, name: 'EVENTOS', icon: Trophy },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">

          {/* LOGO */}
          <h1
            onClick={() => onNavigate('inicio')}
            className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer"
          >
            PRAISE FM <span className="text-orange-500">BRASIL</span>
          </h1>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            {menuItems.map(({ id, name, icon: Icon }) => {
              const active = currentPage === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`flex items-center gap-2 text-[11px] font-bold tracking-widest transition ${
                    active
                      ? 'text-orange-500'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {name}
                </button>
              );
            })}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-[60] flex flex-col">
          <div className="h-20 px-4 flex items-center justify-between border-b border-white/10">
            <span className="text-lg font-black text-white">
              PRAISE FM <span className="text-orange-500">BRASIL</span>
            </span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={28} className="text-white" />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-6">
            {menuItems.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-4 text-sm font-bold tracking-widest ${
                  currentPage === id
                    ? 'text-orange-500'
                    : 'text-white/70'
                }`}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
