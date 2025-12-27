"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();
  
  // Estados do formulário
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("JOGADOR");
  
  // Estado de carregamento e erro
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleCadastro = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErro(""); // Limpa erros anteriores

    if (!usuario.trim() || !senha.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      // 1. Faz a chamada para a API REAL
      const response = await fetch("https://harmonia-rpg.onrender.com/api/v1/auth/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeUsuario: usuario,
          senha: senha,
          tipoUsuario: tipo
        }),
      });

      // 2. Verifica se deu erro na API (Ex: usuário já existe)
      if (!response.ok) {
        // Tenta pegar a mensagem de erro da API ou usa uma genérica
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao cadastrar usuário.");
      }

      // 3. Sucesso! Pega os dados retornados
      const data = await response.json();
      console.log("Cadastro realizado:", data);

      // 4. Salva o Token Real no Cookie (Validade de 1 dia)
      // O Middleware vai verificar esse cookie "auth_token"
      document.cookie = `auth_token=${data.token}; path=/; max-age=86400;`;

      // 5. Salva dados não-sensíveis no LocalStorage para a UI
      localStorage.setItem("nomeUsuario", data.nomeUsuario);
      localStorage.setItem("idUsuario", data.id); // Importante para filtrar as fichas depois

      // 6. Redireciona
      router.push("/dashboard");

    } catch (error: any) {
      console.error(error);
      setErro(error.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-harmonia-bg text-white flex flex-col items-center gap-10 p-4">
      
      <div className="w-full max-w-sm text-center mt-10">
        <h1 className="text-lg text-gray-300">
          Junte-se <br />ao <br />
          <strong className="text-2xl text-white">Gerenciador de Ficha de RPG</strong>
        </h1>
        <div className="h-px w-full bg-harmonia-purple my-8 shadow-[0_0_10px_#E300FF]" />
      </div>

      <div className="w-full max-w-sm p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Cadastro</h2>
        
        {/* Exibe mensagem de erro se houver */}
        {erro && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded-lg mb-4 text-center">
            {erro}
          </div>
        )}

        <form className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Nome da conta</label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite seu nome..."
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Senha de Acesso</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Crie sua senha..."
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Tipo de Usuário</label>
            <select 
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white cursor-pointer"
              disabled={loading}
            >
              <option value="JOGADOR" className="bg-[#1a1a1a] text-white">Jogador</option>
              <option value="MESTRE" className="bg-[#1a1a1a] text-white">Mestre</option>
            </select>
          </div>

          <button 
            type="button"
            onClick={handleCadastro}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-4 w-full h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

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