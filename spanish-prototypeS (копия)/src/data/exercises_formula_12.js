export const formulas = {
  spanish: {
    formula: "Выражение действия в будущем времени",
    description: "Используется для описания действий, которые произойдут в будущем, с использованием Futuro или конструкции 'ir a + инфинитив'.",
    examples: [
      {
        id: 1201,
        ru: "Я буду есть яблоко завтра",
        es: "Comeré una manzana mañana",
        correct: ["Comeré", "una", "manzana", "mañana"],
        wordBank: [
          { text: "Comeré", type: "verb" },
          { text: "una", type: "article" },
          { text: "manzana", type: "noun" },
          { text: "mañana", type: "adverb" },
          { text: "Como", type: "verb" },
          { text: "un", type: "article" },
          { text: "plátano", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro с артиклем и указанием времени.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1202,
        ru: "Ты будешь читать книгу завтра",
        es: "Leerás un libro mañana",
        correct: ["Leerás", "un", "libro", "mañana"],
        wordBank: [
          { text: "Leerás", type: "verb" },
          { text: "un", type: "article" },
          { text: "libro", type: "noun" },
          { text: "mañana", type: "adverb" },
          { text: "Lees", type: "verb" },
          { text: "una", type: "article" },
          { text: "revista", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro с артиклем и указанием времени.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1203,
        ru: "Она будет работать в офисе завтра",
        es: "Ella trabajará en la oficina mañana",
        correct: ["Ella", "trabajará", "en", "la", "oficina", "mañana"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "trabajará", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "mañana", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "trabaja", type: "verb" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Futuro и предлог с местом и временем.",
        maxWords: 6,
        formulaId: 12
      },
      {
        id: 1204,
        ru: "Он собирается играть в футбол",
        es: "Él va a jugar al fútbol",
        correct: ["Él", "va", "a", "jugar", "a", "el", "fútbol"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "jugar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "juega", type: "verb" },
          { text: "tenis", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'ir a + инфинитив' с предлогом и видом спорта.",
        maxWords: 7,
        formulaId: 12
      },
      {
        id: 1205,
        ru: "Мы будем учиться в школе завтра",
        es: "Estudiaremos en la escuela mañana",
        correct: ["Estudiaremos", "en", "la", "escuela", "mañana"],
        wordBank: [
          { text: "Estudiaremos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "mañana", type: "adverb" },
          { text: "Estudian", type: "verb" },
          { text: "el", type: "article" },
          { text: "instituto", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro и предлог с местом и временем.",
        maxWords: 5,
        formulaId: 12
      },
      {
        id: 1206,
        ru: "Вы собираетесь смотреть телевизор",
        es: "Vais a mirar la televisión",
        correct: ["Vais", "a", "mirar", "la", "televisión"],
        wordBank: [
          { text: "Vais", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "mirar", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" },
          { text: "Miráis", type: "verb" },
          { text: "el", type: "article" },
          { text: "cine", type: "noun" },
          { text: "una", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'ir a + инфинитив' с артиклем и существительным.",
        maxWords: 5,
        formulaId: 12
      },
      {
        id: 1207,
        ru: "Они будут танцевать на вечеринке",
        es: "Ellos bailarán en la fiesta",
        correct: ["Ellos", "bailarán", "en", "la", "fiesta"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "bailarán", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "fiesta", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "cantarán", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "discoteca", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Futuro и предлог с местом.",
        maxWords: 5,
        formulaId: 12
      },
      {
        id: 1208,
        ru: "Я собираюсь готовить ужин",
        es: "Voy a cocinar la cena",
        correct: ["Voy", "a", "cocinar", "la", "cena"],
        wordBank: [
          { text: "Voy", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "cocinar", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Cocino", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" },
          { text: "una", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'ir a + инфинитив' с артиклем и существительным.",
        maxWords: 5,
        formulaId: 12
      },
      {
        id: 1209,
        ru: "Ты будешь писать письмо",
        es: "Escribirás una carta",
        correct: ["Escribirás", "una", "carta"],
        wordBank: [
          { text: "Escribirás", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "Escribes", type: "verb" },
          { text: "un", type: "article" },
          { text: "correo", type: "noun" },
          { text: "es", type: "verb" },
          { text: "mensaje", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro с артиклем и существительным.",
        maxWords: 3,
        formulaId: 12
      },
      {
        id: 1210,
        ru: "Она будет петь песню завтра",
        es: "Ella cantará una canción mañana",
        correct: ["Ella", "cantará", "una", "canción", "mañana"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "cantará", type: "verb" },
          { text: "una", type: "article" },
          { text: "canción", type: "noun" },
          { text: "mañana", type: "adverb" },
          { text: "Él", type: "pronoun" },
          { text: "tocará", type: "verb" },
          { text: "guitarra", type: "noun" },
          { text: "hoy", type: "adverb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Futuro и артикль с указанием времени.",
        maxWords: 5,
        formulaId: 12
      },
      {
        id: 1211,
        ru: "Он будет бегать в парке",
        es: "Él correrá en el parque",
        correct: ["Él", "correrá", "en", "el", "parque"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "correrá", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "corre", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Futuro и предлог с местом.",
        maxWords: 5,
        formulaId: 12
      },
      {
        id: 1212,
        ru: "Мы собираемся слушать музыку",
        es: "Vamos a escuchar música",
        correct: ["Vamos", "a", "escuchar", "música"],
        wordBank: [
          { text: "Vamos", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "escuchar", type: "verb" },
          { text: "música", type: "noun" },
          { text: "Escuchamos", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'ir a + инфинитив' и существительное.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1213,
        ru: "Вы будете плавать в бассейне",
        es: "Nadaréis en la piscina",
        correct: ["Nadaréis", "en", "la", "piscina"],
        wordBank: [
          { text: "Nadaréis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "piscina", type: "noun" },
          { text: "Nadan", type: "verb" },
          { text: "el", type: "article" },
          { text: "mar", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro и предлог с местом.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1214,
        ru: "Они будут учить испанский",
        es: "Ellos aprenderán español",
        correct: ["Ellos", "aprenderán", "español"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "aprenderán", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "estudian", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "la", type: "article" },
          { text: "lengua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол в Futuro с существительным.",
        maxWords: 3,
        formulaId: 12
      },
      {
        id: 1215,
        ru: "Я буду рисовать картину",
        es: "Dibujaré un cuadro",
        correct: ["Dibujaré", "un", "cuadro"],
        wordBank: [
          { text: "Dibujaré", type: "verb" },
          { text: "un", type: "article" },
          { text: "cuadro", type: "noun" },
          { text: "Dibujo", type: "verb" },
          { text: "una", type: "article" },
          { text: "foto", type: "noun" },
          { text: "es", type: "verb" },
          { text: "pintura", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro с артиклем и существительным.",
        maxWords: 3,
        formulaId: 12
      },
      {
        id: 1216,
        ru: "Ты собираешься пить кофе",
        es: "Vas a beber café",
        correct: ["Vas", "a", "beber", "café"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "beber", type: "verb" },
          { text: "café", type: "noun" },
          { text: "Bebes", type: "verb" },
          { text: "té", type: "noun" },
          { text: "la", type: "article" },
          { text: "leche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'ir a + инфинитив' и существительное.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1217,
        ru: "Она будет покупать одежду",
        es: "Ella comprará ropa",
        correct: ["Ella", "comprará", "ropa"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "comprará", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "compró", type: "verb" },
          { text: "zapatos", type: "noun" },
          { text: "la", type: "article" },
          { text: "tienda", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол в Futuro с существительным.",
        maxWords: 3,
        formulaId: 12
      },
      {
        id: 1218,
        ru: "Он будет делать уроки",
        es: "Él hará los deberes",
        correct: ["Él", "hará", "los", "deberes"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "hará", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "estudiará", type: "verb" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в Futuro и артикль с существительным.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1219,
        ru: "Мы будем гулять в парке",
        es: "Pasearemos en el parque",
        correct: ["Pasearemos", "en", "el", "parque"],
        wordBank: [
          { text: "Pasearemos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Pasean", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в Futuro и предлог с местом.",
        maxWords: 4,
        formulaId: 12
      },
      {
        id: 1220,
        ru: "Они собираются говорить по телефону",
        es: "Ellos van a hablar por teléfono",
        correct: ["Ellos", "van", "a", "hablar", "por", "teléfono"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "van", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "hablar", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "escriben", type: "verb" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте конструкцию 'ir a + инфинитив' и предлог с существительным.",
        maxWords: 6,
        formulaId: 12
      }
    ]
  }
};