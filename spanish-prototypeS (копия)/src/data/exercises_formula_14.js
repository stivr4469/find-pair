export const formulas = {
  spanish: {
    formula: "Выражение необходимости и обязанности",
    description: "Используется для выражения необходимости или обязанности с глаголами 'tener que', 'deber', 'necesitar'.",
    examples: [
      {
        id: 1401,
        ru: "Мне нужно есть больше фруктов",
        es: "Tengo que comer más frutas",
        correct: ["Tengo", "que", "comer", "más", "frutas"],
        wordBank: [
          { text: "Tengo", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "comer", type: "verb" },
          { text: "más", type: "adverb" },
          { text: "frutas", type: "noun" },
          { text: "Tienes", type: "verb" },
          { text: "verduras", type: "noun" },
          { text: "beber", type: "verb" },
          { text: "agua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и существительным.",
        maxWords: 5,
        formulaId: 14
      },
      {
        id: 1402,
        ru: "Ты должен учиться сегодня",
        es: "Debes estudiar hoy",
        correct: ["Debes", "estudiar", "hoy"],
        wordBank: [
          { text: "Debes", type: "verb" },
          { text: "estudiar", type: "verb" },
          { text: "hoy", type: "adverb" },
          { text: "Tienes", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "trabajar", type: "verb" },
          { text: "mañana", type: "adverb" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и указанием времени.",
        maxWords: 3,
        formulaId: 14
      },
      {
        id: 1403,
        ru: "Ей нужно работать в офисе",
        es: "Ella necesita trabajar en la oficina",
        correct: ["Ella", "necesita", "trabajar", "en", "la", "oficina"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "necesita", type: "verb" },
          { text: "trabajar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "debe", type: "verb" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'necesitar' с инфинитивом и местом.",
        maxWords: 6,
        formulaId: 14
      },
      {
        id: 1404,
        ru: "Он должен играть в футбол",
        es: "Tiene que jugar al fútbol",
        correct: ["Tiene", "que", "jugar", "a", "el", "fútbol"],
        wordBank: [
          { text: "Tiene", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "jugar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Debe", type: "verb" },
          { text: "tenis", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и видом спорта.",
        maxWords: 6,
        formulaId: 14
      },
      {
        id: 1405,
        ru: "Нам нужно учиться в школе",
        es: "Tenemos que estudiar en la escuela",
        correct: ["Tenemos", "que", "estudiar", "en", "la", "escuela"],
        wordBank: [
          { text: "Tenemos", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "estudiar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Necesitan", type: "verb" },
          { text: "instituto", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и местом.",
        maxWords: 6,
        formulaId: 14
      },
      {
        id: 1406,
        ru: "Вы должны смотреть новости",
        es: "Debéis ver las noticias",
        correct: ["Debéis", "ver", "las", "noticias"],
        wordBank: [
          { text: "Debéis", type: "verb" },
          { text: "ver", type: "verb" },
          { text: "las", type: "article" },
          { text: "noticias", type: "noun" },
          { text: "Tienen", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "televisión", type: "noun" },
          { text: "escuchar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1407,
        ru: "Им нужно танцевать на вечеринке",
        es: "Tienen que bailar en la fiesta",
        correct: ["Tienen", "que", "bailar", "en", "la", "fiesta"],
        wordBank: [
          { text: "Tienen", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "bailar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "fiesta", type: "noun" },
          { text: "Deben", type: "verb" },
          { text: "cantar", type: "verb" },
          { text: "discoteca", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и местом.",
        maxWords: 6,
        formulaId: 14
      },
      {
        id: 1408,
        ru: "Мне нужно готовить ужин",
        es: "Necesito cocinar la cena",
        correct: ["Necesito", "cocinar", "la", "cena"],
        wordBank: [
          { text: "Necesito", type: "verb" },
          { text: "cocinar", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Tengo", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'necesitar' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1409,
        ru: "Ты должен писать письмо",
        es: "Debes escribir una carta",
        correct: ["Debes", "escribir", "una", "carta"],
        wordBank: [
          { text: "Debes", type: "verb" },
          { text: "escribir", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "Tienes", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "un", type: "article" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1410,
        ru: "Ей нужно петь на концерте",
        es: "Ella tiene que cantar en el concierto",
        correct: ["Ella", "tiene", "que", "cantar", "en", "el", "concierto"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "tiene", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "cantar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "concierto", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "tocar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и местом.",
        maxWords: 7,
        formulaId: 14
      },
      {
        id: 1411,
        ru: "Он должен бегать утром",
        es: "Debe correr por la mañana",
        correct: ["Debe", "correr", "por", "la", "mañana"],
        wordBank: [
          { text: "Debe", type: "verb" },
          { text: "correr", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Tiene", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "tarde", type: "noun" },
          { text: "caminar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и указанием времени.",
        maxWords: 5,
        formulaId: 14
      },
      {
        id: 1412,
        ru: "Нам нужно слушать учителя",
        es: "Tenemos que escuchar al profesor",
        correct: ["Tenemos", "que", "escuchar", "a", "el", "profesor"],
        wordBank: [
          { text: "Tenemos", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "escuchar", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "profesor", type: "noun" },
          { text: "Necesitan", type: "verb" },
          { text: "estudiante", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и артиклем.",
        maxWords: 6,
        formulaId: 14
      },
      {
        id: 1413,
        ru: "Вы должны плавать в бассейне",
        es: "Debéis nadar en la piscina",
        correct: ["Debéis", "nadar", "en", "la", "piscina"],
        wordBank: [
          { text: "Debéis", type: "verb" },
          { text: "nadar", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "piscina", type: "noun" },
          { text: "Tienen", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "mar", type: "noun" },
          { text: "el", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и местом.",
        maxWords: 5,
        formulaId: 14
      },
      {
        id: 1414,
        ru: "Им нужно учить испанский",
        es: "Tienen que aprender español",
        correct: ["Tienen", "que", "aprender", "español"],
        wordBank: [
          { text: "Tienen", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "aprender", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Deben", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "estudiar", type: "verb" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1415,
        ru: "Мне нужно рисовать картину",
        es: "Necesito dibujar un cuadro",
        correct: ["Necesito", "dibujar", "un", "cuadro"],
        wordBank: [
          { text: "Necesito", type: "verb" },
          { text: "dibujar", type: "verb" },
          { text: "un", type: "article" },
          { text: "cuadro", type: "noun" },
          { text: "Tengo", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "una", type: "article" },
          { text: "foto", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'necesitar' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1416,
        ru: "Ты должен пить больше воды",
        es: "Debes beber más agua",
        correct: ["Debes", "beber", "más", "agua"],
        wordBank: [
          { text: "Debes", type: "verb" },
          { text: "beber", type: "verb" },
          { text: "más", type: "adverb" },
          { text: "agua", type: "noun" },
          { text: "Tienes", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "café", type: "noun" },
          { text: "leche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и существительным.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1417,
        ru: "Ей нужно покупать одежду",
        es: "Ella tiene que comprar ropa",
        correct: ["Ella", "tiene", "que", "comprar", "ropa"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "tiene", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "comprar", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "vender", type: "verb" },
          { text: "zapatos", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и существительным.",
        maxWords: 5,
        formulaId: 14
      },
      {
        id: 1418,
        ru: "Он должен делать уроки",
        es: "Debe hacer los deberes",
        correct: ["Debe", "hacer", "los", "deberes"],
        wordBank: [
          { text: "Debe", type: "verb" },
          { text: "hacer", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "Tiene", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'deber' с инфинитивом и артиклем.",
        maxWords: 4,
        formulaId: 14
      },
      {
        id: 1419,
        ru: "Нам нужно гулять в парке",
        es: "Tenemos que pasear en el parque",
        correct: ["Tenemos", "que", "pasear", "en", "el", "parque"],
        wordBank: [
          { text: "Tenemos", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "pasear", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Necesitan", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "caminar", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и местом.",
        maxWords: 6,
        formulaId: 14
      },
      {
        id: 1420,
        ru: "Им нужно говорить с учителем",
        es: "Tienen que hablar con el profesor",
        correct: ["Tienen", "que", "hablar", "con", "el", "profesor"],
        wordBank: [
          { text: "Tienen", type: "verb" },
          { text: "que", type: "conjunction" },
          { text: "hablar", type: "verb" },
          { text: "con", type: "preposition" },
          { text: "el", type: "article" },
          { text: "profesor", type: "noun" },
          { text: "Deben", type: "verb" },
          { text: "estudiante", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте 'tener que' с инфинитивом и предлогом.",
        maxWords: 6,
        formulaId: 14
      }
    ]
  }
};