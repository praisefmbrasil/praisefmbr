import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLiveMetadata } from '../Hook/useLiveMetadata';

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
    // Criar o elemento de áudio UMA VEZ
    const audio = new Audio(STREAM_URL);
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    // Event listeners
    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Erro no áudio:', e);
      setIsBuffering(false);
      setIsPlaying(false);
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Cleanup
    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsBuffering(true);
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Erro ao reproduzir:', error);
      setIsBuffering(false);
      setIsPlaying(false);
    }
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return (
    <LivePlayerContext.Provider 
      value={{ 
        isPlaying, 
        isBuffering, 
        volume, 
        togglePlay, 
        changeVolume, 
        currentTrack 
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(LivePlayerContext);