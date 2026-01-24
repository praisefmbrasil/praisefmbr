import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const SCHEDULE = {
  weekday: {
    day: 'Segunda a Sábado',
    programs: [
      { time: '00:00 - 06:00', title: 'Madrugada com Cristo', host: 'Samuel Andrade', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp' },
      { time: '06:00 - 07:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
      { time: '07:00 - 12:00', title: 'Manhã com Cristo', host: 'Lucas Martins', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp' },
      { time: '12:00 - 13:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
      { time: '13:00 - 16:00', title: 'Tarde Gospel', host: 'Rafael Costa', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp' },
      { time: '16:00 - 17:00', title: 'Praise FM Non Stop', host: 'Praise FM', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp' },
      { time: '17:00 - 18:00', title: 'Praise FM Nova Geração', host: 'Ana Paula', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp' },
      { time: '18:00 - 20:00', title: 'De Carona com a Praise FM', host: 'Bruno Almeida', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp' },
      { time: '20:00 - 21:00', title: 'Praise FM Live Show', host: 'Praise FM Team (Quarta)', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp' },
      { time: '21:00 - 22:00', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp' },
      { time: '22:00 - 00:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
    ]
  },
  sunday: {
    day: 'Domingo',
    programs: [
      { time: '00:00 - 06:00', title: 'Madrugada com Cristo', host: 'Samuel Andrade', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp' },
      { time: '06:00 - 07:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
      { time: '07:00 - 12:00', title: 'Domingo com Cristo', host: 'Felipe Santos', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp' },
      { time: '12:00 - 13:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
      { time: '13:00 - 16:00', title: 'Tarde Gospel', host: 'Rafael Costa', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp' },
      { time: '16:00 - 17:00', title: 'Praise FM Non Stop', host: 'Praise FM', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp' },
      { time: '17:00 - 18:00', title: 'Praise FM Nova Geração', host: 'Ana Paula', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp' },
      { time: '18:00 - 20:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
      { time: '20:00 - 21:00', title: 'Praise FM Pop', host: 'Thiago Moreira', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp' },
      { time: '21:00 - 22:00', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp' },
      { time: '22:00 - 23:00', title: 'Pregação da Palavra', host: 'Ministério', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp' },
      { time: '23:00 - 00:00', title: 'Praise FM Worship Brasil', host: 'Praise FM Team', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp' },
    ]
  }
};

export function Schedule() {
  const [activeTab, setActiveTab] = useState<'weekday' | 'sunday'>('weekday');
  const currentSchedule = SCHEDULE[activeTab];

  return (
    <section className="min-h-screen bg-black pt-24 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-praise-accent" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Programação
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Confira nossa grade completa de programas
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('weekday')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'weekday'
                ? 'bg-praise-accent text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Segunda a Sábado
          </button>
          <button
            onClick={() => setActiveTab('sunday')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'sunday'
                ? 'bg-praise-accent text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Domingo
          </button>
        </div>

        {/* Schedule Grid */}
        <div className="grid gap-4">
          {currentSchedule.programs.map((program, index) => (
            <div
              key={index}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 md:p-6 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4 md:gap-6">
                
                {/* Imagem */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20 group-hover:border-praise-accent transition-colors">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-praise-accent flex-shrink-0" size={16} />
                    <span className="text-gray-400 text-sm font-medium">
                      {program.time}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1 group-hover:text-praise-accent transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    com {program.host}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-praise-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}