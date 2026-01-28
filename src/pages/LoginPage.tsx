import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/");
    } catch {
      setError("Email ou palavra-passe inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-white/10 p-10">
        <h1 className="text-4xl uppercase tracking-tight mb-8">
          Entrar
        </h1>

        {error && (
          <div className="mb-6 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 px-4 py-3 focus:outline-none focus:border-[#ff6600]"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest mb-2">
              Palavra-passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 px-4 py-3 focus:outline-none focus:border-[#ff6600]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6600] text-black py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-white transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-400">
          Ainda não tem conta?{" "}
          <Link to="/signup" className="text-[#ff6600] hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
