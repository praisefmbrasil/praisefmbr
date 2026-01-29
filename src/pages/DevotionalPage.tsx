import React from 'react';
import { Book } from 'lucide-react';
import DailyVerse from '../components/DailyVerse';

const DevotionalPage: React.FC = () => {
  return (
    <div className="bg-[#fafafa] dark:bg-[#0a0a0a] min-h-screen pb-20 transition-colors duration-300">
      
      <div className="bg-black text-white py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10">
          <Book className="w-16 h-16 text-[#ff6600] mx-auto mb-10" />
          <h1 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter mb-6 leading-none">Devocional</h1>
          <p className="text-xl md:text-2xl text-gray-400 font-normal max-w-2xl mx-auto uppercase tracking-tight">Fé Refletida. Seu Pão Diário Digital.</p>
        </div>
      </div>

      <DailyVerse />
    </div>
  );
};

export default DevotionalPage;