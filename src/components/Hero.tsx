import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, Pause, ChevronRight, Zap, ArrowRight, 
  ExternalLink, ChevronUp, ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../contexts/LivePlayerContext';
import { SCHEDULES } from '../constants';
import { Program } from '../types';

// Ajustado para o fuso horário de Brasília
const getBrazilInfo = () => {
  const now = new Date();
  const brazilString = now.toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo',
  });
  const brazilDate = new Date(brazilString);
  const h = brazilDate.getHours();
  const m = brazilDate.getMinutes();
  const day = brazilDate.getDay();
  return { day, totalMinutes: h * 60 + m };
};

const formatTime = (time24: string) => time24;

interface HeroProps {
  onNavigateToProgram: (program: Program) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToProgram }) => {
  const { isPlaying, togglePlay } = usePlayer();
  const [tick, setTick] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();

  // Atualiza o relógio interno a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const brazil = useMemo(() => getBrazilInfo(), [tick]);

  // Lógica para encontrar o programa atual e os próximos
  const { currentProgram, upNextPrograms } = useMemo(() => {
    const schedule = SCHEDULES[brazil.day] || SCHEDULES[1];
    const currentIndex = schedule.findIndex((p) => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end === 0 || end <= start) end = 24 * 60;
      return brazil.totalMinutes >= start && brazil.totalMinutes < end;
    });

    const current = currentIndex !== -1 ? schedule[currentIndex] : schedule[0];
    const next = schedule.slice(currentIndex + 1, currentIndex + 3);
    
    return { currentProgram: current, upNextPrograms: next };
  }, [brazil]);

  // Cálculo do progresso para o círculo SVG
  const progress = useMemo(() => {
    if (!currentProgram) return 0;
    const [sH, sM] = currentProgram.startTime.split(':').map(Number);
    const [eH, eM] = currentProgram.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    const elapsed = brazil.totalMinutes - start;
    const duration = end - start;
    return Math.min(Math.max(elapsed / duration, 0), 1);
  }, [currentProgram, brazil.totalMinutes]);

  if (!currentProgram) return null;

  // Configurações do Círculo
  const circleSize = 192;    
  const strokeWidth = 4;
  const center = circleSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <section className="bg-white dark:bg-[#000000] py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* LADO ESQUERDO: IMAGEM CIRCULAR COM PROGRESSO */}
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => onNavigateToProgram(currentProgram)}>
            <div className="relative rounded-full overflow-hidden" style={{ width: circleSize, height: circleSize }}>
              <img 
                src={currentProgram.image} 
                alt={currentProgram.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <svg width={circleSize} height={circleSize} className="absolute inset-0 -rotate-90 pointer-events-none">
                <circle cx={center} cy={center} r={radius} stroke="#dbdbdb" strokeWidth={strokeWidth} fill="transparent" className="dark:stroke-white/10" />
                <circle cx={center} cy={center} r={radius} stroke="#ff6600" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2 w-12 h-12 bg-black rounded-full flex items-center justify-center border-[3px] border-white dark:border-black shadow-lg text-white font-bold italic">
              1
            </div>
          </div>

          {/* LADO DIREITO: TEXTO E BOTÃO PLAY */}
          <div className="flex-grow pt-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-praise-accent font-bold uppercase tracking-widest text-[10px]">
              <span className="w-2 h-2 bg-praise-accent rounded-full animate-pulse" /> Ao Vivo
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-none">
              {currentProgram.title}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              {currentProgram.description}
            </p>

            <button 
              onClick={togglePlay}
              className="bg-[#ff6600] text-white px-10 py-4 flex items-center justify-center space-x-3 hover:bg-[#e65c00] transition-all active:scale-95 mx-auto md:mx-0 rounded-full shadow-lg"
            >
              {isPlaying ? <Pause className="fill-current w-6 h-6" /> : <Play className="fill-current w-6 h-6 ml-1" />}
              <span className="text-xl font-bold uppercase">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
            {upNextPrograms.map((prog) => (
              <div key={prog.id} className="flex items-start gap-4 group cursor-pointer" onClick={() => onNavigateToProgram(prog)}>
                <img src={prog.image} className="w-24 h-24 object-cover rounded shadow" alt={prog.title} />
                <div>
                  <span className="text-[10px] font-bold text-praise-accent uppercase">A Seguir</span>
                  <h3 className="text-xl font-bold dark:text-white group-hover:text-praise-accent">{prog.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{prog.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="mt-12 flex items-center gap-2 text-sm font-bold dark:text-white hover:text-praise-accent transition-colors"
        >
          {showDetails ? <>Ver menos <ChevronUp size={18} /></> : <>Ver mais <ChevronDown size={18} /></>}
        </button>
      </div>
    </section>
  );
};

export default Hero;