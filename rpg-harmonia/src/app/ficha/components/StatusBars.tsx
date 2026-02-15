"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

interface StatusValue {
  atual: number;
  total: number;
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
  
  // Função genérica de atualização (botões)
  const updateStatus = (
    current: StatusValue, 
    setter: (v: StatusValue) => void, 
    change: number
  ) => {
    const novoAtual = current.atual + change;
    setter({ ...current, atual: novoAtual }); // Deixamos negativo se o mestre quiser
  };

  // Função de atualização direta (input manual)
  const handleManualUpdate = (
    current: StatusValue,
    setter: (v: StatusValue) => void,
    novoValor: number
  ) => {
    if (isNaN(novoValor)) return;
    setter({ ...current, atual: novoValor });
  };

  return (
    <section className="grid grid-cols-2 gap-3 mb-5">
      
      {/* BARRA DE VIDA (PV) - Ocupa 2 colunas */}
      <StatusBarItem 
        label="PV" 
        cor="red" 
        valor={pv} 
        onChange={(val) => handleManualUpdate(pv, setPv, val)}
        onBtnClick={(val) => updateStatus(pv, setPv, val)}
        className="col-span-2"
      />

      {/* BARRA DE ESFORÇO (PE) */}
      <StatusBarItem 
        label="PE" 
        cor="yellow" 
        valor={pe} 
        onChange={(val) => handleManualUpdate(pe, setPe, val)}
        onBtnClick={(val) => updateStatus(pe, setPe, val)}
      />

      {/* BARRA DE SANIDADE (SAN) */}
      <StatusBarItem 
        label="SAN" 
        cor="blue" 
        valor={san} 
        onChange={(val) => handleManualUpdate(san, setSan, val)}
        onBtnClick={(val) => updateStatus(san, setSan, val)}
      />

    </section>
  );
}

// --- SUB-COMPONENTE INTELIGENTE (COM INPUT EDITÁVEL) ---

interface StatusBarItemProps {
  label: string;
  cor: "red" | "yellow" | "blue";
  valor: StatusValue;
  onChange: (novoValor: number) => void;
  onBtnClick: (delta: number) => void;
  className?: string;
}

function StatusBarItem({ label, cor, valor, onChange, onBtnClick, className = "" }: StatusBarItemProps) {
  const [editando, setEditando] = useState(false);
  const [tempValor, setTempValor] = useState(valor.atual.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  // Cores dinâmicas baseadas na prop 'cor'
  const colors = {
    red: { text: "text-red-500", bg: "bg-red-600", border: "border-red-900/30", hover: "hover:bg-red-900/40" },
    yellow: { text: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-900/30", hover: "hover:bg-yellow-900/40" },
    blue: { text: "text-blue-500", bg: "bg-blue-500", border: "border-blue-900/30", hover: "hover:bg-blue-900/40" }
  };
  
  const theme = colors[cor];

  // Sincroniza o valor local caso o valor venha do banco/firebase externamente
  useEffect(() => {
    setTempValor(valor.atual.toString());
  }, [valor.atual]);

  // Foca no input assim que entra no modo edição
  useEffect(() => {
    if (editando && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Seleciona tudo para facilitar digitar por cima
    }
  }, [editando]);

  const confirmarEdicao = () => {
    const numero = parseInt(tempValor);
    if (!isNaN(numero)) {
      onChange(numero);
    } else {
      setTempValor(valor.atual.toString()); // Reverte se inválido
    }
    setEditando(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") confirmarEdicao();
    if (e.key === "Escape") {
        setTempValor(valor.atual.toString());
        setEditando(false);
    }
  };

  return (
    <div className={`bg-[#1a1a1a] border ${theme.border} rounded-xl p-2 relative overflow-hidden shadow-lg group ${className}`}>
      
      {/* Barra de Progresso no Fundo */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${theme.bg}`}
        style={{ width: `${Math.min((valor.atual / (valor.total || 1)) * 100, 100)}%` }} 
      />
      
      <div className="flex flex-col items-center gap-1 z-10 relative">
          <span className={`text-[10px] font-bold ${theme.text} uppercase tracking-widest`}>{label}</span>
          
          <div className="flex items-center justify-between w-full px-2 md:justify-center md:gap-6">
            
            {/* Botão Menos */}
            <button 
              onClick={() => onBtnClick(-1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-black/40 ${theme.text} ${theme.hover} hover:text-white transition-colors active:scale-95`}
            >
              <Minus size={16} />
            </button>

            {/* Display / Input Editável */}
            <div className="flex items-end justify-center min-w-[60px]">
              {editando ? (
                <input
                    ref={inputRef}
                    type="number"
                    value={tempValor}
                    onChange={(e) => setTempValor(e.target.value)}
                    onBlur={confirmarEdicao}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent text-white text-xl md:text-2xl font-bold text-center w-16 outline-none border-b border-gray-500 p-0 m-0 leading-none"
                />
              ) : (
                <div 
                    onClick={() => setEditando(true)}
                    className="flex items-baseline cursor-pointer hover:bg-white/5 px-2 rounded transition-colors group/number"
                >
                    <span className="text-xl md:text-2xl font-bold text-white tabular-nums tracking-wider leading-none">
                        {valor.atual}
                    </span>
                    <span className="text-gray-600 text-xs ml-1 font-mono">
                        /{valor.total}
                    </span>
                    <PencilIcon className="w-3 h-3 text-gray-600 ml-1 opacity-0 group-hover/number:opacity-100 transition-opacity" />
                </div>
              )}
            </div>

            {/* Botão Mais */}
            <button 
              onClick={() => onBtnClick(1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-black/40 ${theme.text} ${theme.hover} hover:text-white transition-colors active:scale-95`}
            >
              <Plus size={16} />
            </button>
          </div>
      </div>
    </div>
  );
}

// Pequeno ícone de lápis para indicar que é editável ao passar o mouse
function PencilIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
    )
}