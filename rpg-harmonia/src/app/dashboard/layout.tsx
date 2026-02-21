import { cookies } from "next/headers";
import { DashboardHeader } from "./components/DashboardHeader"; // Verifique se o caminho está certo
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Pega o nome do usuário salvo no cookie durante o login
  const cookieStore = await cookies();
  const nomeUsuario = cookieStore.get("user_name")?.value || "Agente";

  return (
    <SidebarProvider className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
      <AppSidebar />
      <SidebarInset >
        <DashboardHeader nomeUsuario={nomeUsuario} />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}