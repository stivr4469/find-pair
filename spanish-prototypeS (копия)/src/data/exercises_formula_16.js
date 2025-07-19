export const formulas = {
  spanish: {
    formula: "Выражение возможности и способности",
    description: "Используется для выражения возможности или способности с глаголами 'poder', 'saber' и инфинитивом.",
    examples: [
      {
        id: 1601,
        ru: "Я могу говорить по-испански",
        es: "Puedo hablar español",
        correct: ["Puedo", "hablar", "español"],
        wordBank: [
          { text: "Puedo", type: "verb" },
          { text: "hablar", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "escribir", type: "verb" },
          { text: "la", type: "article" },
          { text: "lengua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'poder' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1602,
        ru: "Ты умеешь готовить пиццу",
        es: "Sabes cocinar pizza",
        correct: ["Sabes", "cocinar", "pizza"],
        wordBank: [
          { text: "Sabes", type: "verb" },
          { text: "cocinar", type: "verb" },
          { text: "pizza", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "hamburguesa", type: "noun" },
          { text: "comer", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'saber' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1603,
        ru: "Она может петь красиво",
        es: "Ella puede cantar bonito",
        correct: ["Ella", "puede", "cantar", "bonito"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "puede", type: "verb" },
          { text: "cantar", type: "verb" },
          { text: "bonito", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "sabe", type: "verb" },
          { text: "tocar", type: "verb" },
          { text: "rápido", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'poder' с инфинитивом и наречием.",
        maxWords: 4,
        formulaId: 16
      },
      {
        id: 1604,
        ru: "Он умеет играть в футбол",
        es: "Sabe jugar al fútbol",
        correct: ["Sabe", "jugar", "a", "el", "fútbol"],
        wordBank: [
          { text: "Sabe", type: "verb" },
          { text: "jugar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Puede", type: "verb" },
          { text: "tenis", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом и видом спорта.",
        maxWords: 5,
        formulaId: 16
      },
      {
        id: 1605,
        ru: "Мы можем учиться в университете",
        es: "Podemos estudiar en la universidad",
        correct: ["Podemos", "estudiar", "en", "la", "universidad"],
        wordBank: [
          { text: "Podemos", type: "verb" },
          { text: "estudiar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "universidad", type: "noun" },
          { text: "Sabemos", type: "verb" },
          { text: "escuela", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "instituto", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 16
      },
      {
        id: 1606,
        ru: "Вы умеете плавать в море",
        es: "Sabéis nadar en el mar",
        correct: ["Sabéis", "nadar", "en", "el", "mar"],
        wordBank: [
          { text: "Sabéis", type: "verb" },
          { text: "nadar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "mar", type: "noun" },
          { text: "Podéis", type: "verb" },
          { text: "piscina", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 16
      },
      {
        id: 1607,
        ru: "Они могут танцевать сальсу",
        es: "Pueden bailar salsa",
        correct: ["Pueden", "bailar", "salsa"],
        wordBank: [
          { text: "Pueden", type: "verb" },
          { text: "bailar", type: "verb" },
          { text: "salsa", type: "noun" },
          { text: "Saben", type: "verb" },
          { text: "tango", type: "noun" },
          { text: "cantar", type: "verb" },
          { text: "la", type: "article" },
          { text: "música", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1608,
        ru: "Я умею готовить ужин",
        es: "Sé cocinar la cena",
        correct: ["Sé", "cocinar", "la", "cena"],
        wordBank: [
          { text: "Sé", type: "verb" },
          { text: "cocinar", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Puedo", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" },
          { text: "comer", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 16
      },
      {
        id: 1609,
        ru: "Ты можешь писать письма",
        es: "Puedes escribir cartas",
        correct: ["Puedes", "escribir", "cartas"],
        wordBank: [
          { text: "Puedes", type: "verb" },
          { text: "escribir", type: "verb" },
          { text: "cartas", type: "noun" },
          { text: "Sabes", type: "verb" },
          { text: "una", type: "article" },
          { text: "correo", type: "noun" },
          { text: "leer", type: "verb" },
          { text: "libros", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1610,
        ru: "Она умеет петь песни",
        es: "Ella sabe cantar canciones",
        correct: ["Ella", "sabe", "cantar", "canciones"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "sabe", type: "verb" },
          { text: "cantar", type: "verb" },
          { text: "canciones", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "puede", type: "verb" },
          { text: "música", type: "noun" },
          { text: "tocar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'saber' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 16
      },
      {
        id: 1611,
        ru: "Он может бегать быстро",
        es: "Puede correr rápido",
        correct: ["Puede", "correr", "rápido"],
        wordBank: [
          { text: "Puede", type: "verb" },
          { text: "correr", type: "verb" },
          { text: "rápido", type: "adverb" },
          { text: "Sabe", type: "verb" },
          { text: "lento", type: "adverb" },
          { text: "caminar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и наречием.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1612,
        ru: "Мы умеем слушать музыку",
        es: "Sabemos escuchar música",
        correct: ["Sabemos", "escuchar", "música"],
        wordBank: [
          { text: "Sabemos", type: "verb" },
          { text: "escuchar", type: "verb" },
          { text: "música", type: "noun" },
          { text: "Podemos", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "ver", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1613,
        ru: "Вы можете плавать в бассейне",
        es: "Podéis nadar en la piscina",
        correct: ["Podéis", "nadar", "en", "la", "piscina"],
        wordBank: [
          { text: "Podéis", type: "verb" },
          { text: "nadar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "piscina", type: "noun" },
          { text: "Sabéis", type: "verb" },
          { text: "mar", type: "noun" },
          { text: "el", type: "article" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 16
      },
      {
        id: 1614,
        ru: "Они умеют учить испанский",
        es: "Saben aprender español",
        correct: ["Saben", "aprender", "español"],
        wordBank: [
          { text: "Saben", type: "verb" },
          { text: "aprender", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Pueden", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "estudiar", type: "verb" },
          { text: "la", type: "article" },
          { text: "lengua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1615,
        ru: "Я могу рисовать картины",
        es: "Puedo dibujar cuadros",
        correct: ["Puedo", "dibujar", "cuadros"],
        wordBank: [
          { text: "Puedo", type: "verb" },
          { text: "dibujar", type: "verb" },
          { text: "cuadros", type: "noun" },
          { text: "Sé", type: "verb" },
          { text: "fotos", type: "noun" },
          { text: "pintar", type: "verb" },
          { text: "un", type: "article" },
          { text: "retrato", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и существительным.",
        maxWords: 3,
        formulaId: 16
      },
      {
        id: 1616,
        ru: "Ты умеешь пить кофе медленно",
        es: "Sabes beber café despacio",
        correct: ["Sabes", "beber", "café", "despacio"],
        wordBank: [
          { text: "Sabes", type: "verb" },
          { text: "beber", type: "verb" },
          { text: "café", type: "noun" },
          { text: "despacio", type: "adverb" },
          { text: "Puedes", type: "verb" },
          { text: "té", type: "noun" },
          { text: "rápido", type: "adverb" },
          { text: "leche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом и наречием.",
        maxWords: 4,
        formulaId: 16
      },
      {
        id: 1617,
        ru: "Она может покупать одежду",
        es: "Ella puede comprar ropa",
        correct: ["Ella", "puede", "comprar", "ropa"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "puede", type: "verb" },
          { text: "comprar", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "sabe", type: "verb" },
          { text: "zapatos", type: "noun" },
          { text: "vender", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и 'poder' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 16
      },
      {
        id: 1618,
        ru: "Он умеет делать уроки быстро",
        es: "Sabe hacer los deberes rápido",
        correct: ["Sabe", "hacer", "los", "deberes", "rápido"],
        wordBank: [
          { text: "Sabe", type: "verb" },
          { text: "hacer", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "rápido", type: "adverb" },
          { text: "Puede", type: "verb" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" },
          { text: "despacio", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте 'saber' с инфинитивом, артиклем и наречием.",
        maxWords: 5,
        formulaId: 16
      },
      {
        id: 1619,
        ru: "Мы можем гулять в парке",
        es: "Podemos pasear en el parque",
        correct: ["Podemos", "pasear", "en", "el", "parque"],
        wordBank: [
          { text: "Podemos", type: "verb" },
          { text: "pasear", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Sabemos", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "ciudad", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 16
      },
      {
        id: 1620,
        ru: "Они могут говорить по телефону",
        es: "Pueden hablar por teléfono",
        correct: ["Pueden", "hablar", "por", "teléfono"],
        wordBank: [
          { text: "Pueden", type: "verb" },
          { text: "hablar", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "Saben", type: "verb" },
          { text: "escribir", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'poder' с инфинитивом и предлогом.",
        maxWords: 4,
        formulaId: 16
      }
    ]
  }
};