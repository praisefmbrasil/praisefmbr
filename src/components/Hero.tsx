import React from 'react';
import { Play, Pause, ListMusic, Radio } from 'lucide-react';

interface HeroProps {
  onPlayClick: () => void;
  isPlaying: boolean;
  currentTrack: string; // Espera o formato "Musica - Cantor"
  onViewSchedule: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  onPlayClick, 
  isPlaying, 
  currentTrack, 
  onViewSchedule 
}) => {
  // Lógica para separar Título e Cantor igual ao site original
  const [songTitle, artistName] = currentTrack.includes(' - ') 
    ? currentTrack.split(' - ') 
    : [currentTrack, ''];

  return (
    <div className="relative h-[85vh] w-full flex items-center px-6 sm:px-12 md:px-20 overflow-hidden bg-black text-white">
      {/* Background com Imagem e Gradiente profundo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80" 
          alt="Microphone Background" 
          className="w-full h-full object-cover opacity-50 shadow-inner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Badge "AO VIVO" Brasil */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-600 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Ao Vivo</span>
          </div>
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Praise FM Brasil</span>
        </div>

        {/* Título da Música em destaque */}
        <div className="mb-4">
          <h2 className="text-orange-500 text-6xl md:text-8xl font-black uppercase leading-tight tracking-tighter">
            TOCANDO:
          </h2>
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter break-words">
            {songTitle || "Sintonizando..."}
          </h1>
        </div>

        {/* Subtítulo Dinâmico */}
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-gray-400 text-xl md:text-2xl font-medium uppercase tracking-tight">
            AGORA NA VOZ DE <span className="text-white font-black">{artistName || "Praise FM"}</span>
          </p>
          <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mt-2">
            <ListMusic size={16} />
            Música em Destaque
          </div>
        </div>

        {/* Botões Estilizados (Retangulares e Robustos) */}
        <div className="flex flex-wrap gap-4 mt-12">
          <button 
            onClick={onPlayClick}
            className="flex items-center gap-4 bg-white text-black hover:bg-orange-500 hover:text-white px-10 py-5 font-black text-sm uppercase tracking-widest transition-all duration-300"
          >
            {isPlaying ? (
              <><Pause fill="currentColor" size={20} /> Pausar Agora</>
            ) : (
              <><Play fill="currentColor" size={20} /> Ouvir Agora</>
            )}
          </button>

          <button 
            onClick={onViewSchedule}
            className="flex items-center gap-4 border-2 border-white/30 bg-transparent hover:border-orange-500 hover:text-orange-500 text-white px-10 py-5 font-black text-sm uppercase tracking-widest transition-all duration-300"
          >
            <Radio size={20} /> Ver Programação
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;