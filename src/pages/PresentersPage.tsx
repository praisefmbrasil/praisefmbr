import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { SCHEDULES } from "../constants";

const PRESENTERS_DATA = [
  {
    name: "Samuel Andrade",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp",
    bio: "A voz serena das suas madrugadas. Samuel traz momentos de oração profunda e louvores que preparam o seu espírito para o novo dia.",
    programTitle: "Madrugada com Cristo",
  },
  {
    name: "Lucas Martins",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp",
    bio: "Comece seu dia com muita fé e energia. Lucas apresenta as principais novidades da música cristã e reflexões que edificam sua manhã.",
    programTitle: "Manhã com Cristo",
  },
  {
    name: "Rafael Costa",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp",
    bio: "Sua tarde com os maiores sucessos do mundo gospel. Rafael traz interatividade e alegria para o seu horário de trabalho.",
    programTitle: "Tarde Gospel",
  },
  {
    name: "Ana Paula",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp",
    bio: "Uma entusiasta dos novos talentos. Ana Paula apresenta a nova geração de artistas e os lançamentos mais frescos do worship nacional.",
    programTitle: "Praise FM Nova Geração",
  },
  {
    name: "Bruno Almeida",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp",
    bio: "Sua melhor companhia na volta para casa. Bruno mistura os hits do momento com histórias inspiradoras e muita descontração no trânsito.",
    programTitle: "De Carona com a Praise FM",
  },
  {
    name: "Rodrigo Veras",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp",
    bio: "Um mergulho na história da adoração. Rodrigo resgata os hinos inesquecíveis e as canções que marcaram gerações de cristãos no Brasil.",
    programTitle: "Praise FM Brasil Clássicos",
  },
];

const PresentersPage: React.FC = () => {
  const navigate = useNavigate();

  const findProgram = (title: string) => {
    for (let day = 0; day <= 6; day++) {
      const program = (SCHEDULES[day] || []).find(p => p.title === title);
      if (program) return program;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Header BBC */}
      <header className="bg-black text-white py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 text-[#ff6600] mb-6">
            <Users className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-[0.4em]">
              As vozes da Praise FM Brasil
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-8">
            Nossos<br />Apresentadores
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl uppercase">
            Pessoas chamadas para levar fé, esperança e música a cada momento do seu dia.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRESENTERS_DATA.map((presenter, idx) => {
          const program = findProgram(presenter.programTitle);

          return (
            <article
              key={idx}
              className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={presenter.image}
                  alt={presenter.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[#ff6600] text-[10px] uppercase tracking-[0.3em] block mb-1">
                    {presenter.programTitle}
                  </span>
                  <h2 className="text-3xl text-white uppercase tracking-tight">
                    {presenter.name}
                  </h2>
                </div>
              </div>

              <div className="p-8 flex flex-col">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                  {presenter.bio}
                </p>

                {program && (
                  <button
                    onClick={() => navigate(`/program/${program.id}`)}
                    className="mt-auto bg-[#ff6600] text-white py-4 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black transition"
                  >
                    Ver programa
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default PresentersPage;
