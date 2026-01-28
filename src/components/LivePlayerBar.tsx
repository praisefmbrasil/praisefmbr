import { RefObject } from "react";
import { LiveProgram } from "../contexts/LivePlayerContext";

export interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  program: LiveProgram | null;
}

export default function LivePlayerBar({
  isPlaying,
  onTogglePlayback,
  audioRef,
  program,
}: LivePlayerBarProps) {
  return (
    <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold">
          {program?.title ?? "Praise FM"}
        </p>
        <p className="text-xs text-neutral-400">
          {program?.host ?? "Live Radio"}
        </p>
      </div>

      <button
        onClick={() => {
          if (!audioRef.current) return;

          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }

          onTogglePlayback();
        }}
        className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
