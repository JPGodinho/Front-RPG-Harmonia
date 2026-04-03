"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth"; // Importa nossa função do servidor
import { Eye, EyeClosed } from "lucide-react";

export default function LoginPage() {
  // Conecta o formulário à Server Action
  const [state, action, pending] = useActionState(login, undefined);
  const [verSenha, setVerSenha] = useState(false);

  return (
    <main className="bg-harmonia-bg text-white flex flex-col items-center">
      
      {/* Cabeçalho */}
      <div className="w-full max-w-sm text-center mt-10">
        <h1 className="text-lg text-gray-300">
          Bem Vindo <br />ao <br />
          <strong className="text-2xl text-white">Gerenciador de Ficha de RPG</strong>
        </h1>
        <div className="h-px w-full bg-harmonia-purple my-8 shadow-[0_0_10px_#E300FF]" />
      </div>

      <div className="w-full max-w-sm p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
        
        {/* Mensagem de Erro Geral (vindo da API, ex: "Senha incorreta") */}
        {state?.message && (
          <div className="mb-4 p-3 rounded bg-red-900/50 border border-red-500 text-red-200 text-sm text-center animate-in fade-in slide-in-from-top-2">
            {state.message}
          </div>
        )}

        <form action={action} className="flex flex-col gap-5">
          
          {/* Usuário */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nomeUsuario" className="text-sm text-gray-400">Usuário</label>
            <input 
              id="nomeUsuario"
              name="nomeUsuario"
              type="text" 
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite seu usuário..."
            />
            {/* Erro de Validação (Zod) */}
            {state?.errors?.nomeUsuario && (
              <p className="text-xs text-red-400 font-bold">{state.errors.nomeUsuario[0]}</p>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="text-sm text-gray-400">
              Senha
            </label>

            {/* Wrapper relative */}
            <div className="relative">
              <input
                id="senha"
                name="senha"
                type={verSenha ? "text" : "password"}
                className="bg-transparent border border-gray-600 rounded-lg w-full h-12 px-4 pr-12 outline-none
                          focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5]
                          transition-all text-white placeholder-gray-600"
                placeholder="Digite sua senha..."
              />

              {/* Ícone */}
              <button
                type="button"
                onClick={() => setVerSenha(!verSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {verSenha ? <Eye /> : <EyeClosed />}
              </button>
            </div>

            {/* Erro de Validação (Zod) */}
            {state?.errors?.senha && (
              <p className="text-xs text-red-400 font-bold">
                {state.errors.senha[0]}
              </p>
            )}
          </div>


          <button 
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-4 w-full h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>

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