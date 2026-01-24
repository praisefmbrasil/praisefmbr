import React, { useState, useContext, useRef, useEffect, createContext } from 'react';
import { Play, Pause, Loader2, Volume2, Home, Calendar, ArrowRight, Zap } from 'lucide-react';

// ============ TYPES ============
interface PlayerContextData {
  isPlaying: boolean;
  isBuffering: boolean;
  volume: number;
  togglePlay: () => void;
  changeVolume: (value: number) => void;
  currentTrack: { artist: string; title: string };
}

interface Program {
  time: string;
  title: string;
  host: string;
  image: string;
  description: string;
}

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

// ============ CONTEXT ============
const PlayerContext = createContext<PlayerContextData | null>(null);

function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTrack] = useState({
    artist: 'with Praise FM Team',
    title: 'Praise FM Worship'
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv";

  useEffect(() => {
    const audio = new Audio(STREAM_URL);
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = '';
    };
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsBuffering(true);
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Erro ao reproduzir:', error);
      setIsBuffering(false);
    }
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, isBuffering, volume, togglePlay, changeVolume, currentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
}

const usePlayer = (): PlayerContextData => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};

// ============ SCHEDULE DATA ============
const SCHEDULE_DATA: { weekday: Program[]; sunday: Program[] } = {
  weekday: [
    { time: '00:00 - 06:00', title: 'Madrugada com Cristo', host: 'Samuel Andrade', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp', description: 'Louvores que acalmam a alma na sua madrugada.' },
    { time: '06:00 - 07:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Músicas de adoração para começar o dia.' },
    { time: '07:00 - 12:00', title: 'Manhã com Cristo', host: 'Lucas Martins', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp', description: 'Começando o dia com muita energia e louvor.' },
    { time: '12:00 - 13:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Momento de adoração ao meio-dia.' },
    { time: '13:00 - 16:00', title: 'Tarde Gospel', host: 'Rafael Costa', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp', description: 'As melhores músicas gospel da tarde.' },
    { time: '16:00 - 17:00', title: 'Praise FM Non Stop', host: 'Praise FM', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp', description: 'Músicas sem parar!' },
    { time: '17:00 - 18:00', title: 'Praise FM Nova Geração', host: 'Ana Paula', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp', description: 'Para a nova geração de adoradores.' },
    { time: '18:00 - 20:00', title: 'De Carona com a Praise FM', host: 'Bruno Almeida', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp', description: 'Acompanhe seu trajeto com muita música.' },
    { time: '20:00 - 21:00', title: 'Praise FM Live Show', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp', description: 'Show ao vivo toda quarta-feira!' },
    { time: '21:00 - 22:00', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp', description: 'Os clássicos do gospel brasileiro.' },
  ],
  sunday: [
    { time: '00:00 - 06:00', title: 'Madrugada com Cristo', host: 'Samuel Andrade', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp', description: 'Louvores que acalmam a alma na sua madrugada.' },
    { time: '07:00 - 12:00', title: 'Domingo com Cristo', host: 'Felipe Santos', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp', description: 'Domingo especial com muito louvor.' },
    { time: '20:00 - 21:00', title: 'Praise FM Pop', host: 'Thiago Moreira', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp', description: 'O melhor do pop gospel.' },
    { time: '22:00 - 23:00', title: 'Pregação da Palavra', host: 'Ministério', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp', description: 'Palavra de Deus para edificação.' },
  ]
};

// ============ NAVBAR ============
function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-white">PRAISE FM</span>
            <span className="text-[#ff6600] ml-2">USA</span>
          </h1>

          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 text-sm font-medium tracking-wider transition-colors ${
                activeSection === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home size={18} />
              HOME
            </button>
            <button
              onClick={() => onNavigate('schedule')}
              className={`flex items-center gap-2 text-sm font-medium tracking-wider transition-colors ${
                activeSection === 'schedule' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar size={18} />
              SCHEDULE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function HeroSection() {
  const { togglePlay, isPlaying, isBuffering } = usePlayer();
  const [currentProgram] = useState<Program>(SCHEDULE_DATA.weekday[9]);

  return (
    <section className="min-h-screen bg-black pt-20 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Horário */}
        <div className="text-center mb-10 mt-12">
          <p className="text-gray-500 text-sm tracking-wider font-medium">
            {currentProgram.time}
          </p>
        </div>

        {/* Layout Lado a Lado */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-start mb-16">
          
          {/* Imagem à Esquerda */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/10">
                <img 
                  src={currentProgram.image} 
                  alt={currentProgram.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Badge com número */}
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center border-2 border-white/20">
                <span className="text-white font-bold text-xl">1</span>
              </div>
            </div>
          </div>

          {/* Conteúdo à Direita */}
          <div className="text-left md:pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {currentProgram.title} with {currentProgram.host}
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              {currentProgram.description}
            </p>
            
            {/* Botão Play */}
            <button
              onClick={togglePlay}
              disabled={isBuffering}
              className="bg-[#ff6600] hover:bg-[#e65c00] text-white px-8 py-3 rounded text-base font-semibold flex items-center gap-3 disabled:opacity-70 transition-all"
            >
              {isBuffering ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : isPlaying ? (
                <>
                  <Pause size={20} fill="currentColor" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={20} fill="currentColor" />
                  Play
                </>
              )}
            </button>
          </div>

        </div>

        {/* Banner NEW MUSIC ALERT */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="text-[#ff6600]" size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">
                  NEW MUSIC ALERT
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  Fresh anthems dropping now
                </p>
              </div>
            </div>
            
            <button className="hidden md:flex items-center gap-2 text-white hover:text-[#ff6600] transition-colors text-sm font-bold tracking-wider uppercase">
              Explore All
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Rodapé Texto */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p className="italic mb-4">Ending the day in His presence.</p>
          <p className="text-xs uppercase tracking-widest">
            Produced by Praise FM USA for Praise FM Global.
          </p>
        </div>

      </div>
    </section>
  );
}

// ============ SCHEDULE ============
function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<'weekday' | 'sunday'>('weekday');
  const currentSchedule = SCHEDULE_DATA[activeTab];

  return (
    <section className="min-h-screen bg-black pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Schedule</h1>
          <p className="text-gray-400 text-lg">Check out our complete programming</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('weekday')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'weekday' ? 'bg-[#ff6600] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Monday - Saturday
          </button>
          <button
            onClick={() => setActiveTab('sunday')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'sunday' ? 'bg-[#ff6600] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Sunday
          </button>
        </div>

        <div className="space-y-4">
          {currentSchedule.map((program, index) => (
            <div key={index} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all group cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#ff6600] transition-colors flex-shrink-0">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-sm mb-2 font-medium">{program.time}</p>
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#ff6600] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 text-sm">with {program.host}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PLAYER BAR ============
function LivePlayerBar() {
  const { isPlaying, isBuffering, togglePlay, currentTrack, volume, changeVolume } = usePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between gap-6">
        
        {/* Info Esquerda */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 bg-[#ff6600] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">1</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#ff6600] rounded-full" />
              <span className="text-xs font-bold text-[#ff6600] uppercase tracking-wider">Ao Vivo</span>
            </div>
            <h3 className="text-base font-bold text-white truncate">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Botão Central */}
        <button
          onClick={togglePlay}
          disabled={isBuffering}
          className="w-14 h-14 bg-[#ff6600] hover:bg-[#e65c00] rounded-full flex items-center justify-center text-white transition-colors flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isBuffering ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" />
          )}
        </button>

        {/* Volume Direita */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ff6600]"
            aria-label="Volume"
          />
          <span className="text-xs text-gray-500 font-mono w-8">{Math.round(volume * 100)}</span>
        </div>

      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-black">
        <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
        {activeSection === 'home' && <HeroSection />}
        {activeSection === 'schedule' && <ScheduleSection />}
        <LivePlayerBar />
      </div>
    </PlayerProvider>
  );
}