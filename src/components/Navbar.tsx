import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Music, Calendar, Users, Radio, Sun, Moon, LogIn, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'INÍCIO', icon: Home, path: '/' },
    { id: 'music', label: 'MÚSICA', icon: Music, path: '/music' },
    { id: 'schedule', label: 'PROGRAMAÇÃO', icon: Calendar, path: '/schedule' },
    { id: 'presenters', label: 'APRESENTADORES', icon: Users, path: '/presenters' },
    { id: 'devotional', label: 'DEVOCIONAL', icon: Radio, path: '/devotional' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b0b0b]/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp"
              alt="Praise FM Brasil"
              className="h-8 md:h-10 w-auto dark:invert"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-2 text-xs font-extrabold tracking-wide transition-colors ${
                  activeTab === item.id
                    ? 'text-[#ff6600]'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#ff6600]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'light'
                ? <Moon className="w-5 h-5 text-gray-900" />
                : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>

            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff6600] text-white font-bold text-sm hover:bg-[#e65c00] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>ENTRAR</span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
              aria-label="Abrir menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-gray-200 dark:border-white/10 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-2 py-3 rounded-xl text-sm font-bold ${
                  activeTab === item.id
                    ? 'bg-[#ff6600] text-white'
                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex sm:hidden items-center gap-3 px-2 py-3 rounded-xl text-sm font-bold text-[#ff6600]"
            >
              <LogIn className="w-5 h-5" />
              <span>ENTRAR</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;