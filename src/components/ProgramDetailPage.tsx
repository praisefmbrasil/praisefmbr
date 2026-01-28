import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ArrowLeft, Calendar, Music, Loader2 } from 'lucide-react';
import { Program } from '../types';
import { supabase } from '../lib/supabase';
import { usePlayer } from "../contexts/LivePlayerContext";

interface PlayedTrack {
  artist: string;
  title: string;
  label: string;
  image: string;
  timestamp: number;
  isLive?: boolean;
}

interface DailyHistory { [date: string]: PlayedTrack[]; }

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
  onViewSchedule: () => void;
  onListenClick: () => void;
  isPlaying: boolean;
}

const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/hvwifp8ezc6tv';

const ProgramDetail: React.FC<ProgramDetailProps> = ({ 
  program, 
  onBack, 
  onViewSchedule,
  onListenClick,
  isPlaying
}) => {
  const { togglePlay, playTrack } = usePlayer();
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyGroups, setHistoryGroups] = useState<DailyHistory>({});
  const eventSourceRef = useRef<EventSource | null>(null);

  // 1. Carregar Histórico do Banco de Dados
  useEffect(() => {
    const loadSavedHistory = async () => {
      setLoadingHistory(true);
      try {
        const { data, error } = await supabase
          .from('program_history')
          .select('*')
          .eq('program_id', program.id)
          .order('played_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        if (data) {
          const grouped: DailyHistory = {};
          data.forEach(item => {
            const date = item.played_at.split('T')[0];
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({
              artist: item.artist,
              title: item.title,
              label: item.label || "ANTERIOR",
              image: item.image_url,
              timestamp: new Date(item.played_at).getTime()
            });
          });
          setHistoryGroups(grouped);
        }
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    loadSavedHistory();
  }, [program.id]);

  // 2. Monitorar Metadados em Tempo Real (Zeno FM)
  useEffect(() => {
    const es = new EventSource(METADATA_URL);
    eventSourceRef.current = es;

    es.onmessage = async (event) => {
      if (!event.data) return;
      try {
        const data = JSON.parse(event.data);
        const streamTitle = data.streamTitle || "";
        if (!streamTitle.includes(' - ')) return;

        const [artist, ...titleParts] = streamTitle.split(' - ');
        const title = titleParts.join(' - ').trim();

        setHistoryGroups(prev => {
          const today = new Date().toISOString().split('T')[0];
          const currentTracks = prev[today] || [];
          
          if (currentTracks.length > 0 && currentTracks[0].title === title) return prev;

          const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(artist + title)}/200/200`;
          
          // Salva no banco de forma assíncrona
          supabase.from('program_history').insert([{
            program_id: program.id,
            artist,
            title,
            image_url: imageUrl,
            played_at: new Date().toISOString(),
            label: "AO VIVO"
          }]).then(({ error }) => { if (error) console.error(error); });

          const newTrack = { artist, title, label: "AO VIVO", image: imageUrl, timestamp: Date.now(), isLive: true };
          return { ...prev, [today]: [newTrack, ...currentTracks].slice(0, 50) };
        });
      } catch (e) { console.error("Erro metadados:", e); }
    };

    return () => es.close();
  }, [program.id]);

  const sortedDateKeys = Object.keys(historyGroups).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white mb-8 uppercase text-[10px] tracking-[0.3em] font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna Principal: Capa e Histórico */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video mb-12 group overflow-hidden bg-[#111]">
              <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">{program.title}</h1>
                <button 
                  onClick={onListenClick}
                  className="bg-[#ff6600] hover:bg-white hover:text-black text-white px-10 py-5 flex items-center space-x-4 uppercase font-black tracking-widest transition-all shadow-2xl"
                >
                  <Volume2 className={isPlaying ? 'animate-bounce' : ''} />
                  <span>{isPlaying ? 'Ouvindo Agora' : 'Ouvir a rádio'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white text-black p-0 shadow-2xl border-t-8 border-[#ff6600]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center">
                  <Music className="w-6 h-6 mr-3 text-[#ff6600]" /> Recentemente Tocadas
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {loadingHistory ? (
                  <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#ff6600] w-12 h-12" /></div>
                ) : sortedDateKeys.length > 0 ? (
                  sortedDateKeys.map(date => (
                    <div key={date}>
                      <div className="bg-gray-50 px-8 py-3 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{date}</div>
                      {historyGroups[date].map((track, i) => (
                        <div key={i} className="flex items-center p-6 hover:bg-gray-50 transition-colors group">
                          <div className="relative w-16 h-16 mr-6 flex-shrink-0">
                            <img src={track.image} className="w-full h-full object-cover shadow-lg" alt="" />
                            {track.isLive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff6600] rounded-full animate-ping" />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-black uppercase text-lg leading-none truncate group-hover:text-[#ff6600] transition-colors">{track.artist}</h4>
                            <p className="text-gray-500 text-sm mt-1 uppercase font-medium">{track.title}</p>
                          </div>
                          <span className="ml-auto text-[9px] font-bold text-gray-300 uppercase">{track.label}</span>
                        </div>
                      ))}
                    </div>
                  ))
                ) : <div className="py-20 text-center text-gray-400 uppercase text-xs tracking-widest font-bold">Nenhum registro encontrado</div>}
              </div>
            </div>
          </div>

          {/* Lateral: Info Apresentador */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1a1a1a] p-10 border-l-8 border-[#ff6600]">
              <p className="text-[11px] uppercase tracking-[0.4em] text-gray-500 mb-4 font-bold">Apresentador</p>
              <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">{program.host}</h4>
            </div>
            
            <button 
              onClick={onViewSchedule}
              className="w-full group flex items-center justify-between p-8 bg-[#1a1a1a] border border-white/5 hover:bg-white hover:text-black transition-all uppercase text-[11px] font-black tracking-[0.3em]"
            >
              <span>Ver Grade Completa</span>
              <Calendar className="w-5 h-5 text-[#ff6600] group-hover:text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;