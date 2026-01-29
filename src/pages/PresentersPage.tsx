
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
    bio: 'A voz serena das suas madrugadas. Samuel traz momentos de oração profunda e louvores que preparam o seu espírito para o novo dia.',
    programTitle: 'Madrugada com Cristo'
  },
  {
    name: 'Lucas Martins',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
    bio: 'Comece seu dia com muita fé e energia. Lucas apresenta as principais novidades da música cristã e reflexões que edificam sua manhã.',
    programTitle: 'Manhã com Cristo'
  },
  {
    name: 'Rafael Costa',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
    bio: 'Sua tarde com os maiores sucessos do mundo gospel. Rafael traz interatividade e alegria para o seu horário de trabalho.',
    programTitle: 'Tarde Gospel'
  },
  {
    name: 'Ana Paula',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
    bio: 'Uma entusiasta dos novos talentos. Ana Paula apresenta a nova geração de artistas e os lançamentos mais frescos do worship nacional.',
    programTitle: 'Praise FM Nova Geração'
  },
  {
    name: 'Bruno Almeida',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
    bio: 'Sua melhor companhia na volta para casa. Bruno mistura os hits do momento com histórias inspiradoras e muita descontração no trânsito.',
    programTitle: 'De Carona com a Praise FM'
  },
  {
    name: 'Rodrigo Veras',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
    bio: 'Um mergulho na história da adoração. Rodrigo resgata os hinos inesquecíveis e as canções que marcaram gerações de cristãos no Brasil.',
    programTitle: 'Praise FM Brasil Clássicos'
  }
];

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  
  const findProgram = (title: string) => {
    // Procura em todos os dias do schedule o programa com esse título
    for (let day = 0; day <= 6; day++) {
      const prog = (SCHEDULES[day] || []).find(p => p.title === title);
      if (prog) return prog;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header Estilo BBC */}
      <div className="bg-black text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-[#ff6600] mb-6">
            <Users className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">As vozes da Praise FM Brasil</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-medium uppercase tracking-tighter leading-none mb-8">Nossos<br />Apresentadores</h1>
          <p className="text-xl text-gray-400 max-w-2xl font-normal uppercase tracking-tight leading-tight">
            Conheça a equipe dedicada a te aproximar do coração da adoração todos os dias, em todas as estações da sua vida.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESENTERS_DATA.map((presenter, idx) => {
            const program = findProgram(presenter.programTitle);
            
            return (
              <div key={idx} className="flex flex-col group bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={presenter.image} 
                    alt={presenter.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[#ff6600] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">{presenter.programTitle}</span>
                    <h2 className="text-3xl font-medium text-white uppercase tracking-tighter">{presenter.name}</h2>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-relaxed mb-8">
                    {presenter.bio}
                  </p>
                  
                  <div className="mt-auto">
                    {program && (
                      <button 
                        onClick={() => onNavigateToProgram(program)}
                        className="w-full bg-[#ff6600] text-white py-4 px-6 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 hover:bg-black transition-colors"
                      >
                        <span>Ver Programa</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Final */}
        <div className="mt-24 bg-gray-50 dark:bg-[#111] p-12 md:p-20 flex flex-col items-center text-center border border-gray-100 dark:border-white/5">
           <h4 className="text-4xl font-medium uppercase tracking-tighter dark:text-white mb-6">Quer ver a grade completa?</h4>
           <p className="text-gray-500 max-w-xl font-normal uppercase tracking-tight text-sm mb-10">
             Explore nossa programação diária completa e descubra todos os programas que fazem da Praise FM Brasil a sua casa principal de fé e música.
           </p>
           <button 
              onClick={() => window.location.hash = '#/schedule'}
              className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-xl active:scale-95"
            >
              Grade Completa
           </button>
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;
