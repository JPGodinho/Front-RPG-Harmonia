import { RitualData, TipoElemento } from "@/lib/types";
import { useEffect, useState } from "react";
import { adicionarRitual, atualizarRitual, deletarRitual } from "../../[id]/actions";
import { Loader2, Trash2, X } from "lucide-react";

interface ModalFormProps {
  idFicha: string;
  ritual: RitualData | undefined;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalFormRitual({
  idFicha,
  ritual,
  onClose,
  onSuccess, 
}: ModalFormProps) {
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [form, setForm] = useState<RitualData>({
    idRitual: ritual?.idRitual,
    nomeRitual: ritual?.nomeRitual || "",
    alcance: ritual?.alcance || "",
    alvo: ritual?.alvo || "",
    circulo: ritual?.circulo || 0,
    custoRitual: ritual?.custoRitual || {
      normal: 0,
      verdadeiro: 0,
      discente: 0,
    },
    danoSanidade: ritual?.danoSanidade || 0,
    descricao: ritual?.descricao || "",
    dtRitual: ritual?.dtRitual || 0,
    duracao: ritual?.duracao || "",
    execucao: ritual?.execucao || "",
    resistencia: ritual?.resistencia || "",
    tipoElemento: ritual?.tipoElemento || "MORTE",
  });

  const isEditing = !!ritual;

    useEffect(() => {
        if (confirmDelete) {
        const timer = setTimeout(() => setConfirmDelete(false), 3000);
        return () => clearTimeout(timer);
        }
    }, [confirmDelete]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let sucesso;

        if (ritual === undefined) {
          sucesso = await adicionarRitual(idFicha, form); //adiciona ritual
        } else {
          sucesso = await atualizarRitual(idFicha, form);
        }

        setLoading(false);

        if (sucesso) onSuccess();
        else alert(`Erro ao ${isEditing ? "atualizar" : "adicionar"} ritual.`);
    };

    const handleDelete = async () => {
        if (!isEditing) return;

        setLoading(true);
        const sucesso = await deletarRitual(idFicha, form);
        setLoading(false);

        if (sucesso) onSuccess();
        else alert("Erro ao deletar ritual.");
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d0d0d] border border-gray-700 w-full max-w-lg rounded-xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#151515]">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            {isEditing ? `Editar: ${ritual?.nomeRitual}` : "Novo Ritual"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

          {/* Nome */}
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold">
              Nome do Ritual
            </label>
            <input
              required
              type="text"
              value={form.nomeRitual}
              onChange={(e) =>
                setForm({ ...form, nomeRitual: e.target.value })
              }
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
            />
          </div>

          {/* Elemento e Circulo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">
                Elemento
              </label>
              <select
                value={form.tipoElemento}
                onChange={(e) =>
                  setForm({ ...form, tipoElemento: e.target.value as TipoElemento })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
              >
                <option value="MORTE">Morte</option>
                <option value="ENERGIA">Energia</option>
                <option value="SANGUE">Sangue</option>
                <option value="CONHECIMENTO">Conhecimento</option>
                <option value="MEDO">Medo</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">
                Círculo
              </label>
              <input
                type="number"
                min="0"
                value={form.circulo}
                onChange={(e) =>
                  setForm({ ...form, circulo: Number(e.target.value) })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
              />
            </div>
          </div>

          {/* Execução e Alcance */}
          <div className="grid grid-cols-2 gap-4"> 
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Execução
                </label>
                <input
                placeholder="Execução"
                value={form.execucao}
                onChange={(e) =>
                    setForm({ ...form, execucao: e.target.value })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
                 
            </div>
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Alcance
                </label>
                <input
                placeholder="Alcance"
                value={form.alcance}
                onChange={(e) =>
                    setForm({ ...form, alcance: e.target.value })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>   
          </div>

          {/* Alvo e Duração */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Alvo
                </label>
                <input
                placeholder="Alvo"
                value={form.alvo}
                onChange={(e) =>
                    setForm({ ...form, alvo: e.target.value })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Duração
                </label>
                <input
                placeholder="Duração"
                value={form.duracao}
                onChange={(e) =>
                    setForm({ ...form, duracao: e.target.value })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>

            {/* Resistência */}
            <div className="flex flex-col col-span-2">
              <label className="text-xs text-gray-500 uppercase font-bold">
                  Resistência
              </label>
              <input
                  placeholder="Resistência"
                  value={form.resistencia}
                  onChange={(e) =>
                      setForm({ ...form, resistencia: e.target.value })
                  }
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                  />
            </div>
          </div>
          <div>
            <h1 className="text-xs text-gray-500 uppercase font-bold"></h1>
          </div>
          {/* Custo Ritual */}
          <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Normal (PE)
                </label>
                <input
                type="number"
                placeholder="Normal"
                value={form.custoRitual.normal}
                onChange={(e) =>
                    setForm({
                        ...form,
                        custoRitual: {
                            ...form.custoRitual,
                            normal: Number(e.target.value),
                        },
                    })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Discente (PE)
                </label>
                <input
                type="number"
                placeholder="Discente"
                value={form.custoRitual.discente}
                onChange={(e) =>
                    setForm({
                    ...form,
                    custoRitual: {
                        ...form.custoRitual,
                        discente: Number(e.target.value),
                    },
                    })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold">
                    Verdadeiro (PE)
                </label>
                <input
                type="number"
                placeholder="Verdadeiro"
                value={form.custoRitual.verdadeiro}
                onChange={(e) =>
                    setForm({
                    ...form,
                    custoRitual: {
                        ...form.custoRitual,
                        verdadeiro: Number(e.target.value),
                    },
                    })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold">
                Descrição
            </label>
            <textarea
                rows={3}
                value={form.descricao}
                onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                }
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-2 text-white"
                />
            </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            {isEditing && (
              <button
                type="button"
                onClick={() =>
                  confirmDelete ? handleDelete() : setConfirmDelete(true)
                }
                disabled={loading}
                className={`px-4 rounded font-bold ${
                  confirmDelete
                    ? "bg-red-600 text-white w-full"
                    : "bg-red-900/20 text-red-500 border border-red-900/50"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : confirmDelete ? (
                  "Confirmar?"
                ) : (
                  <Trash2 size={20} />
                )}
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-harmonia-purple text-white font-bold py-3 rounded"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isEditing ? (
                "Salvar"
              ) : (
                "Criar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}