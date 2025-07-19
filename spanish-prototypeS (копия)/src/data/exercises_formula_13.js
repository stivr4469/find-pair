export const formulas = {
  spanish: {
    formula: "Выражение предпочтений и желаний",
    description: "Используется для выражения предпочтений и желаний с глаголами 'querer', 'preferir', 'gustar' или конструкцией 'me gustaría'.",
    examples: [
      {
        id: 1301,
        ru: "Я хочу есть пиццу",
        es: "Quiero comer pizza",
        correct: ["Quiero", "comer", "pizza"],
        wordBank: [
          { text: "Quiero", type: "verb" },
          { text: "comer", type: "verb" },
          { text: "pizza", type: "noun" },
          { text: "Quieres", type: "verb" },
          { text: "beber", type: "verb" },
          { text: "agua", type: "noun" },
          { text: "la", type: "article" },
          { text: "hamburguesa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 13
      },
      {
        id: 1302,
        ru: "Тебе нравится читать книги",
        es: "Te gusta leer libros",
        correct: ["Te", "gusta", "leer", "libros"],
        wordBank: [
          { text: "Te", type: "pronoun" },
          { text: "gusta", type: "verb" },
          { text: "leer", type: "verb" },
          { text: "libros", type: "noun" },
          { text: "Me", type: "pronoun" },
          { text: "gustan", type: "verb" },
          { text: "revistas", type: "noun" },
          { text: "escribir", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'gustar' с местоимением и инфинитивом.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1303,
        ru: "Она предпочитает смотреть фильмы",
        es: "Ella prefiere ver películas",
        correct: ["Ella", "prefiere", "ver", "películas"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "prefiere", type: "verb" },
          { text: "ver", type: "verb" },
          { text: "películas", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "prefieren", type: "verb" },
          { text: "televisión", type: "noun" },
          { text: "escuchar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'preferir' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1304,
        ru: "Он хочет играть в футбол",
        es: "Quiere jugar al fútbol",
        correct: ["Quiere", "jugar", "a", "el", "fútbol"],
        wordBank: [
          { text: "Quiere", type: "verb" },
          { text: "jugar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Quieren", type: "verb" },
          { text: "tenis", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и видом спорта.",
        maxWords: 5,
        formulaId: 13
      },
      {
        id: 1305,
        ru: "Мы хотим учиться в университете",
        es: "Queremos estudiar en la universidad",
        correct: ["Queremos", "estudiar", "en", "la", "universidad"],
        wordBank: [
          { text: "Queremos", type: "verb" },
          { text: "estudiar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "universidad", type: "noun" },
          { text: "Quieren", type: "verb" },
          { text: "escuela", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "instituto", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 13
      },
      {
        id: 1306,
        ru: "Вам нравится путешествовать",
        es: "Os gusta viajar",
        correct: ["Os", "gusta", "viajar"],
        wordBank: [
          { text: "Os", type: "pronoun" },
          { text: "gusta", type: "verb" },
          { text: "viajar", type: "verb" },
          { text: "Les", type: "pronoun" },
          { text: "gustan", type: "verb" },
          { text: "caminar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "ciudad", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'gustar' с местоимением и инфинитивом.",
        maxWords: 3,
        formulaId: 13
      },
      {
        id: 1307,
        ru: "Они предпочитают слушать музыку",
        es: "Ellos prefieren escuchar música",
        correct: ["Ellos", "prefieren", "escuchar", "música"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "prefieren", type: "verb" },
          { text: "escuchar", type: "verb" },
          { text: "música", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "quieren", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "ver", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'preferir' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1308,
        ru: "Мне бы хотелось готовить ужин",
        es: "Me gustaría cocinar la cena",
        correct: ["Me", "gustaría", "cocinar", "la", "cena"],
        wordBank: [
          { text: "Me", type: "pronoun" },
          { text: "gustaría", type: "verb" },
          { text: "cocinar", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Te", type: "pronoun" },
          { text: "comer", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'me gustaría' с инфинитивом и существительным.",
        maxWords: 5,
        formulaId: 13
      },
      {
        id: 1309,
        ru: "Ты хочешь писать книгу",
        es: "Quieres escribir un libro",
        correct: ["Quieres", "escribir", "un", "libro"],
        wordBank: [
          { text: "Quieres", type: "verb" },
          { text: "escribir", type: "verb" },
          { text: "un", type: "article" },
          { text: "libro", type: "noun" },
          { text: "Quiero", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "leer", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1310,
        ru: "Ей нравится петь песни",
        es: "Le gusta cantar canciones",
        correct: ["Le", "gusta", "cantar", "canciones"],
        wordBank: [
          { text: "Le", type: "pronoun" },
          { text: "gusta", type: "verb" },
          { text: "cantar", type: "verb" },
          { text: "canciones", type: "noun" },
          { text: "Me", type: "pronoun" },
          { text: "gustan", type: "verb" },
          { text: "música", type: "noun" },
          { text: "tocar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'gustar' с местоимением и инфинитивом.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1311,
        ru: "Он предпочитает бегать утром",
        es: "Él prefiere correr por la mañana",
        correct: ["Él", "prefiere", "correr", "por", "la", "mañana"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "prefiere", type: "verb" },
          { text: "correr", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "camina", type: "verb" },
          { text: "tarde", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'preferir' с инфинитивом и указанием времени.",
        maxWords: 6,
        formulaId: 13
      },
      {
        id: 1312,
        ru: "Мы хотим слушать музыку",
        es: "Queremos escuchar música",
        correct: ["Queremos", "escuchar", "música"],
        wordBank: [
          { text: "Queremos", type: "verb" },
          { text: "escuchar", type: "verb" },
          { text: "música", type: "noun" },
          { text: "Quieren", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "ver", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 13
      },
      {
        id: 1313,
        ru: "Вам бы хотелось плавать в море",
        es: "Os gustaría nadar en el mar",
        correct: ["Os", "gustaría", "nadar", "en", "el", "mar"],
        wordBank: [
          { text: "Os", type: "pronoun" },
          { text: "gustaría", type: "verb" },
          { text: "nadar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "mar", type: "noun" },
          { text: "Les", type: "pronoun" },
          { text: "piscina", type: "noun" },
          { text: "caminar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'gustaría' с инфинитивом и местом.",
        maxWords: 6,
        formulaId: 13
      },
      {
        id: 1314,
        ru: "Они хотят учить испанский",
        es: "Ellos quieren aprender español",
        correct: ["Ellos", "quieren", "aprender", "español"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "quieren", type: "verb" },
          { text: "aprender", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "prefieren", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "estudiar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1315,
        ru: "Мне нравится рисовать картины",
        es: "Me gusta dibujar cuadros",
        correct: ["Me", "gusta", "dibujar", "cuadros"],
        wordBank: [
          { text: "Me", type: "pronoun" },
          { text: "gusta", type: "verb" },
          { text: "dibujar", type: "verb" },
          { text: "cuadros", type: "noun" },
          { text: "Te", type: "pronoun" },
          { text: "gustan", type: "verb" },
          { text: "fotos", type: "noun" },
          { text: "pintar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'gustar' с местоимением и инфинитивом.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1316,
        ru: "Ты предпочитаешь пить кофе",
        es: "Prefieres beber café",
        correct: ["Prefieres", "beber", "café"],
        wordBank: [
          { text: "Prefieres", type: "verb" },
          { text: "beber", type: "verb" },
          { text: "café", type: "noun" },
          { text: "Quieres", type: "verb" },
          { text: "té", type: "noun" },
          { text: "comer", type: "verb" },
          { text: "la", type: "article" },
          { text: "leche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'preferir' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 13
      },
      {
        id: 1317,
        ru: "Ей бы хотелось покупать одежду",
        es: "Le gustaría comprar ropa",
        correct: ["Le", "gustaría", "comprar", "ropa"],
        wordBank: [
          { text: "Le", type: "pronoun" },
          { text: "gustaría", type: "verb" },
          { text: "comprar", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Me", type: "pronoun" },
          { text: "zapatos", type: "noun" },
          { text: "vender", type: "verb" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'gustaría' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1318,
        ru: "Он хочет делать уроки",
        es: "Quiere hacer los deberes",
        correct: ["Quiere", "hacer", "los", "deberes"],
        wordBank: [
          { text: "Quiere", type: "verb" },
          { text: "hacer", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "Prefiere", type: "verb" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" },
          { text: "estudiar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'querer' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 13
      },
      {
        id: 1319,
        ru: "Мы предпочитаем гулять в парке",
        es: "Preferimos pasear en el parque",
        correct: ["Preferimos", "pasear", "en", "el", "parque"],
        wordBank: [
          { text: "Preferimos", type: "verb" },
          { text: "pasear", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Queremos", type: "verb" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" },
          { text: "caminar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'preferir' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 13
      },
      {
        id: 1320,
        ru: "Им нравится говорить по телефону",
        es: "Les gusta hablar por teléfono",
        correct: ["Les", "gusta", "hablar", "por", "teléfono"],
        wordBank: [
          { text: "Les", type: "pronoun" },
          { text: "gusta", type: "verb" },
          { text: "hablar", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "Me", type: "pronoun" },
          { text: "escribir", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'gustar' с местоимением и предлогом.",
        maxWords: 5,
        formulaId: 13
      }
    ]
  }
};