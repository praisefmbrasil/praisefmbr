import { createContext, useContext, useState } from "react";

export type LiveProgramType = "program" | "track" | "devotional" | "artist";

export interface LiveProgram {
  id: string;
  title: string;
  host?: string;
  image?: string;
  type: LiveProgramType;
}

export interface LivePlayerContextType {
  isPlaying: boolean;
  currentProgram: LiveProgram | null;
  playPause: () => void;
}

const LivePlayerContext = createContext<LivePlayerContextType | undefined>(
  undefined
);

export function LivePlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentProgram] = useState<LiveProgram | null>({
    id: "live",
    title: "Praise FM Live",
    host: "On Air",
    type: "program",
  });

  function playPause() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <LivePlayerContext.Provider
      value={{
        isPlaying,
        currentProgram,
        playPause,
      }}
    >
      {children}
    </LivePlayerContext.Provider>
  );
}

export function useLivePlayer() {
  const context = useContext(LivePlayerContext);
  if (!context) {
    throw new Error("useLivePlayer must be used within LivePlayerProvider");
  }
  return context;
}
