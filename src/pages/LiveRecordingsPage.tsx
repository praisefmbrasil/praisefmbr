import React from 'react';
import { Play, Calendar, Mic2, Archive, Clock } from 'lucide-react';

const LiveRecordingsPage: React.FC = () => {
  // Mock de gravações ao vivo (você pode substituir por dados reais depois)
  const recordings = [
    {
      id: '1',
      title: 'Culto de Adoração - Domingo',
      date: '24 Jan 2026',
      duration: '1h 45m',
      preacher: 'Samuel Andrade',
      thumbnail: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
      description: 'Mensagem poderosa sobre a fidelidade de Deus em tempos de incerteza.'
    },
    {
      id: '2',
      title: 'Louvor da Manhã - Segunda',
      date: '23 Jan 2026',
      duration: '1h 20m',
      preacher: 'Lucas Martins',
      thumbnail: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
      description: 'Adoração contínua com os melhores louvores nacionais para começar sua semana.'
    },
    {
      id: '3',
      title: 'De Carona com a Praise FM - Terça',
      date: '22 Jan 2026',
      duration: '2h 10m',
      preacher: 'Bruno Almeida',
      thumbnail: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
      description: 'Conversas inspiradoras e entrevistas com líderes cristãos.'
    },
    {
      id: '4',
      title: 'Praise FM Live Show - Quarta',
      date: '21 Jan 2026',
      duration: '1h 55m',
      preacher: '',
      thumbnail: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp',
      description: 'Transmissão ao vivo com interação e músicas gospel exclusivas.'
    }
  ];

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff6600]/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[#ff6600] mb-6">
            <Archive size={18} />
            <span className="text-xs tracking-widest uppercase">Arquivo Praise FM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter">
            Gravações ao Vivo
          </h1>
          <p className="mt-6 max-w-2xl text-gray-400 uppercase text-sm tracking-wide">
            Reviva os momentos mais impactantes da programação da Praise FM Brasil.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recordings.map((recording) => (
            <div 
              key={recording.id}
              className="group bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={recording.thumbnail} 
                  alt={recording.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ff6600] rounded-full flex items-center justify-center text-white shadow-2xl">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-[#ff6600] text-[9px] font-medium uppercase px-2 py-1 rounded">
                    AO VIVO
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {recording.date}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#ff6600] transition-colors">
                  {recording.title}
                </h3>
                
                {recording.preacher && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Com {recording.preacher}
                  </p>
                )}
                
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {recording.description}
                </p>
                
                <div className="flex items-center justify-between text-gray-400 text-xs font-medium uppercase tracking-widest">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {recording.duration}
                  </span>
                  <button className="text-[#ff6600] hover:underline">Assistir</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-gray-50 dark:bg-[#111] p-10 md:p-16 rounded-2xl border border-gray-100 dark:border-white/5 text-center">
          <Mic2 className="w-12 h-12 text-[#ff6600] mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Não perca nenhum momento
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Inscreva-se para receber notificações quando novas gravações estiverem disponíveis.
          </p>
          <button className="bg-[#ff6600] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all">
            Ativar Notificações
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveRecordingsPage;