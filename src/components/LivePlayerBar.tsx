import React from "react";
import { useLivePlayer } from "../contexts/LivePlayerContext";

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
}) => {
  const { currentProgram } = useLivePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase text-gray-400">On Air</p>
        <p className="text-sm font-semibold">
          {currentProgram?.title ?? "Praise FM Brasil"}
        </p>
        <p className="text-xs text-gray-500">
          {currentProgram?.host ?? "24/7 Gospel Music"}
        </p>
      </div>

      <button
        onClick={onTogglePlayback}
        className="bg-[#ff6600] text-black px-6 py-2 text-xs uppercase tracking-widest font-bold"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default LivePlayerBar;