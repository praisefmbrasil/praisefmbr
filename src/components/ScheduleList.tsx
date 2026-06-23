import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Program } from '../types';

interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack?: () => void;
}

// ---------------------------------------------------------------------------
// Imagens
// ---------------------------------------------------------------------------

const IMG = {
  SAMUEL_ANDRADE: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/samuel_andrade_k3botd.webp',
  LUCAS_MARTINS:  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/lucas_martins_qmdc5s.webp',
  RAFAEL_COSTA:   'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/rafael_costa_qxzwrf.webp',
  ANA_PAULA:      'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/ana_paula_wjuwju.webp',
  BRUNO_ALMEIDA:  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/bruno_almeida_hfmekk.webp',
  RODRIGO_VERAS:  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/rodrigo_veras_esognm.webp',
  PATRICK_SILVA:  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/patick_silva_r4lpvp.webp',
  CESAR_BRUM:     'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/cesar_brum_auudhy.webp',
  JANAINA_COSTA:  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/ana_paula_wjuwju.webp',
  WORSHIP_BR:     'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/worship_pck4vy.webp',
  PREGACAO:       'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/pregacao_da_palavra_leapde.webp',
};

// ---------------------------------------------------------------------------
// Programação Praise FM Brasil 2026
// ---------------------------------------------------------------------------

const SCHEDULE_BRASIL: Record<number, Program[]> = {
  // Domingo (0)
  0: [
    { id: 'br-d-1',  title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'A presença de Deus na madrugada.',              image: IMG.SAMUEL_ANDRADE },
    { id: 'br-d-2',  title: 'Worship',              host: '',               startTime: '06:00', endTime: '07:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
    { id: 'br-d-3',  title: 'Domingo com Cristo',   host: 'Janaina Costa',  startTime: '07:00', endTime: '12:00', description: 'Um domingo abençoado para toda a família.',     image: IMG.JANAINA_COSTA },
    { id: 'br-d-4',  title: 'Worship',              host: '',               startTime: '12:00', endTime: '13:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
    { id: 'br-d-5',  title: 'Tarde Gospel',         host: 'Rafael Costa',   startTime: '13:00', endTime: '16:00', description: 'O melhor do gospel na tarde de domingo.',       image: IMG.RAFAEL_COSTA },
    { id: 'br-d-6',  title: 'Praise FM Rock',       host: 'Cesar Brum',     startTime: '16:00', endTime: '17:00', description: 'Rock cristão de alto impacto.',                 image: IMG.CESAR_BRUM },
    { id: 'br-d-7',  title: 'Nova Geração',         host: 'Ana Paula',      startTime: '17:00', endTime: '18:00', description: 'Música e mensagem para a nova geração.',        image: IMG.ANA_PAULA },
    { id: 'br-d-8',  title: 'Worship',              host: '',               startTime: '18:00', endTime: '20:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
    { id: 'br-d-9',  title: 'Pregação da Palavra',  host: '',               startTime: '20:00', endTime: '21:00', description: 'A Palavra de Deus para edificação da sua vida.',image: IMG.PREGACAO },
    { id: 'br-d-10', title: 'Clássicos',            host: 'Rodrigo Veras',  startTime: '21:00', endTime: '22:00', description: 'Os maiores clássicos do gospel nacional.',      image: IMG.RODRIGO_VERAS },
    { id: 'br-d-11', title: 'Worship',              host: '',               startTime: '22:00', endTime: '00:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
  ],
  // Segunda a Sábado (1–6) — mesma grade
  ...Object.fromEntries(
    [1, 2, 3, 4, 5, 6].map((day) => [
      day,
      [
        { id: `br-${day}-1`,  title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'A presença de Deus na madrugada.',              image: IMG.SAMUEL_ANDRADE },
        { id: `br-${day}-2`,  title: 'Worship',              host: '',               startTime: '06:00', endTime: '07:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
        { id: `br-${day}-3`,  title: 'Manhã com Cristo',     host: 'Lucas Martins',  startTime: '07:00', endTime: '12:00', description: 'Comece seu dia com fé e alegria.',              image: IMG.LUCAS_MARTINS },
        { id: `br-${day}-4`,  title: 'Worship',              host: '',               startTime: '12:00', endTime: '13:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
        { id: `br-${day}-5`,  title: 'Tarde Gospel',         host: 'Rafael Costa',   startTime: '13:00', endTime: '16:00', description: 'O melhor do gospel na sua tarde.',              image: IMG.RAFAEL_COSTA },
        { id: `br-${day}-6`,  title: 'Nova Geração',         host: 'Ana Paula',      startTime: '16:00', endTime: '17:00', description: 'Música e mensagem para a nova geração.',        image: IMG.ANA_PAULA },
        { id: `br-${day}-7`,  title: 'Praise FM Flow',       host: 'Patrick Silva',  startTime: '17:00', endTime: '18:00', description: 'O flow do gospel contemporâneo.',               image: IMG.PATRICK_SILVA },
        { id: `br-${day}-8`,  title: 'De Carona',            host: 'Bruno Almeida',  startTime: '18:00', endTime: '20:00', description: 'Sua trilha sonora no caminho para casa.',       image: IMG.BRUNO_ALMEIDA },
        { id: `br-${day}-9`,  title: 'Praise FM Rock',       host: 'Cesar Brum',     startTime: '20:00', endTime: '21:00', description: 'Rock cristão de alto impacto.',                 image: IMG.CESAR_BRUM },
        { id: `br-${day}-10`, title: 'Clássicos',            host: 'Rodrigo Veras',  startTime: '21:00', endTime: '22:00', description: 'Os maiores clássicos do gospel nacional.',      image: IMG.RODRIGO_VERAS },
        { id: `br-${day}-11`, title: 'Worship',              host: '',               startTime: '22:00', endTime: '00:00', description: 'Louvor e adoração sem interrupção.',            image: IMG.WORSHIP_BR },
      ] as Program[],
    ])
  ),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getBrasiliaDate = (base: Date = new Date()) =>
  new Date(base.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

const format24h = (time: string) => time; // Já está em 24h

const DAY_ABBR = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

// ---------------------------------------------------------------------------
// Progress ring (sem foto — usa ícone genérico quando image está vazio)
// ---------------------------------------------------------------------------

const ProgramProgressRing: React.FC<{
  program: Program;
  isActive: boolean;
  nowMinutes: number;
}> = ({ program, isActive, nowMinutes }) => {
  const progress = useMemo(() => {
    if (!isActive) return 0;
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    return Math.min(Math.max((nowMinutes - start) / (end - start), 0), 1);
  }, [program, isActive, nowMinutes]);

  const innerSize = 96;
  const strokeWidth = 3;
  const radius = innerSize / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center bg-[#f2f2f2] dark:bg-[#1a1a1a] p-3 group-hover:scale-105 transition-transform duration-500">
      <div className="relative rounded-full overflow-hidden" style={{ width: innerSize, height: innerSize }}>
        {program.image ? (
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-[#222] text-[#ff6600] text-2xl font-black select-none">
            {program.title.charAt(0)}
          </div>
        )}
        <svg
          width={innerSize}
          height={innerSize}
          className="absolute inset-0 -rotate-90 pointer-events-none"
        >
          <circle cx={innerSize / 2} cy={innerSize / 2} r={radius} stroke="#2a2a2a" strokeWidth={strokeWidth} fill="transparent" className="dark:stroke-white/10" />
          {isActive && (
            <circle
              cx={innerSize / 2} cy={innerSize / 2} r={radius}
              stroke="#ff6600" strokeWidth={strokeWidth} fill="transparent"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="butt" className="transition-all duration-1000"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

const ScheduleList: React.FC<ScheduleListProps> = ({ onNavigateToProgram, onBack }) => {
  const [now, setNow] = useState(getBrasiliaDate());
  const [selectedDay, setSelectedDay] = useState(getBrasiliaDate().getDay());
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(getBrasiliaDate()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const weekDays = useMemo(() => {
    const today = getBrasiliaDate();
    const currentDay = today.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + i);
      return {
        value: i,
        dayLabel: DAY_ABBR[i],
        dateLabel: date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).toUpperCase(),
        fullLabel: date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }),
        isToday: i === currentDay,
        isSunday: i === 0,
      };
    });
  }, [now]);

  const selectedDayInfo = weekDays.find((d) => d.value === selectedDay) ?? weekDays[0];

  const currentSchedule = useMemo(
    () => SCHEDULE_BRASIL[selectedDay] ?? SCHEDULE_BRASIL[1],
    [selectedDay]
  );

  const sections = useMemo(() => {
    const groups: Record<string, Program[]> = {
      MADRUGADA: [],
      MANHÃ: [],
      TARDE: [],
      NOITE: [],
      'NOITE TARDE': [],
    };
    currentSchedule.forEach((prog) => {
      const h = parseInt(prog.startTime.split(':')[0], 10);
      if (h < 6)       groups['MADRUGADA'].push(prog);
      else if (h < 12) groups['MANHÃ'].push(prog);
      else if (h < 18) groups['TARDE'].push(prog);
      else if (h < 22) groups['NOITE'].push(prog);
      else             groups['NOITE TARDE'].push(prog);
    });
    return groups;
  }, [currentSchedule]);

  const isLiveNow = (startStr: string, endStr: string) => {
    if (selectedDay !== now.getDay()) return false;
    const [sH, sM] = startStr.split(':').map(Number);
    const [eH, eM] = endStr.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return nowMinutes >= start && nowMinutes < end;
  };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  useEffect(() => {
    if (selectedDay !== now.getDay()) return;
    const t = setTimeout(() => {
      document.querySelector('[data-live="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    return () => clearTimeout(t);
  }, [selectedDay, now]);

  const SECTION_LABELS: Record<string, string> = {
    MADRUGADA: 'Madrugada',
    MANHÃ: 'Manhã',
    TARDE: 'Tarde',
    NOITE: 'Noite',
    'NOITE TARDE': 'Noite Tarde',
  };

  return (
    <section
      ref={listContainerRef}
      className="bg-white dark:bg-[#000] min-h-screen font-sans transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-[#ff6600] transition-colors mb-6 text-xs font-normal uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Início
          </button>
        )}

        {/* Cabeçalho */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 mb-6 border-b-4 border-black dark:border-white pb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-none">
              Programação
            </h1>
            <p className="text-gray-400 font-normal uppercase tracking-wide text-sm mt-4 md:mt-0">
              {selectedDayInfo.isToday ? 'Hoje' : selectedDayInfo.dayLabel} • {selectedDayInfo.fullLabel}
            </p>
          </div>

          {/* Seletor de dias */}
          <div className="bg-[#1a1f22] overflow-x-auto mb-10">
            <div className="flex min-w-max border-b border-white/10">
              {weekDays.map((day) => {
                const active = selectedDay === day.value;
                return (
                  <button
                    key={day.value}
                    onClick={() => setSelectedDay(day.value)}
                    className={`min-w-[96px] px-4 py-3 text-center border-r border-white/10 transition-all ${
                      active ? 'bg-white text-black' : 'bg-transparent text-[#ffe600] hover:bg-white/5'
                    }`}
                  >
                    <div className="text-[11px] font-bold tracking-wide">
                      {day.isToday ? 'HOJE' : day.isSunday ? 'DOM ✝' : day.dayLabel}
                    </div>
                    <div className="text-[18px] font-bold leading-tight">{day.dateLabel}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navegação por período */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-gray-400">
            <span className="text-gray-300 dark:text-gray-600">Ir para</span>
            {(Object.keys(sections) as string[]).map((key) => (
              <button
                key={key}
                onClick={() =>
                  document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="hover:text-[#ff6600] transition-colors"
              >
                {SECTION_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Seções por período */}
        {(Object.entries(sections) as [string, Program[]][]).map(([key, items]) =>
          items.length > 0 ? (
            <div key={key} id={key} className="mb-20 scroll-mt-32">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 uppercase tracking-tight">
                {SECTION_LABELS[key]}
              </h3>

              <div className="space-y-8">
                {items.map((prog) => {
                  const active = isLiveNow(prog.startTime, prog.endTime);
                  return (
                    <div
                      key={prog.id}
                      data-live={active}
                      onClick={() => onNavigateToProgram(prog)}
                      className={`relative flex flex-col md:flex-row items-start p-6 transition-all cursor-pointer group rounded-sm ${
                        active
                          ? 'bg-gray-50 dark:bg-white/5 border-l-8 border-[#ff6600] shadow-lg'
                          : 'border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {/* Horário */}
                      <div className="w-32 flex-shrink-0 flex flex-col mb-6 md:mb-0 pt-1">
                        <span
                          className={`text-2xl font-bold tracking-tight ${
                            active
                              ? 'text-[#ff6600]'
                              : 'text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white'
                          }`}
                        >
                          {format24h(prog.startTime)}
                        </span>
                        {active && (
                          <div className="mt-3 inline-flex items-center justify-center bg-[#ff6600] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider w-24">
                            NO AR
                          </div>
                        )}
                      </div>

                      {/* Anel de progresso */}
                      <div className="md:mx-8">
                        <ProgramProgressRing program={prog} isActive={active} nowMinutes={nowMinutes} />
                      </div>

                      {/* Detalhes */}
                      <div className="flex-grow min-w-0 pt-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-[#ff6600] leading-tight tracking-tight mb-2 transition-all duration-300">
                          {prog.title}
                        </h4>
                        {prog.host && (
                          <p className="text-gray-500 dark:text-gray-400 font-normal text-base mb-4 tracking-tight">
                            com {prog.host}
                          </p>
                        )}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-normal max-w-2xl">
                          {prog.description}
                        </p>
                        {active && (
                          <div className="mt-6 flex items-center space-x-3">
                            <div className="h-1 w-10 bg-[#ff6600] animate-pulse"></div>
                            <span className="text-[10px] font-semibold text-[#ff6600] uppercase tracking-wider">
                              Ao vivo agora
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default ScheduleList;