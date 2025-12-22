"use client";
import { Plus, Minus } from "lucide-react";

interface StatusValue {
  atual: number;
  max: number;
}

interface StatusBarsProps {
  pv: StatusValue;
  pe: StatusValue;
  san: StatusValue;
  setPv: (val: StatusValue) => void;
  setPe: (val: StatusValue) => void;
  setSan: (val: StatusValue) => void;
}

export function StatusBars({ pv, pe, san, setPv, setPe, setSan }: StatusBarsProps) {
  
  const updateStatus = (
    current: StatusValue, 
    setter: (v: StatusValue) => void, 
    change: number
  ) => {
    const novoAtual = current.atual + change;
    if (novoAtual < 0) return;
    setter({ ...current, atual: novoAtual });
  };

  return (
    <section className="grid grid-cols-2 gap-3 mb-5">
      
      <div className="col-span-2 mx-6 bg-[#1a1a1a] border border-red-900/30 rounded-xl p-2 relative overflow-hidden shadow-lg group">
        <div 
          className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-500" 
          style={{ width: `${(pv.atual / (pv.max || 1)) * 100}%` }} 
        />
        
        <div className="flex flex-col items-center gap-1 z-10 relative">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">PV</span>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateStatus(pv, setPv, -1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-red-500 hover:bg-red-900/40 hover:text-white transition-colors"
              >
                <Minus size={16} />
              </button>

              <div className="text-xl font-bold text-white tabular-nums tracking-wider">
                {pv.atual}<span className="text-gray-600 text-sm">/{pv.max}</span>
              </div>

              <button 
                onClick={() => updateStatus(pv, setPv, 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-red-500 hover:bg-red-900/40 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-yellow-900/30 rounded-xl p-2 relative overflow-hidden shadow-lg">
        <div 
          className="absolute bottom-0 left-0 h-1 bg-yellow-500 transition-all duration-500" 
          style={{ width: `${(pe.atual / (pe.max || 1)) * 100}%` }} 
        />
        
        <div className="flex flex-col items-center gap-1 z-10 relative">
            <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">PE</span>
            
            <div className="flex items-center justify-between w-full px-1">
              <button 
                onClick={() => updateStatus(pe, setPe, -1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-yellow-500 hover:bg-yellow-900/40 hover:text-white transition-colors"
              >
                <Minus size={16} />
              </button>

              <div className="text-lg font-bold text-white tabular-nums">
                {pe.atual}<span className="text-gray-600 text-xs">/{pe.max}</span>
              </div>

              <button 
                onClick={() => updateStatus(pe, setPe, 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-yellow-500 hover:bg-yellow-900/40 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-blue-900/30 rounded-xl p-2 relative overflow-hidden shadow-lg">
        <div 
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-500" 
          style={{ width: `${(san.atual / (san.max || 1)) * 100}%` }} 
        />
        
        <div className="flex flex-col items-center gap-1 z-10 relative">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">SAN</span>
            
            <div className="flex items-center justify-between w-full px-1">
              <button 
                onClick={() => updateStatus(san, setSan, -1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-blue-500 hover:bg-blue-900/40 hover:text-white transition-colors"
              >
                <Minus size={16} />
              </button>

              <div className="text-lg font-bold text-white tabular-nums">
                {san.atual}<span className="text-gray-600 text-xs">/{san.max}</span>
              </div>

              <button 
                onClick={() => updateStatus(san, setSan, 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-blue-500 hover:bg-blue-900/40 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
        </div>
      </div>

    </section>
  );
}