// src/pages/PresentersPage.tsx

import React from 'react';
import { Program } from '../types';

interface PresentersPageProps {
  onNavigateToProgram?: (program: Program) => void;
}

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  // Mock de apresentadores (substitua pelo seu arquivo real)
  const presenters = [
    {
      name: 'Samuel Andrade',
      image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
      bio: 'Apresenta a "Madrugada com Cristo", começando seu dia com a Palavra de Deus.',
      programTitle: 'Madrugada com Cristo'
    },
    {
      name: 'Lucas Martins',
      image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
      bio: 'Comanda a "Manhã com Cristo" de segunda a sábado.',
      programTitle: 'Manhã com Cristo'
    },
    {
      name: 'Felipe Santos',
      image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
      bio: 'Apresenta o "Domingo com Cristo", um programa especial para abençoar seu domingo.',
      programTitle: 'Domingo com Cristo'
    }
  ];

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Nossos Apresentadores</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presenters.map((presenter, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/10"
              onClick={() => onNavigateToProgram?.({
                id: `program-${index}`,
                title: presenter.programTitle,
                host: presenter.name,
                startTime: '07:00',
                endTime: '12:00',
                description: presenter.bio,
                image: presenter.image
              })}
            >
              <img 
                src={presenter.image} 
                alt={presenter.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-center">{presenter.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mt-2">{presenter.programTitle}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{presenter.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;