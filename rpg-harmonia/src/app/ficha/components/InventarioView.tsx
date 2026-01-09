"use client";
import { useState, useEffect } from "react";
import { InventarioData, ItemData } from "@/lib/types";
import { buscarInventario } from "../[id]/actions"; 
import { Package, Medal, CreditCard, Briefcase } from "lucide-react";

interface InventarioViewProps {
  idFicha: string;
}

export function InventarioView({ idFicha }: InventarioViewProps) {
  const [inventario, setInventario] = useState<InventarioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarInventario(idFicha);
      setInventario(dados);
      setLoading(false);
    }
    carregar();
  }, [idFicha]);

  if (loading) return <div className="text-center py-10 text-gray-500 animate-pulse">Verificando equipamentos...</div>;
  if (!inventario) return <div className="text-center py-10 text-gray-500">Inventário vazio ou inacessível.</div>;

  const patenteFormatada = inventario.patente.replace(/_/g, " ").toLowerCase();

  // Lógica de Cores da Barra de Carga
  const getCorBarra = () => {
    const { atual, total } = inventario.carga;
    if (atual > total) return "bg-red-600 shadow-[0_0_10px_red]"; // Estourou
    if (atual === total) return "bg-harmonia-purple shadow-[0_0_10px_#E300FF]"; // No limite
    return "bg-green-500 shadow-[0_0_10px_green]"; // Tem espaço
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. STATUS E CARGA */}
      <section className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 md:p-5 shadow-lg">
        
        {/* Barra de Carga */}
        <div className="mb-5">
          <div className="flex justify-between items-end mb-2">
            <span className="text-white font-bold flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
              <Package size={16} className="text-gray-400" /> Capacidade de Carga
            </span>
            <span className="text-gray-400 font-mono text-xs md:text-sm">
              <span className="text-white font-bold text-base md:text-lg">{inventario.carga.atual}</span>/{inventario.carga.total}
            </span>
          </div>
          
          <div className="w-full h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
             <div 
               className={`h-full transition-all duration-500 ${getCorBarra()}`}
               style={{ width: `${Math.min((inventario.carga.atual / inventario.carga.total) * 100, 100)}%` }}
             />
          </div>
          
          {inventario.carga.atual > inventario.carga.total && (
            <p className="text-red-500 text-[10px] mt-1 text-center font-bold uppercase animate-pulse">
              Sobrecarregado
            </p>
          )}
        </div>

        {/* Grid de Status */}
        <div className="grid grid-cols-3 gap-2 border-t border-gray-700 pt-4">
           <InfoItem 
             icon={<Medal size={14} className="text-yellow-500" />} 
             label="Patente" 
             valor={patenteFormatada} 
             capitalize
           />
           <InfoItem 
             icon={<Briefcase size={14} className="text-blue-500" />} 
             label="Prestígio" 
             valor={inventario.pontosDePrestigio} 
           />
           <InfoItem 
             icon={<CreditCard size={14} className="text-green-500" />} 
             label="Crédito" 
             valor={inventario.limiteCreditos} 
           />
        </div>
      </section>

      {/* 2. LIMITES DE ITENS */}
      <section className="w-full">
        <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2">Limites por Categoria</h3>
        <div className="grid grid-cols-6 gap-1 md:gap-2">
          <LimiteBox cat="I" valor={inventario.limiteItens.categoriaI} />
          <LimiteBox cat="II" valor={inventario.limiteItens.categoriaII} />
          <LimiteBox cat="III" valor={inventario.limiteItens.categoriaIII} />
          <LimiteBox cat="IV" valor={inventario.limiteItens.categoriaIV} />
          <LimiteBox cat="V" valor={inventario.limiteItens.categoriaV} />
          <LimiteBox cat="VI" valor={inventario.limiteItens.categoriaVI} />
        </div>
      </section>

      {/* 3. LISTA DE ITENS */}
      <section className="flex flex-col gap-3">
        <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-bold ml-1 mb-1">Equipamentos</h3>
        {inventario.itens.map((item, idx) => (
          <ItemCard key={idx} item={item} />
        ))}
        {inventario.itens.length === 0 && (
          <div className="text-center py-10 border border-dashed border-gray-800 rounded-xl text-gray-600">
            Mochila vazia.
          </div>
        )}
      </section>

    </div>
  );
}

// --- SUB-COMPONENTES ---

function InfoItem({ icon, label, valor, capitalize = false }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-black/20 rounded-lg h-full">
      <div className="flex items-center gap-1.5 mb-1 text-gray-400 text-[9px] md:text-[10px] uppercase font-bold text-center">
        {icon} <span className="hidden md:inline">{label}</span> <span className="md:hidden">{label.slice(0,3)}.</span>
      </div>
      <span className={`text-white font-bold text-center text-xs md:text-sm leading-tight ${capitalize ? 'capitalize' : ''}`}>
        {valor}
      </span>
    </div>
  );
}

function LimiteBox({ cat, valor }: { cat: string, valor: number }) {
  const ativo = valor > 0;
  return (
    <div className={`
      flex flex-col items-center justify-center w-full aspect-square md:aspect-auto md:h-14 rounded border 
      ${ativo ? 'bg-[#1a1a1a] border-gray-600' : 'bg-[#121212] border-gray-800 opacity-40'}
    `}>
      <span className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold">Cat {cat}</span>
      <span className={`text-base md:text-xl font-bold ${ativo ? 'text-white' : 'text-gray-700'}`}>{valor}</span>
    </div>
  );
}

function ItemCard({ item }: { item: ItemData }) {
  const [expandido, setExpandido] = useState(false);
  
  const isPrestigio = item.categoria !== "0";
  const borderClass = isPrestigio ? "border-yellow-600/50 hover:border-yellow-500" : "border-gray-800 hover:border-gray-600";

  return (
    <div className={`bg-[#1a1a1a] rounded-xl border transition-all duration-300 overflow-hidden ${expandido ? 'border-gray-500 shadow-lg' : borderClass}`}>
      <div 
        onClick={() => setExpandido(!expandido)}
        className="p-3 md:p-4 flex items-center justify-between gap-3 cursor-pointer relative"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="text-xl font-light text-gray-500 w-4 flex justify-center shrink-0 select-none">
             {expandido ? "×" : "+"}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm md:text-base font-bold text-white truncate">{item.nomeItem}</span>
            <div className="flex gap-2 mt-0.5">
              {item.categoria !== "0" && (
                <span className="text-[9px] bg-yellow-900/40 text-yellow-500 border border-yellow-700/50 px-1.5 rounded uppercase font-bold tracking-wider">
                  Categoria {item.categoria}
                </span>
              )}
              {item.espacos > 0 && (
                <span className="text-[9px] bg-gray-800 text-gray-400 border border-gray-700 px-1.5 rounded uppercase font-bold tracking-wider">
                  {item.espacos} {item.espacos === 1 ? 'Espaço' : 'Espaço'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {expandido && (
        <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2 duration-300">
           <div className="h-px w-full bg-gray-800 mb-3" />
           <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed text-justify">
             {item.descricao}
           </p>
        </div>
      )}
    </div>
  );
}