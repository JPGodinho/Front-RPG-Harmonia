"use client";
import { User } from "lucide-react";

interface InfoPersonagemProps {
  nome: string;
  idade: string;
  nex: string;
  peRodada: number;
  origem: string;
  classe: string;
  trilha: string;
  elemento: string;
}

export function InfoPersonagem({
  nome,
  idade,
  nex,
  peRodada,
  origem,
  classe,
  trilha,
  elemento,
}: InfoPersonagemProps) {
  
  let corElemento = "text-harmonia-purple";
  if (elemento === "Sangue") corElemento = "text-red-600";
  if (elemento === "Morte") corElemento = "text-gray-400";
  if (elemento === "Conhecimento") corElemento = "text-yellow-500";
  if (elemento === "Energia") corElemento = "text-purple-500";

  return (
    <section className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 mb-3 shadow-lg relative overflow-hidden">
      
      <div className="flex items-center gap-4 mb-1">
        
        <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-harmonia-purple flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(227,0,255,0.3)]">
          <User className="text-white w-8 h-8" />
        </div>

        <div className="flex flex-col flex-1 text-center">
           <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Personagem</span>
              <h1 className="text-base md:text-lg font-bold text-white leading-tight wrap-break-word text-center">
                {nome}
              </h1>
           </div>
        </div>

        <div className="flex flex-col items-center border-l border-gray-700 pl-6 shrink-0">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Idade</span>
            <span className="text-xl font-bold text-white text-center">{idade}</span>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 pb-4 grid grid-cols-3 gap-2 text-center relative">
        
        <div className="flex flex-col">
           <span className="text-[10px] text-gray-500 uppercase tracking-wider">NEX</span>
           <span className="text-lg font-bold text-white text-center">{nex}</span>
        </div>

        <div className="flex flex-col border-x border-gray-800">
           <span className="text-[10px] text-gray-500 uppercase tracking-wider">PE/Rodada</span>
           <span className="text-lg font-bold text-yellow-400">{peRodada}</span>
        </div>

        <div className="flex flex-col">
           <span className="text-[10px] text-gray-500 uppercase tracking-wider">Origem</span>
           <span className="text-sm md:text-lg font-bold text-white truncate px-1" title={origem}>
             {origem}
           </span>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-2 text-center mt-1 border border-gray-800/50">
        <span className="text-gray-300 text-xs md:text-sm font-medium">
          {classe} de {trilha} <span className="text-gray-600 mx-1">•</span> <span className={`${corElemento} font-bold uppercase`}>{elemento}</span>
        </span>
      </div>

    </section>
  );
}