import React from 'react';
import { Play, Pause, Radio } from 'lucide-react';
import { ProgramRing } from './ProgramRing'; // ✅ Importando o componente que você criou

// ✅ Interface atualizada para resolver o Erro 2322
interface HeroProps {
  onPlayClick: () => void;
  isPlaying: boolean;
  currentTrack: string;
  onViewSchedule: () => void; // ✅ Agora o TypeScript reconhece esta prop
}

const Hero: React.FC<HeroProps> = ({ 
  onPlayClick, 
  isPlaying, 
  currentTrack, 
  onViewSchedule 
}) => {
  // Lógica de separação para o visual idêntico ao original
  const [songTitle, artistName] = currentTrack.includes(' - ') 
    ? currentTrack.split(' - ') 
    : [currentTrack, 'Praise FM Brasil'];

  return (
    <div className="relative h-[85vh] w-full flex flex-col md:flex-row items-center justify-center bg-black px-6 gap-12 overflow-hidden">
      
      {/* LADO ESQUERDO: O ANEL COM O PLAY CENTRALIZADO */}
      <div className="relative flex items-center justify-center scale-125 md:scale-[1.8]">
        <ProgramRing 
          title="" 
          image="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop" 
          progress={65} // Simulação de progresso do programa
          isLive={true} 
        />
        
        {/* BOTÃO PLAY DENTRO DO SEU ANEL */}
        <button 
          onClick={onPlayClick}
          className="absolute z-20 bg-white text-black p-4 rounded-full shadow-xl hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      {/* LADO DIREITO: TEXTOS GIGANTES */}
      <div className="relative z-10 text-center md:text-left md:ml-20 max-w-2xl">
        <p className="text-orange-500 font-black text-xl mb-2 tracking-tighter uppercase">Tocando:</p>
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-white mb-6">
          {songTitle || "Sintonizando..."}
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl font-bold uppercase tracking-tight">
          AGORA NA VOZ DE <span className="text-white font-black">{artistName}</span>
        </p>
        
        {/* Botão de Programação solicitado no erro */}
        <div className="mt-8">
          <button 
            onClick={onViewSchedule}
            className="flex items-center gap-2 border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            <Radio size={16} /> Ver Programação
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;