"use client";
import { useState } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { EtapaAtributos, EtapaBase, getPontosAtributo, ATRIBUTO_MIN, ATRIBUTO_MAX } from "./types-criar-agente";

interface EtapaAtributosProps {
  dados: Partial<EtapaAtributos>;
  nex: number;
  onSubmit: (dados: EtapaAtributos) => Promise<void>;
  onBack: () => void;
}

type AtributoKey = keyof EtapaAtributos;

const ATRIBUTOS: { key: AtributoKey; label: string; descricao: string; cor: string; bgCor: string; sombra: string }[] = [
  {
    key: "agilidade",
    label: "Agilidade",
    descricao: "Reflexos, esquiva, furtividade e precisão em combate.",
    cor: "text-cyan-400",
    bgCor: "bg-cyan-400",
    sombra: "shadow-[0_0_15px_rgba(34,211,238,0.5)]",
  },
  {
    key: "forca",
    label: "Força",
    descricao: "Poder físico, resistência e combate corpo a corpo.",
    cor: "text-orange-500",
    bgCor: "bg-orange-500",
    sombra: "shadow-[0_0_15px_rgba(249,115,22,0.5)]",
  },
  {
    key: "intelecto",
    label: "Intelecto",
    descricao: "Conhecimento, resolução de problemas e percepção.",
    cor: "text-yellow-400",
    bgCor: "bg-yellow-400",
    sombra: "shadow-[0_0_15px_rgba(250,204,21,0.5)]",
  },
  {
    key: "presenca",
    label: "Presença",
    descricao: "Carisma, liderança, rituais e força paranormal.",
    cor: "text-harmonia-purple",
    bgCor: "bg-harmonia-purple",
    sombra: "shadow-[0_0_15px_rgba(227,0,255,0.5)]",
  },
  {
    key: "vigor",
    label: "Vigor",
    descricao: "Saúde, resistência a danos e pontos de vida.",
    cor: "text-green-500",
    bgCor: "bg-green-500",
    sombra: "shadow-[0_0_15px_rgba(34,197,94,0.5)]",
  },
];

export default function EtapaAtributosPersonagem({ dados, nex, onSubmit, onBack }: EtapaAtributosProps) {
  const totalPontos = getPontosAtributo(nex);

  const [form, setForm] = useState<EtapaAtributos>({
    agilidade: 1,
    forca: 1,
    intelecto: 1,
    presenca: 1,
    vigor: 1,
    ...dados,
  });
  const [loading, setLoading] = useState(false);

  const pontosGastos = Object.values(form).reduce((acc, val) => acc + val, 0);
  const pontosRestantes = totalPontos - pontosGastos;

  const incrementar = (key: AtributoKey) => {
    if (form[key] >= ATRIBUTO_MAX) return;
    if (pontosRestantes <= 0) return;
    setForm((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrementar = (key: AtributoKey) => {
    if (form[key] <= ATRIBUTO_MIN) return;
    setForm((prev) => ({ ...prev, [key]: prev[key] - 1 }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  const porcentagemUsada = (pontosGastos / totalPontos) * 100;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Contador de pontos */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
            Pontos de Atributo — NEX {nex}%
          </span>
          <span className={`text-lg font-bold tabular-nums ${
            pontosRestantes === 0 
              ? "text-harmonia-purple" 
              : pontosRestantes < 0 
              ? "text-red-500" 
              : "text-white"
          }`}>
            {pontosRestantes}
            <span className="text-gray-600 text-sm font-normal"> / {totalPontos}</span>
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              pontosRestantes === 0
                ? "bg-harmonia-purple shadow-[0_0_8px_#E300FF]"
                : pontosRestantes < 0
                ? "bg-red-600"
                : "bg-gray-500"
            }`}
            style={{ width: `${Math.min(porcentagemUsada, 100)}%` }}
          />
        </div>

        {pontosRestantes === 0 && (
          <p className="text-[10px] text-harmonia-purple font-bold mt-2 text-center animate-pulse uppercase tracking-wider">
            ✦ Todos os pontos distribuídos ✦
          </p>
        )}
        {pontosRestantes < 0 && (
          <p className="text-[10px] text-red-500 font-bold mt-2 text-center uppercase tracking-wider">
            Pontos em excesso! Reduza alguns atributos.
          </p>
        )}
      </div>

      {/* Atributos */}
      <div className="flex flex-col gap-3">
        {ATRIBUTOS.map((attr) => {
          const valor = form[attr.key];
          const podeAumentar = valor < ATRIBUTO_MAX && pontosRestantes > 0;
          const podeReduzir = valor > ATRIBUTO_MIN;
          const porcentagem = ((valor - ATRIBUTO_MIN) / (ATRIBUTO_MAX - ATRIBUTO_MIN)) * 100;

          return (
            <div
              key={attr.key}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 flex items-center gap-4 group hover:border-gray-700 transition-colors"
            >
              {/* Círculo do valor */}
              <div
                className={`
                  w-12 h-12 rounded-full border-2 flex items-center justify-center
                  text-xl font-bold shrink-0 transition-all duration-300
                  ${valor > 1
                    ? `${attr.bgCor} border-transparent text-[#1a1a1a] ${attr.sombra}`
                    : `border-gray-700 text-gray-500 bg-transparent`
                  }
                `}
              >
                {valor}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-bold ${attr.cor}`}>{attr.label}</span>
                  <span className="text-[9px] text-gray-600 uppercase">
                    {ATRIBUTO_MIN}–{ATRIBUTO_MAX}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-tight mb-2">{attr.descricao}</p>
                {/* Mini barra */}
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${attr.bgCor}`}
                    style={{ width: `${porcentagem}%` }}
                  />
                </div>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => decrementar(attr.key)}
                  disabled={!podeReduzir}
                  className={`
                    w-9 h-9 rounded-full border flex items-center justify-center text-lg font-bold
                    transition-all duration-150 active:scale-90
                    ${podeReduzir
                      ? "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:bg-white/5"
                      : "border-gray-800 text-gray-700 cursor-not-allowed"
                    }
                  `}
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => incrementar(attr.key)}
                  disabled={!podeAumentar}
                  className={`
                    w-9 h-9 rounded-full border flex items-center justify-center text-lg font-bold
                    transition-all duration-150 active:scale-90
                    ${podeAumentar
                      ? `border-current ${attr.cor} hover:bg-white/5`
                      : "border-gray-800 text-gray-700 cursor-not-allowed"
                    }
                  `}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo compacto */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-3 grid grid-cols-5 gap-2 text-center">
        {ATRIBUTOS.map((attr) => (
          <div key={attr.key} className="flex flex-col items-center gap-1">
            <span className={`text-[9px] uppercase font-bold ${attr.cor}`}>
              {attr.label.slice(0, 3)}
            </span>
            <span className="text-white font-bold text-base tabular-nums">{form[attr.key]}</span>
          </div>
        ))}
      </div>

      {/* Navegação */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center justify-center gap-2 h-12 px-5 rounded-lg font-bold
                     border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500
                     transition-all duration-200 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Voltar
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || pontosRestantes < 0}
          className="flex items-center justify-center gap-2 flex-1 h-12 rounded-lg font-bold
                     bg-white text-black hover:bg-gray-200
                     shadow-[0_0_15px_rgba(255,255,255,0.2)]
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Criando agente...
            </>
          ) : (
            "✦ Criar Agente"
          )}
        </button>
      </div>
    </div>
  );
}