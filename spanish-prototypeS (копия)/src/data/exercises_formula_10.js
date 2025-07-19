export const formulas = {
  spanish: {
    formula: "Выражение действия в настоящем времени",
    description: "Используется для описания действий, происходящих в настоящем времени, с использованием Presente de Indicativo.",
    examples: [
      {
        id: 1001,
        ru: "Я ем яблоко",
        es: "Como una manzana",
        correct: ["Como", "una", "manzana"],
        wordBank: [
          { text: "Como", type: "verb" },
          { text: "una", type: "article" },
          { text: "manzana", type: "noun" },
          { text: "Comes", type: "verb" },
          { text: "un", type: "article" },
          { text: "plátano", type: "noun" },
          { text: "es", type: "verb" },
          { text: "fruta", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с артиклем и существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1002,
        ru: "Ты читаешь книгу",
        es: "Lees un libro",
        correct: ["Lees", "un", "libro"],
        wordBank: [
          { text: "Lees", type: "verb" },
          { text: "un", type: "article" },
          { text: "libro", type: "noun" },
          { text: "Leo", type: "verb" },
          { text: "una", type: "article" },
          { text: "revista", type: "noun" },
          { text: "es", type: "verb" },
          { text: "periódico", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с артиклем и существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1003,
        ru: "Она работает в офисе",
        es: "Ella trabaja en la oficina",
        correct: ["Ella", "trabaja", "en", "la", "oficina"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "trabaja", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "oficina", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "trabajo", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "casa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени и предлог с местом.",
        maxWords: 5,
        formulaId: 10
      },
      {
        id: 1004,
        ru: "Он играет в футбол",
        es: "Él juega al fútbol",
        correct: ["Él", "juega", "a", "el", "fútbol"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "juega", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "fútbol", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "juego", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "tenis", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени и предлог с видом спорта.",
        maxWords: 5,
        formulaId: 10
      },
      {
        id: 1005,
        ru: "Мы учимся в школе",
        es: "Estudiamos en la escuela",
        correct: ["Estudiamos", "en", "la", "escuela"],
        wordBank: [
          { text: "Estudiamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "Estudian", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "instituto", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени и предлог с местом.",
        maxWords: 4,
        formulaId: 10
      },
      {
        id: 1006,
        ru: "Вы смотрите телевизор",
        es: "Miráis la televisión",
        correct: ["Miráis", "la", "televisión"],
        wordBank: [
          { text: "Miráis", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" },
          { text: "Miran", type: "verb" },
          { text: "el", type: "article" },
          { text: "cine", type: "noun" },
          { text: "es", type: "verb" },
          { text: "una", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с артиклем и существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1007,
        ru: "Они танцуют на вечеринке",
        es: "Ellos bailan en la fiesta",
        correct: ["Ellos", "bailan", "en", "la", "fiesta"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "bailan", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "fiesta", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "cantan", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "discoteca", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени и предлог с местом.",
        maxWords: 5,
        formulaId: 10
      },
      {
        id: 1008,
        ru: "Я готовлю ужин",
        es: "Cocino la cena",
        correct: ["Cocino", "la", "cena"],
        wordBank: [
          { text: "Cocino", type: "verb" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Cocinas", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" },
          { text: "es", type: "verb" },
          { text: "una", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с артиклем и существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1009,
        ru: "Ты пишешь письмо",
        es: "Escribes una carta",
        correct: ["Escribes", "una", "carta"],
        wordBank: [
          { text: "Escribes", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "Escribo", type: "verb" },
          { text: "un", type: "article" },
          { text: "correo", type: "noun" },
          { text: "es", type: "verb" },
          { text: "mensaje", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с артиклем и существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1010,
        ru: "Она поёт песню",
        es: "Ella canta una canción",
        correct: ["Ella", "canta", "una", "canción"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "canta", type: "verb" },
          { text: "una", type: "article" },
          { text: "canción", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "toca", type: "verb" },
          { text: "un", type: "article" },
          { text: "guitarra", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени с артиклем и существительным.",
        maxWords: 4,
        formulaId: 10
      },
      {
        id: 1011,
        ru: "Он бегает в парке",
        es: "Él corre en el parque",
        correct: ["Él", "corre", "en", "el", "parque"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "corre", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "camina", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени и предлог с местом.",
        maxWords: 5,
        formulaId: 10
      },
      {
        id: 1012,
        ru: "Мы слушаем музыку",
        es: "Escuchamos música",
        correct: ["Escuchamos", "música"],
        wordBank: [
          { text: "Escuchamos", type: "verb" },
          { text: "música", type: "noun" },
          { text: "Escuchan", type: "verb" },
          { text: "radio", type: "noun" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" },
          { text: "es", type: "verb" },
          { text: "una", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени и существительное.",
        maxWords: 2,
        formulaId: 10
      },
      {
        id: 1013,
        ru: "Вы плаваете в бассейне",
        es: "Nadáis en la piscina",
        correct: ["Nadáis", "en", "la", "piscina"],
        wordBank: [
          { text: "Nadáis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "piscina", type: "noun" },
          { text: "Nadan", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "mar", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени и предлог с местом.",
        maxWords: 4,
        formulaId: 10
      },
      {
        id: 1014,
        ru: "Они учат испанский",
        es: "Ellos aprenden español",
        correct: ["Ellos", "aprenden", "español"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "aprenden", type: "verb" },
          { text: "español", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "estudian", type: "verb" },
          { text: "inglés", type: "noun" },
          { text: "la", type: "article" },
          { text: "lengua", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол в настоящем времени с существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1015,
        ru: "Я рисую картину",
        es: "Dibujo un cuadro",
        correct: ["Dibujo", "un", "cuadro"],
        wordBank: [
          { text: "Dibujo", type: "verb" },
          { text: "un", type: "article" },
          { text: "cuadro", type: "noun" },
          { text: "Dibujas", type: "verb" },
          { text: "una", type: "article" },
          { text: "foto", type: "noun" },
          { text: "es", type: "verb" },
          { text: "pintura", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени с артиклем и существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1016,
        ru: "Ты пьёшь кофе",
        es: "Bebes café",
        correct: ["Bebes", "café"],
        wordBank: [
          { text: "Bebes", type: "verb" },
          { text: "café", type: "noun" },
          { text: "Bebo", type: "verb" },
          { text: "té", type: "noun" },
          { text: "la", type: "article" },
          { text: "leche", type: "noun" },
          { text: "es", type: "verb" },
          { text: "un", type: "article" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени и существительное.",
        maxWords: 2,
        formulaId: 10
      },
      {
        id: 1017,
        ru: "Она покупает одежду",
        es: "Ella compra ropa",
        correct: ["Ella", "compra", "ropa"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "compra", type: "verb" },
          { text: "ropa", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "vende", type: "verb" },
          { text: "zapatos", type: "noun" },
          { text: "la", type: "article" },
          { text: "tienda", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол в настоящем времени с существительным.",
        maxWords: 3,
        formulaId: 10
      },
      {
        id: 1018,
        ru: "Он делает уроки",
        es: "Él hace los deberes",
        correct: ["Él", "hace", "los", "deberes"],
        wordBank: [
          { text: "Él", type: "pronoun" },
          { text: "hace", type: "verb" },
          { text: "los", type: "article" },
          { text: "deberes", type: "noun" },
          { text: "Ella", type: "pronoun" },
          { text: "estudia", type: "verb" },
          { text: "la", type: "article" },
          { text: "lección", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени и артикль с существительным.",
        maxWords: 4,
        formulaId: 10
      },
      {
        id: 1019,
        ru: "Мы гуляем в парке",
        es: "Paseamos en el parque",
        correct: ["Paseamos", "en", "el", "parque"],
        wordBank: [
          { text: "Paseamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Pasean", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол в настоящем времени и предлог с местом.",
        maxWords: 4,
        formulaId: 10
      },
      {
        id: 1020,
        ru: "Они говорят по телефону",
        es: "Ellos hablan por teléfono",
        correct: ["Ellos", "hablan", "por", "teléfono"],
        wordBank: [
          { text: "Ellos", type: "pronoun" },
          { text: "hablan", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "Ellas", type: "pronoun" },
          { text: "escriben", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект, глагол в настоящем времени и предлог с существительным.",
        maxWords: 4,
        formulaId: 10
      }
    ]
  }
};