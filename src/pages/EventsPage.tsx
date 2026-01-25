import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Ticket,
  Bell,
  Search,
  ExternalLink,
} from 'lucide-react';

type EventItem = {
  date: string;
  venue: string;
  city: string;
  link: string;
};

type Artist = {
  name: string;
  genre: string;
  image: string;
};

// Artistas gospel brasileiros - Praise FM Brasil
const ARTISTS: Artist[] = [
  {
    name: 'Aline Barros',
    genre: 'Adoração / Pop',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp',
  },
  {
    name: 'Gabriela Rocha',
    genre: 'Worship / Adoração',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
  },
  {
    name: 'Fernandinho',
    genre: 'Pop Gospel / Rock',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
  },
  {
    name: 'Isaias Saad',
    genre: 'Worship',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp',
  },
];

const EventsPage: React.FC = () => {
  const [loadingArtist, setLoadingArtist] = useState<string | null>(null);
  const [events, setEvents] = useState<Record<string, EventItem[]>>({});

  const findEvents = (artistName: string) => {
    setLoadingArtist(artistName);
    // Simula a busca de eventos reais no Brasil
    setTimeout(() => {
      setEvents((prev) => ({
        ...prev,
        [artistName]: [
          {
            date: '15 Nov, 2026',
            venue: 'Arena Corinthians',
            city: 'São Paulo, SP',
            link: 'https://www.sympla.com.br',
          },
          {
            date: '03 Dez, 2026',
            venue: 'Jeunesse Arena',
            city: 'Rio de Janeiro, RJ',
            link: 'https://www.ingresso.com',
          },
        ],
      }));
      setLoadingArtist(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      {/* HERO SECTION - Estilo USA */}
      <section className="bg-black text-white py-24 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[#ff6600] mb-6">
            <Ticket size={16} strokeWidth={3} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Praise FM Brasil • Tour & Events
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Eventos<br />Gospel
          </h1>
          <p className="mt-8 max-w-xl text-gray-400 text-sm md:text-base uppercase tracking-widest leading-relaxed">
            Acompanhe de perto os ministérios que tocam na Praise FM. Encontre shows, conferências e noites de adoração.
          </p>
        </div>
      </section>

      {/* ARTIST LIST */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {ARTISTS.map((artist) => (
          <div
            key={artist.name}
            className="group flex flex-col md:flex-row bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 overflow-hidden"
          >
            {/* IMAGE - Zoom effect on hover */}
            <div className="md:w-[40%] aspect-square overflow-hidden bg-gray-200">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
            </div>

            {/* CONTENT */}
            <div className="p-10 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[1px] bg-[#ff6600]"></div>
                <span className="text-[#ff6600] text-[10px] font-bold uppercase tracking-[0.2em]">
                  {artist.genre}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
                {artist.name}
              </h2>

              <div>
                <button
                  onClick={() => findEvents(artist.name)}
                  disabled={loadingArtist === artist.name}
                  className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-colors disabled:opacity-50"
                >
                  <Search size={14} strokeWidth={3} />
                  {loadingArtist === artist.name ? 'Procurando...' : 'Ver Agenda Completa'}
                </button>
              </div>

              {/* EVENT CARDS - Aparecem após a busca */}
              {events[artist.name] && (
                <div className="mt-10 space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                  {events[artist.name].map((event, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-200 dark:border-white/10 p-5 bg-white dark:bg-black hover:border-[#ff6600] transition-colors"
                    >
                      <div className="flex items-center gap-5">
                        <div className="text-center min-w-[50px]">
                           <Calendar className="text-[#ff6600] mx-auto mb-1" size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-tight">{event.venue}</p>
                          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-1">
                            {event.date} // {event.city}
                          </p>
                        </div>
                      </div>
                      
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-[#ff6600] transition-all py-1"
                      >
                        Ingressos
                        <ExternalLink size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gray-100 dark:bg-[#0a0a0a] py-16 px-6 text-center">
        <Bell className="mx-auto mb-4 text-[#ff6600]" size={32} />
        <h3 className="text-xl font-bold uppercase tracking-tighter">Não perca nenhum show</h3>
        <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Ative as notificações para novos eventos no Brasil.</p>
        <button className="mt-8 px-10 py-4 border-2 border-black dark:border-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
          Ativar Alertas
        </button>
      </section>
    </div>
  );
};

export default EventsPage;