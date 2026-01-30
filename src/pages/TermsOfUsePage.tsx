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
      {/* Header Brutalista */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b-4 border-[#ff6600]">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-10 text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center space-x-4 mb-8">
            <Scale className="w-10 h-10 text-[#ff6600]" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#ff6600]">Contrato do Usuário</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 italic">Termos de<br />Uso</h1>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold">Última Atualização: 30 de Janeiro, 2026</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Navegação Lateral */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#ff6600] mb-8">Índice</h3>
            <nav className="space-y-6">
              {SECTIONS.map((section) => (
                <button 
                  key={section.id} 
                  onClick={() => scrollToSection(section.id)} 
                  className="flex items-center group w-full text-left transition-all"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-[#ff6600] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  <span className="text-[11px] font-black uppercase tracking-tight text-gray-500 group-hover:text-black dark:group-hover:text-white">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Conteúdo Principal */}
          <main className="lg:col-span-9 space-y-24">
            
            <section id="acceptance" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">
                1. Aceitação dos Termos
              </h2>
              <div className="max-w-none text-gray-600 dark:text-gray-400 font-bold leading-relaxed uppercase tracking-tight text-lg">
                <p>Ao acessar ou usar os serviços da Praise FM Brasil, você concorda em cumprir estes Termos de Uso e nossa Política de Privacidade. Se você não concordar com estes termos, por favor, não utilize nossas plataformas.</p>
              </div>
            </section>

            <section id="broadcasting" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">
                2. Direitos de Transmissão
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed mb-8">
                A Praise FM Brasil oferece uma transmissão digital 24/7. É concedida a você uma licença pessoal, não comercial e limitada para ouvir nossa programação exclusivamente para fins de entretenimento privado.
              </p>
              <div className="bg-black dark:bg-white p-10 border-4 border-[#ff6600] shadow-[12px_12px_0px_#ff6600]">
                <p className="text-[11px] font-black text-white dark:text-black uppercase tracking-[0.2em] leading-loose">
                  PROIBIDO: A redistribuição, gravação para uso comercial ou retransmissão do nosso sinal sem consentimento prévio por escrito é estritamente proibida e sujeita a medidas legais.
                </p>
              </div>
            </section>

            <section id="conduct" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">
                3. Conduta do Usuário
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-gray-50 dark:bg-[#0a0a0a] border-4 border-black dark:border-white shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff]">
                  <Globe className="w-8 h-8 text-[#ff6600] mb-6" />
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4 dark:text-white italic">Respeito Global</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-tight leading-relaxed">
                    Os usuários devem interagir com nossos recursos de comunidade (pedidos de música, feedbacks) de maneira respeitosa e alinhada aos princípios cristãos.
                  </p>
                </div>
                <div className="p-10 bg-gray-50 dark:bg-[#0a0a0a] border-4 border-black dark:border-white shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff]">
                  <AlertTriangle className="w-8 h-8 text-[#ff6600] mb-6" />
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4 dark:text-white italic">Integridade do Sistema</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-tight leading-relaxed">
                    Tentar burlar medidas de segurança ou extrair dados de nossa transmissão é uma violação direta destes termos.
                  </p>
                </div>
              </div>
            </section>

            <section id="accounts" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">
                4. Segurança da Conta
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">
                Você é responsável por manter a confidencialidade das suas credenciais. Todas as atividades realizadas em sua conta são de sua inteira responsabilidade. Utilizamos tecnologia Supabase para garantir que sua autenticação siga os mais altos padrões de segurança da indústria.
              </p>
            </section>

            <section id="ip" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">
                5. Propriedade Intelectual
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">
                Todo o conteúdo da Praise FM Brasil, incluindo logotipos, artes visuais e playlists curadas, é propriedade da Praise FM Global ou de seus licenciadores, sendo protegido pelas leis internacionais de direitos autorais.
              </p>
            </section>

            <section id="liability" className="scroll-mt-32">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 dark:text-white border-b-4 border-black dark:border-white pb-4 inline-block italic">
                6. Limitação de Responsabilidade
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-tight text-sm leading-relaxed">
                A Praise FM Brasil não se responsabiliza por interrupções no serviço causadas por falhas na conexão de internet do usuário ou problemas técnicos de terceiros fora de nosso controle direto.
              </p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;