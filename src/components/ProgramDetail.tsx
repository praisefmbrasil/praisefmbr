import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Volume2, Clock, ArrowLeft, Calendar, Music, Activity, History as HistoryIcon, Loader2 } from 'lucide-react';
import { Program } from '../types';
import { SCHEDULES } from '../constants';
import { supabase } from '../lib/supabaseClient';

// --- INTERFACES (O que o TS não estava encontrando) ---
interface PlayedTrack {
  artist: string;
  title: string;
  label: string;
  image: string;
  isLive?: boolean;
  timestamp: number;
}

interface DailyHistory {
  [date: string]: PlayedTrack[];
}

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
  onViewSchedule: () => void;
  onListenClick: () => void;
  isPlaying: boolean;
}

// --- CONFIGURAÇÕES E UTILS ---
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/hvwifp8ezc6tv';

const getBrasiliaTotalMinutes = () => {
  const now = new Date();
  const brasiliaDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  return brasiliaDate.getHours() * 60 + brasiliaDate.getMinutes();
};

const getLocalDateString = () => {
  return new Date().toISOString().split('T')[0];
};

const format24h = (time24: string) => {
  const [h, m] = time24.split(':').map(Number);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

// --- COMPONENTE PRINCIPAL ---
const ProgramDetail: React.FC<ProgramDetailProps> = ({ 
  program, 
  onBack, 
  onViewSchedule, 
  onListenClick, 
  isPlaying 
}) => {
  const [nowMinutes, setNowMinutes] = useState(getBrasiliaTotalMinutes());
  const [loadingHistory, setLoadingHistory] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  
  const [historyGroups, setHistoryGroups] = useState<DailyHistory>(() => {
    const storageKey = `history_v2_${program.id}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return {}; }
    }
    return {};
  });

  // Carregar histórico do Supabase
  useEffect(() => {
    const loadSavedHistory = async () => {
      setLoadingHistory(true);
      try {
        const { data } = await supabase
          .from('program_history')
          .select('*')
          .eq('program_id', program.id)
          .order('played_at', { ascending: false })
          .limit(100);

        if (data && data.length > 0) {
          const grouped: DailyHistory = {};
          data.forEach((item: any) => {
            const date = item.played_at.split('T')[0];
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({
              artist: item.artist,
              title: item.title,
              label: item.label || "TOCADA ANTERIORMENTE",
              image: item.image_url,
              timestamp: new Date(item.played_at).getTime(),
              isLive: false
            });
          });
          setHistoryGroups(grouped);
          localStorage.setItem(`history_v2_${program.id}`, JSON.stringify(grouped));
        }
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadSavedHistory();
  }, [program.id]);

  // Atualizar relógio interno
  useEffect(() => {
    const timer = setInterval(() => setNowMinutes(getBrasiliaTotalMinutes()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Lógica de "No Ar" e Próximo Programa
  const { isCurrentlyLive, nextProgram } = useMemo(() => {
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    
    const live = nowMinutes >= start && nowMinutes < end;
    const now = new Date();
    const brasiliaDay = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).getDay();
    const daySchedule = SCHEDULES[brasiliaDay] || SCHEDULES[1];
    const currentIndex = daySchedule.findIndex(p => p.id === program.id);
    const next = currentIndex !== -1 && currentIndex < daySchedule.length - 1 
      ? daySchedule[currentIndex + 1] 
      : (currentIndex === daySchedule.length - 1 ? (SCHEDULES[(brasiliaDay + 1) % 7] || daySchedule)[0] : null);

    return { isCurrentlyLive: live, nextProgram: next };
  }, [program, nowMinutes]);

  // Renderização do componente...
  const sortedDateKeys = useMemo(() => Object.keys(historyGroups).sort((a, b) => b.localeCompare(a)), [historyGroups]);

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <button 
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onBack();
          }} 
          className="flex items-center text-gray-400 hover:text-white transition-colors group mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Voltar ao Início</span>
        </button>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight mb-8">
          {program.title}
        </h1>
      </div>

      <div className="bg-[#1a1a1a] border-b border-white/5 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button className="py-4 text-[#ff6600] border-b-2 border-[#ff6600] font-bold text-[11px] uppercase tracking-widest">Sobre</button>
          <button onClick={onViewSchedule} className="flex items-center text-[#ff6600] space-x-2 hover:underline font-bold text-[11px] py-4 uppercase tracking-widest">
             <Calendar className="w-4 h-4" />
             <span>Ver Programação</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="relative aspect-video overflow-hidden mb-12 shadow-2xl bg-[#000]">
              <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
              {isCurrentlyLive && (
                <button onClick={onListenClick} className="absolute bottom-8 left-8 bg-[#ff6600] hover:bg-white text-black px-8 py-4 flex items-center space-x-4 transition-all">
                  <Volume2 className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`} />
                  <span className="text-2xl font-bold uppercase tracking-tighter">{isPlaying ? 'No Ar Agora' : 'Ouvir Ao Vivo'}</span>
                </button>
              )}
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 tracking-tighter uppercase">Sobre</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{program.description}</p>
            </div>

            <div className="bg-white text-black max-w-lg shadow-2xl">
              <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold uppercase tracking-tighter">Músicas Tocadas</h3>
                {isCurrentlyLive && <Activity className="w-4 h-4 text-[#ff6600] animate-pulse" />}
              </div>
              
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {loadingHistory ? (
                   <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-[#ff6600]" /></div>
                ) : sortedDateKeys.map(date => (
                  <div key={date}>
                    <div className="bg-gray-50 px-6 py-2">
                      <span className="text-[9px] font-bold uppercase text-gray-400">{date}</span>
                    </div>
                    {historyGroups[date].map((track, i) => (
                      <div key={i} className="flex items-center p-5 hover:bg-gray-50">
                        <img src={track.image} className="w-14 h-14 object-cover mr-5" alt="" />
                        <div>
                          <h4 className="font-bold uppercase text-sm">{track.artist}</h4>
                          <p className="text-gray-500 text-xs">{track.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="bg-[#1a1a1a] p-8 border-l-4 border-[#ff6600]">
               <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-4">Apresentador</h3>
               <p className="text-white font-bold text-2xl uppercase tracking-tighter">{program.host}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;