import React from 'react';

type ProgramRingProps = {
  title: string;
  image: string;
  progress: number;
  isLive?: boolean;
};

export function ProgramRing({
  title,
  image,
  progress,
  isLive
}: ProgramRingProps) {
  const radius = 38;
  const size = 96;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center min-w-[96px] group transition-all duration-300">
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 rotate-[-90deg] w-full h-full"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#2a2a2a"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#ff6600"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.8s ease-in-out'
            }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-[9px] rounded-full overflow-hidden border-2 border-[#121212] bg-[#1a1a1a]">
          <img
            src={image}
            alt={`Apresentador do programa ${title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {isLive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff6600] text-black text-[8px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-lg z-10">
            <span className="w-3 h-3 bg-black text-[#ff6600] rounded-full flex items-center justify-center text-[7px] font-black">
              2
            </span>
            <span>AO VIVO</span>
          </div>
        )}
      </div>

      <span className="mt-2 text-[10px] font-bold text-center text-white uppercase tracking-wide leading-tight max-w-[95px] line-clamp-2 group-hover:text-[#ff6600] transition-colors">
        {title}
      </span>
    </div>
  );
}