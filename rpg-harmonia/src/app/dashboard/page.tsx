"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CharacterCard } from "./components/CharacterCard";
import { bancoDePersonagens } from "@/lib/personagens";
import { formatarDataFirebase } from "@/lib/utils";

export default function DashboardPage() {
  
  const [meusPersonagens, setMeusPersonagens] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const idUsuarioLogado = localStorage.getItem("idUsuario");

    if (idUsuarioLogado) {
      const fichasFiltradas = bancoDePersonagens.filter(
        (ficha) => ficha.idUsuario === idUsuarioLogado
      );
      setMeusPersonagens(fichasFiltradas);
    }
    setCarregando(false);
  }, []);

  return (
    <>
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

      {!carregando && meusPersonagens.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {meusPersonagens.map((char) => (
            <CharacterCard 
              key={char.id}
              id={char.id}
              nome={char.personagem} 
              campanha={char.nomeCampanha}
              criadoEm={formatarDataFirebase(char.criadoEm)} 
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500">
            {carregando ? "Carregando..." : "Você ainda não tem nenhum agente cadastrado."}
          </p>
        </div>
      )}
    </>
  );
}