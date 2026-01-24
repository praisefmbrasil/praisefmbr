import React, { useState } from 'react';
import { Play, Pause, Loader2, Volume2, Home, Music, Calendar, Tv, BookOpen, Headphones, Sun, Moon, Clock, ChevronRight } from 'lucide-react';

// ============ CONTEXT ============
const PlayerContext = React.createContext(null);

function PlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTrack, setCurrentTrack] = useState({
    artist: 'Praise FM Team',
    title: 'Praise FM Brasil - Ao Vivo'
  });
  const audioRef = React.useRef(null);

  const STREAM_URL = "https://stream.zeno.fm/olisuxy9v3vtv";

  React.useEffect(() => {
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
  }, []);

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

  const changeVolume = (value) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, isBuffering, volume, togglePlay, changeVolume, currentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
}

const usePlayer = () => React.useContext(PlayerContext);

// ============ SCHEDULE DATA ============
const SCHEDULE_DATA = {
  weekday: [
    { time: '00:00 - 06:00', title: 'Madrugada com Cristo', host: 'Samuel Andrade', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp', description: 'Louvores que acalmam a alma.' },
    { time: '06:00 - 07:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Adoração para começar o dia.' },
    { time: '07:00 - 12:00', title: 'Manhã com Cristo', host: 'Lucas Martins', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp', description: 'Energia e louvor pela manhã.' },
    { time: '12:00 - 13:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Momento de adoração.' },
    { time: '13:00 - 16:00', title: 'Tarde Gospel', host: 'Rafael Costa', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp', description: 'As melhores da tarde.' },
    { time: '16:00 - 17:00', title: 'Praise FM Non Stop', host: 'Praise FM', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp', description: 'Músicas sem parar!' },
    { time: '17:00 - 18:00', title: 'Praise FM Nova Geração', host: 'Ana Paula', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp', description: 'Para os jovens adoradores.' },
    { time: '18:00 - 20:00', title: 'De Carona com a Praise FM', host: 'Bruno Almeida', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp', description: 'Seu trajeto com música.' },
    { time: '21:00 - 22:00', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp', description: 'Os clássicos do gospel.' },
  ],
  sunday: [
    { time: '00:00 - 06:00', title: 'Madrugada com Cristo', host: 'Samuel Andrade', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp', description: 'Louvores que acalmam a alma.' },
    { time: '07:00 - 12:00', title: 'Domingo com Cristo', host: 'Felipe Santos', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp', description: 'Domingo especial.' },
    { time: '20:00 - 21:00', title: 'Praise FM Pop', host: 'Thiago Moreira', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp', description: 'O melhor do pop gospel.' },
    { time: '22:00 - 23:00', title: 'Pregação da Palavra', host: 'Ministério', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp', description: 'Palavra de edificação.' },
  ]
};

// ============ NAVBAR ============
function Navbar({ activeSection, onNavigate }) {
  const menuItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'schedule', label: 'SCHEDULE', icon: Calendar },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-white">PRAISE FM</span>
            <span className="text-[#ff6600] ml-2">BRA</span>
          </h1>

          <div className="flex items-center gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-[#ff6600] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline text-xs font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function HeroSection() {
  const { togglePlay, isPlaying, isBuffering } = usePlayer();
  const [currentProgram, setCurrentProgram] = useState(SCHEDULE_DATA.weekday[2]);

  return (
    <section className="min-h-screen bg-black pt-24 pb-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm tracking-widest">{currentProgram.time}</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img src={currentProgram.image} alt={currentProgram.title} className="w-full h-full object-cover" />
            </div>
            {isPlaying && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ff6600] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                AO VIVO
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{currentProgram.title}</h1>
          <p className="text-gray-400 text-lg md:text-xl">{currentProgram.description}</p>
        </div>

        <div className="flex justify-center mb-16">
          <button
            onClick={togglePlay}
            disabled={isBuffering}
            className="bg-[#ff6600] hover:bg-[#e65c00] text-white px-12 py-4 rounded-lg text-lg font-bold flex items-center gap-3 disabled:opacity-70 shadow-2xl transition-all"
          >
            {isBuffering ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Carregando...
              </>
            ) : isPlaying ? (
              <>
                <Pause size={24} fill="currentColor" />
                Pause
              </>
            ) : (
              <>
                <Play size={24} fill="currentColor" />
                Play
              </>
            )}
          </button>
        </div>

        <div className="bg-gradient-to-r from-[#ff6600]/20 to-transparent border border-[#ff6600]/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ff6600] rounded-full flex items-center justify-center">
                <Music className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">NOVOS LANÇAMENTOS</h3>
                <p className="text-gray-400 text-sm">Músicas de adoração disponíveis agora</p>
              </div>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white hover:text-[#ff6600] transition-colors text-sm font-semibold">
              EXPLORAR
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SCHEDULE ============
function ScheduleSection() {
  const [activeTab, setActiveTab] = useState('weekday');
  const currentSchedule = SCHEDULE_DATA[activeTab];

  return (
    <section className="min-h-screen bg-black pt-24 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Programação</h1>
          <p className="text-gray-400 text-lg">Confira nossa grade completa</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('weekday')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'weekday' ? 'bg-[#ff6600] text-white' : 'bg-white/5 text-gray-400'
            }`}
          >
            Segunda a Sábado
          </button>
          <button
            onClick={() => setActiveTab('sunday')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'sunday' ? 'bg-[#ff6600] text-white' : 'bg-white/5 text-gray-400'
            }`}
          >
            Domingo
          </button>
        </div>

        <div className="grid gap-4">
          {currentSchedule.map((program, index) => (
            <div key={index} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 md:p-6 transition-all group">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#ff6600]">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-[#ff6600]" size={16} />
                    <span className="text-gray-400 text-sm">{program.time}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{program.title}</h3>
                  <p className="text-gray-400 text-sm">com {program.host}</p>
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
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-[#ff6600] rounded flex items-center justify-center">
            <Music className="text-white" size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#ff6600] rounded-full animate-pulse" />
              <span className="text-xs font-bold text-[#ff6600]">AO VIVO</span>
            </div>
            <h3 className="text-sm font-bold text-white truncate">{currentTrack.title}</h3>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          disabled={isBuffering}
          className="w-12 h-12 bg-[#ff6600] rounded-full flex items-center justify-center text-white"
        >
          {isBuffering ? <Loader2 className="w-6 h-6 animate-spin" /> : isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>

        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ff6600]"
          />
        </div>
      </div>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [activeSection, setActiveSection] = useState('home');

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