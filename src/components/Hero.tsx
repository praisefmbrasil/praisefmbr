import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { SCHEDULES } from '../constants';
import { Program } from '../types';
import { useNavigate } from 'react-router-dom';

const getBrazilInfo = () => {
  const now = new Date();
  const brazilDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );

  const h = brazilDate.getHours();
  const m = brazilDate.getMinutes();

  return {
    day: brazilDate.getDay(),
    totalMinutes: h * 60 + m,
  };
};

interface HeroProps {
  onListenClick: () => void;
  isPlaying: boolean;
  liveMetadata?: { artist: string; title: string; artwork?: string } | null;
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

  const brazil = useMemo(() => getBrazilInfo(), [tick]);

  const { currentProgram, upNextPrograms } = useMemo(() => {
    const schedule = SCHEDULES[brazil.day] || SCHEDULES[1];

    const currentIndex = schedule.findIndex((p) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);

      const start = sH * 60 + sM;
      let end = eH * 60 + eM;

      if (end === 0 || end <= start) end = 24 * 60;

      return brazil.totalMinutes >= start && brazil.totalMinutes < end;
    });

    const safeIndex = currentIndex !== -1 ? currentIndex : 0;
    const current = schedule[safeIndex];

    const next = [
      schedule[(safeIndex + 1) % schedule.length],
      schedule[(safeIndex + 2) % schedule.length],
    ].filter(Boolean);

    return {
      currentProgram: current,
      upNextPrograms: next,
    };
  }, [brazil]);

  const progress = useMemo(() => {
    if (!currentProgram) return 0;

    const [sH, sM] = currentProgram.startTime.split(':').map(Number);
    const [eH, eM] = currentProgram.endTime.split(':').map(Number);

    const start = sH * 60 + sM;
    let end = eH * 60 + eM;

    if (end === 0 || end <= start) end = 24 * 60;

    return Math.min(
      Math.max((brazil.totalMinutes - start) / (end - start), 0),
      1
    );
  }, [currentProgram, brazil.totalMinutes]);

  if (!currentProgram) return null;

  const ringSize = 224;
  const strokeWidth = 10;
  const center = ringSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="bg-white dark:bg-[#000000] py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* ANEL IGUAL USA */}
          <div
            className="relative flex-shrink-0 group cursor-pointer"
            style={{ width: ringSize, height: ringSize }}
            onClick={() => onNavigateToProgram(currentProgram)}
          >
            <svg
              width={ringSize}
              height={ringSize}
              viewBox={`0 0 ${ringSize} ${ringSize}`}
              className="absolute inset-0 -rotate-90 pointer-events-none z-20"
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                className="text-gray-200 dark:text-white/10"
              />

              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="#ff6600"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-[15px] rounded-full overflow-hidden bg-black dark:bg-[#050505] z-10 shadow-xl">
              <img
                src={currentProgram.image}
                alt={currentProgram.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Texto e botão */}
          <div className="flex-grow pt-4 text-center md:text-left">
            <div className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-center md:justify-start space-x-2">
              <span className="text-[#ff6600] font-black uppercase tracking-[0.2em]">
                AO VIVO
              </span>
              <span>·</span>
              <span>
                {currentProgram.startTime} - {currentProgram.endTime}
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-1 hover:text-[#ff6600] transition-colors cursor-pointer inline-flex items-center"
              onClick={() => onNavigateToProgram(currentProgram)}
            >
              {currentProgram.title}
              <ChevronRight className="w-6 h-6 ml-1 text-[#ff6600]" />
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 font-normal mb-6">
              {currentProgram.description}
            </p>

            <button
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-10 py-3.5 flex items-center justify-center space-x-3 hover:bg-[#e65c00] transition-all active:scale-95 mx-auto md:mx-0 rounded-sm shadow-md"
            >
              {isPlaying ? (
                <Pause className="fill-current w-5 h-5" />
              ) : (
                <Play className="fill-current w-5 h-5" />
              )}

              <span className="text-lg font-bold tracking-tight">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            {/* A seguir */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5">
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                {upNextPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    onClick={() => onNavigateToProgram(prog)}
                    className="flex items-center space-x-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer px-4 py-3 rounded-sm flex-1"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 dark:border-white/10">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] text-[#ff6600] font-black uppercase tracking-widest mb-0.5">
                        A SEGUIR · {prog.startTime} - {prog.endTime}
                      </p>

                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {prog.title}
                      </p>

                      {prog.host && prog.host !== 'Praise FM' && (
                        <p className="text-[11px] text-gray-400 truncate">
                          {prog.host}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Novidade na Praise */}
            <div
              className="mt-12 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer transition-all hover:border-[#ff6600]/50"
              onClick={() => navigate('/new-releases')}
            >
              <div className="flex items-center space-x-10">
                <div className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center relative">
                  <Zap className="w-6 h-6 text-[#ff6600] fill-current animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#ff6600] scale-110 animate-ping opacity-20" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-1">
                    Novidade na Praise
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 font-normal uppercase tracking-widest">
                    Lançamentos que tocam a alma
                  </p>
                </div>
              </div>

              <button className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-black dark:text-white group-hover:text-[#ff6600] transition-colors">
                <span>Explorar Tudo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="mt-12 pt-6">
          <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase font-medium tracking-widest mb-4">
            Produzido por PRAISE FM BRASIL.
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-sm font-semibold text-black dark:text-white hover:text-[#ff6600] transition-colors w-fit"
          >
            {showDetails ? (
              <>
                Ver menos{' '}
                <ChevronUpIcon className="w-4 h-4 ml-1 text-[#ff6600]" />
              </>
            ) : (
              <>
                Ver mais detalhes{' '}
                <ChevronDownIcon className="w-4 h-4 ml-1 text-[#ff6600]" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default Hero;