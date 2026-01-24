import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Play, ArrowLeft, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';

// ✅ Define a interface ScheduleListProps
interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack?: () => void;
}

// ✅ Usa fuso de São Paulo
const getSaoPauloDate = (baseDate: Date = new Date()) => {
  return new Date(baseDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
};

// ✅ Formato 24h
const formatTimeBR = (time24: string) => time24;

const ProgramProgressRing: React.FC<{ program: Program; isActive: boolean; nowMinutes: number }> = ({ program, isActive, nowMinutes }) => {
  const progress = useMemo(() => {
    if (!isActive) return 0;
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    let start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end <= start) end += 24 * 60;
    const elapsed = nowMinutes - start;
    const duration = end - start;
    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [program, isActive, nowMinutes]);

  const size = 120;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center bg-[#f2f2f2] dark:bg-[#1a1a1a] p-3 group-hover:scale-105 transition-transform duration-500">
      <div className="relative rounded-full overflow-hidden" style={{ width: size - 24, height: size - 24 }}>
        <img 
          src={program.image} 
          alt="" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
        />
        <svg 
          width={size - 24} 
          height={size - 24} 
          className="absolute inset-0 -rotate-90 pointer-events-none"
        >
          <circle 
            cx={(size - 24) / 2} cy={(size - 24) / 2} r={(size - 24) / 2 - strokeWidth / 2} 
            stroke="#dbdbdb" strokeWidth={strokeWidth} 
            fill="transparent" 
            className="dark:stroke-white/10"
          />
          {isActive && (
            <circle 
              cx={(size - 24) / 2} cy={(size - 24) / 2} r={(size - 24) / 2 - strokeWidth / 2} 
              stroke="#ff6600" strokeWidth={strokeWidth} 
              fill="transparent" 
              strokeDasharray={2 * Math.PI * ((size - 24) / 2 - strokeWidth / 2)}
              strokeDashoffset={2 * Math.PI * ((size - 24) / 2 - strokeWidth / 2) - progress * 2 * Math.PI * ((size - 24) / 2 - strokeWidth / 2)}
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
  const [now, setNow] = useState(getSaoPauloDate());
  const listContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setInterval(() => setNow(getSaoPauloDate()), 30000);
    return () => clearInterval(timer);
  }, []);

  const currentSchedule = useMemo(() => {
    const dayIndex = now.getDay(); // 0 = dom, 1 = seg, ..., 6 = sáb
    return SCHEDULES[dayIndex] || SCHEDULES[0];
  }, [now]);

  const sections = useMemo(() => {
    const groups: Record<string, Program[]> = {
      'MADRUGADA': [], 'MANHÃ': [], 'TARDE': [], 'NOITE': [], 'LATE_NIGHT': []
    };
    currentSchedule.forEach(prog => {
      const h = parseInt(prog.startTime.split(':')[0]);
      if (h >= 0 && h < 6) groups['MADRUGADA'].push(prog);
      else if (h >= 6 && h < 12) groups['MANHÃ'].push(prog);
      else if (h >= 12 && h < 18) groups['TARDE'].push(prog);
      else if (h >= 18 && h < 22) groups['NOITE'].push(prog);
      else groups['LATE_NIGHT'].push(prog);
    });
    return groups;
  }, [currentSchedule]);

  const isLiveNow = (startStr: string, endStr: string) => {
    const [sH, sM] = startStr.split(':').map(Number);
    const [eH, eM] = endStr.split(':').map(Number);
    let start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end <= start) end += 24 * 60;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return nowMinutes >= start && nowMinutes < end;
  };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  useEffect(() => {
    const scrollInterval = setTimeout(() => {
      const liveElement = document.querySelector('[data-live="true"]');
      if (liveElement) {
        liveElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
    return () => clearTimeout(scrollInterval);
  }, []);

  return (
    <section ref={listContainerRef} className="bg-white dark:bg-[#000] min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {onBack && (
          <button onClick={onBack} className="flex items-center text-gray-400 hover:text-[#ff6600] transition-colors mb-6 text-xs font-normal uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Início
          </button>
        )}
        
        <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 mb-12 border-b-4 border-black dark:border-white pb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-none">Programação</h1>
          <p className="text-gray-400 font-normal uppercase tracking-wide text-sm mt-4 md:mt-0">
            Hoje • {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <div className="sticky top-16 z-[40] bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 py-4 mb-16 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center space-x-6 text-[11px] font-semibold uppercase tracking-wide overflow-x-auto no-scrollbar">
            <span className="text-gray-400 flex-shrink-0">IR PARA:</span>
            <div className="flex items-center space-x-6 whitespace-nowrap">
              {(Object.keys(sections) as string[]).map((title) => (
                <React.Fragment key={title}>
                  <a 
                    href={`#${title}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(title)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-[#ff6600] hover:text-black dark:hover:text-white transition-colors"
                  >
                    {title}
                  </a>
                  {title !== 'LATE_NIGHT' && <span className="text-gray-200 dark:text-gray-800">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {(Object.entries(sections) as [string, Program[]][]).map(([title, items]) => (
          items.length > 0 && (
            <div key={title} id={title} className="mb-20 scroll-mt-32">
              <h3 className="text-xl font-semibold dark:text-white mb-8 uppercase tracking-tight">
                {title}
              </h3>
              
              <div className="space-y-8">
                {items.map((prog) => {
                  const active = isLiveNow(prog.startTime, prog.endTime);
                  return (
                    <div 
                      key={prog.id}
                      data-live={active}
                      onClick={() => onNavigateToProgram(prog)}
                      className={`relative flex flex-col md:flex-row items-start p-6 transition-all cursor-pointer group rounded-sm ${active ? 'bg-gray-50 dark:bg-white/5 border-l-8 border-[#ff6600] shadow-lg' : 'border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    >
                      <div className="w-32 flex-shrink-0 flex flex-col mb-6 md:mb-0 pt-1">
                        <span className={`text-2xl font-bold tracking-tight ${active ? 'text-[#ff6600]' : 'text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white'}`}>
                          {formatTimeBR(prog.startTime)}
                        </span>
                        {active && (
                          <div className="mt-3 inline-flex items-center justify-center bg-[#ff6600] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider w-24">
                            AO VIVO
                          </div>
                        )}
                      </div>

                      <div className="md:mx-8">
                        <ProgramProgressRing 
                          program={prog} 
                          isActive={active} 
                          nowMinutes={nowMinutes} 
                        />
                      </div>

                      <div className="flex-grow min-w-0 pt-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-[#ff6600] leading-tight tracking-tight mb-2 transition-all duration-300">
                          {prog.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 font-normal text-base mb-4 tracking-tight">
                          com {prog.host}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed font-normal max-w-2xl">
                          {prog.description}
                        </p>
                        {active && (
                          <div className="mt-6 flex items-center space-x-3">
                             <div className="h-1 w-10 bg-[#ff6600] animate-pulse"></div>
                             <span className="text-[10px] font-semibold text-[#ff6600] uppercase tracking-wider">Ouvindo agora ao vivo</span>
                          </div>
                        )}
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