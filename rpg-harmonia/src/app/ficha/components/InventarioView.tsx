"use client";
import { useState, useEffect } from "react";
import { InventarioData, ItemData } from "@/lib/types";
import { buscarInventario, adicionarItemAoInventario, atualizarItemNoInventario, deletarItemDoInventario } from "../[id]/actions"; 
import { Package, Medal, CreditCard, Briefcase, Plus, X, Loader2, Pencil, Trash2 } from "lucide-react";

interface InventarioViewProps {
  idFicha: string;
}

export function InventarioView({ idFicha }: InventarioViewProps) {
  const [inventario, setInventario] = useState<InventarioData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Controle do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [itemParaEditar, setItemParaEditar] = useState<ItemData | null>(null);

  async function carregar() {
    if (!inventario) setLoading(true);
    const dados = await buscarInventario(idFicha);
    if (dados) setInventario(dados);
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, [idFicha]);

  if (loading && !inventario) return <div className="text-center py-10 text-gray-500 animate-pulse">Verificando equipamentos...</div>;
  if (!inventario) return <div className="text-center py-10 text-gray-500">Inventário vazio ou inacessível.</div>;

  const patenteFormatada = inventario.patente.replace(/_/g, " ").toLowerCase();

  const getCorBarra = () => {
    const { atual, total } = inventario.carga;
    if (atual > total) return "bg-red-600 shadow-[0_0_10px_red]";
    if (atual === total) return "bg-harmonia-purple shadow-[0_0_10px_#E300FF]";
    return "bg-green-500 shadow-[0_0_10px_green]";
  };

  // --- LÓGICA DE ATUALIZAÇÃO LOCAL (OTIMISTA) ---
  
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
    buscarInventario(idFicha); 
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
    buscarInventario(idFicha); 
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
    buscarInventario(idFicha);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. STATUS E CARGA */}
      <section className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 md:p-5 shadow-lg">
        <div className="mb-5">
          <div className="flex justify-between items-end mb-2">
            <span className="text-white font-bold flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
              <Package size={16} className="text-gray-400" /> Capacidade de Carga
            </span>
            <span className="text-gray-400 font-mono text-xs md:text-sm">
              <span className="text-white font-bold text-base md:text-lg">{inventario.carga.atual}</span>/{inventario.carga.total}
            </span>
          </div>
          <div className="w-full h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
             <div 
               className={`h-full transition-all duration-500 ${getCorBarra()}`}
               style={{ width: `${Math.min((inventario.carga.atual / inventario.carga.total) * 100, 100)}%` }}
             />
          </div>
          {inventario.carga.atual > inventario.carga.total && (
            <p className="text-red-500 text-[10px] mt-1 text-center font-bold uppercase animate-pulse">Sobrecarregado</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-gray-700 pt-4">
           <InfoItem icon={<Medal size={14} className="text-yellow-500" />} label="Patente" valor={patenteFormatada} capitalize />
           <InfoItem icon={<Briefcase size={14} className="text-blue-500" />} label="Prestígio" valor={inventario.pontosDePrestigio} />
           <InfoItem icon={<CreditCard size={14} className="text-green-500" />} label="Crédito" valor={inventario.limiteCreditos} />
        </div>
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

      {/* 3. LISTA DE ITENS */}
      <section className="flex flex-col gap-3">
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

        {inventario.itens.map((item, idx) => (
          <ItemCard 
            key={idx} 
            item={item} 
            onEdit={() => {
                setItemParaEditar(item);
                setModalAberto(true);
            }} 
          />
        ))}
        {inventario.itens.length === 0 && (
          <div className="text-center py-10 border border-dashed border-gray-800 rounded-xl text-gray-600">
            Mochila vazia.
          </div>
        )}
      </section>

      {/* MODAL DE FORMULÁRIO */}
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

// --- MODAL GENÉRICO (CRIAR, EDITAR E DELETAR) ---
interface ModalFormProps {
    idFicha: string;
    itemInicial: ItemData | null;
    onClose: () => void;
    onSuccess: (item: ItemData) => void;
    onDeleteSuccess: () => void;
}

function ModalFormItem({ idFicha, itemInicial, onClose, onSuccess, onDeleteSuccess }: ModalFormProps) {
    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [form, setForm] = useState<ItemData>({
        nomeItem: itemInicial?.nomeItem || "",
        categoria: itemInicial?.categoria || "0",
        espacos: itemInicial?.espacos || 1,
        descricao: itemInicial?.descricao || ""
    });

    const isEditing = !!itemInicial;

    // Reset confirmação se fechar/abrir
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
                    
                    {/* Nome */}
                    <div>
                        <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Nome do Item</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none transition-colors"
                            placeholder="Ex: Revólver"
                            value={form.nomeItem}
                            onChange={e => setForm({...form, nomeItem: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Categoria */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Categoria</label>
                            <select 
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none"
                                value={form.categoria}
                                onChange={e => setForm({...form, categoria: e.target.value})}
                            >
                                <option value="0">0</option>
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                                <option value="V">V</option>
                                <option value="VI">VI</option>
                            </select>
                        </div>

                        {/* Espaços */}
                        <div>
                            <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Espaços</label>
                            <input 
                                required
                                type="number" 
                                min="0"
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none"
                                value={form.espacos}
                                onChange={e => setForm({...form, espacos: Number(e.target.value)})}
                            />
                        </div>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-xs text-gray-500 uppercase font-bold mb-1">Descrição</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white focus:border-harmonia-purple outline-none resize-none"
                            placeholder="Descrição do item..."
                            value={form.descricao}
                            onChange={e => setForm({...form, descricao: e.target.value})}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        {/* Botão de Deletar (Só aparece na edição) */}
                        {isEditing && (
                            <button 
                                type="button"
                                onClick={() => {
                                    if (confirmDelete) handleDelete();
                                    else setConfirmDelete(true);
                                }}
                                disabled={loading}
                                className={`
                                    px-4 rounded font-bold transition-all flex items-center justify-center
                                    ${confirmDelete 
                                        ? "bg-red-600 hover:bg-red-700 text-white w-full" 
                                        : "bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"}
                                `}
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                    confirmDelete ? "Confirmar Exclusão?" : <Trash2 size={20} />
                                )}
                            </button>
                        )}

                        {/* Botão Salvar */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 bg-harmonia-purple hover:bg-purple-700 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (isEditing ? "Salvar" : "Criar")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTES AUXILIARES (INFO ITEM, LIMITE BOX, ITEM CARD) ---
// (MANTIDOS IGUAIS AO CÓDIGO ANTERIOR, NÃO PRECISA ALTERAR)

function InfoItem({ icon, label, valor, capitalize = false }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-black/20 rounded-lg h-full">
      <div className="flex items-center gap-1.5 mb-1 text-gray-400 text-[9px] md:text-[10px] uppercase font-bold text-center">
        {icon} <span className="hidden md:inline">{label}</span> <span className="md:hidden">{label.slice(0,3)}.</span>
      </div>
      <span className={`text-white font-bold text-center text-xs md:text-sm leading-tight ${capitalize ? 'capitalize' : ''}`}>
        {valor}
      </span>
    </div>
  );
}

function LimiteBox({ cat, valor }: { cat: string, valor: number }) {
  const ativo = valor > 0;
  return (
    <div className={`
      flex flex-col items-center justify-center w-full aspect-square md:aspect-auto md:h-14 rounded border 
      ${ativo ? 'bg-[#1a1a1a] border-gray-600' : 'bg-[#121212] border-gray-800 opacity-40'}
    `}>
      <span className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold">Cat {cat}</span>
      <span className={`text-base md:text-xl font-bold ${ativo ? 'text-white' : 'text-gray-700'}`}>{valor}</span>
    </div>
  );
}

function ItemCard({ item, onEdit }: { item: ItemData; onEdit: () => void }) {
  const [expandido, setExpandido] = useState(false);
  const isPrestigio = item.categoria !== "0";
  const borderClass = isPrestigio ? "border-yellow-600/50 hover:border-yellow-500" : "border-gray-800 hover:border-gray-600";

  return (
    <div className={`bg-[#1a1a1a] rounded-xl border transition-all duration-300 overflow-hidden ${expandido ? 'border-gray-500 shadow-lg' : borderClass}`}>
      <div 
        onClick={() => setExpandido(!expandido)}
        className="p-3 md:p-4 flex items-center justify-between gap-3 cursor-pointer relative group"
      >
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <span className="text-xl font-light text-gray-500 w-4 flex justify-center shrink-0 select-none">
             {expandido ? "×" : "+"}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-sm md:text-base font-bold text-white truncate">{item.nomeItem}</span>
            <div className="flex gap-2 mt-0.5">
              {item.categoria !== "0" && (
                <span className="text-[9px] bg-yellow-900/40 text-yellow-500 border border-yellow-700/50 px-1.5 rounded uppercase font-bold tracking-wider">
                  Cat {item.categoria}
                </span>
              )}
              {item.espacos > 0 && (
                <span className="text-[9px] bg-gray-800 text-gray-400 border border-gray-700 px-1.5 rounded uppercase font-bold tracking-wider">
                  {item.espacos} {item.espacos === 1 ? 'Esp' : 'Esp'}
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
            onClick={(e) => {
                e.stopPropagation();
                onEdit();
            }}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100"
        >
            <Pencil size={16} />
        </button>
      </div>

      {expandido && (
        <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2 duration-300">
           <div className="h-px w-full bg-gray-800 mb-3" />
           <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed text-justify">
             {item.descricao}
           </p>
        </div>
      )}
    </div>
  );
}