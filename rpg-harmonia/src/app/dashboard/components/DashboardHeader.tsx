"use client";
import { useState, useEffect } from "react";
import { HeaderRoot } from "@/components/header/HeaderRoot";
import { HeaderMenuButton, HeaderLogoutButton } from "@/components/header/HeaderButtons";

export function DashboardHeader() {
  const [nomeUsuario, setNomeUsuario] = useState("Agente");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  return (
    <HeaderRoot 
      left={<HeaderMenuButton />} 
      right={<HeaderLogoutButton />}
    >
      <span>Olá, <span className="text-harmonia-purple capitalize">{nomeUsuario}</span></span>
    </HeaderRoot>
  );
}