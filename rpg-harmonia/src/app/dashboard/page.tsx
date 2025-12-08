"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { HeaderRoot } from "@/components/header/HeaderRoot";
import { HeaderMenuButton, HeaderLogoutButton } from "@/components/header/HeaderButtons";
import { Button } from "@/components/ui/Button";
import { CharacterCard } from "./components/CharacterCard";

export default function DashboardPage() {
  
  const [nomeUsuario, setNomeUsuario] = useState("Agente"); 

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    if (nomeSalvo) {
      setNomeUsuario(nomeSalvo);
    }
  }, []);

  const meusPersonagens = [
    { 
      id: "1", 
      nome: "Bernardo Petre Melo", 
      campanha: "HARMONIA", 
      criadoEm: "12/03/2025" 
    },
    { 
      id: "2", 
      nome: "Arthur Cervero", 
      campanha: "CALAMIDADE", 
      criadoEm: "10/03/2025" 
    },
  ];

  return (
    <main className="min-h-screen bg-harmonia-bg text-white p-4 md:p-8">
      
      <HeaderRoot 
        left={<HeaderMenuButton onClick={() => alert("Menu Lateral")} />} 
        right={<HeaderLogoutButton />}
      >

        <span>Olá, <span className="text-harmonia-purple capitalize">{nomeUsuario}</span></span>
      </HeaderRoot>

      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold">Seus Agentes</h2>
          <p className="text-sm text-gray-400">Gerencie suas fichas e evolua seus agentes.</p>
        </div>

        <Button variant="secondary" onClick={() => alert("Em breve...")}>
          <Plus size={20} />
          Criar Novo Agente
        </Button>
      </section>

      {meusPersonagens.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meusPersonagens.map((char) => (
            <CharacterCard 
              key={char.id}
              id={char.id}
              nome={char.nome}
              campanha={char.campanha}
              criadoEm={char.criadoEm}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500">Você ainda não tem nenhum agente cadastrado.</p>
        </div>
      )}

    </main>
  );
}