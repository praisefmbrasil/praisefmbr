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
     PROGRESSO DO PROGRAMA
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
     CIRCLE MATH
  ======================= */
  const circleSize = 192;
  const strokeWidth = 4;
  const center = circleSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="bg-white dark:bg-black py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* IMAGE + PROGRESS */}
          <div
            className="relative flex-shrink-0 cursor-pointer"
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
                />
              </svg>
            </div>
          </div>

          {/* TEXT */}
          <div className="flex-grow text-center md:text-left">
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">
              {program.startTime} – {program.endTime}
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight mb-2 hover:text-[#ff6600] cursor-pointer inline-flex items-center"
              onClick={() => onNavigateToProgram(program)}
            >
              {program.title} com {program.host}
              <ChevronRight className="w-6 h-6 ml-1 text-[#ff6600]" />
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {program.description}
            </p>

            <button
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-10 py-3.5 flex items-center justify-center gap-3 hover:bg-[#e65c00] active:scale-95 transition rounded-sm shadow-md mx-auto md:mx-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="text-lg font-bold">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {/* NEW RELEASES */}
        <div
          className="mt-14 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-8 flex items-center justify-between cursor-pointer hover:border-[#ff6600]/50 transition"
          onClick={() => navigate('/new-releases')}
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-black dark:bg-white rounded-full flex items-center justify-center relative">
              <Zap className="w-6 h-6 text-[#ff6600] animate-pulse" />
              <div className="absolute inset-0 rounded-full border-2 border-[#ff6600] scale-110 animate-ping opacity-20" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white uppercase">
                Novos Lançamentos
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Os melhores louvores chegando agora
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
            Explorar <ArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
