'use server';

import { LoginFormSchema, SignupFormSchema, FormState } from '@/lib/definitions';
import { AuthResponse } from '@/lib/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_V1_URL;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export async function salvarSessao(data: AuthResponse) {
  const cookieStore = await cookies();
  const opts = {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hora — tempo de vida do idToken do Firebase
    path: '/',
  };

  // httpOnly — token de autenticação protegido do JS do cliente
  cookieStore.set('auth_token', data.token, { ...opts, httpOnly: true });
  cookieStore.set('refresh_token', data.refreshToken, { ...opts, httpOnly: true });

  // Visíveis ao cliente para uso na UI
  cookieStore.set('user_id',   data.uid,      opts);
  cookieStore.set('user_name', data.username, opts);
  cookieStore.set('user_role', data.userRole, opts);
}

async function limparSessao() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('user_id');
  cookieStore.delete('user_name');
  cookieStore.delete('user_role');
}

// ─────────────────────────────────────────────────────────────────────────────
// Login com e-mail e senha
// ─────────────────────────────────────────────────────────────────────────────

export async function login(prevState: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email:    formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.error || 'E-mail ou senha incorretos.' };
    }

    await salvarSessao(data as AuthResponse);

  } catch {
    return { message: 'Erro ao conectar com o servidor.' };
  }

  redirect('/dashboard');
}

// ─────────────────────────────────────────────────────────────────────────────
// Cadastro com e-mail e senha
// ─────────────────────────────────────────────────────────────────────────────

export async function signup(prevState: FormState, formData: FormData) {
  const rawTelefone = formData.get('telefone') as string;

  const validatedFields = SignupFormSchema.safeParse({
    username:  formData.get('username'),
    email:     formData.get('email'),
    password:  formData.get('password'),
    telefone:  rawTelefone || undefined,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, email, password, telefone } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        telefone: telefone || null,
        userRole: 'USER',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.error || 'Erro ao criar conta. Tente novamente.' };
    }

    await salvarSessao(data as AuthResponse);

  } catch {
    return { message: 'Erro de conexão com o servidor.' };
  }

  redirect('/dashboard');
}

// ─────────────────────────────────────────────────────────────────────────────
// Login / Cadastro com Google
// Chamado pelo GoogleButton (client component) após o popup do Google
// O idToken vem do Firebase client SDK — a API valida e retorna a sessão
// ─────────────────────────────────────────────────────────────────────────────

export async function autenticarComGoogle(idToken: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Erro ao autenticar com Google.' };
    }

    await salvarSessao(data as AuthResponse);

  } catch {
    return { error: 'Erro de conexão com o servidor.' };
  }

  redirect('/dashboard');
}

// ─────────────────────────────────────────────────────────────────────────────
// Logout
// ─────────────────────────────────────────────────────────────────────────────

export async function logout() {
  await limparSessao();
  redirect('/login');
}