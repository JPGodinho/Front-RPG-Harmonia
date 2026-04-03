'use client'

import React, { useActionState, useState } from 'react'
import { alterarPerfil } from '../actions'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

interface PerfilFormProps {
  editandoNome?: boolean
  onSucesso?: () => void
}

export default function PerfilForm({ editandoNome = false, onSucesso }: PerfilFormProps) {
  const [state, action, pending] = useActionState(alterarPerfil, undefined)
  const [verSenha, setVerSenha] = useState(false)
  const [verConfirm, setVerConfirm] = useState(false)

  return (
    <div className="w-full max-w-md">
      {/* Erro global de formulário */}

      {/* Mensagem de erro vinda do servidor */}
      {state?.message && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded-lg mb-4 text-center animate-in fade-in slide-in-from-top-2">
          {state.message}
        </div>
      )}

      <form action={action} className="flex flex-col gap-5">
        {/* Nome de usuário — visível apenas quando editandoNome = true */}
        {editandoNome && (
          <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <label htmlFor="nomeUsuario" className="text-sm text-gray-400">
              Novo nome de usuário
            </label>
            <input
              id="nomeUsuario"
              name="nomeUsuario"
              type="text"
              autoFocus
              className="bg-transparent border border-gray-600 rounded-lg w-full h-12 px-4 outline-none
                         focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5]
                         transition-all text-white placeholder-gray-600"
              placeholder="Digite o novo nome de usuário..."
            />
            {state?.errors?.nomeUsuario && (
              <p className="text-xs text-red-400 font-bold">
                {state.errors.nomeUsuario[0]}
              </p>
            )}
          </div>
        )}

        {/* Separador — só quando ambas as seções estão visíveis */}
        {editandoNome && <div className="border-t border-gray-700/60" />}

        {/* Nova senha */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="senha" className="text-sm text-gray-400">
            Nova senha <span className="text-gray-600">(opcional)</span>
          </label>
          <div className="relative">
            <input
              id="senha"
              name="senha"
              type={verSenha ? 'text' : 'password'}
              className="bg-transparent border border-gray-600 rounded-lg w-full h-12 px-4 pr-12 outline-none
                         focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5]
                         transition-all text-white placeholder-gray-600"
              placeholder="Digite a nova senha..."
            />
            <button
              type="button"
              onClick={() => setVerSenha((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              aria-label={verSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {verSenha ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {state?.errors?.senha && (
            <p className="text-xs text-red-400 font-bold">
              {state.errors.senha[0]}
            </p>
          )}
        </div>

        {/* Confirmar nova senha */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmSenha" className="text-sm text-gray-400">
            Confirmar nova senha
          </label>
          <div className="relative">
            <input
              id="confirmSenha"
              name="confirmSenha"
              type={verConfirm ? 'text' : 'password'}
              className="bg-transparent border border-gray-600 rounded-lg w-full h-12 px-4 pr-12 outline-none
                         focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5]
                         transition-all text-white placeholder-gray-600"
              placeholder="Confirme a nova senha..."
            />
            <button
              type="button"
              onClick={() => setVerConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              aria-label={verConfirm ? 'Ocultar confirmação' : 'Mostrar confirmação'}
            >
              {verConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {state?.errors?.confirmSenha && (
            <p className="text-xs text-red-400 font-bold">
              {state.errors.confirmSenha[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold
                     transition-all duration-200 bg-white text-black hover:bg-gray-200
                     shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-2 w-full h-12 text-base
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </div>
  )
}