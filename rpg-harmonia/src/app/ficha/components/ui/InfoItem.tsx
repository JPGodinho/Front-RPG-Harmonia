import { JSX } from "react";

interface InfoItemProps { 
    icon: JSX.Element; 
    label: string; 
    valor: number | string; 
    capitalize?: boolean 
}

export function InfoItem({ icon, label, valor, capitalize = false }: InfoItemProps ) {
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