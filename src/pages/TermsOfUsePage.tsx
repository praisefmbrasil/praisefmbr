import React from 'react';
import { Scale, ShieldCheck, FileText, ArrowLeft, ChevronRight, Globe, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  { id: 'acceptance', title: '1. Aceitação dos Termos' },
  { id: 'broadcasting', title: '2. Direitos de Transmissão' },
  { id: 'conduct', title: '3. Conduta do Usuário' },
  { id: 'accounts', title: '4. Segurança da Conta' },
  { id: 'ip', title: '5. Propriedade Intelectual' },
  { id: 'liability', title: '6. Limitação de Responsabilidade' },
  { id: 'changes', title: '7. Alterações nos Termos' }
];

const TermsOfUsePage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
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
            <Scale className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff6600]">Contrato do Usuário</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">Termos de<br />Uso</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Data de Vigência: 20 de Janeiro de 2026</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Navegação</h3>
            <nav className="space-y-4">
              {SECTIONS.map((section) => (
                <button key={section.id} onClick={() => scrollToSection(section.id)} className="flex items-center group w-full text-left">
                  <ChevronRight className="w-3 h-3 mr-2 text-[#ff6600] opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="text-[11px] font-black uppercase tracking-tight text-gray-500 group-hover:text-black dark:group-hover:text-white">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="lg:col-span-9 space-y-20">
            <section id="acceptance" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">1. Aceitação dos Termos</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-bold leading-relaxed uppercase tracking-tight text-sm">
                <p>Ao acessar ou usar os serviços da Praise FM Brasil, você concorda em cumprir estes Termos de Uso e nossa Política de Privacidade. Se você não concordar com estes termos, por favor, não utilize nossas plataformas.</p>
              </div>
            </section>

            <section id="broadcasting" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">2. Direitos de Transmissão</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed mb-6">A Praise FM Brasil fornece uma transmissão digital 24/7. É concedida a você uma licença pessoal, não comercial e limitada para ouvir nossa programação apenas para fins de entretenimento privado.</p>
              <div className="bg-gray-50 dark:bg-white/5 p-8 border-l-4 border-[#ff6600]">
                <p className="text-xs font-black text-black dark:text-white uppercase tracking-widest leading-relaxed">PROIBIDO: A redistribuição, gravação para fins comerciais ou retransmissão do nosso sinal sem consentimento prévio por escrito é estritamente proibida.</p>
              </div>
            </section>

            <section id="conduct" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">3. Conduta do Usuário</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <Globe className="w-6 h-6 text-[#ff6600] mb-6" />
                  <h4 className="text-lg font-black uppercase tracking-tight mb-4 dark:text-white">Respeito Global</h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-tight leading-relaxed">Os usuários devem interagir com nossos recursos de comunidade de maneira respeitosa e que edifique a fé.</p>
                </div>
                <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <AlertTriangle className="w-6 h-6 text-[#ff6600] mb-6" />
                  <h4 className="text-lg font-black uppercase tracking-tight mb-4 dark:text-white">Integridade do Sistema</h4>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-tight leading-relaxed">Tentar burlar medidas de segurança ou extrair dados de nossa transmissão é uma violação direta destes termos.</p>
                </div>
              </div>
            </section>

            <section id="accounts" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">4. Segurança da Conta</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">Você é responsável por manter a confidencialidade de suas credenciais de acesso. Todas as atividades que ocorrem em sua conta são de sua responsabilidade. Utilizamos Supabase para garantir segurança de nível industrial.</p>
            </section>

            <section id="ip" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">5. Propriedade Intelectual</h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">Todo o conteúdo da Praise FM Brasil, incluindo logotipos, gráficos e playlists curadas, é propriedade da Praise FM Global ou de seus licenciadores e está protegido por leis de direitos autorais.</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;