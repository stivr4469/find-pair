export const formulas = {
  spanish: {
    formula: "Описание действий через наречия",
    description: "Описывает, как выполняется действие. Наречие ставится после глагола.",
    examples: [
      {
        id: 201,
        ru: "Она поёт красиво",
        es: "Ella canta bellamente",
        correct: ["Ella", "canta", "bellamente"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "canta", type: "verb" },
          { text: "bellamente", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "corre", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "lentamente", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 202,
        ru: "Он бежит быстро",
        es: "Él corre rápido",
        correct: ["Él", "corre", "rápido"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "corre", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "Ella", type: "pronoun" },
          { text: "canta", type: "verb" },
          { text: "bellamente", type: "adverb" },
          { text: "está", type: "verb" },
          { text: "lentamente", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 203,
        ru: "Я работаю усердно",
        es: "Yo trabajo diligentemente",
        correct: ["Yo", "trabajo", "diligentemente"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "trabajo", type: "verb" },
          { text: "diligentemente", type: "adverb" },
          { text: "Tú", type: "pronoun" },
          { text: "estudias", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "perezosamente", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 204,
        ru: "Ты учишься внимательно",
        es: "Tú estudias atentamente",
        correct: ["Tú", "estudias", "atentamente"],
        wordBank: [
          { text: "Tú", type: "pronoun" },
          { text: "estudias", type: "verb" },
          { text: "atentamente", type: "adverb" },
          { text: "Yo", type: "pronoun" },
          { text: "trabajo", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "despacio", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 205,
        ru: "Мы играем весело",
        es: "Nosotros jugamos alegremente",
        correct: ["Nosotros", "jugamos", "alegremente"],
        wordBank: [
          { text: "Nosotros", type: "pronoun" },
          { text: "jugamos", type: "verb" },
          { text: "alegremente", type: "adverb" },
          { text: "Vosotros", type: "pronoun" },
          { text: "bailáis", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "está", type: "verb" },
          { text: "tristemente", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 206,
        ru: "Вы танцуете грациозно",
        es: "Vosotros bailáis graciosamente",
        correct: ["Vosotros", "bailáis", "graciosamente"],
        wordBank: [
          { text: "Vosotros", type: "pronoun" },
          { text: "bailáis", type: "verb" },
          { text: "graciosamente", type: "adverb" },
          { text: "Ellos", type: "pronoun" },
          { text: "cantan", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "torpemente", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 207,
        ru: "Они говорят тихо",
        es: "Ellos hablan bajo",
        correct: ["Ellos", "hablan", "bajo"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "hablan", type: "verb" },
          { text: "bajo", type: "adverb" },
          { text: "Ellas", type: "pronoun" },
          { text: "escuchan", type: "verb" },
          { text: "alto", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápido", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 208,
        ru: "Она слушает внимательно",
        es: "Ella escucha atentamente",
        correct: ["Ella", "escucha", "atentamente"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "escucha", type: "verb" },
          { text: "atentamente", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "habla", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "distraídamente", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 209,
        ru: "Он пишет аккуратно",
        es: "Él escribe cuidadosamente",
        correct: ["Él", "escribe", "cuidadosamente"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "escribe", type: "verb" },
          { text: "cuidadosamente", type: "adverb" },
          { text: "Ella", type: "pronoun" },
          { text: "lee", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "descuidadamente", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 210,
        ru: "Я читаю медленно",
        es: "Yo leo lentamente",
        correct: ["Yo", "leo", "lentamente"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "leo", type: "verb" },
          { text: "lentamente", type: "adverb" },
          { text: "Tú", type: "pronoun" },
          { text: "escribes", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápidamente", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 211,
        ru: "Мы готовим вкусно",
        es: "Nosotros cocinamos deliciosamente",
        correct: ["Nosotros", "cocinamos", "deliciosamente"],
        wordBank: [
          { text: "Nosotros", type: "pronoun" },
          { text: "cocinamos", type: "verb" },
          { text: "deliciosamente", type: "adverb" },
          { text: "Vosotros", type: "pronoun" },
          { text: "coméis", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "mal", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 212,
        ru: "Вы едите быстро",
        es: "Vosotros coméis rápido",
        correct: ["Vosotros", "coméis", "rápido"],
        wordBank: [
          { text: "Vosotros", type: "pronoun" },
          { text: "coméis", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "Ellos", type: "pronoun" },
          { text: "beben", type: "verb" },
          { text: "lentamente", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "despacio", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 213,
        ru: "Они пьют медленно",
        es: "Ellos beben lentamente",
        correct: ["Ellos", "beben", "lentamente"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "beben", type: "verb" },
          { text: "lentamente", type: "adverb" },
          { text: "Ellas", type: "pronoun" },
          { text: "comen", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápidamente", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 214,
        ru: "Она рисует искусно",
        es: "Ella dibuja hábilmente",
        correct: ["Ella", "dibuja", "hábilmente"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "dibuja", type: "verb" },
          { text: "hábilmente", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "pinta", type: "verb" },
          { text: "torpemente", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápido", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 215,
        ru: "Он красит аккуратно",
        es: "Él pinta cuidadosamente",
        correct: ["Él", "pinta", "cuidadosamente"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "pinta", type: "verb" },
          { text: "cuidadosamente", type: "adverb" },
          { text: "Ella", type: "pronoun" },
          { text: "dibuja", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "descuidadamente", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 216,
        ru: "Я танцую радостно",
        es: "Yo bailo alegremente",
        correct: ["Yo", "bailo", "alegremente"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "bailo", type: "verb" },
          { text: "alegremente", type: "adverb" },
          { text: "Tú", type: "pronoun" },
          { text: "cantas", type: "verb" },
          { text: "tristemente", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápido", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 217,
        ru: "Мы поём громко",
        es: "Nosotros cantamos alto",
        correct: ["Nosotros", "cantamos", "alto"],
        wordBank: [
          { text: "Nosotros", type: "pronoun" },
          { text: "cantamos", type: "verb" },
          { text: "alto", type: "adverb" },
          { text: "Vosotros", type: "pronoun" },
          { text: "habláis", type: "verb" },
          { text: "bajo", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápido", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 218,
        ru: "Вы работаете эффективно",
        es: "Vosotros trabajáis eficientemente",
        correct: ["Vosotros", "trabajáis", "eficientemente"],
        wordBank: [
          { text: "Vosotros", type: "pronoun" },
          { text: "trabajáis", type: "verb" },
          { text: "eficientemente", type: "adverb" },
          { text: "Ellos", type: "pronoun" },
          { text: "juegan", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "perezosamente", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 219,
        ru: "Они учатся старательно",
        es: "Ellos estudian diligentemente",
        correct: ["Ellos", "estudian", "diligentemente"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "estudian", type: "verb" },
          { text: "diligentemente", type: "adverb" },
          { text: "Ellas", type: "pronoun" },
          { text: "trabajan", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "perezosamente", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      },
      {
        id: 220,
        ru: "Я живу счастливо",
        es: "Yo vivo felizmente",
        correct: ["Yo", "vivo", "felizmente"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "vivo", type: "verb" },
          { text: "felizmente", type: "adverb" },
          { text: "Tú", type: "pronoun" },
          { text: "comes", type: "verb" },
          { text: "tristemente", type: "adverb" },
          { text: "es", type: "verb" },
          { text: "rápido", type: "adverb" }
        ],
        difficulty: "easy",
        hint: "Поставьте наречие после глагола для описания действия.",
        maxWords: 3,
        formulaId: 2
      }
    ]
  }
};