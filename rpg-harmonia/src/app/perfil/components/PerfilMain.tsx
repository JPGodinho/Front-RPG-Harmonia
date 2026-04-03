'use client'

import { UserType } from '@/lib/types'
import PerfilForm from './PerfilForm'
import { useState } from 'react'
import { Pencil, X } from 'lucide-react'

export default function PerfilMain({ user }: { user: UserType | null | undefined }) {
  const [editandoNome, setEditandoNome] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      {/* ── Nome de usuário ── */}
      <section> 

        <div className="flex items-center gap-3">
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
      </section>

      {/* ── Formulário ── */}
      <section>
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Editar perfil</h2>
        <PerfilForm editandoNome={editandoNome} onSucesso={() => setEditandoNome(false)} />
      </section>
    </div>
  )
}