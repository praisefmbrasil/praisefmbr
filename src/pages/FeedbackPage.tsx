import React, { useState, useEffect } from 'react';
import { MessageSquare, Music, Settings, Send, CheckCircle2, ArrowLeft, Mic2, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

type FeedbackType = 'general' | 'music' | 'technical' | 'shoutout';

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [type, setType] = useState<FeedbackType>('general');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && ['general', 'music', 'technical', 'shoutout'].includes(typeParam)) {
      setType(typeParam as FeedbackType);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.message.trim()) {
        throw new Error("Por favor, insira uma mensagem ou link da música antes de transmitir.");
      }

      const feedbackData = {
        user_id: user?.id || null,
        type: type,
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        created_at: new Date().toISOString()
      };

      const { error: dbError } = await supabase
        .from('feedbacks')
        .insert([feedbackData]);

      if (dbError) throw dbError;

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Erro no envio:", err);
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'general', label: 'Feedback da Rádio', icon: Mic2, desc: 'Comente sobre nossos programas e locutores' },
    { id: 'music', label: 'Envio de Artista', icon: Music, desc: 'Envie sua música para avaliação da nossa curadoria' },
    { id: 'technical', label: 'Problema Técnico', icon: Settings, desc: 'Relate bugs ou problemas no streaming' },
    { id: 'shoutout', label: 'Mande um Alô', icon: MessageSquare, desc: 'Mensagem para alguém especial ao vivo' },
  ];

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header Editorial */}
      <div className="bg-black text-white py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/20 to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-400 hover:text-white mb-10 text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Sair para Home
          </button>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {type === 'music' ? 'Envio de Música' : 'Sua Voz'}
          </h1>
          <p className="text-xl text-gray-400 font-bold uppercase tracking-tight max-w-xl">
            {type === 'music' 
              ? 'Junte-se à nova geração do louvor. Nossa equipe de curadoria revisa cada faixa enviada.'
              : 'Ajude-nos a moldar o futuro da Praise FM Brasil. Sua voz influencia nosso som.'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Categorias */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Selecione o Assunto</h3>
            {categories.map((cat) => (
              <button
                key={cat.id}
                disabled={loading || submitted}
                onClick={() => setType(cat.id as FeedbackType)}
                className={`w-full text-left p-6 border-2 transition-all flex items-start space-x-5 ${
                  type === cat.id 
                    ? 'border-[#ff6600] bg-[#ff6600]/5 dark:bg-[#ff6600]/10' 
                    : 'border-gray-100 dark:border-white/5 hover:border-black dark:hover:border-white'
                } disabled:opacity-50`}
              >
                <cat.icon className={`w-6 h-6 mt-1 ${type === cat.id ? 'text-[#ff6600]' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-black uppercase tracking-tighter text-xl dark:text-white">{cat.label}</h4>
                  <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-tight">{cat.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Formulário */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-[#ff6600] p-16 text-black flex flex-col items-center text-center animate-in zoom-in-95 duration-500 shadow-2xl">
                <CheckCircle2 className="w-20 h-20 mb-8" />
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">Transmissão Concluída</h2>
                <p className="text-black/70 text-lg font-bold uppercase tracking-tight max-w-sm">
                  {type === 'music' 
                    ? 'Sua música já está com nossa equipe. Se o seu som encaixar em nossa rotação, entraremos em contato.'
                    : 'Suas informações foram armazenadas em nosso sistema. Obrigado por contribuir com a Praise FM Brasil.'
                  }
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="mt-10 border-2 border-black px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-[#ff6600] transition-all"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 dark:bg-[#0a0a0a] p-10 md:p-16 border border-gray-100 dark:border-white/5 shadow-xl">
                {error && (
                  <div className="bg-red-50 text-red-600 p-6 flex items-start space-x-4 border-l-4 border-red-600">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Erro de Transmissão</span>
                      <p className="text-xs font-bold mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nome Completo / Nome Artístico</label>
                    <input 
                      type="text" 
                      required
                      disabled={loading}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white dark:bg-black border-2 border-gray-100 dark:border-white/10 p-5 outline-none focus:border-[#ff6600] transition-colors dark:text-white font-bold disabled:opacity-50" 
                      placeholder="Ex: Gabriela Rocha"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">E-mail de Contato</label>
                    <input 
                      type="email" 
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white dark:bg-black border-2 border-gray-100 dark:border-white/10 p-5 outline-none focus:border-[#ff6600] transition-colors dark:text-white font-bold disabled:opacity-50" 
                      placeholder="seuemail@exemplo.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {type === 'music' ? 'Link da Faixa (SoundCloud, Drive, etc.) e Biografia' : 'Sua Mensagem'}
                  </label>
                  <textarea 
                    rows={6} 
                    required
                    disabled={loading}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white dark:bg-black border-2 border-gray-100 dark:border-white/10 p-5 outline-none focus:border-[#ff6600] transition-colors dark:text-white font-bold resize-none disabled:opacity-50" 
                    placeholder={type === 'music' ? "Forneça um link (SoundCloud, Dropbox, etc.) e conte-nos um pouco sobre seu ministério..." : "Diga-nos o que você está pensando..."}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#ff6600] text-white px-16 py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-4 disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <>
                      <span>Transmitindo...</span>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>{type === 'music' ? 'Enviar Música' : 'Transmitir Feedback'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;