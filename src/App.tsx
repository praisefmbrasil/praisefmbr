import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
// ou LivePlayerBar se for esse o nome

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://stream.zeno.fm/olisuxy9v3vtv");
      audioRef.current.preload = "none";
      audioRef.current.crossOrigin = "anonymous";
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Erro ao tocar o stream:", err);
    }
  };

  return (
    <>
      {/* seu site */}
      <div className="min-h-screen pb-[80px]">
        {/* rotas / páginas aqui */}
      </div>

      {/* player global */}
      <Navbar
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        audioRef={audioRef}
      />
    </>
  );
}

export default App;
