import React, { useState, useEffect } from 'react';
import { Heart, Share2, BookOpen, Loader2 } from 'lucide-react';

interface Verse {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

// Versículos populares em português
const POPULAR_VERSES = [
  {
    reference: "João 3:16",
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    book: "João",
    chapter: 3,
    verse: 16
  },
  {
    reference: "Filipenses 4:13",
    text: "Tudo posso naquele que me fortalece.",
    book: "Filipenses",
    chapter: 4,
    verse: 13
  },
  {
    reference: "Salmos 23:1",
    text: "O Senhor é o meu pastor; nada me faltará.",
    book: "Salmos",
    chapter: 23,
    verse: 1
  },
  {
    reference: "Provérbios 3:5-6",
    text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    book: "Provérbios",
    chapter: 3,
    verse: 5
  },
  {
    reference: "Jeremias 29:11",
    text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    book: "Jeremias",
    chapter: 29,
    verse: 11
  },
  {
    reference: "Romanos 8:28",
    text: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.",
    book: "Romanos",
    chapter: 8,
    verse: 28
  },
  {
    reference: "Isaías 41:10",
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    book: "Isaías",
    chapter: 41,
    verse: 10
  },
  {
    reference: "Mateus 11:28",
    text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    book: "Mateus",
    chapter: 11,
    verse: 28
  },
  {
    reference: "Salmos 46:1",
    text: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    book: "Salmos",
    chapter: 46,
    verse: 1
  },
  {
    reference: "2 Coríntios 5:7",
    text: "Porque andamos por fé e não por vista.",
    book: "2 Coríntios",
    chapter: 5,
    verse: 7
  },
  {
    reference: "Josué 1:9",
    text: "Não to mandei eu? Esforça-te e tem bom ânimo; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.",
    book: "Josué",
    chapter: 1,
    verse: 9
  },
  {
    reference: "Salmos 91:1-2",
    text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.",
    book: "Salmos",
    chapter: 91,
    verse: 1
  }
];

const DailyVerse: React.FC = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Seleciona um versículo baseado no dia do ano para ter consistência diária
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const selectedVerse = POPULAR_VERSES[dayOfYear % POPULAR_VERSES.length];
    
    setTimeout(() => {
      setVerse(selectedVerse);
      setLoading(false);
    }, 500);
  }, []);

  const handleShare = () => {
    if (!verse) return;
    
    const text = `"${verse.text}"\n\n${verse.reference}\n\nCompartilhado via Praise FM BR`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Versículo do Dia',
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 p-12 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-[#ff6600] animate-spin mb-4" />
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">Carregando versículo...</p>
        </div>
      </div>
    );
  }

  if (!verse) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white dark:bg-[#111] border-2 border-black dark:border-white transition-colors duration-300">
        
        {/* Header */}
        <div className="border-b-2 border-black dark:border-white p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-[#ff6600]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Versículo do Dia</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-tighter text-black dark:text-white">{verse.reference}</h2>
        </div>

        {/* Verse Text */}
        <div className="p-12 md:p-16">
          <blockquote className="text-2xl md:text-3xl font-normal leading-relaxed text-gray-800 dark:text-gray-200 tracking-tight">
            "{verse.text}"
          </blockquote>
          <p className="mt-8 text-right text-sm font-medium text-[#ff6600] uppercase tracking-widest">
            — {verse.reference}
          </p>
        </div>

        {/* Actions */}
        <div className="border-t-2 border-black dark:border-white p-6 flex items-center justify-between bg-gray-50 dark:bg-black/50">
          <div className="flex space-x-2">
            <button 
              className="p-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              title="Favoritar"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShare}
              className="p-3 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              title={copied ? "Copiado!" : "Compartilhar"}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
            {copied ? "Copiado!" : "Almeida Revista e Corrigida"}
          </span>
        </div>
      </div>

      {/* Reflection Section */}
      <div className="mt-12 bg-[#ff6600] text-white p-10 border-2 border-black dark:border-white">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-80">Reflexão do Dia</h3>
        <p className="text-lg font-normal leading-relaxed">
          Que este versículo fortaleça sua fé hoje. Permita que a Palavra de Deus ilumine seu caminho e renove suas forças. Medite nesta mensagem e deixe que ela transforme seu dia.
        </p>
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6">
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ff6600] mb-3">Livro</h4>
          <p className="text-xl font-medium text-black dark:text-white uppercase tracking-tight">{verse.book}</p>
        </div>
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6">
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ff6600] mb-3">Capítulo</h4>
          <p className="text-xl font-medium text-black dark:text-white">{verse.chapter}</p>
        </div>
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6">
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#ff6600] mb-3">Versículo</h4>
          <p className="text-xl font-medium text-black dark:text-white">{verse.verse}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;