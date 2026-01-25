import React from 'react';
import { Program } from '../types';
import { Play, Pause, Clock, ArrowLeft, Calendar } from 'lucide-react';

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
  onViewSchedule: () => void;
  onListenClick: () => void; // ✅ Adicionado para resolver Erro 2322
  isPlaying: boolean;
}

const ProgramDetail: React.FC<ProgramDetailProps> = ({ 
  program, 
  onBack, 
  onViewSchedule,
  onListenClick,
  isPlaying 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-6">
      <button onClick={onBack} className="flex items-center text-orange-500 mb-8 hover:opacity-80 transition">
        <ArrowLeft className="mr-2" size={20} />
        <span>Voltar para a Home</span>
      </button>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
        <div className="relative group">
          <img 
            src={program.image} 
            alt={program.title} 
            className="w-full aspect-square object-cover rounded-2xl shadow-2xl border border-gray-800"
          />
          <button 
            onClick={onListenClick}
            className="absolute bottom-6 right-6 bg-orange-500 p-6 rounded-full shadow-orange-500/20 shadow-xl hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} />}
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-orange-500 mb-4 font-bold uppercase tracking-widest text-sm">
            <Clock size={18} />
            <span>{program.startTime} - {program.endTime}</span>
          </div>
          
          <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase">{program.title}</h1>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">{program.description}</p>
          
          <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold">Apresentador</p>
              <p className="text-lg font-semibold">{program.host}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;