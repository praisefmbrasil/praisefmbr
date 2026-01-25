// src/contexts/LivePlayerContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ Estrutura correta para liveMetadata
interface LiveMetadata {
  artist: string;
  title: string;
  artwork?: string;
}

interface LivePlayerContextType {
  isPlaying: boolean;
  isBuffering: boolean;
  togglePlay: () => void;
  currentTrack: LiveMetadata; // ✅ Tipo correto
  volume: number;
  changeVolume: (vol: number) => void;
}

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(undefined);

export const LivePlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTrack, setCurrentTrack] = useState<LiveMetadata>({
    artist: 'Praise FM Brasil',
    title: 'Rádio Cristã 24h',
    artwork: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp'
  });

  useEffect(() => {
    const savedVol = localStorage.getItem('praise-volume');
    if (savedVol) {
      setVolume(parseFloat(savedVol));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('praise-volume', volume.toString());
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (vol: number) => {
    setVolume(vol);
  };

  return (
    <LivePlayerContext.Provider
      value={{
        isPlaying,
        isBuffering,
        togglePlay,
        currentTrack,
        volume,
        changeVolume
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(LivePlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a LivePlayerProvider');
  }
  return context;
};