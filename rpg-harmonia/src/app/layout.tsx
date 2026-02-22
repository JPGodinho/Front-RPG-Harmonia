import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG Harmonia",
  description: "Gerenciador de Fichas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SidebarProvider className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
          <AppSidebar />
          <SidebarInset >
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}