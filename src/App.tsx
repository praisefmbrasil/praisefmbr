import { useEffect, useRef, useState } from "react";
import LivePlayerBar from "./components/LivePlayerBar";

// ✅ Corrigido: sem espaços extras
const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv"; // Praise FM BRASIL

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL);
      audioRef.current.preload = "none";
      audioRef.current.crossOrigin = "anonymous";

      audioRef.current.addEventListener("play", () => setIsPlaying(true));
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.error("Erro ao tocar stream:", err);
    }
  };

  return (
    <>
      <main className="min-h-screen pb-[120px]">
        {/* conteúdo das páginas aqui */}
      </main>

      <LivePlayerBar
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        program={{
          id: "live",
          title: "Praise FM Brasil", // ✅ Corrigido
          host: "Ao Vivo 24h",
          image: "/icon-512.png",
          startTime: "24/7",
          endTime: "AO VIVO",
        }}
      />
    </>
  );
}

export default App;