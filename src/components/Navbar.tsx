import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Music, Calendar, Users, Radio, Sun, Moon, LogIn } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const navItems = [
    { id: 'home',       label: 'INÍCIO',       icon: Home,     path: '/' },
    { id: 'music',      label: 'MÚSICA',       icon: Music,    path: '/music' },
    { id: 'schedule',   label: 'PROGRAMAÇÃO',  icon: Calendar, path: '/schedule' },
    { id: 'presenters', label: 'APRESENTADORES', icon: Users,  path: '/presenters' },
    { id: 'devotional', label: 'DEVOCIONAL',   icon: Radio,    path: '/devotional' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp"
              alt="Praise FM Brasil"
              className="h-10 w-auto dark:invert"
            />
          </Link>

          {/* Menu central */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-2 text-sm font-bold transition-colors ${
                  activeTab === item.id
                    ? 'text-[#ff6600]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#ff6600]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Direita */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'light'
                ? <Moon className="w-5 h-5" />
                : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>

            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#ff6600] text-white font-bold text-sm hover:bg-[#e65c00] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>ENTRAR</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;