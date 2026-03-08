import { Briefcase, CreditCard, Medal, Package } from 'lucide-react'
import { InfoItem } from './InfoItem'
import { InventarioData } from '@/lib/types'

export function CapacidadeStatus({ inventario }: { inventario: InventarioData }) {

    const patenteFormatada = inventario.patente.replace(/_/g, " ").toLowerCase();
    const getCorBarra = () => {
        const { atual, total } = inventario.carga;
        if (atual > total) return "bg-red-600 shadow-[0_0_10px_red]";
        if (atual === total) return "bg-harmonia-purple shadow-[0_0_10px_#E300FF]";
        return "bg-green-500 shadow-[0_0_10px_green]";
    };

    return (
        <>
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
              <p className="text-red-500 text-[10px] mt-1 text-center font-bold uppercase animate-pulse">Sobrecarregado</p>
            )}
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-gray-700 pt-4">
           <InfoItem icon={<Medal size={14} className="text-yellow-500" />} label="Patente" valor={patenteFormatada} capitalize />
           <InfoItem icon={<Briefcase size={14} className="text-blue-500" />} label="Prestígio" valor={inventario.pontosDePrestigio} />
           <InfoItem icon={<CreditCard size={14} className="text-green-500" />} label="Crédito" valor={inventario.limiteCreditos} />
        </div>
        </>
  )
}
