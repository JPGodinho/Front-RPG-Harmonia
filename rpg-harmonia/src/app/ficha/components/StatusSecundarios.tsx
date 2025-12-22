"use client";

interface StatusSecundariosProps {
  defesa?: number;
  deslocamento?: string;
  esquiva?: number;
  resistencias?: string;
  rdBloqueio?: number;
  protecoes?: string;
}

function InfoDisplay({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-[#1a1a1a] border border-gray-800 p-3 flex flex-col items-center justify-center text-center shadow-md h-full ${className}`}>
      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{label}</span>
      <div className="text-white font-bold w-full flex items-center justify-center text-lg md:text-xl leading-tight">
        {children}
      </div>
    </div>
  );
}

export function StatusSecundarios({
  defesa, deslocamento, esquiva, resistencias, rdBloqueio, protecoes
}: StatusSecundariosProps) {
  
  return (
    <section className="grid grid-cols-4 mb-3">
        
        <div className="col-span-1">
            <InfoDisplay label="Defesa">{defesa}</InfoDisplay>
        </div>
        
        <div className="col-span-1">
            <InfoDisplay label="Esquiva">{esquiva}</InfoDisplay>
        </div>
        
        <div className="col-span-1">
            <InfoDisplay label="Desloc.">{deslocamento}</InfoDisplay>
        </div>
        
        <div className="col-span-1">
            <InfoDisplay label="Resistências">
                <span className="text-xs text-gray-300 line-clamp-2" title={resistencias}>
                    {resistencias || "-"}
                </span>
            </InfoDisplay>
        </div>

        <div className="col-span-2">
            <InfoDisplay label="RD Bloqueio">
                {rdBloqueio}
            </InfoDisplay>
        </div>
        
        <div className="col-span-2">
            <InfoDisplay label="Proteções">
                <span className="text-xs md:text-sm text-gray-300 truncate w-full px-2" title={protecoes}>
                    {protecoes || "-"}
                </span>
            </InfoDisplay>
        </div>

    </section>
  );
}