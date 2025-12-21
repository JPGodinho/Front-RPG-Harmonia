"use client";
import { Pericia } from "@/lib/pericias";

interface PericiasListProps {
  corTexto: string; 
  lista: Pericia[]; 
}

export function PericiasList({ corTexto, lista }: PericiasListProps) {
  if (!lista || lista.length === 0) return (
    <div className="text-center text-gray-600 text-sm mt-6 italic">
      Carregando dados...
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
      
      <div className="flex items-center px-4 py-5 bg-black/40 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-[0.15em]">
        <div className="flex-1 text-left pl-2">Perícia</div>
        <div className="w-16 text-center">Treino</div>
        <div className="w-20 text-center">Bônus</div> 
      </div>

      <div className="divide-y divide-gray-800">
        {lista.map((p, i) => (
          <div key={i} className="flex items-center px-4 py-3 hover:bg-white/5 transition-colors group">
            
            <div className="flex-1 text-sm font-medium text-gray-200 group-hover:text-white transition-colors pl-2">
              {p.nome}
            </div>

            <div className={`w-16 text-center font-bold text-base ${corTexto}`}>
              {p.treino > 0 ? `+${p.treino}` : "0"}
            </div>

            <div className="w-20 flex flex-col items-center justify-center leading-none">
              <span className={`text-sm font-bold ${p.bonusPonto > 0 ? 'text-white' : 'text-gray-600'}`}>
                {p.bonusPonto > 0 ? `+${p.bonusPonto}` : "-"}
              </span>
              
              {p.bonusDescricao && (
                <span className="text-[9px] text-gray-500 uppercase mt-1 truncate max-w-full px-1">
                  {p.bonusDescricao}
                </span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}