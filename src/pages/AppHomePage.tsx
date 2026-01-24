import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, Volume2, Home, Music, Calendar, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Importamos as constantes que já traduzimos anteriormente
import { SCHEDULES } from '../constants';

// Função para pegar hora de Brasília
const getBrasiliaTime = () => {
  const now = new Date();
  const brDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  return {
    hours: brDate.getHours(),
    minutes: brDate.getMinutes(),
    day: brDate.getDay(),
    totalMinutes: brDate.getHours() * 60 + brDate.getMinutes()
  };
};

const formatTimeBR = (time24: string) => {
  return `${time24}h`;
};

const AppHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(getBrasiliaTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getBrasiliaTime());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const todaySchedule = useMemo(() => {
    // Busca a programação baseada no dia da semana (0 = Domingo)
    return SCHEDULES[currentTime.day] || SCHEDULES[1];
  }, [currentTime.day]);

  const currentProgram = useMemo(() => {
    return todaySchedule.find((prog) => {
      const [sH, sM] = prog.startTime.split(':').map(Number);
      const [eH, eM] = prog.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end === 0 || end <= start) end = 24 * 60;
      return currentTime.totalMinutes >= start && currentTime.totalMinutes < end;
    });
  }, [todaySchedule, currentTime]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white pb-32">
      {/* Header Minimalista */}
      <header className="border-b border-gray-100 dark:border-white/5 py-5 px-6 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex space-x-1.5">
            {['P', 'F', 'M'].map((letter) => (
              <div key={letter} className="w-7 h-7 bg-[#ff6600] text-white font-black flex items-center justify-center text-xs">
                {letter}
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform"
          >
            EU
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Carrossel de Programas Estilo Story */}
        <section className="py-8">
          <div className="flex space-x-6 overflow-x-auto no-scrollbar px-6 pb-4">
            {todaySchedule.map((program) => {
              const isLive = currentProgram?.id === program.id;
              return (
                <div key={program.id} className="flex-shrink-0 group cursor-pointer" onClick={() => navigate('/schedule')}>
                  <div className={`w-32 h-32 md:w-40 md:h-40 overflow-hidden relative transition-all duration-500 ${isLive ? 'ring-4 ring-[#ff6600] ring-offset-4 dark:ring-offset-[#121212]' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}>
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    {isLive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#ff6600]/80 to-transparent flex items-end justify-center pb-2">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest animate-pulse">No Ar</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-left">
                    <p className={`text-[11px] font-bold uppercase truncate tracking-tight ${isLive ? 'text-[#ff6600]' : 'text-gray-400'}`}>
                      {isLive ? 'Tocando Agora' : formatTimeBR(program.startTime)}
                    </p>
                    <p className="text-sm font-medium truncate w-32 md:w-40">{program.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Info Rádio Principal */}
        <section className="px-6 py-8 border-y border-gray-100 dark:border-white/5">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">Praise FM Brasil</h1>
            {currentProgram && (
              <div className="flex items-center space-x-3 mb-8">
                <span className="w-3 h-3 bg-[#ff6600] rounded-full animate-ping" />
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                  {currentProgram.title} <span className="text-gray-300 dark:text-gray-600 mx-2">|</span> {currentProgram.host}
                </p>
              </div>
            )}
            <button 
              onClick={() => navigate('/schedule')}
              className="group border-2 border-black dark:border-white px-8 py-4 font-bold uppercase text-xs tracking-[0.2em] flex items-center space-x-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              <span>Grade de Programação</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* Tocadas Recentemente - Lista Minimalista */}
        <section className="px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold uppercase tracking-widest">Últimas Músicas</h2>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#ff6600]" onClick={() => navigate('/music')}>Ver tudo</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mockup de item de música */}
            <div className="flex items-center space-x-4 p-4 border border-gray-100 dark:border-white/5 group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-gray-400 group-hover:text-[#ff6600] transition-colors" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-sm uppercase truncate tracking-tight">Nome da Música</h3>
                <p className="text-xs text-gray-500 uppercase">Artista Exemplo</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-[#ff6600] group-hover:border-[#ff6600] transition-all"
              >
                <Play className="w-4 h-4 fill-current group-hover:text-white" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Mini Player Fixo Flutuante */}
      {isPlaying && (
        <div className="fixed bottom-24 left-4 right-4 bg-black dark:bg-white text-white dark:text-black p-4 flex items-center justify-between shadow-2xl z-40 border-l-4 border-[#ff6600]">
          <div className="flex items-center space-x-4 min-w-0">
            <div className="flex flex-col min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">No Ar Agora</p>
              <p className="font-bold text-sm truncate uppercase tracking-tight">
                {currentProgram?.title || 'Praise FM Brasil'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsPlaying(false)}
            className="w-12 h-12 flex items-center justify-center border-l border-white/20 dark:border-black/10 ml-4"
          >
            <Pause className="w-5 h-5 fill-current" />
          </button>
        </div>
      )}

      {/* Barra de Navegação Inferior (Mobile-First) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-6 py-4 z-50">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <NavButton icon={<Home size={20}/>} label="Início" active onClick={() => navigate('/app')} />
          <NavButton icon={<Music size={20}/>} label="Músicas" onClick={() => navigate('/music')} />
          <NavButton icon={<Calendar size={20}/>} label="Grade" onClick={() => navigate('/schedule')} />
          <NavButton icon={<User size={20}/>} label="Perfil" onClick={() => navigate('/profile')} />
          <NavButton icon={<Search size={20}/>} label="Busca" />
        </div>
      </nav>
    </div>
  );
};

// Sub-componente para os botões da Nav para manter o código limpo
const NavButton = ({ icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-colors ${active ? 'text-[#ff6600]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

export default AppHomePage;