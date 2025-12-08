"use client";
import { Minus, Plus } from "lucide-react";

interface BarraProps {
  titulo: string;
  atual: number;
  max: number;
  corTexto: string;
  className?: string;
  onChange: (n: number) => void;
}

function Barra({ titulo, atual, max, corTexto, className = "", onChange }: BarraProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-[#1a1a1a] border border-gray-800 rounded-lg p-2 shadow-md ${className}`}>
      
      <span className="text-xs text-gray-500 font-bold tracking-wider mb-1 uppercase">
        {titulo}
      </span>
      
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => onChange(atual - 1)} 
          className="text-gray-600 hover:text-white transition-colors"
        >
            <Minus size={16} />
        </button>

        <span className={`text-xl font-bold ${corTexto} min-w-14 text-center`}>
            {atual}/{max}
        </span>

        <button 
          onClick={() => onChange(atual + 1)} 
          className="text-gray-600 hover:text-white transition-colors"
        >
            <Plus size={16} />
        </button>
      </div>

    </div>
  );
}

interface StatusBarsProps {
  pv: { atual: number, max: number };
  pe: { atual: number, max: number };
  san: { atual: number, max: number };
  setPv: (val: any) => void;
  setPe: (val: any) => void;
  setSan: (val: any) => void;
}

export function StatusBars({ pv, pe, san, setPv, setPe, setSan }: StatusBarsProps) {
  return (
    <section className="grid grid-cols-2 gap-3 mb-10 px-1 md:px-0">
      
      <div className="col-span-2">
        <Barra 
            titulo="PV" 
            atual={pv.atual} max={pv.max} 
            corTexto="text-red-500"
            onChange={(n) => setPv({ ...pv, atual: n })}
            className="border-red-500/20" 
        />
      </div>
      
      <Barra 
        titulo="PE" 
        atual={pe.atual} max={pe.max} 
        corTexto="text-yellow-400"
        onChange={(n) => setPe({ ...pe, atual: n })}
        className="border-yellow-500/20"
      />
      
      <Barra 
        titulo="SAN" 
        atual={san.atual} max={san.max} 
        corTexto="text-blue-400"
        onChange={(n) => setSan({ ...san, atual: n })}
        className="border-blue-500/20"
      />

    </section>
  );
}