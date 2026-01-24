import React from 'react';

interface ProgramRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgramRing({ progress, size = 160, strokeWidth = 5 }: ProgramRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-100 dark:text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ff6600"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500"
        />
      </svg>
      {/* Imagem do Locutor Circular como no modelo USA */}
      <div className="absolute inset-2 rounded-full overflow-hidden">
        <img 
          src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp" 
          alt="Locutor"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Badge "1" no canto, igual à referência */}
      <div className="absolute bottom-1 right-1 bg-black text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0f0f0f]">
        1
      </div>
    </div>
  );
}