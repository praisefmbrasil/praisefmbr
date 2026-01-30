import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Tradução de mensagens de erro comuns do Supabase para o usuário
      const errorMessage = error.message === 'Invalid login credentials' 
        ? 'Credenciais de login inválidas' 
        : error.message;
      setError(errorMessage);
      setLoading(false);
    } else {
      navigate('/my-sounds');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] dark:bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#0f0f0f] rounded-none shadow-2xl p-10 transition-colors border-t-4 border-[#ff6600]">
        <div className="text-center mb-10">
          <img 
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/PraiseFMBrasil_Logo.webp" 
            alt="Praise FM Brasil" 
            className="h-12 mx-auto mb-8 dark:invert"
          />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">Entrar</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-[10px] mt-3 uppercase tracking-[0.3em]">Bem-vindo à Praise FM Brasil</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[11px] font-black uppercase tracking-widest border-l-4 border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Endereço de E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-none focus:border-[#ff6600] outline-none transition-all dark:text-white font-bold placeholder:text-gray-300 dark:placeholder:text-gray-700"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sua Senha</label>
              <Link to="/recovery" className="text-[9px] font-black text-[#ff6600] uppercase tracking-widest hover:underline">Esqueceu a senha?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 rounded-none focus:border-[#ff6600] outline-none transition-all dark:text-white font-bold"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6600] hover:bg-black dark:hover:bg-white dark:hover:text-black text-white font-black py-6 rounded-none shadow-lg transition-all flex items-center justify-center space-x-3 disabled:opacity-50 active:scale-95 group"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <span className="text-sm uppercase tracking-[0.2em]">Acessar Conta</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-tight">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-[#ff6600] font-black hover:underline ml-1">Criar uma agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;