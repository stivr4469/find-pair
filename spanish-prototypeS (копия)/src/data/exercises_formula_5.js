export const formulas = {
  spanish: {
    formula: "Личное 'a'",
    description: "Используется для введения человека или конкретного животного, которое является прямым дополнением.",
    examples: [
      {
        id: 501,
        ru: "Роберто видит свою мать",
        es: "Roberto ve a su madre",
        correct: ["Roberto", "ve", "a", "su", "madre"],
        wordBank: [
          { text: "Roberto", type: "noun" },
          { text: "ve", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "su", type: "pronoun" },
          { text: "madre", type: "noun" },
          { text: "María", type: "noun" },
          { text: "libro", type: "noun" },
          { text: "lee", type: "verb" },
          { text: "el", type: "article" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 502,
        ru: "Я навещаю свою бабушку",
        es: "Yo visito a mi abuela",
        correct: ["Yo", "visito", "a", "mi", "abuela"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "visito", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "mi", type: "pronoun" },
          { text: "abuela", type: "noun" },
          { text: "casa", type: "noun" },
          { text: "veo", type: "verb" },
          { text: "la", type: "article" },
          { text: "hermana", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 503,
        ru: "Она знает Педро",
        es: "Ella conoce a Pedro",
        correct: ["Ella", "conoce", "a", "Pedro"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "conoce", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "Pedro", type: "noun" },
          { text: "Juan", type: "noun" },
          { text: "ve", type: "verb" },
          { text: "el", type: "article" },
          { text: "coche", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 4,
        formulaId: 5
      },
      {
        id: 504,
        ru: "Он зовёт своего друга",
        es: "Él llama a su amigo",
        correct: ["Él", "llama", "a", "su", "amigo"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "llama", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "su", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "hermana", type: "noun" },
          { text: "ve", type: "verb" },
          { text: "la", type: "article" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 505,
        ru: "Мы видим учителя",
        es: "Nosotros vemos al profesor",
        correct: ["Nosotros", "vemos", "a", "el", "profesor"],
        wordBank: [
          { text: "Nosotros", type: "pronoun" },
          { text: "vemos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "profesor", type: "noun" },
          { text: "libro", type: "noun" },
          { text: "leemos", type: "verb" },
          { text: "la", type: "article" },
          { text: "estudiante", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 506,
        ru: "Вы встречаете сестру",
        es: "Vosotros encontráis a la hermana",
        correct: ["Vosotros", "encontráis", "a", "la", "hermana"],
        wordBank: [
          { text: "Vosotros", type: "pronoun" },
          { text: "encontráis", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "hermana", type: "noun" },
          { text: "amigo", type: "noun" },
          { text: "vemos", type: "verb" },
          { text: "el", type: "article" },
          { text: "coche", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 507,
        ru: "Они зовут врача",
        es: "Ellos llaman al médico",
        correct: ["Ellos", "llaman", "a", "el", "médico"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "llaman", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "médico", type: "noun" },
          { text: "enfermera", type: "noun" },
          { text: "ven", type: "verb" },
          { text: "la", type: "article" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 508,
        ru: "Я знаю своего соседа",
        es: "Yo conozco a mi vecino",
        correct: ["Yo", "conozco", "a", "mi", "vecino"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "conozco", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "mi", type: "pronoun" },
          { text: "vecino", type: "noun" },
          { text: "casa", type: "noun" },
          { text: "veo", type: "verb" },
          { text: "el", type: "article" },
          { text: "amigo", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 509,
        ru: "Ты видишь ребёнка",
        es: "Tú ves al niño",
        correct: ["Tú", "ves", "a", "el", "niño"],
        wordBank: [
          { text: "Tú", type: "pronoun" },
          { text: "ves", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "niño", type: "noun" },
          { text: "juguete", type: "noun" },
          { text: "juegas", type: "verb" },
          { text: "la", type: "article" },
          { text: "niña", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 510,
        ru: "Она встречает своего брата",
        es: "Ella encuentra a su hermano",
        correct: ["Ella", "encuentra", "a", "su", "hermano"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "encuentra", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "su", type: "pronoun" },
          { text: "hermano", type: "noun" },
          { text: "amiga", type: "noun" },
          { text: "ve", type: "verb" },
          { text: "la", type: "article" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 511,
        ru: "Мы приглашаем друзей",
        es: "Nosotros invitamos a los amigos",
        correct: ["Nosotros", "invitamos", "a", "los", "amigos"],
        wordBank: [
          { text: "Nosotros", type: "pronoun" },
          { text: "invitamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "los", type: "article" },
          { text: "amigos", type: "noun" },
          { text: "fiesta", type: "noun" },
          { text: "organizamos", type: "verb" },
          { text: "las", type: "article" },
          { text: "vecinas", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 512,
        ru: "Вы слушаете учителя",
        es: "Vosotros escucháis al profesor",
        correct: ["Vosotros", "escucháis", "a", "el", "profesor"],
        wordBank: [
          { text: "Vosotros", type: "pronoun" },
          { text: "escucháis", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "profesor", type: "noun" },
          { text: "radio", type: "noun" },
          { text: "oís", type: "verb" },
          { text: "la", type: "article" },
          { text: "estudiante", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 513,
        ru: "Они помогают соседям",
        es: "Ellos ayudan a los vecinos",
        correct: ["Ellos", "ayudan", "a", "los", "vecinos"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "ayudan", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "los", type: "article" },
          { text: "vecinos", type: "noun" },
          { text: "casa", type: "noun" },
          { text: "limpian", type: "verb" },
          { text: "la", type: "article" },
          { text: "amigos", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 514,
        ru: "Я вижу своего отца",
        es: "Yo veo a mi padre",
        correct: ["Yo", "veo", "a", "mi", "padre"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "veo", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "mi", type: "pronoun" },
          { text: "padre", type: "noun" },
          { text: "coche", type: "noun" },
          { text: "conduzco", type: "verb" },
          { text: "el", type: "article" },
          { text: "hermano", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 515,
        ru: "Ты зовёшь свою подругу",
        es: "Tú llamas a tu amiga",
        correct: ["Tú", "llamas", "a", "tu", "amiga"],
        wordBank: [
          { text: "Tú", type: "pronoun" },
          { text: "llamas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "tu", type: "pronoun" },
          { text: "amiga", type: "noun" },
          { text: "hermano", type: "noun" },
          { text: "ves", type: "verb" },
          { text: "el", type: "article" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 516,
        ru: "Она навещает своего деда",
        es: "Ella visita a su abuelo",
        correct: ["Ella", "visita", "a", "su", "abuelo"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "visita", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "su", type: "pronoun" },
          { text: "abuelo", type: "noun" },
          { text: "casa", type: "noun" },
          { text: "ve", type: "verb" },
          { text: "la", type: "article" },
          { text: "abuela", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 517,
        ru: "Мы знаем студентов",
        es: "Nosotros conocemos a los estudiantes",
        correct: ["Nosotros", "conocemos", "a", "los", "estudiantes"],
        wordBank: [
          { text: "Nosotros", type: "pronoun" },
          { text: "conocemos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "los", type: "article" },
          { text: "estudiantes", type: "noun" },
          { text: "libros", type: "noun" },
          { text: "leemos", type: "verb" },
          { text: "las", type: "article" },
          { text: "profesores", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 518,
        ru: "Вы видите врача",
        es: "Vosotros veis al médico",
        correct: ["Vosotros", "veis", "a", "el", "médico"],
        wordBank: [
          { text: "Vosotros", type: "pronoun" },
          { text: "veis", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "médico", type: "noun" },
          { text: "enfermera", type: "noun" },
          { text: "llamáis", type: "verb" },
          { text: "la", type: "article" },
          { text: "hospital", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 519,
        ru: "Они приглашают гостей",
        es: "Ellos invitan a los invitados",
        correct: ["Ellos", "invitan", "a", "los", "invitados"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "invitan", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "los", type: "article" },
          { text: "invitados", type: "noun" },
          { text: "fiesta", type: "noun" },
          { text: "organizan", type: "verb" },
          { text: "las", type: "article" },
          { text: "amigos", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      },
      {
        id: 520,
        ru: "Я встречаю своего друга",
        es: "Yo encuentro a mi amigo",
        correct: ["Yo", "encuentro", "a", "mi", "amigo"],
        wordBank: [
          { text: "Yo", type: "pronoun" },
          { text: "encuentro", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "mi", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "casa", type: "noun" },
          { text: "visito", type: "verb" },
          { text: "el", type: "article" },
          { text: "hermano", type: "noun" }
        ],
        difficulty: "easy",
        hint: "Используйте предлог 'a' перед прямым дополнением, если это человек.",
        maxWords: 5,
        formulaId: 5
      }
    ]
  }
};