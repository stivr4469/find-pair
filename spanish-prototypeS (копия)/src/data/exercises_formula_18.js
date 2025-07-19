export const formulas = {
  spanish: {
    formula: "Описание привычек и рутины",
    description: "Используется для описания привычек и рутины с Presente de Indicativo, наречиями частотности ('siempre', 'a veces') или конструкцией 'suelo + инфинитив'.",
    examples: [
      {
        id: 1801,
        ru: "Я всегда ем завтрак утром",
        es: "Siempre desayuno por la mañana",
        correct: ["Siempre", "desayuno", "por", "la", "mañana"],
        wordBank: [
          { text: "Siempre", type: "adverb" },
          { text: "desayuno", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "A veces", type: "adverb" },
          { text: "como", type: "verb" },
          { text: "tarde", type: "noun" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности и глагол в настоящем времени.",
        maxWords: 5,
        formulaId: 18
      },
      {
        id: 1802,
        ru: "Ты обычно читаешь книги вечером",
        es: "Sueles leer libros por la noche",
        correct: ["Sueles", "leer", "libros", "por", "la", "noche"],
        wordBank: [
          { text: "Sueles", type: "verb" },
          { text: "leer", type: "verb" },
          { text: "libros", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "revistas", type: "noun" },
          { text: "mañana", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'suelo' с инфинитивом и указанием времени.",
        maxWords: 6,
        formulaId: 18
      },
      {
        id: 1803,
        ru: "Она часто работает в офисе",
        es: "Ella a menudo trabaja en la oficina",
        correct: ["Ella", "a menudo", "trabaja", "en", "la", "oficina"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "a menudo", type: "adverb" },
          { text: "trabaja", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "siempre", type: "adverb" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и наречие частотности с местом.",
        maxWords: 6,
        formulaId: 18
      },
      {
        id: 1804,
        ru: "Он иногда играет в футбол",
        es: "A veces juega al fútbol",
        correct: ["A veces", "juega", "a", "el", "fútbol"],
        wordBank: [
          { text: "A veces", type: "adverb" },
          { text: "juega", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "tenis", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с видом спорта.",
        maxWords: 5,
        formulaId: 18
      },
      {
        id: 1805,
        ru: "Мы обычно учимся в школе",
        es: "Solemos estudiar en la escuela",
        correct: ["Solemos", "estudiar", "en", "la", "escuela"],
        wordBank: [
          { text: "Solemos", type: "verb" },
          { text: "estudiar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "instituto", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "trabajar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте 'suelo' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 18
      },
      {
        id: 1806,
        ru: "Вы часто смотрите телевизор",
        es: "A menudo miráis la televisión",
        correct: ["A menudo", "miráis", "la", "televisión"],
        wordBank: [
          { text: "A menudo", type: "adverb" },
          { text: "miráis", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "película", type: "noun" },
          { text: "veis", type: "verb" },
          { text: "una", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с артиклем.",
        maxWords: 4,
        formulaId: 18
      },
      {
        id: 1807,
        ru: "Они всегда танцуют на вечеринках",
        es: "Siempre bailan en las fiestas",
        correct: ["Siempre", "bailan", "en", "las", "fiestas"],
        wordBank: [
          { text: "Siempre", type: "adverb" },
          { text: "bailan", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "las", type: "article" },
          { text: "fiestas", type: "noun" },
          { text: "A veces", type: "adverb" },
          { text: "cantan", type: "verb" },
          { text: "discoteca", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с местом.",
        maxWords: 5,
        formulaId: 18
      },
      {
        id: 1808,
        ru: "Я обычно готовлю ужин вечером",
        es: "Suelo cocinar la cena por la noche",
        correct: ["Suelo", "cocinar", "la", "cena", "por", "la", "noche"],
        wordBank: [
          { text: "Suelo", type: "verb" },
          { text: "cocinar", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "desayuno", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'suelo' с артиклем и указанием времени.",
        maxWords: 7,
        formulaId: 18
      },
      {
        id: 1809,
        ru: "Ты иногда пишешь письма",
        es: "A veces escribes cartas",
        correct: ["A veces", "escribes", "cartas"],
        wordBank: [
          { text: "A veces", type: "adverb" },
          { text: "escribes", type: "verb" },
          { text: "cartas", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "correo", type: "noun" },
          { text: "lees", type: "verb" },
          { text: "una", type: "article" },
          { text: "libros", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с существительным.",
        maxWords: 3,
        formulaId: 18
      },
      {
        id: 1810,
        ru: "Она всегда поёт по утрам",
        es: "Ella siempre canta por la mañana",
        correct: ["Ella", "siempre", "canta", "por", "la", "mañana"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "siempre", type: "adverb" },
          { text: "canta", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "toca", type: "verb" },
          { text: "noche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и наречие частотности с указанием времени.",
        maxWords: 6,
        formulaId: 18
      },
      {
        id: 1811,
        ru: "Он часто бегает в парке",
        es: "A menudo corre en el parque",
        correct: ["A menudo", "corre", "en", "el", "parque"],
        wordBank: [
          { text: "A menudo", type: "adverb" },
          { text: "corre", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "camina", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с местом.",
        maxWords: 5,
        formulaId: 18
      },
      {
        id: 1812,
        ru: "Мы всегда слушаем музыку",
        es: "Siempre escuchamos música",
        correct: ["Siempre", "escuchamos", "música"],
        wordBank: [
          { text: "Siempre", type: "adverb" },
          { text: "escuchamos", type: "verb" },
          { text: "música", type: "noun" },
          { text: "A veces", type: "adverb" },
          { text: "radio", type: "noun" },
          { text: "vemos", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с существительным.",
        maxWords: 3,
        formulaId: 18
      },
      {
        id: 1813,
        ru: "Вы обычно плаваете летом",
        es: "Soleis nadar en verano",
        correct: ["Soleis", "nadar", "en", "verano"],
        wordBank: [
          { text: "Soleis", type: "verb" },
          { text: "nadar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "verano", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "invierno", type: "noun" },
          { text: "camináis", type: "verb" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте 'suelo' с инфинитивом и указанием времени.",
        maxWords: 4,
        formulaId: 18
      },
      {
        id: 1814,
        ru: "Они часто учат испанский",
        es: "A menudo aprenden español",
        correct: ["A menudo", "aprenden", "español"],
        wordBank: [
          { text: "A menudo", type: "adverb" },
          { text: "aprenden", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "inglés", type: "noun" },
          { text: "estudian", type: "verb" },
          { text: "la", type: "article" },
          { text: "lengua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с существительным.",
        maxWords: 3,
        formulaId: 18
      },
      {
        id: 1815,
        ru: "Я иногда рисую по выходным",
        es: "A veces dibujo los fines de semana",
        correct: ["A veces", "dibujo", "los", "fines", "de", "semana"],
        wordBank: [
          { text: "A veces", type: "adverb" },
          { text: "dibujo", type: "verb" },
          { text: "los", type: "article" },
          { text: "fines", type: "noun" },
          { text: "de", type: "preposition" },
          { text: "semana", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "pinto", type: "verb" },
          { text: "días", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с указанием времени.",
        maxWords: 6,
        formulaId: 18
      },
      {
        id: 1816,
        ru: "Ты всегда пьёшь кофе утром",
        es: "Siempre bebes café por la mañana",
        correct: ["Siempre", "bebes", "café", "por", "la", "mañana"],
        wordBank: [
          { text: "Siempre", type: "adverb" },
          { text: "bebes", type: "verb" },
          { text: "café", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "A veces", type: "adverb" },
          { text: "té", type: "noun" },
          { text: "noche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с указанием времени.",
        maxWords: 6,
        formulaId: 18
      },
      {
        id: 1817,
        ru: "Она обычно покупает одежду",
        es: "Ella suele comprar ropa",
        correct: ["Ella", "suele", "comprar", "ropa"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "suele", type: "verb" },
          { text: "comprar", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "siempre", type: "adverb" },
          { text: "zapatos", type: "noun" },
          { text: "vender", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'suelo' с существительным.",
        maxWords: 4,
        formulaId: 18
      },
      {
        id: 1818,
        ru: "Он часто делает уроки вечером",
        es: "A menudo hace los deberes por la noche",
        correct: ["A menudo", "hace", "los", "deberes", "por", "la", "noche"],
        wordBank: [
          { text: "A menudo", type: "adverb" },
          { text: "hace", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "lección", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с артиклем и временем.",
        maxWords: 7,
        formulaId: 18
      },
      {
        id: 1819,
        ru: "Мы иногда гуляем в парке",
        es: "A veces paseamos en el parque",
        correct: ["A veces", "paseamos", "en", "el", "parque"],
        wordBank: [
          { text: "A veces", type: "adverb" },
          { text: "paseamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Siempre", type: "adverb" },
          { text: "playa", type: "noun" },
          { text: "caminamos", type: "verb" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с местом.",
        maxWords: 5,
        formulaId: 18
      },
      {
        id: 1820,
        ru: "Они всегда говорят по телефону",
        es: "Siempre hablan por teléfono",
        correct: ["Siempre", "hablan", "por", "teléfono"],
        wordBank: [
          { text: "Siempre", type: "adverb" },
          { text: "hablan", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "A veces", type: "adverb" },
          { text: "escriben", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте наречие частотности с предлогом.",
        maxWords: 4,
        formulaId: 18
      }
    ]
  }
};