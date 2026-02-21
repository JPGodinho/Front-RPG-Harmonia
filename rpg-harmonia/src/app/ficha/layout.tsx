import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HeaderFicha } from "./components/HeaderFicha";
import { AppSidebar } from "@/components/app-sidebar";

export default function FichaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
      <AppSidebar />
      <SidebarInset >
        <HeaderFicha />
        <main className="mt-4">
          {children}
          </main>
      </SidebarInset>
    </SidebarProvider>
  );
}