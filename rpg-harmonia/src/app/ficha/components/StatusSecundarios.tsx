"use client";
import { InfoDisplay } from "@/components/ui/InfoDisplay";

interface StatusSecundariosProps {
  defesa?: number;
  deslocamento?: string;
  esquiva?: number;
  resistencias?: string;
  rdBloqueio?: number;
  protecoes?: string;
}

export function StatusSecundarios({
  defesa, deslocamento, esquiva, resistencias, rdBloqueio, protecoes
}: StatusSecundariosProps) {
  
  return (
    <section className="grid grid-cols-4 gap-y-6 gap-x-2 mb-5 text-center">
        
        <div className="col-span-1">
            <InfoDisplay label="Defesa">{defesa}</InfoDisplay>
        </div>
        <div className="col-span-1">
            <InfoDisplay label="Defesa Esquivando">{esquiva}</InfoDisplay>
        </div>
        <div className="col-span-1">
            <InfoDisplay label="Deslocamento">{deslocamento}</InfoDisplay>
        </div>
        <div className="col-span-1">
            <InfoDisplay label="Resistências">
                <span className="text-sm md:text-base font-bold">{resistencias}</span>
            </InfoDisplay>
        </div>

        <div className="col-span-2 text-center md:text-center pr-4 md:pr-0">
            <InfoDisplay label="Redução de Dano Bloqueando">
                {rdBloqueio}
            </InfoDisplay>
        </div>
        
        <div className="col-span-2 text-center md:text-center pl-4 md:pl-0">
            <InfoDisplay label="Proteções">
                <span className="text-sm font-bold">{protecoes}</span>
            </InfoDisplay>
        </div>

    </section>
  );
}