import { useState, useEffect } from "react";
import { InventarioData, AtaqueData } from "@/lib/types";
import { buscarInventario, buscarAtaques } from "@/app/ficha/[id]/actions";

export function useInventario(idFicha: string) {
	const [inventario, setInventario] = useState<InventarioData | null>(null);
	const [ataques, setAtaques] = useState<AtaqueData[]>([]);
	const [loading, setLoading] = useState(true);

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

	const getCorBarra = (inventario: InventarioData) => {
		const { atual, total } = inventario.carga;
		if (atual > total) return "bg-red-600 shadow-[0_0_10px_red]";
		if (atual === total) return "bg-harmonia-purple shadow-[0_0_10px_#E300FF]";
		return "bg-green-500 shadow-[0_0_10px_green]";
	};

	return {
		inventario,
		ataques,
		loading,
		setInventario,
		getCorBarra
	};
}