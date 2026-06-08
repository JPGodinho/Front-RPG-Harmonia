"use client";
import { useActionState } from "react";
import Link from "next/link";
import { signup } from "@/app/actions/auth";
import { GoogleButton } from "@/components/GoogleButton";

export default function CadastroPage() {
  const [state, action, pending] = useActionState(signup, undefined);

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

        {state?.message && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded-lg mb-4 text-center animate-in fade-in slide-in-from-top-2">
            {state.message}
          </div>
        )}

        <form action={action} className="flex flex-col gap-5">

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-gray-400">Nome da conta</label>
            <input
              id="username"
              name="username"
              type="text"
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite seu nome..."
            />
            {state?.errors?.username && (
              <p className="text-xs text-red-400 font-bold">{state.errors.username[0]}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-400">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Digite seu e-mail..."
            />
            {state?.errors?.email && (
              <p className="text-xs text-red-400 font-bold">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-400">Senha de Acesso</label>
            <input
              id="password"
              name="password"
              type="password"
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="Crie sua senha..."
            />
            {state?.errors?.password && (
              <p className="text-xs text-red-400 font-bold">{state.errors.password[0]}</p>
            )}
          </div>

          {/* Telefone (opcional) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="telefone" className="text-sm text-gray-400">
              Telefone <span className="text-gray-600 text-xs">(opcional)</span>
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              className="bg-transparent border border-gray-600 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600"
              placeholder="+5511999999999"
            />
            {state?.errors?.telefone && (
              <p className="text-xs text-red-400 font-bold">{state.errors.telefone[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-4 w-full h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Cadastrando..." : "Cadastrar"}
          </button>

          {/* Divisor */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-xs">ou</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <GoogleButton />

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