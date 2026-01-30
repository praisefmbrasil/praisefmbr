import React, { useState } from 'react'
import {
  Calendar,
  MapPin,
  Ticket,
  Search,
  ArrowLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type EventItem = {
  date: string
  venue: string
  city: string
  link: string
}

type Artist = {
  name: string
  genre: string
  image: string
}

// Artistas atualizados com os links do Cloudinary 
const ARTISTS: Artist[] = [
  {
    name: 'Fernandinho',
    genre: 'Christian Rock / Worship',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
  },
  {
    name: 'Isaias Saad',
    genre: 'Worship / Pop',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp',
  },
  {
    name: 'Gabriela Rocha',
    genre: 'Worship',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
  },
  {
    name: 'Aline Barros',
    genre: 'Gospel / Pop',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp',
  },
]

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loadingArtist, setLoadingArtist] = useState<string | null>(null)
  const [events, setEvents] = useState<Record<string, EventItem[]>>({})

  const findEvents = (artistName: string) => {
    setLoadingArtist(artistName)

    // Simulação de busca de eventos em solo brasileiro
    setTimeout(() => {
      setEvents((prev) => ({
        ...prev,
        [artistName]: [
          {
            date: '15 Mai, 2026',
            venue: 'Espaço Unimed',
            city: 'São Paulo, SP',
            link: 'https://www.eventim.com.br',
          },
          {
            date: '12 Jun, 2026',
            venue: 'Jeunesse Arena',
            city: 'Rio de Janeiro, RJ',
            link: 'https://www.ticketmaster.com.br',
          },
        ],
      }))
      setLoadingArtist(null)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#000] text-black dark:text-white pb-32">
      
      {/* HERO SECTION */}
      <section className="bg-black text-white pt-24 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-[#ff6600] mb-12 text-[10px] font-black uppercase tracking-[0.4em] group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>

          <div className="flex items-center gap-3 text-[#ff6600] mb-6">
            <Ticket size={20} className="stroke-[2.5px]" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase">
              Agenda Praise FM Brasil
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Eventos e<br />Shows
          </h1>

          <p className="mt-8 max-w-2xl text-gray-400 font-bold uppercase text-[11px] tracking-[0.2em] leading-relaxed">
            Acompanhe os maiores ministérios de louvor do país. Datas, locais e ingressos em um só lugar.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ff6600]/5 skew-x-[-20deg] translate-x-20" />
      </section>

      {/* LISTA DE ARTISTAS */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {ARTISTS.map((artist) => (
          <div
            key={artist.name}
            className="flex flex-col md:flex-row bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-sm overflow-hidden group shadow-2xl"
          >
            {/* IMAGEM DO ARTISTA  */}
            <div className="md:w-2/5 aspect-square md:aspect-auto overflow-hidden">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
            </div>

            {/* CONTEÚDO */}
            <div className="p-10 flex-1 flex flex-col justify-center">
              <span className="text-[#ff6600] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                {artist.genre}
              </span>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                {artist.name}
              </h2>

              <button
                onClick={() => findEvents(artist.name)}
                className="inline-flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all w-fit"
              >
                {loadingArtist === artist.name ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Buscando Agenda...
                  </div>
                ) : (
                  <>
                    <Search size={14} className="stroke-[3px]" />
                    Buscar Ingressos
                  </>
                )}
              </button>

              {/* LISTA DE DATAS ENCONTRADAS */}
              {events[artist.name] && (
                <div className="mt-12 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                  {events[artist.name].map((event, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row justify-between items-center gap-6 border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-black hover:border-[#ff6600] transition-all"
                    >
                      <div className="flex items-center gap-6 w-full">
                        <div className="bg-[#ff6600] p-3 text-black">
                          <Calendar size={20} className="stroke-[2.5px]" />
                        </div>
                        <div>
                          <p className="font-black uppercase text-sm tracking-tight">{event.venue}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                            {event.date} • {event.city}
                          </p>
                        </div>
                      </div>

                      <a
                        href={event.link}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-[9px] font-black uppercase tracking-widest hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        Comprar
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
  )
}

export default EventsPage