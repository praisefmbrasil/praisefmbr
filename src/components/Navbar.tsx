import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Library,
  Settings,
  Ticket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface NavbarProps {
  activeTab: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.avatar_url) setAvatarUrl(data.avatar_url);
        });
    }
  }, [user]);

  const navItems = [
    { id: 'home', label: 'Início', path: '/' },
    { id: 'music', label: 'Música', path: '/music' },
    { id: 'schedule', label: 'Programação', path: '/schedule' },
    { id: 'events', label: 'Eventos', path: '/events' },
    { id: 'devotional', label: 'Devocional', path: '/devotional' }
  ];

  return (
    <header className="bg-white dark:bg-black border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Brasil_p1qfof.webp"
            alt="Praise FM Brasil"
            className={`h-7 transition ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
          />
        </div>

        {/* DESKTOP MENU — USA STYLE */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`relative text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors pb-1 ${
                  isActive
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#ff6600] rounded-full" />
                )}
              </button>
            );
          })}

          <button
            onClick={() => navigate('/my-sounds')}
            className={`relative text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors pb-1 ${
              activeTab === 'my-sounds'
                ? 'text-black dark:text-white'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Minhas Músicas
            {activeTab === 'my-sounds' && (
              <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-[#ff6600] rounded-full" />
            )}
          </button>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#ff6600]" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-black z-50 p-6">
          <nav className="flex flex-col space-y-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className="text-lg uppercase tracking-widest text-gray-600 dark:text-gray-300"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
