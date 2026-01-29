import React, { useState, useEffect } from 'react';
// Removido AlertCircle e outros ícones que causavam erro de importação
import { Loader2, Search, X, Music, Info, Bell, BellRing, Home, Calendar, User } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import EventCard from '../components/EventCard';

const BANDSINTOWN_APP_ID = 'praise_fm_bra_2026';

// Integrado com seus links oficiais do Cloudinary
const FEATURED_GOSPEL_ARTISTS = [
  { name: 'Fernandinho', genre: 'Louvor e Adoração', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp' },
  { name: 'Isaias Saad', genre: 'Worship Brasil', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp' },
  { name: 'Gabriela Rocha', genre: 'Adoração Contemporânea', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp' },
  { name: 'Aline Barros', genre: 'Gospel Pop', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp' }
];

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [currentArtist, setCurrentArtist] = useState<string | null>(null);
  const [showAlertSystem, setShowAlertSystem] = useState(false);
  const [subscribedArtists, setSubscribedArtists] = useState<string[]>([]);
  const [isSavingAlerts, setIsSavingAlerts] = useState(false);

  // Busca alertas do perfil no Supabase
  useEffect(() => {
    if (user) {
      const fetchAlerts = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('artist_alerts')
          .eq('id', user.id)
          .single();
        if (data?.artist_alerts) setSubscribedArtists(data.artist_alerts);
      };
      fetchAlerts();
    }
  }, [user]);

  const fetchArtistEvents = async (artistName: string) => {
    if (!artistName.trim()) return;
    setSearching(true);
    setCurrentArtist(artistName);
    
    try {
      const response = await fetch(
        `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events?app_id=${BANDSINTOWN_APP_ID}`
      );
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar eventos", err);
      setEvents([]);
    } finally {
      setSearching(false);
    }
  };

  const saveAlerts = async () => {
    if (!user) return navigate('/login');
    setIsSavingAlerts(true);
    await supabase.from('profiles').update({ artist_alerts: subscribedArtists }).eq('id', user.id);
    setIsSavingAlerts(false);
    setShowAlertSystem(false);
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen pb-32 transition-colors">
      {/* Header Estilizado */}
      <header className="p-6 bg-black text-white flex justify-between items-center border-b border-white/10">
        <h1 className="text-2xl font-black italic tracking-tighter">EVENTOS GOSPEL</h1>
        <button onClick={() => setShowAlertSystem(true)} className="relative p-2 bg-white/10 rounded-full">
          {subscribedArtists.length > 0 ? <BellRing size={20} className="text-[#ff6600]" /> : <Bell size={20} />}
        </button>
      </header>

      {/* Busca */}
      <div className="p-6 bg-black">
        <div className="relative">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchArtistEvents(searchTerm)}
            placeholder="Buscar cantor ou banda..."
            className="w-full bg-white/10 border-none p-4 pl-12 rounded-2xl text-white outline-none focus:ring-2 focus:ring-[#ff6600]"
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
          {searching && <Loader2 className="absolute right-4 top-4 animate-spin text-[#ff6600]" size={20} />}
        </div>
      </div>

      <main className="p-6 space-y-8">
        {/* Artistas em Destaque */}
        {!currentArtist && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Artistas Recomendados</h2>
            <div className="grid grid-cols-2 gap-4">
              {FEATURED_GOSPEL_ARTISTS.map(artist => (
                <button 
                  key={artist.name}
                  onClick={() => { setSearchTerm(artist.name); fetchArtistEvents(artist.name); }}
                  className="relative group overflow-hidden rounded-3xl aspect-square"
                >
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-left">
                    <p className="text-white font-bold text-sm">{artist.name}</p>
                    <p className="text-[#ff6600] text-[10px] font-bold uppercase tracking-tighter">{artist.genre}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Lista de Eventos Encontrados */}
        {currentArtist && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-black text-xl uppercase italic">Agenda: {currentArtist}</h2>
              <button onClick={() => setCurrentArtist(null)} className="text-[#ff6600] text-xs font-bold uppercase">Limpar</button>
            </div>
            {events.length > 0 ? (
              events.map((event, idx) => <EventCard key={idx} event={event} />)
            ) : !searching && (
              <div className="text-center py-20 opacity-40">
                <Music size={48} className="mx-auto mb-4" />
                <p>Nenhum evento encontrado para este artista.</p>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Modal de Alertas de Artistas */}
      {showAlertSystem && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-end sm:items-center justify-center">
          <div className="bg-white dark:bg-[#111] w-full max-w-lg rounded-t-[40px] sm:rounded-[40px] overflow-hidden">
            <div className="p-8 flex justify-between items-center border-b dark:border-white/5">
              <h2 className="text-xl font-black uppercase italic">Meus Alertas</h2>
              <button onClick={() => setShowAlertSystem(false)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full"><X size={20}/></button>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-sm opacity-60">Selecione os artistas que você deseja receber notificações de novos shows.</p>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {FEATURED_GOSPEL_ARTISTS.map(artist => (
                   <label key={artist.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl cursor-pointer">
                      <span className="font-bold text-sm">{artist.name}</span>
                      <input 
                        type="checkbox" 
                        checked={subscribedArtists.includes(artist.name)}
                        onChange={() => setSubscribedArtists(prev => prev.includes(artist.name) ? prev.filter(a => a !== artist.name) : [...prev, artist.name])}
                        className="w-5 h-5 accent-[#ff6600]"
                      />
                   </label>
                ))}
              </div>
              <button 
                onClick={saveAlerts}
                className="w-full bg-[#ff6600] text-white py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                {isSavingAlerts ? "Salvando..." : "Confirmar Configurações"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 px-8 py-5 flex justify-between items-center z-50">
        <button onClick={() => navigate('/app')} className="text-gray-400"><Home size={24}/></button>
        <button onClick={() => navigate('/music')} className="text-gray-400"><Music size={24}/></button>
        <button onClick={() => navigate('/events')} className="text-[#ff6600]"><Calendar size={24}/></button>
        <button onClick={() => navigate('/profile')} className="text-gray-400"><User size={24}/></button>
      </nav>
    </div>
  );
};

export default EventsPage;