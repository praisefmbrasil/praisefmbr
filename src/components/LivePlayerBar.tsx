import { Play, Pause, Radio } from "lucide-react";
import { usePlayer } from "../contexts/LivePlayerContext";

const LivePlayerBar: React.FC = () => {
  const { isPlaying, togglePlay, currentItem } = usePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        
        {/* ▶️ Play / Pause */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ff6600] text-white hover:bg-white hover:text-black transition"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* 🎙️ Now Playing */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-12 h-12 bg-[#111] flex items-center justify-center rounded overflow-hidden">
            {currentItem?.image ? (
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Radio className="text-[#ff6600]" size={20} />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-[#ff6600]">
              {currentItem?.type === "track"
                ? "Now Playing"
                : currentItem?.type === "program"
                ? "Live Program"
                : "Praise FM Brasil"}
            </p>

            <p className="text-sm font-medium truncate">
              {currentItem?.title || "Praise FM Brasil — Ao Vivo"}
            </p>

            {currentItem?.subtitle && (
              <p className="text-xs text-gray-400 truncate">
                {currentItem.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 🔴 LIVE */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-red-500">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE
        </div>
      </div>
    </div>
  );
};

export default LivePlayerBar;
