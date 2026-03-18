import { RitualData } from "@/lib/types";
import { useEffect, useState } from "react";
import { buscarRituais } from "../[id]/actions";
import { getUserType } from "./use-from-cookies";

export function useRituais(idFicha: string) { 
    const [rituais, setRituais] = useState<RitualData[]>([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [ritualParaConjurar, setRitualParaConjurar] = useState<RitualData | null>(null);
    const [ritualEditar, setRitualEditar] = useState<RitualData | undefined>();

    const handleEditRitual = (ritual: RitualData) => {
        setModalEdit(true);
        setRitualEditar(ritual);
    }
    
    const handleOnSucess = () => {
        setRefetch(!refetch);
        setModalEdit(false);
    };

    useEffect(() => { 
        async function carregar() {
            const dados = await buscarRituais(idFicha);  
            if (dados) setRituais(dados);

            const userType = await getUserType();
            if (userType === 'MESTRE') setIsAdmin(true);

            setLoading(false);
        }

        carregar();
    }, [idFicha, refetch]);

    return {
        rituais,
        loading,
        ritualParaConjurar,
        modalEdit,
        ritualEditar,
        isAdmin,
        setRitualParaConjurar,
        setModalEdit,
        setRitualEditar,
        handleEditRitual,
        handleOnSucess
    }
}
