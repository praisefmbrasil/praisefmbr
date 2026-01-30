import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Program } from '../types';
import { SCHEDULES } from '../constants';

// A INTERFACE CORRIGIDA AQUI:
interface ScheduleListProps {
  onNavigateToProgram: (program: Program) => void;
  onBack: () => void; // <--- O TypeScript agora permite o uso do onBack
}

const ScheduleList: React.FC<ScheduleListProps> = ({ onNavigateToProgram, onBack }) => {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  
  return (
    <div className="bg-white dark:bg-[#000] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        {/* Botão Voltar com estilo Praise FM */}
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-[#ff6600] transition-colors group mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">Voltar ao Início</span>
        </button>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 italic dark:text-white">
          Grade de<br /><span className="text-[#ff6600]">Programação</span>
        </h1>

        <div className="space-y-20">
          {days.map((dayName, dayIndex) => (
            <section key={dayName} className="border-t-4 border-black dark:border-white pt-8">
              <h2 className="text-3xl font-black uppercase mb-8 flex items-center dark:text-white">
                <Calendar className="mr-4 text-[#ff6600]" />
                {dayName}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(SCHEDULES[dayIndex as keyof typeof SCHEDULES] || []).map((prog) => (
                  <div 
                    key={`${dayIndex}-${prog.id}`}
                    onClick={() => onNavigateToProgram(prog)}
                    className="group cursor-pointer bg-gray-50 dark:bg-[#0f0f0f] p-6 border border-transparent hover:border-[#ff6600] transition-all"
                  >
                    <div className="flex items-center text-[#ff6600] text-[10px] font-black uppercase tracking-widest mb-4">
                      <Clock className="w-3 h-3 mr-2" />
                      {prog.startTime} - {prog.endTime}
                    </div>
                    <h3 className="text-xl font-black uppercase dark:text-white group-hover:text-[#ff6600] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 uppercase font-bold">{prog.host}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;