import { Play, Pause, Loader2, Volume2, ListMusic } from 'lucide-react';
import { usePlayer } from '../contexts/LivePlayerContext';

export function LivePlayerBar() {
  const { isPlaying, isBuffering, togglePlay, currentTrack, volume, changeVolume } = usePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      
      {/* Barra de Progresso Laranja */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gray-100 dark:bg-zinc-800">
        <div className="h-full bg-praise-accent w-full shadow-[0_0_8px_#ff6600]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Info da Música (Esquerda) */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-praise-accent rounded flex-shrink-0 flex items-center justify-center shadow-sm">
            <ListMusic className="text-white w-6 h-6" />
          </div>
          
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-praise-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider text-praise-accent">Ao Vivo</span>
            </div>
            <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white truncate">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controle Central (Play/Pause) */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            disabled={isBuffering}
            className="w-12 h-12 md:w-14 md:h-14 bg-praise-accent hover:scale-105 active:scale-95 transition-all rounded-full flex items-center justify-center text-white shadow-lg disabled:opacity-70"
            aria-label={isPlaying ? "Pausar transmissão ao vivo" : "Tocar transmissão ao vivo"}
          >
            {isBuffering ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>

        {/* Volume (Direita - Desktop) */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-praise-accent"
          />
          <div className="text-[10px] font-bold text-gray-400 ml-2 border border-gray-400 px-1 rounded uppercase">
            AO VIVO
          </div>
        </div>

      </div>
    </div>
  );
}