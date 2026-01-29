import React, { useState, useEffect } from 'react';
import { Share2, Loader2, Heart, CheckCircle2 } from 'lucide-react';

// Lista de referências bíblicas
const BIBLE_REFERENCES = [
  "João 3:16", "Filipenses 4:13", "Salmos 23:1", "Provérbios 3:5", "Isaías 40:31",
  "Romanos 8:28", "Josué 1:9", "Mateus 28:19", "Gálatas 5:22", "Jeremias 29:11",
  "Salmos 46:1", "1 Coríntios 13:4", "Romanos 12:2", "Mateus 5:16", "Provérbios 18:10"
];

const DevocionalPage: React.FC = () => {
  // 1. ESTADOS (Lógica de dados)
  const [verse, setVerse] = useState<{reference: string, text: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // 2. BUSCA DO VERSÍCULO (API Português)
  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now.getTime() - start.getTime());
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

  // 3. COMPARTILHAMENTO WHATSAPP
  const shareWhatsApp = () => {
    if (!verse) return;
    const text = `*Pão Diário - Praise FM Brasil*\n\n"${verse.text}"\n\n— _${verse.reference}_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // 4. ENVIO DE ORAÇÃO (E-mail: praisefmbrasil@gmail.com)
  const handlePrayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.currentTarget);
    try {
      await fetch("https://formspree.io/f/praisefmbrasil@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setFormStatus('idle');
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
    </div>
  );

  // 5. RENDERIZAÇÃO (Visual BBC Radio 1 - Font Weight Max 500)
  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans antialiased">
      
      {/* Header Editorial */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 border-b border-gray-100 dark:border-white/5">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-4 leading-[0.8]">
          Devocional
        </h1>
        <p className="text-sm text-gray-500 font-normal uppercase tracking-[0.5em]">
          Praise FM Brasil • Edição Diária
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Conteúdo Principal (Versículo) */}
          <div className="lg:col-span-8">
            <div className="mb-4 text-[#ff6600] text-[11px] font-medium uppercase tracking-[0.3em]">
              Palavra de Hoje
            </div>
            <h2 className="text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-gray-800 dark:text-gray-100 italic mb-8">
              "{verse?.text}"
            </h2>
            <div className="flex items-center space-x-6">
              <span className="text-3xl font-medium tracking-tighter border-b-2 border-[#ff6600]">
                {verse?.reference}
              </span>
              <button 
                onClick={shareWhatsApp} 
                className="flex items-center space-x-2 text-gray-400 hover:text-[#ff6600] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] font-normal uppercase tracking-widest">Compartilhar</span>
              </button>
            </div>
          </div>

          {/* Lateral - Formulário de Oração */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 dark:bg-[#0a0a0a] p-8 border border-gray-100 dark:border-white/5">
              <div className="flex items-center space-x-2 mb-8 text-gray-400">
                <Heart className="w-4 h-4" />
                <h3 className="text-[11px] font-medium uppercase tracking-[0.3em]">Pedido de Oração</h3>
              </div>
              
              {formStatus === 'success' ? (
                <div className="text-center py-4 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-4" />
                  <p className="text-[10px] font-medium uppercase tracking-widest">Recebido com fé</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-4 text-[#ff6600] text-[9px] uppercase border-b border-[#ff6600]">Novo pedido</button>
                </div>
              ) : (
                <form onSubmit={handlePrayerSubmit} className="space-y-6">
                  <input 
                    name="name" required placeholder="NOME"
                    className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-3 text-sm font-normal outline-none focus:border-[#ff6600] transition-all text-gray-900 dark:text-white" 
                  />
                  <textarea 
                    name="message" required placeholder="SUA MENSAGEM" rows={3}
                    className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-3 text-sm font-normal outline-none focus:border-[#ff6600] transition-all resize-none text-gray-900 dark:text-white"
                  />
                  <button 
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-4 text-[11px] font-medium uppercase tracking-[0.4em] border border-gray-200 dark:border-white/10 hover:bg-[#ff6600] hover:text-white transition-all flex items-center justify-center"
                  >
                    {formStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar ao Altar"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DevocionalPage;