import { RitualData } from "@/lib/types";
import { useEffect, useState } from "react";
import { buscarRituais } from "../[id]/actions";

export function useRituais(idFicha: string) { 
    const [rituais, setRituais] = useState<RitualData[]>([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [ritualParaConjurar, setRitualParaConjurar] = useState<RitualData | null>(null);

    useEffect(() => { 
        async function carregar() {
            const dados = await buscarRituais(idFicha);  
            if (dados) setRituais(dados);
            setLoading(false);
        }

        carregar();
    }, [idFicha, refetch]);

    return {
        rituais,
        loading,
        ritualParaConjurar,
        refetch,
        setRefetch,
        setRitualParaConjurar
    }
}
