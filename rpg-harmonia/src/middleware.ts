// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Tenta pegar o cookie de autenticação
  const token = request.cookies.get('auth_token')?.value;

  // Rotas que não precisam de senha
  const isPublicRoute = 
    request.nextUrl.pathname === '/login' || 
    request.nextUrl.pathname === '/cadastro';

  // 1. Se NÃO tem token e está tentando acessar página protegida -> Manda pro Login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Se TEm token e tenta acessar Login ou Cadastro -> Manda pro Dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configura para não rodar em arquivos estáticos ou imagens
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};