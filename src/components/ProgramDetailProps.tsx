// src/components/ProgramDetail.tsx

import React, { useState, useEffect } from 'react';
import { Music, ArrowLeft } from 'lucide-react';
import { Program } from '../types';

interface Track {
  artist: string;
  title: string;
  artwork?: string;
  playedAt?: Date;
  isMusic?: boolean;
}

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
  onViewSchedule: () => void;
}

// ✅ Mapa de artistas gospel brasileiros → imagem no Cloudinary
const ARTIST_ARTWORK_MAP: Record<string, string> = {
  "Aline Barros": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp",
  "Gabriela Rocha": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp",
  "Fernandinho": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp",
  "Isaias Saad": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp",
  "Ana Paula Valadão": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ana_Paula_Valad%C3%A3o_qkqjvz.webp",
  "Davi Sacer": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Davi_Sacer_gxgkqh.webp",
  "Ludmila Ferber": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ludmila_Ferber_vy8vqj.webp",
  "Paulo César Baruk": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Paulo_C%C3%A9sar_Baruk_wnrj1h.webp",
  "Mariana Valadão": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Mariana_Valad%C3%A3o_yd1qwu.webp",
  "Anderson Freire": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Anderson_Freire_jkqkxn.webp",
  "Cassiane": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Cassiane_zcplqx.webp",
  "Ton Carfi": "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ton_Carfi_r1xqhk.webp",
};

// ✅ Fallback genérico (logo Praise FM)
const FALLBACK_ARTWORK = "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp";

// Mock tracks for demonstration
const MOCK_TRACKS: Track[] = [
  {
    artist: "Aline Barros",
    title: "Graça Amazvelha",
    isMusic: true,
  },
  {
    artist: "Gabriela Rocha",
    title: "Ele Vem",
    isMusic: true,
  },
  {
    artist: "Anderson Freire",
    title: "Ressurreição",
    isMusic: true,
  },
  {
    artist: "Fernandinho",
    title: "Glória a Deus",
    isMusic: true,
  },
];

const ProgramDetail: React.FC<ProgramDetailProps> = ({
  program,
  onBack,
  onViewSchedule,
}) => {
  const [artworks, setArtworks] = useState<Record<string, string>>({});

  const displayedTracks = MOCK_TRACKS
    .filter(track => track.isMusic !== false)
    .slice(0, 4);

  useEffect(() => {
    const resolveArtworks = () => {
      const newArtworks: Record<string, string> = {};
      let changed = false;

      for (const track of displayedTracks) {
        const key = `${track.artist}-${track.title}`;
        if (!artworks[key]) {
          // ✅ Prioridade 1: artwork já fornecido
          if (track.artwork) {
            newArtworks[key] = track.artwork;
          }
          // ✅ Prioridade 2: mapa local de artistas
          else if (ARTIST_ARTWORK_MAP[track.artist]) {
            newArtworks[key] = ARTIST_ARTWORK_MAP[track.artist];
          }
          // ✅ Prioridade 3: fallback genérico
          else {
            newArtworks[key] = FALLBACK_ARTWORK;
          }
          changed = true;
        }
      }

      if (changed) {
        setArtworks(prev => ({ ...prev, ...newArtworks }));
      }
    };

    if (displayedTracks.length > 0) {
      resolveArtworks();
    }
  }, [displayedTracks, artworks]);

  return (
    <section className="bg-white dark:bg-[#121212] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header com info do programa */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#ff6600] pl-6">
          <div>
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white tracking-tighter uppercase">
              {program.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              {program.host} • {program.startTime} - {program.endTime}
            </p>
          </div>
          <Music className="w-8 h-8 text-[#ff6600] opacity-20" />
        </div>

        {/* Descrição */}
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          {program.description}
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-300 hover:text-[#ff6600] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <button
            onClick={onViewSchedule}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6600] hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Ver horário completo →
          </button>
        </div>

        {/* Tabela de músicas */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b-2 border-gray-900 dark:border-white text-[11px] font-bold uppercase tracking-widest mb-2">
          <div className="col-span-8 md:col-span-6">Música</div>
          <div className="col-span-4 md:col-span-6">Artista</div>
        </div>

        <div className="flex flex-col">
          {displayedTracks.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">
              Nenhuma música encontrada.
            </div>
          ) : (
            displayedTracks.map((track, idx) => {
              const key = `${track.artist}-${track.title}`;
              const artworkUrl = artworks[key] || FALLBACK_ARTWORK;

              return (
                <div
                  key={key}
                  className="grid grid-cols-12 gap-4 py-5 border-b border-gray-100 dark:border-white/5 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
                >
                  <div className="col-span-8 md:col-span-6 flex items-center space-x-6">
                    <span className="text-[11px] text-gray-400 w-4 font-bold tabular-nums">
                      0{idx + 1}
                    </span>

                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-sm">
                      <img
                        src={artworkUrl}
                        alt={`${track.title} - ${track.artist}`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_ARTWORK;
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 truncate uppercase">
                        {track.title}
                      </span>
                      <span className="md:hidden text-xs text-[#ff6600] truncate">
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-6">
                    <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 uppercase truncate block">
                      {track.artist}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ProgramDetail;