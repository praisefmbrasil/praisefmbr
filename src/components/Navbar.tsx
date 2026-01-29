import React, { useState, useEffect } from 'react';
import { Home, Music, Radio, Menu, Calendar, Sun, Moon, X, User as UserIcon, Library, Settings, Ticket } from 'lucide-react';
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

  const navItems = [
    { id: 'home', label: 'Início', icon: Home, path: '/' },
    { id: 'music', label: 'Música', icon: Music, path: '/music' },
    { id: 'schedule', label: 'Grade', icon: Calendar, path: '/schedule' },
    { id: 'events', label: 'Eventos', icon: Ticket, path: '/events' },
    { id: 'devotional', label: 'Devocional', icon: Radio, path: '/devotional' },
  ];

  const LOGO_URL = 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp';

  return (
    <header className="bg-white dark:bg-[#000] border-b border-gray-100 dark:border-white/5 sticky top-0 z-50 transition-colors duration-300 antialiased font-sans">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center h-full space-x-12">
          <div className="flex items-center cursor-pointer h-full" onClick={() => navigate('/')}>
            <img 
              src={LOGO_URL} 
              alt="Praise FM Brasil" 
              className={`h-6 w-auto object-contain transition-all duration-500 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 h-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 text-[13px] font-medium transition-all h-full border-b-2 px-1 uppercase tracking-tight ${
                    isActive 
                      ? 'text-black dark:text-white border-[#ff6600]' 
                      : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff6600]' : ''}`} strokeWidth={2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button 
              onClick={() => navigate('/my-sounds')}
              className={`flex items-center space-x-2 text-[13px] font-medium transition-all h-full border-b-2 px-1 uppercase tracking-tight ${
                activeTab === 'my-sounds' ? 'text-black dark:text-white border-[#ff6600]' : 'text-gray-400 border-transparent hover:text-black dark:hover:text-white'
              }`}
            >
              <Library className={`w-3.5 h-3.5 ${activeTab === 'my-sounds' ? 'text-[#ff6600]' : ''}`} strokeWidth={2} />
              <span>Meus Sons</span>
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-400"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#ff6600]" />}
          </button>

          <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10 hidden md:block mx-2"></div>

          {/* User Section */}
          <div className="flex items-center">
            {user ? (
              <button 
                onClick={() => navigate('/profile')} 
                className="flex items-center space-x-3 group"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-white/10 flex items-center justify-center border border-transparent group-hover:border-[#ff6600] transition-all">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <span className="hidden md:block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 group-hover:text-black dark:group-hover:text-white">Conta</span>
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="hidden md:block text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500 hover:text-[#ff6600] transition-colors"
              >
                Entrar
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 ml-4 lg:hidden text-gray-800 dark:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-black z-40 lg:hidden p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-between p-4 rounded-lg text-lg font-medium text-gray-900 dark:text-white uppercase tracking-tighter hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="flex items-center space-x-4">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span>{item.label}</span>
                </div>
                <Settings className="w-4 h-4 opacity-20" />
              </button>
            ))}
            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/5">
              <button 
                onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-4 p-4 w-full text-lg font-medium text-[#ff6600] uppercase tracking-tighter"
              >
                <UserIcon className="w-5 h-5" />
                <span>Minha Conta</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;