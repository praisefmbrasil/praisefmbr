import { useEffect, useRef, useState } from "react";
import LivePlayerBar from "./components/LivePlayerBar"; // componente visual do player

const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv"; // Praise FM BRA

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Inicializa o áudio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL);
      audioRef.current.preload = "none"; // evita autoplay bug
      audioRef.current.crossOrigin = "anonymous";

      audioRef.current.addEventListener("play", () => setIsPlaying(true));
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    // Limpa ao desmontar
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Alterna play/pause
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
      {/* SEU SITE / ROTAS */}
      <main className="min-h-screen pb-[120px]">
        {/* conteúdo das páginas aqui */}
      </main>

      {/* PLAYER FIXO NA PARTE INFERIOR */}
      <LivePlayerBar
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        program={{
          id: "live",
          title: "Praise FM USA",
          host: "On Air",
          image: "/icon-512.png",
          startTime: "24/7",
          endTime: "Live",
        }}
      />
    </>
  );
}

export default App;
