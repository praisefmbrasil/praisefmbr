import React from 'react';

type ProgramRingProps = {
  title: string;
  image: string;
  progress: number;
  isLive?: boolean;
};

export function ProgramRing({ title, image, progress, isLive }: ProgramRingProps) {
  const size = 104;
  const center = size / 2;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.min(100, Math.max(0, progress || 0));
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="flex flex-col items-center min-w-[104px] group">
      <div className="relative w-[104px] h-[104px]">
        <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_18px_rgba(255,102,0,0.18)]" />

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90 w-full h-full"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#ff6600"
            strokeWidth="5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255,102,0,0.65))',
              transition: 'stroke-dashoffset 0.8s ease-in-out',
            }}
          />
        </svg>

        <div className="absolute inset-[9px] rounded-full overflow-hidden bg-[#111] border border-white/10 shadow-inner">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {isLive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[#ff6600] px-2.5 py-1 text-[9px] font-black text-black shadow-lg">
            AO VIVO
          </div>
        )}
      </div>

      <span className="mt-2.5 max-w-[100px] text-center text-[10px] font-black uppercase leading-tight tracking-wide text-white/90 group-hover:text-[#ff6600] transition-colors">
        {title}
      </span>
    </div>
  );
}