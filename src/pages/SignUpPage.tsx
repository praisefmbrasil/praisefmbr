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
    
    // 1. Cadastra o usuário no Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({ 
      email, 
      password 
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Cria a entrada na tabela 'profiles' para o novo usuário
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: data.user.id, 
            username: email.split('@')[0], // Nome provisório baseado no e-mail
            updated_at: new Date().toISOString()
          }
        ]);

      if (profileError) {
        console.error("Erro ao criar perfil:", profileError.message);
        // Não travamos o login por isso, o usuário pode preencher o perfil depois
      }
    }

    // 3. Redireciona para o login com mensagem de sucesso
    navigate('/login?message=Conta criada com sucesso! Por favor, faça login.');
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] dark:bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl p-8 transition-colors">
        <div className="text-center mb-8">
          {/* Logo Oficial Praise FM Brasil */}
          <img 
            src="https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Brasil_p1qfof.webp" 
            alt="Praise FM Brasil" 
            className="h-10 mx-auto mb-6 dark:invert"
          />
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">Faça Parte</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-[10px] mt-3 uppercase tracking-widest">
            Comece sua jornada de adoração hoje
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl border border-red-100 dark:border-red-900/50 uppercase tracking-tight">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Endereço de E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none dark:text-white font-bold transition-all"
              placeholder="exemplo@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none dark:text-white font-bold transition-all"
              placeholder="Mínimo de 6 caracteres"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-xl focus:ring-2 focus:ring-[#ff6600] outline-none dark:text-white font-bold transition-all"
              placeholder="Repita sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6600] hover:bg-black text-white font-black py-5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-95 mt-4"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <span className="text-sm uppercase tracking-widest">Criar Minha Conta</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-bold text-[11px] uppercase tracking-tight">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#ff6600] hover:underline ml-1">Entrar Agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;