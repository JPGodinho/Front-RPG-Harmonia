"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Importei o Link
import { bancoDeUsuarios } from "@/lib/usuarios";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede recarregar a página
    
    if (!usuario.trim() || !senha.trim()) {
      alert("Preencha tudo!");
      return;
    }

    const usuarioEncontrado = bancoDeUsuarios.find(u => 
      u.nomeUsuario === usuario && u.senha === senha
    );

    if (usuarioEncontrado) {
      // 1. Mantive seu localStorage
      localStorage.setItem("nomeUsuario", usuarioEncontrado.nomeUsuario);
      localStorage.setItem("idUsuario", usuarioEncontrado.id);
      
      // 2. ADICIONEI O COOKIE (Essencial para o Middleware funcionar)
      document.cookie = `auth_token=${usuarioEncontrado.id}; path=/; max-age=86400;`;

      router.push("/dashboard");
    } else {
      alert("Usuário ou senha errados!");
    }
  };

  return (
    <main className="min-h-screen bg-harmonia-bg text-white flex flex-col items-center gap-10 p-4">
      
      <div className="w-full max-w-sm text-center mt-10">
        <h1 className="text-lg text-gray-300">
          Bem Vindo <br />ao <br />
          <strong className="text-2xl text-white">Gerenciador de Ficha de RPG</strong>
        </h1>
        <div className="h-px w-full bg-harmonia-purple my-8 shadow-[0_0_10px_#E300FF]" />
      </div>

      <div className="w-full max-w-sm p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
        
        <form className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Usuário</label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite seu usuário..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Senha</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite sua senha..."
            />
          </div>

          <button 
            type="button"
            onClick={handleLogin}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-4 w-full h-12 text-base"
          >
            Entrar
          </button>

          {/* LINK PARA CADASTRO ADICIONADO AQUI */}
          <div className="text-center mt-2">
             <span className="text-gray-500 text-sm">Não tem conta? </span>
             <Link href="/cadastro" className="text-harmonia-purple hover:text-white transition-colors text-sm font-bold">
               Criar agora
             </Link>
          </div>

        </form>
      </div>
    </main>
  );
}