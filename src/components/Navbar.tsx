import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO DA RÁDIO */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp" 
            alt="Praise FM Logo" 
            className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* LINKS DE NAVEGAÇÃO */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-praise-accent transition-colors">
            Programação
          </Link>
          <button className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-praise-accent transition-colors">
            Sobre
          </button>
        </div>

      </div>
    </nav>
  );
}