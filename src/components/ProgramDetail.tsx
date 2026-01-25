import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ArrowLeft, Calendar, Music, Activity, Loader2 } from 'lucide-react';
import { Program } from '../types';
import { supabase } from '../lib/supabase';

interface PlayedTrack {
  artist: string;
  title: string;
  label: string;
  image: string;
  isLive?: boolean;
  timestamp: number;
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

const ProgramDetail: React.FC<ProgramDetailProps> = ({ program, onBack, onViewSchedule, onListenClick, isPlaying }) => {
  const [loadingHistory, setLoadingHistory] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const [historyGroups, setHistoryGroups] = useState<DailyHistory>({});

  const getLocalDateString = () => new Date().toISOString().split('T')[0];

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
              label: item.label || "PLAYED",
              image: item.image_url,
              timestamp: new Date(item.played_at).getTime(),
              isLive: false
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

  useEffect(() => {
    const connectMetadata = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
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

          const blockedKeywords = ['praise fm', 'vinheta', 'comercial', 'spot', 'promo'];
          if (blockedKeywords.some(k => title.toLowerCase().includes(k) || artist.toLowerCase().includes(k))) return;

          setHistoryGroups(prev => {
            const todayKey = getLocalDateString();
            const currentTracks = prev[todayKey] || [];
            
            if (currentTracks.length > 0) {
              const last = currentTracks[0];
              if ((last.title === title && last.artist === artist) || (Date.now() - last.timestamp < 45000)) return prev;
            }

            const trackTimestamp = Date.now();
            const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(artist + title)}/200/200`;
            
            const sync = async () => {
              await supabase.from('program_history').insert([{
                program_id: program.id, artist, title, image_url: imageUrl,
                played_at: new Date(trackTimestamp).toISOString(), label: "LIVE"
              }]);
            };
            sync();

            const newTrack = { artist, title, label: "LIVE", image: imageUrl, isLive: true, timestamp: trackTimestamp };
            return { ...prev, [todayKey]: [newTrack, ...currentTracks.map(t => ({...t, isLive: false}))].slice(0, 50) };
          });
        } catch (e) { console.error(e); }
      };
    };
    connectMetadata();
    return () => eventSourceRef.current?.close();
  }, [program.id]);

  const sortedDateKeys = Object.keys(historyGroups).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white mb-6 uppercase text-[10px] tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </button>
        <h1 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter mb-8">{program.title}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
        <div className="lg:col-span-8">
          <div className="relative aspect-video bg-black mb-12 overflow-hidden shadow-2xl">
            <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-8 left-8">
              <button onClick={onListenClick} className="bg-[#ff6600] text-white px-8 py-4 flex items-center space-x-3 uppercase font-bold tracking-tighter hover:bg-white hover:text-black transition-all">
                <Volume2 className={isPlaying ? 'animate-pulse' : ''} />
                <span>{isPlaying ? 'No Ar' : 'Ouvir em Direto'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white text-black p-0 shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-2xl font-medium uppercase tracking-tighter flex items-center">
                <Music className="w-5 h-5 mr-3 text-[#ff6600]" /> Histórico de Músicas
              </h3>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
              {loadingHistory ? (
                <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#ff6600] w-10 h-10" /></div>
              ) : sortedDateKeys.length > 0 ? (
                sortedDateKeys.map(date => (
                  <div key={date}>
                    <div className="bg-gray-50 px-6 py-2 text-[10px] font-bold uppercase text-gray-400 border-y border-gray-100">{date}</div>
                    {historyGroups[date].map((track, i) => (
                      <div key={i} className={`flex items-center p-5 border-b border-gray-50 ${track.isLive ? 'bg-orange-50' : ''}`}>
                        <img src={track.image} className="w-14 h-14 object-cover mr-5" alt="" />
                        <div className="min-w-0">
                          <h4 className="font-bold uppercase text-base leading-none truncate">{track.artist}</h4>
                          <p className="text-sm text-gray-500 truncate mt-1">{track.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : <div className="py-20 text-center text-gray-400 uppercase text-xs tracking-widest">Sem histórico</div>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#1a1a1a] p-8 border-l-4 border-[#ff6600]">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Apresentador</h4>
            <p className="text-2xl font-bold uppercase tracking-tighter">{program.host}</p>
          </div>
          <button onClick={onViewSchedule} className="w-full flex items-center justify-between p-6 bg-[#1a1a1a] border border-white/5 uppercase text-xs font-bold tracking-widest hover:bg-[#222]">
            <span>Programação</span>
            <Calendar className="w-5 h-5 text-[#ff6600]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;