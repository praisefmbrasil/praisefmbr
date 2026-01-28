import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRef } from "react";

import AppHomePage from "./pages/AppHomePage";
import LivePlayerBar from "./components/LivePlayerBar";
import {
  LivePlayerProvider,
  useLivePlayer,
} from "./contexts/LivePlayerContext";

function AppLayout() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isPlaying, playPause, currentProgram } = useLivePlayer();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AppHomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <LivePlayerBar
        isPlaying={isPlaying}
        onTogglePlayback={playPause}
        audioRef={audioRef}
        program={currentProgram}
      />

      <audio
        ref={audioRef}
        src="https://stream.zeno.fm/hvwifp8ezc6tv"
        preload="none"
      />
    </div>
  );
}

export default function App() {
  return (
    <LivePlayerProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </LivePlayerProvider>
  );
}
