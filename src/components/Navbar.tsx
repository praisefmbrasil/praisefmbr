import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO MENOR */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp" 
            alt="Praise FM Logo" 
            className="h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* LINKS DESKTOP (Sem Bold) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-praise-accent transition-colors">
            Programação
          </Link>
          <button className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-praise-accent transition-colors">
            Sobre
          </button>
        </div>

        {/* MENU HAMBÚRGUER (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE DROP DOWN */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-white/5 px-4 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
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