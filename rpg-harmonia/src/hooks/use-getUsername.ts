import { cookies } from "next/headers";

export async function getUsernameFromCookies(){
    const cookieStore = await cookies();
    const nomeUsuario = cookieStore.get("user_name")?.value || "Agente";

    return nomeUsuario;
}