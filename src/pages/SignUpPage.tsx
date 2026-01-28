// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await signUp(email, password);
      navigate("/"); // redireciona para home após sucesso
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-[#111] rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Criar Conta</h1>

        {errorMsg && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#ff6600] py-3 rounded font-bold uppercase hover:bg-black transition"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Já tem uma conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#ff6600] cursor-pointer hover:underline"
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
