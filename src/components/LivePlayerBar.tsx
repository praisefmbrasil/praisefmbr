import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, List, X } from 'lucide-react';
import { Program } from '../types';

interface LivePlayerBarProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  program: Program;
  queue?: Program[];
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const LivePlayerBar: React.FC<LivePlayerBarProps> = ({
  isPlaying,
  onTogglePlayback,
  program,
  queue = [],
  audioRef
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [volume, setVolume] = useState(
    () => Number(localStorage.getItem('praise-volume')) || 0.8
  );
  const [muted, setMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  /* ======================
     AUDIO SYNC
  ====================== */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
    localStorage.setItem('praise-volume', volume.toString());
  }, [volume, muted, audioRef]);

  const handleToggle = () => {
    if (!hasStarted) setHasStarted(true);
    onTogglePlayback();
  };

  /* ======================
     BEFORE PLAY
  ====================== */
  if (!hasStarted) {
    return (
      <div className="flex justify-center py-12">
        <button
          onClick={handleToggle}
          className="text-sm font-semibold uppercase tracking-widest px-12 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
        >
          TOCAR
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ======================
          SCHEDULE DRAWER
      ====================== */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[380px] bg-white dark:bg-[#121212] z-[90] transition-transform ${
          showSchedule ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-white/10">
          <span className="font-semibold">Programação</span>
          <button onClick={() => setShowSchedule(false)}>
            <X />
          </button>
        </div>

        <div className="overflow-y-auto">
          {[program, ...queue].slice(0, 5).map((p, i) => (
            <div key={p.id} className="flex gap-4 p-4 border-b dark:border-white/5">
              <img src={p.image} className="w-12 h-12 rounded object-cover" />
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-xs text-gray-500">{p.host}</p>
                {i === 0 && (
                  <span className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSchedule && (
        <div
          className="fixed inset-0 bg-black/40 z-[80]"
          onClick={() => setShowSchedule(false)}
        />
      )}

      {/* ======================
          BBC PRO PLAYER
      ====================== */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#121212] border-t dark:border-white/10 animate-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between px-6 py-3">

          {/* INFO */}
          <div className="min-w-0">
            <p className="font-semibold truncate">{program.title}</p>
            <p className="text-xs text-gray-500 truncate">{program.host}</p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-6">

            {/* LIVE */}
            {isPlaying && (
              <div className="flex items-center gap-1 text-xs font-bold uppercase text-red-500">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live
              </div>
            )}

            {/* PLAY */}
            <button
              onClick={handleToggle}
              className="text-sm font-semibold uppercase tracking-widest hover:opacity-70"
            >
              {isPlaying ? 'PAUSAR' : 'TOCAR'}
            </button>

            {/* VOLUME */}
            <div
              className="relative"
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              <button onClick={() => setMuted(m => !m)}>
                {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
              </button>

              {showVolume && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 accent-black dark:accent-white"
                />
              )}
            </div>

            {/* QUEUE */}
            <button onClick={() => setShowSchedule(true)}>
              <List />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivePlayerBar;
