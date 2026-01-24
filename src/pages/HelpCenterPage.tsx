import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Headphones, Radio, User, Smartphone, Info, Mail, MessageSquare, ExternalLink, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HELP_CATEGORIES = [
  {
    id: 'streaming',
    title: 'Streaming & Rádio',
    icon: Radio,
    type: 'technical',
    topics: ['Problemas ao conectar no player', 'Qualidade do áudio baixa', 'Suporte a Chromecast e AirPlay', 'Navegadores suportados']
  },
  {
    id: 'account',
    title: 'Sua Conta',
    icon: User,
    type: 'general',
    topics: ['Gerenciar artistas favoritos', 'Como redefinir sua senha', 'Alterar preferências de e-mail', 'Configurações de privacidade']
  },
  {
    id: 'mobile',
    title: 'Aplicativos Móveis',
    icon: Smartphone,
    type: 'technical',
    topics: ['Instalação no Android/iOS', 'Ouvir offline', 'Reprodução em segundo plano', 'Notificações push']
  },
  {
    id: 'general',
    title: 'Info Geral',
    icon: Info,
    type: 'general',
    topics: ['Pedir uma música', 'Envio de material para artistas', 'Grade de programação', 'Anuncie conosco']
  }
];

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return HELP_CATEGORIES;
    const query = searchQuery.toLowerCase();
    return HELP_CATEGORIES.filter(cat => 
      cat.title.toLowerCase().includes(query) || 
      cat.topics.some(topic => topic.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleTopicClick = (type: string, topic: string) => {
    navigate(`/feedback?type=${type}&subject=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header de Busca */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff6600]/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-400 hover:text-white mb-8 mx-auto text-[10px] font-bold uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para a Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">Central de Ajuda</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Como podemos ajudar você hoje?"
              className="w-full bg-white/5 border-2 border-white/10 px-16 py-6 rounded-none text-xl font-medium focus:border-[#ff6600] focus:ring-0 outline-none transition-all placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Grade de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
            <div key={cat.id} className="group border-t-4 border-black dark:border-white pt-8 hover:border-[#ff6600] transition-colors animate-in fade-in duration-500">
              <cat.icon className="w-10 h-10 mb-6 text-[#ff6600]" />
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 dark:text-white">{cat.title}</h2>
              <ul className="space-y-4">
                {cat.topics.map((topic, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => handleTopicClick(cat.type, topic)}
                      className="text-gray-500 hover:text-black dark:hover:text-white text-[13px] font-medium uppercase tracking-tight flex items-center group/item text-left"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 text-[#ff6600] opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/5">
              <p className="text-gray-400 uppercase tracking-widest text-sm">Nenhum tópico encontrado para "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#ff6600] font-bold uppercase text-[10px] tracking-widest hover:underline"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>

        {/* Artigos Populares */}
        <section className="mb-32">
          <h3 className="text-2xl font-black dark:text-white mb-12 uppercase tracking-tighter border-l-4 border-[#ff6600] pl-4">Artigos Populares</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            {[
              { text: "Como ouvir a Praise FM Brasil offline", type: "technical" },
              { text: "Corrigindo problemas comuns de carregamento", type: "technical" },
              { text: "Gerenciando sua biblioteca de favoritos", type: "general" },
              { text: "Como participar das promoções no ar", type: "general" },
              { text: "Conectar em smart speakers (Alexa/Google)", type: "technical" },
              { text: "Atualizando a segurança da sua conta", type: "general" }
            ].map((article, i) => (
              <button 
                key={i} 
                onClick={() => handleTopicClick(article.type, article.text)}
                className="bg-white dark:bg-[#111] p-8 text-left hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-between group"
              >
                <span className="text-lg font-bold dark:text-white group-hover:text-[#ff6600] uppercase tracking-tighter">{article.text}</span>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#ff6600]" />
              </button>
            ))}
          </div>
        </section>

        {/* Contato com Suporte */}
        <div className="bg-[#ff6600] p-12 md:p-20 text-black flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="mb-10 md:mb-0 max-w-xl text-center md:text-left">
            <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">Ainda precisa de ajuda?</h4>
            <p className="text-black/70 text-lg font-bold uppercase tracking-tight leading-snug">Nossa equipe de suporte está disponível para garantir que sua experiência de adoração seja ininterrupta.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:suporte@praisefm.com.br?subject=Solicitação de Ajuda"
              className="bg-black text-white px-10 py-5 flex items-center justify-center space-x-3 hover:bg-white hover:text-black transition-all text-[11px] font-black uppercase tracking-[0.2em]"
            >
              <Mail className="w-4 h-4" />
              <span>E-mail de Suporte</span>
            </a>
            <button 
              onClick={() => navigate('/feedback?type=technical')}
              className="bg-white text-black px-10 py-5 flex items-center justify-center space-x-3 hover:bg-black hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.2em]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Relatar Problema</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rodapé da Central */}
      <div className="py-20 bg-gray-50 dark:bg-[#0a0a0a] text-center">
        <div className="flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-600 mb-4">
          <Headphones className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Suporte 24/7 Praise FM Brasil</span>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest">Excelência em cada detalhe para sua jornada de fé.</p>
      </div>
    </div>
  );
};

export default HelpCenterPage;