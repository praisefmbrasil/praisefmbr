import React, { useEffect, useState } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { usePlayer } from '../contexts/LivePlayerContext';

// Programação completa baseada no documento
const SCHEDULE = {
  weekday: [
    { id: 1, title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp', description: 'Louvores que acalmam a alma na sua madrugada.' },
    { id: 2, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '06:00', endTime: '07:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Músicas de adoração para começar o dia.' },
    { id: 3, title: 'Manhã com Cristo', host: 'Lucas Martins', startTime: '07:00', endTime: '12:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp', description: 'Começando o dia com muita energia e louvor.' },
    { id: 4, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '12:00', endTime: '13:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Momento de adoração ao meio-dia.' },
    { id: 5, title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp', description: 'As melhores músicas gospel da tarde.' },
    { id: 6, title: 'Praise FM Non Stop', host: 'Praise FM', startTime: '16:00', endTime: '17:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp', description: 'Músicas sem parar!' },
    { id: 7, title: 'Praise FM Nova Geração', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp', description: 'Para a nova geração de adoradores.' },
    { id: 8, title: 'De Carona com a Praise FM', host: 'Bruno Almeida', startTime: '18:00', endTime: '20:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp', description: 'Acompanhe seu trajeto com muita música.' },
    { id: 9, title: 'Praise FM Live Show', host: 'Praise FM Team', startTime: '20:00', endTime: '21:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp', description: 'Show ao vivo toda quarta-feira!' },
    { id: 10, title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp', description: 'Os clássicos do gospel brasileiro.' },
    { id: 11, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '22:00', endTime: '00:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Encerrando o dia em adoração.' },
  ],
  sunday: [
    { id: 1, title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp', description: 'Louvores que acalmam a alma na sua madrugada.' },
    { id: 2, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '06:00', endTime: '07:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Músicas de adoração para começar o dia.' },
    { id: 3, title: 'Domingo com Cristo', host: 'Felipe Santos', startTime: '07:00', endTime: '12:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp', description: 'Domingo especial com muito louvor.' },
    { id: 4, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '12:00', endTime: '13:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Momento de adoração ao meio-dia.' },
    { id: 5, title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp', description: 'As melhores músicas gospel da tarde.' },
    { id: 6, title: 'Praise FM Non Stop', host: 'Praise FM', startTime: '16:00', endTime: '17:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp', description: 'Músicas sem parar!' },
    { id: 7, title: 'Praise FM Nova Geração', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp', description: 'Para a nova geração de adoradores.' },
    { id: 8, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '18:00', endTime: '20:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Adoração dominical.' },
    { id: 9, title: 'Praise FM Pop', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp', description: 'O melhor do pop gospel.' },
    { id: 10, title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp', description: 'Os clássicos do gospel brasileiro.' },
    { id: 11, title: 'Pregação da Palavra', host: 'Ministério', startTime: '22:00', endTime: '23:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp', description: 'Palavra de Deus para edificação.' },
    { id: 12, title: 'Praise FM Worship Brasil', host: 'Praise FM Team', startTime: '23:00', endTime: '00:00', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp', description: 'Encerrando o domingo em adoração.' },
  ]
};

export function HeroUSAStyle() {
  const { togglePlay, isPlaying, isBuffering } = usePlayer();
  const [currentProgram, setCurrentProgram] = useState(SCHEDULE.weekday[0]);

  useEffect(() => {
    const updateCurrentProgram = () => {
      const now = new Date();
      const day = now.getDay();
      const time = now.getHours() * 60 + now.getMinutes();
      
      const todaySchedule = day === 0 ? SCHEDULE.sunday : SCHEDULE.weekday;
      
      const current = todaySchedule.find(p => {
        const [startH, startM] = p.startTime.split(':').map(Number);
        const [endH, endM] = p.endTime.split(':').map(Number);
        const start = startH * 60 + startM;
        const end = (endH === 0 ? 24 : endH) * 60 + endM;
        return time >= start && time < end;
      });
      
      if (current) setCurrentProgram(current);
    };
    
    updateCurrentProgram();
    const interval = setInterval(updateCurrentProgram, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-black pt-24 pb-32 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Horário do Programa */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm tracking-widest">
            {currentProgram.startTime} - {currentProgram.endTime}
          </p>
        </div>

        {/* Imagem Circular do Programa */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img
                src={currentProgram.image}
                alt={currentProgram.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badge "AO VIVO" */}
            {isPlaying && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-praise-accent text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                AO VIVO
              </div>
            )}
          </div>
        </div>

        {/* Título do Programa */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
            {currentProgram.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            {currentProgram.description}
          </p>
        </div>

        {/* Botão Play/Pause Grande */}
        <div className="flex justify-center mb-16">
          <button
            onClick={togglePlay}
            disabled={isBuffering}
            className="bg-praise-accent hover:bg-[#e65c00] text-white px-12 py-4 rounded-lg text-lg font-bold tracking-wider transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-70 shadow-2xl"
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

        {/* Banner "NEW MUSIC ALERT" */}
        <div className="bg-gradient-to-r from-praise-accent/20 to-transparent border border-praise-accent/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-praise-accent rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                  NOVOS LANÇAMENTOS
                </h3>
                <p className="text-gray-400 text-sm">
                  Músicas de adoração disponíveis agora
                </p>
              </div>
            </div>
            
            <button className="hidden md:flex items-center gap-2 text-white hover:text-praise-accent transition-colors text-sm font-semibold tracking-wider">
              EXPLORAR TUDO
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}