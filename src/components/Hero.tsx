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

  const progress = useMemo(() => {
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);

    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end <= start) end += 1440;

    return Math.min(1, Math.max(0, (currentMinutes - start) / (end - start)));
  }, [program, currentMinutes]);

  const size = 192;
  const stroke = 4;
  const center = size / 2;
  const radius = center - stroke / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <section className="bg-white dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">

        {/* IMAGE + RING */}
        <div
          className="relative cursor-pointer"
          onClick={() => onNavigateToProgram(program)}
        >
          <div className="rounded-full overflow-hidden" style={{ width: size, height: size }}>
            <img src={program.image} alt="" className="w-full h-full object-cover" />
          </div>

          <svg
            width={size}
            height={size}
            className="absolute inset-0 -rotate-90"
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#ff6600"
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* TEXT */}
        <div className="text-center md:text-left max-w-xl">
          <span className="text-xs text-gray-500">
            {program.startTime} – {program.endTime}
          </span>

          <h1
            className="text-4xl font-bold text-black dark:text-white mt-2 flex items-center cursor-pointer hover:text-[#ff6600]"
            onClick={() => navigate('/schedule')}
          >
            {program.title} com {program.host}
            <ChevronRight className="ml-2 text-[#ff6600]" />
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-4">
            {program.description}
          </p>

          <button
            onClick={onListenClick}
            className="mt-8 bg-[#ff6600] text-white px-10 py-3 flex items-center gap-3 hover:bg-[#e65c00]"
          >
            {isPlaying ? <Pause /> : <Play />}
            <span className="font-bold text-lg">
              {isPlaying ? 'Pausar' : 'Ouvir Agora'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
