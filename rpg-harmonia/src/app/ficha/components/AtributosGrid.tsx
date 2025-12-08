"use client";

interface AtributoBotaoProps { 
  label: string; valor: number; borderCor: string; bgCor: string; textCor: string; sombra: string;
  selecionado: boolean; algoSelecionado: boolean; onClick: () => void;
}

function AtributoBotao({ label, valor, borderCor, bgCor, textCor, sombra, selecionado, algoSelecionado, onClick }: AtributoBotaoProps) {
  let containerClass = "opacity-100 scale-100"; 
  if (selecionado) containerClass = "opacity-100 scale-110 md:scale-125 z-10"; 
  else if (algoSelecionado) containerClass = "opacity-30 scale-90 blur-[1px]"; 

  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-3 transition-all duration-300 ease-out ${containerClass} group`}>
      <div className={`
        w-14 h-14 md:w-20 md:h-20 rounded-full border-2 ${borderCor} flex items-center justify-center text-2xl md:text-3xl font-bold 
        ${selecionado ? `${bgCor} text-[#1a1a1a]` : 'bg-[#1a1a1a] text-white'}
        shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
        ${selecionado ? `shadow-[0_0_30px_rgba(255,255,255,0.4)] ${sombra}` : ''}
        transition-all duration-300
      `}>
        {valor}
      </div>
      <span className={`text-[10px] md:text-sm font-bold uppercase tracking-wider ${selecionado ? textCor : 'text-gray-400 group-hover:text-gray-200'}`}>
        {label}
      </span>
    </button>
  );
}

interface ValoresAtributos {
  agi: number;
  for: number;
  int: number;
  pre: number;
  vig: number;
}

interface AtributosGridProps {
  atributos: ValoresAtributos;
  selecionado: string | null;
  onToggle: (nome: string) => void;
}

export function AtributosGrid({ atributos, selecionado, onToggle }: AtributosGridProps) {
  const algoSelecionado = selecionado !== null;

  return (
    <section className="max-w-3xl mx-auto">
      <h3 className="text-gray-400 text-sm mb-4 text-center uppercase tracking-widest">Atributos</h3>
      
      <div className="grid grid-cols-5 gap-2 md:gap-8">
         <AtributoBotao 
            label="Agilidade" 
            valor={atributos.agi} 
            borderCor="border-cyan-400" 
            bgCor="bg-cyan-400" 
            textCor="text-cyan-400" 
            sombra="shadow-cyan-400"
            selecionado={selecionado === "Agilidade"} 
            algoSelecionado={algoSelecionado} 
            onClick={() => onToggle("Agilidade")}
          />

          <AtributoBotao 
            label="Força" 
            valor={atributos.for} 
            borderCor="border-orange-500" 
            bgCor="bg-orange-500" 
            textCor="text-orange-500" 
            sombra="shadow-orange-500"
            selecionado={selecionado === "Força"} 
            algoSelecionado={algoSelecionado} 
            onClick={() => onToggle("Força")}
          />

          <AtributoBotao 
            label="Intelecto" 
            valor={atributos.int} 
            borderCor="border-gray-300" 
            bgCor="bg-gray-300" 
            textCor="text-gray-300" 
            sombra="shadow-gray-300"
            selecionado={selecionado === "Intelecto"} 
            algoSelecionado={algoSelecionado} 
            onClick={() => onToggle("Intelecto")}
          />

          <AtributoBotao 
            label="Presença" 
            valor={atributos.pre} 
            borderCor="border-harmonia-purple" 
            bgCor="bg-harmonia-purple" 
            textCor="text-harmonia-purple" 
            sombra="shadow-[#E300FF]"
            selecionado={selecionado === "Presença"} 
            algoSelecionado={algoSelecionado} 
            onClick={() => onToggle("Presença")}
          />

          <AtributoBotao 
            label="Vigor" 
            valor={atributos.vig} 
            borderCor="border-green-500" 
            bgCor="bg-green-500" 
            textCor="text-green-500" 
            sombra="shadow-green-500"
            selecionado={selecionado === "Vigor"} 
            algoSelecionado={algoSelecionado} 
            onClick={() => onToggle("Vigor")}
          />
      </div>

      <div className="mt-8 min-h-[100px] text-center transition-all">
        {selecionado ? (
          <div className="p-4 border border-dashed border-gray-700 rounded-lg bg-white/5">
            <p className="text-gray-400 text-sm">Mostrando perícias de: <strong className="text-white">{selecionado}</strong></p>
            <p className="text-xs text-gray-500 mt-2">(Lista de perícias virá aqui em breve...)</p>
          </div>
        ) : (
          <p className="text-gray-600 text-sm italic">Clique em um atributo para ver as perícias</p>
        )}
      </div>

    </section>
  );
}