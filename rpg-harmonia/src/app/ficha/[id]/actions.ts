'use server';

import { cookies } from 'next/headers';
import { DescricaoData, HabilidadeData, InventarioData, ListaDePericias, RitualData } from '@/lib/types';

export async function buscarPericiasDaFicha(idFicha: string): Promise<ListaDePericias | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}/atributos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 } 
    });

    if (!res.ok) {
      console.error("Erro ao buscar perícias:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Erro de conexão nas perícias:", error);
    return null;
  }
}


export async function buscarDescricao(idFicha: string): Promise<DescricaoData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}/descricao`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 } 
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar descrição:", error);
    return null;
  }
}

export async function buscarRituais(idFicha: string): Promise<RitualData[] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}/rituais`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 } 
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar rituais:", error);
    return null;
  }
}

export async function buscarHabilidades(idFicha: string): Promise<HabilidadeData[] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}/habilidades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 } 
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar habilidades:", error);
    return null;
  }
}

export async function buscarInventario(idFicha: string): Promise<InventarioData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}/inventario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 } 
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar inventário:", error);
    return null;
  }
}

export async function atualizarFicha(idFicha: string, payload: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const idUsuario = cookieStore.get("user_id")?.value; // <--- LENDO DO COOKIE

  if (!token) {
    console.error("Sem token de autenticação");
    return false;
  }

  if (!idUsuario) {
    console.error("ID do usuário não encontrado nos cookies");
    return false;
  }

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}?id-usuario=${idUsuario}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("Erro na API de atualização:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}