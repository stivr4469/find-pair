export const formulas = {
  spanish: {
    formula: "Запрос специфической информации",
    description: "Помогает задавать конкретные вопросы о чем-то или ком-то. Начинается с вопросительного слова.",
    examples: [
      {
        id: 301,
        ru: "Сколько денег?",
        es: "¿Cuánto dinero?",
        correct: ["¿Cuánto", "dinero"],
        wordBank: [
          { text: "¿Cuánto", type: "question" },
          { text: "dinero", type: "noun" },
          { text: "¿Qué", type: "question" },
          { text: "hora", type: "noun" },
          { text: "es", type: "verb" },
          { text: "¿Quién", type: "question" },
          { text: "persona", type: "noun" },
          { text: "está", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 2,
        formulaId: 3
      },
      {
        id: 302,
        ru: "Который час?",
        es: "¿Qué hora es?",
        correct: ["¿Qué", "hora", "es"],
        wordBank: [
          { text: "¿Qué", type: "question" },
          { text: "hora", type: "noun" },
          { text: "es", type: "verb" },
          { text: "¿Cuánto", type: "question" },
          { text: "dinero", type: "noun" },
          { text: "está", type: "verb" },
          { text: "¿Quién", type: "question" },
          { text: "persona", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 303,
        ru: "Кто он?",
        es: "¿Quién es él?",
        correct: ["¿Quién", "es", "él"],
        wordBank: [
          { text: "¿Quién", type: "question" },
          { text: "es", type: "verb" },
          { text: "él", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "hora", type: "noun" },
          { text: "está", type: "verb" },
          { text: "ella", type: "pronoun" },
          { text: "¿Dónde", type: "question" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 304,
        ru: "Где ты?",
        es: "¿Dónde estás tú?",
        correct: ["¿Dónde", "estás", "tú"],
        wordBank: [
          { text: "¿Dónde", type: "question" },
          { text: "estás", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Quién", type: "question" },
          { text: "es", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 305,
        ru: "Что ты делаешь?",
        es: "¿Qué haces tú?",
        correct: ["¿Qué", "haces", "tú"],
        wordBank: [
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Dónde", type: "question" },
          { text: "estás", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Quién", type: "question" },
          { text: "es", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 306,
        ru: "Когда ты придёшь?",
        es: "¿Cuándo vienes tú?",
        correct: ["¿Cuándo", "vienes", "tú"],
        wordBank: [
          { text: "¿Cuándo", type: "question" },
          { text: "vienes", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Dónde", type: "question" },
          { text: "estás", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 307,
        ru: "Как ты себя чувствуешь?",
        es: "¿Cómo estás tú?",
        correct: ["¿Cómo", "estás", "tú"],
        wordBank: [
          { text: "¿Cómo", type: "question" },
          { text: "estás", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Cuándo", type: "question" },
          { text: "vienes", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 308,
        ru: "Почему ты грустишь?",
        es: "¿Por qué estás triste?",
        correct: ["¿Por", "qué", "estás", "triste"],
        wordBank: [
          { text: "¿Por", type: "question" },
          { text: "qué", type: "question" },
          { text: "estás", type: "verb" },
          { text: "triste", type: "adjective" },
          { text: "¿Cómo", type: "question" },
          { text: "es", type: "verb" },
          { text: "feliz", type: "adjective" },
          { text: "tú", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 4,
        formulaId: 3
      },
      {
        id: 309,
        ru: "Кто они?",
        es: "¿Quiénes son ellos?",
        correct: ["¿Quiénes", "son", "ellos"],
        wordBank: [
          { text: "¿Quiénes", type: "question" },
          { text: "son", type: "verb" },
          { text: "ellos", type: "pronoun" },
          { text: "¿Quién", type: "question" },
          { text: "es", type: "verb" },
          { text: "ella", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "hacen", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 310,
        ru: "Где книги?",
        es: "¿Dónde están los libros?",
        correct: ["¿Dónde", "están", "los", "libros"],
        wordBank: [
          { text: "¿Dónde", type: "question" },
          { text: "están", type: "verb" },
          { text: "los", type: "article" },
          { text: "libros", type: "noun" },
          { text: "¿Qué", type: "question" },
          { text: "es", type: "verb" },
          { text: "las", type: "article" },
          { text: "mesas", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 4,
        formulaId: 3
      },
      {
        id: 311,
        ru: "Что это?",
        es: "¿Qué es esto?",
        correct: ["¿Qué", "es", "esto"],
        wordBank: [
          { text: "¿Qué", type: "question" },
          { text: "es", type: "verb" },
          { text: "esto", type: "pronoun" },
          { text: "¿Quién", type: "question" },
          { text: "está", type: "verb" },
          { text: "aquí", type: "adverb" },
          { text: "¿Cómo", type: "question" },
          { text: "ese", type: "pronoun" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 312,
        ru: "Когда начинается урок?",
        es: "¿Cuándo empieza la clase?",
        correct: ["¿Cuándo", "empieza", "la", "clase"],
        wordBank: [
          { text: "¿Cuándo", type: "question" },
          { text: "empieza", type: "verb" },
          { text: "la", type: "article" },
          { text: "clase", type: "noun" },
          { text: "¿Qué", type: "question" },
          { text: "termina", type: "verb" },
          { text: "el", type: "article" },
          { text: "trabajo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 4,
        formulaId: 3
      },
      {
        id: 313,
        ru: "Как зовут твоего друга?",
        es: "¿Cómo se llama tu amigo?",
        correct: ["¿Cómo", "se", "llama", "tu", "amigo"],
        wordBank: [
          { text: "¿Cómo", type: "question" },
          { text: "se", type: "pronoun" },
          { text: "llama", type: "verb" },
          { text: "tu", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "¿Quién", type: "question" },
          { text: "es", type: "verb" },
          { text: "tu", type: "pronoun" },
          { text: "hermana", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 5,
        formulaId: 3
      },
      {
        id: 314,
        ru: "Почему ты опоздал?",
        es: "¿Por qué llegaste tarde?",
        correct: ["¿Por", "qué", "llegaste", "tarde"],
        wordBank: [
          { text: "¿Por", type: "question" },
          { text: "qué", type: "question" },
          { text: "llegaste", type: "verb" },
          { text: "tarde", type: "adverb" },
          { text: "¿Cuándo", type: "question" },
          { text: "vienes", type: "verb" },
          { text: "temprano", type: "adverb" },
          { text: "tú", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 4,
        formulaId: 3
      },
      {
        id: 315,
        ru: "Кто написал эту книгу?",
        es: "¿Quién escribió este libro?",
        correct: ["¿Quién", "escribió", "este", "libro"],
        wordBank: [
          { text: "¿Quién", type: "question" },
          { text: "escribió", type: "verb" },
          { text: "este", type: "pronoun" },
          { text: "libro", type: "noun" },
          { text: "¿Qué", type: "question" },
          { text: "lee", type: "verb" },
          { text: "esa", type: "pronoun" },
          { text: "carta", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 4,
        formulaId: 3
      },
      {
        id: 316,
        ru: "Где ты живёшь?",
        es: "¿Dónde vives tú?",
        correct: ["¿Dónde", "vives", "tú"],
        wordBank: [
          { text: "¿Dónde", type: "question" },
          { text: "vives", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Cómo", type: "question" },
          { text: "estás", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 317,
        ru: "Что ты ешь?",
        es: "¿Qué comes tú?",
        correct: ["¿Qué", "comes", "tú"],
        wordBank: [
          { text: "¿Qué", type: "question" },
          { text: "comes", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Dónde", type: "question" },
          { text: "vives", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Cuándo", type: "question" },
          { text: "bebes", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 318,
        ru: "Когда ты работаешь?",
        es: "¿Cuándo trabajas tú?",
        correct: ["¿Cuándo", "trabajas", "tú"],
        wordBank: [
          { text: "¿Cuándo", type: "question" },
          { text: "trabajas", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Dónde", type: "question" },
          { text: "estudias", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 319,
        ru: "Как ты учишься?",
        es: "¿Cómo estudias tú?",
        correct: ["¿Cómo", "estudias", "tú"],
        wordBank: [
          { text: "¿Cómo", type: "question" },
          { text: "estudias", type: "verb" },
          { text: "tú", type: "pronoun" },
          { text: "¿Cuándo", type: "question" },
          { text: "trabajas", type: "verb" },
          { text: "yo", type: "pronoun" },
          { text: "¿Qué", type: "question" },
          { text: "haces", type: "verb" }
        ],
        difficulty: "easy",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 3,
        formulaId: 3
      },
      {
        id: 320,
        ru: "Почему ты читаешь эту книгу?",
        es: "¿Por qué lees este libro?",
        correct: ["¿Por", "qué", "lees", "este", "libro"],
        wordBank: [
          { text: "¿Por", type: "question" },
          { text: "qué", type: "question" },
          { text: "lees", type: "verb" },
          { text: "este", type: "pronoun" },
          { text: "libro", type: "noun" },
          { text: "¿Quién", type: "question" },
          { text: "escribe", type: "verb" },
          { text: "esa", type: "pronoun" },
          { text: "carta", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопросительное слово в начале предложения.",
        maxWords: 5,
        formulaId: 3
      }
    ]
  }
};