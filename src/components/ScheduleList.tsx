// src/components/ScheduleList.tsx
import type { FC } from 'react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Play, ArrowLeft, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { SCHEDULES } from '../constants';
import type { Program } from '../types';

interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack?: () => void;
}

const getSaoPauloDate = (baseDate: Date = new Date()) =>
  new Date(baseDate.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

const ProgramProgressRing: FC<{ program: Program; isActive: boolean; nowMinutes: number }> = ({
  program,
  isActive,
  nowMinutes,
}) => {
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
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center bg-[#f2f2f2] dark:bg-[#1a1a1a] p-3 group-hover:scale-105 transition-transform duration-500">
      <div className="relative rounded-full overflow-hidden" style={{ width: size - 24, height: size - 24 }}>
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <svg width={size - 24} height={size - 24} className="absolute inset-0 -rotate-90 pointer-events-none">
          <circle
            cx={(size - 24) / 2}
            cy={(size - 24) / 2}
            r={radius}
            stroke="#dbdbdb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="dark:stroke-white/10"
          />
          {isActive && (
            <circle
              cx={(size - 24) / 2}
              cy={(size - 24) / 2}
              r={radius}
              stroke="#ff6600"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              className="transition-all duration-1000"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

const ScheduleList: FC<ScheduleListProps> = ({ onNavigateToProgram, onBack }) => {
  const [now, setNow] = useState(getSaoPauloDate());
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(getSaoPauloDate()), 30000);
    return () => clearInterval(timer);
  }, []);

  const currentSchedule = useMemo(() => {
    const dayIndex = now.getDay();
    return SCHEDULES[dayIndex] || SCHEDULES[1];
  }, [now]);

  const sections = useMemo(() => {
    const groups: Record<string, Program[]> = {
      MADRUGADA: [],
      MANHÃ: [],
      TARDE: [],
      NOITE: [],
      'FINAL DO DIA': [],
    };
    currentSchedule.forEach((prog) => {
      const h = parseInt(prog.startTime.split(':')[0]);
      if (h >= 0 && h < 6) groups['MADRUGADA'].push(prog);
      else if (h >= 6 && h < 12) groups['MANHÃ'].push(prog);
      else if (h >= 12 && h < 18) groups['TARDE'].push(prog);
      else if (h >= 18 && h < 22) groups['NOITE'].push(prog);
      else groups['FINAL DO DIA'].push(prog);
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

  // Scroll automático para o programa ao vivo
  useEffect(() => {
    const activeEl = document.querySelector('[data-live="true"]');
    if (activeEl) setTimeout(() => activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
  }, [currentSchedule]);

  return (
    <section ref={listContainerRef} className="bg-white dark:bg-[#000] min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-[#ff6600] transition-colors mb-6 text-[10px] font-normal uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </button>
        )}

        <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 mb-10 border-b border-black dark:border-white pb-6">
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
            Grade de Programação
          </h1>
          <p className="text-gray-400 font-normal uppercase tracking-[0.2em] text-[11px] mt-4 md:mt-0">
            Hoje • {now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {(Object.entries(sections) as [string, Program[]][]).map(([title, items]) =>
          items.length > 0 ? (
            <div key={title} id={title} className="mb-16 scroll-mt-32">
              <h3 className="bbc-section-title text-lg dark:text-white mb-8 uppercase font-medium">{title}</h3>
              <div className="space-y-8">
                {items.map((prog) => {
                  const active = isLiveNow(prog.startTime, prog.endTime);
                  return (
                    <div
                      key={prog.id}
                      data-live={active}
                      onClick={() => onNavigateToProgram(prog)}
                      className={`relative flex flex-col md:flex-row items-start p-6 md:p-8 transition-all cursor-pointer group rounded-sm ${
                        active
                          ? 'bg-gray-50 dark:bg-white/5 border-l-[10px] border-[#ff6600] shadow-sm'
                          : 'border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="w-32 md:w-40 flex-shrink-0 flex flex-col mb-6 md:mb-0 pt-1">
                        <span
                          className={`text-3xl md:text-4xl font-medium tracking-tighter ${
                            active
                              ? 'text-[#ff6600]'
                              : 'text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white'
                          }`}
                        >
                          {prog.startTime}
                        </span>
                        {active && (
                          <div className="mt-3 inline-flex items-center justify-center bg-[#ff6600] text-white text-[9px] font-medium px-3 py-1 uppercase tracking-widest w-24">
                            NO AR
                          </div>
                        )}
                      </div>

                      <div className="md:mx-8">
                        <ProgramProgressRing program={prog} isActive={active} nowMinutes={nowMinutes} />
                      </div>

                      <div className="flex-grow min-w-0 pt-1">
                        <h4 className="text-2xl md:text-4xl font-medium text-gray-900 dark:text-white group-hover:text-[#ff6600] leading-tight tracking-tighter mb-2 truncate uppercase transition-all duration-300">
                          {prog.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 font-normal text-base md:text-lg mb-4 uppercase tracking-tight">
                          com {prog.host}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 leading-relaxed font-normal max-w-2xl tracking-tight">
                          {prog.description}
                        </p>
                        {active && (
                          <div className="mt-6 flex items-center space-x-3">
                            <div className="h-1 w-10 bg-[#ff6600] animate-pulse"></div>
                            <span className="text-[9px] font-normal text-[#ff6600] uppercase tracking-[0.4em]">
                              Ouvindo agora ao vivo
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default ScheduleList;
