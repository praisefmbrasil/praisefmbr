// src/contexts/LivePlayerContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LivePlayerContextType {
  isPlaying: boolean;
  isBuffering: boolean;
  togglePlay: () => void;
  currentTrack: { title: string; artist: string };
  volume: number;
  changeVolume: (vol: number) => void;
}

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(undefined);

export const LivePlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTrack, setCurrentTrack] = useState({ 
    title: 'Praise FM Brasil', 
    artist: 'Rádio Cristã 24h' 
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