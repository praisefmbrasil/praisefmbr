// src/components/Hero.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, Zap, ArrowRight, ExternalLink, ChevronsUpDown } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';
import { useNavigate } from 'react-router-dom';

// ✅ Usa fuso de São Paulo
const getSaoPauloInfo = () => {
  const now = new Date();
  const saoPauloString = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const saoPauloDate = new Date(saoPauloString);
  const h = saoPauloDate.getHours();
  const m = saoPauloDate.getMinutes();
  const day = saoPauloDate.getDay();
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
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const saoPaulo = useMemo(() => getSaoPauloInfo(), [tick]);

  const { currentProgram, upNextPrograms } = useMemo(() => {
    const schedule = SCHEDULES[saoPaulo.day] || SCHEDULES[0];
    
    const currentIndex = schedule.findIndex((p) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);
      let start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end <= start) end += 24 * 60;
      return saoPaulo.totalMinutes >= start && saoPaulo.totalMinutes < end;
    });

    const current = currentIndex !== -1 ? schedule[currentIndex] : schedule[0];
    const next = schedule.slice(currentIndex + 1, currentIndex + 3);
    
    return { currentProgram: current, upNextPrograms: next };
  }, [saoPaulo]);

  const progress = useMemo(() => {
    if (!currentProgram) return 0;
    const [sH, sM] = currentProgram.startTime.split(':').map(Number);
    const [eH, eM] = currentProgram.endTime.split(':').map(Number);
    let start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end <= start) end += 24 * 60;
    const elapsed = saoPaulo.totalMinutes - start;
    const duration = end - start;
    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [currentProgram, saoPaulo.totalMinutes]);

  if (!currentProgram) return null;

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
          
          {/* LEFT SIDE: CIRCULAR IMAGE */}
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => onNavigateToProgram(currentProgram)}>
            <div className="relative rounded-full overflow-hidden" style={{ width: circleSize, height: circleSize }}>
              <img 
                src={currentProgram.image} 
                alt={currentProgram.title} 
                className="w-full h-full object-cover" 
              />
              <svg 
                width={circleSize} height={circleSize} 
                className="absolute inset-0 -rotate-90 pointer-events-none"
              >
                <circle cx={center} cy={center} r={radius} stroke="#dbdbdb" strokeWidth={strokeWidth} fill="transparent" className="dark:stroke-white/10" />
                <circle cx={center} cy={center} r={radius} stroke="#ff6600" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="butt" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 w-12 h-12 bg-black rounded-full flex items-center justify-center border-[3px] border-white dark:border-black shadow-lg">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
          </div>

          {/* RIGHT SIDE: TEXT AND PLAY BUTTON */}
          <div className="flex-grow pt-4 text-center md:text-left">
            <div className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-center md:justify-start space-x-2">
              <span>{currentProgram.startTime} - {currentProgram.endTime}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-1 hover:text-[#ff6600] transition-colors cursor-pointer inline-flex items-center" onClick={() => onNavigateToProgram(currentProgram)}>
              {currentProgram.title} com {currentProgram.host}
              <ChevronRight className="w-6 h-6 ml-1 text-[#ff6600]" />
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 font-normal mb-6">
              {currentProgram.description}
            </p>

            <button 
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-10 py-3.5 flex items-center justify-center space-x-3 hover:bg-[#e65c00] transition-all active:scale-95 mx-auto md:mx-0 rounded-sm shadow-md"
            >
              {isPlaying ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current w-5 h-5" />}
              <span className="text-lg font-bold tracking-tight">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            {/* UP NEXT SECTION */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {upNextPrograms.map((prog) => (
                  <div 
                    key={prog.id} 
                    className="flex items-start space-x-5 group cursor-pointer"
                    onClick={() => onNavigateToProgram(prog)}
                  >
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <img 
                        src={prog.image} 
                        alt={prog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[11px] font-normal mb-1">
                        <span className="text-[#ff6600] uppercase tracking-widest font-semibold mr-2">PRÓXIMOS</span>
                        <span className="text-gray-400 font-normal">{prog.startTime} - {prog.endTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-[#ff6600] transition-colors">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-snug">
                        {prog.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW MUSIC ALERT SECTION */}
            <div className="mt-12 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-8 flex flex-col md:flex-row items-center justify-between group cursor-pointer transition-all hover:border-[#ff6600]/50" onClick={() => navigate('/new-releases')}>
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center relative">
                  <Zap className="w-6 h-6 text-[#ff6600] fill-current animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#ff6600] scale-110 animate-ping opacity-20"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-1">Novos Lançamentos</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-normal uppercase tracking-widest">Os melhores louvores chegando agora</p>
                </div>
              </div>
              <button 
                className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-black dark:text-white group-hover:text-[#ff6600] transition-colors"
              >
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* SECTION FOOTER */}
        <div className="mt-12 pt-6">
           {showDetails && (
             <>
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">
                 {currentProgram.description.split('.')[0]}.
               </p>
               <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase font-medium tracking-widest mb-4">
                 Produzido por PRAISE FM BRASIL.
               </p>
             </>
           )}
           <div className="flex flex-col space-y-3">
             {showDetails && (
               <button 
                 onClick={() => onNavigateToProgram(currentProgram)}
                 className="flex items-center text-sm font-semibold text-black dark:text-white hover:text-[#ff6600] transition-colors w-fit group"
               >
                 Site do Programa <ExternalLink className="w-4 h-4 ml-2 text-[#ff6600]" />
               </button>
             )}
             <button 
               onClick={() => setShowDetails(!showDetails)}
               className="flex items-center text-sm font-semibold text-black dark:text-white hover:text-[#ff6600] transition-colors w-fit"
             >
               {showDetails ? <>Mostrar menos <ChevronsUpDown className="w-4 h-4 ml-1 text-[#ff6600] rotate-180" /></> : <>Mostrar mais <ChevronsUpDown className="w-4 h-4 ml-1 text-[#ff6600]" /></>}
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;