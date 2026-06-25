import React from 'react';
import { ArrowRight, Radio } from 'lucide-react';
import { Program } from '../types';
import { SCHEDULES } from '../constants';

interface PresentersPageProps {
  onNavigateToProgram: (program: Program) => void;
}

const PRESENTERS_DATA = [
  {
    name: 'Samuel Andrade',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/samuel_andrade_k3botd.webp',
    bio: 'Nas madrugadas, Samuel conduz um momento de paz e adoração profunda para quem busca a presença de Deus nas primeiras horas do dia.',
    programTitle: 'Madrugada com Cristo',
    tag: 'Madrugada · 00h–06h',
  },
  {
    name: 'Lucas Martins',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/lucas_martins_qmdc5s.webp',
    bio: 'Lucas traz energia, louvor e edificação para você começar bem o seu dia. A voz que aquece as manhãs da Praise FM Brasil.',
    programTitle: 'Manhã com Cristo',
    tag: 'Manhã · 07h–12h',
  },
  {
    name: 'Rafael Costa',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/rafael_costa_qxzwrf.webp',
    bio: 'Rafael seleciona o melhor do gospel para acompanhar sua tarde com alegria e fé, de segunda a domingo.',
    programTitle: 'Tarde Gospel',
    tag: 'Tarde · 13h–16h',
  },
  {
    name: 'Ana Paula',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/ana_paula_wjuwju.webp',
    bio: 'Ana Paula descobre e apresenta os novos talentos que estão moldando o futuro da música cristã no Brasil.',
    programTitle: 'Nova Geração',
    tag: 'Tarde · 16h–17h',
  },
  {
    name: 'Dj Patrick',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/patick_silva_r4lpvp.webp',
    bio: 'Dj Patrick comanda o Flow com o melhor do hip hop cristão — batidas que evangelizam e movem multidões.',
    programTitle: 'Praise FM Flow',
    tag: 'Flow · 17h–18h',
  },
  {
    name: 'Bruno Almeida',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/bruno_almeida_hfmekk.webp',
    bio: 'Bruno é a companhia ideal no trânsito e na volta para casa, com músicas que abençoam o fim do seu dia.',
    programTitle: 'De Carona',
    tag: 'Noite · 18h–20h',
  },
  {
    name: 'Cesar Brum',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/cesar_brum_auudhy.webp',
    bio: 'Cesar apresenta o melhor do rock cristão nacional e internacional com intensidade e muita fé.',
    programTitle: 'Praise FM Rock',
    tag: 'Noite · 20h–21h',
  },
  {
    name: 'Rodrigo Veras',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/rodrigo_veras_esognm.webp',
    bio: 'Rodrigo revisita os hinos e canções que marcaram gerações, resgatando a história viva da música gospel.',
    programTitle: 'Praise FM Clássicos',
    tag: 'Noite · 21h–22h',
  },
  {
    name: 'Janaina Costa',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/ana_paula_wjuwju.webp',
    bio: 'Janaina torna o domingo especial, com uma seleção de louvores que preparam o coração para uma nova semana.',
    programTitle: 'Domingo com Cristo',
    tag: 'Domingo · 07h–12h',
  },
];

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {

  const findProgram = (title: string): Program | null => {
    for (let day = 0; day <= 6; day++) {
      const daySchedule = SCHEDULES[day as keyof typeof SCHEDULES] || [];
      const prog = daySchedule.find(
        (p) => p.title.trim().toLowerCase() === title.trim().toLowerCase()
      );
      if (prog) return prog;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#0a0a0a] pt-24 pb-20 px-4">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px), repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 text-orange-500 text-[11px] font-black uppercase tracking-[0.3em] mb-6">
            <Radio className="w-4 h-4" />
            Praise FM Brasil
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-6">
            Nossos<br />
            <span className="text-orange-500">Locutores</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            As vozes que levam louvor, fé e o melhor do gospel direto para você — 24 horas por dia.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESENTERS_DATA.map((presenter, idx) => {
            const program = findProgram(presenter.programTitle);

            return (
              <div
                key={idx}
                className="group relative bg-gray-50 dark:bg-[#111] rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5 flex flex-col"
              >
                {/* Foto */}
                <div className="relative h-72 overflow-hidden bg-black">
                  <img
                    src={presenter.image}
                    alt={presenter.name}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Tag do horário */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {presenter.tag}
                    </span>
                  </div>

                  {/* Nome sobre a foto */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h2 className="text-2xl font-black text-white leading-tight">
                      {presenter.name}
                    </h2>
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mt-1">
                      {presenter.programTitle}
                    </p>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-grow mb-6">
                    {presenter.bio}
                  </p>

                  <button
                    onClick={() => program && onNavigateToProgram(program)}
                    disabled={!program}
                    className={`w-full py-3.5 px-5 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      program
                        ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white'
                        : 'bg-gray-200 dark:bg-[#1a1a1a] text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {program ? (
                      <>
                        Ver Programa
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      'Programa não encontrado'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Programação */}
        <div className="mt-20 rounded-[2rem] bg-orange-500 p-10 md:p-16 text-center text-white">
          <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Grade de Programação 2026
          </h3>
          <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Acompanhe a Praise FM Brasil de segunda a domingo e não perca nenhum momento de louvor.
          </p>
          <button
            onClick={() => (window.location.hash = '#/schedule')}
            className="bg-white text-black hover:bg-black hover:text-white transition-all px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider"
          >
            Ver Programação Completa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;