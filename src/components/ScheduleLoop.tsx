import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { SCHEDULES } from '../constants';
import type { Program } from '../types';

const getBrazilTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('pt-BR', options);
  const parts = formatter.formatToParts(now);
  const h = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
  const m = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
  
  return { 
    h, 
    m, 
    total: h * 60 + m, 
    day: now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'short' }) 
  };
};

interface ScheduleLoopProps {
  onNavigateToProgram?: (program: Program) => void;
}

const ScheduleLoop: React.FC<ScheduleLoopProps> = ({ onNavigateToProgram }) => {
  const [currentTime, setCurrentTime] = useState(getBrazilTime());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getBrazilTime()), 30000);
    return () => clearInterval(timer);
  }, []);

  const dayIndex = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).getDay();
  const schedule = SCHEDULES[dayIndex] || SCHEDULES[1];
  
  const isCurrent = (start: string, end: string) => {
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    const startTime = sH * 60 + sM;
    let endTime = eH * 60 + eM;
    if (endTime === 0 || endTime <= startTime) endTime = 24 * 60;
    
    return currentTime.total >= startTime && currentTime.total < endTime;
  };

  // Centraliza o programa atual ao carregar ou mudar o dia
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('.is-active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [dayIndex]);

  return (
    <div className="bg-white dark:bg-[#000] text-gray-900 dark:text-white py-4 overflow-hidden border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center">
        {/* Label "NO AR" Estilo News Ticker */}
        <div className="hidden md:flex items-center mr-8 space-x-2 flex-shrink-0">
          <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">On Air</span>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-12 overflow-x-auto items-center flex-grow scrollbar-hide no-scrollbar scroll-smooth py-1"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {schedule.map((prog) => {
            const active = isCurrent(prog.startTime, prog.endTime);
            return (
              <div 
                key={prog.id} 
                onClick={() => onNavigateToProgram?.(prog)}
                className={`flex-shrink-0 transition-all duration-500 cursor-pointer group relative flex items-center space-x-4 ${
                  active ? 'opacity-100 is-active scale-105' : 'opacity-30 hover:opacity-100'
                }`}
              >
                {/* Horário */}
                <span className={`text-[11px] font-medium tracking-tighter w-12 transition-all ${
                  active 
                    ? 'text-[#ff6600] border-b border-[#ff6600]' 
                    : 'text-gray-400 dark:text-gray-600'
                }`}>
                  {prog.startTime}
                </span>

                {/* Info do Programa */}
                <div className="flex flex-col min-w-[150px]">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium whitespace-nowrap uppercase tracking-tighter transition-colors ${
                      active 
                        ? 'text-black dark:text-white' 
                        : 'text-gray-500 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white'
                    }`}>
                      {prog.title}
                    </span>
                    {active && <Play className="w-2.5 h-2.5 fill-[#ff6600] text-[#ff6600]" />}
                  </div>
                  <span className="text-[9px] uppercase font-medium text-[#ff6600] opacity-80 tracking-widest">
                    {prog.host}
                  </span>
                </div>

                {/* Divisor Visual */}
                <div className="h-4 w-[1px] bg-gray-100 dark:bg-white/10 ml-4"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleLoop;