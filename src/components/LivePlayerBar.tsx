import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface LivePlayerBarProps {
  streamUrl: string;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({ streamUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else await audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="live-player-bar">
      <audio ref={audioRef} src={streamUrl} preload="none" />
      <button onClick={togglePlayback}>{isPlaying ? <Pause /> : <Play />}</button>
      <span>On Air: Praise FM Brasil</span>
    </div>
  );
};

export default LivePlayerBar;
