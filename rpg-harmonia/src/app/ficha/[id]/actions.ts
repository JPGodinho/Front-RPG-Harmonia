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