// =============================================
// Enums da API (valores que o backend espera)
// =============================================

export type TipoElemento = "MORTE" | "SANGUE" | "ENERGIA" | "CONHECIMENTO" | "MEDO";

export type OrigemAPI =
  | "DESGARRADO" | "UNIVERSITARIO" | "JORNALISTA" | "CHEF" 
  | "MERCENARIO" | "DUBLE" | "GINASTA" | "MILITAR" | "POLICIAL" 
  | "PROFESSOR" | "EXECUTIVO" | "MAGNATA" | "TEORICO_DA_CONSPIRACAO" 
  | "GAUDERIO_ABUTRE" | "REVOLTADO" | "INVESTIGADOR" | "ARTISTA" 
  | "SERVIDOR_PUBLICO" | "TRABALHADOR_RURAL" | "CIENTISTA_FORENSE" 
  | "ENGENHEIRO" | "AMNESICO" | "ACADEMICO" | "AGENTE_DE_SAUDE" 
  | "ESCRITOR" | "LUTADOR" | "CRIMINOSO" | "TI" | "TRAMBIQUEIRO" 
  | "CULTISTA_ARREPENDIDO" | "VITIMA" | "RELIGIOSO" | "OPERARIO" | "ATLETA";

export type ClasseAPI = "COMBATENTE" | "ESPECIALISTA" | "OCULTISTA";

export type TrilhaAPI =
  | "AGENTE_SECRETO" | "GUERREIRO_MONSTRUOSO" | "EXORCISTA" | "GRADUADO" 
  | "MEDICO_DE_CAMPO" | "CONDUITE" | "INFILTRADOR" | "ANIQUILADOR" 
  | "NEGOCIADOR" | "MUAMBEIRO" | "OPERACOES_ESPECIAIS" | "INTUITIVO" 
  | "ATIRADOR_DE_ELITE" | "TROPA_DE_CHOQUE" | "FLAGELADOR" | "COMANDANTE_DE_CAMPO" 
  | "PARAPSICOLOGO" | "POSSUIDO" | "LAMINA_PARANORMAL" | "CACADOR" 
  | "PERSEVERANTE" | "TECNICO" | "BIBLIOTECARIO";

// =============================================
// Tipos das etapas do wizard (usados no form)
// =============================================

export interface EtapaBase {
  personagem: string;
  imgPersonagem: string;
  idade: number;
  nivelExposicao: number;
  esforcoPorRodada: number;
  origem: OrigemAPI;
  classe: ClasseAPI;
  trilha: TrilhaAPI;
  afinidade: TipoElemento;
}

export interface EtapaDescricao {
  aparencia: string;
  personalidade: string;
  historico: string;
  objetivo: string;
}

export interface PericiaPayload {
  nome: string;
  treino: number;
  bonusPonto: number;
  bonusDescricao: string | null;
}

// Atualize a EtapaAtributos que você já tem para incluir a linha das pericias:
export interface EtapaAtributos {
  agilidade: number;
  forca: number;
  intelecto: number;
  presenca: number;
  vigor: number;
  pericias: Record<string, PericiaPayload[]>; // <--- TEM QUE TER ESSA LINHA
}

// =============================================
// Payload final enviado para a API
// =============================================

export interface CriarAgentePayload {
  nomeCampanha: string;
  imgPersonagem: string;
  personagem: string;
  idade: number;
  origem: OrigemAPI;
  classe: ClasseAPI;
  trilha: TrilhaAPI;
  afinidade: TipoElemento;
  nivelExposicao: number;
  esforcoPorRodada: number;
  // Atributos
  agilidade: number;
  forca: number;
  intelecto: number;
  presenca: number;
  vigor: number;
  // Status (calculados automaticamente)
  pontosDeVida: { atual: number; total: number };
  pontosDeEsforco: { atual: number; total: number };
  pontosDeSanidade: { atual: number; total: number };
  // Secundários (calculados automaticamente)
  defesa: number;
  defesaEsquiva: number;
  redDanoBloqueando: number;
  protecoes: string;
  resistencia: string;
  deslocamento: string;
}

// =============================================
// Opções e constantes do formulário
// =============================================

export const NEX_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export const ATRIBUTO_MIN = 1;
export const ATRIBUTO_MAX = 5;

// Pontos disponíveis: 72 base + 5 por cada 5 NEX acima de 5
export const getPontosAtributo = (nex: number): number =>
  72 + Math.floor((nex - 5) / 5) * 5;

// Origens: label exibido no UI → valor da API
export const ORIGENS: { label: string; value: OrigemAPI }[] = [
  { label: "Acadêmico", value: "ACADEMICO" },
  { label: "Agente de Saúde", value: "AGENTE_DE_SAUDE" },
  { label: "Amnésico", value: "AMNESICO" },
  { label: "Artista", value: "ARTISTA" },
  { label: "Atleta", value: "ATLETA" },
  { label: "Chef", value: "CHEF" },
  { label: "Cientista Forense", value: "CIENTISTA_FORENSE" },
  { label: "Criminoso", value: "CRIMINOSO" },
  { label: "Cultista Arrependido", value: "CULTISTA_ARREPENDIDO" },
  { label: "Desgarrado", value: "DESGARRADO" },
  { label: "Dublê", value: "DUBLE" },
  { label: "Engenheiro", value: "ENGENHEIRO" },
  { label: "Escritor", value: "ESCRITOR" },
  { label: "Executivo", value: "EXECUTIVO" },
  { label: "Gaudério Abutre", value: "GAUDERIO_ABUTRE" },
  { label: "Ginasta", value: "GINASTA" },
  { label: "Investigador", value: "INVESTIGADOR" },
  { label: "Jornalista", value: "JORNALISTA" },
  { label: "Lutador", value: "LUTADOR" },
  { label: "Magnata", value: "MAGNATA" },
  { label: "Mercenário", value: "MERCENARIO" },
  { label: "Militar", value: "MILITAR" },
  { label: "Operário", value: "OPERARIO" },
  { label: "Policial", value: "POLICIAL" },
  { label: "Professor", value: "PROFESSOR" },
  { label: "Religioso", value: "RELIGIOSO" },
  { label: "Revoltado", value: "REVOLTADO" },
  { label: "Servidor Público", value: "SERVIDOR_PUBLICO" },
  { label: "Teórico da Conspiração", value: "TEORICO_DA_CONSPIRACAO" },
  { label: "TI", value: "TI" },
  { label: "Trabalhador Rural", value: "TRABALHADOR_RURAL" },
  { label: "Trambiqueiro", value: "TRAMBIQUEIRO" },
  { label: "Universitário", value: "UNIVERSITARIO" },
  { label: "Vítima", value: "VITIMA" },
];

// Classes: label → valor da API
export const CLASSES: { label: string; value: ClasseAPI }[] = [
  { label: "Combatente", value: "COMBATENTE" },
  { label: "Especialista", value: "ESPECIALISTA" },
  { label: "Ocultista", value: "OCULTISTA" },
];

// Trilhas por classe: label → valor da API
export const TRILHAS: Record<ClasseAPI, { label: string; value: TrilhaAPI }[]> = {
  COMBATENTE: [
    { label: "Agente Secreto", value: "AGENTE_SECRETO" },
    { label: "Aniquilador", value: "ANIQUILADOR" },
    { label: "Caçador", value: "CACADOR" },
    { label: "Comandante de Campo", value: "COMANDANTE_DE_CAMPO" },
    { label: "Guerreiro Monstruoso", value: "GUERREIRO_MONSTRUOSO" },
    { label: "Operações Especiais", value: "OPERACOES_ESPECIAIS" },
    { label: "Perseverante", value: "PERSEVERANTE" },
    { label: "Tropa de Choque", value: "TROPA_DE_CHOQUE" },
  ],
  ESPECIALISTA: [
    { label: "Atirador de Elite", value: "ATIRADOR_DE_ELITE" },
    { label: "Bibliotecário", value: "BIBLIOTECARIO" },
    { label: "Infiltrador", value: "INFILTRADOR" },
    { label: "Médico de Campo", value: "MEDICO_DE_CAMPO" },
    { label: "Muambeiro", value: "MUAMBEIRO" },
    { label: "Negociador", value: "NEGOCIADOR" },
    { label: "Técnico", value: "TECNICO" },
  ],
  OCULTISTA: [
    { label: "Conduíte", value: "CONDUITE" },
    { label: "Exorcista", value: "EXORCISTA" },
    { label: "Flagelador", value: "FLAGELADOR" },
    { label: "Graduado", value: "GRADUADO" },
    { label: "Intuitivo", value: "INTUITIVO" },
    { label: "Lâmina Paranormal", value: "LAMINA_PARANORMAL" },
    { label: "Parapsicólogo", value: "PARAPSICOLOGO" },
    { label: "Possuído", value: "POSSUIDO" },
  ],
};

export const ELEMENTOS: TipoElemento[] = ["MORTE", "SANGUE", "ENERGIA", "CONHECIMENTO", "MEDO"];