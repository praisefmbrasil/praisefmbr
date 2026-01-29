import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import type { Program } from '../types';
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
  
  // Função otimizada para encontrar programas na grade
  const findProgram = (title: string): Program | null => {
    // Usamos flat() para criar uma lista única de todos os programas cadastrados no SCHEDULES
    const allPrograms = Object.values(SCHEDULES).flat();
    return allPrograms.find(p => p.title === title) || null;
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300 antialiased">
      {/* Header Editorial */}
      <div className="bg-black text-white py-24 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center space-x-4 text-[#ff6600] mb-8">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">The Voices</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-medium uppercase tracking-tighter leading-[0.85] mb-10">
            Nossos<br />Apresentadores
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light uppercase tracking-tight leading-snug">
            Conheça a equipe dedicada a te aproximar do coração da adoração todos os dias, em todas as estações da sua vida.
          </p>
        </div>
        {/* Sutil detalhe de fundo para preencher o espaço */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-white/[0.02] text-[20vw] font-bold uppercase select-none pointer-events-none">
          Praise
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PRESENTERS_DATA.map((presenter, idx) => {
            const program = findProgram(presenter.programTitle);
            
            return (
              <div key={idx} className="flex flex-col group transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-[#111] mb-8">
                  <img 
                    src={presenter.image} 
                    alt={presenter.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#ff6600] text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      {presenter.programTitle}
                    </span>
                    <h2 className="text-4xl font-medium text-white uppercase tracking-tighter leading-none opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                      {presenter.name}
                    </h2>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex-grow flex flex-col px-2">
                  <h3 className="text-2xl font-medium uppercase tracking-tighter dark:text-white mb-4 md:hidden">
                    {presenter.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed mb-8">
                    {presenter.bio}
                  </p>
                  
                  <div className="mt-auto">
                    {program ? (
                      <button 
                        onClick={() => onNavigateToProgram(program)}
                        className="group/btn flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-[#ff6600] dark:hover:text-[#ff6600] transition-colors"
                      >
                        <span>Explorar Programa</span>
                        <div className="w-8 h-[1px] bg-current group-hover/btn:w-12 transition-all"></div>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest italic">Programação em breve</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Final */}
        <div className="mt-32 py-24 border-t border-gray-100 dark:border-white/5 flex flex-col items-center text-center">
           <h4 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter dark:text-white mb-8">Não perca o horário</h4>
           <p className="text-gray-500 max-w-xl font-light uppercase tracking-tight text-base mb-12">
             Confira nossa grade completa para saber exatamente quando sintonizar em seus apresentadores favoritos.
           </p>
           <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Ou redirecionamento de rota
              className="border border-black dark:border-white text-black dark:text-white px-16 py-6 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#ff6600] hover:border-[#ff6600] hover:text-white transition-all"
            >
              Grade de Programação
            </button>
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;