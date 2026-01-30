import React from 'react';
import { ArrowLeft, Cookie, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiesPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Cabeçalho de Impacto */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-[#ff6600] mb-8 text-[10px] font-bold uppercase tracking-[0.4em] group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <Cookie className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff6600]">Gestão de Dados</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Política de<br />Cookies
          </h1>
          <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">
            Última Atualização: 20 de Janeiro de 2026
          </p>
        </div>
      </div>

      {/* Conteúdo Informativo */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-medium leading-relaxed uppercase tracking-tight text-[11px] md:text-xs">
          
          <section className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-black dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block">
              O que são Cookies?
            </h2>
            <p className="mb-6 leading-relaxed">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a oferecer uma experiência fluida. Na <span className="text-black dark:text-white font-black">Praise FM Brasil</span>, nós os utilizamos para lembrar sua sessão e suas preferências de áudio.
            </p>
          </section>

          {/* Grid de Funcionalidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 mb-20">
              <div className="bg-white dark:bg-[#0a0a0a] p-10">
                <Shield className="w-6 h-6 text-[#ff6600] mb-6" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-black dark:text-white">Cookies Essenciais</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed font-bold">
                  Necessários para o login via Supabase e para manter sua autenticação enquanto você navega por diferentes programas.
                </p>
              </div>
              <div className="bg-white dark:bg-[#0a0a0a] p-10">
                <Settings className="w-6 h-6 text-[#ff6600] mb-6" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-black dark:text-white">Preferências</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed font-bold">
                  Armazenamos seu nível de volume, escolha de tema e as faixas tocadas recentemente localmente no seu navegador.
                </p>
              </div>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-black dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block">
              Gerenciar Cookies
            </h2>
            <p className="mb-6 leading-relaxed">
              Você pode controlar ou excluir cookies através das configurações do seu navegador. No entanto, desativar cookies essenciais impedirá o acesso à sua conta ou o salvamento da sua biblioteca "Meus Sons".
            </p>
          </section>
          
          {/* Alerta de Privacidade */}
          <div className="p-8 bg-[#ff6600]/10 border-2 border-[#ff6600] text-center rounded-sm">
              <p className="text-black dark:text-[#ff6600] text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed">
                Não utilizamos cookies de publicidade de terceiros para rastrear seu comportamento em outros sites.
              </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;