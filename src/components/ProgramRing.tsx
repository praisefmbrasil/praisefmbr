type Program = {
  image: string
  title: string
}

interface ProgramRingProps {
  currentProgram: Program
}

export default function ProgramRing({ currentProgram }: ProgramRingProps) {
  return (
    <div className="relative w-[190px] h-[190px]">
      <svg
        viewBox="0 0 190 190"
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx="95"
          cy="95"
          r="88"
          stroke="#222"
          strokeWidth="8"
          fill="none"
        />

        <circle
          cx="95"
          cy="95"
          r="88"
          stroke="#ff6600"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="553"
          strokeDashoffset="140"
        />
      </svg>

      <div className="absolute inset-[12px] overflow-hidden rounded-full bg-black">
        <img
          src={currentProgram.image}
          alt={currentProgram.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[70px] h-[70px] rounded-full bg-black border-4 border-white flex items-center justify-center shadow-xl">
        <span className="text-[#ff6600] text-lg font-black uppercase leading-none text-center">
          AO
          <br />
          VIVO
        </span>
      </div>
    </div>
  )
}
