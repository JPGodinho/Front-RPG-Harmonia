"use client";
import { useState, useRef, useEffect } from "react"; // 1. Adicione useRef e useEffect
import { HeaderFicha } from "../components/HeaderFicha";
import { InfoPersonagem } from "../components/InfoPersonagem";
import { StatusBars } from "../components/StatusBars";
import { AtributosGrid } from "../components/AtributosGrid";
import { StatusSecundarios } from "../components/StatusSecundarios";
import { DescricaoView } from "../components/DescricaoView"; 

import { buscarPericiasDaFicha, buscarDescricao } from "./actions"; 
import { FichaData, ListaDePericias, Pericia, DescricaoData } from "@/lib/types";

interface FichaClientProps {
  dadosIniciais: FichaData;
}

type TabTipo = "INVENTARIO" | "DESCRICAO" | "ATRIBUTOS" | "RITUAIS" | "HABILIDADES";

export default function FichaClient({ dadosIniciais }: FichaClientProps) {
  const [pv, setPv] = useState({ atual: dadosIniciais.pontosDeVida.atual, max: dadosIniciais.pontosDeVida.total });
  const [pe, setPe] = useState({ atual: dadosIniciais.pontosDeEsforco.atual, max: dadosIniciais.pontosDeEsforco.total });
  const [san, setSan] = useState({ atual: dadosIniciais.pontosDeSanidade.atual, max: dadosIniciais.pontosDeSanidade.total });
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null);
  const [todasAsPericias, setTodasAsPericias] = useState<ListaDePericias | null>(null);
  const [periciasAtuais, setPericiasAtuais] = useState<Pericia[]>([]);
  const [carregandoPericias, setCarregandoPericias] = useState(false);
  const [abaAtual, setAbaAtual] = useState<TabTipo>("ATRIBUTOS"); 
  const [dadosDescricao, setDadosDescricao] = useState<DescricaoData | null>(null);
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (abaAtual === "DESCRICAO") {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
  }, [abaAtual]);

  const handleTrocaAba = async (novaAba: TabTipo) => {
    setAbaAtual(novaAba);

    if (novaAba === "DESCRICAO" && !dadosDescricao) {
      setCarregandoDescricao(true);
      const desc = await buscarDescricao(dadosIniciais.id);
      setDadosDescricao(desc);
      setCarregandoDescricao(false);
    }
  };

  const handleAtributoClick = async (nomeAtributo: string) => {
    if (atributoSelecionado === nomeAtributo) {
      setAtributoSelecionado(null);
      setPericiasAtuais([]);
      return;
    }
    setAtributoSelecionado(nomeAtributo);
    setCarregandoPericias(true);
    setPericiasAtuais([]);

    const atributoChave = nomeAtributo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

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

  const TabButton = ({ label, tipo }: { label: string, tipo: TabTipo }) => (
    <button
      onClick={() => handleTrocaAba(tipo)}
      className={`
        uppercase text-xs md:text-sm font-bold tracking-widest pb-2 px-2 transition-all
        ${abaAtual === tipo 
          ? "text-white border-b-2 border-harmonia-purple shadow-[0_4px_10px_-4px_#E300FF]" 
          : "text-gray-500 hover:text-gray-300 hover:border-b-2 hover:border-gray-700"}
      `}
    >
      {label}
    </button>
  );

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

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 border-b border-gray-800 mb-8 mt-6">
           <TabButton label="Inventário" tipo="INVENTARIO" />
           <TabButton label="Descrição" tipo="DESCRICAO" />
           <TabButton label="Atributos" tipo="ATRIBUTOS" />
           <TabButton label="Rituais" tipo="RITUAIS" />
           <TabButton label="Habilidades" tipo="HABILIDADES" />
        </div>

        <div ref={contentRef} className="min-h-[300px] scroll-mt-24 transition-all duration-500">
          
          {abaAtual === "ATRIBUTOS" && (
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
          )}

          {abaAtual === "DESCRICAO" && (
            <DescricaoView 
              dados={dadosDescricao} 
              carregando={carregandoDescricao} 
            />
          )}

          {(abaAtual === "INVENTARIO" || abaAtual === "RITUAIS" || abaAtual === "HABILIDADES") && (
             <div className="text-center py-20 text-gray-600 italic border border-dashed border-gray-800 rounded-xl">
               Funcionalidade em desenvolvimento...
             </div>
          )}

        </div>

      </div>
    </div>
  );
}