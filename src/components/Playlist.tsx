import React from 'react';
import { Music } from 'lucide-react';

const Playlist: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Título */}
      <div className="flex items-center gap-3 mb-6">
        <Music className="w-6 h-6 text-[#ff6600]" />
        <h1 className="text-2xl font-bold">Músicas</h1>
      </div>

      {/* Conteúdo */}
      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Em breve você poderá explorar todas as músicas tocadas na Praise FM 🎶
        </p>
      </div>
    </div>
  );
};

export default Playlist;
