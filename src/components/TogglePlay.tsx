import { Play, Pause } from "lucide-react";
import { usePlayer } from "../contexts/LivePlayerContext";

interface TogglePlayProps {
  size?: number;
  className?: string;
}

const TogglePlay: React.FC<TogglePlayProps> = ({
  size = 18,
  className = "",
}) => {
  const { isPlaying, togglePlay } = usePlayer();

  return (
    <button
      onClick={togglePlay}
      className={`flex items-center justify-center rounded-full bg-[#ff6600] text-white hover:bg-black transition ${className}`}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? (
        <Pause size={size} />
      ) : (
        <Play size={size} />
      )}
    </button>
  );
};

export default TogglePlay;
