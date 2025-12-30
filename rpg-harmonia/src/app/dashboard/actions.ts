'use server';

import { DescricaoData } from '@/lib/types';
import { cookies } from 'next/headers';

export async function buscarMeusAgentes() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const token = cookieStore.get("auth_token")?.value;

  if (!userId || !token) return [];

  try {
    const res = await fetch(
      `https://harmonia-rpg.onrender.com/api/v1/ficha/usuario?id-usuario=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        next: { revalidate: 0 } // Sem cache
      }
    );

    if (!res.ok) return [];
    
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar agentes:", error);
    return [];
  }
}