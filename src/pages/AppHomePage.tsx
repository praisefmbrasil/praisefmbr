import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, Volume2, Home, Music, Calendar, User, Search } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import { SCHEDULES } from '../constants';

const getBrasiliaTime = () => {
  const now = new Date();
  const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  return {
    day: brasiliaDate.getDay(),
    totalMinutes: brasiliaDate.getHours() * 60 + brasiliaDate.getMinutes()
  };
};

const AppHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(getBrasiliaTime());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getBrasiliaTime()), 30000);
    return () => clearInterval(timer);
  }, []);

  const todaySchedule = useMemo(() => {
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pb-32">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-white/10 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-[#ff6600] text-black px-2 py-1 rounded font-black italic">PRAISE FM</div>
          <span className="text-[10px] font-bold uppercase opacity-50">Brasil</span>
        </div>
        <button onClick={() => navigate('/my-sounds')} className="w-10 h-10 rounded-full bg-[#ff6600] text-black flex items-center justify-center font-bold">P</button>
      </header>

      {/* Carrossel com o Número 2 solicitado */}
      <section className="py-6 overflow-x-auto no-scrollbar flex space-x-4 px-4">
        {todaySchedule.map((program) => {
          const isLive = currentProgram?.id === program.id;
          return (
            <div key={program.id} className="flex-shrink-0 relative group">
              <div className={`w-40 h-40 rounded-full overflow-hidden border-4 transition-all ${isLive ? 'border-[#ff6600] scale-105' : 'border-transparent shadow-lg'}`}>
                <img src={program.image} alt="" className={`w-full h-full object-cover ${isLive ? '' : 'grayscale'}`} />
                {/* Bolinha com número 2 */}
                <div className="absolute bottom-2 right-2 w-9 h-9 bg-black rounded-full flex items-center justify-center border-2 border-[#ff6600]">
                  <span className="text-[#ff6600] text-sm font-black">2</span>
                </div>
              </div>
              {isLive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff6600] text-black px-3 py-0.5 text-[9px] font-black rounded-full">NO AR</div>}
              <div className="text-center mt-6 w-40">
                <p className="text-[11px] font-bold uppercase truncate">{program.title}</p>
                <p className="text-[10px] opacity-50">{program.startTime} - {program.endTime}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Info */}
      <section className="px-6 py-8 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Praise FM Brasil</h1>
        <p className="text-gray-500 my-4 font-medium">{currentProgram?.title} com {currentProgram?.host}</p>
        <button onClick={() => navigate('/schedule')} className="border-2 border-[#ff6600] text-[#ff6600] px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#ff6600] hover:text-black transition-all rounded-sm flex items-center mx-auto space-x-2">
          <span>Estações e Horários</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* Player Fixo */}
      {isPlaying && (
        <div className="fixed bottom-20 left-4 right-4 bg-[#ff6600] text-black p-4 flex items-center justify-between rounded-lg shadow-2xl z-50">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-2 h-2 bg-black rounded-full animate-ping" />
            <div className="truncate">
              <p className="font-black text-xs uppercase truncate">{currentProgram?.title}</p>
              <p className="text-[10px] font-bold opacity-70">AO VIVO</p>
            </div>
          </div>
          <button onClick={() => setIsPlaying(false)} className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
            <Pause className="w-4 h-4 fill-current" />
          </button>
        </div>
      )}

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5 flex justify-around py-3 z-50">
        <NavItem to="/app" icon={<Home size={22} />} label="Início" />
        <NavItem to="/music" icon={<Music size={22} />} label="Música" />
        <NavItem to="/schedule" icon={<Calendar size={22} />} label="Agenda" />
        <NavItem to="/my-sounds" icon={<User size={22} />} label="Perfil" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label }: any) => (
  <NavLink to={to} className={({ isActive }) => `flex flex-col items-center space-y-1 ${isActive ? 'text-[#ff6600]' : 'text-gray-400'}`}>
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
  </NavLink>
);

export default AppHomePage;