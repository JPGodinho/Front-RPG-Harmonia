"use server"

import { UserType } from "@/lib/types";
import { getToken } from "../ficha/[id]/utils";
import { FormState, PerfilFormSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";

const apiPathV1 = process.env.NEXT_PUBLIC_API_KEY_PATH_V1 as string

export async function alterarPerfil(prevState: FormState, formData: FormData) {
  const rawNome = formData.get('nomeUsuario') as string | null;
  const rawSenha = formData.get('senha') as string | null;
  const rawConfirm = formData.get('confirmSenha') as string | null;

  // Trata campos vazios como ausentes (undefined) para o schema opcional
  const validatedFields = PerfilFormSchema.safeParse({
    nomeUsuario: rawNome?.trim() || undefined,
    senha: rawSenha || undefined,
    confirmSenha: rawConfirm || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Monta payload somente com os campos preenchidos
  const { nomeUsuario, senha } = validatedFields.data;
  const payload: Record<string, string> = {};
  if (nomeUsuario) payload.nomeUsuario = nomeUsuario;
  if (senha) payload.senha = senha;

  const { token, idUsuario } = await getToken();

  if (!token) {
    return { message: 'Erro ao conectar com o servidor.' };
  }

  console.log(apiPathV1 + `/usuario/${idUsuario}`);
  

  try {
    const res = await fetch(apiPathV1 + `/usuario/${idUsuario}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Erro ao alterar usuário:", res.status);
      return { message: data.message || 'Erro ao salvar as alterações.' };
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    return { message: 'Erro ao conectar com o servidor.' };
  }

  redirect("/perfil");
}

export async function getUserProperties(): Promise<UserType | null> {
  const { token, idUsuario } = await getToken();

  if (!token) return null;  

  try {
    console.log(apiPathV1 + `/usuario/${idUsuario}`);
    console.log(token);
    
    const res = await fetch(apiPathV1 + `/usuario/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      next: { revalidate: 1 },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Erro ao buscar usuário:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return null;
  }
}