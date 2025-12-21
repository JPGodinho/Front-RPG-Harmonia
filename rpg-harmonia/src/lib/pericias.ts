export interface Pericia {
  nome: string;
  treino: number;
  bonusPonto: number;
  bonusDescricao: string;
}

interface FichaPericias {
  idFicha: string;
  agilidade: Pericia[];
  forca: Pericia[];
  intelecto: Pericia[];
  presenca: Pericia[];
  vigor: Pericia[];
  [key: string]: any;
}

const bancoDePericias: FichaPericias[] = [
  {
    idFicha: "KX3tg53Khl2ams",
    
    agilidade: [
      { nome: "Acrobacia", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Crime", treino: 10, bonusPonto: 2, bonusDescricao: "Kit Ladrão"},
      { nome: "Furtividade", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Iniciativa", treino: 5, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Pilotagem", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Pontaria", treino: 5, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Reflexos", treino: 5, bonusPonto: 0, bonusDescricao: ""},
    ],

    forca: [
      { nome: "Atletismo", treino: 10, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Luta", treino: 0, bonusPonto: 0, bonusDescricao: ""} 
    ], 

    intelecto: [
      { nome: "Atualidades", treino: 5, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Ciências", treino: 10, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Investigação", treino: 5, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Medicina", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Ocultismo", treino: 5, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Profissão", treino: 10, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Sobrevivência", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Tática", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Tecnologia", treino: 0, bonusPonto: 5, bonusDescricao: "Hacker"},
    ],

    presenca: [
      { nome: "Adestramento", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Artes", treino: 10, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Diplomacia", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Enganação", treino: 10, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Intimidação", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Intuição", treino: 5, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Percepção", treino: 5, bonusPonto: 2, bonusDescricao: "Óculos"},
      { nome: "Religião", treino: 0, bonusPonto: 0, bonusDescricao: ""},
      { nome: "Vontade", treino: 5, bonusPonto: 0, bonusDescricao: ""},
    ],

    vigor: [
      { nome: "Fortitude", treino: 10, bonusPonto: 0, bonusDescricao: ""}
    ]
  },
  {
    idFicha: "Y78uhj2K99lpQz",
      agilidade: [
        { nome: "Acrobacia", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Crime", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Furtividade", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Iniciativa", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Pilotagem", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Pontaria", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Reflexos", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
      ],

      forca: [
        { nome: "Atletismo", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Luta", treino: 0, "bonusPonto": 0, "bonusDescricao": ""} 
      ], 

      intelecto: [
        { nome: "Atualidades", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Ciências", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Investigação", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Medicina", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Ocultismo", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Profissão", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Sobrevivência", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Tática", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Tecnologia", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
      ],

      presenca: [
        { nome: "Adestramento", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Artes", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Diplomacia", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Enganação", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Intimidação", treino: 10, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Intuição", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Percepção", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Religião", treino: 0, "bonusPonto": 0, "bonusDescricao": ""},
        { nome: "Vontade", treino: 5, "bonusPonto": 0, "bonusDescricao": ""},
      ],

      vigor: [
        { nome: "Fortitude", treino: 0, "bonusPonto": 0, "bonusDescricao": ""}
      ]
  }
];

export async function buscarPericiasPorAtributo(idFicha: string, atributo: string): Promise<Pericia[]> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const fichaEncontrada = bancoDePericias.find(f => f.idFicha === idFicha);

  if (!fichaEncontrada) return [];

  return fichaEncontrada[atributo] || [];
}