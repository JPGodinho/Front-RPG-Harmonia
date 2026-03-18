"use client";

import { useRituais } from "../hooks/useRituais";
import { RitualModal } from "./ui/RitualModal";
import { RitualCard } from "./ui/RitualCard";
import { ModalFormRitual } from "./ui/ModalFormRitual";
interface RituaisViewProps {
  idFicha: string;
  peAtual: number;
  onGastarPE: (qtd: number) => void;
}

export function RituaisView({ idFicha, peAtual, onGastarPE }: RituaisViewProps) {

  const { 
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
  } = useRituais(idFicha);
  

  if (loading) return <div className="text-center py-10 text-gray-500 animate-pulse">Consultando o Grimório...</div>;
  if (rituais.length === 0) return <div className="text-center py-10 text-gray-500">Nenhum ritual aprendido.</div>;
  
  return (
    <div className="flex flex-col gap-3 pb-20 max-w-3xl mx-auto"> 
      {isAdmin &&

      <div className="flex items-center justify-between ml-1 mb-1">
            
            <button 
            onClick={() => { 
              setRitualEditar(undefined);
              setModalEdit(true)}}
              className="flex items-center gap-1 px-3 py-1 bg-harmonia-purple/20 hover:bg-harmonia-purple/40 border border-harmonia-purple text-harmonia-purple rounded text-[10px] uppercase font-bold transition-all active:scale-95"
              >
            Adicionar
            </button>
        </div>
      }
      
      {rituais.map((ritual, idx) => (
        <RitualCard
          key={idx} 
          ritual={ritual} 
          onUsar={() => setRitualParaConjurar(ritual)} 
          onEdit={() => handleEditRitual(ritual)} 
        />
      ))}

      {ritualParaConjurar && (
        <RitualModal
          nomeRitual={ritualParaConjurar.nomeRitual}
          custoRitual={ritualParaConjurar.custoRitual} 
          peAtual={peAtual}
          onClose={() => setRitualParaConjurar(null)}
          onConfirmar={(custo) => {
            onGastarPE(custo);
            setRitualParaConjurar(null);
          }}
        />
      )}
      {modalEdit && (
        <div>
        <ModalFormRitual 
          idFicha={idFicha} 
          ritual={ritualEditar}
          onClose={() => {
            setModalEdit(false);
            setRitualEditar(undefined);
          }}
          onSuccess={() => {
            handleOnSucess()
          }} 
        />
        </div>
        )}
    </div>
  );
}
