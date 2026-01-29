import React, { useState, useEffect } from 'react';
import { Share2, Loader2, Heart, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Lista de referências bíblicas
const BIBLE_REFERENCES = [
  "João 3:16", "Filipenses 4:13", "Salmos 23:1", "Provérbios 3:5", "Isaías 40:31",
  "Romanos 8:28", "Josué 1:9", "Mateus 28:19", "Gálatas 5:22", "Jeremias 29:11",
  "Salmos 46:1", "1 Coríntios 13:4", "Romanos 12:2", "Mateus 5:16", "Provérbios 18:10"
];

const DevocionalPage: React.FC = () => {
  const navigate = useNavigate();
  const [verse, setVerse] = useState<{reference: string, text: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // BUSCA DO VERSÍCULO (API com tradução em Português)
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

  const shareWhatsApp = () => {
    if (!verse) return;
    const text = `*Pão Diário - Praise FM Brasil*\n\n"${verse.text}"\n\n— _${verse.reference}_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.currentTarget);
    try {
      // Usando Formspree configurado para seu e-mail oficial
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
    <div className="flex h-screen items-center justify-center bg-black">
      <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
    </div>
  );

  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans antialiased pb-20">
      
      {/* Botão Voltar Dinâmico */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-500 hover:text-[#ff6600] transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
          <span className="text-[10px] font-bold uppercase tracking-widest">Voltar</span>
        </button>
      </div>

      {/* Header Editorial Estilo BBC */}
      <header className="max-w-7xl mx-auto px-4 pt-12 pb-12 border-b border-gray-100 dark:border-white/5">
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-4 leading-[0.8] uppercase italic">
          Devocional
        </h1>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.5em]">
          Praise FM Brasil • Edição de {new Date().toLocaleDateString('pt-BR')}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Conteúdo Principal: Versículo do Dia */}
          <div className="lg:col-span-8 space-y-8">
            <div className="text-[#ff6600] text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#ff6600]"></span>
              Palavra de Hoje
            </div>
            
            <blockquote className="space-y-8">
              <p className="text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight text-gray-800 dark:text-gray-100 italic">
                "{verse?.text}"
              </p>
              <footer className="flex items-center space-x-8">
                <cite className="text-3xl font-medium tracking-tighter not-italic border-b-4 border-[#ff6600]">
                  {verse?.reference}
                </cite>
                <button 
                  onClick={shareWhatsApp} 
                  className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-[#ff6600] hover:text-white transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </footer>
            </blockquote>
          </div>

          {/* Lateral: Interatividade / Oração */}
          <aside className="lg:col-span-4">
            <div className="bg-gray-50 dark:bg-[#0a0a0a] p-10 border border-gray-100 dark:border-white/5 rounded-[40px]">
              <div className="flex items-center space-x-3 mb-8 text-gray-400">
                <Heart className="w-5 h-5 text-[#ff6600]" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em]">Pedido de Oração</h3>
              </div>
              
              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest italic">Apresentado ao Pai!</p>
                  <button 
                    onClick={() => setFormStatus('idle')} 
                    className="mt-6 text-[#ff6600] text-[10px] font-bold uppercase border-b-2 border-[#ff6600] pb-1"
                  >
                    Fazer outro pedido
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePrayerSubmit} className="space-y-8">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Seu Nome</label>
                    <input 
                      name="name" required
                      className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 py-2 text-sm outline-none focus:border-[#ff6600] transition-all" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sua Intenção</label>
                    <textarea 
                      name="message" required rows={3}
                      className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 py-2 text-sm outline-none focus:border-[#ff6600] transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-5 bg-black dark:bg-white text-white dark:text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all rounded-2xl flex items-center justify-center"
                  >
                    {formStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar ao Altar"}
                  </button>
                </form>
              )}
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default DevocionalPage;