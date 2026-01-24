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

  // Função para traduzir erros comuns do Supabase/Auth
  const getErrorMessage = (msg: string) => {
    if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
    if (msg.includes('Email not confirmed')) return 'Por favor, confirme seu e-mail antes de acessar.';
    if (msg.includes('Network error')) return 'Erro de conexão. Verifique sua internet.';
    return 'Ocorreu um erro ao entrar. Tente novamente.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(getErrorMessage(error.message));
      setLoading(false);
    } else {
      navigate('/my-sounds');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] dark:bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl p-8 transition-colors">
        <div className="text-center mb-8">
          <img 
            src="https://res.cloudinary.com/dtecypmsh/image/upload/v1766869698/SVGUSA_lduiui.webp" 
            alt="Praise FM Brasil" 
            className="h-10 mx-auto mb-6 dark:invert"
          />
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Entrar</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-2 uppercase tracking-wide">Bem-vindo à Praise FM Brasil</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Endereço de E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none transition-all dark:text-white font-medium"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Sua Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none transition-all dark:text-white font-medium"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6600] hover:bg-black text-white font-black py-5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-95"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <span className="text-lg uppercase tracking-tight">Entrar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-[#ff6600] font-bold hover:underline">Criar conta gratuita</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;