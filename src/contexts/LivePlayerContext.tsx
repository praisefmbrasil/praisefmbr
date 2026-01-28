import React, { createContext, useContext, useRef, useState } from "react";

export type PlayerItemType =
  | "program"
  | "track"
  | "devotional"
  | "artist";

export interface LivePlayerItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  type: PlayerItemType;
}

interface LivePlayerContextType {
  isPlaying: boolean;
  currentItem: LivePlayerItem | null;
  audioRef: React.RefObject<HTMLAudioElement>;

  play: (item: LivePlayerItem) => void;
  togglePlayback: () => void;
}

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(
  undefined
);

const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv";

export const LivePlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(STREAM_URL));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItem, setCurrentItem] = useState<LivePlayerItem | null>(null);

  const play = (item: LivePlayerItem) => {
    setCurrentItem(item);
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying((p) => !p);
  };

  return (
    <LivePlayerContext.Provider
      value={{
        isPlaying,
        currentItem,
        audioRef,
        play,
        togglePlayback,
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(LivePlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within LivePlayerProvider");
  return ctx;
};
