export interface StatusPontos {
  atual: number;
  total: number;
}

export interface FichaData {
  id: string;
  imgPersonagem?: string | null;
  personagem: string;
  idade: number;
  nivelExposicao: number; // NEX
  esforcoPorRodada: number;
  origem: string;
  classe: string;
  trilha: string;
  afinidade: string;
  
  // Atributos
  agilidade: number;
  forca: number;
  intelecto: number;
  presenca: number;
  vigor: number;

  // Status
  pontosDeVida: StatusPontos;
  pontosDeEsforco: StatusPontos;
  pontosDeSanidade: StatusPontos;

  // Secundários
  defesa: number;
  defesaEsquiva: number;
  redDanoBloqueando: number;
  protecoes: string | null; // Pode vir string ou null
  resistencia: string | null;
  deslocamento: string;
}

export interface FichaUsuario {
  id: string;
  imgPersonagem?: string | null;
  personagem: string;
  nomeCampanha: string;
  criadoEm: { seconds: number; nanos: number };
}


export interface Pericia {
  nome: string;
  treino: number;
  bonusPonto: number;
  bonusDescricao: string | null;
}

// O objeto que a API retorna (todas as listas)
export interface ListaDePericias {
  agilidade: Pericia[];
  forca: Pericia[];
  intelecto: Pericia[];
  presenca: Pericia[];
  vigor: Pericia[];
  // Permite acessar com string dinâmica (ex: dados['agilidade'])
  [key: string]: Pericia[]; 
}

export interface DescricaoData {
  aparencia: string;
  personalidade: string;
  historico: string;
  objetivo: string;
}

export interface CustoRitual {
  normal: number;
  discente: number;
  verdadeiro: number;
}

export interface RitualData {
  nomeRitual: string;
  tipoElemento: "MORTE" | "SANGUE" | "ENERGIA" | "CONHECIMENTO" | "MEDO";
  custoRitual: CustoRitual;
  execucao: string;
  alcance: string;
  alvo: string;
  duracao: string;
  resistencia: string;
  descricao: string;
  dtRitual: number;
  danoSanidade: number | null;
  circulo: number;
}

export interface HabilidadeData {
  nome: string;
  descricao: string;
}

export interface ItemData {
  nomeItem: string;
  categoria: string;
  espacos: number;
  descricao: string;
}

export interface LimitesCategoria {
  categoriaI: number;
  categoriaII: number;
  categoriaIII: number;
  categoriaIV: number;
  categoriaV: number;
  categoriaVI: number;
}

export interface InventarioData {
  carga: {
    atual: number;
    total: number;
  };
  pontosDePrestigio: number;
  patente: string;
  limiteCreditos: string;
  limiteItens: LimitesCategoria;
  itens: ItemData[];
}