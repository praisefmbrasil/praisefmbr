import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    // Validações
    if (!name.trim()) {
      setMessage('Por favor, insira seu nome.');
      return;
    }

    if (!email.trim()) {
      setMessage('Por favor, insira seu email.');
      return;
    }

    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, name);
      
      if (error) {
        setMessage(error.message);
      } else {
        setSuccess(true);
        setMessage('Cadastro realizado com sucesso! Você já pode fazer login.');
        
        // Redireciona para o login após 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err: any) {
      setMessage(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000] flex items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="max-w-md w-full">
        
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-tighter text-black dark:text-white mb-3">
            Criar Conta
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">
            Junte-se à comunidade Praise FM BR
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#111] border-2 border-black dark:border-white p-8">
          
          {message && (
            <div className={`mb-6 p-4 border-2 flex items-start space-x-3 ${
              success 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
            }`}>
              {success ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nome */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:border-[#ff6600] dark:focus:border-[#ff6600] outline-none transition-colors"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:border-[#ff6600] dark:focus:border-[#ff6600] outline-none transition-colors"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:border-[#ff6600] dark:focus:border-[#ff6600] outline-none transition-colors"
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:border-[#ff6600] dark:focus:border-[#ff6600] outline-none transition-colors"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff6600] hover:bg-black dark:hover:bg-white text-white hover:text-white dark:hover:text-black border-2 border-[#ff6600] hover:border-black dark:hover:border-white py-4 font-black uppercase tracking-[0.2em] text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Criando conta...</span>
                </>
              ) : (
                <span>Criar Conta</span>
              )}
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{' '}
              <Link 
                to="/login" 
                className="text-[#ff6600] hover:text-black dark:hover:text-white font-bold uppercase tracking-wide transition-colors"
              >
                Faça Login
              </Link>
            </p>
          </div>
        </div>

        {/* Termos */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Ao criar uma conta, você concorda com nossos{' '}
          <Link to="/terms" className="text-[#ff6600] hover:underline">Termos de Uso</Link>
          {' '}e{' '}
          <Link to="/privacy-policy" className="text-[#ff6600] hover:underline">Política de Privacidade</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;