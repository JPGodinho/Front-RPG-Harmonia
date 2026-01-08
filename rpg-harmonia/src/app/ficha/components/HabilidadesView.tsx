"use client";
import { useState, useEffect } from "react";
import { HabilidadeData } from "@/lib/types";
import { buscarHabilidades } from "../[id]/actions"; 

interface HabilidadesViewProps {
  idFicha: string;
}

export function HabilidadesView({ idFicha }: HabilidadesViewProps) {
  const [habilidades, setHabilidades] = useState<HabilidadeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarHabilidades(idFicha);
      if (dados) setHabilidades(dados);
      setLoading(false);
    }
    carregar();
  }, [idFicha]);

  if (loading) return <div className="text-center py-10 text-gray-500 animate-pulse">Lendo memórias...</div>;
  
  if (habilidades.length === 0) {
    return (
        <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl bg-[#1a1a1a]/50">
            <p className="text-gray-500">Nenhuma habilidade registrada.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pb-20 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {habilidades.map((hab, idx) => (
        <HabilidadeCard key={idx} habilidade={hab} />
      ))}
    </div>
  );
}

// --- SUB-COMPONENTE: CARD DA HABILIDADE (EXPANSÍVEL) ---
function HabilidadeCard({ habilidade }: { habilidade: HabilidadeData }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div 
      className={`
        bg-[#1a1a1a] rounded-xl border transition-all duration-300 overflow-hidden
        ${expandido ? "border-gray-500 shadow-lg" : "border-gray-800 hover:border-gray-700"}
      `}
    >
      {/* CABEÇALHO CLICÁVEL */}
      <div 
        onClick={() => setExpandido(!expandido)}
        className="p-4 flex items-center gap-4 cursor-pointer select-none"
      >
        {/* Ícone +/- */}
        <span className="text-xl font-light text-gray-500 w-4 flex justify-center shrink-0">
          {expandido ? "×" : "+"}
        </span>

        {/* Nome da Habilidade */}
        <span className="text-base md:text-lg font-bold text-white leading-tight">
          {habilidade.nome}
        </span>
      </div>

      {/* CONTEÚDO EXPANDIDO */}
      {expandido && (
        <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
          {/* Linha divisória */}
          <div className="h-px w-full bg-gray-800 mb-4" />
          
          {/* Descrição */}
          <div className="text-sm md:text-base text-gray-300 leading-relaxed text-justify whitespace-pre-line">
            {habilidade.descricao}
          </div>
        </div>
      )}
    </div>
  );
}