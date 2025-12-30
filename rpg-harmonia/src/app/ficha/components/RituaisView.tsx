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

      {/* MODAL DE CONJURAÇÃO */}
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

// --- SUB-COMPONENTE: CARD DO RITUAL (REFATORADO) ---
function RitualCard({ ritual, onUsar }: { ritual: RitualData; onUsar: () => void }) {
  const [expandido, setExpandido] = useState(false);

  const getCores = (elemento: string) => {
    switch (elemento) {
      case "SANGUE": return { border: "border-red-600", shadow: "shadow-[0_0_10px_rgba(220,38,38,0.3)]", text: "text-red-500", bgBadge: "bg-red-900/40 text-red-100" };
      case "MORTE": return { border: "border-gray-500", shadow: "shadow-[0_0_10px_rgba(107,114,128,0.3)]", text: "text-gray-400", bgBadge: "bg-gray-700 text-gray-200" };
      case "ENERGIA": return { border: "border-purple-600", shadow: "shadow-[0_0_10px_rgba(147,51,234,0.3)]", text: "text-purple-500", bgBadge: "bg-purple-900/40 text-purple-100" };
      case "CONHECIMENTO": return { border: "border-yellow-500", shadow: "shadow-[0_0_10px_rgba(234,179,8,0.3)]", text: "text-yellow-500", bgBadge: "bg-yellow-900/40 text-yellow-100" };
      case "MEDO": return { border: "border-white", shadow: "shadow-[0_0_10px_rgba(255,255,255,0.3)]", text: "text-white", bgBadge: "bg-white text-black" };
      default: return { border: "border-gray-700", shadow: "", text: "text-gray-400", bgBadge: "bg-gray-800" };
    }
  };

  const cores = getCores(ritual.tipoElemento);

  return (
    <div 
      className={`
        bg-[#1a1a1a] rounded-xl border transition-all duration-300 overflow-hidden
        ${expandido ? `${cores.border} ${cores.shadow}` : "border-gray-800 hover:border-gray-700"}
      `}
    >
      {/* CABEÇALHO DO CARD */}
      <div 
        onClick={() => setExpandido(!expandido)}
        className="p-3 md:p-4 flex items-center justify-between gap-4 cursor-pointer relative"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Ícone +/- */}
          <span className="text-xl font-light text-gray-500 select-none w-4 flex justify-center shrink-0">
            {expandido ? "×" : "+"}
          </span>

          {/* Nome e Elemento */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 min-w-0">
            <span className="text-sm md:text-base font-bold text-white leading-tight truncate pr-2">
              {ritual.nomeRitual}
            </span>
            <span className={`text-[9px] md:text-[10px] font-bold uppercase px-1.5 py-0.5 rounded w-fit tracking-wider ${cores.bgBadge}`}>
              {ritual.tipoElemento}
            </span>
          </div>
        </div>
        
        {/* Botão de Ação */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUsar();
          }}
          className={`
            shrink-0 px-3 py-1.5 md:px-5 md:py-1.5 rounded-full border border-current 
            text-[10px] md:text-xs font-bold uppercase tracking-widest 
            hover:bg-white/10 transition-colors active:scale-95
            ${cores.text}
          `}
        >
          Usar Ritual
        </button>
      </div>

      {/* DETALHES (Visível apenas se expandido) */}
      {expandido && (
        <div className="px-4 pb-4 md:px-6 md:pb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="h-px w-full bg-gray-800 mb-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 text-xs md:text-sm mb-4 bg-black/20 p-3 rounded-lg border border-gray-800/50">
             <div><span className="text-gray-500 block text-[10px] uppercase">Execução</span> <span className="text-gray-200 font-medium">{ritual.execucao}</span></div>
             <div><span className="text-gray-500 block text-[10px] uppercase">Alcance</span> <span className="text-gray-200 font-medium">{ritual.alcance}</span></div>
             <div><span className="text-gray-500 block text-[10px] uppercase">Alvo</span> <span className="text-gray-200 font-medium">{ritual.alvo}</span></div>
             <div><span className="text-gray-500 block text-[10px] uppercase">Duração</span> <span className="text-gray-200 font-medium">{ritual.duracao}</span></div>
             <div className="col-span-2 md:col-span-4 border-t border-gray-800/50 pt-2 mt-1">
               <span className="text-gray-500 text-[10px] uppercase mr-2">Resistência:</span> 
               <span className="text-gray-200 font-medium">{ritual.resistencia}</span>
             </div>
          </div>

          <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed text-justify px-1">
             {ritual.descricao}
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTE: MODAL DE CONJURAÇÃO ---
interface RitualModalProps {
  ritual: RitualData;
  peAtual: number;
  onClose: () => void;
  onConfirmar: (custo: number) => void;
}

function RitualModal({ ritual, peAtual, onClose, onConfirmar }: RitualModalProps) {
  
  const OpcaoCusto = ({ label, custo, tipo }: { label: string, custo: number, tipo: string }) => {
    // Regra: Não mostra opção se o custo for 0 (exceto Normal)
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
        
        {/* Cabeçalho do Modal */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#151515]">
           <div>
             <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Conjurar Ritual</span>
             <h3 className="font-bold text-lg text-white leading-none mt-1">{ritual.nomeRitual}</h3>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
             <X size={20} />
           </button>
        </div>

        {/* Corpo do Modal */}
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