import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // cria o áudio UMA ÚNICA VEZ
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://stream.zeno.fm/olisuxy9v3vtv");
      audioRef.current.preload = "none";
      audioRef.current.crossOrigin = "anonymous";

      // 🔑 sincroniza estado com o áudio REAL
      audioRef.current.addEventListener("play", () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener("error", (e) => {
        console.error("Erro no stream:", e);
        setIsPlaying(false);
      });
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // play / pause controlado
  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play(); // iOS exige clique
      } else {
        audioRef.current.pause();
      }
    } catch (err) {
      console.error("Falha ao tocar o stream:", err);
    }
  };

  return (
    <>
      {/* CONTEÚDO DA PÁGINA (evita tela branca) */}
      <main className="min-h-screen pb-[90px] flex items-center justify-center bg-white dark:bg-black">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Praise FM Brasil
        </h1>
      </main>

      {/* NAVBAR / PLAYER GLOBAL */}
      <Navbar
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        audioRef={audioRef}
      />
    </>
  );
}

export default App;
