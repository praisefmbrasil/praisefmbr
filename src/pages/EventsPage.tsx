import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Ticket,
  Bell,
  Search,
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

// ✅ Artistas gospel brasileiros
const ARTISTS: Artist[] = [
  {
    name: 'Aline Barros',
    genre: 'Adoração',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp',
  },
  {
    name: 'Gabriela Rocha',
    genre: 'Worship',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
  },
  {
    name: 'Fernandinho',
    genre: 'Pop Gospel',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
  },
  {
    name: 'Isaias Saad',
    genre: 'Adoração',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp',
  },
];

const EventsPage: React.FC = () => {
  const [loadingArtist, setLoadingArtist] = useState<string | null>(null);
  const [events, setEvents] = useState<Record<string, EventItem[]>>({});

  const findEvents = (artistName: string) => {
    setLoadingArtist(artistName);
    // 🔧 MOCK: Simula eventos no Brasil
    setTimeout(() => {
      setEvents((prev) => ({
        ...prev,
        [artistName]: [
          {
            date: '15 Nov, 2025',
            venue: 'Arena Corinthians',
            city: 'São Paulo, SP',
            link: 'https://www.sympla.com.br',
          },
          {
            date: '03 Dez, 2025',
            venue: 'Jeunesse Arena',
            city: 'Rio de Janeiro, RJ',
            link: 'https://www.ingresso.com',
          },
        ],
      }));
      setLoadingArtist(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* HERO */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-[#ff6600] mb-4">
            <Ticket size={18} />
            <span className="text-xs tracking-widest uppercase">
              Shows & Eventos
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-medium uppercase tracking-tight">
            Eventos Gospel
          </h1>
          <p className="mt-6 max-w-2xl text-gray-400 uppercase text-sm tracking-wide">
            Descubra os próximos shows e eventos gospel pelo Brasil.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {ARTISTS.map((artist) => (
          <div
            key={artist.name}
            className="flex flex-col md:flex-row bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-white/10"
          >
            {/* IMAGE */}
            <div className="md:w-1/3 aspect-square">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-8 flex-1">
              <span className="text-[#ff6600] text-xs uppercase tracking-widest">
                {artist.genre}
              </span>
              <h2 className="text-3xl uppercase tracking-tight mt-2">
                {artist.name}
              </h2>
              <button
                onClick={() => findEvents(artist.name)}
                className="mt-6 inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#ff6600] hover:text-white transition"
              >
                <Search size={14} />
                {loadingArtist === artist.name ? 'Buscando…' : 'Ver Ingressos'}
              </button>

              {/* EVENTS */}
              {events[artist.name] && (
                <div className="mt-8 space-y-4">
                  {events[artist.name].map((event, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-100 dark:border-white/10 p-4 bg-white dark:bg-black"
                    >
                      <div className="flex items-center gap-4">
                        <Calendar className="text-[#ff6600]" size={18} />
                        <div>
                          <p className="font-medium">{event.venue}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            {event.date} · {event.city}
                          </p>
                        </div>
                      </div>
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#ff6600] text-xs uppercase tracking-widest flex items-center gap-1"
                      >
                        Comprar Ingressos
                        <MapPin size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EventsPage;