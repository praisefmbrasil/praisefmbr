import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRef } from "react";

import AppHomePage from "./pages/AppHomePage";
import LivePlayerBar from "./components/LivePlayerBar";
import { LivePlayerProvider, useLivePlayer } from "./contexts/LivePlayerContext";

function AppLayout() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    isPlaying,
    togglePlayback,
    currentProgram, // agora vem do context corretamente
  } = useLivePlayer();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Conteúdo principal */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AppHomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Player fixo estilo BBC */}
      <LivePlayerBar
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        audioRef={audioRef}
        program={currentProgram}
      />

      {/* Elemento de áudio real */}
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
