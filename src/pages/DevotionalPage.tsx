import React from 'react';
import { Book } from 'lucide-react';
import DailyVerse from '../components/DailyVerse';

const DevotionalPage: React.FC = () => {
  return (
    <div className="bg-[#fafafa] dark:bg-[#0a0a0a] min-h-screen pb-20 transition-colors duration-300">
      
      {/* Header com Overlay */}
      <div className="bg-black text-white py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Fundo Devocional" 
          />
          {/* Gradiente para garantir leitura do texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        </div>
        
        <div className="relative z-10 px-4">
          <Book className="w-12 h-12 md:w-16 md:h-16 text-[#ff6600] mx-auto mb-8" />
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
            Devocional
          </h1>
          <p className="text-sm md:text-lg text-gray-400 font-medium max-w-2xl mx-auto uppercase tracking-[0.2em]">
            Fé em Reflexão. Seu Pão Diário Digital.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        <DailyVerse />
        
        {/* Espaço extra para o conteúdo do Versículo Diário respirar */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            Novas meditações todos os dias às 00:00h
          </p>
        </div>
      </div>

      {/* Seção de Podcasts/Áudio removida conforme solicitado */}
    </div>
  );
};

export default DevotionalPage;