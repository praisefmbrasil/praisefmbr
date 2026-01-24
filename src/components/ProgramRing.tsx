type ProgramRingProps = {
  title: string
  image: string
  progress: number // 0 a 100
  isLive?: boolean
}

export function ProgramRing({
  title,
  image,
  progress,
  isLive
}: ProgramRingProps) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center min-w-[120px]">
      <div className="relative w-28 h-28">
        {/* SVG do Anel de Progresso */}
        <svg className="absolute inset-0 rotate-[-90deg] w-full h-full">
          {/* Fundo do anel (trilho) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#2a2a2a"
            strokeWidth="6"
            fill="none"
          />
          {/* Progresso do anel (Praise Orange) */}
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
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>

        {/* Foto do Locutor/Programa */}
        <div className="absolute inset-2 overflow-hidden rounded-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badge de Status Ao Vivo */}
        {isLive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff6600] text-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border-2 border-black animate-pulse whitespace-nowrap">
            AO VIVO
          </div>
        )}
      </div>

      {/* Nome do Programa */}
      <span className="mt-3 text-[10px] font-bold text-center text-white uppercase tracking-widest leading-tight px-1">
        {title}
      </span>
    </div>
  )
}