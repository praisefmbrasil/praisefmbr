import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLiveMetadata } from '../hooks/useLiveMetadata';

interface PlayerContextData {
  isPlaying: boolean;
  isBuffering: boolean;
  volume: number;
  togglePlay: () => void;
  changeVolume: (value: number) => void;
  currentTrack: { artist: string; title: string };
}

const LivePlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const LivePlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const currentTrack = useLiveMetadata();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv";

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    const audio = audioRef.current;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsBuffering(true);
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <LivePlayerContext.Provider value={{ isPlaying, isBuffering, volume, togglePlay, changeVolume, currentTrack }}>
      {children}
    </LivePlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(LivePlayerContext);ipdate