'use server';

import { LoginFormSchema, FormState, SignupFormSchema } from '@/lib/definitions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: FormState, formData: FormData) {
  // 1. Valida os campos do formulário antes de enviar
  const validatedFields = LoginFormSchema.safeParse({
    nomeUsuario: formData.get('nomeUsuario'),
    senha: formData.get('senha'),
  });

  // Se a validação falhar, devolve os erros para o front
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nomeUsuario, senha } = validatedFields.data;

  try {
    // 2. Chama a API Real
    const response = await fetch("https://harmonia-rpg.onrender.com/api/v1/auth/entrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomeUsuario, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Retorna a mensagem de erro da API ou uma genérica
      return { message: data.message || 'Usuário ou senha incorretos.' };
    }

    // 3. Sucesso! Configura o Cookie de Autenticação
    // "data.token" é o JWT que recebemos da resposta
    const cookieStore = await cookies();
    
    cookieStore.set('auth_token', data.token, {
      httpOnly: true, // Segurança: JS do front não acessa
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia de validade
      path: '/',
    });

    // Opcional: Você pode querer salvar o nomeUsuario em um cookie visível 
    // para mostrar no Dashboard sem precisar de localStorage no login
    cookieStore.set('user_name', data.nomeUsuario, {
       maxAge: 60 * 60 * 24, 
       path: '/' 
    });
    
    // Salva o ID também se necessário para buscar fichas
    cookieStore.set('user_id', data.id, {
        maxAge: 60 * 60 * 24,
        path: '/'
    });
    
    // Salva o tipoUsuario também para buscar fichas
    cookieStore.set('user_type', data.tipoUsuario, {
        maxAge: 60 * 60 * 24,
        path: '/'
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return { message: 'Erro ao conectar com o servidor.' };
  }

  // 4. Redireciona para o Dashboard (tem que ser fora do try/catch)
  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  
  // Apaga os cookies de forma segura no servidor
  cookieStore.delete('auth_token');
  cookieStore.delete('user_id');
  cookieStore.delete('user_name');

  // Redireciona para o login
  redirect('/login');
}

export async function signup(prevState: FormState, formData: FormData) {
  // 1. Valida os campos
  const validatedFields = SignupFormSchema.safeParse({
    nomeUsuario: formData.get('nomeUsuario'),
    senha: formData.get('senha'),
    tipoUsuario: formData.get('tipoUsuario'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nomeUsuario, senha, tipoUsuario } = validatedFields.data;

  try {
    // 2. Chama a API de Cadastro
    const response = await fetch("https://harmonia-rpg.onrender.com/api/v1/auth/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomeUsuario, senha, tipoUsuario }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || 'Erro ao criar conta. Tente outro nome de usuário.' };
    }

    // 3. Sucesso! Configura os cookies (IGUAL AO LOGIN)
    const cookieStore = await cookies();
    
    // Cookie de Segurança
    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    // Cookies de Dados (ID e Nome)
    cookieStore.set('user_name', data.nomeUsuario, {
       maxAge: 60 * 60 * 24, 
       path: '/' 
    });
    
    cookieStore.set('user_id', data.id, {
        maxAge: 60 * 60 * 24,
        path: '/'
    });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return { message: 'Erro de conexão com o servidor.' };
  }

  // 4. Redireciona
  redirect('/dashboard');
}