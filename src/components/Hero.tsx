import React, { useMemo } from 'react';
import { Play, Pause, ChevronRight } from 'lucide-react';
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

  /* PROGRESS */
  const progress = useMemo(() => {
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end <= start) end += 1440;
    return Math.min(1, Math.max(0, (currentMinutes - start) / (end - start)));
  }, [program, currentMinutes]);

  const circleSize = 200;
  const strokeWidth = 4;
  const radius = circleSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* IMAGE */}
          <div
            className="relative cursor-pointer"
            onClick={() => onNavigateToProgram(program)}
          >
            <div
              className="rounded-full overflow-hidden relative"
              style={{ width: circleSize, height: circleSize }}
            >
              <img src={program.image} className="w-full h-full object-cover" />
              <svg
                width={circleSize}
                height={circleSize}
                className="absolute inset-0 -rotate-90"
              >
                <circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={radius}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
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
          <div className="text-center md:text-left">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {program.startTime} – {program.endTime}
            </span>

            <h1
              className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-2 cursor-pointer hover:text-[#ff6600]"
              onClick={() => onNavigateToProgram(program)}
            >
              {program.title} <ChevronRight className="inline w-7 h-7 text-[#ff6600]" />
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-xl">
              {program.description}
            </p>

            <button
              onClick={onListenClick}
              className="mt-8 bg-[#ff6600] text-white px-10 py-4 flex items-center gap-3 hover:bg-[#e65c00] transition font-bold"
            >
              {isPlaying ? <Pause /> : <Play />}
              {isPlaying ? 'PAUSAR' : 'TOCAR AO VIVO'}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
