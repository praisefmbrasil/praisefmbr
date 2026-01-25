import React, { RefObject } from 'react';
import { Program } from '../types';

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

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
  liveMetadata,
  queue,
  audioRef,
}) => {
  return (
    <div>
      {/* Your component JSX goes here */}
      <button onClick={onTogglePlayback}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      {/* Add more UI as needed */}
    </div>
  );
};

export default LivePlayerBar;