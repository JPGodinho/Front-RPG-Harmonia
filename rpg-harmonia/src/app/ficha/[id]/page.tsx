"use client";
import { useEffect, useState } from "react";
import { InfoPersonagem } from "../components/InfoPersonagem";
import { StatusBars } from "../components/StatusBars";
import { AtributosGrid } from "../components/AtributosGrid";
import { StatusSecundarios } from "../components/StatusSecundarios";
import { bancoDePersonagens } from "@/lib/personagens";
import { bancoDePericias } from "@/lib/pericias";
import { useParams } from "next/navigation";

export default function FichaPage() {
  const params = useParams();
  const [personagem, setPersonagem] = useState<any>(null);
  const [periciasDoPersonagem, setPericiasDoPersonagem] = useState<any>({});
  const [pv, setPv] = useState({ atual: 0, max: 0 });
  const [pe, setPe] = useState({ atual: 0, max: 0 });
  const [san, setSan] = useState({ atual: 0, max: 0 });
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const charEncontrado = bancoDePersonagens.find(p => p.id === params.id);
      
      if (charEncontrado) {
        setPersonagem(charEncontrado);
        setPv({ atual: charEncontrado.pontosDeVida.atual, max: charEncontrado.pontosDeVida.total });
        setPe({ atual: charEncontrado.pontosDeEsforco.atual, max: charEncontrado.pontosDeEsforco.total });
        setSan({ atual: charEncontrado.pontosDeSanidade.atual, max: charEncontrado.pontosDeSanidade.total });

        const periciasEncontradas = bancoDePericias.find(p => p.characterId === charEncontrado.id);
        
        if (periciasEncontradas) {
          setPericiasDoPersonagem(periciasEncontradas.porAtributo);
        } else {
          setPericiasDoPersonagem({});
        }
      }
    }
  }, [params.id]);

  if (!personagem) {
    return <div className="text-gray-400 text-center py-20">Carregando dados...</div>;
  }

  return (
    <>
      <InfoPersonagem 
        nome={personagem.personagem}
        idade={`${personagem.idade} anos`}
        nex={`${personagem.nivelExposicao}%`}
        peRodada={personagem.esforcoPorRodada}
        origem={personagem.origem}
        classe={personagem.classe}
        trilha={personagem.trilha}
        elemento={personagem.afinidade}
      />

      <StatusBars 
        pv={pv} pe={pe} san={san}
        setPv={setPv} setPe={setPe} setSan={setSan}
      />

      <StatusSecundarios 
        defesa={personagem.defesa}
        deslocamento={personagem.deslocamento}
        esquiva={personagem.defesaEsquiva}
        resistencias={personagem.resistencia}
        rdBloqueio={personagem.redDanoBloqueando}
        protecoes={personagem.protecao}
      />
      
      <AtributosGrid 
        atributos={{
          agi: personagem.agilidade,
          for: personagem.forca,
          int: personagem.intelecto,
          pre: personagem.presenca,
          vig: personagem.vigor
        }}
        pericias={periciasDoPersonagem}
        selecionado={atributoSelecionado} 
        onToggle={(nome) => setAtributoSelecionado(prev => prev === nome ? null : nome)} 
      />
    </>
  );
}