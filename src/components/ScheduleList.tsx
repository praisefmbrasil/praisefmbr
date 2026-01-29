import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { SCHEDULES } from '../constants';
import type { Program } from '../types'; // Correção do erro de importação

interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack?: () => void;
}

const getBrazilDate = (baseDate: Date = new Date()) => {
  return new Date(baseDate.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
};

const ProgramProgressRing: React.FC<{ program: Program; isActive: boolean; nowMinutes: number }> = ({ program, isActive, nowMinutes }) => {
  const progress = useMemo(() => {
    if (!isActive) return 0;
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    const elapsed = nowMinutes - start;
    const duration = end - start;
    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [program, isActive, nowMinutes]);

  const size = 120; 
  const strokeWidth = 3; 
  const radius = (size - 24) / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center bg-[#f2f2f2] dark:bg-[#111] p-2 group-hover:scale-105 transition-transform duration-500 border border-black/5 dark:border-white/5">
      <div className="relative rounded-full overflow-hidden" style={{ width: size - 24, height: size - 24 }}>
        <img 
          src={program.image} 
          alt="" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
        />
        <svg 
          width={size - 24} 
          height={size - 24} 
          className="absolute inset-0 -rotate-90 pointer-events-none"
        >
          <circle 
            cx={(size - 24) / 2} cy={(size - 24) / 2} r={radius} 
            stroke="currentColor" strokeWidth={strokeWidth} 
            fill="transparent" 
            className="text-black/5 dark:text-white/5"
          />
          {isActive && (
            <circle 
              cx={(size - 24) / 2} cy={(size - 24) / 2} r={radius} 
              stroke="#ff6600" strokeWidth={strokeWidth} 
              fill="transparent" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-1000"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

const ScheduleList: React.FC<ScheduleListProps> = ({ onNavigateToProgram, onBack }) => {
  const [now, setNow] = useState(getBrazilDate());
  const listContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setInterval(() => setNow(getBrazilDate()), 30000);
    return () => clearInterval(timer);
  }, []);

  const currentSchedule = useMemo(() => {
    const dayIndex = now.getDay();
    return SCHEDULES[dayIndex] || SCHEDULES[1];
  }, [now]);

  const sections = useMemo(() => {
    const groups: Record<string, Program[]> = {
      'Madrugada': [], 'Manhã': [], 'Tarde': [], 'Noite': [], 'Fim de Noite': []
    };
    currentSchedule.forEach(prog => {
      const h = parseInt(prog.startTime.split(':')[0]);
      if (h >= 0 && h < 6) groups['Madrugada'].push(prog);
      else if (h >= 6 && h < 12) groups['Manhã'].push(prog);
      else if (h >= 12 && h < 18) groups['Tarde'].push(prog);
      else if (h >= 18 && h < 22) groups['Noite'].push(prog);
      else groups['Fim de Noite'].push(prog);
    });
    return groups;
  }, [currentSchedule]);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const isLiveNow = (startStr: string, endStr: string) => {
    const [sH, sM] = startStr.split(':').map(Number);
    const [eH, eM] = endStr.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    return nowMinutes >= start && nowMinutes < end;
  };

  useEffect(() => {
    const activeElement = document.querySelector('[data-live="true"]');
    if (activeElement) {
      setTimeout(() => {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 800);
    }
  }, [currentSchedule]);

  return (
    <section ref={listContainerRef} className="bg-white dark:bg-[#000] min-h-screen font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        
        {/* Navigation Header */}
        <div className="mb-16">
          {onBack && (
            <button onClick={onBack} className="flex items-center text-gray-400 hover:text-[#ff6600] transition-colors mb-8 text-[11px] font-medium uppercase tracking-[0.3em]">
              <ArrowLeft className="w-4 h-4 mr-3" /> Voltar
            </button>
          )}
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-black dark:border-white/10 pb-8">
            <h1 className="text-5xl md:text-8xl font-medium text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
              Grade<br/>Horária
            </h1>
            <div className="mt-8 md:mt-0 text-right">
              <p className="text-[#ff6600] font-medium uppercase tracking-[0.3em] text-[11px] mb-2 flex items-center justify-end">
                <Calendar className="w-3 h-3 mr-2" /> Programação de Hoje
              </p>
              <p className="text-gray-400 font-light text-xl md:text-2xl uppercase tracking-tighter">
                {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        </div>

        {/* Sections Rendering */}
        {(Object.entries(sections) as [string, Program[]][]).map(([title, items]) => (
          items.length > 0 && (
            <div key={title} id={title} className="mb-24 scroll-mt-32">
              <div className="flex items-center space-x-4 mb-12">
                <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.5em]">{title}</h3>
                <div className="h-[1px] flex-grow bg-gray-100 dark:bg-white/5"></div>
              </div>
              
              <div className="grid gap-1">
                {items.map((prog) => {
                  const active = isLiveNow(prog.startTime, prog.endTime);
                  return (
                    <div 
                      key={prog.id}
                      data-live={active}
                      onClick={() => onNavigateToProgram(prog)}
                      className={`relative flex flex-col md:flex-row items-center md:items-start p-8 transition-all cursor-pointer group ${
                        active 
                        ? 'bg-gray-50 dark:bg-white/5 border-l-4 border-[#ff6600]' 
                        : 'border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Time Column */}
                      <div className="w-full md:w-48 flex-shrink-0 flex flex-col mb-8 md:mb-0">
                        <span className={`text-4xl md:text-6xl font-medium tracking-tighter leading-none ${active ? 'text-[#ff6600]' : 'text-gray-200 dark:text-gray-800 group-hover:text-black dark:group-hover:text-white transition-colors'}`}>
                          {prog.startTime}
                        </span>
                        {active && (
                          <div className="mt-4 inline-flex items-center text-[#ff6600] text-[10px] font-medium uppercase tracking-[0.4em]">
                            <span className="w-2 h-2 bg-[#ff6600] rounded-full animate-pulse mr-2"></span>
                            NO AR AGORA
                          </div>
                        )}
                      </div>

                      {/* Image Ring */}
                      <div className="md:mx-12 mb-8 md:mb-0">
                        <ProgramProgressRing 
                          program={prog} 
                          isActive={active} 
                          nowMinutes={nowMinutes} 
                        />
                      </div>

                      {/* Details Column */}
                      <div className="flex-grow min-w-0 text-center md:text-left">
                        <h4 className="text-3xl md:text-5xl font-medium text-gray-900 dark:text-white group-hover:text-[#ff6600] leading-[0.9] tracking-tighter mb-4 uppercase transition-all duration-300">
                          {prog.title}
                        </h4>
                        <p className="text-[#ff6600] font-medium text-[11px] md:text-xs mb-4 uppercase tracking-[0.2em]">
                          Apresentado por {prog.host}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light line-clamp-2 max-w-2xl tracking-tight">
                          {prog.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default ScheduleList;