import * as React from 'react';
import { Share2, Heart, CheckCircle2, Loader2 } from 'lucide-react';

const { useState, useEffect } = React;

interface Verse {
  reference: string;
  text: string;
}

// Referências para rotação diária
const BIBLE_REFERENCES = [
  "João 3:16", "Filipenses 4:13", "Salmos 23:1", "Provérbios 3:5", "Isaías 40:31",
  "Romanos 8:28", "Josué 1:9", "Mateus 28:19", "Gálatas 5:22", "Jeremias 29:11"
];

const DevotionalSection: React.FC = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const reference = BIBLE_REFERENCES[dayOfYear % BIBLE_REFERENCES.length];

        const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}?translation=almeida`);
        const data = await response.json();
        setVerse({ reference: data.reference, text: data.text.trim() });
      } catch (err) {
        console.error("Erro Praise FM:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, []);

  const shareWhatsApp = () => {
    if (!verse) return;
    const text = `*Pão Diário - Praise FM Brasil*\n\n"${verse.text}"\n\n— _${verse.reference}_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) return (
    <div className="flex justify-center p-12">
      <Loader2 className="w-6 h-6 animate-spin text-[#ff6600]" />
    </div>
  );

  return (
    <section className="py-12 px-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Lado Esquerdo - Versículo */}
        <div className="space-y-6">
          <div className="inline-block border-b-2 border-[#ff6600] pb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff6600]">
              Palavra do Dia
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-normal italic leading-tight tracking-tighter dark:text-gray-100">
            "{verse?.text}"
          </h2>
          <div className="flex items-center space-x-6">
            <span className="text-xl font-medium tracking-tighter uppercase">{verse?.reference}</span>
            <button 
              onClick={shareWhatsApp}
              className="p-2 hover:bg-[#ff6600] hover:text-white rounded-full transition-all border border-gray-100 dark:border-white/10"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Lado Direito - Oração */}
        <div className="bg-gray-50 dark:bg-[#0a0a0a] p-8 rounded-3xl border border-gray-100 dark:border-white/5">
          <div className="flex items-center space-x-2 mb-6 text-gray-400">
            <Heart size={16} className="text-[#ff6600]" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Pedido de Oração</h3>
          </div>

          {formStatus === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest">Enviado ao Altar</p>
              <button onClick={() => setFormStatus('idle')} className="mt-4 text-[#ff6600] text-[9px] uppercase border-b border-[#ff6600]">Novo Pedido</button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormStatus('success'); }}>
              <input 
                placeholder="SEU NOME" 
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 text-xs outline-none focus:border-[#ff6600] uppercase"
              />
              <textarea 
                placeholder="SUA INTENÇÃO" 
                rows={2}
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 text-xs outline-none focus:border-[#ff6600] uppercase resize-none"
              />
              <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all rounded-xl">
                Enviar Oração
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default DevotionalSection;