import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowRight } from 'lucide-react';

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
      navigate('/login?message=Conta criada! Por favor, faça login para acessar.');
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
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Faça Parte</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mt-2 uppercase tracking-tight">Comece sua jornada de adoração hoje</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Endereço de E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none dark:text-white font-bold"
              placeholder="exemplo@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none dark:text-white font-bold"
              placeholder="Mínimo de 6 caracteres"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none dark:text-white font-bold"
              placeholder="Repita sua senha"
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
                <span className="text-lg uppercase tracking-tight">Criar Conta</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-tight">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#ff6600] hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;