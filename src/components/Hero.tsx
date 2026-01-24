import React, { useEffect, useState } from 'react';
import { Play, Calendar } from 'lucide-react';
import { usePlayer } from '../contexts/LivePlayerContext';
import { SCHEDULES } from '../constants';
import { ProgramRing } from './ProgramRing';

interface HeroProps {
  onNavigateToProgram: () => void;
}

export default function Hero({ onNavigateToProgram }: HeroProps) {
  const { togglePlay, isPlaying } = usePlayer();
  const [currentProgram, setCurrentProgram] = useState(SCHEDULES[1][0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateCurrentProgram = () => {
      const now = new Date();
      const day = now.getDay();
      const time = now.getHours() * 60 + now.getMinutes();
      
      const todayPrograms = SCHEDULES[day] || SCHEDULES[1];
      const current = todayPrograms.find(p => {
        const [startH, startM] = p.startTime.split(':').map(Number);
        const [endH, endM] = p.endTime.split(':').map(Number);
        const start = startH * 60 + startM;
        const end = (endH === 0 ? 24 : endH) * 60 + endM;
        return time >= start && time < end;
      });

      if (current) {
        setCurrentProgram(current);
        const [startH, startM] = current.startTime.split(':').map(Number);
        const [endH, endM] = current.endTime.split(':').map(Number);
        const start = startH * 60 + startM;
        const end = (endH === 0 ? 24 : endH) * 60 + endM;
        const total = end - start;
        const elapsed = time - start;
        setProgress((elapsed / total) * 100);
      }
    };

    updateCurrentProgram();
    const interval = setInterval(updateCurrentProgram, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-8 pb-16 px-4 overflow-hidden bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado Esquerdo: Informações do Programa */}
        <div className="relative z-10 order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-praise-accent rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-praise-accent">Ao Vivo</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
            {currentProgram.title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl font-medium leading-relaxed">
            {currentProgram.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex items-center gap-3 bg-praise-accent hover:bg-[#e65c00] text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-praise-accent/20"
            >
              <Play fill="currentColor" size={20} />
              <span className="font-semibold">{isPlaying ? 'OUVINDO AGORA' : 'OUVIR AO VIVO'}</span>
            </button>
          </div>

          {/* Anel Progressivo e Link da Programação [Ajustado] */}
          <div className="flex items-center gap-6 mt-10">
            <div className="relative">
              <ProgramRing program={currentProgram} progress={progress} size={100} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-400">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-praise-accent font-semibold mb-1">
                Cronograma
              </span>
              <button 
                onClick={onNavigateToProgram}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-praise-accent transition-colors flex items-center gap-2 group font-medium"
              >
                Ver programação completa
                <Calendar size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Lado Direito: Imagem do Locutor */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-praise-accent/20 to-transparent rounded-full blur-3xl" />
            <img
              src={currentProgram.image}
              alt={currentProgram.host}
              className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl z-20 border border-gray-100 dark:border-white/5">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Apresentação</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{currentProgram.host}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}