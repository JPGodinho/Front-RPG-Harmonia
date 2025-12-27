"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  // Mudei o estado inicial para "JOGADOR"
  const [tipo, setTipo] = useState("JOGADOR"); 

  const handleCadastro = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!usuario.trim() || !senha.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    // SIMULAÇÃO DE CADASTRO
    console.log("Novo Usuário:", { usuario, senha, tipo });
    
    // Cria o cookie para logar direto
    document.cookie = `auth_token=NOVO_ID_GERADO; path=/; max-age=86400;`;
    
    // Redireciona para o Dashboard
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-harmonia-bg text-white flex flex-col items-center gap-10 p-4">
      
      {/* Cabeçalho igual ao do Login */}
      <div className="w-full max-w-sm text-center mt-10">
        <h1 className="text-lg text-gray-300">
          Junte-se <br />ao <br />
          <strong className="text-2xl text-white">Gerenciador de Ficha de RPG</strong>
        </h1>
        <div className="h-px w-full bg-harmonia-purple my-8 shadow-[0_0_10px_#E300FF]" />
      </div>

      <div className="w-full max-w-sm p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Cadastro</h2>
        
        <form className="flex flex-col gap-5">
          
          {/* Input Usuário */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Nome do Agente</label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite seu nome..."
            />
          </div>

          {/* Input Senha */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Senha de Acesso</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Crie sua senha..."
            />
          </div>

          {/* Select Tipo de Usuário (Com a opção Jogador) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Tipo de Usuário</label>
            <select 
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white cursor-pointer"
            >
              {/* Opção atualizada para JOGADOR */}
              <option value="JOGADOR" className="bg-[#1a1a1a] text-white">Jogador</option>
              <option value="MESTRE" className="bg-[#1a1a1a] text-white">Mestre</option>
            </select>
          </div>

          {/* Botão */}
          <button 
            type="button"
            onClick={handleCadastro}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-4 w-full h-12 text-base"
          >
            Cadastrar
          </button>

          {/* Link para voltar ao Login */}
          <div className="text-center mt-2">
             <span className="text-gray-500 text-sm">Já é um agente? </span>
             <Link href="/login" className="text-harmonia-purple hover:text-white transition-colors text-sm font-bold">
               Fazer Login
             </Link>
          </div>

        </form>
      </div>
    </main>
  );
}