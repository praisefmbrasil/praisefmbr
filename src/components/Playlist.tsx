import React, { useState } from 'react'
import {
  Flame,
  Headphones,
  Mic2,
  Music,
  Music2,
  Radio,
  Sparkles,
  Clock,
  Disc3,
} from 'lucide-react'

const GENRES = [
  { icon: Flame,      label: 'Worship',       sub: 'Adoração profunda' },
  { icon: Mic2,       label: 'Gospel',        sub: 'Nacionais e internacionais' },
  { icon: Headphones, label: 'Hip Hop',       sub: 'Flow cristão' },
  { icon: Music2,     label: 'Rock Cristão',  sub: 'Alta energia' },
  { icon: Disc3,      label: 'Clássicos',     sub: 'Hinos eternos' },
  { icon: Sparkles,   label: 'Nova Geração',  sub: 'Novos talentos' },
]

const CHIPS = ['Todos os gêneros', 'Worship', 'Gospel', 'Hip Hop Cristão', 'Rock Cristão', 'Clássicos']

const Playlist: React.FC = () => {
  const [activeChip, setActiveChip] = useState('Todos os gêneros')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#0a0a0a] rounded-[24px] px-10 py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 56px),' +
              'repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 56px)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-orange-500 text-[11px] font-black uppercase tracking-[0.28em] mb-5">
            <Radio className="w-4 h-4" />
            Praise FM Brasil
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.92] mb-5">
            Toda a <span className="text-orange-500">música</span>
            <br />em um lugar
          </h1>

          <p className="text-gray-400 text-base max-w-md leading-relaxed mb-8">
            Em breve, explore tudo que toca na Praise FM — gospel, worship, hip hop cristão, rock e muito mais.
          </p>

          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Tocando agora na rádio
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap pt-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${
              activeChip === chip
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-orange-500/50'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Tocadas recentemente */}
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-500 mb-4">
          Tocadas recentemente
        </p>

        <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4 px-5 py-4">
            <span className="w-5 text-sm text-center text-gray-400">1</span>
            <div className="w-11 h-11 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
              <Music className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                Aguardando próxima música
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Praise FM Brasil</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-full">
              Ao vivo
            </span>
          </div>
        </div>
      </div>

      {/* Gêneros */}
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-500 mb-4">
          Explorar por gênero
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRES.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col gap-2 p-5 rounded-2xl border border-black/5 dark:border-white/5 hover:border-orange-500/40 hover:bg-gray-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
            >
              <Icon className="w-6 h-6 text-orange-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">{label}</span>
              <span className="text-xs text-gray-400">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Em breve */}
      <div className="bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[20px] p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mx-auto mb-5 flex items-center justify-center">
          <Clock className="w-7 h-7 text-gray-300 dark:text-gray-600" />
        </div>

        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
          Playlist completa em breve
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-7">
          Estamos organizando todo o catálogo para você explorar, curtir e descobrir músicas novas direto da Praise FM Brasil.
        </p>

        <a
          href="https://www.instagram.com/praisefmbrasil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-wide transition-all"
        >
          Siga-nos no Instagram
        </a>
      </div>

    </div>
  )
}

export default Playlist