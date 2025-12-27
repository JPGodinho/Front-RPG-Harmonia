"use client";
import { useEffect, useState } from "react";
import { InfoPersonagem } from "../components/InfoPersonagem";
import { StatusBars } from "../components/StatusBars";
import { AtributosGrid } from "../components/AtributosGrid";
import { StatusSecundarios } from "../components/StatusSecundarios";
import { bancoDePersonagens } from "@/lib/personagens";
import { buscarPericiasPorAtributo, Pericia } from "@/lib/pericias";
import { useParams } from "next/navigation";

export default function FichaPage() {
  const params = useParams();
  const [personagem, setPersonagem] = useState<any>(null);
  const [pv, setPv] = useState({ atual: 0, max: 0 });
  const [pe, setPe] = useState({ atual: 0, max: 0 });
  const [san, setSan] = useState({ atual: 0, max: 0 });
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null);
  const [periciasAtuais, setPericiasAtuais] = useState<Pericia[]>([]);

  useEffect(() => {
    if (params.id) {
      const charEncontrado = bancoDePersonagens.find(p => p.id === params.id);
      if (charEncontrado) {
        setPersonagem(charEncontrado);
        setPv({ atual: charEncontrado.pontosDeVida.atual, max: charEncontrado.pontosDeVida.total });
        setPe({ atual: charEncontrado.pontosDeEsforco.atual, max: charEncontrado.pontosDeEsforco.total });
        setSan({ atual: charEncontrado.pontosDeSanidade.atual, max: charEncontrado.pontosDeSanidade.total });
      }
    }
  }, [params.id]);

  const handleAtributoClick = async (nomeAtributo: string) => {
    if (atributoSelecionado === nomeAtributo) {
      setAtributoSelecionado(null);
      setPericiasAtuais([]);
      return;
    }

    setAtributoSelecionado(nomeAtributo);
    setPericiasAtuais([]); 

    const atributoChave = nomeAtributo
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    
    if (personagem?.id) {
      const dados = await buscarPericiasPorAtributo(personagem.id, atributoChave);
      setPericiasAtuais(dados);
    }
  };

  if (!personagem) {
    return <div className="text-gray-400 text-center py-20">Carregando dados da Ordem...</div>;
  }

  return (
    <>
      <InfoPersonagem 
        urlPersonagem={personagem.urlPersonagem}
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
        listaPericiasAtual={periciasAtuais}
        selecionado={atributoSelecionado} 
        onToggle={handleAtributoClick} 
      />
    </>
  );
}