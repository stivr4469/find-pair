export const formulas = {
  spanish: {
    formula: "Выражение действия в прошедшем времени",
    description: "Используется для описания действий, завершённых в прошлом, с использованием Pretérito Perfecto или Pretérito Indefinido.",
    examples: [
      {
        id: 1101,
        ru: "Я ел яблоко вчера",
        es: "Comí una manzana ayer",
        correct: ["Comí", "una", "manzana", "ayer"],
        wordBank: [
          { text: "Comí", type: "verb" },
          { text: "una", type: "article" },
          { text: "manzana", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Como", type: "verb" },
          { text: "un", type: "article" },
          { text: "plátano", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido с артиклем, существительным и указанием времени.",
        maxWords: 4,
        formulaId: 11
      },
      {
        id: 1102,
        ru: "Ты читал книгу на прошлой неделе",
        es: "Leíste un libro la semana pasada",
        correct: ["Leíste", "un", "libro", "la", "semana", "pasada"],
        wordBank: [
          { text: "Leíste", type: "verb" },
          { text: "un", type: "article" },
          { text: "libro", type: "noun" },
          { text: "la", type: "article" },
          { text: "semana", type: "noun" },
          { text: "pasada", type: "adjective" },
          { text: "Lees", type: "verb" },
          { text: "revista", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido с артиклем и указанием времени.",
        maxWords: 6,
        formulaId: 11
      },
      {
        id: 1103,
        ru: "Она работала в офисе вчера",
        es: "Ella trabajó en la oficina ayer",
        correct: ["Ella", "trabajó", "en", "la", "oficina", "ayer"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "trabajó", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "trabaja", type: "verb" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido, предлог и место.",
        maxWords: 6,
        formulaId: 11
      },
      {
        id: 1104,
        ru: "Он играл в футбол утром",
        es: "Él jugó al fútbol por la mañana",
        correct: ["Él", "jugó", "a", "el", "fútbol", "por", "la", "mañana"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "jugó", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "juega", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido, предлог и указание времени.",
        maxWords: 8,
        formulaId: 11
      },
      {
        id: 1105,
        ru: "Мы учились в школе вчера",
        es: "Estudiamos en la escuela ayer",
        correct: ["Estudiamos", "en", "la", "escuela", "ayer"],
        wordBank: [
          { text: "Estudiamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Estudian", type: "verb" },
          { text: "el", type: "article" },
          { text: "instituto", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido, предлог и место.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1106,
        ru: "Вы смотрели фильм вчера",
        es: "Visteis una película ayer",
        correct: ["Visteis", "una", "película", "ayer"],
        wordBank: [
          { text: "Visteis", type: "verb" },
          { text: "una", type: "article" },
          { text: "película", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Miráis", type: "verb" },
          { text: "el", type: "article" },
          { text: "televisor", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido с артиклем и указанием времени.",
        maxWords: 4,
        formulaId: 11
      },
      {
        id: 1107,
        ru: "Они танцевали на вечеринке",
        es: "Ellos bailaron en la fiesta",
        correct: ["Ellos", "bailaron", "en", "la", "fiesta"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "bailaron", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "fiesta", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "cantaron", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "discoteca", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido и предлог с местом.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1108,
        ru: "Я приготовил ужин вчера",
        es: "He cocinado la cena ayer",
        correct: ["He", "cocinado", "la", "cena", "ayer"],
        wordBank: [
          { text: "He", type: "verb" },
          { text: "cocinado", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Cocino", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте Pretérito Perfecto с артиклем и указанием времени.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1109,
        ru: "Ты написал письмо другу",
        es: "Escribiste una carta a tu amigo",
        correct: ["Escribiste", "una", "carta", "a", "tu", "amigo"],
        wordBank: [
          { text: "Escribiste", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "tu", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "Escribes", type: "verb" },
          { text: "correo", type: "noun" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido с артиклем и предлогом.",
        maxWords: 6,
        formulaId: 11
      },
      {
        id: 1110,
        ru: "Она спела песню вчера",
        es: "Ella cantó una canción ayer",
        correct: ["Ella", "cantó", "una", "canción", "ayer"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "cantó", type: "verb" },
          { text: "una", type: "article" },
          { text: "canción", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "tocó", type: "verb" },
          { text: "guitarra", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido и артикль с указанием времени.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1111,
        ru: "Он бегал в парке утром",
        es: "Él corrió en el parque por la mañana",
        correct: ["Él", "corrió", "en", "el", "parque", "por", "la", "mañana"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "corrió", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "corre", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido и предлог с местом и временем.",
        maxWords: 8,
        formulaId: 11
      },
      {
        id: 1112,
        ru: "Мы слушали музыку вчера",
        es: "Escuchamos música ayer",
        correct: ["Escuchamos", "música", "ayer"],
        wordBank: [
          { text: "Escuchamos", type: "verb" },
          { text: "música", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Escuchan", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "hoy", type: "adverb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido и существительное с указанием времени.",
        maxWords: 3,
        formulaId: 11
      },
      {
        id: 1113,
        ru: "Вы плавали в бассейне вчера",
        es: "Nadasteis en la piscina ayer",
        correct: ["Nadasteis", "en", "la", "piscina", "ayer"],
        wordBank: [
          { text: "Nadasteis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "piscina", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Nadan", type: "verb" },
          { text: "el", type: "article" },
          { text: "mar", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido и предлог с местом и временем.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1114,
        ru: "Они учились в университете",
        es: "Ellos han estudiado en la universidad",
        correct: ["Ellos", "han", "estudiado", "en", "la", "universidad"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "han", type: "verb" },
          { text: "estudiado", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "universidad", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "estudian", type: "verb" },
          { text: "escuela", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте Pretérito Perfecto и предлог с местом.",
        maxWords: 6,
        formulaId: 11
      },
      {
        id: 1115,
        ru: "Я нарисовал картину вчера",
        es: "Dibujé un cuadro ayer",
        correct: ["Dibujé", "un", "cuadro", "ayer"],
        wordBank: [
          { text: "Dibujé", type: "verb" },
          { text: "un", type: "article" },
          { text: "cuadro", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Dibujo", type: "verb" },
          { text: "una", type: "article" },
          { text: "foto", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido с артиклем и указанием времени.",
        maxWords: 4,
        formulaId: 11
      },
      {
        id: 1116,
        ru: "Ты пил кофе утром",
        es: "Bebiste café por la mañana",
        correct: ["Bebiste", "café", "por", "la", "mañana"],
        wordBank: [
          { text: "Bebiste", type: "verb" },
          { text: "café", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Bebes", type: "verb" },
          { text: "té", type: "noun" },
          { text: "hoy", type: "adverb" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido и предлог с указанием времени.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1117,
        ru: "Она купила одежду вчера",
        es: "Ella compró ropa ayer",
        correct: ["Ella", "compró", "ropa", "ayer"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "compró", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "vendió", type: "verb" },
          { text: "zapatos", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido и существительное с указанием времени.",
        maxWords: 4,
        formulaId: 11
      },
      {
        id: 1118,
        ru: "Он сделал уроки вчера",
        es: "Él hizo los deberes ayer",
        correct: ["Él", "hizo", "los", "deberes", "ayer"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "hizo", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Ella", type: "pronoun" },
          { text: "estudió", type: "verb" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido и артикль с указанием времени.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1119,
        ru: "Мы гуляли в парке вчера",
        es: "Paseamos en el parque ayer",
        correct: ["Paseamos", "en", "el", "parque", "ayer"],
        wordBank: [
          { text: "Paseamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Pasean", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Pretérito Indefinido и предлог с местом и временем.",
        maxWords: 5,
        formulaId: 11
      },
      {
        id: 1120,
        ru: "Они говорили по телефону вчера",
        es: "Ellos hablaron por teléfono ayer",
        correct: ["Ellos", "hablaron", "por", "teléfono", "ayer"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "hablaron", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "ayer", type: "adverb" },
          { text: "Ellas", type: "pronoun" },
          { text: "escribieron", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Pretérito Indefinido и предлог с указанием времени.",
        maxWords: 5,
        formulaId: 11
      }
    ]
  }
};