import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getUsernameFromCookies } from "@/hooks/use-getUsername";

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

  const username = await getUsernameFromCookies()

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SidebarProvider className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
          <AppSidebar username={username}/>
          <SidebarInset >
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}