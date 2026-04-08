"use client";
import { useState } from "react";
import { ChevronRight, User, X } from "lucide-react";
import {
  EtapaBase,
  ClasseAPI,
  TipoElemento,
  CLASSES,
  TRILHAS,
  ORIGENS,
  ELEMENTOS,
  NEX_OPTIONS,
} from "./types-criar-agente";

interface EtapaBaseProps {
  dados: Partial<EtapaBase>;
  onNext: (dados: EtapaBase) => void;
}

const ELEMENTO_CORES: Record<TipoElemento, string> = {
  MORTE: "border-gray-500 text-gray-300 bg-gray-800/40",
  SANGUE: "border-red-600 text-red-300 bg-red-900/30",
  ENERGIA: "border-purple-500 text-purple-300 bg-purple-900/30",
  CONHECIMENTO: "border-yellow-500 text-yellow-300 bg-yellow-900/30",
  MEDO: "border-white/40 text-white bg-white/10",
};

const ELEMENTO_SELECTED: Record<TipoElemento, string> = {
  MORTE: "border-gray-300 bg-gray-700 text-white shadow-[0_0_12px_rgba(200,200,200,0.4)]",
  SANGUE: "border-red-500 bg-red-900 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]",
  ENERGIA: "border-purple-400 bg-purple-900 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]",
  CONHECIMENTO: "border-yellow-400 bg-yellow-900 text-white shadow-[0_0_12px_rgba(234,179,8,0.6)]",
  MEDO: "border-white bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.4)]",
};

const ELEMENTO_EMOJI: Record<TipoElemento, string> = {
  MORTE: "💀",
  SANGUE: "🩸",
  ENERGIA: "⚡",
  CONHECIMENTO: "📚",
  MEDO: "😱",
};

const inputClass =
  "w-full bg-transparent border border-gray-700 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600 text-sm";
const selectClass =
  "w-full bg-[#111] border border-gray-700 rounded-lg h-12 px-4 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white cursor-pointer text-sm";
const labelClass =
  "block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5";

// Só considera URL válida se começar com http:// ou https://
// Isso evita que o Next.js tente processar strings parciais e crasha
function isUrlValida(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function EtapaBasePersonagem({ dados, onNext }: EtapaBaseProps) {
  const classeInicial: ClasseAPI = dados.classe ?? "COMBATENTE";

  const [form, setForm] = useState<Partial<EtapaBase>>({
    personagem: "",
    imgPersonagem: "",
    idade: 25,
    nivelExposicao: 5,
    esforcoPorRodada: 2,
    origem: ORIGENS[0].value,
    classe: classeInicial,
    trilha: TRILHAS[classeInicial][0].value,
    afinidade: "MORTE",
    ...dados,
  });

  // Controla se a imagem no preview carregou com sucesso
  // null = ainda não tentou, true = carregou, false = erro
  const [imgStatus, setImgStatus] = useState<"idle" | "ok" | "error">("idle");

  const [errors, setErrors] = useState<Partial<Record<keyof EtapaBase, string>>>({});

  const set = <K extends keyof EtapaBase>(key: K, value: EtapaBase[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleUrlChange = (url: string) => {
    set("imgPersonagem", url);
    // Reseta o status sempre que a URL muda
    setImgStatus("idle");
  };

  const handleLimparImagem = () => {
    set("imgPersonagem", "");
    setImgStatus("idle");
  };

  const trilhasDisponiveis = TRILHAS[form.classe ?? "COMBATENTE"];

  const handleClasseChange = (classe: ClasseAPI) => {
    setForm((prev) => ({
      ...prev,
      classe,
      trilha: TRILHAS[classe][0].value,
    }));
  };

  const validate = (): boolean => {
    const erros: Partial<Record<keyof EtapaBase, string>> = {};
    if (!form.personagem?.trim()) erros.personagem = "Nome é obrigatório.";
    if (!form.origem) erros.origem = "Escolha uma origem.";
    if (!form.classe) erros.classe = "Escolha uma classe.";
    if (!form.trilha) erros.trilha = "Escolha uma trilha.";
    if (!form.afinidade) erros.afinidade = "Escolha um elemento.";
    setErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onNext(form as EtapaBase);
  };

  // Decide o que mostrar no preview
  const urlAtual = form.imgPersonagem || "";
  const mostrarPreview = isUrlValida(urlAtual) && imgStatus !== "error";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Imagem + Nome */}
      <div className="flex items-start gap-4">

        {/* Preview da imagem */}
        <div className="shrink-0">
          <label className={labelClass}>Foto</label>
          <div className="w-20 h-24 rounded-lg border-2 border-dashed border-gray-700 bg-[#111] flex items-center justify-center overflow-hidden relative">
            {mostrarPreview ? (
              <>
                {/*
                  Usamos <img> nativa (não next/image) porque:
                  - next/image exige que o domínio esteja em next.config.js
                  - next/image crasha com URLs inválidas antes do onError
                  - Aqui controlamos 100% quando renderizar via isUrlValida()
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlAtual}
                  alt="Preview do personagem"
                  className="w-full h-full object-cover"
                  onLoad={() => setImgStatus("ok")}
                  onError={() => setImgStatus("error")}
                />
                <button
                  type="button"
                  onClick={handleLimparImagem}
                  className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 text-white hover:bg-red-900 transition-colors"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-600">
                <User size={28} />
                {imgStatus === "error" && (
                  <span className="text-[8px] text-red-500 text-center px-1 leading-tight">
                    URL inválida
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div>
            <label className={labelClass}>Nome do Personagem *</label>
            <input
              type="text"
              className={`${inputClass} ${errors.personagem ? "border-red-500" : ""}`}
              placeholder="Como seu agente é chamado?"
              value={form.personagem || ""}
              onChange={(e) => set("personagem", e.target.value)}
            />
            {errors.personagem && (
              <p className="text-xs text-red-400 font-bold mt-1">{errors.personagem}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>URL da Imagem</label>
            <input
              type="text"
              className={inputClass}
              placeholder="https://..."
              value={urlAtual}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            {imgStatus === "error" && (
              <p className="text-xs text-red-400 font-bold mt-1">
                Não foi possível carregar esta imagem.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Idade + NEX + PE/Rodada */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Idade</label>
          <input
            type="number"
            min={1}
            max={120}
            className={inputClass}
            value={form.idade ?? 25}
            onChange={(e) => set("idade", Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass}>NEX (%)</label>
          <select
            className={selectClass}
            value={form.nivelExposicao ?? 5}
            onChange={(e) => set("nivelExposicao", Number(e.target.value))}
          >
            {NEX_OPTIONS.map((n) => (
              <option key={n} value={n} className="bg-[#111]">
                {n}%
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>PE / Rodada</label>
          <input
            type="number"
            min={1}
            max={20}
            className={inputClass}
            value={form.esforcoPorRodada ?? 2}
            onChange={(e) => set("esforcoPorRodada", Number(e.target.value))}
          />
        </div>
      </div>

      {/* Origem */}
      <div>
        <label className={labelClass}>Origem *</label>
        <select
          className={`${selectClass} ${errors.origem ? "border-red-500" : ""}`}
          value={form.origem ?? ""}
          onChange={(e) => set("origem", e.target.value as EtapaBase["origem"])}
        >
          {ORIGENS.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#111]">
              {o.label}
            </option>
          ))}
        </select>
        {errors.origem && (
          <p className="text-xs text-red-400 font-bold mt-1">{errors.origem}</p>
        )}
      </div>

      {/* Classe + Trilha */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Classe *</label>
          <select
            className={`${selectClass} ${errors.classe ? "border-red-500" : ""}`}
            value={form.classe ?? ""}
            onChange={(e) => handleClasseChange(e.target.value as ClasseAPI)}
          >
            {CLASSES.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#111]">
                {c.label}
              </option>
            ))}
          </select>
          {errors.classe && (
            <p className="text-xs text-red-400 font-bold mt-1">{errors.classe}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Trilha *</label>
          <select
            className={`${selectClass} ${errors.trilha ? "border-red-500" : ""}`}
            value={form.trilha ?? ""}
            onChange={(e) => set("trilha", e.target.value as EtapaBase["trilha"])}
          >
            {trilhasDisponiveis.map((t) => (
              <option key={t.value} value={t.value} className="bg-[#111]">
                {t.label}
              </option>
            ))}
          </select>
          {errors.trilha && (
            <p className="text-xs text-red-400 font-bold mt-1">{errors.trilha}</p>
          )}
        </div>
      </div>

      {/* Afinidade (Elemento) */}
      <div>
        <label className={labelClass}>Elemento / Afinidade *</label>
        <div className="grid grid-cols-5 gap-2">
          {ELEMENTOS.map((el) => {
            const selecionado = form.afinidade === el;
            const textSize = el === "CONHECIMENTO" ? "text-[7px] md:text-[10px]" : "text-[10px] md:text-[10px]";
            return (
              <button
                key={el}
                type="button"
                onClick={() => set("afinidade", el)}
                className={`
                  flex flex-col items-center justify-center py-3 px-1 rounded-lg border-2
                  ${textSize} font-bold uppercase tracking-wider
                  transition-all duration-200 hover:scale-105 active:scale-95
                  ${selecionado ? ELEMENTO_SELECTED[el] : ELEMENTO_CORES[el]}
                `}
              >
                <span className="text-lg mb-1">{ELEMENTO_EMOJI[el]}</span>
                {el}
              </button>
            );
          })}
        </div>
        {errors.afinidade && (
          <p className="text-xs text-red-400 font-bold mt-1">{errors.afinidade}</p>
        )}
      </div>

      {/* Botão */}
      <button
        type="button"
        onClick={handleSubmit}
        className="flex items-center justify-center gap-2 w-full h-12 rounded-lg font-bold
                   bg-harmonia-purple hover:bg-[#c000d6] text-white
                   shadow-[0_0_15px_rgba(227,0,255,0.3)] hover:shadow-[0_0_20px_rgba(227,0,255,0.5)]
                   transition-all duration-200 mt-2"
      >
        Próximo: Sobre o personagem
        <ChevronRight size={18} />
      </button>
    </div>
  );
}