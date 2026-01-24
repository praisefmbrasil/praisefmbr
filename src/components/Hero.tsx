import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, Pause, ChevronRight, Zap, ArrowRight, 
  ExternalLink, ChevronUp, ChevronDown 
} from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../contexts/LivePlayerContext'; // Importe o motor global

// ... (Sua lógica de getBrazilInfo e formatTime continua a mesma)

interface HeroProps {
  onNavigateToProgram: (program: Program) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToProgram }) => {
  // 1. Pegamos tudo o que precisamos do Contexto Global
  const { isPlaying, togglePlay, currentTrack } = usePlayer();
  
  const [tick, setTick] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const brazil = useMemo(() => getBrazilInfo(), [tick]);

  // ... (Sua lógica de cálculo do currentProgram e progress continua igual)

  if (!currentProgram) return null;

  // Constantes do Círculo de Progresso
  const circleSize = 192;    
  const strokeWidth = 4;
  const center = circleSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="bg-white dark:bg-[#000000] py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* LADO ESQUERDO: IMAGEM CIRCULAR */}
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => onNavigateToProgram(currentProgram)}>
            <div className="relative rounded-full overflow-hidden" style={{ width: circleSize, height: circleSize }}>
              <img 
                src={currentProgram.image} 
                alt={currentProgram.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <svg width={circleSize} height={circleSize} className="absolute inset-0 -rotate-90 pointer-events-none">
                <circle cx={center} cy={center} r={radius} stroke="#dbdbdb" strokeWidth={strokeWidth} fill="transparent" className="dark:stroke-white/10" />
                <circle cx={center} cy={center} r={radius} stroke="#ff6600" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 w-12 h-12 bg-black rounded-full flex items-center justify-center border-[3px] border-white dark:border-black shadow-lg">
              <span className="text-white text-2xl font-bold italic">1</span>
            </div>
          </div>

          {/* LADO DIREITO: TEXTO E PLAY */}
          <div className="flex-grow pt-4 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="w-2 h-2 bg-praise-accent rounded-full animate-pulse" />
                <span className="text-[11px] font-bold text-praise-accent uppercase tracking-[0.2em]">No Ar Agora</span>
             </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 hover:text-praise-accent transition-colors cursor-pointer leading-tight" onClick={() => onNavigateToProgram(currentProgram)}>
              {currentProgram.title}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-8 max-w-2xl">
              {currentProgram.description}
            </p>

            <button 
              onClick={togglePlay} // Usa a função do contexto!
              className="bg-[#ff6600] text-white px-12 py-4 flex items-center justify-center space-x-4 hover:bg-[#e65c00] transition-all active:scale-95 mx-auto md:mx-0 rounded-full shadow-xl"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              <span className="text-xl font-black uppercase tracking-tight">
                {isPlaying ? 'Pausar' : 'Ouvir Rádio'}
              </span>
            </button>
          </div>
        </div>

        {/* ... (O restante do código de "Up Next" e "Novidades" permanece igual) */}
      </div>
    </section>
  );
};

export default Hero;