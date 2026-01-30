import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Program } from '../types';
import { SCHEDULES } from '../constants';

interface PresentersPageProps {
  onNavigateToProgram: (program: Program) => void;
}

const PRESENTERS_DATA = [
  {
    name: 'Samuel Andrade',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
    bio: 'Samuel conduz o "Madrugada com Cristo", trazendo uma palavra de paz e adoração profunda para quem busca a presença de Deus nas primeiras horas do dia.',
    programTitle: 'Madrugada com Cristo'
  },
  {
    name: 'Lucas Martins',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
    bio: 'Comanda o "Manhã com Cristo", trazendo energia, louvores inspiradores e a motivação necessária para começar o seu dia bem informado e abençoado.',
    programTitle: 'Manhã com Cristo'
  },
  {
    name: 'Rafael Costa',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
    bio: 'O apresentador do "Tarde Gospel", selecionando as melhores músicas para acompanhar sua rotina com alegria e mensagens de fé.',
    programTitle: 'Tarde Gospel'
  },
  {
    name: 'Ana Paula',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
    bio: 'Ana Paula apresenta o "Praise FM Nova Geração", focando nos novos talentos e nas batidas que movem a juventude cristã no Brasil.',
    programTitle: 'Praise FM Nova Geração'
  },
  {
    name: 'Bruno Almeida',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
    bio: 'No comando do "De Carona com a Praise FM", Bruno traz dinamismo e os grandes sucessos para o seu trajeto, garantindo uma volta para casa abençoada.',
    programTitle: 'De Carona com a Praise FM'
  },
  {
    name: 'Rodrigo Veras',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
    bio: 'Rodrigo apresenta o "Praise FM Brasil Clássicos", revisitando os hinos e canções que marcaram gerações e construíram a história da música gospel.',
    programTitle: 'Praise FM Brasil Clássicos'
  },
  {
    name: 'Felipe Santos',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
    bio: 'Responsável pelo "Domingo com Cristo", Felipe torna suas manhãs de domingo especiais com uma seleção de louvores que preparam o coração para a semana.',
    programTitle: 'Domingo com Cristo'
  },
  {
    name: 'Thiago Moreira',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
    bio: 'Thiago apresenta o "Praise FM Pop", trazendo o melhor do cenário cristão contemporâneo em um ritmo acelerado e envolvente.',
    programTitle: 'Praise FM Pop'
  }
];

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  
  const findProgram = (title: string) => {
    // Busca em todos os dias da semana no arquivo constants
    for (let day = 0; day <= 6; day++) {
      const daySchedule = SCHEDULES[day as keyof typeof SCHEDULES] || [];
      const prog = daySchedule.find(p => p.title.toUpperCase() === title.toUpperCase());
      if (prog) return prog;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header Estilo Brutalista */}
      <div className="bg-black text-white py-24 border-b-4 border-[#ff6600] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-[#ff6600] mb-8 font-black uppercase tracking-[0.4em] text-[10px]">
            <Users className="w-5 h-5 fill-current" />
            <span>As Vozes da Praise FM Brasil</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-10 italic">Nossos<br />Locutores</h1>
          <p className="text-xl text-gray-400 max-w-2xl font-bold uppercase tracking-tight leading-tight">
            Conheça o time dedicado a levar a palavra de Deus e o melhor do louvor nacional até você.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRESENTERS_DATA.map((presenter, idx) => {
            const program = findProgram(presenter.programTitle);
            
            return (
              <div key={idx} className="flex flex-col group bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-[20px_20px_0px_#ff660026]">
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img 
                    src={presenter.image} 
                    alt={presenter.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-[#ff6600] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">{presenter.programTitle}</span>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">{presenter.name}</h2>
                  </div>
                </div>
                
                <div className="p-10 flex-grow flex flex-col">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bold leading-relaxed mb-10 uppercase tracking-tight">
                    {presenter.bio}
                  </p>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => program && onNavigateToProgram(program)}
                      disabled={!program}
                      className={`w-full py-5 px-6 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 transition-all group/btn ${
                        program 
                        ? "bg-[#ff6600] text-white hover:bg-black dark:hover:bg-white dark:hover:text-black" 
                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                      }`}
                    >
                      <span>{program ? 'Ver Programa' : 'Programa não encontrado'}</span>
                      {program && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer de Programação */}
        <div className="mt-32 bg-gray-50 dark:bg-[#080808] p-12 md:p-24 flex flex-col items-center text-center border-4 border-black dark:border-white">
          <h4 className="text-5xl md:text-6xl font-black uppercase tracking-tighter dark:text-white mb-8 italic">Grade de Programação 2026</h4>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl font-bold uppercase tracking-widest text-[10px] mb-12 leading-relaxed">
            Acompanhe a Praise FM Brasil de segunda a domingo e não perca nenhum momento.
          </p>
          <button 
            onClick={() => window.location.hash = '#/schedule'}
            className="bg-black dark:bg-white text-white dark:text-black px-16 py-6 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-[8px_8px_0px_#ff6600] active:translate-y-1 active:shadow-none"
          >
            Ver Programação Completa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;