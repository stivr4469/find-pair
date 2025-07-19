export const formulas = {
  spanish: {
    formula: "Описание внешности и характера",
    description: "Используется для описания внешности и характера с глаголом 'ser', 'tener' и прилагательными.",
    examples: [
      {
        id: 1501,
        ru: "Я высокий и весёлый",
        es: "Soy alto y alegre",
        correct: ["Soy", "alto", "y", "alegre"],
        wordBank: [
          { text: "Soy", type: "verb" },
          { text: "alto", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "alegre", type: "adjective" },
          { text: "Eres", type: "verb" },
          { text: "bajo", type: "adjective" },
          { text: "triste", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1502,
        ru: "Ты умный и добрый",
        es: "Eres inteligente y amable",
        correct: ["Eres", "inteligente", "y", "amable"],
        wordBank: [
          { text: "Eres", type: "verb" },
          { text: "inteligente", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "amable", type: "adjective" },
          { text: "Soy", type: "verb" },
          { text: "serio", type: "adjective" },
          { text: "estricto", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1503,
        ru: "Она красивая и дружелюбная",
        es: "Ella es guapa y simpática",
        correct: ["Ella", "es", "guapa", "y", "simpática"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "es", type: "verb" },
          { text: "guapa", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "simpática", type: "adjective" },
          { text: "Él", type: "pronoun" },
          { text: "seria", type: "adjective" },
          { text: "tímida", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'ser' с прилагательными и союзом.",
        maxWords: 5,
        formulaId: 15
      },
      {
        id: 1504,
        ru: "Он имеет длинные волосы",
        es: "Tiene el pelo largo",
        correct: ["Tiene", "el", "pelo", "largo"],
        wordBank: [
          { text: "Tiene", type: "verb" },
          { text: "el", type: "article" },
          { text: "pelo", type: "noun" },
          { text: "largo", type: "adjective" },
          { text: "Es", type: "verb" },
          { text: "corto", type: "adjective" },
          { text: "ojos", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'tener' с артиклем и прилагательным.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1505,
        ru: "Мы весёлые и активные",
        es: "Somos alegres y activos",
        correct: ["Somos", "alegres", "y", "activos"],
        wordBank: [
          { text: "Somos", type: "verb" },
          { text: "alegres", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "activos", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "tranquilos", type: "adjective" },
          { text: "serios", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1506,
        ru: "Вы высокие и сильные",
        es: "Sois altos y fuertes",
        correct: ["Sois", "altos", "y", "fuertes"],
        wordBank: [
          { text: "Sois", type: "verb" },
          { text: "altos", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "fuertes", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "bajos", type: "adjective" },
          { text: "débiles", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1507,
        ru: "Они добрые и умные",
        es: "Ellos son amables e inteligentes",
        correct: ["Ellos", "son", "amables", "e", "inteligentes"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "son", type: "verb" },
          { text: "amables", type: "adjective" },
          { text: "e", type: "conjunction" },
          { text: "inteligentes", type: "adjective" },
          { text: "Ellas", type: "pronoun" },
          { text: "serios", type: "adjective" },
          { text: "tímidos", type: "adjective" },
          { text: "y", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'ser' с прилагательными и союзом.",
        maxWords: 5,
        formulaId: 15
      },
      {
        id: 1508,
        ru: "У меня карие глаза",
        es: "Tengo los ojos marrones",
        correct: ["Tengo", "los", "ojos", "marrones"],
        wordBank: [
          { text: "Tengo", type: "verb" },
          { text: "los", type: "article" },
          { text: "ojos", type: "noun" },
          { text: "marrones", type: "adjective" },
          { text: "Soy", type: "verb" },
          { text: "azules", type: "adjective" },
          { text: "pelo", type: "noun" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'tener' с артиклем и прилагательным.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1509,
        ru: "Ты очень серьёзный",
        es: "Eres muy serio",
        correct: ["Eres", "muy", "serio"],
        wordBank: [
          { text: "Eres", type: "verb" },
          { text: "muy", type: "adverb" },
          { text: "serio", type: "adjective" },
          { text: "Soy", type: "verb" },
          { text: "alegre", type: "adjective" },
          { text: "bastante", type: "adverb" },
          { text: "tímido", type: "adjective" },
          { text: "y", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с наречием и прилагательным.",
        maxWords: 3,
        formulaId: 15
      },
      {
        id: 1510,
        ru: "Она имеет короткие волосы",
        es: "Ella tiene el pelo corto",
        correct: ["Ella", "tiene", "el", "pelo", "corto"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "tiene", type: "verb" },
          { text: "el", type: "article" },
          { text: "pelo", type: "noun" },
          { text: "corto", type: "adjective" },
          { text: "Él", type: "pronoun" },
          { text: "largo", type: "adjective" },
          { text: "ojos", type: "noun" },
          { text: "es", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener' с артиклем и прилагательным.",
        maxWords: 5,
        formulaId: 15
      },
      {
        id: 1511,
        ru: "Он щедрый и дружелюбный",
        es: "Es generoso y simpático",
        correct: ["Es", "generoso", "y", "simpático"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "generoso", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "simpático", type: "adjective" },
          { text: "Tiene", type: "verb" },
          { text: "serio", type: "adjective" },
          { text: "tímido", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1512,
        ru: "У нас тёмные волосы",
        es: "Tenemos el pelo oscuro",
        correct: ["Tenemos", "el", "pelo", "oscuro"],
        wordBank: [
          { text: "Tenemos", type: "verb" },
          { text: "el", type: "article" },
          { text: "pelo", type: "noun" },
          { text: "oscuro", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "claro", type: "adjective" },
          { text: "ojos", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'tener' с артиклем и прилагательным.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1513,
        ru: "Вы очень умные",
        es: "Sois muy inteligentes",
        correct: ["Sois", "muy", "inteligentes"],
        wordBank: [
          { text: "Sois", type: "verb" },
          { text: "muy", type: "adverb" },
          { text: "inteligentes", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "serios", type: "adjective" },
          { text: "bastante", type: "adverb" },
          { text: "tímidos", type: "adjective" },
          { text: "y", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с наречием и прилагательным.",
        maxWords: 3,
        formulaId: 15
      },
      {
        id: 1514,
        ru: "Они красивые и весёлые",
        es: "Son guapos y alegres",
        correct: ["Son", "guapos", "y", "alegres"],
        wordBank: [
          { text: "Son", type: "verb" },
          { text: "guapos", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "alegres", type: "adjective" },
          { text: "Tienen", type: "verb" },
          { text: "serios", type: "adjective" },
          { text: "tímidos", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1515,
        ru: "У меня голубые глаза",
        es: "Tengo los ojos azules",
        correct: ["Tengo", "los", "ojos", "azules"],
        wordBank: [
          { text: "Tengo", type: "verb" },
          { text: "los", type: "article" },
          { text: "ojos", type: "noun" },
          { text: "azules", type: "adjective" },
          { text: "Soy", type: "verb" },
          { text: "verdes", type: "adjective" },
          { text: "pelo", type: "noun" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'tener' с артиклем и прилагательным.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1516,
        ru: "Ты очень добрый",
        es: "Eres muy amable",
        correct: ["Eres", "muy", "amable"],
        wordBank: [
          { text: "Eres", type: "verb" },
          { text: "muy", type: "adverb" },
          { text: "amable", type: "adjective" },
          { text: "Soy", type: "verb" },
          { text: "serio", type: "adjective" },
          { text: "bastante", type: "adverb" },
          { text: "tímido", type: "adjective" },
          { text: "y", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с наречием и прилагательным.",
        maxWords: 3,
        formulaId: 15
      },
      {
        id: 1517,
        ru: "Она высокая и умная",
        es: "Ella es alta e inteligente",
        correct: ["Ella", "es", "alta", "e", "inteligente"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "es", type: "verb" },
          { text: "alta", type: "adjective" },
          { text: "e", type: "conjunction" },
          { text: "inteligente", type: "adjective" },
          { text: "Él", type: "pronoun" },
          { text: "baja", type: "adjective" },
          { text: "seria", type: "adjective" },
          { text: "y", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'ser' с прилагательными и союзом.",
        maxWords: 5,
        formulaId: 15
      },
      {
        id: 1518,
        ru: "У него длинные волосы",
        es: "Tiene el pelo largo",
        correct: ["Tiene", "el", "pelo", "largo"],
        wordBank: [
          { text: "Tiene", type: "verb" },
          { text: "el", type: "article" },
          { text: "pelo", type: "noun" },
          { text: "largo", type: "adjective" },
          { text: "Es", type: "verb" },
          { text: "corto", type: "adjective" },
          { text: "ojos", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'tener' с артиклем и прилагательным.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1519,
        ru: "Мы дружелюбные и активные",
        es: "Somos simpáticos y activos",
        correct: ["Somos", "simpáticos", "y", "activos"],
        wordBank: [
          { text: "Somos", type: "verb" },
          { text: "simpáticos", type: "adjective" },
          { text: "y", type: "conjunction" },
          { text: "activos", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "tranquilos", type: "adjective" },
          { text: "serios", type: "adjective" },
          { text: "o", type: "conjunction" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с прилагательными и союзом.",
        maxWords: 4,
        formulaId: 15
      },
      {
        id: 1520,
        ru: "Они имеют карие глаза",
        es: "Tienen los ojos marrones",
        correct: ["Tienen", "los", "ojos", "marrones"],
        wordBank: [
          { text: "Tienen", type: "verb" },
          { text: "los", type: "article" },
          { text: "ojos", type: "noun" },
          { text: "marrones", type: "adjective" },
          { text: "Son", type: "verb" },
          { text: "azules", type: "adjective" },
          { text: "pelo", type: "noun" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'tener' с артиклем и прилагательным.",
        maxWords: 4,
        formulaId: 15
      }
    ]
  }
};