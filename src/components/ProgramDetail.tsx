import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Activity, Loader2, Clock } from 'lucide-react';
import type { Program } from '../types';
import { supabase } from '../lib/supabaseClient';
import * as Constants from '../constants';

const SCHEDULES = (Constants as any).SCHEDULES || { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

interface PlayedTrack {
  artist: string;
  title: string;
  label: string;
  image: string;
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
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  };
  const brazilTime = new Intl.DateTimeFormat('pt-BR', options).format(now);
  const [h, m] = brazilTime.split(':').map(Number);
  return h * 60 + m;
};

const ProgramDetail: React.FC<ProgramDetailProps> = ({ program, onBack, onViewSchedule, onListenClick, isPlaying }) => {
  const [nowMinutes, setNowMinutes] = useState(getBrazilTotalMinutes());
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyGroups, setHistoryGroups] = useState<DailyHistory>({});
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (isPlaying) {
      eventSourceRef.current = new EventSource(METADATA_URL);
      eventSourceRef.current.onmessage = (e) => console.log("Live Metadata:", e.data);
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
          .limit(20);

        if (data) {
          const grouped: DailyHistory = {};
          data.forEach((item: any) => {
            const date = new Date(item.played_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({
              artist: item.artist,
              title: item.title,
              label: item.label || "TRACK",
              image: item.image_url || program.image,
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
  }, [program.id, program.image]);

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
    <div className="bg-[#000] min-h-screen text-white font-sans antialiased">
      {/* Header Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#ff6600] transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
          <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Programação</span>
        </button>
        <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter mb-4 leading-[0.9]">{program.title}</h1>
        <div className="flex items-center space-x-4 text-gray-400">
            <span className="text-sm font-medium uppercase tracking-widest border-r border-white/10 pr-4">{program.startTime} — {program.endTime}</span>
            <span className="text-sm font-medium uppercase tracking-widest text-[#ff6600]">{program.host}</span>
        </div>
      </div>

      {/* Sub-menu Sticky */}
      <div className="bg-[#000] border-y border-white/5 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex space-x-8">
            <button className="text-[#ff6600] text-[10px] font-medium uppercase tracking-[0.2em] h-full border-b border-[#ff6600]">Visão Geral</button>
            <button className="text-gray-500 hover:text-white text-[10px] font-medium uppercase tracking-[0.2em] transition-colors">Episódios</button>
          </div>
          <button onClick={onViewSchedule} className="flex items-center text-gray-400 hover:text-[#ff6600] space-x-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors">
             <Calendar className="w-3 h-3" />
             <span>Grade Semanal</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video overflow-hidden mb-12 bg-gray-900 border border-white/5 group">
              <img src={program.image} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
              {isCurrentlyLive && (
                <button 
                    onClick={onListenClick} 
                    className="absolute bottom-10 left-10 bg-[#ff6600] text-black px-10 py-5 flex items-center space-x-4 hover:bg-white transition-all transform active:scale-95"
                >
                  <Activity className={isPlaying ? 'animate-pulse' : ''} />
                  <span className="text-lg font-medium uppercase tracking-tighter">{isPlaying ? 'Tocando Agora' : 'Ouvir Ao Vivo'}</span>
                </button>
              )}
            </div>

            <div className="max-w-2xl">
                <h2 className="text-2xl font-medium uppercase tracking-tighter mb-6">Sobre o Programa</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-16 font-light">
                  {program.description}
                </p>

                {/* Histórico Recente */}
                <div className="space-y-8">
                    <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#ff6600]">Tocadas Recentemente</h3>
                    {loadingHistory ? (
                        <div className="flex items-center space-x-3 text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-[10px] uppercase tracking-widest">Carregando lista...</span>
                        </div>
                    ) : (
                        Object.keys(historyGroups).map(date => (
                            <div key={date} className="space-y-4">
                                <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-4 flex items-center">
                                    <Clock className="w-3 h-3 mr-2" /> {date}
                                </div>
                                <div className="grid gap-4">
                                    {historyGroups[date].map((track, i) => (
                                        <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-[#ff6600] group">
                                            <div className="w-12 h-12 flex-shrink-0">
                                                <img src={track.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-medium uppercase tracking-tight truncate">{track.title}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest truncate">{track.artist}</p>
                                            </div>
                                            <div className="text-[9px] text-gray-600 font-medium uppercase tracking-widest">
                                                {new Date(track.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-[#111] p-8 border border-white/5">
               <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">Apresentado por</h3>
               <p className="text-2xl font-medium uppercase tracking-tighter text-white">{program.host}</p>
            </div>

            {nextProgram && (
              <div className="group cursor-pointer">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#ff6600] mb-6">A Seguir</h3>
                <div className="bg-[#111] p-0 border border-white/5 overflow-hidden">
                    <img src={nextProgram.image} className="w-full h-32 object-cover opacity-50 group-hover:opacity-80 transition-opacity" alt="" />
                    <div className="p-6">
                        <p className="text-lg font-medium uppercase tracking-tighter text-white mb-1">{nextProgram.title}</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.2em]">{nextProgram.startTime} — {nextProgram.endTime}</p>
                    </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProgramDetail;