import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FichaClient from "./FichaClient"; 

async function getFicha(idFicha: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`https://harmonia-rpg.onrender.com/api/v1/ficha/${idFicha}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 0 } 
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
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