// src/components/Hero.tsx
import React, { useMemo, type FC } from 'react';
import { SCHEDULES } from '../constants';
import type { Program } from '../types';

interface HeroProps {
  onNavigateToProgram: (program: Program) => void;
}

const getSaoPauloDate = (baseDate: Date = new Date()) =>
  new Date(baseDate.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

const Hero: FC<HeroProps> = ({ onNavigateToProgram }) => {
  const now = getSaoPauloDate();

  const currentSchedule = useMemo(() => {
    const dayIndex = now.getDay();
    return SCHEDULES[dayIndex] || SCHEDULES[1];
  }, [now]);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const liveProgram = useMemo(() => {
    return currentSchedule.find(prog => {
      const [sH, sM] = prog.startTime.split(':').map(Number);
      const [eH, eM] = prog.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      let end = eH * 60 + eM;
      if (end === 0 || end <= start) end = 24 * 60;
      return nowMinutes >= start && nowMinutes < end;
    });
  }, [currentSchedule, nowMinutes]);

  if (!liveProgram) return null;

  return (
    <section className="bg-[#f2f2f2] dark:bg-[#000] py-12 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
          No Ar Agora
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-4">
          {liveProgram.title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          com {liveProgram.host}
        </p>
        <button 
          onClick={() => onNavigateToProgram(liveProgram)} 
          className="bg-[#ff6600] hover:bg-[#e65a00] text-white px-6 py-3 font-medium uppercase tracking-widest transition-colors rounded-md"
        >
          Ver detalhes
        </button>
      </div>
    </section>
  );
};

export default Hero;
