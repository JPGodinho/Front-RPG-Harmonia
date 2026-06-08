'use client'

import { UserType } from '@/lib/types'
import PerfilForm from './PerfilForm'
import { useEffect, useState } from 'react'
import { ArrowUpRightFromSquare, Edit, Pencil, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserProperties } from '../actions'

export default function PerfilMain() {
  const [editandoNome, setEditandoNome] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      const user = await getUserProperties();
      if (user) setUser(user);
    }
    buscarDadosUsuario();
  },[])

  const editPhotoUrl = () => {
    // TODO: método deve abrir uma dropbox para receber uma imagem e deve enviar ao cloaudinary
    // que irá retornar um link da imagem que deve ser enviado para api salvar
  }
 
  const getResetPwdLink = () => {
    // TODO: chamar método que retorna link de reset de senha e redirecionar cliente para ela
  }

  // TODO: Criar método de edição dos dados do usuário

  return (
    <div className="flex flex-col gap-8 items-center">
      {/* ── Nome de usuário ── */}
      <section className="w-full"> 

        <div className="flex items-center justify-between gap-3">
          <Avatar className="h-20 w-20 rounded-lg">
            <span className='flex items-center justify-center h-full w-full opacity-0 hover:opacity-100 hover:visible absolute'>
              <Edit 
                onClick={() => editPhotoUrl()}
                color='gray' size={25}
              />
            </span>
            <AvatarImage src={user?.photoUrl} alt={user?.username} />
            <AvatarFallback className="text-2xl rounded-lg">{user?.username.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex gap-2 w-full ">
            <p className="text-white text-2xl">{user?.username}</p>

            {/* <button
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
            </button> */}
          </div>

        </div>
      </section>
      <section className="w-full flex flex-col items-start justify-around">
        <div className="flex items-center justify-between gap-3">
          <h2 className='text-lg'>Email:</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <h2 className='text-lg'>Telefone:</h2>
          <p className="text-gray-400">{user?.telefone}</p>
        </div>
        <div className="flex items-center gap-3">
          <h2 className='text-lg'>Alterar senha</h2>
          <a className="text-gray-400" onClick={() => getResetPwdLink()}>
          <span className='cursor-pointer hover:text-white'><ArrowUpRightFromSquare size={17}/></span>  
          </a>
        </div>
      </section>

      {/* ── Formulário ── */}
      {/* <section className="w-full">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Editar perfil</h2>
        <PerfilForm editandoNome={editandoNome} onSucesso={() => setEditandoNome(false)} />
      </section> */}
    </div>
  )
}