import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Brasil_p1qfof.webp" 
                alt="Praise FM Brasil Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-sm font-normal">
              Sua casa para os melhores louvores, conteúdos devocionais exclusivos e a nova geração de artistas gospel. Selecionado diariamente para edificar sua fé.
            </p>
          </div>
          <div>
            <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">Música</h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li>
                <button 
                  onClick={() => navigate('/music')} 
                  className="hover:text-[#ff6600] transition-colors text-left"
                >
                  Playlist Praise FM
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/new-releases')} 
                  className="hover:text-[#ff6600] transition-colors text-left"
                >
                  Novos Lançamentos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/artists')} 
                  className="hover:text-[#ff6600] transition-colors text-left"
                >
                  Artistas em Destaque
                </button>
              </li>
            </ul>
          </div>
          <div>
             <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">Rádio</h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li><button onClick={() => navigate('/schedule')} className="hover:text-[#ff6600] transition-colors text-left">Grade Completa</button></li>
              <li><button onClick={() => navigate('/presenters')} className="hover:text-[#ff6600] transition-colors text-left">Nossos Apresentadores</button></li>
              <li><button onClick={() => navigate('/devotional')} className="hover:text-[#ff6600] transition-colors text-left">Devocional Diário</button></li>
            </ul>
          </div>
          <div>
             <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">Suporte</h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li><button onClick={() => navigate('/help')} className="hover:text-[#ff6600] transition-colors text-left">Central de Ajuda</button></li>
              <li><button onClick={() => navigate('/feedback')} className="hover:text-[#ff6600] transition-colors text-left">Feedback & Suporte</button></li>
              <li><a href="mailto:contato@praisefmbrasil.com.br" className="hover:text-[#ff6600] transition-colors">Contato Direto</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-medium uppercase text-[11px] tracking-widest mb-6 text-white/50">Siga-nos</h4>
            <ul className="space-y-4 text-sm font-normal text-gray-400">
              <li>
                <a 
                  href="https://www.instagram.com/praisefmbrasil/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#ff6600] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-normal text-gray-500 uppercase tracking-widest">
          <p>© 2026 PRAISE FM BRASIL. INSPIRADO PELA EXCELÊNCIA.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">Política de Privacidade</button>
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Termos de Uso</button>
            <button onClick={() => navigate('/cookies')} className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;