"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";
import { CharacterCard } from "./components/CharacterCard";
import { formatarDataFirestore } from "@/lib/utils"; 
import { buscarMeusAgentes } from "./actions"; 
import { FichaUsuario } from "@/lib/types";

export default function DashboardPage() {
  
  const [meusPersonagens, setMeusPersonagens] = useState<FichaUsuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await buscarMeusAgentes();
      setMeusPersonagens(dados);
      setCarregando(false);
    };

    carregarDados();
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold">Seus Agentes</h2>
          <p className="text-sm text-gray-400">Gerencie suas fichas e evolua seus agentes.</p>
        </div>

        <CustomButton variant="secondary" onClick={() => alert("Em breve...")}>
          <Plus size={20} />
          Criar Novo Agente
        </CustomButton>
      </section>

      {!carregando && meusPersonagens.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {meusPersonagens.map((char) => (
            <CharacterCard 
              key={char.id}
              id={char.id}
              nome={char.personagem} 
              campanha={char.nomeCampanha}
              imgPersonagem={char.imgPersonagem} 
              criadoEm={formatarDataFirestore(char.criadoEm)} 
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