import { AtaqueData, ItemData } from "@/lib/types";
import { Pencil, Sword } from "lucide-react";
import { useState } from "react";

interface ItemCardProps { 
    item: ItemData; 
    onEdit: () => void, ataque?: AtaqueData
}

export function ItemCard({ item, onEdit, ataque }: ItemCardProps ) {
  const [expandido, setExpandido] = useState(false);
  const isPrestigio = item.categoria !== "0";
  const borderClass = ataque 
    ? "border-red-900/50 hover:border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.1)]" 
    : (isPrestigio ? "border-yellow-600/50 hover:border-yellow-500" : "border-gray-800 hover:border-gray-600");

  return (
    <div className={`bg-[#1a1a1a] rounded-xl border transition-all duration-300 overflow-hidden ${expandido ? 'border-gray-500 shadow-lg' : borderClass}`}>
      <div 
        onClick={() => setExpandido(!expandido)}
        className="p-3 md:p-4 flex items-center justify-between gap-3 cursor-pointer relative group"
      >
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* Ícone de Espada se tiver ataque */}
          <span className={`text-xl font-light w-4 flex justify-center shrink-0 select-none ${ataque ? 'text-red-500' : 'text-gray-500'}`}>
             {expandido ? "×" : (ataque ? <Sword size={16}/> : "+")}
          </span>
          <div className="flex flex-col min-w-0">
            <span className={`text-sm md:text-base font-bold truncate ${ataque ? 'text-white' : 'text-gray-200'}`}>
                {item.nomeItem}
            </span>
            <div className="flex gap-2 mt-0.5">
              {item.categoria !== "0" && (
                <span className="text-[9px] bg-yellow-900/40 text-yellow-500 border border-yellow-700/50 px-1.5 rounded uppercase font-bold tracking-wider">
                  Cat {item.categoria}
                </span>
              )}
              {item.espacos > 0 && (
                <span className="text-[9px] bg-gray-800 text-gray-400 border border-gray-700 px-1.5 rounded uppercase font-bold tracking-wider">
                  {item.espacos} {item.espacos === 1 ? 'Esp' : 'Esp'}
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
            onClick={(e) => {
                e.stopPropagation();
                onEdit();
            }}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors xl:opacity-0 xl:group-hover:opacity-100 opacity-100"
        >
            <Pencil size={16} />
        </button>
      </div>

      {expandido && (
        <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2 duration-300">
           <div className="h-px w-full bg-gray-800 mb-3" />
           
           {/* SEÇÃO DE ATAQUE (SE HOUVER) */}
           {ataque && (
             <div className="mb-4 bg-red-950/20 border border-red-900/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2 text-red-500 text-[10px] uppercase font-bold tracking-widest border-b border-red-900/30 pb-1">
                    <Sword size={12} /> Dados de Combate
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex flex-col">
                        <span className="text-gray-500 uppercase text-[9px]">Teste</span>
                        <span className="text-white font-bold">{ataque.teste}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 uppercase text-[9px]">Dano</span>
                        <span className="text-white font-bold">{ataque.dano}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 uppercase text-[9px]">Crítico</span>
                        <span className="text-white font-bold">{ataque.critico}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 uppercase text-[9px]">Alcance</span>
                        <span className="text-white font-bold">{ataque.alcance}</span>
                    </div>
                </div>

                {ataque.especial && (
                    <div className="mt-2 pt-2 border-t border-red-900/30">
                        <span className="text-gray-500 uppercase text-[9px] block">Especial</span>
                        <span className="text-red-200 text-xs italic">{ataque.especial}</span>
                    </div>
                )}
             </div>
           )}

           <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed text-justify">
             {item.descricao}
           </p>
        </div>
      )}
    </div>
  );
}