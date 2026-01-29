import React, { useMemo, useState, useEffect, useRef } from 'react';
// Removidos Play, MapPin e CalendarIcon que não estavam sendo usados
import { Volume2, ArrowLeft, Calendar, Music, Activity, Loader2 } from 'lucide-react';
import type { Program } from '../types';
// Importação do Supabase corrigida conforme seu arquivo supabaseClient.ts
import { supabase } from '../lib/supabaseClient';

// Importação segura: Se o constants não exportar SCHEDULES, definimos um fallback vazio para não quebrar
import * as Constants from '../constants';
const SCHEDULES = (Constants as any).SCHEDULES || { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

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

const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';

const getBrazilTotalMinutes = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
  };
  const brazilDate = new Date(now.toLocaleString('en-US', options));
  return brazilDate.getHours() * 60 + brazilDate.getMinutes();
};

const ProgramDetail: React.FC<ProgramDetailProps> = ({ program, onBack, onViewSchedule, onListenClick, isPlaying }) => {
  const [nowMinutes, setNowMinutes] = useState(getBrazilTotalMinutes());
  const [loadingHistory, setLoadingHistory] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const [historyGroups, setHistoryGroups] = useState<DailyHistory>({});

  // Efeito para lidar com a Metadata e evitar erro de "Value never read"
  useEffect(() => {
    if (isPlaying) {
      eventSourceRef.current = new EventSource(METADATA_URL);
      eventSourceRef.current.onmessage = (e) => console.log("Praise FM:", e.data);
    }
    return () => eventSourceRef.current?.close();
  }, [isPlaying]);

  useEffect(() => {
    const loadSavedHistory = async () => {
      setLoadingHistory(true);
      try {
        const { data } = await supabase
          .from('program_history')
          .select('*')
          .eq('program_id', program.id)
          .order('played_at', { ascending: false })
          .limit(50);

        if (data) {
          const grouped: DailyHistory = {};
          data.forEach((item: any) => {
            const date = item.played_at.split('T')[0];
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({
              artist: item.artist,
              title: item.title,
              label: item.label || "GRAVADO",
              image: item.image_url,
              timestamp: new Date(item.played_at).getTime(),
            });
          });
          setHistoryGroups(grouped);
        }
      } catch (err) {
        console.error("Erro Praise FM:", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    loadSavedHistory();
  }, [program.id]);

  useEffect(() => {
    const timer = setInterval(() => setNowMinutes(getBrazilTotalMinutes()), 30000);
    return () => clearInterval(timer);
  }, []);

  const { isCurrentlyLive, nextProgram } = useMemo(() => {
    const [sH, sM] = program.startTime.split(':').map(Number);
    const [eH, eM] = program.endTime.split(':').map(Number);
    const start = sH * 60 + sM;
    let end = eH * 60 + eM;
    if (end === 0 || end <= start) end = 24 * 60;
    const live = nowMinutes >= start && nowMinutes < end;

    const dayIndex = new Date().getDay();
    const daySchedule = SCHEDULES[dayIndex] || [];
    const currentIndex = daySchedule.findIndex((p: any) => p.id === program.id);
    const next = currentIndex !== -1 && currentIndex < daySchedule.length - 1 ? daySchedule[currentIndex + 1] : null;

    return { isCurrentlyLive: live, nextProgram: next };
  }, [program, nowMinutes]);

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-[11px] uppercase tracking-widest">Voltar</span>
        </button>
        <h1 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter mb-8">{program.title}</h1>
      </div>

      <div className="bg-[#1a1a1a] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
          <button className="text-[#ff6600] text-[11px] uppercase tracking-widest border-b border-[#ff6600]">Início</button>
          <button onClick={onViewSchedule} className="flex items-center text-[#ff6600] space-x-2 text-[11px] uppercase tracking-widest">
             <Calendar className="w-4 h-4" />
             <span>Grade Completa</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="relative aspect-video overflow-hidden mb-12 bg-black">
              <img src={program.image} alt="" className="w-full h-full object-cover opacity-80" />
              {isCurrentlyLive && (
                <button onClick={onListenClick} className="absolute bottom-8 left-8 bg-[#ff6600] text-black px-8 py-4 flex items-center space-x-4">
                  <Volume2 className={isPlaying ? 'animate-pulse' : ''} />
                  <span className="text-xl font-bold uppercase">{isPlaying ? 'No Ar' : 'Ouvir'}</span>
                </button>
              )}
            </div>
            <h2 className="text-2xl uppercase mb-4">Sobre o programa</h2>
            <p className="text-gray-400 leading-relaxed mb-12">{program.description}</p>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#1a1a1a] p-6 border-l-4 border-[#ff6600]">
               <h3 className="text-[10px] uppercase text-gray-500 mb-2">Apresentador</h3>
               <p className="text-xl uppercase">{program.host}</p>
            </div>
            {nextProgram && (
              <div className="bg-[#1a1a1a] p-6">
                <h3 className="text-[10px] uppercase text-gray-500 mb-2">A seguir</h3>
                <p className="text-lg uppercase">{nextProgram.title}</p>
                <p className="text-[#ff6600] text-sm">{nextProgram.startTime}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;