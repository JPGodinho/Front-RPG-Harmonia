'use client'

import { UserType } from '@/lib/types'
import PerfilForm from './PerfilForm'
import { useState } from 'react'
import { Pencil, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function PerfilMain({ user }: { user: UserType | null | undefined }) {
  const [editandoNome, setEditandoNome] = useState(false)

  return (
    <div className="flex flex-col gap-8 items-center">
      {/* ── Nome de usuário ── */}
      <section className="w-full"> 

        <div className="flex items-center justify-between gap-3">
          <Avatar className="h-20 w-20 rounded-lg">
            <AvatarImage src={user?.avatar} alt={user?.nomeUsuario} />
            <AvatarFallback className="text-2xl rounded-lg">{user?.nomeUsuario.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex gap-2 w-full ">
            <p className="text-white text-2xl">{user?.nomeUsuario}</p>

            <button
              type="button"
              onClick={() => setEditandoNome((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
              aria-label={editandoNome ? 'Cancelar edição' : 'Editar nome de usuário'}
            >
              {editandoNome ? (
                <>
                  <X size={14} />
                  Cancelar
                </>
              ) : (
                <>
                  <Pencil size={14} />
                  Editar nome de usuario
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* ── Formulário ── */}
      <section className="w-full">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Editar perfil</h2>
        <PerfilForm editandoNome={editandoNome} onSucesso={() => setEditandoNome(false)} />
      </section>
    </div>
  )
}