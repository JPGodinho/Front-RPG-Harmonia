interface OpcaoCustoProps { 
    label: string;
    custo: number;
    tipo: string;
    peAtual: number;
    nomeRitual: string;
    onConfirmar: (custo: number) => void 
}

export function OpcaoCusto ({ label, custo, tipo, peAtual, nomeRitual, onConfirmar }: OpcaoCustoProps) {
    if (custo === 0 && tipo !== 'Normal') return null;
    const podePagar = peAtual >= custo;

    return (
      <button
        onClick={() => {
            if (podePagar) {
                if(confirm(`Gastar ${custo} PE para conjurar ${nomeRitual} (${label})?`)) {
                    onConfirmar(custo);
                }
            }
        }}
        disabled={!podePagar}
        className={`
          w-full flex items-center justify-between p-4 rounded-lg border transition-all mb-3 group
          ${podePagar 
            ? "bg-[#1a1a1a] border-gray-700 hover:border-harmonia-purple hover:bg-[#252525]" 
            : "bg-black/40 border-gray-800 text-gray-600 cursor-not-allowed"}
        `}
      >
        <div className="flex flex-col items-start">
            <span className={`font-bold text-base ${podePagar ? "text-white" : "text-gray-600"}`}>{label}</span>
        </div>
        <span className={`font-bold text-sm ${podePagar ? "text-red-500 group-hover:text-red-400" : "text-gray-700"}`}>
          -{custo} PE
        </span>
      </button>
    );
};