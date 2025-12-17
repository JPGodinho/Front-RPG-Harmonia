"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CharacterCard } from "./components/CharacterCard";
import { bancoDePersonagens } from "@/lib/personagens";
import { formatarDataFirebase } from "@/lib/utils";

export default function DashboardPage() {
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

      {bancoDePersonagens.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bancoDePersonagens.map((char) => (
            <CharacterCard 
              key={char.id}
              id={char.id}
              nome={char.nome}
              campanha={char.campanha}
              criadoEm={formatarDataFirebase(char.criadoEm)}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500">Você ainda não tem nenhum agente cadastrado.</p>
        </div>
      )}

    </>
  );
}