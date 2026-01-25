import React from 'react';
import { Mic2, ChevronRight, Play, Clock, Check } from 'lucide-react';
import { DEVOTIONAL_PODCASTS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../contexts/LivePlayerContext';

const DevotionalSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#f8f8f8] dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12 border-b-4 border-black dark:border-white pb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#ff6600] text-white shadow-lg">
              <Mic2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff6600] mb-1">Praise FM Podcasts</p>
              <h2 className="text-4xl font-medium uppercase tracking-tighter dark:text-white leading-none">Devocionais</h2>
            </div>
          </div>
          <button onClick={() => navigate('/devotional')} className="group flex items-center text-black dark:text-white font-bold uppercase tracking-widest text-[10px] hover:text-[#ff6600]">
            Ver todos <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {DEVOTIONAL_PODCASTS.slice(0, 3).map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PodcastCard = ({ podcast }: { podcast: any }) => {
  const { toggleFavorite, isFavorite, user } = useAuth();
  const player = usePlayer(); 
  const navigate = useNavigate();
  const saved = isFavorite(podcast.id);

  const handleAction = (e: React.MouseEvent, type: 'save' | 'play') => {
    e.stopPropagation();
    if (!user) return navigate('/login');

    if (type === 'save') {
      toggleFavorite({
        id: podcast.id,
        title: podcast.title,
        subtitle: podcast.author,
        image: podcast.image,
        type: 'devotional'
      });
    } else {
      // Agora o TS reconhece playTrack e mapeia os campos corretamente
      player.playTrack({
        title: podcast.title,
        artist: podcast.author,
        artwork: podcast.image,
        url: podcast.audioUrl
      });
    }
  };

  return (
    <div className="group bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <div className="relative aspect-video overflow-hidden">
        <img src={podcast.image} alt={podcast.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" />
        <div onClick={(e) => handleAction(e, 'play')} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-[#ff6600] rounded-full flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-[#ff6600] text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest">{podcast.category}</span>
        </div>
        <button onClick={(e) => handleAction(e, 'save')} className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${saved ? 'bg-[#ff6600] text-white' : 'bg-black/40 text-white hover:bg-[#ff6600]'}`}>
          {saved ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-medium uppercase leading-none mb-3 dark:text-white tracking-tighter">{podcast.title}</h3>
        <p className="text-gray-400 text-[10px] font-bold uppercase mb-6 tracking-[0.2em]">Com {podcast.author}</p>
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-6">
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{podcast.duration}</span>
          <button onClick={(e) => handleAction(e, 'play')} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff6600] hover:text-black dark:hover:text-white transition-colors">
            Ouvir agora —
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevotionalSection;