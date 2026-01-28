import React, { createContext, useContext, useState } from "react";

/* =========================
   Types
========================= */

export type MediaType =
  | "program"
  | "track"
  | "devotional"
  | "artist";

export interface LiveProgram {
  id: string;
  title: string;
  host?: string;
  image?: string;
  type: MediaType;
}

/* =========================
   Context Type
========================= */

interface LivePlayerContextType {
  isPlaying: boolean;
  currentProgram: LiveProgram | null;
  play: (program?: LiveProgram) => void;
  pause: () => void;
  setCurrentProgram: (program: LiveProgram | null) => void;
}

/* =========================
   Context
========================= */

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(
  undefined
);

/* =========================
   Provider
========================= */

export const LivePlayerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] =
    useState<LiveProgram | null>(null);

  const play = (program?: LiveProgram) => {
    if (program) {
      setCurrentProgram(program);
    }
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  return (
    <LivePlayerContext.Provider
      value={{
        isPlaying,
        currentProgram,
        play,
        pause,
        setCurrentProgram,
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

/* =========================
   Hook
========================= */

export const useLivePlayer = () => {
  const context = useContext(LivePlayerContext);
  if (!context) {
    throw new Error(
      "useLivePlayer must be used within a LivePlayerProvider"
    );
  }
  return context;
};
