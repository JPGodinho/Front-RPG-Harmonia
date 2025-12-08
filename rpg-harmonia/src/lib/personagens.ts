export const bancoDePersonagens = [
  {
    id: "1",
    nome: "Bernardo Petre Melo",
    classe: "Ocultista",
    trilha: "Lâmina Paranormal",
    nex: "25%",
    peRodada: 5,
    origem: "Acadêmico",
    idade: "22 anos",
    campanha: "HARMONIA",
    criadoEm: "12/03/2025",
    elemento: "Energia",
    
    atributos: {
      agi: 2, for: 2, int: 3, pre: 2, vig: 1
    },
    
    status: {
      pv: { atual: 27, max: 31 },
      pe: { atual: 30, max: 30 },
      san: { atual: 29, max: 45 },
    },

    secundarios: {
      defesa: 17,
      deslocamento: "9m/6q",
      esquiva: 20,
      resistencias: "Morte 10",
      rdBloqueio: 5,
      protecoes: "Armadura de Aço"
    }
  },
  {
    id: "2",
    nome: "Arthur Cervero",
    classe: "Combatente",
    trilha: "Tropa de Choque",
    nex: "50%",
    peRodada: 10,
    origem: "Policial",
    idade: "35 anos",
    campanha: "CALAMIDADE",
    criadoEm: "10/03/2025",
    elemento: "Sangue",

    atributos: {
      agi: 1, for: 4, int: 1, pre: 2, vig: 3
    },

    status: {
      pv: { atual: 80, max: 80 },
      pe: { atual: 10, max: 10 },
      san: { atual: 15, max: 30 },
    },

    secundarios: {
      defesa: 22,
      deslocamento: "9m/6q",
      esquiva: 15,
      resistencias: "Sangue 10",
      rdBloqueio: 10,
      protecoes: "Colete Pesado"
    }
  }
];