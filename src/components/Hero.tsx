import React, { useMemo } from 'react';
import { Play, Pause, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { Program } from '../types';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onListenClick: () => void;
  isPlaying: boolean;
  onNavigateToProgram: (program: Program) => void;
  program: Program;
  currentMinutes: number;
}

const Hero: React.FC<HeroProps> = ({
  onListenClick,
  isPlaying,
  onNavigateToProgram,
  program,
  currentMinutes
}) => {
  const navigate = useNavigate();

  /* =======================
     PROGRESS
  ======================= */
  const progress = useMemo(() => {
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);

    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end <= start) end += 1440;

    return Math.min(
      1,
      Math.max(0, (currentMinutes - start) / (end - start))
    );
  }, [program, currentMinutes]);

  /* =======================
     CIRCLE
  ======================= */
  const circleSize = 200;
  const strokeWidth = 4;
  const center = circleSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="min-h-[100svh] bg-white dark:bg-black flex items-center transition-colors">
      <div className="max-w-7xl mx-auto px-4 w-full">

        <div className="flex flex-col md:flex-row items-center gap-14">

          {/* IMAGE */}
          <div
            className="relative cursor-pointer"
            onClick={() => onNavigateToProgram(program)}
          >
            <div
              className="relative rounded-full overflow-hidden"
              style={{ width: circleSize, height: circleSize }}
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />

              <svg
                width={circleSize}
                height={circleSize}
                className="absolute inset-0 -rotate-90 pointer-events-none"
              >
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
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
            </div>
          </div>

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left">

            <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest">
              {program.startTime} – {program.endTime}
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-4 cursor-pointer hover:text-[#ff6600] inline-flex items-center"
              onClick={() => onNavigateToProgram(program)}
            >
              {program.title}
              <ChevronRight className="ml-2 text-[#ff6600]" />
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
              com {program.host} — {program.description}
            </p>

            <button
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-12 py-4 flex items-center justify-center gap-3 hover:bg-[#e65c00] active:scale-95 transition rounded-sm shadow-lg mx-auto md:mx-0"
            >
              {isPlaying ? <Pause /> : <Play />}
              <span className="text-lg font-bold uppercase tracking-wide">
                {isPlaying ? 'Pausar' : 'Tocar'}
              </span>
            </button>
          </div>
        </div>

        {/* PROMO STRIP */}
        <div
          className="mt-16 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 flex items-center justify-between cursor-pointer hover:border-[#ff6600]/50 transition"
          onClick={() => navigate('/new-releases')}
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center relative">
              <Zap className="w-6 h-6 text-[#ff6600] animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-[#ff6600] scale-110 animate-ping opacity-20" />
            </div>
            <div>
              <h3 className="text-2xl font-bold uppercase">
                Novos Lançamentos
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Destaques da programação
              </p>
            </div>
          </div>

          <ArrowRight />
        </div>
      </div>
    </section>
  );
};

export default Hero;
