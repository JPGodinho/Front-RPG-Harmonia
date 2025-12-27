// src/app/dashboard/components/DashboardHeader.tsx
import { HeaderRoot } from "@/components/header/HeaderRoot";
import { HeaderMenuButton, HeaderLogoutButton } from "@/components/header/HeaderButtons";

interface DashboardHeaderProps {
  nomeUsuario: string;
}

export function DashboardHeader({ nomeUsuario }: DashboardHeaderProps) {
  return (
    <HeaderRoot 
      left={<HeaderMenuButton />} 
      right={<HeaderLogoutButton />}
    >
      <span>Olá, <span className="text-harmonia-purple capitalize">{nomeUsuario}</span></span>
    </HeaderRoot>
  );
}