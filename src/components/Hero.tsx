import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';

// Função de tempo ajustada para o fuso do Brasil
const getBrazilInfo = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const brazilTime = new Intl.DateTimeFormat('pt-BR', options).format(now);
  const [h, m] = brazilTime.split(':').map(Number);
  const day = now.getDay();
  return { day, totalMinutes: h * 60 + m };
};

interface HeroProps {
  onListenClick: () => void;
  isPlaying: boolean;
  onNavigateToProgram: (program: Program) => void;
}

const Hero: React.FC<HeroProps> = ({
  onListenClick,
  isPlaying,
  onNavigateToProgram,
}) => {
  const [tick, setTick] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const info = useMemo(() => getBrazilInfo(), [tick]);

  const { currentProgram, upNextPrograms } = useMemo(() => {
    const schedule = SCHEDULES[info.day] || SCHEDULES[1];
    const currentIndex = schedule.findIndex((p) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end === 0 || end <= start) end = 24 * 60;
      return info.totalMinutes >= start && info.totalMinutes < end;
    });

    const current = currentIndex !== -1 ? schedule[currentIndex] : schedule[0];
    const next = schedule.slice(currentIndex + 1, currentIndex + 3);
    return { currentProgram: current, upNextPrograms: next };
  }, [info]);

  const progress = useMemo(() => {
    if (!currentProgram) return 0;
    const [sH, sM] = currentProgram.startTime.split(':').map(Number);
    const [eH, eM] = currentProgram.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    const elapsed = info.totalMinutes - start;
    const duration = end - start;
    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [currentProgram, info.totalMinutes]);

  if (!currentProgram) return null;

  const circleSize = 192;
  const strokeWidth = 3;
  const center = circleSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="bg-white dark:bg-[#000000] py-12 transition-colors duration-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20">
          
          {/* Avatar Circular com Progresso (BBC Sounds Reference) */}
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => onNavigateToProgram(currentProgram)}>
            <div className="relative rounded-full overflow-hidden" style={{ width: circleSize, height: circleSize }}>
              <img 
                src={currentProgram.image} 
                alt={currentProgram.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <svg 
                width={circleSize} height={circleSize} 
                className="absolute inset-0 -rotate-90 pointer-events-none"
              >
                <circle cx={center} cy={center} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-gray-100 dark:text-white/10" />
                <circle cx={center} cy={center} r={radius} stroke="#ff6600" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} />
              </svg>
            </div>
            {/* Badge de Posição (Estilo BBC) */}
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-black rounded-full flex items-center justify-center border border-white/20">
              <span className="text-white text-xl font-normal">1</span>
            </div>
          </div>

          {/* Área Principal: Título e Play */}
          <div className="flex-grow pt-4 text-center md:text-left">
            <div className="text-[10px] font-normal text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-[0.4em]">
              <span className="text-[#ff6600]">Live</span> — <span>{currentProgram.startTime} - {currentProgram.endTime}</span>
            </div>
            
            <h2 
              className="text-5xl md:text-7xl font-medium text-gray-900 dark:text-white tracking-tighter mb-4 leading-[0.9] hover:text-[#ff6600] transition-colors cursor-pointer inline-flex items-center" 
              onClick={() => onNavigateToProgram(currentProgram)}
            >
              {currentProgram.title}
              <ChevronRight className="w-8 h-8 ml-2 text-[#ff6600] opacity-50" />
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-normal mb-10 leading-relaxed max-w-2xl tracking-tight">
              Com {currentProgram.host}. {currentProgram.description.split('.')[0]}.
            </p>

            <button 
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-14 py-5 flex items-center justify-center space-x-4 hover:bg-black transition-all active:scale-95 mx-auto md:mx-0 rounded-sm"
            >
              {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5" />}
              <span className="text-lg font-medium tracking-tight uppercase">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {/* Up Next Section */}
        {showDetails && (
          <div className="mt-24 pt-10 border-t border-gray-100 dark:border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.5em] mb-12">Up Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {upNextPrograms.map((prog) => (
                <div 
                  key={prog.id} 
                  className="flex items-start space-x-6 group cursor-pointer"
                  onClick={() => onNavigateToProgram(prog)}
                >
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-white/5 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={prog.image} alt={prog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[9px] font-normal mb-2 uppercase tracking-widest text-gray-400">
                      <span className="text-[#ff6600]">A Seguir</span> • {prog.startTime}
                    </div>
                    <h4 className="text-2xl font-normal text-gray-900 dark:text-white tracking-tight group-hover:text-[#ff6600] transition-colors leading-tight">
                      {prog.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-normal tracking-wide">
                      {prog.host}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Footer */}
        <div className="mt-16 pt-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 dark:border-white/5 gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-normal">
            Produced by Praise FM Brasil for Global Radio
          </p>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-[10px] font-medium text-gray-400 hover:text-[#ff6600] transition-colors uppercase tracking-[0.3em]"
          >
            {showDetails ? (
              <>Show less <ChevronUp className="w-3 h-3 ml-2 text-[#ff6600]" /></>
            ) : (
              <>Show more <ChevronDown className="w-3 h-3 ml-2 text-[#ff6600]" /></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;