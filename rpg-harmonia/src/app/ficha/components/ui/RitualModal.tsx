import { CustoRitual } from "@/lib/types";
import { OpcaoCusto } from "./OpcaoCusto";
import { X } from "lucide-react";

interface RitualModalProps {
  nomeRitual: string;
  custoRitual: CustoRitual;
  peAtual: number;
  onClose: () => void;
  onConfirmar: (custo: number) => void;
}

export function RitualModal({ nomeRitual, custoRitual, peAtual, onClose, onConfirmar}: RitualModalProps) {
  

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-100">
      <div className="bg-[#0d0d0d] border border-gray-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#151515]">
           <div>
             <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Conjurar Ritual</span>
             <h3 className="font-bold text-lg text-white leading-none mt-1">{nomeRitual}</h3>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
             <X size={20} />
           </button>
        </div>
        <div className="p-6">
           <OpcaoCusto label="Normal" custo={custoRitual.normal} peAtual={peAtual} nomeRitual={nomeRitual} tipo="Normal" onConfirmar={onConfirmar}/>
           <OpcaoCusto label="Discente" custo={custoRitual.discente} peAtual={peAtual} nomeRitual={nomeRitual} tipo="Discente" onConfirmar={onConfirmar}/>
           <OpcaoCusto label="Verdadeiro" custo={custoRitual.verdadeiro} peAtual={peAtual} nomeRitual={nomeRitual} tipo="Verdadeiro" onConfirmar={onConfirmar}/>
           <div className="mt-4 flex justify-between items-center border-t border-gray-800 pt-4">
             <span className="text-xs text-gray-500">Seu PE Atual</span>
             <span className={`font-bold text-lg ${peAtual < 5 ? "text-red-500" : "text-white"}`}>{peAtual}</span>
           </div>
        </div>
      </div>
    </div>
  );
}