import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getUsernameFromCookies } from "@/hooks/use-getUsername";
import { getUserProperties } from "./perfil/actions";
import { UserType } from "@/lib/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG Harmonia",
  description: "Gerenciador de Fichas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  async function obterUsuario(): Promise<UserType> {
    const response = await getUserProperties()
    if (response == null) {
      return { uid: "", username: "", email: "", telefone: "", photoUrl: "", userRole: "USER"}
    }
    return response;
  }

  const user = await obterUsuario()

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SidebarProvider className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
          <AppSidebar userProps={user}/>
          <SidebarInset >
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}