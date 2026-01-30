import React, { useState, useEffect, useRef } from 'react';

const STREAM_URL = "https://stream.zeno.fm";
const METADATA_URL = "https://api.zeno.fm";

const PROGRAMACAO = [
  { hora: "00:00 - 06:00", prog: "MADRUGADA COM CRISTO", loc: "Samuel Andrade" },
  { hora: "07:00 - 12:00", prog: "MANHÃ COM CRISTO", loc: "Lucas Martins" },
  { hora: "13:00 - 16:00", prog: "TARDE GOSPEL", loc: "Rafael Costa" },
  { hora: "17:00 - 18:00", prog: "PRAISE FM NOVA GERAÇÃO", loc: "Ana Paula" },
  { hora: "18:00 - 20:00", prog: "DE CARONA COM A PRAISE FM", loc: "Bruno Almeida" },
  { hora: "21:00 - 22:00", prog: "PRAISE FM BRASIL CLÁSSICOS", loc: "Rodrigo Veras" },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [metadata, setMetadata] = useState({ title: "Praise FM Brasil", artist: "Ao Vivo" });
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    
    const eventSource = new EventSource(METADATA_URL);
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.streamTitle) {
          const parts = data.streamTitle.split(" - ");
          setMetadata({ 
            title: parts[1] || data.streamTitle, 
            artist: parts[0] || "Praise FM" 
          });
        }
      } catch (e) {
        console.error("Erro nos metadados", e);
      }
    };

    return () => {
      eventSource.close();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Erro ao tocar:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-yellow-500/20 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src="https://res.cloudinary.com" alt="Logo" className="h-12 md:h-16" />
          <div className="text-right">
            <span className="inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></span>
            <span className="text-yellow-500 font-bold text-xs uppercase">Ao Vivo</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12 bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] p-8 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className={`w-48 h-48 rounded-2xl overflow-hidden border-4 transition-all duration-500 ${isPlaying ? 'border-yellow-500 scale-105' : 'border-zinc-700'}`}>
            <img src="https://res.cloudinary.com" className="w-full h-full object-cover" alt="Capa" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-yellow-500 font-bold text-sm tracking-widest mb-2 uppercase">Tocando Agora</h2>
            <h1 className="text-3xl md:text-5xl font-black mb-2 line-clamp-1">{metadata.title}</h1>
            <p className="text-zinc-400 text-xl mb-6">{metadata.artist}</p>
            
            <button 
              onClick={togglePlay}
              className="bg-yellow-500 hover:bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-yellow-500/20"
            >
              {isPlaying ? (
                <span className="text-2xl font-bold">||</span>
              ) : (
                <span className="text-3xl ml-1">▶</span>
              )}
            </button>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <div className="bg-yellow-500 p-4 text-black font-black text-center tracking-widest uppercase">Programação 2026</div>
          <div className="divide-y divide-zinc-800">
            {PROGRAMACAO.map((item, i) => (
              <div key={i} className="p-5 flex justify-between items-center hover:bg-white/5 transition-colors group">
                <div>
                  <div className="text-yellow-500 font-mono text-sm font-bold">{item.hora}</div>
                  <div className="text-lg font-bold group-hover:text-yellow-500 transition-colors">{item.prog}</div>
                </div>
                <div className="text-zinc-500 text-sm italic">{item.loc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 text-center opacity-50">
        <img src="https://res.cloudinary.com" className="h-8 mx-auto mb-4" alt="Footer Logo" />
        <p className="text-xs tracking-widest uppercase">&copy; 2026 Praise FM Brasil</p>
      </footer>
    </div>
  );
}
