"use client";
import { User, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { InfoDisplay } from "@/components/ui/InfoDisplay";
import Link from "next/link";

interface CharacterCardProps {
  id: string;
  nome: string;
  campanha: string;
  criadoEm: string;
}

export function CharacterCard({ id, nome, campanha, criadoEm }: CharacterCardProps) {

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 hover:border-harmonia-purple/50 transition-colors group">
      
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center text-black shrink-0 border-2 border-gray-600 group-hover:border-harmonia-purple transition-colors shadow-lg">
          <User size={32} className="md:w-10 md:h-10" />
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <div className="flex flex-wrap gap-4 md:gap-8">
            <InfoDisplay label="Personagem">
              <span className="truncate block max-w-[140px] md:max-w-[200px]">{nome}</span>
            </InfoDisplay>
            
            <InfoDisplay label="Campanha">
              <span className="uppercase">{campanha}</span>
            </InfoDisplay>
          </div>

          <div className="text-xs md:text-sm text-gray-400">
            Criado em: <span className="text-white ml-1">{criadoEm}</span>
          </div>
        </div>

      </div>

      <div className="w-full md:w-auto shrink-0">
        <Link href={`/ficha/${id}`} className="w-full md:w-auto">
          <Button 
            variant="primary" 
            className="w-full md:w-auto gap-2 px-6 text-sm md:text-base"
          >
            Acessar
            <ArrowUpRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}