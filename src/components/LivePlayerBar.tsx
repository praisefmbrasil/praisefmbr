import React from "react";

interface Program {
  id: string;
  title: string;
  host: string;
  image: string;
  startTime: string;
  endTime: string;
}

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  program: Program;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex items-center p-3 gap-4 shadow-lg z-50">
      {/* Imagem do programa */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Informações do programa */}
      <div className="flex-1 overflow-hidden">
        <div className="font-semibold text-sm truncate">{program.title}</div>
        <div className="text-xs text-gray-300 truncate">{program.host}</div>
        <div className="text-xs text-gray-400">
          {program.startTime} - {program.endTime}
        </div>
      </div>

      {/* Botão play/pause */}
      <button
        onClick={onTogglePlayback}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-colors"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Pause Icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Play Icon */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-6.518-3.758A1 1 0 007 8.24v7.52a1 1 0 001.234.97l6.518-1.758a1 1 0 000-1.72z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default LivePlayerBar;
