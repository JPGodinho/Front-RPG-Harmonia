"use client";
import { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { EtapaAtributos, ATRIBUTO_MIN, ATRIBUTO_MAX, PericiaPayload } from "./types-criar-agente";

interface EtapaAtributosProps {
  dados: Partial<EtapaAtributos>;
  nex: number;
  onSubmit: (dados: EtapaAtributos) => Promise<void>;
  onBack: () => void;
}

type AtributoKey = keyof Omit<EtapaAtributos, "pericias">;

// Dicionário com todas as perícias padrão do sistema
const PERICIAS_BASE: Record<AtributoKey, string[]> = {
  agilidade: ["Acrobacia", "Crime", "Furtividade", "Iniciativa", "Pilotagem", "Pontaria", "Reflexos"],
  forca: ["Atletismo", "Luta"],
  intelecto: ["Atualidades", "Ciências", "Investigação", "Medicina", "Ocultismo", "Profissão", "Sobrevivência", "Tática", "Tecnologia"],
  presenca: ["Adestramento", "Artes", "Diplomacia", "Enganação", "Intimidação", "Intuição", "Percepção", "Religião", "Vontade"],
  vigor: ["Fortitude"]
};

// Gera o estado inicial vazio das perícias para o JSON
const gerarPericiasIniciais = (): Record<string, PericiaPayload[]> => {
  const state: Record<string, PericiaPayload[]> = {};
  for (const [attr, skills] of Object.entries(PERICIAS_BASE)) {
    state[attr] = skills.map(nome => ({ nome, treino: 0, bonusPonto: 0, bonusDescricao: null }));
  }
  return state;
};

const ATRIBUTOS: { key: AtributoKey; label: string; descricao: string; cor: string; bgCor: string; sombra: string }[] = [
  { key: "agilidade", label: "Agilidade", descricao: "Reflexos, esquiva e precisão.", cor: "text-cyan-400", bgCor: "bg-cyan-400", sombra: "shadow-[0_0_15px_rgba(34,211,238,0.5)]" },
  { key: "forca", label: "Força", descricao: "Poder físico e combate corpo a corpo.", cor: "text-orange-500", bgCor: "bg-orange-500", sombra: "shadow-[0_0_15px_rgba(249,115,22,0.5)]" },
  { key: "intelecto", label: "Intelecto", descricao: "Conhecimento e investigação.", cor: "text-yellow-400", bgCor: "bg-yellow-400", sombra: "shadow-[0_0_15px_rgba(250,204,21,0.5)]" },
  { key: "presenca", label: "Presença", descricao: "Carisma, liderança e rituais.", cor: "text-harmonia-purple", bgCor: "bg-harmonia-purple", sombra: "shadow-[0_0_15px_rgba(227,0,255,0.5)]" },
  { key: "vigor", label: "Vigor", descricao: "Saúde e pontos de vida.", cor: "text-green-500", bgCor: "bg-green-500", sombra: "shadow-[0_0_15px_rgba(34,197,94,0.5)]" },
];

export default function EtapaAtributosPersonagem({ dados, nex, onSubmit, onBack }: EtapaAtributosProps) {
  const [form, setForm] = useState<EtapaAtributos>({
    agilidade: 1,
    forca: 1,
    intelecto: 1,
    presenca: 1,
    vigor: 1,
    pericias: dados.pericias || gerarPericiasIniciais(),
    ...dados,
  });
  
  const [loading, setLoading] = useState(false);
  const [expandedAttr, setExpandedAttr] = useState<AtributoKey | null>(null);

  const incrementar = (key: AtributoKey) => {
    if (form[key] >= ATRIBUTO_MAX) return;
    setForm((prev) => ({ ...prev, [key]: (prev[key] as number) + 1 }));
  };

  const decrementar = (key: AtributoKey) => {
    if (form[key] <= ATRIBUTO_MIN) return;
    setForm((prev) => ({ ...prev, [key]: (prev[key] as number) - 1 }));
  };

  const atualizarPericia = (attrKey: AtributoKey, index: number, campo: keyof PericiaPayload, valor: any) => {
    setForm(prev => {
      const novasPericias = { ...prev.pericias };
      novasPericias[attrKey] = [...novasPericias[attrKey]];
      novasPericias[attrKey][index] = { ...novasPericias[attrKey][index], [campo]: valor };
      return { ...prev, pericias: novasPericias };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <p className="text-gray-500 text-xs mt-1">Distribua pontos e clique no atributo para treinar as perícias (+5, +10...).</p>
      </div>

      <div className="flex flex-col gap-3">
        {ATRIBUTOS.map((attr) => {
          const valor = form[attr.key] as number;
          const isExpanded = expandedAttr === attr.key;
          const listaPericias = form.pericias[attr.key] || [];

          return (
            <div key={attr.key} className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden transition-colors">
              
              {/* CABEÇALHO DO ATRIBUTO */}
              <div className="p-4 flex items-center gap-4 group hover:border-gray-700 cursor-pointer" onClick={() => setExpandedAttr(isExpanded ? null : attr.key)}>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-bold shrink-0 transition-all duration-300 ${valor > 1 ? `${attr.bgCor} border-transparent text-[#1a1a1a] ${attr.sombra}` : `border-gray-700 text-gray-500 bg-transparent`}`}>
                  {valor}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${attr.cor}`}>{attr.label}</span>
                    {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight mb-2">{attr.descricao}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                  <button type="button" onClick={() => decrementar(attr.key)} disabled={valor <= ATRIBUTO_MIN} className="w-9 h-9 rounded-full border border-gray-600 text-gray-300 flex justify-center items-center font-bold disabled:border-gray-800 disabled:text-gray-700 hover:bg-white/5 active:scale-90 transition-all">−</button>
                  <button type="button" onClick={() => incrementar(attr.key)} disabled={valor >= ATRIBUTO_MAX} className={`w-9 h-9 rounded-full border border-current ${attr.cor} flex justify-center items-center font-bold disabled:border-gray-800 disabled:text-gray-700 hover:bg-white/5 active:scale-90 transition-all`}>+</button>
                </div>
              </div>

              {/* LISTA DE PERÍCIAS (EXPANSÍVEL) */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-800/50 bg-[#141414] animate-in slide-in-from-top-2">
                  <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Perícia</span>
                    <div className="flex gap-4">
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider w-24 text-center">Treino</span>
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider w-16 text-center">Bônus</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {listaPericias.map((pericia, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-black/40 rounded p-2 border border-gray-800/50">
                        <span className="text-sm font-bold text-gray-300">{pericia.nome}</span>
                        
                        <div className="flex gap-4 items-center">
                          {/* Select de Treino (0, 5, 10, 15) */}
                          <select 
                            value={pericia.treino}
                            onChange={(e) => atualizarPericia(attr.key, idx, "treino", Number(e.target.value))}
                            className="w-24 bg-[#1a1a1a] text-xs border border-gray-700 text-gray-300 rounded p-1.5 outline-none focus:border-harmonia-purple"
                          >
                            <option value={0}>Destreinado</option>
                            <option value={5}>Treinado (+5)</option>
                            <option value={10}>Veterano (+10)</option>
                            <option value={15}>Expert (+15)</option>
                          </select>

                          {/* Input de Bônus Extra (itens, origens) */}
                          <div className="relative">
                            <span className="absolute left-2 top-1.5 text-gray-500 text-xs">+</span>
                            <input 
                              type="number" 
                              min="0"
                              value={pericia.bonusPonto}
                              onChange={(e) => atualizarPericia(attr.key, idx, "bonusPonto", Number(e.target.value))}
                              className="w-16 bg-[#1a1a1a] text-xs border border-gray-700 text-gray-300 rounded p-1.5 pl-5 outline-none focus:border-harmonia-purple text-center"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-4">
        <button type="button" onClick={onBack} disabled={loading} className="flex items-center justify-center gap-2 h-12 px-5 rounded-lg font-bold border border-gray-700 text-gray-400 hover:text-white transition-all disabled:opacity-50">
          <ChevronLeft size={18} /> Voltar
        </button>
        <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center justify-center gap-2 flex-1 h-12 rounded-lg font-bold bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50">
          {loading ? <><Loader2 className="animate-spin" size={18} /> Criando agente...</> : "✦ Finalizar Criação"}
        </button>
      </div>
    </div>
  );
}