import React from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';

interface NewReleasesPageProps {
  onBack: () => void; // ✅ Adicionado para resolver Erro 2741
}

const NewReleasesPage: React.FC<NewReleasesPageProps> = ({ onBack }) => {
  // Exemplo de dados (Pode vir de um arquivo mock ou API)
  const releases = [
    { id: '1', title: 'Graça Abundante', artist: 'Praise Music', year: '2026' },
    { id: '2', title: 'Coração Contrito', artist: 'Samuel Andrade', year: '2025' },
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <button onClick={onBack} className="text-orange-500 flex items-center mb-4 hover:underline">
              <ArrowLeft className="mr-2" size={20} /> Voltar
            </button>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Lançamentos <span className="text-orange-500">Brasil</span></h1>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {releases.map((item) => (
            <div key={item.id} className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-orange-500/50 transition">
              <div className="aspect-square bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                 <PlayCircle size={48} className="text-orange-500 opacity-50" />
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.artist}</p>
              <p className="text-orange-500 text-xs mt-2 font-bold uppercase">{item.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewReleasesPage;