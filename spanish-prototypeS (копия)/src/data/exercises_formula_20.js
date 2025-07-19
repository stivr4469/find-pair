export const formulas = {
  spanish: {
    formula: "Выражение места и направления",
    description: "Используется для указания места или направления с предлогами ('en', 'a', 'hacia') и глаголами движения ('ir', 'venir') или другими глаголами.",
    examples: [
      {
        id: 2001,
        ru: "Я живу в городе",
        es: "Vivo en la ciudad",
        correct: ["Vivo", "en", "la", "ciudad"],
        wordBank: [
          { text: "Vivo", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "ciudad", type: "noun" },
          { text: "Trabajo", type: "verb" },
          { text: "el", type: "article" },
          { text: "pueblo", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2002,
        ru: "Ты идёшь в школу",
        es: "Vas a la escuela",
        correct: ["Vas", "a", "la", "escuela"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Vienes", type: "verb" },
          { text: "el", type: "article" },
          { text: "instituto", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2003,
        ru: "Она работает в офисе",
        es: "Ella trabaja en la oficina",
        correct: ["Ella", "trabaja", "en", "la", "oficina"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "trabaja", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "casa", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "estudia", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол с местом.",
        maxWords: 5,
        formulaId: 20
      },
      {
        id: 2004,
        ru: "Он идёт на стадион",
        es: "Va al estadio",
        correct: ["Va", "a", "el", "estadio"],
        wordBank: [
          { text: "Va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "estadio", type: "noun" },
          { text: "Viene", type: "verb" },
          { text: "la", type: "article" },
          { text: "parque", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2005,
        ru: "Мы живём в деревне",
        es: "Vivimos en el pueblo",
        correct: ["Vivimos", "en", "el", "pueblo"],
        wordBank: [
          { text: "Vivimos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "pueblo", type: "noun" },
          { text: "Trabajamos", type: "verb" },
          { text: "la", type: "article" },
          { text: "ciudad", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2006,
        ru: "Вы идёте в парк",
        es: "Vais al parque",
        correct: ["Vais", "a", "el", "parque"],
        wordBank: [
          { text: "Vais", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Venís", type: "verb" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2007,
        ru: "Они приходят из школы",
        es: "Vienen de la escuela",
        correct: ["Vienen", "de", "la", "escuela"],
        wordBank: [
          { text: "Vienen", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Van", type: "verb" },
          { text: "el", type: "article" },
          { text: "instituto", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2008,
        ru: "Я иду в магазин",
        es: "Voy a la tienda",
        correct: ["Voy", "a", "la", "tienda"],
        wordBank: [
          { text: "Voy", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "tienda", type: "noun" },
          { text: "Vengo", type: "verb" },
          { text: "el", type: "article" },
          { text: "mercado", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2009,
        ru: "Ты работаешь в библиотеке",
        es: "Trabajas en la biblioteca",
        correct: ["Trabajas", "en", "la", "biblioteca"],
        wordBank: [
          { text: "Trabajas", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "biblioteca", type: "noun" },
          { text: "Estudias", type: "verb" },
          { text: "el", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2010,
        ru: "Она идёт в кино",
        es: "Ella va al cine",
        correct: ["Ella", "va", "a", "el", "cine"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "cine", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "viene", type: "verb" },
          { text: "teatro", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол движения с местом.",
        maxWords: 5,
        formulaId: 20
      },
      {
        id: 2011,
        ru: "Он живёт в большом доме",
        es: "Vive en una casa grande",
        correct: ["Vive", "en", "una", "casa", "grande"],
        wordBank: [
          { text: "Vive", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "una", type: "article" },
          { text: "casa", type: "noun" },
          { text: "grande", type: "adjective" },
          { text: "Trabaja", type: "verb" },
          { text: "pequeña", type: "adjective" },
          { text: "apartamento", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с местом и прилагательным.",
        maxWords: 5,
        formulaId: 20
      },
      {
        id: 2012,
        ru: "Мы идём на пляж",
        es: "Vamos a la playa",
        correct: ["Vamos", "a", "la", "playa"],
        wordBank: [
          { text: "Vamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" },
          { text: "Venimos", type: "verb" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2013,
        ru: "Вы приходите из библиотеки",
        es: "Venís de la biblioteca",
        correct: ["Venís", "de", "la", "biblioteca"],
        wordBank: [
          { text: "Venís", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "biblioteca", type: "noun" },
          { text: "Vais", type: "verb" },
          { text: "el", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2014,
        ru: "Они живут в Испании",
        es: "Viven en España",
        correct: ["Viven", "en", "España"],
        wordBank: [
          { text: "Viven", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "España", type: "noun" },
          { text: "Trabajan", type: "verb" },
          { text: "Francia", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "ciudad", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом и местом.",
        maxWords: 3,
        formulaId: 20
      },
      {
        id: 2015,
        ru: "Я иду в университет",
        es: "Voy a la universidad",
        correct: ["Voy", "a", "la", "universidad"],
        wordBank: [
          { text: "Voy", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "universidad", type: "noun" },
          { text: "Vengo", type: "verb" },
          { text: "el", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2016,
        ru: "Ты идёшь в супермаркет",
        es: "Vas al supermercado",
        correct: ["Vas", "a", "el", "supermercado"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "supermercado", type: "noun" },
          { text: "Vienes", type: "verb" },
          { text: "la", type: "article" },
          { text: "tienda", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2017,
        ru: "Она приходит из парка",
        es: "Ella viene del parque",
        correct: ["Ella", "viene", "de", "el", "parque"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "viene", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол движения с местом.",
        maxWords: 5,
        formulaId: 20
      },
      {
        id: 2018,
        ru: "Он работает в ресторане",
        es: "Trabaja en el restaurante",
        correct: ["Trabaja", "en", "el", "restaurante"],
        wordBank: [
          { text: "Trabaja", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "restaurante", type: "noun" },
          { text: "Estudia", type: "verb" },
          { text: "la", type: "article" },
          { text: "cocina", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2019,
        ru: "Мы идём в театр",
        es: "Vamos al teatro",
        correct: ["Vamos", "a", "el", "teatro"],
        wordBank: [
          { text: "Vamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "teatro", type: "noun" },
          { text: "Venimos", type: "verb" },
          { text: "la", type: "article" },
          { text: "cine", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с местом.",
        maxWords: 4,
        formulaId: 20
      },
      {
        id: 2020,
        ru: "Они приходят из города",
        es: "Vienen de la ciudad",
        correct: ["Vienen", "de", "la", "ciudad"],
        wordBank: [
          { text: "Vienen", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "ciudad", type: "noun" },
          { text: "Van", type: "verb" },
          { text: "el", type: "article" },
          { text: "pueblo", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с предлогом и местом.",
        maxWords: 4,
        formulaId: 20
      }
    ]
  }
};