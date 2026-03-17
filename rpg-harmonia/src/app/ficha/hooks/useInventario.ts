import { useState, useEffect } from "react";
import { InventarioData, AtaqueData, ItemData } from "@/lib/types";
import { buscarInventario, buscarAtaques } from "@/app/ficha/[id]/actions";

export function useInventario(idFicha: string) {
	const [inventario, setInventario] = useState<InventarioData | null>(null);
	const [ataques, setAtaques] = useState<AtaqueData[]>([]);
	const [loading, setLoading] = useState(true);
	const [modalAberto, setModalAberto] = useState(false);
  	const [itemParaEditar, setItemParaEditar] = useState<ItemData | null>(null);

	useEffect(() => {
		let ativo = true;

		async function carregar() {
			setLoading(true);

			const [dadosInv, dadosAtq] = await Promise.all([
				buscarInventario(idFicha),
				buscarAtaques(idFicha),
			]);

			if (!ativo) return;

			if (dadosInv) setInventario(dadosInv);
			if (dadosAtq) setAtaques(dadosAtq);

			setLoading(false);
		}

		carregar();

		return () => {
			ativo = false;
		};
	}, [idFicha]);

	const handleCreateSuccess = (novoItem: ItemData) => {
    setInventario(prev => {
        if (!prev) return null;
        return {
            ...prev,
            carga: { ...prev.carga, atual: prev.carga.atual + novoItem.espacos },
            itens: [...prev.itens, novoItem]
        };
    });
    setModalAberto(false);
  };

  const handleDeleteSuccess = (nomeItem: string) => {
    setInventario(prev => {
        if (!prev) return null;
        const itemRemovido = prev.itens.find(i => i.nomeItem === nomeItem);
        const pesoRemovido = itemRemovido ? itemRemovido.espacos : 0;
        const novaLista = prev.itens.filter(i => i.nomeItem !== nomeItem);
        return {
            ...prev,
            carga: { ...prev.carga, atual: prev.carga.atual - pesoRemovido },
            itens: novaLista
        };
    });
    setModalAberto(false);
    setItemParaEditar(null);
  };

  const handleEditSuccess = (nomeOriginal: string, itemAtualizado: ItemData) => {
    setInventario(prev => {
        if (!prev) return null;
        const itemAntigo = prev.itens.find(i => i.nomeItem === nomeOriginal);
        const pesoAntigo = itemAntigo ? itemAntigo.espacos : 0;
        const novaLista = prev.itens.map(i => i.nomeItem === nomeOriginal ? itemAtualizado : i);
        return {
            ...prev,
            carga: { ...prev.carga, atual: prev.carga.atual - pesoAntigo + itemAtualizado.espacos },
            itens: novaLista
        };
    });
    setModalAberto(false);
    setItemParaEditar(null);
  };

	return {
		inventario,
		ataques,
		loading,
		modalAberto,
		itemParaEditar,
		setModalAberto,
		setItemParaEditar,
		handleCreateSuccess,
		handleEditSuccess,
		handleDeleteSuccess
	};
}