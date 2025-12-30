"use client";
import { DescricaoData } from "@/lib/types";

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

  const SecaoTexto = ({ titulo, texto }: { titulo: string, texto: string }) => (
    <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-white font-bold text-base mb-1">{titulo}</h3>
      <div className="h-px w-full bg-harmonia-purple/50 mb-3 shadow-[0_0_5px_rgba(227,0,255,0.3)]" />
      <p className="text-gray-300 text-sm leading-relaxed text-justify whitespace-pre-line">
        {texto || "Não informado."}
      </p>
    </div>
  );

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 md:p-8 shadow-lg max-w-3xl mx-auto">
      <SecaoTexto titulo="Aparência" texto={dados.aparencia} />
      <SecaoTexto titulo="Personalidade" texto={dados.personalidade} />
      <SecaoTexto titulo="Histórico" texto={dados.historico} />
      <SecaoTexto titulo="Objetivo" texto={dados.objetivo} />
    </div>
  );
}