import React from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  { id: 'introduction', title: '1. Introdução' },
  { id: 'data-collection', title: '2. Dados que Coletamos' },
  { id: 'usage', title: '3. Como Usamos seus Dados' },
  { id: 'cookies', title: '4. Cookies e Rastreamento' },
  { id: 'storage', title: '5. Segurança e Armazenamento' },
  { id: 'rights', title: '6. Seus Direitos (LGPD)' },
  { id: 'contact', title: '7. Contato' }
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
      {/* Header Editorial */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-8 text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff6600]">Estrutura Jurídica / LGPD</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">Política de<br />Privacidade</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Última atualização: 20 de Janeiro de 2026</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Navegação Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Conteúdo</h3>
            <nav className="space-y-4">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center group w-full text-left"
                >
                  <ChevronRight className="w-3 h-3 mr-2 text-[#ff6600] opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="text-[11px] font-black uppercase tracking-tight text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Conteúdo da Política */}
          <main className="lg:col-span-9 space-y-20">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">1. Introdução</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-bold leading-relaxed uppercase tracking-tight text-sm">
                <p>Na Praise FM Brasil, estamos comprometidos em proteger suas informações pessoais e ser transparentes sobre o que fazemos com elas. Esta política define como usamos seus dados pessoais quando você utiliza nosso site, aplicativos móveis ou interage com nossos serviços de transmissão digital.</p>
                <p className="mt-4">Atuamos como controladores de dados para as informações que coletamos e nos dedicamos a processá-las de acordo com a Lei Geral de Proteção de Dados (LGPD) e padrões globais de privacidade.</p>
              </div>
            </section>

            <section id="data-collection" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">2. Dados que Coletamos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <Lock className="w-6 h-6 text-[#ff6600] mb-6" />
                  <h4 className="text-lg font-black uppercase tracking-tight mb-4 dark:text-white">Informações da Conta</h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-tight leading-relaxed">Quando você cria uma conta, coletamos seu e-mail, nome de exibição e foto de perfil através do nosso sistema seguro de autenticação via Supabase.</p>
                </div>
                <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <Eye className="w-6 h-6 text-[#ff6600] mb-6" />
                  <h4 className="text-lg font-black uppercase tracking-tight mb-4 dark:text-white">Dados de Uso</h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-tight leading-relaxed">Coletamos informações sobre suas interações, incluindo faixas favoritadas, devocionais salvos e histórico de busca para personalizar sua experiência.</p>
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">3. Como Usamos seus Dados</h2>
              <ul className="space-y-6 text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#ff6600] text-black text-[10px] font-black flex items-center justify-center mr-4 flex-shrink-0">A</span>
                  <span>Para fornecer e manter nossos serviços de streaming ao vivo e podcasts.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#ff6600] text-black text-[10px] font-black flex items-center justify-center mr-4 flex-shrink-0">B</span>
                  <span>Para notificá-lo sobre mudanças na programação ou eventos especiais (caso tenha optado por receber alertas).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#ff6600] text-black text-[10px] font-black flex items-center justify-center mr-4 flex-shrink-0">C</span>
                  <span>Para melhorar a performance da nossa plataforma com base em padrões de uso agregados e anônimos.</span>
                </li>
              </ul>
            </section>

            <section id="cookies" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">4. Cookies e Rastreamento</h2>
              <div className="bg-gray-50 dark:bg-white/5 p-10">
                <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed mb-6">Usamos cookies essenciais para manter sua sessão ativa e armazenar suas preferências do player (como volume e tema). Estes são necessários para o funcionamento correto do site.</p>
                <div className="flex items-center space-x-3 text-[#ff6600]">
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest cursor-pointer">Ver Política de Cookies</span>
                </div>
              </div>
            </section>

            <section id="storage" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">5. Segurança e Armazenamento</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">Seus dados são armazenados utilizando criptografia de nível empresarial fornecida pelo Supabase. Não vendemos suas informações para terceiros. Os dados são mantidos enquanto sua conta estiver ativa.</p>
            </section>

            <section id="rights" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">6. Seus Direitos (LGPD)</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed mb-6">Sob a LGPD, você tem o direito de acessar, atualizar ou excluir suas informações. Você pode realizar essas ações diretamente na sua página de perfil ou entrando em contato com nossa equipe.</p>
              <button 
                onClick={() => navigate('/profile')}
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-lg active:scale-95"
              >
                Acessar Configurações de Perfil
              </button>
            </section>

            <section id="contact" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">7. Contato</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">Para qualquer dúvida sobre esta Política de Privacidade, entre em contato com nosso Encarregado de Proteção de Dados em:</p>
              <div className="mt-8">
                <p className="text-black dark:text-white text-xl font-black uppercase tracking-tighter">privacidade@praisefm.com.br</p>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Departamento de Compliance — PRAISE FM BRASIL</p>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="py-20 bg-gray-50 dark:bg-[#0a0a0a] text-center">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 font-black uppercase tracking-[0.5em]">Confiança • Transparência • Fé</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;