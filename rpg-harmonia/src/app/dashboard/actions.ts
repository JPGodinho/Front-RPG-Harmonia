'use server';

import { cookies } from 'next/headers';

export async function buscarMeusAgentes() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const userType = cookieStore.get("user_type")?.value;
  const token = cookieStore.get("auth_token")?.value;
  
  if (!userId || !token) return []; 
  
  let apiURL = `https://harmonia-rpg.onrender.com/api/v1/ficha/usuario?id-usuario=${userId}`
  if (userType == "MESTRE") apiURL += `&nome-campanha=harmonia`;  

  try {
    const res = await fetch(apiURL,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        next: { revalidate: 1 } // Sem cache
      }
    );

    if (!res.ok) return [];
    
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar agentes:", error);
    return [];
  }
}