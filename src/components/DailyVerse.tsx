import React, { useState, useEffect } from 'react';
import { Quote, RefreshCw, Share2 } from 'lucide-react';

interface VerseData {
  text: string;
  reference: string;
}

const DailyVerse: React.FC = () => {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVerse = async () => {
    setLoading(true);
    try {
      // Usando a API gratuita de versículos em Português
      const response = await fetch('https://bible-api.com/random?translation=almeida');
      const data = await response.json();
      
      setVerse({
        text: data.text,
        reference: data.reference
      });
    } catch (error) {
      console.error("Erro ao buscar versículo:", error);
      // Fallback em caso de erro na rede
      setVerse({
        text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
        reference: "João 3:16"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  const handleShare = () => {
    if (verse) {
      const shareText = `"${verse.text}" - ${verse.reference} | Via Praise FM Brasil`;
      navigator.share ? navigator.share({ text: shareText }) : alert("Copiado: " + shareText);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-3">
          <Quote className="w-5 h-5 text-[#ff6600]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            Versículo do Dia
          </span>
        </div>
        <div className="flex space-x-4">
           <button onClick={fetchVerse} className="text-gray-400 hover:text-[#ff6600] transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
           </button>
           <button onClick={handleShare} className="text-gray-400 hover:text-[#ff6600] transition-colors">
              <Share2 className="w-4 h-4" />
           </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-white/5 rounded w-1/4 mt-8"></div>
        </div>
      ) : (
        <div className="transition-all duration-700 ease-in-out">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-8 dark:text-white">
            "{verse?.text.trim()}"
          </h2>
          <div className="flex items-center space-x-4">
            <div className="h-[2px] w-8 bg-[#ff6600]" />
            <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
              {verse?.reference}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyVerse;