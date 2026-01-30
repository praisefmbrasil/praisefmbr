import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowRight, UserPlus } from 'lucide-react';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/login?message=Conta criada! Por favor, verifique seu e-mail e entre.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] dark:bg-[#000] flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-lg bg-white dark:bg-[#080808] border-4 border-black dark:border-white p-10 md:p-14 shadow-[20px_20px_0px_#ff6600]">
        
        {/* Header Estilo Praise Brasil */}
        <div className="text-center mb-12">
          <img 
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp" 
            alt="Praise FM Brasil" 
            className="h-10 mx-auto mb-10 dark:invert"
          />
          <div className="flex items-center justify-center space-x-3 text-[#ff6600] mb-4">
            <UserPlus className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Novo Membro</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white tracking-tighter uppercase italic leading-none">
            Crie Sua<br />Conta
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-[10px] mt-6 uppercase tracking-widest leading-relaxed">
            Junte-se à nossa comunidade de adoração e<br />tenha acesso a recursos exclusivos.
          </p>
        </div>

        {error && (
          <div className="mb-10 p-5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500 text-xs font-black uppercase tracking-widest border-l-8 border-red-600 animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-5 bg-gray-50 dark:bg-white/5 border-4 border-black dark:border-white focus:border-[#ff6600] outline-none dark:text-white font-black italic uppercase tracking-tighter text-lg transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
              placeholder="SEU@EMAIL.COM"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 bg-gray-50 dark:bg-white/5 border-4 border-black dark:border-white focus:border-[#ff6600] outline-none dark:text-white font-black italic uppercase tracking-tighter text-lg transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-6 py-5 bg-gray-50 dark:bg-white/5 border-4 border-black dark:border-white focus:border-[#ff6600] outline-none dark:text-white font-black italic uppercase tracking-tighter text-lg transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6600] text-white font-black py-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] transition-all flex items-center justify-center space-x-4 disabled:opacity-50 active:translate-y-1 active:shadow-none hover:bg-black dark:hover:bg-white dark:hover:text-black group"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <span className="text-xl uppercase tracking-tighter italic">Cadastrar Agora</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t-4 border-black dark:border-white/10 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-bold text-[11px] uppercase tracking-widest">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-[#ff6600] hover:underline decoration-4 underline-offset-8">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;