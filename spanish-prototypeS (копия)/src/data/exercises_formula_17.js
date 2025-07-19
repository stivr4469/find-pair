export const formulas = {
  spanish: {
    formula: "Выражение просьбы и предложения",
    description: "Используется для выражения просьбы или предложения с глаголами 'poder', 'querer' в вопросительной форме или конструкцией '¿Te gustaría?'.",
    examples: [
      {
        id: 1701,
        ru: "Можешь помочь мне?",
        es: "¿Puedes ayudarme?",
        correct: ["Puedes", "ayudarme"],
        wordBank: [
          { text: "Puedes", type: "verb" },
          { text: "ayudarme", type: "verb" },
          { text: "Quieres", type: "verb" },
          { text: "ayudar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "mí", type: "pronoun" },
          { text: "hablar", type: "verb" },
          { text: "conmigo", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и местоимением.",
        maxWords: 2,
        formulaId: 17
      },
      {
        id: 1702,
        ru: "Хочешь пить кофе?",
        es: "¿Quieres beber café?",
        correct: ["Quieres", "beber", "café"],
        wordBank: [
          { text: "Quieres", type: "verb" },
          { text: "beber", type: "verb" },
          { text: "café", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "té", type: "noun" },
          { text: "comer", type: "verb" },
          { text: "la", type: "article" },
          { text: "leche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и инфинитивом.",
        maxWords: 3,
        formulaId: 17
      },
      {
        id: 1703,
        ru: "Может она пойти с нами?",
        es: "¿Ella puede ir con nosotros?",
        correct: ["Ella", "puede", "ir", "con", "nosotros"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "puede", type: "verb" },
          { text: "ir", type: "verb" },
          { text: "con", type: "preposition" },
          { text: "nosotros", type: "pronoun" },
          { text: "Él", type: "pronoun" },
          { text: "quiere", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "vosotros", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с субъект, 'poder' и предлогом.",
        maxWords: 5,
        formulaId: 17
      },
      {
        id: 1704,
        ru: "Хочешь играть в футбол?",
        es: "¿Quieres jugar al fútbol?",
        correct: ["Quieres", "jugar", "a", "el", "fútbol"],
        wordBank: [
          { text: "Quieres", type: "verb" },
          { text: "jugar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "tenis", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и видом спорта.",
        maxWords: 5,
        formulaId: 17
      },
      {
        id: 1705,
        ru: "Можем ли мы учиться вместе?",
        es: "¿Podemos estudiar juntos?",
        correct: ["Podemos", "estudiar", "juntos"],
        wordBank: [
          { text: "Podemos", type: "verb" },
          { text: "estudiar", type: "verb" },
          { text: "juntos", type: "adverb" },
          { text: "Podéis", type: "verb" },
          { text: "trabajar", type: "verb" },
          { text: "solos", type: "adverb" },
          { text: "en", type: "preposition" },
          { text: "escuela", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и инфинитивом.",
        maxWords: 3,
        formulaId: 17
      },
      {
        id: 1706,
        ru: "Хотите посмотреть фильм?",
        es: "¿Queréis ver una película?",
        correct: ["Queréis", "ver", "una", "película"],
        wordBank: [
          { text: "Queréis", type: "verb" },
          { text: "ver", type: "verb" },
          { text: "una", type: "article" },
          { text: "película", type: "noun" },
          { text: "Podéis", type: "verb" },
          { text: "televisión", type: "noun" },
          { text: "escuchar", type: "verb" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и артиклем.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1707,
        ru: "Могут ли они танцевать с нами?",
        es: "¿Pueden bailar con nosotros?",
        correct: ["Pueden", "bailar", "con", "nosotros"],
        wordBank: [
          { text: "Pueden", type: "verb" },
          { text: "bailar", type: "verb" },
          { text: "con", type: "preposition" },
          { text: "nosotros", type: "pronoun" },
          { text: "Quieren", type: "verb" },
          { text: "cantar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "vosotros", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и предлогом.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1708,
        ru: "Можешь приготовить ужин?",
        es: "¿Puedes cocinar la cena?",
        correct: ["Puedes", "cocinar", "la", "cena"],
        wordBank: [
          { text: "Puedes", type: "verb" },
          { text: "cocinar", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Quieres", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" },
          { text: "comer", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и артиклем.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1709,
        ru: "Хочешь написать письмо?",
        es: "¿Quieres escribir una carta?",
        correct: ["Quieres", "escribir", "una", "carta"],
        wordBank: [
          { text: "Quieres", type: "verb" },
          { text: "escribir", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "un", type: "article" },
          { text: "correo", type: "noun" },
          { text: "leer", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и артиклем.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1710,
        ru: "Может она спеть песню?",
        es: "¿Ella puede cantar una canción?",
        correct: ["Ella", "puede", "cantar", "una", "canción"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "puede", type: "verb" },
          { text: "cantar", type: "verb" },
          { text: "una", type: "article" },
          { text: "canción", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "quiere", type: "verb" },
          { text: "música", type: "noun" },
          { text: "tocar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с субъект и 'poder' с артиклем.",
        maxWords: 5,
        formulaId: 17
      },
      {
        id: 1711,
        ru: "Хочешь бегать в парке?",
        es: "¿Quieres correr en el parque?",
        correct: ["Quieres", "correr", "en", "el", "parque"],
        wordBank: [
          { text: "Quieres", type: "verb" },
          { text: "correr", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "caminar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и местом.",
        maxWords: 5,
        formulaId: 17
      },
      {
        id: 1712,
        ru: "Можем ли мы слушать музыку?",
        es: "¿Podemos escuchar música?",
        correct: ["Podemos", "escuchar", "música"],
        wordBank: [
          { text: "Podemos", type: "verb" },
          { text: "escuchar", type: "verb" },
          { text: "música", type: "noun" },
          { text: "Queremos", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "ver", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и существительным.",
        maxWords: 3,
        formulaId: 17
      },
      {
        id: 1713,
        ru: "Хотите плавать в море?",
        es: "¿Queréis nadar en el mar?",
        correct: ["Queréis", "nadar", "en", "el", "mar"],
        wordBank: [
          { text: "Queréis", type: "verb" },
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
        hint: "Используйте вопрос с 'querer' и местом.",
        maxWords: 5,
        formulaId: 17
      },
      {
        id: 1714,
        ru: "Могут ли они учить испанский?",
        es: "¿Pueden aprender español?",
        correct: ["Pueden", "aprender", "español"],
        wordBank: [
          { text: "Pueden", type: "verb" },
          { text: "aprender", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Quieren", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "estudiar", type: "verb" },
          { text: "la", type: "article" },
          { text: "lengua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и существительным.",
        maxWords: 3,
        formulaId: 17
      },
      {
        id: 1715,
        ru: "Хочешь рисовать картину?",
        es: "¿Quieres dibujar un cuadro?",
        correct: ["Quieres", "dibujar", "un", "cuadro"],
        wordBank: [
          { text: "Quieres", type: "verb" },
          { text: "dibujar", type: "verb" },
          { text: "un", type: "article" },
          { text: "cuadro", type: "noun" },
          { text: "Puedes", type: "verb" },
          { text: "una", type: "article" },
          { text: "foto", type: "noun" },
          { text: "pintar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и артиклем.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1716,
        ru: "Можешь пить чай со мной?",
        es: "¿Puedes beber té conmigo?",
        correct: ["Puedes", "beber", "té", "conmigo"],
        wordBank: [
          { text: "Puedes", type: "verb" },
          { text: "beber", type: "verb" },
          { text: "té", type: "noun" },
          { text: "conmigo", type: "pronoun" },
          { text: "Quieres", type: "verb" },
          { text: "café", type: "noun" },
          { text: "comer", type: "verb" },
          { text: "nosotros", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и предлогом.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1717,
        ru: "Хочет ли она покупать одежду?",
        es: "¿Ella quiere comprar ropa?",
        correct: ["Ella", "quiere", "comprar", "ropa"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "quiere", type: "verb" },
          { text: "comprar", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "puede", type: "verb" },
          { text: "zapatos", type: "noun" },
          { text: "vender", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с субъект и 'querer' с существительным.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1718,
        ru: "Можешь сделать уроки?",
        es: "¿Puedes hacer los deberes?",
        correct: ["Puedes", "hacer", "los", "deberes"],
        wordBank: [
          { text: "Puedes", type: "verb" },
          { text: "hacer", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "Quieres", type: "verb" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" },
          { text: "estudiar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и артиклем.",
        maxWords: 4,
        formulaId: 17
      },
      {
        id: 1719,
        ru: "Хотим ли мы гулять в парке?",
        es: "¿Queremos pasear en el parque?",
        correct: ["Queremos", "pasear", "en", "el", "parque"],
        wordBank: [
          { text: "Queremos", type: "verb" },
          { text: "pasear", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Podemos", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "ciudad", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'querer' и местом.",
        maxWords: 5,
        formulaId: 17
      },
      {
        id: 1720,
        ru: "Могут ли они говорить по телефону?",
        es: "¿Pueden hablar por teléfono?",
        correct: ["Pueden", "hablar", "por", "teléfono"],
        wordBank: [
          { text: "Pueden", type: "verb" },
          { text: "hablar", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "Quieren", type: "verb" },
          { text: "escribir", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте вопрос с 'poder' и предлогом.",
        maxWords: 4,
        formulaId: 17
      }
    ]
  }
};