import React from 'react';

interface NewReleasesPageProps {
  onBack: () => void;
}

const NewReleasesPage: React.FC<NewReleasesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          ← Voltar
        </button>
        
        <h1 className="text-4xl font-bold text-white mb-8">
          Novos Lançamentos
        </h1>
        
        <div className="grid gap-4">
          <p className="text-white/80">
            Em breve: Confira aqui os lançamentos mais recentes da música gospel!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;