import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, AlertCircle, Clock, User, Share2 } from 'lucide-react';
import { programs } from '../constants'; 
import type { Program } from '../types';

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Buscando o programa e forçando a tipagem para evitar erro de 'any'
  const program = programs.find((p: Program) => p.id === id);

  // 1. Estado: Carregando (fallback caso o ID demore a chegar)
  if (!id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ff6600] animate-spin" />
      </div>
    );
  }

  // 2. Estado: Programa não encontrado
  if (!program) {
    return (
      <div className="min-h-screen bg-[#000] flex flex-col items-center justify-center text-white p-6">
        <AlertCircle className="w-16 h-16 text-[#ff6600] mb-6 opacity-50" />
        <h2 className="text-3xl font-medium uppercase tracking-tighter mb-4">Programa não encontrado</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm font-light">
          O programa que você está procurando não existe ou foi removido da nossa grade.
        </p>
        <button 
          onClick={() => navigate('/schedule')}
          className="flex items-center space-x-3 text-white border border-white/20 px-8 py-3 hover:bg-[#ff6600] hover:border-[#ff6600] transition-all uppercase text-[10px] tracking-[0.3em]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Grade</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white font-sans antialiased">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden border-b border-white/5">
        <img 
          src={program.image} 
          alt={program.title} 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
              <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Voltar</span>
            </button>
            
            <h1 className="text-6xl md:text-9xl font-medium uppercase tracking-tighter leading-[0.8] mb-8">
              {program.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#ff6600] flex items-center justify-center text-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Apresentação</p>
                  <p className="text-sm font-medium uppercase">{program.host}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">Horário</p>
                  <p className="text-sm font-medium uppercase">{program.startTime} — {program.endTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#ff6600] mb-8">Sobre a Atração</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-2xl md:text-3xl text-gray-300 leading-snug font-light mb-12">
                {program.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-6 pt-12 border-t border-white/5">
               <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar</span>
               </button>
            </div>
          </div>

          <div className="lg:col-span-4">
             <div className="bg-[#111] p-10 border border-white/5">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#ff6600] mb-6">Sintonize</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Acompanhe este programa ao vivo através do nosso player principal ou em nossos aplicativos para iOS e Android.
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full py-4 bg-white text-black text-[11px] font-medium uppercase tracking-[0.3em] hover:bg-[#ff6600] transition-colors"
                >
                  Ouvir Praise FM Agora
                </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetailPage;