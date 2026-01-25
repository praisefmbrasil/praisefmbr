import React from "react";
import { Play, Pause } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  host: string;
  image: string;
  startTime: string;
  endTime: string;
}

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  program: Program;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex items-center p-4 gap-4 shadow-2xl z-50 border-t border-white/10">
      {/* Imagem do programa */}
      <div className="w-14 h-14 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#ff6600]">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Informações do programa */}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate uppercase tracking-tight">{program.title}</div>
        <div className="text-xs text-gray-400 truncate">{program.host}</div>
        <div className="text-[10px] font-medium text-[#ff6600] uppercase tracking-widest mt-1">
          {program.startTime} - {program.endTime}
        </div>
      </div>

      {/* Botão play/pause */}
      <button
        onClick={onTogglePlayback}
        aria-label={isPlaying ? "Pausar transmissão" : "Tocar transmissão"}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ff6600] hover:bg-[#e65c00] transition-colors shadow-lg active:scale-95"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white ml-0.5" />
        )}
      </button>
    </div>
  );
};

export default LivePlayerBar;