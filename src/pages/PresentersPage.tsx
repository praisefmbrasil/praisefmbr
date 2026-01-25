// src/pages/PresentersPage.tsx

import React from 'react';

const PRESENTERS_DATA = [
  {
    name: 'Samuel Andrade',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
    bio: 'Apresenta a "Madrugada com Cristo", começando seu dia com a Palavra de Deus e louvores que renovam sua alma.',
    programTitle: 'Madrugada com Cristo'
  },
  {
    name: 'Lucas Martins',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
    bio: 'Comanda a "Manhã com Cristo" de segunda a sábado, trazendo mensagens de fé e as melhores músicas gospel para inspirar seu dia.',
    programTitle: 'Manhã com Cristo'
  },
  {
    name: 'Felipe Santos',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
    bio: 'Apresenta o "Domingo com Cristo", um programa especial para abençoar seu domingo com louvores e mensagens de esperança.',
    programTitle: 'Domingo com Cristo'
  },
  {
    name: 'Rafael Costa',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
    bio: 'Conduz a "Tarde Gospel", com a melhor seleção de músicas gospel para acompanhar sua tarde.',
    programTitle: 'Tarde Gospel'
  },
  {
    name: 'Ana Paula',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
    bio: 'Apresenta o "Praise FM Nova Geração", dedicado à música gospel contemporânea para a nova geração de adoradores.',
    programTitle: 'Praise FM Nova Geração'
  },
  {
    name: 'Bruno Almeida',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
    bio: 'Comanda o "De Carona com a Praise FM", com conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.',
    programTitle: 'De Carona com a Praise FM'
  },
  {
    name: 'Thiago Moreira',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
    bio: 'Apresenta o "Praise FM Pop", com os maiores sucessos da música cristã pop — atualizados e vibrantes.',
    programTitle: 'Praise FM Pop'
  },
  {
    name: 'Rodrigo Veras',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
    bio: 'Especialista em clássicos, Rodrigo apresenta o "Praise FM Brasil Clássicos", resgatando os hinos eternos da música gospel brasileira.',
    programTitle: 'Praise FM Brasil Clássicos'
  }
];

interface Presenter {
  name: string;
  image: string;
  bio: string;
  programTitle: string;
}

const PresentersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Apresentadores</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESENTERS_DATA.map((presenter: Presenter) => (
            <div key={presenter.name} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={presenter.image} 
                alt={presenter.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{presenter.name}</h2>
                <p className="text-sm font-semibold text-praise-accent mb-3">{presenter.programTitle}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{presenter.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;