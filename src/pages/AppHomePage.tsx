type Program = { image: string; title: string; [key: string]: unknown };

const HeroRing: React.FC<{ program: Program; nowMinutes: number }> = ({
  program,
  nowMinutes,
}) => {
  const SIZE = 210;
  const STROKE = 8;
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - getProgress(program, nowMinutes) * circumference;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke="#252525"
          strokeWidth={STROKE}
          fill="none"
        />

        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke="#ff6600"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>

      <div className="absolute inset-[14px] rounded-full overflow-hidden bg-black">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-1 right-1 w-[62px] h-[62px] rounded-full bg-black border-[4px] border-white flex items-center justify-center shadow-xl z-10">
        <span className="text-white text-[26px] font-black leading-none">
          4
        </span>
      </div>
    </div>
  );
};

function getProgress(program: Program, nowMinutes: number): number {
  const start =
    typeof program.start === "number"
      ? program.start
      : typeof program.startMinutes === "number"
      ? program.startMinutes
      : typeof program.from === "number"
      ? program.from
      : 0;

  const end =
    typeof program.end === "number"
      ? program.end
      : typeof program.endMinutes === "number"
      ? program.endMinutes
      : typeof program.to === "number"
      ? program.to
      : start;

  const duration = end - start;
  if (duration <= 0) {
    return 0;
  }

  const progress = (nowMinutes - start) / duration;
  return Math.min(Math.max(progress, 0), 1);
}
