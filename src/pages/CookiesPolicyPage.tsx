import React from 'react';
import { FileText, ArrowLeft, ChevronRight, Cookie, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiesPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-8 text-[10px] font-medium uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center space-x-4 mb-6">
            <Cookie className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6600]">Armazenamento de Dados</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter leading-none mb-6">Política de<br />Cookies</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs">Última atualização: 23 de Janeiro, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-normal leading-relaxed uppercase tracking-tight">
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">O que são Cookies?</h2>
            <p className="mb-4">Cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a oferecer uma experiência personalizada. Na Praise FM Brasil, nós os utilizamos para lembrar sua sessão e suas preferências de player.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 mb-20">
             <div className="bg-white dark:bg-[#111] p-10">
               <Shield className="w-6 h-6 text-[#ff6600] mb-6" />
               <h3 className="text-xl font-medium uppercase tracking-tight mb-4 dark:text-white">Cookies Essenciais</h3>
               <p className="text-sm text-gray-500 uppercase tracking-tight leading-relaxed">Necessários para o login da conta (via Supabase) e para manter sua autenticação ativa enquanto você navega pelos programas.</p>
             </div>
             <div className="bg-white dark:bg-[#111] p-10">
               <Settings className="w-6 h-6 text-[#ff6600] mb-6" />
               <h3 className="text-xl font-medium uppercase tracking-tight mb-4 dark:text-white">Preferências do Player</h3>
               <p className="text-sm text-gray-500 uppercase tracking-tight leading-relaxed">Armazenamos o nível de volume, escolha de tema (claro/escuro) e faixas reproduzidas recentemente localmente no seu navegador.</p>
             </div>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">Gerenciando Cookies</h2>
            <p>Você pode controlar ou excluir cookies através das configurações do seu navegador. No entanto, observe que desativar cookies essenciais impedirá que você faça login ou salve sua biblioteca de favoritos.</p>
          </section>
          
          <div className="p-8 bg-[#ff6600]/10 border-2 border-[#ff6600] text-center">
             <p className="text-black dark:text-white text-sm font-bold uppercase tracking-widest">Nós não utilizamos cookies de publicidade de terceiros para rastrear seu comportamento em outros sites.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;