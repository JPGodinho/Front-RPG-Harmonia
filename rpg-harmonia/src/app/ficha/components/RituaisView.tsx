"use client";
import { useState, useEffect } from "react";
import { RitualData } from "@/lib/types";
import { buscarRituais } from "../[id]/actions"; 
import { X } from "lucide-react";

interface RituaisViewProps {
  idFicha: string;
  peAtual: number;
  onGastarPE: (qtd: number) => void;
}

export function RituaisView({ idFicha, peAtual, onGastarPE }: RituaisViewProps) {
  const [rituais, setRituais] = useState<RitualData[]>([]);
  const [loading, setLoading] = useState(true);
  const [ritualParaConjurar, setRitualParaConjurar] = useState<RitualData | null>(null);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarRituais(idFicha);
      if (dados) setRituais(dados);
      setLoading(false);
    }
    carregar();
  }, [idFicha]);

  if (loading) return <div className="text-center py-10 text-gray-500 animate-pulse">Consultando o Grimório...</div>;
  if (rituais.length === 0) return <div className="text-center py-10 text-gray-500">Nenhum ritual aprendido.</div>;

  return (
    <div className="flex flex-col gap-3 pb-20 max-w-3xl mx-auto">
      {rituais.map((ritual, idx) => (
        <RitualCard 
          key={idx} 
          ritual={ritual} 
          onUsar={() => setRitualParaConjurar(ritual)} 
        />
      ))}

      {ritualParaConjurar && (
        <RitualModal 
          ritual={ritualParaConjurar} 
          peAtual={peAtual}
          onClose={() => setRitualParaConjurar(null)}
          onConfirmar={(custo) => {
            onGastarPE(custo);
            setRitualParaConjurar(null);
          }}
        />
      )}
    </div>
  );
}

export const LinhaDetalhe = ({ label, valor, destaque = false }: { label: string, valor: string | number | null, destaque?: boolean }) => {
    if (!valor) return null;
    return (
      <div className="flex gap-1">
        <strong className={`${destaque ? "text-red-500" : "text-white"}`}>{label}:</strong>
        <span className={`${destaque ? "text-red-400 font-bold" : "text-gray-400"}`}>{valor}</span>
      </div>
    );
};

function RitualCard({ ritual, onUsar }: { ritual: RitualData; onUsar: () => void }) {
  const [expandido, setExpandido] = useState(false);

  const getCores = (elemento: string) => {
    switch (elemento) {
      case "SANGUE": return { border: "border-red-600", bgBadge: "bg-red-900/40 text-red-100", textBtn: "text-red-500" };
      case "MORTE": return { border: "border-gray-500", bgBadge: "bg-gray-700 text-gray-200", textBtn: "text-gray-400" };
      case "ENERGIA": return { border: "border-purple-600", bgBadge: "bg-purple-900/40 text-purple-100", textBtn: "text-purple-500" };
      case "CONHECIMENTO": return { border: "border-yellow-500", bgBadge: "bg-yellow-900/40 text-yellow-100", textBtn: "text-yellow-500" };
      case "MEDO": return { border: "border-white", bgBadge: "bg-white text-black", textBtn: "text-white" };
      default: return { border: "border-gray-700", bgBadge: "bg-gray-800", textBtn: "text-gray-400" };
    }
  };

  const cores = getCores(ritual.tipoElemento);

  return (
    <div 
      className={`
        bg-[#1a1a1a] rounded-xl border transition-all duration-300 overflow-hidden
        ${expandido ? `${cores.border} shadow-lg` : "border-gray-800 hover:border-gray-700"}
      `}
    >
      <div 
        onClick={() => setExpandido(!expandido)}
        className="p-3 md:p-4 flex items-center justify-between gap-4 cursor-pointer relative"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-xl font-light text-gray-500 select-none w-4 flex justify-center shrink-0">
            {expandido ? "×" : "+"}
          </span>

          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 min-w-0">
            <span className="text-sm md:text-base font-bold text-white leading-tight truncate pr-2">
              {ritual.nomeRitual}
            </span>
            <span className={`text-[9px] md:text-[10px] font-bold uppercase px-1.5 py-0.5 rounded w-fit tracking-wider ${cores.bgBadge}`}>
              {ritual.tipoElemento}
            </span>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUsar();
          }}
          className={`
            shrink-0 px-3 py-1.5 md:px-5 md:py-1.5 rounded-full border border-current 
            text-[10px] md:text-xs font-bold uppercase tracking-widest 
            hover:bg-white/10 transition-colors active:scale-95
            ${cores.textBtn}
          `}
        >
          Usar Ritual
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            
          }}
         className={`
            shrink-0 px-3 py-1.5 md:px-5 md:py-1.5 rounded-full border border-current 
            text-[10px] md:text-xs font-bold uppercase tracking-widest 
            hover:bg-white/10 transition-colors active:scale-95
            ${cores.textBtn}
          `}>
          EDITAR
        </button>
      </div>

      {expandido && (
        <div className="px-4 pb-4 md:px-6 md:pb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="h-px w-full bg-gray-800 mb-4" />
          
          <div className="flex flex-col gap-1 text-xs md:text-sm mb-4">
             <LinhaDetalhe label="Execução" valor={ritual.execucao} />
             <LinhaDetalhe label="Alcance" valor={ritual.alcance} />
             <LinhaDetalhe label="Alvo" valor={ritual.alvo} />
             <LinhaDetalhe label="Duração" valor={ritual.duracao} />
             <LinhaDetalhe label="Resistência" valor={ritual.resistencia} />
             
             <div className="flex gap-6 mt-2">
                <LinhaDetalhe label="Círculo" valor={`${ritual.circulo}º`} />
                <LinhaDetalhe label="DT Ritual" valor={ritual.dtRitual} destaque />
             </div>
             
             {ritual.danoSanidade && (
                <div className="mt-1">
                   <strong className="text-blue-400">Sanidade:</strong> <span className="text-gray-400">{ritual.danoSanidade}</span>
                </div>
             )}
          </div>

          <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed text-justify border-t border-gray-800/50 pt-3">
             {ritual.descricao}
          </div>
        </div>
      )}
    </div>
  );
}

interface RitualModalProps {
  ritual: RitualData;
  peAtual: number;
  onClose: () => void;
  onConfirmar: (custo: number) => void;
}

function RitualModal({ ritual, peAtual, onClose, onConfirmar }: RitualModalProps) {
  const OpcaoCusto = ({ label, custo, tipo }: { label: string, custo: number, tipo: string }) => {
    if (custo === 0 && tipo !== 'Normal') return null;
    const podePagar = peAtual >= custo;

    return (
      <button
        onClick={() => {
            if (podePagar) {
                if(confirm(`Gastar ${custo} PE para conjurar ${ritual.nomeRitual} (${label})?`)) {
                    onConfirmar(custo);
                }
            }
        }}
        disabled={!podePagar}
        className={`
          w-full flex items-center justify-between p-4 rounded-lg border transition-all mb-3 group
          ${podePagar 
            ? "bg-[#1a1a1a] border-gray-700 hover:border-harmonia-purple hover:bg-[#252525]" 
            : "bg-black/40 border-gray-800 text-gray-600 cursor-not-allowed"}
        `}
      >
        <div className="flex flex-col items-start">
            <span className={`font-bold text-base ${podePagar ? "text-white" : "text-gray-600"}`}>{label}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">{tipo}</span>
        </div>
        <span className={`font-bold text-sm ${podePagar ? "text-red-500 group-hover:text-red-400" : "text-gray-700"}`}>
          -{custo} PE
        </span>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0d0d0d] border border-gray-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#151515]">
           <div>
             <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Conjurar Ritual</span>
             <h3 className="font-bold text-lg text-white leading-none mt-1">{ritual.nomeRitual}</h3>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
             <X size={20} />
           </button>
        </div>
        <div className="p-6">
           <OpcaoCusto label="Normal" custo={ritual.custoRitual.normal} tipo="Padrão" />
           <OpcaoCusto label="Discente" custo={ritual.custoRitual.discente} tipo="Aprimorado" />
           <OpcaoCusto label="Verdadeiro" custo={ritual.custoRitual.verdadeiro} tipo="Completo" />
           <div className="mt-4 flex justify-between items-center border-t border-gray-800 pt-4">
             <span className="text-xs text-gray-500">Seu PE Atual</span>
             <span className={`font-bold text-lg ${peAtual < 5 ? "text-red-500" : "text-white"}`}>{peAtual}</span>
           </div>
        </div>
      </div>
    </div>
  );
}