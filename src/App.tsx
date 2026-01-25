import React, { RefObject } from 'react';
import { Program } from './types';

interface LiveMetadata {
  artist: string;
  title: string;
  artwork?: string;
  playedAt?: Date;
  isMusic?: boolean;
}

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  program: Program;
  liveMetadata: LiveMetadata | null;
  queue: Program[];
  audioRef: RefObject<HTMLAudioElement | null>;
}

export const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
  liveMetadata,
  queue,
  audioRef,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {liveMetadata?.artwork ? (
            <img src={liveMetadata.artwork} alt={liveMetadata.title} className="w-16 h-16 rounded-lg" />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {liveMetadata?.title || 'Título da Música'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {liveMetadata?.artist || 'Artista Desconhecido'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onTogglePlayback}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4v16l15-8z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => {}}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          aria-label="Próxima Música"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9v6l5-3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};