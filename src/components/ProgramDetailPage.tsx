import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, AlertCircle, Clock, User, Share2 } from 'lucide-react';
import { programs } from '../constants'; 
import type { Program } from '../types';

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Corrigindo o erro de tipagem: definimos que 'p' é do tipo 'Program'
  const program = programs.find((p: Program) => p.id === id);

  // Fallback se o ID não existir na URL
  if (!id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ff6600] animate-spin" />
      </div>
    );
  }

  // Fallback se o programa não for encontrado no array
  if (!program) {
    return (
      <div className="min-h-screen bg-[#000] flex flex-col items-center justify-center text-white p-6">
        <AlertCircle className="w-16 h-16 text-[#ff6600] mb-6 opacity-50" />
        <h2 className="text-3xl font-medium uppercase tracking-tighter mb-4">Programa não encontrado</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm font-light">
          O programa que você está procurando não existe ou foi removido da grade da Praise FM.
        </p>
        <button 
          onClick={() => navigate('/schedule')}
          className="flex items-center space-x-3 text-white border border-white/20 px-8 py-3 hover:bg-[#ff6600] hover:border-[#ff6600] transition-all uppercase text-[10px] tracking-[0.3em]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ver Programação</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white font-sans antialiased">
      {/* Header Visual (Hero) */}
      <div className="relative h-[50vh] w-full overflow-hidden border-b border-white/5">
        <img 
          src={program.image} 
          alt={program.title} 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Voltar</span>
            </button>
            
            <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter leading-none mb-6">
              {program.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-[#ff6600]" />
                <p className="text-sm font-medium uppercase tracking-tight">{program.host}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#ff6600]" />
                <p className="text-sm font-medium uppercase tracking-tight">{program.startTime} — {program.endTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <main className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#ff6600] mb-8">Informações</h2>
            <p className="text-2xl text-gray-300 leading-relaxed font-light mb-12">
              {program.description}
            </p>
            
            <div className="pt-8 border-t border-white/10">
               <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar Programa</span>
               </button>
            </div>
          </div>

          <div className="lg:col-span-4">
             <div className="bg-[#111] p-8 border border-white/5 rounded-sm">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#ff6600] mb-6">Sintonize</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                  Acompanhe a Praise FM Brasil ao vivo pelo site ou app.
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full py-4 bg-white text-black text-[11px] font-medium uppercase tracking-[0.3em] hover:bg-[#ff6600] transition-colors"
                >
                  Ouvir Ao Vivo
                </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetailPage;