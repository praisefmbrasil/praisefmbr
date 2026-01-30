import React from 'react';
import { Book } from 'lucide-react';
import DailyVerse from '../components/DailyVerse';

const DevotionalPage: React.FC = () => {
  return (
    <div className="bg-[#fafafa] dark:bg-[#000] min-h-screen pb-32 transition-colors duration-300">
      
      {/* Header Estilizado - Estilo Editorial */}
      <div className="bg-black text-white py-24 md:py-40 text-center relative overflow-hidden border-b border-[#ff6600]/10">
        {/* Background com Overlay Dinâmico */}
        <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
          <img 
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover scale-105" 
            alt="Fé e Reflexão" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 px-4">
          <div className="w-12 h-1 bg-[#ff6600] mx-auto mb-10 rounded-full" />
          <Book className="w-12 h-12 text-[#ff6600] mx-auto mb-8 stroke-[1.5px]" />
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 leading-[0.85]">
            Devocional
          </h1>
          
          <p className="text-[10px] md:text-xs text-gray-400 font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-relaxed">
            Fé Refletida. O seu pão digital de cada dia.
          </p>
        </div>
      </div>

      {/* Seção do Versículo com Sobreposição (Negative Margin) */}
      <div className="max-w-4xl mx-auto -mt-16 md:-mt-24 relative z-20 px-4">
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-sm overflow-hidden">
          <DailyVerse />
        </div>
      </div>

      {/* Footer de Página */}
      <div className="mt-24 text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="h-px w-8 bg-gray-200 dark:bg-white/10" />
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-400">
            Praise FM Brasil
          </span>
          <div className="h-px w-8 bg-gray-200 dark:bg-white/10" />
        </div>
      </div>

      {/* Nota: Seção de Podcasts & Áudio removida conforme sua solicitação */}
    </div>
  );
};

export default DevotionalPage;