'use server';

import { cookies } from 'next/headers';
import { CriarAgentePayload, EtapaAtributos, EtapaBase, EtapaDescricao } from './components/types-criar-agente';

const apiPathV1 = process.env.NEXT_PUBLIC_API_KEY_PATH_V1 as string;

// =============================================
// Cálculo dos status iniciais baseado nos atributos + NEX
// Regras do Ordem Paranormal RPG:
// PV = (Vigor * 4) + (nivelExposicao / 5) * 4
// PE = (Presença * 4) + (nivelExposicao / 5) * 4  
// Sanidade = (Presença * 4) + (nivelExposicao / 5) * 4
// Defesa = 10 + Agilidade
// Esquiva = Agilidade * 2
// Deslocamento = 9m (padrão)
// =============================================

function calcularStatusIniciais(atributos: EtapaAtributos, nivelExposicao: number) {
  const bonusNex = Math.floor(nivelExposicao / 5) * 4;

  const totalPV = atributos.vigor * 4 + bonusNex;
  const totalPE = atributos.presenca * 4 + bonusNex;
  const totalSAN = atributos.presenca * 4 + bonusNex;

  return {
    pontosDeVida: { atual: totalPV, total: totalPV },
    pontosDeEsforco: { atual: totalPE, total: totalPE },
    pontosDeSanidade: { atual: totalSAN, total: totalSAN },
    defesa: 10 + atributos.agilidade,
    defesaEsquiva: atributos.agilidade * 2,
    redDanoBloqueando: 0,
    protecoes: "",
    resistencia: "",
    deslocamento: "9m",
  };
}

// =============================================
// Monta o payload completo para a API
// =============================================

function montarPayload(
  base: EtapaBase,
  atributos: EtapaAtributos
): CriarAgentePayload {
  const status = calcularStatusIniciais(atributos, base.nivelExposicao);

  return {
    nomeCampanha: "harmonia",
    imgPersonagem: base.imgPersonagem || "",
    personagem: base.personagem,
    idade: base.idade,
    origem: base.origem,
    classe: base.classe,
    trilha: base.trilha,
    afinidade: base.afinidade,
    nivelExposicao: base.nivelExposicao,
    esforcoPorRodada: base.esforcoPorRodada,
    // Atributos
    agilidade: atributos.agilidade,
    forca: atributos.forca,
    intelecto: atributos.intelecto,
    presenca: atributos.presenca,
    vigor: atributos.vigor,
    // Status calculados
    ...status,
  };
}

// =============================================
// Server Action principal
// =============================================
async function salvarDescricao(idFicha: string, descricao: EtapaDescricao, token: string) {
  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/descricao`, {
      method: "POST", // Ou PATCH, dependendo da sua API
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(descricao),
    });

    return res.ok;
  } catch (error) {
    console.error("Erro ao salvar descrição:", error);
    return false;
  }
}

export async function criarAgente(
  base: EtapaBase,
  descricao: EtapaDescricao,
  atributos: EtapaAtributos
): Promise<{ sucesso: boolean; mensagem?: string; id?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const idUsuario = cookieStore.get("user_id")?.value;

  if (!token || !idUsuario) {
    return { sucesso: false, mensagem: "Sessão expirada. Faça login novamente." };
  }

  // Passo 1: Criar a ficha básica
  const payloadFicha = montarPayload(base, atributos);
  
  try {
    const resFicha = await fetch(`${apiPathV1}/ficha?id-usuario=${idUsuario}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payloadFicha),
    });

    const dataFicha = await resFicha.json();

    if (!resFicha.ok) {
      return { sucesso: false, mensagem: dataFicha.message || "Erro ao criar ficha básica." };
    }

    const idGerado = dataFicha.id;

    // Passo 2: Se a ficha foi criada, enviamos a descrição para o endpoint dela
    const descSucesso = await salvarDescricao(idGerado, descricao, token);

    if (!descSucesso) {
       console.warn("Ficha criada, mas houve erro ao salvar a descrição.");
       // Opcional: retornar sucesso mesmo assim, informando que a descrição falhou
    }

    return { sucesso: true, id: idGerado };

  } catch (error) {
    console.error("Erro no processo de criação:", error);
    return { sucesso: false, mensagem: "Erro ao conectar com o servidor." };
  }
}