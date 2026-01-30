import React from 'react';

type ProgramRingProps = {
  title: string;
  image: string;
  progress: number; // Valor de 0 a 100 representando o progresso do programa atual
  isLive?: boolean;
};

/**
 * Componente de anel de progresso para programas da Praise FM Brasil.
 * Exibe a imagem do apresentador/programa envolta por um círculo de progresso.
 */
export function ProgramRing({
  title,
  image,
  progress,
  isLive
}: ProgramRingProps) {
  // Configurações do SVG para o anel de progresso
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center min-w-[120px] group transition-all duration-300">
      <div className="relative w-28 h-28">
        
        {/* SVG do Anel de Progresso */}
        <svg className="absolute inset-0 rotate-[-90deg] w-full h-full" aria-hidden="true">
          {/* Círculo de fundo (trilho cinza escuro) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#2a2a2a"
            strokeWidth="4"
            fill="none"
          />
          {/* Círculo de progresso (Laranja Praise FM) */}
          <circle
            cx="56"
            cy="56"
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

        {/* Container da Imagem do Apresentador */}
        <div className="absolute inset-[10px] rounded-full overflow-hidden border-2 border-[#121212] bg-[#1a1a1a]">
          <img
            src={image}
            alt={`Apresentador do programa ${title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Selo AO VIVO com o número 2 */}
        {isLive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff6600] text-black text-[9px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-lg z-10 animate-in fade-in zoom-in duration-300">
            {/* Círculo preto com o número 2 solicitado */}
            <span className="w-3.5 h-3.5 bg-black text-[#ff6600] rounded-full flex items-center justify-center text-[8px] font-black">
              2
            </span>
            <span className="tracking-tight">AO VIVO</span>
          </div>
        )}
      </div>

      {/* Título do Programa */}
      <span className="mt-4 text-[11px] font-bold text-center text-white uppercase tracking-wider leading-tight max-w-[110px] line-clamp-2 group-hover:text-[#ff6600] transition-colors">
        {title}
      </span>
    </div>
  );
}