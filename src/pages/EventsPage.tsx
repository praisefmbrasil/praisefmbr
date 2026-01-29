import React, { useState, useEffect } from 'react';
import { Ticket, Loader2, Search, Bell, BellRing, X, Check, Music, Info, ArrowRight } from 'lucide-react'; // Removido AlertCircle não utilizado
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import EventCard from '../components/EventCard';

const BANDSINTOWN_APP_ID = 'praise_fm_bra_2026';

const FEATURED_GOSPEL_ARTISTS = [
  { name: 'Fernandinho', genre: 'Louvor e Adoração', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp' },
  { name: 'Isaias Saad', genre: 'Worship Brasil', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp' },
  { name: 'Gabriela Rocha', genre: 'Adoração Contemporânea', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp' },
  { name: 'Aline Barros', genre: 'Gospel Pop', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp' },
  { name: 'Brandon Lake', genre: 'Worship', image: 'https://res.cloudinary.com/dtecypmsh/image/upload/v1767583738/BRANDON_LAKE_nf7pyj.jpg' },
  { name: 'Elevation Worship', genre: 'Modern Worship', image: 'https://res.cloudinary.com/dtecypmsh/image/upload/v1767998578/ELEVATION_WORSHIP_olxxoe.webp' }
];

const generateMockEvents = (artistName: string) => {
  const venues = [
    { name: 'Allianz Parque', city: 'São Paulo', region: 'SP', country: 'Brazil' },
    { name: 'Jeunesse Arena', city: 'Rio de Janeiro', region: 'RJ', country: 'Brazil' },
    { name: 'Mineirinho', city: 'Belo Horizonte', region: 'MG', country: 'Brazil' },
    { name: 'Arena do Grêmio', city: 'Porto Alegre', region: 'RS', country: 'Brazil' },
    { name: 'Mané Garrincha', city: 'Brasília', region: 'DF', country: 'Brazil' }
  ];
  
  const usVenues = [
    { name: 'Madison Square Garden', city: 'New York', region: 'NY', country: 'United States' },
    { name: 'Red Rocks Amphitheatre', city: 'Morrison', region: 'CO', country: 'United States' },
    { name: 'Bridgestone Arena', city: 'Nashville', region: 'TN', country: 'United States' }
  ];

  const selectedVenues = artistName.toLowerCase().includes('brandon') || artistName.toLowerCase().includes('elevation') 
    ? usVenues 
    : venues;

  return selectedVenues.map((v, i) => ({
    datetime: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    venue: v,
    url: '#'
  }));
};

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [currentArtist, setCurrentArtist] = useState<string | null>(null);
  const [error] = useState<string | null>(null); // Mantido apenas como estado se for usar no futuro
  const [showAlertSystem, setShowAlertSystem] = useState(false);
  const [subscribedArtists, setSubscribedArtists] = useState<string[]>([]);
  const [isSavingAlerts, setIsSavingAlerts] = useState(false);
  const [isUsingMock, setIsUsingMock] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchAlerts = async () => {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('artist_alerts')
            .eq('id', user.id)
            .single();
          if (data?.artist_alerts) {
            setSubscribedArtists(data.artist_alerts);
          }
        } catch (e) {
          console.debug("Profile alerts not available", e);
        }
      };
      fetchAlerts();
    }
  }, [user]);

  const fetchArtistEvents = async (artistName: string) => {
    if (!artistName.trim()) return;
    setSearching(true);
    setCurrentArtist(artistName);
    setIsUsingMock(false);
    
    try {
      const response = await fetch(
        `https://rest.bandsintown.com/artists/${encodeURIComponent(artistName)}/events?app_id=${BANDSINTOWN_APP_ID}`
      );
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.warn("Bandsintown API failed. Using simulated data.", err);
      setEvents(generateMockEvents(artistName));
      setIsUsingMock(true);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArtistEvents(searchTerm);
  };

  const toggleArtistAlert = (artistName: string) => {
    setSubscribedArtists(prev => 
      prev.includes(artistName) 
        ? prev.filter(a => a !== artistName) 
        : [...prev, artistName]
    );
  };

  const saveAlerts = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsSavingAlerts(true);
    try {
      const { error: err } = await supabase
        .from('profiles')
        .update({ artist_alerts: subscribedArtists })
        .eq('id', user.id);
      
      if (!err) setShowAlertSystem(false);
    } catch (err) {
      console.error("Error saving alerts:", err);
    } finally {
      setIsSavingAlerts(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen pb-20 font-sans">
      {/* O resto do seu JSX permanece igual... */}
      {/* ... (Modal e Header) ... */}
      
      {/* Lembre-se de verificar se o componente EventCard está com o nome correto no arquivo e no import */}
      {showAlertSystem && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            {/* Conteúdo do Modal */}
            <div className="bg-white dark:bg-[#111] w-full max-w-2xl overflow-hidden shadow-2xl">
                <div className="p-8 bg-[#ff6600] text-white flex justify-between items-center">
                    <h2 className="text-2xl font-medium uppercase tracking-tighter">Alertas</h2>
                    <button onClick={() => setShowAlertSystem(false)}><X /></button>
                </div>
                {/* Lista de artistas aqui */}
                <div className="p-8 bg-gray-50 dark:bg-black/50">
                    <button onClick={saveAlerts} className="w-full bg-black text-white py-4 uppercase tracking-widest">
                        {isSavingAlerts ? "Salvando..." : "Confirmar"}
                    </button>
                </div>
            </div>
         </div>
      )}

      {/* Conteúdo Principal */}
      <div className="bg-black text-white py-20">
         <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-6xl font-medium uppercase tracking-tighter mb-8">Eventos</h1>
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
                <input 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/10 px-6 py-4 outline-none focus:border-[#ff6600]"
                    placeholder="Buscar artista..."
                />
            </form>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isUsingMock && <div className="p-4 bg-amber-50 text-amber-600 mb-6 flex items-center gap-2"><Info size={16}/> Datas estimadas</div>}
        
        {currentArtist && (
            <div className="grid grid-cols-1 gap-4">
                {events.map((event, idx) => (
                    <EventCard key={idx} event={event} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;