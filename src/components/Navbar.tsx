import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Headphones,
  Music,
  Calendar,
  Users,
  Radio,
  Moon,
  Sun,
  LogIn,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'INÍCIO', icon: Home, path: '/' },
    { id: 'programs', label: 'PROGRAMAS', icon: Headphones, path: '/programs' },
    { id: 'music', label: 'MÚSICA', icon: Music, path: '/music' },
    { id: 'schedule', label: 'PROGRAMAÇÃO', icon: Calendar, path: '/schedule' },
    { id: 'presenters', label: 'APRESENTADORES', icon: Users, path: '/presenters' },
    { id: 'devotional', label: 'DEVOCIONAL', icon: Radio, path: '/devotional' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center h-[72px] gap-8">
          <Link to="/" className="flex items-center shrink-0">
            <span className="text-2xl font-black tracking-tight text-black dark:text-white">
              PRAISE FM <span className="text-[#ff6600]">BRA</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3 py-6 text-sm font-semibold transition-colors ${
                    active
                      ? 'text-black dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>

                  {active && (
                    <span className="absolute left-3 right-3 bottom-0 h-[2px] bg-[#ff6600]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-[#ff6600]" />
              )}
            </button>

            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 rounded-full bg-[#ff6600] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e65c00] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>ENTRAR</span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Abrir menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-gray-200 dark:border-white/10 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold ${
                    active
                      ? 'bg-[#ff6600] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="md:hidden mt-2 flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-[#ff6600]"
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