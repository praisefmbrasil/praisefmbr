import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ToggleTheme: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) 
             ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Mudar tema"
    >
      {theme === 'dark' ? (
        <Sun className="text-praise-accent" size={20} />
      ) : (
        <Moon className="text-gray-600" size={20} />
      )}
    </button>
  );
};