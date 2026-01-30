import React, { useState, useEffect, useRef } from 'react';

const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv";
const METADATA_URL = "https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv";

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
  const [metadata, setMetadata] = useState({ title: "Carregando...", artist: "Praise FM Brasil" });
  const audioRef = useRef(new Audio(STREAM_URL));

  // Efeito para buscar metadados via SSE (Server-Sent Events)
  useEffect(() => {
    const eventSource = new EventSource(METADATA_URL);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.streamTitle) {
        const [artist, title] = data.streamTitle.split(" - ");
        setMetadata({ title: title || data.streamTitle, artist: artist || "Praise FM" });
      }
    };
    return () => eventSource.close();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500">
      
      {/* HEADER */}
      <header className="bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-yellow-500/20 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src="https://res.cloudinary.com" alt="Logo" className="h-12 md:h-16" />
          <div className="text-right hidden sm:block">
            <span className="inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></span>
            <span className="text-yellow-500 font-bold text-xs uppercase">Ao Vivo</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* PLAYER FUNCIONAL */}
        <section className="mb-12 bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] p-8 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className={`w-48 h-48 rounded-2xl overflow-hidden border-4 ${isPlaying ? 'border-yellow-500 animate-pulse' : 'border-zinc-700'}`}>
              <img src="https://res.cloudinary.com" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-yellow-500 font-bold text-sm tracking-[0.3em] mb-2 uppercase">Tocando Agora</h2>
            <h1 className="text-3xl md:text-5xl font-black mb-2 truncate">{metadata.title}</h1>
            <p className="text-zinc-400 text-xl mb-6">{metadata.artist}</p>
            
            <button 
              onClick={togglePlay}
              className="bg-yellow-500 hover:bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-yellow-500/20"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z""")/>></svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z""")/>></svg>
              )}
            </button>
          </div>
        </section>

        {/* TABELA DE PROGRAMAÇÃO */}
        <section className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          <div className="bg-yellow-500 p-4 text-black font-black text-center tracking-widest">PROGRAMAÇÃO 2026</div>
          <div className="divide-y divide-zinc-800">
            {PROGRAMACAO.map((item, i) => (
              <div key={i} className="p-5 flex justify-between items-center hover:bg-white/5 transition-colors">
                <div>
                  <div className="text-yellow-500 font-mono text-sm font-bold">{item.hora}</div>
                  <div className="text-lg font-bold">{item.prog}</div>
                </div>
                <div className="text-zinc-500 text-sm italic">{item.loc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-zinc-900 text-center opacity-50 grayscale">
        <img src="https://res.cloudinary.com" className="h-8 mx-auto mb-4" />
        <p className="text-xs tracking-widest">&copy; PRAISE FM BRASIL - O SOM DO CÉU NA TERRA</p>
      </footer>
    </div>
  );
}
