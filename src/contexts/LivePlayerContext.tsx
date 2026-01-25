import React, { createContext, useContext, useState, useEffect } from 'react';

interface LiveMetadata {
  artist: string;
  title: string;
  artwork?: string;
  url?: string; // Adicionado para suportar o link do áudio do podcast
}

interface LivePlayerContextType {
  isPlaying: boolean;
  isBuffering: boolean;
  togglePlay: () => void;
  playTrack: (track: LiveMetadata) => void; // Função para mudar a track/podcast
  currentTrack: LiveMetadata;
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
    if (savedVol) setVolume(parseFloat(savedVol));
  }, []);

  useEffect(() => {
    localStorage.setItem('praise-volume', volume.toString());
  }, [volume]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Define uma nova trilha e inicia a reprodução automaticamente
  const playTrack = (track: LiveMetadata) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // Aqui você integraria a mudança de source do seu elemento <audio> HTML5
  };

  const changeVolume = (vol: number) => setVolume(vol);

  return (
    <LivePlayerContext.Provider
      value={{
        isPlaying,
        isBuffering,
        togglePlay,
        playTrack,
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
  if (!context) throw new Error('usePlayer must be used within a LivePlayerProvider');
  return context;
};