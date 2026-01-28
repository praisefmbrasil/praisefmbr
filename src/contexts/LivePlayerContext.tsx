import React, { createContext, useContext, useRef, useState } from "react";

export type PlayerItemType =
  | "program"
  | "track"
  | "devotional"
  | "artist";

export interface PlayerItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  type: PlayerItemType;
}

interface LivePlayerContextType {
  isPlaying: boolean;
  currentItem: PlayerItem | null;
  audioRef: React.RefObject<HTMLAudioElement>;

  togglePlay: () => void;
  playTrack: (item: PlayerItem) => void;
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
  const [currentItem, setCurrentItem] = useState<PlayerItem | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying((p) => !p);
  };

  const playTrack = (item: PlayerItem) => {
    setCurrentItem(item);

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  return (
    <LivePlayerContext.Provider
      value={{
        isPlaying,
        currentItem,
        audioRef,
        togglePlay,
        playTrack,
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(LivePlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used inside LivePlayerProvider");
  }
  return ctx;
};
