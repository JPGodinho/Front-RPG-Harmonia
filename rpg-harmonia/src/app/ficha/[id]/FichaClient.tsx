"use client";
import { useState } from "react";
import { HeaderFicha } from "../components/HeaderFicha";
import { InfoPersonagem } from "../components/InfoPersonagem";
import { StatusBars } from "../components/StatusBars";
import { AtributosGrid } from "../components/AtributosGrid";
import { StatusSecundarios } from "../components/StatusSecundarios";
import { buscarPericiasDaFicha } from "./actions";
import { FichaData, ListaDePericias, Pericia } from "@/lib/types";

interface FichaClientProps {
  dadosIniciais: FichaData;
}

export default function FichaClient({ dadosIniciais }: FichaClientProps) {
  const [pv, setPv] = useState({ atual: dadosIniciais.pontosDeVida.atual, max: dadosIniciais.pontosDeVida.total });
  const [pe, setPe] = useState({ atual: dadosIniciais.pontosDeEsforco.atual, max: dadosIniciais.pontosDeEsforco.total });
  const [san, setSan] = useState({ atual: dadosIniciais.pontosDeSanidade.atual, max: dadosIniciais.pontosDeSanidade.total });
  
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null);
  
  const [todasAsPericias, setTodasAsPericias] = useState<ListaDePericias | null>(null);
  const [periciasAtuais, setPericiasAtuais] = useState<Pericia[]>([]);
  const [carregandoPericias, setCarregandoPericias] = useState(false);

  const handleAtributoClick = async (nomeAtributo: string) => {
    if (atributoSelecionado === nomeAtributo) {
      setAtributoSelecionado(null);
      setPericiasAtuais([]);
      return;
    }

    setAtributoSelecionado(nomeAtributo);
    setCarregandoPericias(true);
    setPericiasAtuais([]);

    const atributoChave = nomeAtributo
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

    try {
      let dadosGerais = todasAsPericias;

      if (!dadosGerais) {
        dadosGerais = await buscarPericiasDaFicha(dadosIniciais.id);
        setTodasAsPericias(dadosGerais);
      }

      if (dadosGerais && dadosGerais[atributoChave]) {
        setPericiasAtuais(dadosGerais[atributoChave]);
      }

    } catch (error) {
      console.error("Erro ao carregar perícias");
    } finally {
      setCarregandoPericias(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <div className="max-w-4xl mx-auto">

        <InfoPersonagem 
          imgPersonagem={dadosIniciais.imgPersonagem || undefined}
          nome={dadosIniciais.personagem}
          idade={`${dadosIniciais.idade} anos`}
          nex={`${dadosIniciais.nivelExposicao}%`}
          peRodada={dadosIniciais.esforcoPorRodada}
          origem={dadosIniciais.origem}
          classe={dadosIniciais.classe}
          trilha={dadosIniciais.trilha}
          elemento={dadosIniciais.afinidade}
        />

        <StatusBars 
          pv={pv} pe={pe} san={san}
          setPv={setPv} setPe={setPe} setSan={setSan}
        />

        <StatusSecundarios 
          defesa={dadosIniciais.defesa}
          esquiva={dadosIniciais.defesaEsquiva}
          deslocamento={dadosIniciais.deslocamento}
          rdBloqueio={dadosIniciais.redDanoBloqueando}
          protecoes={dadosIniciais.protecoes || "Nenhuma"}
          resistencias={dadosIniciais.resistencia || "Nenhuma"}
        />

        <AtributosGrid 
          atributos={{
            agi: dadosIniciais.agilidade,
            for: dadosIniciais.forca,
            int: dadosIniciais.intelecto,
            pre: dadosIniciais.presenca,
            vig: dadosIniciais.vigor
          }}
          listaPericiasAtual={periciasAtuais}
          selecionado={atributoSelecionado} 
          onToggle={handleAtributoClick}
        />
      </div>
    </div>
  );
}