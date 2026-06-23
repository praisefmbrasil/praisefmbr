import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, ChevronRight, Home, Music, Calendar, User } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Program } from '../types';

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
// Programação
// ---------------------------------------------------------------------------

const SCHEDULE_BRASIL: Record<number, Program[]> = {
  0: [
    { id: 'br-d-1',  title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'A presença de Deus na madrugada.',               image: IMG.SAMUEL_ANDRADE },
    { id: 'br-d-2',  title: 'Worship',              host: '',               startTime: '06:00', endTime: '07:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
    { id: 'br-d-3',  title: 'Domingo com Cristo',   host: 'Janaina Costa',  startTime: '07:00', endTime: '12:00', description: 'Um domingo abençoado para toda a família.',      image: IMG.JANAINA_COSTA },
    { id: 'br-d-4',  title: 'Worship',              host: '',               startTime: '12:00', endTime: '13:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
    { id: 'br-d-5',  title: 'Tarde Gospel',         host: 'Rafael Costa',   startTime: '13:00', endTime: '16:00', description: 'O melhor do gospel na tarde de domingo.',        image: IMG.RAFAEL_COSTA },
    { id: 'br-d-6',  title: 'Praise FM Rock',       host: 'Cesar Brum',     startTime: '16:00', endTime: '17:00', description: 'Rock cristão de alto impacto.',                 image: IMG.CESAR_BRUM },
    { id: 'br-d-7',  title: 'Nova Geração',         host: 'Ana Paula',      startTime: '17:00', endTime: '18:00', description: 'Música e mensagem para a nova geração.',         image: IMG.ANA_PAULA },
    { id: 'br-d-8',  title: 'Worship',              host: '',               startTime: '18:00', endTime: '20:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
    { id: 'br-d-9',  title: 'Pregação da Palavra',  host: '',               startTime: '20:00', endTime: '21:00', description: 'A Palavra de Deus para edificação da sua vida.',  image: IMG.PREGACAO },
    { id: 'br-d-10', title: 'Clássicos',            host: 'Rodrigo Veras',  startTime: '21:00', endTime: '22:00', description: 'Os maiores clássicos do gospel nacional.',       image: IMG.RODRIGO_VERAS },
    { id: 'br-d-11', title: 'Worship',              host: '',               startTime: '22:00', endTime: '00:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
  ],
  ...Object.fromEntries(
    [1, 2, 3, 4, 5, 6].map((day) => [
      day,
      [
        { id: `br-${day}-1`,  title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'A presença de Deus na madrugada.',               image: IMG.SAMUEL_ANDRADE },
        { id: `br-${day}-2`,  title: 'Worship',              host: '',               startTime: '06:00', endTime: '07:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
        { id: `br-${day}-3`,  title: 'Manhã com Cristo',     host: 'Lucas Martins',  startTime: '07:00', endTime: '12:00', description: 'Comece seu dia com fé e alegria.',              image: IMG.LUCAS_MARTINS },
        { id: `br-${day}-4`,  title: 'Worship',              host: '',               startTime: '12:00', endTime: '13:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
        { id: `br-${day}-5`,  title: 'Tarde Gospel',         host: 'Rafael Costa',   startTime: '13:00', endTime: '16:00', description: 'O melhor do gospel na sua tarde.',               image: IMG.RAFAEL_COSTA },
        { id: `br-${day}-6`,  title: 'Nova Geração',         host: 'Ana Paula',      startTime: '16:00', endTime: '17:00', description: 'Música e mensagem para a nova geração.',         image: IMG.ANA_PAULA },
        { id: `br-${day}-7`,  title: 'Praise FM Flow',       host: 'Patrick Silva',  startTime: '17:00', endTime: '18:00', description: 'O flow do gospel contemporâneo.',               image: IMG.PATRICK_SILVA },
        { id: `br-${day}-8`,  title: 'De Carona',            host: 'Bruno Almeida',  startTime: '18:00', endTime: '20:00', description: 'Sua trilha sonora no caminho para casa.',        image: IMG.BRUNO_ALMEIDA },
        { id: `br-${day}-9`,  title: 'Praise FM Rock',       host: 'Cesar Brum',     startTime: '20:00', endTime: '21:00', description: 'Rock cristão de alto impacto.',                 image: IMG.CESAR_BRUM },
        { id: `br-${day}-10`, title: 'Clássicos',            host: 'Rodrigo Veras',  startTime: '21:00', endTime: '22:00', description: 'Os maiores clássicos do gospel nacional.',       image: IMG.RODRIGO_VERAS },
        { id: `br-${day}-11`, title: 'Worship',              host: '',               startTime: '22:00', endTime: '00:00', description: 'Louvor e adoração sem interrupção.',              image: IMG.WORSHIP_BR },
      ] as Program[],
    ])
  ),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getBrasiliaTime = () => {
  const now = new Date();
  const d = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  return { day: d.getDay(), totalMinutes: d.getHours() * 60 + d.getMinutes(), hours: d.getHours(), minutes: d.getMinutes() };
};

const fmt = (t: string) => t; // já em 24h

// ---------------------------------------------------------------------------
// Progress ring para o hero
// ---------------------------------------------------------------------------

const HeroRing: React.FC<{ program: Program; nowMinutes: number }> = ({ program, nowMinutes }) => {
  const SIZE = 200;
  const SW = 4;
  const r = SIZE / 2 - SW / 2;
  const circ = 2 * Math.PI * r;

  const progress = useMemo(() => {
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    return Math.min(Math.max((nowMinutes - start) / (end - start), 0), 1);
  }, [program, nowMinutes]);

  const offset = circ - progress * circ;

  return (
    <div className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
      {/* foto */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
      </div>
      {/* anel SVG */}
      <svg width={SIZE} height={SIZE} className="absolute inset-0 -rotate-90 pointer-events-none">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth={SW} fill="none" />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={r}
          stroke="#ff6600" strokeWidth={SW} fill="none"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="butt"
          className="transition-all duration-1000"
        />
      </svg>
      {/* badge NO AR */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff6600] text-black text-[9px] font-black px-3 py-0.5 rounded-sm tracking-widest whitespace-nowrap">
        NO AR
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Card de próximo programa (fila inferior)
// ---------------------------------------------------------------------------

const NextCard: React.FC<{ program: Program; onClick: () => void }> = ({ program, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer px-4 py-3 rounded-sm flex-shrink-0 w-64"
  >
    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
      <img src={program.image} alt={program.title} className="w-full h-full object-cover grayscale" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-[#ff6600] font-black uppercase tracking-widest mb-0.5">
        {fmt(program.startTime)} – {fmt(program.endTime)}
      </p>
      <p className="text-sm font-bold text-black dark:text-white truncate">{program.title}</p>
      {program.host && (
        <p className="text-[11px] text-gray-400 truncate">{program.host}</p>
      )}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

const AppHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(getBrasiliaTime());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getBrasiliaTime()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const todaySchedule = useMemo(
    () => SCHEDULE_BRASIL[currentTime.day] ?? SCHEDULE_BRASIL[1],
    [currentTime.day]
  );

  const currentIndex = useMemo(
    () =>
      todaySchedule.findIndex((prog) => {
        const [sH, sM] = prog.startTime.split(':').map(Number);
        const [eH, eM] = prog.endTime.split(':').map(Number);
        const start = sH * 60 + sM;
        let end = eH * 60 + eM;
        if (end === 0 || end <= start) end = 24 * 60;
        return currentTime.totalMinutes >= start && currentTime.totalMinutes < end;
      }),
    [todaySchedule, currentTime]
  );

  const currentProgram = currentIndex >= 0 ? todaySchedule[currentIndex] : todaySchedule[0];
  const nextPrograms = todaySchedule.slice(currentIndex + 1, currentIndex + 4);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pb-24">

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-white/10 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-[#ff6600] text-black px-2 py-1 rounded font-black italic text-sm">PRAISE FM</div>
          <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Brasil</span>
        </div>
        <button
          onClick={() => navigate('/my-sounds')}
          className="w-9 h-9 rounded-full bg-[#ff6600] text-black flex items-center justify-center font-bold text-sm"
        >
          P
        </button>
      </header>

      {/* Hero — programa ao vivo */}
      <section className="px-6 pt-10 pb-6">
        {/* Live label */}
        <div className="flex items-center space-x-2 mb-5">
          <span className="text-[#ff6600] text-[11px] font-black uppercase tracking-[0.2em]">AO VIVO</span>
          <span className="text-gray-400 text-[11px] font-normal">
            {currentProgram ? `${fmt(currentProgram.startTime)} – ${fmt(currentProgram.endTime)}` : ''}
          </span>
        </div>

        <div className="flex items-center space-x-6">
          {/* Anel com foto */}
          {currentProgram && (
            <HeroRing program={currentProgram} nowMinutes={currentTime.totalMinutes} />
          )}

          {/* Info + botão play */}
          <div className="flex-1 min-w-0">
            <h1
              className="text-2xl font-black uppercase tracking-tight text-black dark:text-white leading-tight mb-1 cursor-pointer hover:text-[#ff6600] transition-colors"
              onClick={() => navigate('/schedule')}
            >
              {currentProgram?.title ?? 'Praise FM Brasil'}
              <ChevronRight className="inline w-5 h-5 ml-1 text-[#ff6600]" />
            </h1>
            {currentProgram?.host && (
              <p className="text-gray-400 text-sm mb-4">{currentProgram.host}</p>
            )}
            {!currentProgram?.host && currentProgram && (
              <p className="text-gray-400 text-sm mb-4">{currentProgram.description}</p>
            )}
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="flex items-center space-x-2 bg-[#ff6600] text-black px-6 py-3 font-black uppercase text-xs tracking-widest rounded-sm hover:bg-orange-500 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pausar' : 'Ouvir'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fila — próximos programas */}
      {nextPrograms.length > 0 && (
        <section className="px-6 pb-6">
          <div className="border-t border-gray-100 dark:border-white/10 pt-5 mb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">A seguir</p>
          </div>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
            {nextPrograms.map((prog) => (
              <NextCard key={prog.id} program={prog} onClick={() => navigate('/schedule')} />
            ))}
          </div>
        </section>
      )}

      {/* Player fixo (quando tocando) */}
      {isPlaying && (
        <div className="fixed bottom-20 left-4 right-4 bg-[#ff6600] text-black p-4 flex items-center justify-between rounded-sm shadow-2xl z-50">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-2 h-2 bg-black rounded-full animate-ping flex-shrink-0" />
            <div className="truncate">
              <p className="font-black text-xs uppercase truncate">{currentProgram?.title}</p>
              <p className="text-[10px] font-bold opacity-70">AO VIVO • PRAISE FM BRASIL</p>
            </div>
          </div>
          <button
            onClick={() => setIsPlaying(false)}
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>
        </div>
      )}

      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5 flex justify-around py-3 z-50">
        <NavItem to="/app"      icon={<Home size={22} />}     label="Início" />
        <NavItem to="/music"    icon={<Music size={22} />}    label="Música" />
        <NavItem to="/schedule" icon={<Calendar size={22} />} label="Agenda" />
        <NavItem to="/my-sounds" icon={<User size={22} />}   label="Perfil" />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center space-y-1 ${isActive ? 'text-[#ff6600]' : 'text-gray-400'}`
    }
  >
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
  </NavLink>
);

export default AppHomePage;