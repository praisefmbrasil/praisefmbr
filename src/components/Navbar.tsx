import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO REDUZIDO */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp" 
            alt="Praise FM Logo" 
            className="h-6 md:h-7 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* LINKS DESKTOP (Sem negrito) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-praise-accent transition-colors">
            Programação
          </Link>
          <button className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-praise-accent transition-colors">
            Sobre
          </button>
        </div>

        {/* BOTÃO HAMBÚRGUER MOBILE */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 dark:text-gray-300">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE DROP DOWN */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-white/5 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-600 dark:text-gray-300">
            Programação
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-600 dark:text-gray-300 text-left">
            Sobre
          </button>
        </div>
      )}
    </nav>
  );
}