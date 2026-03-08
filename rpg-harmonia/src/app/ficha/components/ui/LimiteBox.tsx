interface LimiteBoxProps { 
    cat: string; 
    valor: number 
}

export function LimiteBox({ cat, valor }: LimiteBoxProps) {
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