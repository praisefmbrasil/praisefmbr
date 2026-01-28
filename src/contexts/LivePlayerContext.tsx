import { createContext, useContext } from "react";

export interface LiveProgram {
  id: string;
  title: string;
  host?: string;
  image?: string;
}

interface LivePlayerContextType {
  program: LiveProgram | null;
}

export const LivePlayerContext = createContext<LivePlayerContextType>({
  program: null,
});

export const useLivePlayer = () => useContext(LivePlayerContext);
