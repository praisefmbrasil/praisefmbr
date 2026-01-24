import React from 'react';

interface ProgramRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgramRing({ progress, size = 80, strokeWidth = 4 }: ProgramRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Círculo de Fundo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-100 dark:text-white/10"
        />
        {/* Círculo de Progresso Laranja */}
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
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Imagem do Locutor no Centro */}
      <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white dark:border-[#0f0f0f]">
        <img 
          src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp" 
          alt="Locutor"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}