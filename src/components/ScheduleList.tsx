import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SCHEDULES } from '../constants';
import { Program } from '../types';

const ScheduleList: React.FC<{ onNavigateToProgram: (p: Program) => void }> = ({ onNavigateToProgram }) => {
  const navigate = useNavigate();
  const [now] = useState(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })));

  const currentSchedule = useMemo(() => SCHEDULES[now.getDay()] || SCHEDULES[1], [now]);

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 pb-24">
      <button onClick={() => navigate('/app')} className="flex items-center text-[#ff6600] font-bold text-xs uppercase mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>

      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12 border-b-4 border-black dark:border-white pb-4">
        Programação
      </h1>

      <div className="space-y-12">
        {currentSchedule.map((prog) => (
          <div 
            key={prog.id} 
            onClick={() => onNavigateToProgram(prog)}
            className="flex items-start space-x-6 group cursor-pointer border-b border-gray-100 dark:border-white/5 pb-8"
          >
            <span className="text-2xl font-black text-gray-300 dark:text-gray-800 group-hover:text-[#ff6600] transition-colors">
              {prog.startTime}
            </span>
            <div>
              <h4 className="text-xl font-bold uppercase group-hover:text-[#ff6600]">{prog.title}</h4>
              <p className="text-sm text-gray-500 uppercase font-bold">com {prog.host}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;