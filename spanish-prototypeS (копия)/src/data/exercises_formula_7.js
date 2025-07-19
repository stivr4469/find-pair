export const formulas = {
  spanish: {
    formula: "Конструкции с глаголом ser",
    description: "Используется для описания характеристик, профессий, идентификации или принадлежности с глаголом 'ser' в настоящем времени.",
    examples: [
      {
        id: 701,
        ru: "Я учитель",
        es: "Soy profesor",
        correct: ["Soy", "profesor"],
        wordBank: [
          { text: "Soy", type: "verb" },
          { text: "profesor", type: "noun" },
          { text: "Eres", type: "verb" },
          { text: "estudiante", type: "noun" },
          { text: "médico", type: "noun" },
          { text: "la", type: "article" },
          { text: "es", type: "verb" },
          { text: "abogado", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим профессию.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 702,
        ru: "Ты студент",
        es: "Eres estudiante",
        correct: ["Eres", "estudiante"],
        wordBank: [
          { text: "Eres", type: "verb" },
          { text: "estudiante", type: "noun" },
          { text: "Soy", type: "verb" },
          { text: "profesor", type: "noun" },
          { text: "médico", type: "noun" },
          { text: "la", type: "article" },
          { text: "es", type: "verb" },
          { text: "amigo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим профессию.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 703,
        ru: "Она врач",
        es: "Ella es médica",
        correct: ["Ella", "es", "médica"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "es", type: "verb" },
          { text: "médica", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "soy", type: "verb" },
          { text: "enfermera", type: "noun" },
          { text: "la", type: "article" },
          { text: "profesora", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол 'ser' с профессией.",
        maxWords: 3,
        formulaId: 7
      },
      {
        id: 704,
        ru: "Он инженер",
        es: "Es ingeniero",
        correct: ["Es", "ingeniero"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "ingeniero", type: "noun" },
          { text: "Eres", type: "verb" },
          { text: "abogado", type: "noun" },
          { text: "médico", type: "noun" },
          { text: "el", type: "article" },
          { text: "estudiante", type: "noun" },
          { text: "soy", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим профессию.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 705,
        ru: "Мы друзья",
        es: "Somos amigos",
        correct: ["Somos", "amigos"],
        wordBank: [
          { text: "Somos", type: "verb" },
          { text: "amigos", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "familia", type: "noun" },
          { text: "hermanos", type: "noun" },
          { text: "los", type: "article" },
          { text: "es", type: "verb" },
          { text: "compañeros", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим отношение.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 706,
        ru: "Вы учителя",
        es: "Sois profesores",
        correct: ["Sois", "profesores"],
        wordBank: [
          { text: "Sois", type: "verb" },
          { text: "profesores", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "estudiantes", type: "noun" },
          { text: "médicos", type: "noun" },
          { text: "los", type: "article" },
          { text: "es", type: "verb" },
          { text: "amigos", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим профессию.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 707,
        ru: "Они студенты университета",
        es: "Son estudiantes de la universidad",
        correct: ["Son", "estudiantes", "de", "la", "universidad"],
        wordBank: [
          { text: "Son", type: "verb" },
          { text: "estudiantes", type: "noun" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "universidad", type: "noun" },
          { text: "Es", type: "verb" },
          { text: "profesores", type: "noun" },
          { text: "el", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным и принадлежностью.",
        maxWords: 5,
        formulaId: 7
      },
      {
        id: 708,
        ru: "Я высокий",
        es: "Soy alto",
        correct: ["Soy", "alto"],
        wordBank: [
          { text: "Soy", type: "verb" },
          { text: "alto", type: "adjective" },
          { text: "Eres", type: "verb" },
          { text: "bajo", type: "adjective" },
          { text: "joven", type: "adjective" },
          { text: "el", type: "article" },
          { text: "es", type: "verb" },
          { text: "hombre", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательным, описывающим характеристику.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 709,
        ru: "Ты умный",
        es: "Eres inteligente",
        correct: ["Eres", "inteligente"],
        wordBank: [
          { text: "Eres", type: "verb" },
          { text: "inteligente", type: "adjective" },
          { text: "Soy", type: "verb" },
          { text: "amable", type: "adjective" },
          { text: "joven", type: "adjective" },
          { text: "la", type: "article" },
          { text: "es", type: "verb" },
          { text: "persona", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательным, описывающим характеристику.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 710,
        ru: "Она красивая",
        es: "Ella es bonita",
        correct: ["Ella", "es", "bonita"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "es", type: "verb" },
          { text: "bonita", type: "adjective" },
          { text: "Él", type: "pronoun" },
          { text: "soy", type: "verb" },
          { text: "alta", type: "adjective" },
          { text: "la", type: "article" },
          { text: "mujer", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол 'ser' с прилагательным.",
        maxWords: 3,
        formulaId: 7
      },
      {
        id: 711,
        ru: "Он добрый",
        es: "Es amable",
        correct: ["Es", "amable"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "amable", type: "adjective" },
          { text: "Eres", type: "verb" },
          { text: "inteligente", type: "adjective" },
          { text: "joven", type: "adjective" },
          { text: "el", type: "article" },
          { text: "hombre", type: "noun" },
          { text: "soy", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательным, описывающим характеристику.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 712,
        ru: "Мы весёлые",
        es: "Somos alegres",
        correct: ["Somos", "alegres"],
        wordBank: [
          { text: "Somos", type: "verb" },
          { text: "alegres", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "tristes", type: "adjective" },
          { text: "amables", type: "adjective" },
          { text: "los", type: "article" },
          { text: "es", type: "verb" },
          { text: "amigos", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательным, описывающим характеристику.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 713,
        ru: "Вы молодые",
        es: "Sois jóvenes",
        correct: ["Sois", "jóvenes"],
        wordBank: [
          { text: "Sois", type: "verb" },
          { text: "jóvenes", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "viejos", type: "adjective" },
          { text: "inteligentes", type: "adjective" },
          { text: "los", type: "article" },
          { text: "es", type: "verb" },
          { text: "estudiantes", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательным, описывающим характеристику.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 714,
        ru: "Они братья",
        es: "Son hermanos",
        correct: ["Son", "hermanos"],
        wordBank: [
          { text: "Son", type: "verb" },
          { text: "hermanos", type: "noun" },
          { text: "Es", type: "verb" },
          { text: "amigos", type: "noun" },
          { text: "padres", type: "noun" },
          { text: "los", type: "article" },
          { text: "somos", type: "verb" },
          { text: "familia", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим отношение.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 715,
        ru: "Я из России",
        es: "Soy de Rusia",
        correct: ["Soy", "de", "Rusia"],
        wordBank: [
          { text: "Soy", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "Rusia", type: "noun" },
          { text: "Eres", type: "verb" },
          { text: "España", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "Francia", type: "noun" },
          { text: "es", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с предлогом 'de' и названием страны.",
        maxWords: 3,
        formulaId: 7
      },
      {
        id: 716,
        ru: "Ты из Испании",
        es: "Eres de España",
        correct: ["Eres", "de", "España"],
        wordBank: [
          { text: "Eres", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "España", type: "noun" },
          { text: "Soy", type: "verb" },
          { text: "Rusia", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "Francia", type: "noun" },
          { text: "es", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с предлогом 'de' и названием страны.",
        maxWords: 3,
        formulaId: 7
      },
      {
        id: 717,
        ru: "Она адвокат",
        es: "Ella es abogada",
        correct: ["Ella", "es", "abogada"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "es", type: "verb" },
          { text: "abogada", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "soy", type: "verb" },
          { text: "médica", type: "noun" },
          { text: "la", type: "article" },
          { text: "profesora", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол 'ser' с профессией.",
        maxWords: 3,
        formulaId: 7
      },
      {
        id: 718,
        ru: "Он из Франции",
        es: "Es de Francia",
        correct: ["Es", "de", "Francia"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "de", type: "preposition" },
          { text: "Francia", type: "noun" },
          { text: "Eres", type: "verb" },
          { text: "España", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "Rusia", type: "noun" },
          { text: "soy", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с предлогом 'de' и названием страны.",
        maxWords: 3,
        formulaId: 7
      },
      {
        id: 719,
        ru: "Мы инженеры",
        es: "Somos ingenieros",
        correct: ["Somos", "ingenieros"],
        wordBank: [
          { text: "Somos", type: "verb" },
          { text: "ingenieros", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "profesores", type: "noun" },
          { text: "médicos", type: "noun" },
          { text: "los", type: "article" },
          { text: "es", type: "verb" },
          { text: "estudiantes", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным, обозначающим профессию.",
        maxWords: 2,
        formulaId: 7
      },
      {
        id: 720,
        ru: "Они добрые люди",
        es: "Son personas amables",
        correct: ["Son", "personas", "amables"],
        wordBank: [
          { text: "Son", type: "verb" },
          { text: "personas", type: "noun" },
          { text: "amables", type: "adjective" },
          { text: "Es", type: "verb" },
          { text: "inteligentes", type: "adjective" },
          { text: "amigos", type: "noun" },
          { text: "las", type: "article" },
          { text: "jóvenes", type: "adjective" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с существительным и прилагательным.",
        maxWords: 3,
        formulaId: 7
      }
    ]
  }
};
