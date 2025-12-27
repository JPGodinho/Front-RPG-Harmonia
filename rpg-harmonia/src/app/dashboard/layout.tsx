import { cookies } from "next/headers";
import { DashboardHeader } from "./components/DashboardHeader"; // Verifique se o caminho está certo

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Pega o nome do usuário salvo no cookie durante o login
  const cookieStore = await cookies();
  const nomeUsuario = cookieStore.get("user_name")?.value || "Agente";

  return (
    <div className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
      {/* Passamos o nome para o Header resolver o erro */}
      <DashboardHeader nomeUsuario={nomeUsuario} />
      <main>{children}</main>
    </div>
  );
}