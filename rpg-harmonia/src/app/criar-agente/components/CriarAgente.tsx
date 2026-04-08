"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import EtapaBasePersonagem from "./BasePersonagem";
import EtapaDescricaoPersonagem from "./DescricaoPersonagem";
import EtapaAtributosPersonagem from "./AtributosPersonagem";
import { criarAgente } from "../actions-criar-agente";
import { EtapaBase, EtapaDescricao, EtapaAtributos } from "./types-criar-agente";

type Etapa = 1 | 2 | 3 | "sucesso";

const ETAPAS = [
  { num: 1, titulo: "Base do Agente" },
  { num: 2, titulo: "Sobre Ele" },
  { num: 3, titulo: "Atributos" },
];

export default function CriarAgenteWizard() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>(1);
  const [erroGlobal, setErroGlobal] = useState<string | null>(null);

  const [dadosBase, setDadosBase] = useState<Partial<EtapaBase>>({});
  const [dadosDescricao, setDadosDescricao] = useState<Partial<EtapaDescricao>>({});
  const [dadosAtributos, setDadosAtributos] = useState<Partial<EtapaAtributos>>({});

  const handleEtapa1 = (dados: EtapaBase) => {
    setDadosBase(dados);
    setEtapa(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEtapa2 = (dados: EtapaDescricao) => {
    setDadosDescricao(dados);
    setEtapa(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEtapa3 = async (dados: EtapaAtributos) => {
    setErroGlobal(null);
    setDadosAtributos(dados);

    const resultado = await criarAgente(
      dadosBase as EtapaBase,
      dadosDescricao as EtapaDescricao,
      dados
    );

    if (!resultado.sucesso) {
      setErroGlobal(resultado.mensagem || "Erro ao criar agente.");
      return;
    }

    setEtapa("sucesso");
    if (resultado.id) {
      setTimeout(() => router.push(`/ficha/${resultado.id}`), 2000);
    } else {
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Indicador de etapas */}
      {etapa !== "sucesso" && (
        <div className="flex items-center gap-0 mb-8">
          {ETAPAS.map((e, idx) => {
            const ativa = etapa === e.num;
            const concluida = typeof etapa === "number" && etapa > e.num;
            return (
              <div key={e.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                      transition-all duration-300
                      ${concluida
                        ? "bg-harmonia-purple border-harmonia-purple text-white shadow-[0_0_10px_rgba(227,0,255,0.4)]"
                        : ativa
                        ? "border-harmonia-purple text-harmonia-purple bg-transparent"
                        : "border-gray-700 text-gray-600 bg-transparent"
                      }
                    `}
                  >
                    {concluida ? "✓" : e.num}
                  </div>
                  <span
                    className={`text-[9px] uppercase font-bold mt-1 tracking-wider transition-colors ${
                      ativa ? "text-white" : concluida ? "text-harmonia-purple" : "text-gray-600"
                    }`}
                  >
                    {e.titulo}
                  </span>
                </div>
                {idx < ETAPAS.length - 1 && (
                  <div
                    className={`h-px flex-1 mb-4 transition-colors duration-300 ${
                      typeof etapa === "number" && etapa > e.num
                        ? "bg-harmonia-purple"
                        : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Erro global */}
      {erroGlobal && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded-lg mb-4 text-center animate-in fade-in slide-in-from-top-2">
          {erroGlobal}
        </div>
      )}

      {/* Títulos por etapa */}
      {etapa !== "sucesso" && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            {etapa === 1 && "Crie a base do seu personagem!"}
            {etapa === 2 && "Conte um pouco sobre ele"}
            {etapa === 3 && "Distribua os atributos"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {etapa === 1 && "Defina as informações fundamentais do seu agente da Ordem."}
            {etapa === 2 && "Dê vida ao seu agente com uma descrição rica."}
            {etapa === 3 && `Você tem ${72 + Math.floor(((dadosBase.nivelExposicao || 5) - 5) / 5) * 5} pontos para distribuir entre os 5 atributos.`}
          </p>
          <div className="h-px w-full bg-harmonia-purple/40 mt-4 shadow-[0_0_6px_rgba(227,0,255,0.3)]" />
        </div>
      )}

      {/* Conteúdo das etapas */}
      {etapa === 1 && (
        <EtapaBasePersonagem dados={dadosBase} onNext={handleEtapa1} />
      )}
      {etapa === 2 && (
        <EtapaDescricaoPersonagem
          dados={dadosDescricao}
          onNext={handleEtapa2}
          onBack={() => setEtapa(1)}
        />
      )}
      {etapa === 3 && (
        <EtapaAtributosPersonagem
          dados={dadosAtributos}
          nex={dadosBase.nivelExposicao || 5}
          onSubmit={handleEtapa3}
          onBack={() => setEtapa(2)}
        />
      )}

      {/* Tela de sucesso */}
      {etapa === "sucesso" && (
        <div className="flex flex-col items-center justify-center gap-6 py-16 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 rounded-full bg-harmonia-purple/20 border-2 border-harmonia-purple flex items-center justify-center shadow-[0_0_30px_rgba(227,0,255,0.4)]">
            <CheckCircle2 size={40} className="text-harmonia-purple" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Agente criado!</h2>
            <p className="text-gray-400 text-sm">
              <strong className="text-white">{dadosBase.personagem}</strong> está pronto para entrar em campo.
            </p>
            <p className="text-gray-600 text-xs mt-3 animate-pulse">
              Redirecionando para a ficha...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}