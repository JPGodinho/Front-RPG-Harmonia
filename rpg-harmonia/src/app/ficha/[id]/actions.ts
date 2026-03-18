'use server';

import { AtaqueData, DescricaoData, HabilidadeData, InventarioData, ListaDePericias, RitualData } from '@/lib/types';
import { getToken } from './utils';

const apiPathV1 = process.env.NEXT_PUBLIC_API_KEY_PATH_V1 as string
const apiPathV2 = process.env.NEXT_PUBLIC_API_KEY_PATH_V2 as string

export async function buscarPericiasDaFicha(idFicha: string): Promise<ListaDePericias | null> {
  const {token } = await getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/atributos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
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
  const {token } = await getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/descricao`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar descrição:", error);
    return null;
  }
}

export async function buscarRituais(idFicha: string): Promise<RitualData[] | null> {
  const {token } = await getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${apiPathV2}/ficha/${idFicha}/rituais`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error(await res.json())
      return null
    };

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar rituais:", error);
    return null;
  }
}

export async function buscarHabilidades(idFicha: string): Promise<HabilidadeData[] | null> {
  const {token } = await getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/habilidades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }, 
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar habilidades:", error);
    return null;
  }
}

export async function buscarInventario(idFicha: string): Promise<InventarioData | null> {
  const {token } = await getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/inventario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      } 
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar inventário:", error);
    return null;
  }
}

export async function atualizarFicha(idFicha: string, payload: any) {
  const { token, idUsuario } = await getToken();

  if (!token) {
    console.error("Sem token de autenticação");
    return false;
  }

  if (!idUsuario) {
    console.error("ID do usuário não encontrado nos cookies");
    return false;
  }

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}?id-usuario=${idUsuario}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("Erro na API de atualização:", res.status, await res.json());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}

export async function adicionarItemAoInventario(idFicha: string, item: { nomeItem: string, categoria: string, espacos: number, descricao: string }) {
  const {token } = await getToken();

  if (!token) return false;

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/inventario/itens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(item)
    });

    if (!res.ok) {
      console.error("Erro ao adicionar item:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}

export async function atualizarItemNoInventario(
  idFicha: string, 
  nomeOriginal: string, 
  novoItem: { nomeItem: string, categoria: string, espacos: number, descricao: string }
) {
  const {token } = await getToken();

  if (!token) return false;

  try {
    // A URL usa o nome original (codificado para URL, caso tenha espaços)
    const url = `${apiPathV1}/ficha/${idFicha}/inventario/itens/${encodeURIComponent(nomeOriginal)}`;
    
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(novoItem)
    });

    if (!res.ok) {
      console.error("Erro ao atualizar item:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}

export async function deletarItemDoInventario(idFicha: string, nomeItem: string) {
  const {token } = await getToken();

  if (!token) return false;

  try {
    // Codifica o nome do item para a URL (ex: "Kit Médico" -> "Kit%20M%C3%A9dico")
    const url = `${apiPathV1}/ficha/${idFicha}/inventario/itens/${encodeURIComponent(nomeItem)}`;
    
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error("Erro ao deletar item:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}

export async function buscarAtaques(idFicha: string): Promise<AtaqueData[] | null> {
  const {token } = await getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/ataques`, {
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
    console.error("Erro ao buscar ataques:", error);
    return null;
  }
}

export async function adicionarRitual(idFicha: string, ritual: RitualData) {
  const {token } = await getToken();

  if (!token) return false;
  
  try {
    const res = await fetch(`${apiPathV2}/ficha/${idFicha}/rituais`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(ritual)
    });

    if (!res.ok) {
      console.error(await res.json())
      console.error("Erro ao adicionar ritual:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}

export async function atualizarRitual(idFicha: string, ritual: RitualData) {
  const {token } = await getToken();

  if (!token) return false;
  if (ritual.idRitual == null) {
    console.error("Id do ritual não pode ser nulo.")
    return false;
  }

  try {
    const res = await fetch(`${apiPathV2}/ficha/${idFicha}/rituais?id-ritual=${ritual.idRitual}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(ritual)
    });

    if (!res.ok) {
      console.error(await res.json())
      console.error("Erro ao atualizar ritual:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}

export async function deletarRitual(idFicha: string, ritual: RitualData) {
  const {token } = await getToken();

  if (!token) return false;
  if (ritual.idRitual == null) {
    console.error("Id do ritual não pode ser nulo.")
    return false;
  }

  try {
    const res = await fetch(`${apiPathV2}/ficha/${idFicha}/rituais?id-ritual=${ritual.idRitual}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(ritual)
    });

    if (!res.ok) {
      console.error("Erro ao deletar ritual:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return false;
  }
}