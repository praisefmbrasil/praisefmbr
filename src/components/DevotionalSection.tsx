import React, { useState, useEffect } from 'react';
import { Copy, BookOpen, Quote, Loader2, Check, MessageCircle, Send, Heart, CheckCircle2 } from 'lucide-react';

// --- CONFIGURAÇÕES E DADOS ---
const BIBLE_REFERENCES = [
  "João 3:16", "Filipenses 4:13", "Salmos 23:1", "Provérbios 3:5", "Isaías 40:31",
  "Romanos 8:28", "Josué 1:9", "Mateus 28:19", "Gálatas 5:22", "Jeremias 29:11",
  "Salmos 46:1", "1 Coríntios 13:4", "Romanos 12:2", "Mateus 5:16", "Provérbios 18:10",
  "Salmos 119:105", "Efésios 2:8", "Hebreus 11:1", "1 Pedro 5:7", "Tiago 1:5",
  "2 Timóteo 1:7", "Romanos 15:13", "Salmos 37:4", "Mateus 11:28", "John 14:6",
  "Isaías 41:10", "Filipenses 4:6", "Colossenses 3:23", "Provérbios 16:3", "Lamentações 3:22"
];

interface VerseData {
  reference: string;
  text: string;
  version: string;
}

const DevocionalPage: React.FC = () => {
  // Estados do Versículo
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);
  const [copied, setCopied] = useState(false);

  // Estados do Formulário de Oração
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Lógica para buscar versículo (API em Português)
  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now.getTime() - start.getTime());
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const refIndex = dayOfYear % BIBLE_REFERENCES.length;
        const reference = BIBLE_REFERENCES[refIndex];

        const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}?translation=almeida`);
        const data = await response.json();
        
        setVerse({ 
          reference: data.reference, 
          text: data.text.trim(), 
          version: "Almeida Revista e Atualizada" 
        });
      } catch (err) {
        console.error("Erro Praise FM:", err);
      } finally {
        setLoadingVerse(false);
      }
    };
    fetchVerse();
  }, []);

  // Lógica de Compartilhamento
  const getShareText = () => verse ? `*Pão Diário - Praise FM Brasil*\n\n"${verse.text}"\n\n— _${verse.reference}_\n\nOuça em: ${window.location.origin}` : '';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`;
    window.open(url, '_blank');
  };

  // Lógica de Envio de Oração (E-mail: praisefmbrasil@gmail.com)
  const handlePrayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/praisefmbrasil@gmail.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20 animate-in fade-in duration-700">
      
      {/* SEÇÃO 1: CABEÇALHO DA ABA */}
      <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-20 mb-12">
        <div className="border-l-4 border-[#ff6600] pl-6">
          <h2 className="text-5xl md:text-7xl font-medium uppercase tracking-tighter leading-none text-gray-900 dark:text-white">
            Devocional
          </h2>
          <p className="text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] text-[10px] mt-2">
            Praise FM Brasil • Um momento com Deus
          </p>
        </div>
      </div>

      {/* SEÇÃO 2: VERSÍCULO DO DIA (PÃO DIÁRIO) */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        {loadingVerse ? (
          <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#ff6600]" /></div>
        ) : verse && (
          <div className="bg-white dark:bg-[#111] shadow-2xl border border-gray-100 dark:border-white/5 flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/3 bg-black relative p-10 flex flex-col justify-between min-h-[250px]">
              <Quote className="absolute top-0 right-0 p-8 w-32 h-32 text-white/5 fill-current pointer-events-none" />
              <div className="relative z-10">
                <span className="bg-[#ff6600] text-white text-[9px] font-bold uppercase px-2 py-1 mb-6 inline-block tracking-widest">PÃO DIÁRIO</span>
                <h3 className="text-white text-4xl font-medium uppercase tracking-tighter leading-none">PALAVRA<br/>DE HOJE</h3>
              </div>
              <div className="relative z-10 flex items-center space-x-2 text-gray-500 text-[9px] uppercase tracking-widest">
                <BookOpen className="w-4 h-4 text-[#ff6600]" />
                <span>{verse.version}</span>
              </div>
            </div>
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 leading-relaxed mb-8 italic italic font-light">"{verse.text}"</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <span className="bg-[#ff6600] text-black font-bold px-3 py-1 text-xl uppercase tracking-tighter">{verse.reference}</span>
                <div className="flex items-center space-x-4">
                  <button onClick={copyToClipboard} className="text-gray-400 hover:text-[#ff6600] flex items-center space-x-2 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    <span className="text-[10px] uppercase tracking-widest">{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                  <button onClick={shareWhatsApp} className="bg-[#25D366] text-white px-4 py-2 flex items-center space-x-2 hover:opacity-90 transition-all">
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEÇÃO 3: PEDIDO DE ORAÇÃO */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-50 dark:bg-[#111] p-8 md:p-16 border border-gray-100 dark:border-white/5 relative overflow-hidden">
          <Heart className="absolute -right-8 -bottom-8 w-48 h-48 text-gray-200 dark:text-white/5 rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-10">
              <div className="bg-[#ff6600] p-3 shadow-lg shadow-[#ff6600]/20"><Heart className="w-6 h-6 text-white" /></div>
              <div>
                <h3 className="text-3xl font-medium uppercase tracking-tighter text-gray-900 dark:text-white">Pedidos de Oração</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 italic">Intercedendo uns pelos outros</p>
              </div>
            </div>

            {formStatus === 'success' ? (
              <div className="bg-white dark:bg-black p-12 text-center border border-green-500/30 animate-in zoom-in">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h4 className="text-xl font-medium uppercase tracking-tight text-white mb-2">Recebemos seu clamor</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">Sua mensagem foi enviada para o nosso altar.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-8 text-[#ff6600] text-[10px] font-bold uppercase tracking-widest border-b border-[#ff6600]">Novo pedido</button>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Seu Nome</label>
                    <input name="name" type="text" required placeholder="DIGITE AQUI" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 py-4 text-sm focus:border-[#ff6600] outline-none transition-all text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">WhatsApp / Contato</label>
                    <input name="contact" type="text" placeholder="(00) 00000-0000" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 py-4 text-sm focus:border-[#ff6600] outline-none transition-all text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Sua Intenção</label>
                  <textarea name="message" required placeholder="ESCREVA SEU MOTIVO DE ORAÇÃO..." rows={4} className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/10 py-4 text-sm focus:border-[#ff6600] outline-none transition-all text-white resize-none" />
                </div>
                <button type="submit" disabled={formStatus === 'loading'} className="w-full md:w-auto bg-[#ff6600] text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center space-x-4">
                  {formStatus === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>ENVIAR AO ALTAR</span><Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevocionalPage;