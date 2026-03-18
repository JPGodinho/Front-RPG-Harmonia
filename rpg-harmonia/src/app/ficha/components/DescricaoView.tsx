"use client";
import { DescricaoData } from "@/lib/types";
import { SeccaoTexto } from "./ui/SeccaoTexto";

interface DescricaoViewProps {
  dados: DescricaoData | null;
  carregando: boolean;
}

export function DescricaoView({ dados, carregando }: DescricaoViewProps) {
  
  if (carregando) {
    return <div className="text-center py-10 text-gray-500 animate-pulse">Decifrando arquivos da Ordem...</div>;
  }

  if (!dados) {
    return <div className="text-center py-10 text-gray-500">Nenhuma descrição encontrada nos arquivos.</div>;
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 md:p-8 shadow-lg max-w-3xl mx-auto">
      <SeccaoTexto titulo="Aparência" texto={dados.aparencia} />
      <SeccaoTexto titulo="Personalidade" texto={dados.personalidade} />
      <SeccaoTexto titulo="Histórico" texto={dados.historico} />
      <SeccaoTexto titulo="Objetivo" texto={dados.objetivo} />
    </div>
  );
}