import { ItemData } from "@/lib/types";
import { useEffect, useState } from "react";
import { adicionarItemAoInventario, atualizarItemNoInventario, deletarItemDoInventario } from "../../[id]/actions";
import { Loader2, Trash2, X } from "lucide-react";

interface ModalFormProps {
    idFicha: string;
    itemInicial: ItemData | null;
    onClose: () => void;
    onSuccess: (item: ItemData) => void;
    onDeleteSuccess: () => void;
}

export function ModalFormItem({ idFicha, itemInicial, onClose, onSuccess, onDeleteSuccess }: ModalFormProps) {
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [form, setForm] = useState<ItemData>({
        nomeItem: itemInicial?.nomeItem || "",
        categoria: itemInicial?.categoria || "0",
        espacos: itemInicial?.espacos || 1,
        descricao: itemInicial?.descricao || ""
    });

    const isEditing = !!itemInicial;

    useEffect(() => {
        if (confirmDelete) {
            const timer = setTimeout(() => setConfirmDelete(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [confirmDelete]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        let sucesso = false;
        if (isEditing) {
            sucesso = await atualizarItemNoInventario(idFicha, itemInicial.nomeItem, form);
        } else {
            sucesso = await adicionarItemAoInventario(idFicha, form);
        }
        setLoading(false);
        if (sucesso) onSuccess(form);
        else alert(`Erro ao ${isEditing ? 'atualizar' : 'adicionar'} item.`);
    };

    const handleDelete = async () => {
        if (!isEditing) return;
        setLoading(true);
        const sucesso = await deletarItemDoInventario(idFicha, itemInicial.nomeItem);
        setLoading(false);
        if (sucesso) onDeleteSuccess();
        else alert("Erro ao deletar item.");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0d0d0d] border border-gray-700 w-full max-w-md rounded-xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#151515]">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                        {isEditing ? `Editar: ${itemInicial.nomeItem}` : "Novo Item"}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Nome do Item</label>
                        <input required type="text" className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none transition-colors" placeholder="Ex: Revólver" value={form.nomeItem} onChange={e => setForm({...form, nomeItem: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Categoria</label>
                            <select className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
                                <option value="0">0</option> <option value="I">I</option> <option value="II">II</option> <option value="III">III</option> <option value="IV">IV</option> <option value="V">V</option> <option value="VI">VI</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Espaços</label>
                            <input required type="number" min="0" className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none" value={form.espacos} onChange={e => setForm({...form, espacos: Number(e.target.value)})} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Descrição</label>
                        <textarea required rows={3} className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none resize-none" placeholder="Descrição do item..." value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        {isEditing && (
                            <button type="button" onClick={() => { if (confirmDelete) handleDelete(); else setConfirmDelete(true); }} disabled={loading} className={`px-4 rounded font-bold transition-all flex items-center justify-center ${confirmDelete ? "bg-red-600 hover:bg-red-700 text-white w-full" : "bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"}`}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : (confirmDelete ? "Confirmar?" : <Trash2 size={20} />)}
                            </button>
                        )}
                        <button type="submit" disabled={loading} className="flex-1 bg-harmonia-purple hover:bg-purple-700 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (isEditing ? "Salvar" : "Criar")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}