import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;
  const idUsuario = cookieStore.get("user_id")?.value;  

  return {
    token,
    idUsuario,
  };
}