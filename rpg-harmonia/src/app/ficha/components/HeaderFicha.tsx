"use client";
import { HeaderRoot } from "@/components/header/HeaderRoot";
import { HeaderBackButton, HeaderLogoutButton } from "@/components/header/HeaderButtons";

export function HeaderFicha() {
  return (
    <div className="flex flex-col mb-5">
      <HeaderRoot 
        left={<HeaderBackButton />} 
        right={<HeaderLogoutButton />}
      >
        <span className="text-xl font-normal text-white">Ficha do Agente</span>
      </HeaderRoot>

      <div className="h-px w-full bg-harmonia-purple shadow-[0_0_8px_#E300FF] mt-2" />
    </div>
  );
}