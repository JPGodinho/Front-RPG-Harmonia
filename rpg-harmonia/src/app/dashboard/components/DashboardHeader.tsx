// src/app/dashboard/components/DashboardHeader.tsx
import { HeaderRoot } from "@/components/header/HeaderRoot";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  nomeUsuario: string;
}

export function DashboardHeader({ nomeUsuario }: DashboardHeaderProps) {
  return (
    <HeaderRoot left={<SidebarTrigger className="-ml-1" />}>
      <span>Olá, <span className="text-harmonia-purple capitalize">{nomeUsuario}</span>!</span>
    </HeaderRoot>
  );
}