export const formulas = {
  spanish: {
    formula: "Предлоги с глаголами",
    description: "Используется для выражения цели, причины, средства или места с предлогами 'por', 'para', 'con', 'en' и глаголами в настоящем времени.",
    examples: [
      {
        id: 601,
        ru: "Я плачу за книгу",
        es: "Pago por el libro",
        correct: ["Pago", "por", "el", "libro"],
        wordBank: [
          { text: "Pago", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "el", type: "article" },
          { text: "libro", type: "noun" },
          { text: "Compro", type: "verb" },
          { text: "la", type: "article" },
          { text: "revista", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "diario", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'por' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 602,
        ru: "Ты идёшь в школу пешком",
        es: "Vas a la escuela a pie",
        correct: ["Vas", "a", "la", "escuela", "a", "pie"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "pie", type: "noun" },
          { text: "Vienes", type: "verb" },
          { text: "el", type: "article" },
          { text: "coche", type: "noun" },
          { text: "en", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с предлогом 'a' и способом передвижения.",
        maxWords: 6,
        formulaId: 6
      },
      {
        id: 603,
        ru: "Она говорит с другом",
        es: "Habla con el amigo",
        correct: ["Habla", "con", "el", "amigo"],
        wordBank: [
          { text: "Habla", type: "verb" },
          { text: "con", type: "preposition" },
          { text: "el", type: "article" },
          { text: "amigo", type: "noun" },
          { text: "Escucha", type: "verb" },
          { text: "la", type: "article" },
          { text: "amiga", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "hermano", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'con' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 604,
        ru: "Он покупает подарок для мамы",
        es: "Compra un regalo para la mamá",
        correct: ["Compra", "un", "regalo", "para", "la", "mamá"],
        wordBank: [
          { text: "Compra", type: "verb" },
          { text: "un", type: "article" },
          { text: "regalo", type: "noun" },
          { text: "para", type: "preposition" },
          { text: "la", type: "article" },
          { text: "mamá", type: "noun" },
          { text: "Vende", type: "verb" },
          { text: "el", type: "article" },
          { text: "papá", type: "noun" },
          { text: "por", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'para' и существительным.",
        maxWords: 6,
        formulaId: 6
      },
      {
        id: 605,
        ru: "Мы путешествуем по Испании",
        es: "Viajamos por España",
        correct: ["Viajamos", "por", "España"],
        wordBank: [
          { text: "Viajamos", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "España", type: "noun" },
          { text: "Vivimos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "Francia", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "ciudad", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'por' и названием страны.",
        maxWords: 3,
        formulaId: 6
      },
      {
        id: 606,
        ru: "Вы говорите по-английски",
        es: "Habláis en inglés",
        correct: ["Habláis", "en", "inglés"],
        wordBank: [
          { text: "Habláis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "inglés", type: "noun" },
          { text: "Escucháis", type: "verb" },
          { text: "español", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "francés", type: "noun" },
          { text: "a", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'en' и языком.",
        maxWords: 3,
        formulaId: 6
      },
      {
        id: 607,
        ru: "Они работают для компании",
        es: "Trabajan para la compañía",
        correct: ["Trabajan", "para", "la", "compañía"],
        wordBank: [
          { text: "Trabajan", type: "verb" },
          { text: "para", type: "preposition" },
          { text: "la", type: "article" },
          { text: "compañía", type: "noun" },
          { text: "Estudian", type: "verb" },
          { text: "el", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "universidad", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'para' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 608,
        ru: "Я хожу с собакой",
        es: "Paseo con el perro",
        correct: ["Paseo", "con", "el", "perro"],
        wordBank: [
          { text: "Paseo", type: "verb" },
          { text: "con", type: "preposition" },
          { text: "el", type: "article" },
          { text: "perro", type: "noun" },
          { text: "Corro", type: "verb" },
          { text: "la", type: "article" },
          { text: "gato", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "parque", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'con' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 609,
        ru: "Ты учишься для экзамена",
        es: "Estudias para el examen",
        correct: ["Estudias", "para", "el", "examen"],
        wordBank: [
          { text: "Estudias", type: "verb" },
          { text: "para", type: "preposition" },
          { text: "el", type: "article" },
          { text: "examen", type: "noun" },
          { text: "Trabajas", type: "verb" },
          { text: "la", type: "article" },
          { text: "tarea", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "escuela", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'para' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 610,
        ru: "Она едет в город на автобусе",
        es: "Ella va a la ciudad en autobús",
        correct: ["Ella", "va", "a", "la", "ciudad", "en", "autobús"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "va", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "la", type: "article" },
          { text: "ciudad", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "autobús", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "viene", type: "verb" },
          { text: "coche", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол движения с предлогами 'a' и 'en'.",
        maxWords: 7,
        formulaId: 6
      },
      {
        id: 611,
        ru: "Он говорит по телефону",
        es: "Habla por teléfono",
        correct: ["Habla", "por", "teléfono"],
        wordBank: [
          { text: "Habla", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "teléfono", type: "noun" },
          { text: "Escribe", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "correo", type: "noun" },
          { text: "la", type: "article" },
          { text: "computadora", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'por' и существительным.",
        maxWords: 3,
        formulaId: 6
      },
      {
        id: 612,
        ru: "Мы готовим с друзьями",
        es: "Cocinamos con los amigos",
        correct: ["Cocinamos", "con", "los", "amigos"],
        wordBank: [
          { text: "Cocinamos", type: "verb" },
          { text: "con", type: "preposition" },
          { text: "los", type: "article" },
          { text: "amigos", type: "noun" },
          { text: "Comemos", type: "verb" },
          { text: "las", type: "article" },
          { text: "amigas", type: "noun" },
          { text: "por", type: "preposition" },
          { text: "familia", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'con' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 613,
        ru: "Вы играете в парке с мячом",
        es: "Jugáis en el parque con el balón",
        correct: ["Jugáis", "en", "el", "parque", "con", "el", "balón"],
        wordBank: [
          { text: "Jugáis", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "con", type: "preposition" },
          { text: "el", type: "article" },
          { text: "balón", type: "noun" },
          { text: "Corres", type: "verb" },
          { text: "la", type: "article" },
          { text: "pelota", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогами 'en' и 'con'.",
        maxWords: 7,
        formulaId: 6
      },
      {
        id: 614,
        ru: "Они учатся для будущего",
        es: "Aprenden para el futuro",
        correct: ["Aprenden", "para", "el", "futuro"],
        wordBank: [
          { text: "Aprenden", type: "verb" },
          { text: "para", type: "preposition" },
          { text: "el", type: "article" },
          { text: "futuro", type: "noun" },
          { text: "Estudian", type: "verb" },
          { text: "la", type: "article" },
          { text: "presente", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "escuela", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'para' и существительным.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 615,
        ru: "Я пишу письмо для друга",
        es: "Escribo una carta para el amigo",
        correct: ["Escribo", "una", "carta", "para", "el", "amigo"],
        wordBank: [
          { text: "Escribo", type: "verb" },
          { text: "una", type: "article" },
          { text: "carta", type: "noun" },
          { text: "para", type: "preposition" },
          { text: "el", type: "article" },
          { text: "amigo", type: "noun" },
          { text: "Leo", type: "verb" },
          { text: "la", type: "article" },
          { text: "amiga", type: "noun" },
          { text: "por", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'para' и существительным.",
        maxWords: 6,
        formulaId: 6
      },
      {
        id: 616,
        ru: "Ты едешь на работу на машине",
        es: "Vas al trabajo en coche",
        correct: ["Vas", "a", "el", "trabajo", "en", "coche"],
        wordBank: [
          { text: "Vas", type: "verb" },
          { text: "a", type: "preposition" },
          { text: "el", type: "article" },
          { text: "trabajo", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "coche", type: "noun" },
          { text: "Vienes", type: "verb" },
          { text: "la", type: "article" },
          { text: "autobús", type: "noun" },
          { text: "por", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол движения с предлогами 'a' и 'en'.",
        maxWords: 6,
        formulaId: 6
      },
      {
        id: 617,
        ru: "Она смотрит телевизор с братом",
        es: "Ella mira la televisión con el hermano",
        correct: ["Ella", "mira", "la", "televisión", "con", "el", "hermano"],
        wordBank: [
          { text: "Ella", type: "pronoun" },
          { text: "mira", type: "verb" },
          { text: "la", type: "article" },
          { text: "televisión", type: "noun" },
          { text: "con", type: "preposition" },
          { text: "el", type: "article" },
          { text: "hermano", type: "noun" },
          { text: "Él", type: "pronoun" },
          { text: "amigo", type: "noun" },
          { text: "por", type: "preposition" }
        ],
        difficulty: "medium",
        hint: "Используйте субъект и глагол с предлогом 'con'.",
        maxWords: 7,
        formulaId: 6
      },
      {
        id: 618,
        ru: "Он бегает по парку",
        es: "Corre por el parque",
        correct: ["Corre", "por", "el", "parque"],
        wordBank: [
          { text: "Corre", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "el", type: "article" },
          { text: "parque", type: "noun" },
          { text: "Camina", type: "verb" },
          { text: "la", type: "article" },
          { text: "playa", type: "noun" },
          { text: "en", type: "preposition" },
          { text: "calle", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'por' и местом.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 619,
        ru: "Мы учимся в университете",
        es: "Estudiamos en la universidad",
        correct: ["Estudiamos", "en", "la", "universidad"],
        wordBank: [
          { text: "Estudiamos", type: "verb" },
          { text: "en", type: "preposition" },
          { text: "la", type: "article" },
          { text: "universidad", type: "noun" },
          { text: "Trabajamos", type: "verb" },
          { text: "el", type: "article" },
          { text: "escuela", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "instituto", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'en' и местом.",
        maxWords: 4,
        formulaId: 6
      },
      {
        id: 620,
        ru: "Они платят за ужин",
        es: "Pagan por la cena",
        correct: ["Pagan", "por", "la", "cena"],
        wordBank: [
          { text: "Pagan", type: "verb" },
          { text: "por", type: "preposition" },
          { text: "la", type: "article" },
          { text: "cena", type: "noun" },
          { text: "Compran", type: "verb" },
          { text: "el", type: "article" },
          { text: "desayuno", type: "noun" },
          { text: "a", type: "preposition" },
          { text: "comida", type: "noun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол с предлогом 'por' и существительным.",
        maxWords: 4,
        formulaId: 6
      }
    ]
  }
};
