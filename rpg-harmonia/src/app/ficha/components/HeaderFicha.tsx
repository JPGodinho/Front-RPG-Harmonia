"use client";
import { HeaderRoot } from "@/components/header/HeaderRoot";
import { HeaderBackButton } from "@/components/header/HeaderButtons";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function HeaderFicha() {
  return (
    
    <div className="flex flex-col mb-3">
      <HeaderRoot 
        left={<SidebarTrigger className="-ml-1" />}
        right={<HeaderBackButton />}
      >
        <span className="text-xl font-normal text-white">Ficha do Agente</span>
      </HeaderRoot>

      <div className="h-px w-full bg-harmonia-purple shadow-[0_0_8px_#E300FF]" />
    </div>
  );
}