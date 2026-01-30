import React, { useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, List, X } from 'lucide-react';
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
  const [showSchedule, setShowSchedule] = useState(false);
  const [volume, setVolume] = useState<number>(
    () => Number(localStorage.getItem('praise-volume')) || 0.8
  );
  const [muted, setMuted] = useState(false);

  /* ======================
     AUDIO SYNC
  ====================== */
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
    localStorage.setItem('praise-volume', volume.toString());
  }, [volume, muted, audioRef]);

  /* ======================
     MEDIA SESSION (USA)
  ====================== */
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: program.title,
      artist: program.host,
      artwork: [
        { src: program.image, sizes: '512x512', type: 'image/png' }
      ]
    });

    navigator.mediaSession.setActionHandler('play', onTogglePlayback);
    navigator.mediaSession.setActionHandler('pause', onTogglePlayback);
  }, [program, onTogglePlayback]);

  return (
    <>
      {/* ======================
          SCHEDULE DRAWER
      ====================== */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[380px] bg-white dark:bg-[#121212] z-[90] transition-transform duration-300 ${
          showSchedule ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <span className="font-semibold text-black dark:text-white">
            Programação
          </span>
          <button onClick={() => setShowSchedule(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {[program, ...queue].slice(0, 5).map((p, i) => (
            <div
              key={p.id}
              className="flex gap-4 p-4 border-b border-gray-100 dark:border-white/5"
            >
              <img
                src={p.image}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="min-w-0">
                <p className="font-bold truncate text-black dark:text-white">
                  {p.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {p.host}
                </p>
                <p className="text-xs text-gray-400">
                  {p.startTime} – {p.endTime}
                </p>
                {i === 0 && (
                  <span className="text-xs font-bold text-[#00d9c9]">
                    AO VIVO
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
          PLAYER BAR (ALWAYS ON)
      ====================== */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between px-5 py-3">

          {/* INFO */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={program.image}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="font-semibold truncate text-black dark:text-white">
                {program.title}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {program.host}
              </p>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlayback}
              className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center"
            >
              {isPlaying ? <Pause /> : <Play className="ml-0.5" />}
            </button>

            <button onClick={() => setShowSchedule(true)}>
              <List />
            </button>

            <button onClick={() => setMuted(m => !m)}>
              {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivePlayerBar;
