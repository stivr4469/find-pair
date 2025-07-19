export const formulas = {
  spanish: {
    formula: "Указание направления или местоположения",
    description: "Используется для указания направления (с глаголами движения) или местоположения (с предлогами 'a', 'en', 'hacia', 'de').",
    examples: [
      {
        id: 901,
        ru: "Я иду на пляж",
        es: "Voy a la playa",
        correct: ["Voy", "a", "la", "playa"],
        wordBank: [
          { text: "Voy", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" },
          { text: "Vengo", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 902,
        ru: "Ты идёшь в школу",
        es: "Vas a la escuela",
        correct: ["Vas", "a", "la", "escuela"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Vienes", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "el", type: "article" },
          { text: "cine", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 903,
        ru: "Она находится в парке",
        es: "Ella está en el parque",
        correct: ["Ella", "está", "en", "el", "parque"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "está", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'estar' и предлог 'en' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 904,
        ru: "Он идёт в магазин",
        es: "Él va a la tienda",
        correct: ["Él", "va", "a", "la", "tienda"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "tienda", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "viene", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "mercado", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 905,
        ru: "Мы идём в кино",
        es: "Vamos al cine",
        correct: ["Vamos", "a", "el", "cine"],
        wordBank: [
          { text: "Vamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "cine", type: "noun" },
          { text: "Venimos", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 906,
        ru: "Вы находитесь в городе",
        es: "Estáis en la ciudad",
        correct: ["Estáis", "en", "la", "ciudad"],
        wordBank: [
          { text: "Estáis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "ciudad", type: "noun" },
          { text: "Vais", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "pueblo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'estar' и предлог 'en' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 907,
        ru: "Они идут в ресторан",
        es: "Ellos van al restaurante",
        correct: ["Ellos", "van", "a", "el", "restaurante"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "van", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "restaurante", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "vienen", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "café", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 908,
        ru: "Я возвращаюсь из школы",
        es: "Vengo de la escuela",
        correct: ["Vengo", "de", "la", "escuela"],
        wordBank: [
          { text: "Vengo", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Voy", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "cine", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'de' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 909,
        ru: "Ты идёшь к другу",
        es: "Vas a casa de tu amigo",
        correct: ["Vas", "a", "casa", "de", "tu", "amigo"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "casa", type: "noun" },
          { text: "de", type: "preposition" },
          { text: "tu", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "Vienes", type: "verb" },
          { text: "el", type: "article" },
          { text: "hermano", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлоги с артиклем и местом.",
        maxWords: 6,
        formulaId: 9
      },
      {
        id: 910,
        ru: "Она едет в город",
        es: "Ella va a la ciudad",
        correct: ["Ella", "va", "a", "la", "ciudad"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "ciudad", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "viene", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "pueblo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 911,
        ru: "Он находится в библиотеке",
        es: "Él está en la biblioteca",
        correct: ["Él", "está", "en", "la", "biblioteca"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "está", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "biblioteca", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "escuela", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'estar' и предлог 'en' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 912,
        ru: "Мы возвращаемся из парка",
        es: "Venimos del parque",
        correct: ["Venimos", "de", "el", "parque"],
        wordBank: [
          { text: "Venimos", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Vamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'de' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 913,
        ru: "Вы идёте к врачу",
        es: "Vais al médico",
        correct: ["Vais", "a", "el", "médico"],
        wordBank: [
          { text: "Vais", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "médico", type: "noun" },
          { text: "Venís", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "clínica", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 914,
        ru: "Они находятся в музее",
        es: "Ellos están en el museo",
        correct: ["Ellos", "están", "en", "el", "museo"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "están", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "museo", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "van", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "teatro", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'estar' и предлог 'en' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 915,
        ru: "Я иду в театр",
        es: "Voy al teatro",
        correct: ["Voy", "a", "el", "teatro"],
        wordBank: [
          { text: "Voy", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "teatro", type: "noun" },
          { text: "Vengo", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "biblioteca", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 916,
        ru: "Ты возвращаешься из магазина",
        es: "Vienes de la tienda",
        correct: ["Vienes", "de", "la", "tienda"],
        wordBank: [
          { text: "Vienes", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "tienda", type: "noun" },
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "mercado", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'de' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 917,
        ru: "Она идёт к другу",
        es: "Ella va a casa de su amigo",
        correct: ["Ella", "va", "a", "casa", "de", "su", "amigo"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "casa", type: "noun" },
          { text: "de", type: "preposition" },
          { text: "su", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "viene", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлоги с артиклем и местом.",
        maxWords: 7,
        formulaId: 9
      },
      {
        id: 918,
        ru: "Он находится в офисе",
        es: "Él está en la oficina",
        correct: ["Él", "está", "en", "la", "oficina"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "está", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'estar' и предлог 'en' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      },
      {
        id: 919,
        ru: "Мы идём в горы",
        es: "Vamos a las montañas",
        correct: ["Vamos", "a", "las", "montañas"],
        wordBank: [
          { text: "Vamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "las", type: "article" },
          { text: "montañas", type: "noun" },
          { text: "Venimos", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "el", type: "article" },
          { text: "bosque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'a' с артиклем и местом.",
        maxWords: 4,
        formulaId: 9
      },
      {
        id: 920,
        ru: "Они возвращаются из деревни",
        es: "Ellos vienen del pueblo",
        correct: ["Ellos", "vienen", "de", "el", "pueblo"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "vienen", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "el", type: "article" },
          { text: "pueblo", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "van", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "ciudad", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения и предлог 'de' с артиклем и местом.",
        maxWords: 5,
        formulaId: 9
      }
    ]
  }
};