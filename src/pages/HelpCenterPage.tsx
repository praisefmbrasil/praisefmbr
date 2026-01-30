import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Headphones, Radio, User, Smartphone, Info, Mail, MessageSquare, ExternalLink, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HELP_CATEGORIES = [
  {
    id: 'streaming',
    title: 'Streaming & Rádio',
    icon: Radio,
    type: 'technical',
    topics: ['Problemas na conexão ao vivo', 'Qualidade do áudio e consumo de dados', 'Suporte a Chromecast e AirPlay', 'Navegadores suportados']
  },
  {
    id: 'account',
    title: 'Sua Conta',
    icon: User,
    type: 'general',
    topics: ['Gerenciar seus favoritos', 'Redefinição de senha', 'Alterar preferências de e-mail', 'Configurações de privacidade']
  },
  {
    id: 'mobile',
    title: 'Apps Móveis',
    icon: Smartphone,
    type: 'technical',
    topics: ['Instalação no iOS/Android', 'Ouvir offline', 'Reprodução em segundo plano', 'Notificações Push']
  },
  {
    id: 'general',
    title: 'Informações Gerais',
    icon: Info,
    type: 'general',
    topics: ['Pedidos de música', 'Envio de material artístico', 'Grade de programação', 'Anuncie conosco']
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
      {/* Search Header */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ff6600]/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-400 hover:text-white mb-8 mx-auto text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Home
          </button>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">Central de<br />Ajuda</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Como podemos te ajudar hoje?"
              className="w-full bg-white/5 border-2 border-white/10 px-16 py-6 rounded-none text-xl font-bold focus:border-[#ff6600] focus:ring-0 outline-none transition-all placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
            <div key={cat.id} className="group border-t-4 border-black dark:border-white pt-8 hover:border-[#ff6600] transition-colors animate-in fade-in duration-500">
              <cat.icon className="w-10 h-10 mb-6 text-[#ff6600]" />
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 dark:text-white">{cat.title}</h2>
              <ul className="space-y-4">
                {cat.topics.map((topic, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => handleTopicClick(cat.type, topic)}
                      className="text-gray-500 hover:text-black dark:hover:text-white text-[12px] font-bold uppercase tracking-tight flex items-center group/item text-left transition-colors"
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
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Nenhum tópico encontrado para "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#ff6600] font-black uppercase text-[10px] tracking-widest hover:underline"
              >
                Limpar Busca
              </button>
            </div>
          )}
        </div>

        {/* Popular Articles */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-[#ff6600]" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-white">Artigos Populares</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl">
            {[
              { text: "Como ouvir a Praise FM Brasil offline", type: "technical" },
              { text: "Resolvendo problemas comuns de buffering", type: "technical" },
              { text: "Gerenciando sua biblioteca de favoritos", type: "general" },
              { text: "Como participar das promoções ao vivo", type: "general" },
              { text: "Conectando com Alexa e Google Home", type: "technical" },
              { text: "Atualizando a segurança da sua conta", type: "general" }
            ].map((article, i) => (
              <button 
                key={i} 
                onClick={() => handleTopicClick(article.type, article.text)}
                className="bg-white dark:bg-[#0a0a0a] p-10 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-between group"
              >
                <span className="text-xl font-black dark:text-white group-hover:text-[#ff6600] uppercase tracking-tighter transition-colors">{article.text}</span>
                <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-[#ff6600] transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <div className="bg-[#ff6600] p-12 md:p-24 text-black flex flex-col lg:row items-center justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="mb-12 lg:mb-0 max-w-xl text-center lg:text-left relative z-10">
            <h4 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-6">Ainda precisa de ajuda?</h4>
            <p className="text-black/70 text-lg font-bold uppercase tracking-tight leading-snug">Nosso time de suporte está disponível 24/7 para garantir que sua adoração não pare.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
            <a 
              href="mailto:suporte@praisefm.com.br?subject=Pedido de Ajuda"
              className="bg-black text-white px-12 py-7 flex items-center justify-center space-x-4 hover:bg-white hover:text-black transition-all text-[11px] font-black uppercase tracking-[0.3em] shadow-xl"
            >
              <Mail className="w-5 h-5" />
              <span>Suporte via E-mail</span>
            </a>
            <button 
              onClick={() => navigate('/feedback?type=technical')}
              className="bg-white text-black px-12 py-7 flex items-center justify-center space-x-4 hover:bg-black hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.3em] shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Relatar Problema</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="py-20 bg-gray-50 dark:bg-[#0a0a0a] text-center border-t border-gray-100 dark:border-white/5">
        <div className="flex items-center justify-center space-x-3 text-gray-400 dark:text-gray-600 mb-6">
          <Headphones className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Suporte Global 24/7</span>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] font-bold">Praise FM Brasil — Excelência em cada detalhe.</p>
      </div>
    </div>
  );
};

export default HelpCenterPage;