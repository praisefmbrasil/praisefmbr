import React from "react";
import { Play, Pause } from "lucide-react";

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Live Now
          </p>
          <h4 className="font-semibold">Praise FM Brasil</h4>
        </div>

        {/* Controls */}
        <button
          onClick={onTogglePlayback}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ff6600] text-black hover:scale-105 transition"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>
      </div>
    </div>
  );
};

export default LivePlayerBar;
