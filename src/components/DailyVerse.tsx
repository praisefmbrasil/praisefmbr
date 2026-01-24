import React, { useState, useEffect } from 'react';
import { Share2, Copy, BookOpen, Quote, Loader2, Check, AlertCircle } from 'lucide-react';

interface VerseData {
  reference: string;
  text: string;
  translation_name: string;
}

// Referências bíblicas mantidas (funcionam na API em português)
const BIBLE_REFERENCES = [
  "João 3:16", "Filipenses 4:13", "Salmos 23:1", "Provérbios 3:5", "Isaías 40:31",
  "Romanos 8:28", "Josué 1:9", "Mateus 28:19", "Gálatas 5:22", "Jeremias 29:11",
  "Salmos 46:1", "1 Coríntios 13:4", "Romanos 12:2", "Mateus 5:16", "Provérbios 18:10",
  "Salmos 119:105", "Efésios 2:8", "Hebreus 11:1", "1 Pedro 5:7", "Tiago 1:5",
  "2 Timóteo 1:7", "Romanos 15:13", "Salmos 37:4", "Mateus 11:28", "João 14:6",
  "Isaías 41:10", "Filipenses 4:6", "Colossenses 3:23", "Provérbios 16:3", "Lamentações 3:22"
];

const DailyVerse: React.FC = () => {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const refIndex = dayOfYear % BIBLE_REFERENCES.length;
        const reference = BIBLE_REFERENCES[refIndex];
        
        // ✅ Agora usa tradução em português (Almeida)
        const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}?translation=almeida`);
        if (!response.ok) throw new Error('Versículo não encontrado');
        const data = await response.json();
        setVerse({
          reference: data.reference,
          text: data.text.trim(),
          translation_name: "Almeida Revista e Corrigida"
        });
      } catch (error) {
        console.error("Erro ao buscar versículo:", error);
        setError("Não foi possível carregar o versículo do dia.");
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, []);

  const copyToClipboard = async () => {
    if (!verse) return;
    const shareText = `"${verse.text}" — ${verse.reference} | Praise FM Brasil`;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  const handleShare = async () => {
    if (!verse) return;
    const shareUrl = window.location.origin + window.location.pathname + window.location.hash;
    const shareData = {
      title: 'Praise FM Brasil - Versículo do Dia',
      text: `"${verse.text}" — ${verse.reference}`,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } else {
        copyToClipboard();
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error("Erro ao compartilhar:", err);
        copyToClipboard();
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#ff6600]" />
      <p className="font-medium uppercase tracking-[0.2em] text-[10px]">Carregando Versículo...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="bg-red-50 dark:bg-red-900/10 p-10 border border-red-100 dark:border-red-900/20">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 dark:text-red-400 text-sm font-regular uppercase tracking-widest">{error}</p>
      </div>
    </div>
  );
  
  if (!verse) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-[#111] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5 flex flex-col md:flex-row transition-colors">
        <div className="md:w-1/3 bg-black relative p-10 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Quote className="w-24 h-24 text-white fill-current" />
          </div>
          <div className="relative z-10">
            <span className="bg-[#ff6600] text-white text-[9px] font-medium uppercase px-2.5 py-1 rounded-sm inline-block mb-6 tracking-widest">
              VERSÍCULO DO DIA
            </span>
            <h3 className="text-white text-3xl md:text-4xl font-medium uppercase tracking-tighter leading-tight">
              Escritura<br />Diária
            </h3>
          </div>
          <div className="relative z-10 mt-12 flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-[#ff6600]" />
            <p className="text-gray-500 text-[9px] font-medium uppercase tracking-widest">{verse.translation_name}</p>
          </div>
        </div>
        <div className="md:w-2/3 p-8 md:p-12 flex flex-col">
          <p className="text-xl md:text-2xl font-normal tracking-tight text-gray-800 dark:text-gray-100 leading-relaxed mb-8 italic">
            "{verse.text}"
          </p>
          <div className="mt-auto pt-8 border-t border-gray-50 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-black dark:text-white bg-[#ff6600] text-xl font-medium uppercase tracking-tighter px-2 inline-block leading-none py-1">
                {verse.reference}
              </p>
              <p className="text-gray-400 text-[9px] font-medium uppercase tracking-widest mt-2">BÍBLIA SAGRADA</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={copyToClipboard} 
                className="flex items-center space-x-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 px-4 py-2 transition-colors min-w-[100px] justify-center"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span className="text-[10px] font-medium uppercase tracking-widest">
                  {copied ? 'Copiado' : 'Copiar'}
                </span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 bg-black text-white px-5 py-2 hover:bg-[#ff6600] transition-all min-w-[120px] justify-center"
              >
                {shared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span className="text-[10px] font-medium uppercase tracking-widest">
                  {shared ? 'Compartilhado' : 'Compartilhar'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;