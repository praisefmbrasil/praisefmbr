import React, { useState, useEffect } from 'react';
import { Home, Music, Radio, Menu, Calendar, Sun, Moon, X, User as UserIcon, Library, Settings, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  activeTab: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, theme, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchAvatar = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      };
      fetchAvatar();
    }
  }, [user]);

  // Itens de navegação traduzidos
  const navItems = [
    { id: 'home', label: 'Início', icon: Home, path: '/' },
    { id: 'music', label: 'Música', icon: Music, path: '/music' },
    { id: 'schedule', label: 'Programação', icon: Calendar, path: '/schedule' },
    { id: 'events', label: 'Eventos', icon: Ticket, path: '/events' },
    { id: 'devotional', label: 'Devocional', icon: Radio, path: '/devotional' },
  ];

  return (
    <header className="bg-white dark:bg-[#0b0b0b] text-black dark:text-white border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center h-full space-x-12">
        <div className="flex items-center cursor-pointer h-full" onClick={() => navigate('/')}>
          <img 
            // Logo atualizada para Praise FM Brasil
            src="https://res.cloudinary.com/dtecypmsh/image/upload/v1766869698/SVGBRASIL_lduiui.webp"
            alt="Praise FM Brasil Logo"
            className={`h-7 w-auto object-contain transition-all ${theme === 'dark' ? 'brightness-0 invert' : ''}`} 
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8 h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 text-[15px] font-medium transition-all h-full border-b-2 px-1 uppercase tracking-tighter ${isActive
                    ? 'text-black dark:text-white border-[#ff6600]'
                    : 'text-gray-500 border-transparent hover:text-black dark:hover:text-white'}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black dark:text-white' : 'text-gray-400'}`} strokeWidth={1.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => navigate('/my-sounds')}
            className={`flex items-center space-x-2 text-[15px] font-medium transition-all h-full border-b-2 px-1 uppercase tracking-tighter ${activeTab === 'my-sounds' ? 'text-black dark:text-white border-[#ff6600]' : 'text-gray-500 border-transparent hover:text-black dark:hover:text-white'}`}
          >
            <Library className="w-4 h-4" strokeWidth={1.5} />
            <span>Meus Sons</span>
          </button>
        </nav>
      </div>

      <div className="flex items-center">
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400 mr-8 md:mr-12"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#ff6600]" />}
        </button>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-3 group"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10 flex items-center justify-center border border-transparent group-hover:border-[#ff6600] transition-all">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Usuário" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white">Perfil</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block text-[10px] font-medium uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Entrar
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-gray-800 dark:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-black z-40 md:hidden p-6 animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-4 p-4 rounded-xl text-lg font-medium text-gray-600 dark:text-gray-400 uppercase tracking-tighter"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
            <button 
              onClick={() => { navigate('/my-sounds'); setIsMobileMenuOpen(false); }}
              className="flex items-center space-x-4 p-4 rounded-xl text-lg font-medium text-gray-600 dark:text-gray-400 uppercase tracking-tighter"
            >
              <Library className="w-5 h-5" />
              <span>Meus Sons</span>
            </button>
            {user ? (
              <button 
                onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-4 p-4 rounded-xl text-lg font-medium text-[#ff6600] uppercase tracking-tighter border-t border-gray-100 dark:border-white/5 mt-4 pt-8"
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </button>
            ) : (
              <button 
                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-4 p-4 rounded-xl text-lg font-medium text-[#ff6600] uppercase tracking-tighter border-t border-gray-100 dark:border-white/5 mt-4 pt-8"
              >
                <UserIcon className="w-5 h-5" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;