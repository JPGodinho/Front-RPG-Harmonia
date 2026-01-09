"use client";
import { useState, useRef, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from "@/lib/firebase"; 

// Componentes Visuais
import { InfoPersonagem } from "../components/InfoPersonagem";
import { StatusBars } from "../components/StatusBars";
import { AtributosGrid } from "../components/AtributosGrid";
import { StatusSecundarios } from "../components/StatusSecundarios";
import { DescricaoView } from "../components/DescricaoView";
import { RituaisView } from "../components/RituaisView"; 
import { HabilidadesView } from "../components/HabilidadesView"; 
import { InventarioView } from "../components/InventarioView";

// Actions e Tipos
import { buscarPericiasDaFicha, buscarDescricao, atualizarFicha } from "./actions"; 
import { FichaData, ListaDePericias, Pericia, DescricaoData } from "@/lib/types";

interface FichaClientProps {
  dadosIniciais: FichaData;
}

interface StatusValue {
  atual: number;
  total: number;
}

type TabTipo = "INVENTARIO" | "DESCRICAO" | "ATRIBUTOS" | "RITUAIS" | "HABILIDADES";

export default function FichaClient({ dadosIniciais }: FichaClientProps) {
  // --- STATES ---
  const [pv, setPv] = useState<StatusValue>(dadosIniciais.pontosDeVida);
  const [pe, setPe] = useState<StatusValue>(dadosIniciais.pontosDeEsforco);
  const [san, setSan] = useState<StatusValue>(dadosIniciais.pontosDeSanidade);
  
  // --- OUTROS STATES ---
  const [atributoSelecionado, setAtributoSelecionado] = useState<string | null>(null);
  const [todasAsPericias, setTodasAsPericias] = useState<ListaDePericias | null>(null);
  const [periciasAtuais, setPericiasAtuais] = useState<Pericia[]>([]);
  const [carregandoPericias, setCarregandoPericias] = useState(false);
  const [abaAtual, setAbaAtual] = useState<TabTipo>("ATRIBUTOS"); 
  const [dadosDescricao, setDadosDescricao] = useState<DescricaoData | null>(null);
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // --- 1. LEITURA (REALTIME) ---
  useEffect(() => {
    if (!dadosIniciais.id) return;
    const fichaRef = doc(db, "fichas", dadosIniciais.id);

    const unsubscribe = onSnapshot(fichaRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.pontosDeVida) setPv(data.pontosDeVida);
        if (data.pontosDeEsforco) setPe(data.pontosDeEsforco);
        if (data.pontosDeSanidade) setSan(data.pontosDeSanidade);
      }
    });

    return () => unsubscribe();
  }, [dadosIniciais.id]);


  // --- 2. ESCRITA (API + COOKIES) ---
  
  const handleUpdatePv = async (novoValor: StatusValue) => {
    // Apenas passamos o ID da ficha e o payload. O idUsuario agora é pego no server.
    await atualizarFicha(dadosIniciais.id, {
      pontosDeVida: novoValor 
    });
  };

  const handleUpdatePe = async (novoValor: StatusValue) => {
    await atualizarFicha(dadosIniciais.id, {
      pontosDeEsforco: novoValor
    });
  };

  const handleUpdateSan = async (novoValor: StatusValue) => {
    await atualizarFicha(dadosIniciais.id, {
      pontosDeSanidade: novoValor
    });
  };

  const handleGastarPE = (custo: number) => {
    const novoAtual = pe.atual - custo;
    if (novoAtual < 0) return; 
    handleUpdatePe({ ...pe, atual: novoAtual });
  };


  // --- RESTO DO CÓDIGO (HANDLERS E RENDERIZAÇÃO) ---
  // (Mantém exatamente igual, sem alterações)

  useEffect(() => {
    if (abaAtual === "DESCRICAO" || abaAtual === "RITUAIS") {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (dadosGerais && dadosGerais[atributoChave]) setPericiasAtuais(dadosGerais[atributoChave]);
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
    <div className="p-4 md:p-8 pb-20">
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
          setPv={handleUpdatePv} 
          setPe={handleUpdatePe} 
          setSan={handleUpdateSan}
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
            <DescricaoView dados={dadosDescricao} carregando={carregandoDescricao} />
          )}

          {abaAtual === "RITUAIS" && (
             <RituaisView idFicha={dadosIniciais.id} peAtual={pe.atual} onGastarPE={handleGastarPE} />
          )}
          
          {abaAtual === "HABILIDADES" && (
             <HabilidadesView idFicha={dadosIniciais.id} />
          )}

          {abaAtual === "INVENTARIO" && (
             <InventarioView idFicha={dadosIniciais.id} />
          )}

        </div>
      </div>
    </div>
  );
}