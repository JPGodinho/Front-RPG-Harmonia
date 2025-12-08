import { InfoDisplay } from "@/components/ui/InfoDisplay";
import { User } from "lucide-react";

interface InfoPersonagemProps {
  nome: string;
  idade: string;
  nex: string;
  peRodada: number;
  origem: string;
  classe: string;
  trilha: string;
  elemento?: string;
}

export function InfoPersonagem({ 
  nome, idade, nex, peRodada, origem, classe, trilha, elemento 
}: InfoPersonagemProps) {

  return (
    <section className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
      
      <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center text-black shrink-0 border-2 border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <User size={50} />
      </div>

      <div className="flex-1 w-full grid grid-cols-4 gap-y-6 gap-x-2 text-center md:text-left">
        
        <div className="col-span-2 md:col-span-1">
          <InfoDisplay label="Personagem">{nome}</InfoDisplay>
        </div>
        <div className="col-span-1">
          <InfoDisplay label="Idade">{idade}</InfoDisplay>
        </div>
        <div className="col-span-1">
          <InfoDisplay label="NEX">{nex}</InfoDisplay>
        </div>
        <div className="col-span-1 hidden md:block"> 
            <InfoDisplay label="PE/Rodada">{peRodada}</InfoDisplay>
        </div>
        <div className="col-span-2 md:hidden text-center md:text-left">
            <InfoDisplay label="PE/Rodada">{peRodada}</InfoDisplay>
        </div>

        <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <InfoDisplay label="Origem">{origem}</InfoDisplay>
        </div>
        
        <div className="col-span-4 md:col-span-3">
           <InfoDisplay label="Classe, Trilha e Afinidade">
              {classe} de {trilha} - <span className="text-harmonia-purple font-bold">{elemento}</span>
           </InfoDisplay>
        </div>

      </div>
    </section>
  );
}