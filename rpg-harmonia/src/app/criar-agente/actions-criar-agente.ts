'use server';

import { cookies } from 'next/headers';
import { CriarAgentePayload, EtapaAtributos, EtapaBase, EtapaDescricao, PericiaPayload } from './components/types-criar-agente';

const apiPathV1 = process.env.NEXT_PUBLIC_API_KEY_PATH_V1 as string;

// =============================================
// Cálculo dos status iniciais baseado nos atributos + NEX
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
    agilidade: atributos.agilidade,
    forca: atributos.forca,
    intelecto: atributos.intelecto,
    presenca: atributos.presenca,
    vigor: atributos.vigor,
    ...status,
  };
}

// =============================================
// Funções Secundárias (Descrição e Perícias)
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

    if (!res.ok) {
        const textErro = await res.text();
        console.error(`[ERRO PASSO 2 - DESCRIÇÃO] Status: ${res.status} | Resposta:`, textErro);
    }
    return res.ok;
  } catch (error) {
    console.error("[ERRO CATCH - DESCRIÇÃO]:", error);
    return false;
  }
}

async function salvarPericias(idFicha: string, pericias: Record<string, PericiaPayload[]>, token: string) {
  try {
    const res = await fetch(`${apiPathV1}/ficha/${idFicha}/atributos`, {
      method: "POST", // ou PUT, dependendo de como a API Java foi feita
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(pericias),
    });

    if (!res.ok) {
        const textErro = await res.text();
        console.error(`[ERRO PASSO 3 - PERÍCIAS] Status: ${res.status} | Resposta:`, textErro);
    }
    return res.ok;
  } catch (error) {
    console.error("[ERRO CATCH - PERÍCIAS]:", error);
    return false;
  }
}

// =============================================
// Server Action principal
// =============================================
export async function criarAgente(
  base: EtapaBase,
  descricao: EtapaDescricao,
  atributos: EtapaAtributos
): Promise<{ sucesso: boolean; mensagem?: string; id?: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const idUsuario = cookieStore.get("user_id")?.value;

  if (!token || !idUsuario) return { sucesso: false, mensagem: "Sessão expirada." };

  // Passo 1: Criar a ficha básica
  const payloadFicha = montarPayload(base, atributos);
  
  try {
    console.log("=========================================");
    console.log("🚀 INICIANDO CRIAÇÃO DO AGENTE...");
    // console.log("Payload Base:", JSON.stringify(payloadFicha, null, 2)); // Descomente se quiser ver o que está enviando

    const resFicha = await fetch(`${apiPathV1}/ficha?id-usuario=${idUsuario}`, {
      method: "POST", 
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(payloadFicha),
    });

    // Pega como texto para evitar crash no .json() caso a API devolva um HTML de erro
    const responseText = await resFicha.text();
    let dataFicha;
    try { dataFicha = JSON.parse(responseText); } catch (e) { dataFicha = responseText; }

    if (!resFicha.ok) {
        console.error(`[ERRO PASSO 1 - FICHA BASE] Status: ${resFicha.status}`);
        console.error("Detalhes do erro:", dataFicha);
        return { sucesso: false, mensagem: dataFicha?.message || "Erro ao criar ficha." };
    }

    const idGerado = dataFicha.id || dataFicha; 
    console.log(`✅ Ficha base criada! ID gerado: ${idGerado}`);

    // Passo 2: Salvar Descrição
    console.log("Enviando Descrição...");
    const descSucesso = await salvarDescricao(idGerado, descricao, token);
    if (descSucesso) console.log("✅ Descrição salva com sucesso!");

    // Passo 3: Salvar Perícias
    console.log("Enviando Perícias...");
    const periciasSucesso = await salvarPericias(idGerado, atributos.pericias, token);
    if (periciasSucesso) {
        console.log("✅ Perícias salvas com sucesso!");
    } else {
        console.warn("⚠️ Falha ao salvar as perícias.");
    }

    console.log("🎉 PROCESSO FINALIZADO!");
    console.log("=========================================");
    return { sucesso: true, id: idGerado };

  } catch (error) {
    console.error("🔥 ERRO FATAL NO SERVIDOR NEXT.JS:", error);
    return { sucesso: false, mensagem: "Erro interno no servidor." };
  }
}