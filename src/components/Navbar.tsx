import React from "react";
import { Play, Pause } from "lucide-react";

interface NavbarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const Navbar: React.FC<NavbarProps> = ({
  isPlaying,
  onTogglePlayback,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-white/10">
      <div className="flex items-center justify-between px-5 py-3">
        {/* INFO */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-black dark:text-white truncate">
            Praise FM Brasil
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            Louvores 24h no ar
          </span>
        </div>

        {/* BOTÃO PLAY / PAUSE */}
        <button
          onClick={onTogglePlayback}
          className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-md active:scale-95 transition"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white dark:text-black fill-current" />
          ) : (
            <Play className="w-6 h-6 text-white dark:text-black fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* BARRA LIVE */}
      <div className="flex items-center justify-center pb-2">
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 bg-[#00d9c9] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-[#00d9c9] tracking-widest">
            LIVE
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
