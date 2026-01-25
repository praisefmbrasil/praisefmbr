import React from 'react';
import { Play, Pause, Calendar } from 'lucide-react';

// ✅ Interface atualizada para resolver o Erro 2322
interface HeroProps {
  onPlayClick: () => void;
  isPlaying: boolean;
  currentTrack: string;
  onViewSchedule: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  onPlayClick, 
  isPlaying, 
  currentTrack, 
  onViewSchedule 
}) => {
  return (
    <div className="relative h-[80vh] flex items-center px-8 overflow-hidden bg-black">
      {/* Background com Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80" 
          alt="Studio Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Ao Vivo: Praise FM Brasil</span>
        </div>

        <h1 className="text-7xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
          Tocando: <br />
          <span className="text-orange-500">{currentTrack || "A rádio que toca você"}</span>
        </h1>

        <p className="text-gray-400 text-xl mb-10 max-w-xl font-medium">
          A melhor programação gospel agora em rede nacional. Sintonize na Praise FM Brasil.
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onPlayClick}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            {isPlaying ? (
              <><Pause fill="white" /> PAUSAR AGORA</>
            ) : (
              <><Play fill="white" /> OUVIR AGORA</>
            )}
          </button>

          <button 
            onClick={onViewSchedule}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
          >
            <Calendar size={20} /> VER PROGRAMAÇÃO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;