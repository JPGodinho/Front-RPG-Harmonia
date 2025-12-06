"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <main className="min-h-screen bg-harmonia-bg text-white flex flex-col items-center gap-20 p-">
      
      <div className="w-full max-w-sm text-center mt-10">
        <h1 className="text-lg text-gray-300">
          Bem Vindo <br />ao <br />
          <strong className="text-2xl text-white">Gerenciador de Ficha de RPG</strong>
        </h1>
        <div className="h-px w-full bg-harmonia-purple mt-15 shadow-[0_0_10px_#E300FF]" />
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
            className="bg-white text-black font-bold h-12 rounded-lg mt-6 hover:bg-gray-200 transition-transform active:scale-95"
            onClick={() => {
              router.push('/dashboard');
            }}
          >
            Enviar
          </button>

        </form>
      </div>
    </main>
  );
}