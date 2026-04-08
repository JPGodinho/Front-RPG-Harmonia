"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EtapaDescricao } from "./types-criar-agente";

interface EtapaDescricaoProps {
  dados: Partial<EtapaDescricao>;
  onNext: (dados: EtapaDescricao) => void;
  onBack: () => void;
}

const labelClass = "block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5";
const textareaClass =
  "w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-harmonia-purple focus:shadow-[0_0_10px_#8A38F5] transition-all text-white placeholder-gray-600 text-sm resize-none";

const CAMPOS: { key: keyof EtapaDescricao; label: string; placeholder: string; rows: number }[] = [
  {
    key: "aparencia",
    label: "Aparência",
    placeholder: "Descreva a aparência física do seu agente: altura, cor de cabelo, marcas, estilo de vestimenta...",
    rows: 3,
  },
  {
    key: "personalidade",
    label: "Personalidade",
    placeholder: "Como seu agente age? Quais são seus traços marcantes, virtudes e defeitos?",
    rows: 3,
  },
  {
    key: "historico",
    label: "Histórico",
    placeholder: "De onde vem seu agente? Qual é a sua história antes de entrar na Ordem Arcana?",
    rows: 4,
  },
  {
    key: "objetivo",
    label: "Objetivo",
    placeholder: "O que seu agente busca? Qual é a motivação que o mantém em campo?",
    rows: 2,
  },
];

export default function EtapaDescricaoPersonagem({ dados, onNext, onBack }: EtapaDescricaoProps) {
  const [form, setForm] = useState<EtapaDescricao>({
    aparencia: "",
    personalidade: "",
    historico: "",
    objetivo: "",
    ...dados,
  });

  const set = (key: keyof EtapaDescricao, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Todos são opcionais mas incentivamos o preenchimento
  const handleSubmit = () => {
    onNext(form);
  };

  const totalPreenchido = Object.values(form).filter((v) => v.trim().length > 0).length;

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Indicador de progresso */}
      <div className="flex items-center gap-2">
        {CAMPOS.map((campo, idx) => (
          <div
            key={campo.key}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              form[campo.key].trim().length > 0
                ? "bg-harmonia-purple shadow-[0_0_6px_#E300FF]"
                : "bg-gray-800"
            }`}
          />
        ))}
        <span className="text-[10px] text-gray-500 uppercase font-bold ml-1 shrink-0">
          {totalPreenchido}/4
        </span>
      </div>

      {CAMPOS.map((campo) => (
        <div key={campo.key}>
          <label className={labelClass}>{campo.label}</label>
          <textarea
            rows={campo.rows}
            className={textareaClass}
            placeholder={campo.placeholder}
            value={form[campo.key]}
            onChange={(e) => set(campo.key, e.target.value)}
          />
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-gray-700">
              {form[campo.key].length} caracteres
            </span>
          </div>
        </div>
      ))}

      <p className="text-xs text-gray-600 italic text-center">
        Todos os campos são opcionais — você pode preencher depois na ficha.
      </p>

      {/* Navegação */}
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 h-12 px-5 rounded-lg font-bold
                     border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500
                     transition-all duration-200"
        >
          <ChevronLeft size={18} />
          Voltar
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 flex-1 h-12 rounded-lg font-bold
                     bg-harmonia-purple hover:bg-[#c000d6] text-white
                     shadow-[0_0_15px_rgba(227,0,255,0.3)] hover:shadow-[0_0_20px_rgba(227,0,255,0.5)]
                     transition-all duration-200"
        >
          Próximo: Atributos
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}