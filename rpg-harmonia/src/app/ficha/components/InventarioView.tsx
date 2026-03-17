"use client";

import { useInventario } from "../hooks/useInventario";
import { ItemCard } from "./ui/ItemCard";
import { ModalFormItem } from "./ui/ModalFormItem";
import { Plus } from "lucide-react";
import { LimiteBox } from "./ui/LimiteBox";
import { CapacidadeStatus } from "./ui/CapacidadeStatus";

interface Props {
  idFicha: string;
}

export function InventarioView({ idFicha }: Props) {

  const {
    inventario,
    ataques,
    loading,
    itemParaEditar,
    modalAberto,
    setModalAberto,
    setItemParaEditar,
    handleCreateSuccess,
    handleDeleteSuccess,
    handleEditSuccess,
  } = useInventario(idFicha);

  if (loading && !inventario) 
    return <div className="text-center py-10 text-gray-500 animate-pulse">Verificando equipamentos...</div>;
  if (!inventario) 
    return <div className="text-center py-10 text-gray-500">Inventário vazio ou inacessível.</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. STATUS E CARGA */}
      <section className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 md:p-5 shadow-lg">
        <CapacidadeStatus inventario={inventario} />
      </section>

      {/* 2. LIMITES */}
      <section className="w-full">
        <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-bold ml-1 mb-2">Limites por Categoria</h3>
        <div className="grid grid-cols-6 gap-1 md:gap-2">
          <LimiteBox cat="I" valor={inventario.limiteItens.categoriaI} />
          <LimiteBox cat="II" valor={inventario.limiteItens.categoriaII} />
          <LimiteBox cat="III" valor={inventario.limiteItens.categoriaIII} />
          <LimiteBox cat="IV" valor={inventario.limiteItens.categoriaIV} />
          <LimiteBox cat="V" valor={inventario.limiteItens.categoriaV} />
          <LimiteBox cat="VI" valor={inventario.limiteItens.categoriaVI} />
        </div>
      </section>

      <div className="flex items-center justify-between ml-1 mb-1">
        <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Equipamentos</h3>
        <button 
          onClick={() => {
              setItemParaEditar(null); 
              setModalAberto(true);
          }}
          className="flex items-center gap-1 px-3 py-1 bg-harmonia-purple/20 hover:bg-harmonia-purple/40 border border-harmonia-purple text-harmonia-purple rounded text-[10px] uppercase font-bold transition-all active:scale-95"
        >
          <Plus size={12} /> Adicionar
        </button>
      </div>

      {/* 3. ITENS*/}
      {inventario.itens.map((item) => {
        const ataqueCorrespondente = ataques.find(atq => atq.nome === item.nomeItem);
        
        return (
          <ItemCard
            key={item.nomeItem}
            item={item}
            ataque={ataqueCorrespondente}
            onEdit={() => {
              setItemParaEditar(item);
              setModalAberto(true);
            }}
          />
        );
      })}

      {modalAberto && (
        <ModalFormItem
          idFicha={idFicha}
          itemInicial={itemParaEditar}
          onClose={() => {
            setModalAberto(false);
            setItemParaEditar(null);
          }}
          onSuccess={(item) => {
                if (itemParaEditar) handleEditSuccess(itemParaEditar.nomeItem, item);
                else handleCreateSuccess(item);
            }}
            onDeleteSuccess={() => {
                if(itemParaEditar) handleDeleteSuccess(itemParaEditar.nomeItem);
            }}
        />
      )}

    </div>
  );
}