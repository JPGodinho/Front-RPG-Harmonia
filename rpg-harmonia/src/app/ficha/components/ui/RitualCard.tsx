import { RitualData, TipoElemento } from "@/lib/types";
import { useState } from "react";
import { LinhaDetalhe } from "./LinhaDetalhe";
import { Pencil } from "lucide-react";

export function RitualCard({ ritual, onUsar, onEdit }: { ritual: RitualData; onUsar: () => void, onEdit: () => void }) {
  const [expandido, setExpandido] = useState(false);

  const getCores = (elemento: TipoElemento) => {
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
        className="p-3 md:p-4 flex items-center justify-between gap-3 cursor-pointer relative group"
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
                onEdit();
            }}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 
             rounded-full transition-colors lg:opacity-0 lg:group-hover:opacity-100 opacity-100"
        >
            <Pencil size={16} />
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