export const formulas = {
  spanish: {
    formula: "Выражение времени и частотности",
    description: "Используется для указания времени и частотности с наречиями времени ('hoy', 'siempre'), предлогами ('a las', 'por la mañana') и глаголами в настоящем времени.",
    examples: [
      {
        id: 1901,
        ru: "Я ем завтрак в семь утра",
        es: "Desayuno a las siete de la mañana",
        correct: ["Desayuno", "a", "las", "siete", "de", "la", "mañana"],
        wordBank: [
          { text: "Desayuno", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "las", type: "article" },
          { text: "siete", type: "number" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Como", type: "verb" },
          { text: "ocho", type: "number" },
          { text: "tarde", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с указанием времени.",
        maxWords: 7,
        formulaId: 19
      },
      {
        id: 1902,
        ru: "Ты читаешь книги вечером",
        es: "Lees libros por la noche",
        correct: ["Lees", "libros", "por", "la", "noche"],
        wordBank: [
          { text: "Lees", type: "verb" },
          { text: "libros", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "Escribes", type: "verb" },
          { text: "revistas", type: "noun" },
          { text: "mañana", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с указанием времени.",
        maxWords: 5,
        formulaId: 19
      },
      {
        id: 1903,
        ru: "Она работает в офисе по утрам",
        es: "Ella trabaja en la oficina por la mañana",
        correct: ["Ella", "trabaja", "en", "la", "oficina", "por", "la", "mañana"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "trabaja", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "tarde", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол с местом и временем.",
        maxWords: 8,
        formulaId: 19
      },
      {
        id: 1904,
        ru: "Он играет в футбол по субботам",
        es: "Juega al fútbol los sábados",
        correct: ["Juega", "a", "el", "fútbol", "los", "sábados"],
        wordBank: [
          { text: "Juega", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "los", type: "article" },
          { text: "sábados", type: "noun" },
          { text: "Corre", type: "verb" },
          { text: "tenis", type: "noun" },
          { text: "domingos", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с видом спорта и днём недели.",
        maxWords: 6,
        formulaId: 19
      },
      {
        id: 1905,
        ru: "Мы учимся в школе по будням",
        es: "Estudiamos en la escuela entre semana",
        correct: ["Estudiamos", "en", "la", "escuela", "entre", "semana"],
        wordBank: [
          { text: "Estudiamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "entre", type: "preposition" },
          { text: "semana", type: "noun" },
          { text: "Trabajamos", type: "verb" },
          { text: "universidad", type: "noun" },
          { text: "los", type: "article" },
          { text: "fines", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с местом и указанием времени.",
        maxWords: 6,
        formulaId: 19
      },
      {
        id: 1906,
        ru: "Вы смотрите телевизор по вечерам",
        es: "Miráis la televisión por las noches",
        correct: ["Miráis", "la", "televisión", "por", "las", "noches"],
        wordBank: [
          { text: "Miráis", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "las", type: "article" },
          { text: "noches", type: "noun" },
          { text: "Veis", type: "verb" },
          { text: "películas", type: "noun" },
          { text: "mañanas", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с артиклем и временем.",
        maxWords: 6,
        formulaId: 19
      },
      {
        id: 1907,
        ru: "Они танцуют по пятницам",
        es: "Bailan los viernes",
        correct: ["Bailan", "los", "viernes"],
        wordBank: [
          { text: "Bailan", type: "verb" },
          { text: "los", type: "article" },
          { text: "viernes", type: "noun" },
          { text: "Cantan", type: "verb" },
          { text: "sábados", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "fiestas", type: "noun" },
          { text: "las", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с днём недели.",
        maxWords: 3,
        formulaId: 19
      },
      {
        id: 1908,
        ru: "Я готовлю ужин в восемь вечера",
        es: "Cocino la cena a las ocho de la noche",
        correct: ["Cocino", "la", "cena", "a", "las", "ocho", "de", "la", "noche"],
        wordBank: [
          { text: "Cocino", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "las", type: "article" },
          { text: "ocho", type: "number" },
          { text: "de", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "desayuno", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с артиклем и точным временем.",
        maxWords: 9,
        formulaId: 19
      },
      {
        id: 1909,
        ru: "Ты пишешь письма по воскресеньям",
        es: "Escribes cartas los domingos",
        correct: ["Escribes", "cartas", "los", "domingos"],
        wordBank: [
          { text: "Escribes", type: "verb" },
          { text: "cartas", type: "noun" },
          { text: "los", type: "article" },
          { text: "domingos", type: "noun" },
          { text: "Lees", type: "verb" },
          { text: "correos", type: "noun" },
          { text: "sábados", type: "noun" },
          { text: "las", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с днём недели.",
        maxWords: 4,
        formulaId: 19
      },
      {
        id: 1910,
        ru: "Она поёт по утрам в субботу",
        es: "Ella canta por la mañana los sábados",
        correct: ["Ella", "canta", "por", "la", "mañana", "los", "sábados"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "canta", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "los", type: "article" },
          { text: "sábados", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "toca", type: "verb" },
          { text: "noches", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол с временем и днём недели.",
        maxWords: 7,
        formulaId: 19
      },
      {
        id: 1911,
        ru: "Он бегает в парке по утрам",
        es: "Corre en el parque por la mañana",
        correct: ["Corre", "en", "el", "parque", "por", "la", "mañana"],
        wordBank: [
          { text: "Corre", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "Camina", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "tarde", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с местом и временем.",
        maxWords: 7,
        formulaId: 19
      },
      {
        id: 1912,
        ru: "Мы слушаем музыку по вечерам",
        es: "Escuchamos música por las noches",
        correct: ["Escuchamos", "música", "por", "las", "noches"],
        wordBank: [
          { text: "Escuchamos", type: "verb" },
          { text: "música", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "las", type: "article" },
          { text: "noches", type: "noun" },
          { text: "Vemos", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "mañanas", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с временем.",
        maxWords: 5,
        formulaId: 19
      },
      {
        id: 1913,
        ru: "Вы плаваете летом в море",
        es: "Nadáis en el mar en verano",
        correct: ["Nadáis", "en", "el", "mar", "en", "verano"],
        wordBank: [
          { text: "Nadáis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "mar", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "verano", type: "noun" },
          { text: "Camináis", type: "verb" },
          { text: "invierno", type: "noun" },
          { text: "piscina", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с местом и временем.",
        maxWords: 6,
        formulaId: 19
      },
      {
        id: 1914,
        ru: "Они учат испанский по вторникам",
        es: "Aprenden español los martes",
        correct: ["Aprenden", "español", "los", "martes"],
        wordBank: [
          { text: "Aprenden", type: "verb" },
          { text: "español", type: "noun" },
          { text: "los", type: "article" },
          { text: "martes", type: "noun" },
          { text: "Estudian", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "miércoles", type: "noun" },
          { text: "las", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с днём недели.",
        maxWords: 4,
        formulaId: 19
      },
      {
        id: 1915,
        ru: "Я рисую по выходным в пять",
        es: "Dibujo los fines de semana a las cinco",
        correct: ["Dibujo", "los", "fines", "de", "semana", "a", "las", "cinco"],
        wordBank: [
          { text: "Dibujo", type: "verb" },
          { text: "los", type: "article" },
          { text: "fines", type: "noun" },
          { text: "de", type: "preposition" },
          { text: "semana", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "las", type: "article" },
          { text: "cinco", type: "number" },
          { text: "Pinto", type: "verb" },
          { text: "días", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с временем и днём недели.",
        maxWords: 8,
        formulaId: 19
      },
      {
        id: 1916,
        ru: "Ты пьёшь кофе утром в восемь",
        es: "Bebes café por la mañana a las ocho",
        correct: ["Bebes", "café", "por", "la", "mañana", "a", "las", "ocho"],
        wordBank: [
          { text: "Bebes", type: "verb" },
          { text: "café", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mañana", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "las", type: "article" },
          { text: "ocho", type: "number" },
          { text: "Té", type: "noun" },
          { text: "noche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с временем и точным временем.",
        maxWords: 8,
        formulaId: 19
      },
      {
        id: 1917,
        ru: "Она покупает одежду по субботам",
        es: "Ella compra ropa los sábados",
        correct: ["Ella", "compra", "ropa", "los", "sábados"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "compra", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "los", type: "article" },
          { text: "sábados", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "zapatos", type: "noun" },
          { text: "domingos", type: "noun" },
          { text: "vende", type: "verb" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол с днём недели.",
        maxWords: 5,
        formulaId: 19
      },
      {
        id: 1918,
        ru: "Он делает уроки вечером в семь",
        es: "Hace los deberes por la noche a las siete",
        correct: ["Hace", "los", "deberes", "por", "la", "noche", "a", "las", "siete"],
        wordBank: [
          { text: "Hace", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "las", type: "article" },
          { text: "siete", type: "number" },
          { text: "lección", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с временем и точным временем.",
        maxWords: 9,
        formulaId: 19
      },
      {
        id: 1919,
        ru: "Мы гуляем в парке по воскресеньям",
        es: "Paseamos en el parque los domingos",
        correct: ["Paseamos", "en", "el", "parque", "los", "domingos"],
        wordBank: [
          { text: "Paseamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "los", type: "article" },
          { text: "domingos", type: "noun" },
          { text: "Caminamos", type: "verb" },
          { text: "playa", type: "noun" },
          { text: "sábados", type: "noun" },
          { text: "la", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с местом и днём недели.",
        maxWords: 6,
        formulaId: 19
      },
      {
        id: 1920,
        ru: "Они говорят по телефону вечером",
        es: "Hablan por teléfono por la noche",
        correct: ["Hablan", "por", "teléfono", "por", "la", "noche"],
        wordBank: [
          { text: "Hablan", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "noche", type: "noun" },
          { text: "Escriben", type: "verb" },
          { text: "correo", type: "noun" },
          { text: "mañana", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом и временем.",
        maxWords: 6,
        formulaId: 19
      }
    ]
  }
};