import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FichaClient from "./FichaClient"; 

async function getFicha(idFicha: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    console.error("Token Expirado");
    return null
  };

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.error("Erro ao buscar dados da ficha:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Erro de conexão:", error);
    return null;
  }
}

interface FichaPageProps {
  params: Promise<{ id: string }>;
}

export default async function FichaPage({ params }: FichaPageProps) {
  
  const { id } = await params;

  const dados = await getFicha(id);

  if (!dados) {
    redirect("/dashboard");
  }

  return <FichaClient dadosIniciais={dados} />;
}