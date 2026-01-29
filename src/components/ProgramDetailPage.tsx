// src/components/ProgramDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import type { Program } from '../types';
import { programs } from '../constants';
import { Loader2 } from 'lucide-react';

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Busca o programa pelo id da rota
  const program: Program | undefined = programs.find(p => p.id === id);

  if (!program) {
    return (
      <div className="program-detail loading">
        <Loader2 className="animate-spin" size={32} />
        <p>Carregando programa...</p>
      </div>
    );
  }

  return (
    <section className="program-detail">
      <div className="program-header">
        {program.image && (
          <img src={program.image} alt={program.title} className="program-image" />
        )}
        <h1>{program.title}</h1>
        <p>{program.host}</p>
        <span>
          {program.startTime} - {program.endTime}
        </span>
      </div>

      {program.description && (
        <div className="program-description">
          <p>{program.description}</p>
        </div>
      )}
    </section>
  );
};

export default ProgramDetailPage;
