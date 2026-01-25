import React, { useState, useRef, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// Importe seus componentes aqui...
import { SCHEDULES } from './constants'; 
import { Program } from './types';

const STREAM_URL = 'https://stream.zeno.fm/hvwifp8ezc6tv';
const METADATA_URL = 'https://api.zeno.fm/mounts/metadata/subscribe/hvwifp8ezc6tv';

const BLOCKED_METADATA_KEYWORDS = [
  'praise fm', 'praisefm', 'commercial', 'spot', 'promo', 'ident', 'sweeper',
  'intro', 'outro', 'announcement', 'nova geração', 'de carona', 'domingo com cristo'
];

interface LiveMetadata {
  artist: string;
  title: string;
  playedAt?: Date;
  isMusic?: boolean;
}

const getBrazilDayAndTotalMinutes = () => {
  const now = new Date();
  const brazilDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const h = brazilDate.getHours();
  const m = brazilDate.getMinutes();
  return { day: brazilDate.getDay(), total: h * 60 + m };
};

const AppContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveMetadata, setLiveMetadata] = useState<LiveMetadata | null>(null);
  const [trackHistory, setTrackHistory] = useState<LiveMetadata[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('praise-theme') as 'light' | 'dark') || 'light');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null); // ✅ Corrigido
  const reconnectTimeoutRef = useRef<number | null>(null); // ✅ Corrigido

  const { day, total } = getBrazilDayAndTotalMinutes();
  
  const { currentProgram, queue } = useMemo(() => {
    const schedule = SCHEDULES[day] || SCHEDULES[1]; // ✅ Certifique-se que SCHEDULES está em constants.ts
    const currentIndex = schedule.findIndex(p => {
      const [sH, sM] = p.startTime.split(':').map(Number);
      const [eH, eM] = p.endTime.split(':').map(Number);
      const start = sH * 60 + sM;
      const end = eH === 0 ? 24 * 60 : eH * 60 + eM;
      return total >= start && total < end;
    });
    
    const current = currentIndex !== -1 ? schedule[currentIndex] : schedule[0];
    const nextFour = schedule.slice(currentIndex + 1, currentIndex + 5);
    
    return { currentProgram: current, queue: nextFour };
  }, [day, total]);

  // Lógica de Metadados corrigida
  useEffect(() => {
    const connectMetadata = () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
      const es = new EventSource(METADATA_URL);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        if (!event.data) return;
        try {
          const data = JSON.parse(event.data);
          const streamTitle = data.streamTitle || "";
          if (streamTitle.includes(' - ')) {
            const [artist, ...titleParts] = streamTitle.split(' - ');
            const title = titleParts.join(' - ').trim();
            const musicCheck = !BLOCKED_METADATA_KEYWORDS.some(k => streamTitle.toLowerCase().includes(k));
            
            const newMeta = { artist, title, playedAt: new Date(), isMusic: musicCheck };
            setLiveMetadata(newMeta);
            if (musicCheck) setTrackHistory(prev => [newMeta, ...prev].slice(0, 10));
          }
        } catch (e) {}
      };
    };
    connectMetadata();
    return () => eventSourceRef.current?.close();
  }, []);

  // ... Restante do componente (Routes, Navbar, etc)
  return (
      // Seu JSX aqui...
      <div /> 
  );
};