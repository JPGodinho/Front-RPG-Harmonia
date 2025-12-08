"use client";
import { useEffect, useState } from "react";
import { InfoPersonagem } from "../components/InfoPersonagem";
import { StatusBars } from "../components/StatusBars";
import { AtributosGrid } from "../components/AtributosGrid";
import { StatusSecundarios } from "../components/StatusSecundarios";
import { HeaderRoot } from "@/components/header/HeaderRoot";
import { HeaderBackButton, HeaderLogoutButton } from "@/components/header/HeaderButtons";
import { bancoDePersonagens } from "@/lib/personagens";
import { useParams } from "next/navigation";

export default function FichaPage() {
  const params = useParams();
  const [personagem, setPersonagem] = useState<any>(null);
  const [pv, setPv] = useState({ atual: 0, max: 0 });
  const [pe, setPe] = useState({ atual: 0, max: 0 });
  const [san, setSan] = useState({ atual: 0, max: 0 });
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const encontrado = bancoDePersonagens.find(p => p.id === params.id);
      if (encontrado) {
        setPersonagem(encontrado);
        setPv({ atual: encontrado.status.pv.atual, max: encontrado.status.pv.max });
        setPe({ atual: encontrado.status.pe.atual, max: encontrado.status.pe.max });
        setSan({ atual: encontrado.status.san.atual, max: encontrado.status.san.max });
      }
    }
    }, [params.id]);
    if (!personagem) {
      return <div className="text-white p-10">Carregando agente...</div>;
    }

  return (
    <main className="min-h-screen bg-harmonia-bg text-white p-4 pb-20">
      
      <HeaderRoot 
        left={<HeaderBackButton />} 
        right={<HeaderLogoutButton />}
      >
        <h1>Ficha do Agente</h1>
      </HeaderRoot>
      <div className="h-px w-full mb-5 bg-harmonia-purple shadow-[0_0_8px_#E300FF]" />
      <InfoPersonagem 
        nome={personagem.nome}
        idade={personagem.idade}
        nex={personagem.nex}
        peRodada={personagem.peRodada}
        origem={personagem.origem}
        classe={personagem.classe}
        trilha={personagem.trilha}
        elemento={personagem.elemento}
      />

      <div className="h-px w-full bg-harmonia-purple shadow-[0_0_10px_#E300FF] mb-8" />

      <StatusBars 
        pv={pv} pe={pe} san={san}
        setPv={setPv} setPe={setPe} setSan={setSan}
      />

      <StatusSecundarios 
        defesa={personagem.secundarios.defesa}
        deslocamento={personagem.secundarios.deslocamento}
        esquiva={personagem.secundarios.esquiva}
        resistencias={personagem.secundarios.resistencias}
        rdBloqueio={personagem.secundarios.rdBloqueio}
        protecoes={personagem.secundarios.protecoes}
      />

      <AtributosGrid 
        atributos={personagem.atributos}
        selecionado={atributoSelecionado} 
        onToggle={(nome) => setAtributoSelecionado(prev => prev === nome ? null : nome)} 
      />

    </main>
  );
}