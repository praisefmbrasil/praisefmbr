import React from 'react';
import { ToggleTheme } from './common/ToggleTheme';
import { Radio } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo / Nome da Rádio */}
        <div className="flex items-center gap-2">
          <div className="bg-praise-accent p-1.5 rounded-lg">
            <Radio className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
            Praise<span className="text-praise-accent font-light italic">FM</span>
          </span>
        </div>

        {/* Lado Direito: Menu e Toggle */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-6 mr-6">
            <li>
              <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-praise-accent dark:hover:text-praise-accent transition-colors">
                Programação
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-praise-accent dark:hover:text-praise-accent transition-colors">
                Sobre
              </a>
            </li>
          </ul>
          
          {/* Botão de Tema (Sol/Lua) */}
          <ToggleTheme />
        </div>

      </div>
    </nav>
  );
};