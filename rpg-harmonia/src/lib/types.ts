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