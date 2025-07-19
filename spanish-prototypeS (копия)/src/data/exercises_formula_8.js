export const formulas = {
  spanish: {
    formula: "Выражение принадлежности",
    description: "Используется для указания принадлежности с помощью притяжательных прилагательных (mi, tu, su) или местоимений (mío, tuyo).",
    examples: [
      {
        id: 801,
        ru: "Это моя машина",
        es: "Es mi coche",
        correct: ["Es", "mi", "coche"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "coche", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "tu", type: "pronoun" },
          { text: "moto", type: "noun" },
          { text: "está", type: "verb" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 802,
        ru: "Это твой дом",
        es: "Es tu casa",
        correct: ["Es", "tu", "casa"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "tu", type: "pronoun" },
          { text: "casa", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "apartamento", type: "noun" },
          { text: "está", type: "verb" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 803,
        ru: "Это его книга",
        es: "Es su libro",
        correct: ["Es", "su", "libro"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "su", type: "pronoun" },
          { text: "libro", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "revista", type: "noun" },
          { text: "está", type: "verb" },
          { text: "tu", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 804,
        ru: "Это её сумка",
        es: "Es su bolsa",
        correct: ["Es", "su", "bolsa"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "su", type: "pronoun" },
          { text: "bolsa", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "cartera", type: "noun" },
          { text: "está", type: "verb" },
          { text: "tu", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 805,
        ru: "Это наша семья",
        es: "Es nuestra familia",
        correct: ["Es", "nuestra", "familia"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "nuestra", type: "pronoun" },
          { text: "familia", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "vuestra", type: "pronoun" },
          { text: "casa", type: "noun" },
          { text: "está", type: "verb" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 806,
        ru: "Это ваша квартира",
        es: "Es vuestra apartamento",
        correct: ["Es", "vuestra", "apartamento"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "vuestra", type: "pronoun" },
          { text: "apartamento", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "nuestra", type: "pronoun" },
          { text: "casa", type: "noun" },
          { text: "está", type: "verb" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 807,
        ru: "Это их собака",
        es: "Es su perro",
        correct: ["Es", "su", "perro"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "su", type: "pronoun" },
          { text: "perro", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "gato", type: "noun" },
          { text: "está", type: "verb" },
          { text: "tu", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 808,
        ru: "Эта книга моя",
        es: "Este libro es mío",
        correct: ["Este", "libro", "es", "mío"],
        wordBank: [
          { text: "Este", type: "article" },
          { text: "libro", type: "noun" },
          { text: "es", type: "verb" },
          { text: "mío", type: "pronoun" },
          { text: "Esa", type: "article" },
          { text: "revista", type: "noun" },
          { text: "está", type: "verb" },
          { text: "tuyo", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 809,
        ru: "Этот дом твой",
        es: "Esta casa es tuya",
        correct: ["Esta", "casa", "es", "tuya"],
        wordBank: [
          { text: "Esta", type: "article" },
          { text: "casa", type: "noun" },
          { text: "es", type: "verb" },
          { text: "tuya", type: "pronoun" },
          { text: "Ese", type: "article" },
          { text: "apartamento", type: "noun" },
          { text: "está", type: "verb" },
          { text: "mío", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 810,
        ru: "Этот телефон его",
        es: "Este teléfono es suyo",
        correct: ["Este", "teléfono", "es", "suyo"],
        wordBank: [
          { text: "Este", type: "article" },
          { text: "teléfono", type: "noun" },
          { text: "es", type: "verb" },
          { text: "suyo", type: "pronoun" },
          { text: "Esa", type: "article" },
          { text: "computadora", type: "noun" },
          { text: "está", type: "verb" },
          { text: "mío", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 811,
        ru: "Эта сумка её",
        es: "Esta bolsa es suya",
        correct: ["Esta", "bolsa", "es", "suya"],
        wordBank: [
          { text: "Esta", type: "article" },
          { text: "bolsa", type: "noun" },
          { text: "es", type: "verb" },
          { text: "suya", type: "pronoun" },
          { text: "Ese", type: "article" },
          { text: "cartera", type: "noun" },
          { text: "está", type: "verb" },
          { text: "tuyo", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 812,
        ru: "Эти книги наши",
        es: "Estos libros son nuestros",
        correct: ["Estos", "libros", "son", "nuestros"],
        wordBank: [
          { text: "Estos", type: "article" },
          { text: "libros", type: "noun" },
          { text: "son", type: "verb" },
          { text: "nuestros", type: "pronoun" },
          { text: "Esas", type: "article" },
          { text: "revistas", type: "noun" },
          { text: "es", type: "verb" },
          { text: "vuestros", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 813,
        ru: "Эти стулья ваши",
        es: "Estas sillas son vuestras",
        correct: ["Estas", "sillas", "son", "vuestras"],
        wordBank: [
          { text: "Estas", type: "article" },
          { text: "sillas", type: "noun" },
          { text: "son", type: "verb" },
          { text: "vuestras", type: "pronoun" },
          { text: "Esos", type: "article" },
          { text: "mesas", type: "noun" },
          { text: "es", type: "verb" },
          { text: "nuestros", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 814,
        ru: "Эти собаки их",
        es: "Estos perros son suyos",
        correct: ["Estos", "perros", "son", "suyos"],
        wordBank: [
          { text: "Estos", type: "article" },
          { text: "perros", type: "noun" },
          { text: "son", type: "verb" },
          { text: "suyos", type: "pronoun" },
          { text: "Esas", type: "article" },
          { text: "gatas", type: "noun" },
          { text: "es", type: "verb" },
          { text: "míos", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 815,
        ru: "Это моя идея",
        es: "Es mi idea",
        correct: ["Es", "mi", "idea"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "idea", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "tu", type: "pronoun" },
          { text: "proyecto", type: "noun" },
          { text: "está", type: "verb" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 816,
        ru: "Это твой проект",
        es: "Es tu proyecto",
        correct: ["Es", "tu", "proyecto"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "tu", type: "pronoun" },
          { text: "proyecto", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "idea", type: "noun" },
          { text: "está", type: "verb" },
          { text: "su", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 817,
        ru: "Это его работа",
        es: "Es su trabajo",
        correct: ["Es", "su", "trabajo"],
        wordBank: [
          { text: "Es", type: "verb" },
          { text: "su", type: "pronoun" },
          { text: "trabajo", type: "noun" },
          { text: "Son", type: "verb" },
          { text: "mi", type: "pronoun" },
          { text: "profesión", type: "noun" },
          { text: "está", type: "verb" },
          { text: "tu", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте глагол 'ser' с притяжательным прилагательным и существительным.",
        maxWords: 3,
        formulaId: 8
      },
      {
        id: 818,
        ru: "Эта кошка её",
        es: "Esta gata es suya",
        correct: ["Esta", "gata", "es", "suya"],
        wordBank: [
          { text: "Esta", type: "article" },
          { text: "gata", type: "noun" },
          { text: "es", type: "verb" },
          { text: "suya", type: "pronoun" },
          { text: "Ese", type: "article" },
          { text: "perro", type: "noun" },
          { text: "está", type: "verb" },
          { text: "mío", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 819,
        ru: "Эти идеи наши",
        es: "Estas ideas son nuestras",
        correct: ["Estas", "ideas", "son", "nuestras"],
        wordBank: [
          { text: "Estas", type: "article" },
          { text: "ideas", type: "noun" },
          { text: "son", type: "verb" },
          { text: "nuestras", type: "pronoun" },
          { text: "Esos", type: "article" },
          { text: "proyectos", type: "noun" },
          { text: "es", type: "verb" },
          { text: "vuestras", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      },
      {
        id: 820,
        ru: "Эти машины ваши",
        es: "Estos coches son vuestros",
        correct: ["Estos", "coches", "son", "vuestros"],
        wordBank: [
          { text: "Estos", type: "article" },
          { text: "coches", type: "noun" },
          { text: "son", type: "verb" },
          { text: "vuestros", type: "pronoun" },
          { text: "Esas", type: "article" },
          { text: "motos", type: "noun" },
          { text: "es", type: "verb" },
          { text: "nuestros", type: "pronoun" }
        ],
        difficulty: "medium",
        hint: "Используйте артикль, существительное, глагол 'ser' и притяжательное местоимение.",
        maxWords: 4,
        formulaId: 8
      }
    ]
  }
};