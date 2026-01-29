interface ProgramRingProps {
  title: string;
  image: string;
  progress: number; // 0 a 100
  isLive?: boolean;
}

export function ProgramRing({
  title,
  image,
  progress,
  isLive
}: ProgramRingProps) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  
  // Garante que o progresso não ultrapasse os limites visuais
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="flex flex-col items-center min-w-[120px] group">
      <div className="relative w-28 h-28">
        {/* SVG do Anel de Progresso */}
        <svg className="absolute inset-0 rotate-[-90deg] w-full h-full">
          {/* Círculo de Fundo (Track) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#2a2a2a"
            strokeWidth="6"
            fill="none"
          />
          {/* Círculo de Progresso (Indicator) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#ff6600"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-in-out"
          />
        </svg>

        {/* Imagem do Apresentador */}
        <div className="absolute inset-[10px] rounded-full overflow-hidden bg-[#1a1a1a]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Badge LIVE */}
        {isLive && (
          <span className="absolute bottom-1 right-1 bg-[#ff6600] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg animate-pulse">
            LIVE
          </span>
        )}
      </div>

      {/* Título do Programa */}
      <span className="mt-3 text-xs font-medium text-center text-white/80 uppercase tracking-tighter group-hover:text-white transition-colors">
        {title}
      </span>
    </div>
  );
}