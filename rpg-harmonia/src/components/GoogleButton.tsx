'use client';

import { useState } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { salvarSessao } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export function GoogleButton() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro]       = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setErro(null);

    try {
      // 1. Abre popup do Google via Firebase Authentication
      const result = await signInWithPopup(auth, googleProvider);
      const user   = result.user;

      // 2. Obtém o idToken JWT gerado pelo Firebase
      const idToken     = await user.getIdToken();
      const refreshToken = user.refreshToken;

      // 3. Extrai username do email (ex: "teste" de "teste@gmail.com")
      const username = user.displayName ?? user.email!.split('@')[0];

      // 4. Salva sessão via server action (cookies httpOnly no servidor)
      await salvarSessao({
        uid: user.uid,
        username,
        token: idToken,
        refreshToken,
        userRole: 'USER',
      });

    } catch (err: unknown) {
      const e = err as { code?: string };
      if (e.code !== 'auth/popup-closed-by-user') {
        setErro('Erro ao autenticar com o Google. Tente novamente.');
      }
    } finally {
      setLoading(false);
      redirect('/dashboard')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 border border-gray-600 hover:border-gray-400 text-white hover:bg-white/5 w-full h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        {loading ? 'Aguarde...' : 'Continuar com Google'}
      </button>

      {erro && (
        <p className="text-xs text-red-400 font-bold text-center">{erro}</p>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}