import React from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  { id: 'introducao', title: '1. Introdução' },
  { id: 'coleta-dados', title: '2. Dados que Coletamos' },
  { id: 'uso', title: '3. Como Usamos Seus Dados' },
  { id: 'cookies', title: '4. Cookies e Rastreamento' },
  { id: 'armazenamento', title: '5. Segurança e Armazenamento' },
  { id: 'direitos', title: '6. Seus Direitos (LGPD)' },
  { id: 'contato', title: '7. Fale Conosco' }
];

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header Estilo Editorial Brutalista */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b-4 border-[#ff6600]">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-10 text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff6600]">Estrutura Legal</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 italic">Política de<br />Privacidade</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Última atualização: 30 de Janeiro, 2026</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#ff6600] mb-8 border-l-4 border-[#ff6600] pl-4">Conteúdo</h3>
            <nav className="space-y-6">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center group w-full text-left"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#ff6600] opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="text-[11px] font-bold uppercase tracking-tight text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Policy Content */}
          <main className="lg:col-span-9 space-y-24">
            
            <section id="introducao" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">1. Introdução</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
                <p>Na Praise FM Brasil, estamos comprometidos em proteger suas informações pessoais e ser transparentes sobre o que fazemos com elas. Esta política define como usamos seus dados pessoais quando você utiliza nosso site, aplicativos móveis ou interage com nossos serviços de transmissão digital.</p>
                <p className="mt-6">Atuamos como controladores de dados para as informações que coletamos e nos dedicamos a processá-las de acordo com a LGPD (Lei Geral de Proteção de Dados) e padrões globais de privacidade.</p>
              </div>
            </section>

            <section id="coleta-dados" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">2. Dados que Coletamos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-white/10">
                <div className="p-10 bg-white dark:bg-[#080808]">
                  <Lock className="w-8 h-8 text-[#ff6600] mb-8" />
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4 dark:text-white">Informações de Conta</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Quando você cria uma conta, coletamos seu e-mail, nome de exibição e foto de perfil através do nosso sistema seguro de autenticação.</p>
                </div>
                <div className="p-10 bg-white dark:bg-[#080808]">
                  <Eye className="w-8 h-8 text-[#ff6600] mb-8" />
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4 dark:text-white">Dados de Uso</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Coletamos informações sobre suas interações com o player, incluindo músicas favoritadas e histórico de busca para personalizar sua experiência.</p>
                </div>
              </div>
            </section>

            <section id="uso" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">3. Como Usamos Seus Dados</h2>
              <ul className="space-y-8 text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-[11px]">
                <li className="flex items-start">
                  <span className="w-8 h-8 bg-[#ff6600] text-white text-xs font-black flex items-center justify-center mr-6 flex-shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">A</span>
                  <span className="pt-1">Para fornecer e manter nossos serviços de streaming ao vivo e podcasts.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-8 h-8 bg-[#ff6600] text-white text-xs font-black flex items-center justify-center mr-6 flex-shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">B</span>
                  <span className="pt-1">Para notificá-lo sobre mudanças em nossa programação ou eventos especiais (caso tenha optado por alertas).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-8 h-8 bg-[#ff6600] text-white text-xs font-black flex items-center justify-center mr-6 flex-shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">C</span>
                  <span className="pt-1">Para melhorar o desempenho da plataforma e a interface do usuário com base em padrões de uso agregados.</span>
                </li>
              </ul>
            </section>

            <section id="cookies" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">4. Cookies e Rastreamento</h2>
              <div className="bg-gray-100 dark:bg-white/5 p-12 border-l-8 border-[#ff6600]">
                <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-xs leading-relaxed mb-8">Utilizamos cookies essenciais para manter sua sessão ativa e armazenar suas preferências do player (como volume e tema). Eles são necessários para o funcionamento correto do site.</p>
                <div className="flex items-center space-x-3 text-[#ff6600] cursor-pointer hover:opacity-80 transition-opacity">
                  <FileText className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Ver Política de Cookies Completa</span>
                </div>
              </div>
            </section>

            <section id="armazenamento" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">5. Segurança e Armazenamento</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">
                Seus dados de conta são armazenados usando criptografia de nível empresarial. Não vendemos suas informações pessoais a terceiros. Os dados são mantidos enquanto sua conta estiver ativa ou conforme necessário para fornecer nossos serviços.
              </p>
            </section>

            <section id="direitos" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">6. Seus Direitos (LGPD)</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed mb-10">Você tem o direito de acessar, atualizar ou excluir as informações que temos sobre você. Você pode realizar essas ações diretamente em sua página de perfil ou entrando em contato com nossa equipe de suporte.</p>
              <button 
                onClick={() => navigate('/profile')}
                className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-[8px_8px_0px_#ff6600] active:translate-y-1 active:shadow-none"
              >
                Configurações de Perfil
              </button>
            </section>

            <section id="contato" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">7. Fale Conosco</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">Para qualquer dúvida sobre esta Política de Privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO) em:</p>
              <div className="mt-12 bg-black dark:bg-white p-10 shadow-[15px_15px_0px_#ff6600]">
                <p className="text-[#ff6600] dark:text-[#ff6600] text-2xl md:text-3xl font-black uppercase tracking-tighter">contato@praisefmbrasil.com.br</p>
                <p className="text-white/50 dark:text-black/50 text-[10px] font-black uppercase tracking-widest mt-4">Departamento de Compliance — PRAISE FM BRASIL</p>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="py-24 bg-gray-50 dark:bg-[#0a0a0a] text-center border-t border-gray-100 dark:border-white/5">
        <p className="text-[11px] text-gray-400 dark:text-gray-600 font-black uppercase tracking-[0.6em]">Confiança • Transparência • Fé</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;