import React from 'react';
import { Play, Pause, Radio, Music } from 'lucide-react';
import { Program } from '../types';

interface HeroProps {
  onListenClick: () => void;
  isPlaying: boolean;
  liveMetadata: {
    artist: string;
    title: string;
    isMusic?: boolean;
  } | null;
  onNavigateToProgram: (program: Program) => void;
}

const Hero: React.FC<HeroProps> = ({ onListenClick, isPlaying, liveMetadata, onNavigateToProgram }) => {
  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-black">
      {/* Background com Overlay Dinâmico */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="max-w-3xl">
          {/* Badge de Status */}
          <div className="flex items-center space-x-3 mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 bg-[#ff6600] px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Ao Vivo</span>
            </div>
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Praise FM Brasil</span>
          </div>

          {/* Título Principal Dinâmico */}
          <h1 className="text-6xl md:text-8xl font-medium text-white uppercase tracking-tighter leading-[0.85] mb-8">
            {liveMetadata?.isMusic ? (
              <>
                <span className="text-[#ff6600]">Tocando:</span><br />
                {liveMetadata.title}
              </>
            ) : (
              <>
                Sua Dose<br />Diária de <span className="text-[#ff6600]">Adoração</span>
              </>
            )}
          </h1>

          {/* Info da Música ou Locutor */}
          <div className="flex flex-col space-y-6 mb-12">
            <p className="text-xl text-gray-300 font-light uppercase tracking-tight max-w-xl">
              {liveMetadata?.isMusic 
                ? `Agora na voz de ${liveMetadata.artist}`
                : "Conectando o seu coração ao trono de Deus com os melhores louvores e mensagens de fé."
              }
            </p>

            {liveMetadata?.isMusic && (
              <div className="flex items-center space-x-4 text-[#ff6600]">
                <Music className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest animate-bounce-sideways">
                  Música em destaque
                </span>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={onListenClick}
              className="flex items-center justify-center space-x-4 bg-white text-black px-10 py-6 rounded-none hover:bg-[#ff6600] hover:text-white transition-all group active:scale-95 shadow-2xl"
            >
              {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                {isPlaying ? 'Pausar Rádio' : 'Ouvir Agora'}
              </span>
            </button>

            <button 
              onClick={() => window.location.hash = '#/schedule'}
              className="flex items-center justify-center space-x-4 border border-white/20 bg-white/5 backdrop-blur-md text-white px-10 py-6 rounded-none hover:bg-white hover:text-black transition-all active:scale-95"
            >
              <Radio className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Ver Programação</span>
            </button>
          </div>
        </div>
      </div>

      {/* Indicador Visual de Áudio (Visualizer) */}
      {isPlaying && (
        <div className="absolute bottom-0 right-0 p-12 hidden lg:flex items-end space-x-1 h-32">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="w-1 bg-[#ff6600] animate-music-bar"
              style={{ 
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s` 
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;