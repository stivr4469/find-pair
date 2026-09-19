/**
 * Spanish Trainer - 20 Formulas
 * Data: formula descriptions, examples, and MCQ quiz questions
 */

const FORMULAS_DATA = [
  {
    id: 1,
    name: "Формула 1: Прилагательные",
    shortName: "Прилагательные",
    emoji: "🎨",
    description: "Описание существительных через прилагательные",
    rule: "sustantivo + adjetivo (+ y + adjetivo)",
    example: "El coche rojo y rápido",
    exampleRu: "Красная быстрая машина",
    examples: [
      { es: "La casa grande y bonita", ru: "Большой красивый дом" },
      { es: "El libro nuevo e interesante", ru: "Новая интересная книга" }
    ],
    quiz: [
      {
        question: "Красная машина",
        options: ["El coche rojo", "El rojo coche", "El coche es rojo", "Rojo el coche"],
        correct: 0,
        hint: "В испанском прилагательное обычно стоит ПОСЛЕ существительного"
      },
      {
        question: "Большой и красивый дом",
        options: ["La grande y bonita casa", "La casa grande y bonita", "La casa grande bonita", "La bonita y grande"],
        correct: 1,
        hint: "Прилагательные ставятся после существительного, соединяются через y"
      },
      {
        question: "Новая интересная книга",
        options: ["El nuevo libro interesante", "El libro es nuevo interesante", "El libro nuevo e interesante", "Nuevo interesante el libro"],
        correct: 2,
        hint: "Перед словами, начинающимися на i/hi, «y» меняется на «e»"
      }
    ]
  },
  {
    id: 2,
    name: "Формула 2: Наречия",
    shortName: "Наречия",
    emoji: "⚡",
    description: "Описание действий через наречия на -mente",
    rule: "verbo + adverbio (-mente)",
    example: "Roberto corre rápidamente",
    exampleRu: "Роберто бежит быстро",
    examples: [
      { es: "Ella canta bellamente", ru: "Она поёт красиво" },
      { es: "Él trabaja diligentemente", ru: "Он работает усердно" }
    ],
    quiz: [
      {
        question: "Она поёт красиво",
        options: ["Ella bella canta", "Ella canta bella", "Ella canta bellamente", "Bellamente ella"],
        correct: 2,
        hint: "Наречие ставится ПОСЛЕ глагола, суффикс -mente"
      },
      {
        question: "Мы говорим медленно",
        options: ["Nosotros lentamente hablamos", "Nosotros hablamos lentamente", "Nosotros hablamos lento mucho", "Nosotros son lentos"],
        correct: 1,
        hint: "hablar + lentamente (lento + -mente). Наречие после глагола"
      },
      {
        question: "Они работают усердно",
        options: ["Ellos diligentes trabajan", "Ellos trabajan muy diligente", "Diligentemente los ellos", "Ellos trabajan diligentemente"],
        correct: 3,
        hint: "trabajar + diligentemente. Наречие стоит после глагола"
      }
    ]
  },
  {
    id: 3,
    name: "Формула 3: Вопросы",
    shortName: "Вопросы",
    emoji: "❓",
    description: "Запрос специфической информации",
    rule: "¿Palabra interrogativa + verbo + sujeto?",
    example: "¿Cuánto dinero tienes?",
    exampleRu: "Сколько денег у тебя?",
    examples: [
      { es: "¿Qué hora es?", ru: "Который час?" },
      { es: "¿Quién es él?", ru: "Кто он?" }
    ],
    quiz: [
      {
        question: "Который час?",
        options: ["¿Es qué hora?", "¿Hora qué es?", "Qué hora es", "¿Qué hora es?"],
        correct: 3,
        hint: "Вопрос начинается с ¿ и заканчивается ?. Порядок: вопр. слово + глагол"
      },
      {
        question: "Где ты живёшь?",
        options: ["¿Tú dónde vives?", "¿Vives dónde tú?", "¿Dónde vives tú?", "Dónde tú vives"],
        correct: 2,
        hint: "¿Dónde + глагол + подлежащее? Нужны оба знака вопроса"
      },
      {
        question: "Сколько стоит?",
        options: ["¿Cuesta cuánto?", "¿Cuánto es cuesta?", "Cuánto cuesta", "¿Cuánto cuesta?"],
        correct: 3,
        hint: "¿Cuánto + глагол? — вопросительное слово стоит перед глаголом"
      }
    ]
  },
  {
    id: 4,
    name: "Формула 4: Полные предложения",
    shortName: "OD + OI",
    emoji: "📝",
    description: "Полные предложения с прямым и косвенным дополнением",
    rule: "Sujeto + verbo + OD + (le/les + a + OI)",
    example: "Sandra le compra chocolates a María",
    exampleRu: "Сандра покупает шоколад Марии",
    examples: [
      { es: "Yo le doy un libro a Juan", ru: "Я даю книгу Хуану" },
      { es: "Ella me envía una carta a mí", ru: "Она отправляет письмо мне" }
    ],
    quiz: [
      {
        question: "Я даю книгу Хуану",
        options: ["Yo doy a Juan un libro le", "Yo le doy Juan un libro", "Yo doy un libro Juan", "Yo le doy un libro a Juan"],
        correct: 3,
        hint: "le стоит ПЕРЕД глаголом, а «a Juan» уточняет кому — в конце"
      },
      {
        question: "Она отправляет письмо мне",
        options: ["Ella envía me una carta mí", "Ella me una carta envía a mí", "Ella envía una carta a mí", "Ella me envía una carta a mí"],
        correct: 3,
        hint: "me (местоимение) стоит перед глаголом, «a mí» — уточнение в конце"
      },
      {
        question: "Мы дарим цветы Анне",
        options: ["Nosotros regalamos flores Ana le", "Nosotros le regalamos a Ana flores", "Nosotros flores regalamos a Ana", "Nosotros le regalamos flores a Ana"],
        correct: 3,
        hint: "le перед глаголом, прямое дополнение (flores) после глагола, «a Ana» в конце"
      }
    ]
  },
  {
    id: 5,
    name: "Формула 5: Личное «a»",
    shortName: "Личное «a»",
    emoji: "👤",
    description: "Предлог «a» перед одушевлёнными прямыми дополнениями",
    rule: "verbo + a + persona/animal específico",
    example: "Roberto ve a su madre",
    exampleRu: "Роберто видит свою мать",
    examples: [
      { es: "Visito a mi abuela", ru: "Я навещаю свою бабушку" },
      { es: "Conozco a Pedro", ru: "Я знаю Педро" }
    ],
    quiz: [
      {
        question: "Я вижу мою маму",
        options: ["Veo mi madre", "Veo para mi madre", "Yo veo de mi madre", "Veo a mi madre"],
        correct: 3,
        hint: "Перед одушевлённым прямым дополнением нужно личное «a»"
      },
      {
        question: "Мы навещаем дедушку",
        options: ["Visitamos nuestro abuelo", "Visitamos para abuelo", "Visitamos de nuestro abuelo", "Visitamos a nuestro abuelo"],
        correct: 3,
        hint: "Личное «a» обязательно: visitar + a + человек"
      },
      {
        question: "Она знает Марию",
        options: ["Ella conoce María", "Ella a conoce María", "Ella conoce para María", "Ella conoce a María"],
        correct: 3,
        hint: "conocer + a + имя человека. «a» стоит между глаголом и именем"
      }
    ]
  },
  {
    id: 6,
    name: "Формула 6: Дублирование le/les",
    shortName: "Дублирование le",
    emoji: "🔗",
    description: "Дублирование le/les для уточнения косвенного дополнения",
    rule: "le/les + verbo + OD + a + OI (дублирование для уточнения)",
    example: "Sandra le compra chocolates a María",
    exampleRu: "le дублирует a María",
    examples: [
      { es: "Le doy el regalo a ella", ru: "Я даю подарок ей" },
      { es: "Les escribo una carta a mis padres", ru: "Я пишу письмо своим родителям" }
    ],
    quiz: [
      {
        question: "Я даю подарок ей (с уточнением)",
        options: ["Doy el regalo a ella", "Le doy el regalo ella", "Doy a ella el regalo le", "Le doy el regalo a ella"],
        correct: 3,
        hint: "le стоит ПЕРЕД глаголом, «a ella» — уточнение в конце предложения"
      },
      {
        question: "Я пишу письмо родителям (с уточнением)",
        options: ["Escribo una carta a mis padres", "Le escribo una carta a mis padres", "Les escribo a mis padres una carta les", "Les escribo una carta a mis padres"],
        correct: 3,
        hint: "Множественное число: les (не le). les перед глаголом + «a mis padres» в конце"
      },
      {
        question: "Он объясняет тему ученику (с уточнением)",
        options: ["Explica el tema al alumno", "Le explica el tema alumno", "Le al alumno explica el tema", "Le explica el tema al alumno"],
        correct: 3,
        hint: "le перед глаголом, прямое дополнение после глагола, «al alumno» в конце"
      }
    ]
  },
  {
    id: 7,
    name: "Формула 7: Возвратные глаголы",
    shortName: "Возвратные",
    emoji: "🔄",
    description: "Действия, направленные на самого субъекта",
    rule: "pronombre reflexivo (me/te/se/nos/os/se) + verbo reflexivo",
    example: "Jessica se maquilla",
    exampleRu: "Джессика красится",
    examples: [
      { es: "Me lavo las manos", ru: "Я мою руки" },
      { es: "Se visten rápidamente", ru: "Они быстро одеваются" }
    ],
    quiz: [
      {
        question: "Я умываюсь",
        options: ["Yo lavo la cara", "Yo me lavo la cara a mí", "Lavo me la cara", "Me lavo la cara"],
        correct: 3,
        hint: "Возвратное местоимение me стоит ПЕРЕД глаголом"
      },
      {
        question: "Она одевается",
        options: ["Ella viste", "Se ella viste", "Ella se vestirse", "Ella se viste"],
        correct: 3,
        hint: "se перед спрягаемым глаголом: Ella se viste"
      },
      {
        question: "Мы садимся",
        options: ["Sentamos", "Nosotros sentamos nos", "Nos estamos sentado", "Nos sentamos"],
        correct: 3,
        hint: "Возвратное nos стоит перед глаголом: nos sentamos"
      }
    ]
  },
  {
    id: 8,
    name: "Формула 8: Инфинитив",
    shortName: "Глагол + инфинитив",
    emoji: "🎯",
    description: "Глаголы, управляющие инфинитивом без предлога",
    rule: "verbo conjugado + infinitivo",
    example: "Quiero comer",
    exampleRu: "Я хочу есть",
    examples: [
      { es: "Necesito estudiar", ru: "Мне нужно учиться" },
      { es: "Prefiero leer", ru: "Я предпочитаю читать" }
    ],
    quiz: [
      {
        question: "Я хочу учиться",
        options: ["Quiero que estudiar", "Quiero estudiando", "Quiero estudio", "Quiero estudiar"],
        correct: 3,
        hint: "querer + инфинитив напрямую, без «que»"
      },
      {
        question: "Она может петь",
        options: ["Ella puede canta", "Ella puede cantando", "Ella puede que canta", "Ella puede cantar"],
        correct: 3,
        hint: "poder + инфинитив: puede + cantar"
      },
      {
        question: "Им нужно работать",
        options: ["Necesitan que trabajar", "Necesitan trabajando", "Necesitan trabajan", "Necesitan trabajar"],
        correct: 3,
        hint: "necesitar + инфинитив: necesitan + trabajar"
      }
    ]
  },
  {
    id: 9,
    name: "Формула 9: Hay que",
    shortName: "Hay que + инф.",
    emoji: "📋",
    description: "Безличное выражение необходимости",
    rule: "Hay que + infinitivo",
    example: "Hay que estudiar",
    exampleRu: "Нужно учиться",
    examples: [
      { es: "Hay que comer bien", ru: "Нужно хорошо питаться" },
      { es: "Hay que dormir ocho horas", ru: "Нужно спать восемь часов" }
    ],
    quiz: [
      {
        question: "Нужно учиться (безлично)",
        options: ["Tienes que estudiar", "Hay estudiar", "Hay que estudias", "Hay que estudiar"],
        correct: 3,
        hint: "Hay que — безличная форма, всегда неизменна. После неё — инфинитив"
      },
      {
        question: "Следует уважать правила",
        options: ["Hay que respetar reglas las", "Hay que se respetan las reglas", "Que respetar hay las reglas", "Hay que respetar las reglas"],
        correct: 3,
        hint: "Hay que + инфинитив + дополнение: hay que respetar las reglas"
      },
      {
        question: "Нужно спать хорошо",
        options: ["Hay dormir bien", "Hay que duerme bien", "Tienes hay que dormir bien", "Hay que dormir bien"],
        correct: 3,
        hint: "Hay que + инфинитив. После hay que глагол не спрягается"
      }
    ]
  },
  {
    id: 10,
    name: "Формула 10: Tener que",
    shortName: "Tener que + инф.",
    emoji: "✅",
    description: "Личная обязанность конкретного человека",
    rule: "tener (conjugado) + que + infinitivo",
    example: "Tienes que estudiar",
    exampleRu: "Ты должен учиться",
    examples: [
      { es: "Tengo que ir al banco", ru: "Я должен пойти в банк" },
      { es: "Ella tiene que trabajar", ru: "Она должна работать" }
    ],
    quiz: [
      {
        question: "Я должен пойти в банк",
        options: ["Hay que ir al banco yo", "Tengo ir al banco", "Tengo que voy al banco", "Tengo que ir al banco"],
        correct: 3,
        hint: "tener que + инфинитив: tengo que + ir. Не «voy», а инфинитив «ir»"
      },
      {
        question: "Он должен учиться",
        options: ["Él hay que estudiar", "Él tiene estudiar", "Él tiene que estudia", "Él tiene que estudiar"],
        correct: 3,
        hint: "tener спрягается (tiene), затем que + инфинитив"
      },
      {
        question: "Мы должны работать",
        options: ["Hay que trabajamos", "Tenemos trabajar", "Tenemos que trabajamos", "Tenemos que trabajar"],
        correct: 3,
        hint: "tenemos que + инфинитив. После «que» глагол не спрягается"
      }
    ]
  },
  {
    id: 11,
    name: "Формула 11: Pretérito Perfecto",
    shortName: "Pretérito Perfecto",
    emoji: "⏰",
    description: "Совершённые действия, связанные с настоящим",
    rule: "haber (conjugado) + participio (-ado/-ido)",
    example: "He comido",
    exampleRu: "Я поел (настоящее совершенное)",
    examples: [
      { es: "Hemos visto la película", ru: "Мы посмотрели фильм" },
      { es: "Ella ha escrito un libro", ru: "Она написала книгу" }
    ],
    quiz: [
      {
        question: "Я поел",
        options: ["Yo he comida", "Yo he comidos", "Yo comido he", "He comido"],
        correct: 3,
        hint: "Причастие в Pretérito Perfecto НЕ согласуется: всегда «comido», не «comida»"
      },
      {
        question: "Она написала книгу",
        options: ["Ella ha escrita un libro", "Ella escribió un libro haber", "Ella ha escribir un libro", "Ella ha escrito un libro"],
        correct: 3,
        hint: "ha (3 л. ед.ч. haber) + причастие escrito (неправильное). Не «escrita»"
      },
      {
        question: "Мы посмотрели фильм",
        options: ["Hemos vistos la película", "Nosotros han visto la película", "Hemos ver la película", "Hemos visto la película"],
        correct: 3,
        hint: "hemos (1 л. мн.ч.) + visto (неправильное причастие от ver). Не «vistos»"
      }
    ]
  },
  {
    id: 12,
    name: "Формула 12: Estar + gerundio",
    shortName: "Estar + герундий",
    emoji: "▶️",
    description: "Действие, происходящее прямо сейчас",
    rule: "estar (conjugado) + gerundio (-ando/-iendo)",
    example: "Estoy estudiando",
    exampleRu: "Я сейчас учусь",
    examples: [
      { es: "Estamos comiendo", ru: "Мы едим (сейчас)" },
      { es: "Él está leyendo", ru: "Он читает (сейчас)" }
    ],
    quiz: [
      {
        question: "Я сейчас учусь",
        options: ["Estoy estudiar", "Soy estudiando", "Estoy estudiado", "Estoy estudiando"],
        correct: 3,
        hint: "estar + герундий: estoy + estudiando (не soy, не причастие)"
      },
      {
        question: "Она сейчас читает",
        options: ["Ella está leer", "Ella es leyendo", "Ella está leído", "Ella está leyendo"],
        correct: 3,
        hint: "está + leyendo (leer → leyendo, не «leído»). Глагол estar, не ser"
      },
      {
        question: "Мы сейчас едим",
        options: ["Estamos comer", "Somos comiendo", "Hemos comiendo", "Estamos comiendo"],
        correct: 3,
        hint: "estamos + comiendo. Не haber, не ser — только estar для Progressive"
      }
    ]
  },
  {
    id: 13,
    name: "Формула 13: Llevar + gerundio",
    shortName: "Llevar + герундий",
    emoji: "⏳",
    description: "Длительность продолжающегося действия",
    rule: "llevar (conjugado) + tiempo + gerundio",
    example: "Llevo dos horas estudiando",
    exampleRu: "Я учусь уже два часа",
    examples: [
      { es: "Llevo un año viviendo aquí", ru: "Я живу здесь уже год" },
      { es: "Llevan tres días viajando", ru: "Они путешествуют уже три дня" }
    ],
    quiz: [
      {
        question: "Я учусь уже два часа",
        options: ["Estoy dos horas estudiando", "Llevo dos horas estudiar", "Llevo estudiando dos horas ya", "Llevo dos horas estudiando"],
        correct: 3,
        hint: "llevar + промежуток времени + герундий: llevo + dos horas + estudiando"
      },
      {
        question: "Она живёт здесь уже год",
        options: ["Está un año viviendo aquí", "Lleva viviendo aquí un año", "Lleva un año vivir aquí", "Lleva un año viviendo aquí"],
        correct: 3,
        hint: "lleva (3 л. ед.ч.) + un año + viviendo. Порядок: llevar + время + герундий"
      },
      {
        question: "Они путешествуют уже три дня",
        options: ["Están tres días viajando", "Llevan tres días viajar", "Llevan viajando tres días", "Llevan tres días viajando"],
        correct: 3,
        hint: "llevan (3 л. мн.ч.) + tres días + viajando. Время — между глаголом и герундием"
      }
    ]
  },
  {
    id: 14,
    name: "Формула 14: Para и Por",
    shortName: "Para vs Por",
    emoji: "🧭",
    description: "Предлоги цели (para) и причины/обмена (por)",
    rule: "para = цель/назначение; por = причина/обмен/движение",
    example: "Esto es para ti",
    exampleRu: "Это для тебя (цель)",
    examples: [
      { es: "Salgo para Madrid", ru: "Я уезжаю в Мадрид (цель)" },
      { es: "Lo hago por ti", ru: "Я делаю это ради тебя (причина)" }
    ],
    quiz: [
      {
        question: "Это для тебя (назначение)",
        options: ["Esto es por ti", "Esto es a ti", "Esto es de ti", "Esto es para ti"],
        correct: 3,
        hint: "para = назначение/получатель. por = причина/мотив"
      },
      {
        question: "Я делаю это ради тебя (причина)",
        options: ["Lo hago para ti", "Lo hago a ti", "Lo hago de ti", "Lo hago por ti"],
        correct: 3,
        hint: "por = ради кого-то, по причине. para = цель, назначение"
      },
      {
        question: "Я еду в Мадрид (цель)",
        options: ["Salgo por Madrid", "Salgo a Madrid", "Salgo de Madrid", "Salgo para Madrid"],
        correct: 3,
        hint: "para + направление = цель поездки. por Madrid = через Мадрид (транзит)"
      }
    ]
  },
  {
    id: 15,
    name: "Формула 15: Сравнение",
    shortName: "Сравнение",
    emoji: "⚖️",
    description: "Сравнение с más/menos...que и tan...como",
    rule: "más/menos + adj/adv + que || tan + adj/adv + como",
    example: "Ustedes comen más rápido que yo",
    exampleRu: "Вы едите быстрее, чем я",
    examples: [
      { es: "Este libro es más interesante que aquel", ru: "Эта книга интереснее той" },
      { es: "Ella es tan alta como su hermano", ru: "Она такая же высокая, как её брат" }
    ],
    quiz: [
      {
        question: "Эта книга интереснее той",
        options: ["Este libro es más interesante como aquel", "Este libro es interesante que aquel", "Este libro es tan interesante que aquel", "Este libro es más interesante que aquel"],
        correct: 3,
        hint: "más... que (не como). «como» используется только с «tan»"
      },
      {
        question: "Она такая же высокая, как брат",
        options: ["Ella es tan alta que su hermano", "Ella es más alta como su hermano", "Ella es tan alta su hermano", "Ella es tan alta como su hermano"],
        correct: 3,
        hint: "tan... como (не que). Равенство: tan + прилагательное + como"
      },
      {
        question: "Он говорит медленнее, чем я",
        options: ["Él habla más despacio como yo", "Él habla tan despacio que yo", "Él habla despacio que yo", "Él habla más despacio que yo"],
        correct: 3,
        hint: "más + наречие + que. Сравнение неравенства: más... que"
      }
    ]
  },
  {
    id: 16,
    name: "Формула 16: Местоимения OD",
    shortName: "Местоимения OD",
    emoji: "🔀",
    description: "Замена прямого дополнения местоимением lo/la/los/las",
    rule: "sustituir OD: lo (m.sg) / la (f.sg) / los (m.pl) / las (f.pl)",
    example: "Lo veo",
    exampleRu: "Я это вижу (м.р.)",
    examples: [
      { es: "Lo veo", ru: "Я вижу его/это" },
      { es: "Las compro", ru: "Я покупаю их (ж.р.мн.ч.)" }
    ],
    quiz: [
      {
        question: "Я вижу книгу → Я её вижу",
        options: ["Lo veo", "Le veo", "Las veo", "La veo"],
        correct: 3,
        hint: "libro (книга) = ж.р. ед.ч. → la. Не lo (м.р.), не las (мн.ч.)"
      },
      {
        question: "Я покупаю цветы → Я их покупаю (flores = м.р. мн.ч.)",
        options: ["Las compro", "Lo compro", "Le compro", "Los compro"],
        correct: 3,
        hint: "flores = м.р. мн.ч. → los. Не las (ж.р. мн.ч.)"
      },
      {
        question: "Она читает газету → Она её читает (periódico = м.р.)",
        options: ["Ella lo lee", "Ella le lee", "Ella las lee", "Ella la lee"],
        correct: 0,
        hint: "periódico (газета) = м.р. ед.ч. → lo"
      }
    ]
  },
  {
    id: 17,
    name: "Формула 17: Очень/очень (-ísimo)",
    shortName: "-ísimo / muy",
    emoji: "💥",
    description: "Выражение высокой степени качества",
    rule: "muy + adjetivo || adjetivo + -ísimo/a",
    example: "Es muy interesante / Es interesantísimo",
    exampleRu: "Это очень интересно",
    examples: [
      { es: "Es muy difícil / Es dificilísimo", ru: "Это очень сложно" },
      { es: "Ella es guapísima", ru: "Она очень красивая" }
    ],
    quiz: [
      {
        question: "Это очень интересно (с суффиксом -ísimo)",
        options: ["Es muy interesantísimo", "Es interesante muy", "Es interesante-ísimo", "Es interesantísimo"],
        correct: 3,
        hint: "С суффиксом -ísimo НЕ используется muy. Одно или другое"
      },
      {
        question: "Он очень умный",
        options: ["Él es tan inteligente", "Él es inteligente muy", "Él es más inteligente", "Él es muy inteligente"],
        correct: 3,
        hint: "muy + прилагательное: muy inteligente. muy стоит ПЕРЕД прилагательным"
      },
      {
        question: "Она очень красивая (суффикс)",
        options: ["Ella es muy guapísima", "Ella es guapa muy", "Ella es guapísimas", "Ella es guapísima"],
        correct: 3,
        hint: "guapa + -ísima = guapísima. Суффикс согласуется по роду. Без muy"
      }
    ]
  },
  {
    id: 18,
    name: "Формула 18: Замена OD + OI",
    shortName: "le → se + lo/la",
    emoji: "🔁",
    description: "Замена обоих дополнений местоимениями (le/les → se)",
    rule: "OI: le/les → se (перед lo/la/los/las) + OD: lo/la/los/las",
    example: "Se lo di",
    exampleRu: "Я ему/ей это дал",
    examples: [
      { es: "Se lo compré", ru: "Я это ему/ей купил" },
      { es: "Se la di", ru: "Я её ему/ей дал" }
    ],
    quiz: [
      {
        question: "Я ему это дал (книга = la)",
        options: ["Le la di", "Lo la di", "Se lo di", "Se la di"],
        correct: 3,
        hint: "книга = ж.р. → la. le → se перед la. Порядок: se + la + глагол"
      },
      {
        question: "Я ему это купил (regalo = el, м.р.)",
        options: ["Le lo compré", "Se la compré", "Lo le compré", "Se lo compré"],
        correct: 3,
        hint: "regalo = м.р. → lo. le → se перед lo. Порядок: se + lo + глагол"
      },
      {
        question: "Она им это рассказала (historia = la)",
        options: ["Ella les la contó", "Ella se lo contó", "Ella la se contó", "Ella se la contó"],
        correct: 3,
        hint: "historia = ж.р. → la. les → se перед la. Ella se la contó"
      }
    ]
  },
  {
    id: 19,
    name: "Формула 19: Gustar",
    shortName: "Gustar и подобные",
    emoji: "❤️",
    description: "Глаголы типа gustar: субъект — то, что нравится",
    rule: "(A mí/ti/él...) me/te/le/nos/os/les + verbo (согласован с тем, что нравится)",
    example: "Me gusta el arte",
    exampleRu: "Мне нравится искусство",
    examples: [
      { es: "Me encantan los libros", ru: "Мне очень нравятся книги" },
      { es: "Les molesta el ruido", ru: "Их беспокоит шум" }
    ],
    quiz: [
      {
        question: "Мне нравится музыка",
        options: ["Me gustan la música", "Yo gusta la música", "Me gusto la música", "Me gusta la música"],
        correct: 3,
        hint: "la música = ед.ч. → gusta (не gustan). Me = мне. Не «yo gusta»"
      },
      {
        question: "Им нравятся книги",
        options: ["Les gusta los libros", "Los gustan les", "Ellos gustan los libros", "Les gustan los libros"],
        correct: 3,
        hint: "los libros = мн.ч. → gustan. Les = им. Порядок: les + gustan + подлежащее"
      },
      {
        question: "Тебе нравится испанский язык?",
        options: ["¿Te gustan el español?", "¿Tú gustas el español?", "¿Te gusta de español?", "¿Te gusta el español?"],
        correct: 3,
        hint: "el español = ед.ч. → gusta. Te = тебе. Не «de español», не «tú gustas»"
      }
    ]
  },
  {
    id: 20,
    name: "Формула 20: Subjuntivo",
    shortName: "Субхунтиво",
    emoji: "🌙",
    description: "Сослагательное наклонение после глаголов желания/сомнения/эмоции",
    rule: "verbo de deseo/duda/emoción + que + subjuntivo",
    example: "Espero que estés bien",
    exampleRu: "Я надеюсь, что ты в порядке",
    examples: [
      { es: "Quiero que vengas", ru: "Я хочу, чтобы ты пришёл" },
      { es: "Dudo que lo sepa", ru: "Я сомневаюсь, что он это знает" }
    ],
    quiz: [
      {
        question: "Я хочу, чтобы ты пришёл",
        options: ["Quiero que vienes", "Quiero que venir", "Quiero vengas", "Quiero que vengas"],
        correct: 3,
        hint: "querer + que + субхунтиво: vengas (не vienes — это индикатив)"
      },
      {
        question: "Я надеюсь, что ты в порядке",
        options: ["Espero que estás bien", "Espero que estar bien", "Espero estés bien", "Espero que estés bien"],
        correct: 3,
        hint: "esperar + que + субхунтиво: estés (не estás — это индикатив)"
      },
      {
        question: "Они сомневаются, что он это знает",
        options: ["Dudan que lo sabe", "Dudan que lo saber", "Dudan lo sepa", "Dudan que lo sepa"],
        correct: 3,
        hint: "dudar + que + субхунтиво: sepa (не sabe — это индикатив). Нужно «que»"
      }
    ]
  }
,
  // ─── Формулы 21–27: дополнительные конструкции ───────────────────────────────

  {
    id: 21,
    name: "Формула 21: Будущее (ir + a)",
    shortName: "Futuro inmediato",
    emoji: "🚀",
    description: "Ближайшее будущее — самый частый способ выразить будущее в разговорной речи",
    rule: "ir (conjugado) + a + infinitivo",
    example: "Voy a comer",
    exampleRu: "Я собираюсь поесть / Я поем",
    examples: [
      { es: "Vamos a estudiar mañana", ru: "Мы будем учиться завтра" },
      { es: "¿Qué vas a hacer?", ru: "Что ты собираешься делать?" }
    ],
    quiz: [
      {
        question: "Я собираюсь поесть",
        options: ["Voy comer", "Voy a comer", "Voy a come", "Iré a comer"],
        correct: 1,
        hint: "ir + a + ИНФИНИТИВ. «voy» (иду) + «a» + «comer» (есть)"
      },
      {
        question: "Мы будем учиться завтра",
        options: ["Vamos estudiar mañana", "Iremos a estudiar mañana", "Vamos a estudiando mañana", "Vamos a estudiar mañana"],
        correct: 3,
        hint: "vamos (мы идём) + a + infinitivo. Не герундий! estudiar, не estudiando"
      },
      {
        question: "Что ты собираешься делать?",
        options: ["¿Qué haces?", "¿Qué vas hacer?", "¿Qué vas a hacer?", "¿Qué irás a hacer?"],
        correct: 2,
        hint: "¿Qué + vas + a + hacer? Предлог «a» обязателен"
      }
    ]
  },

  {
    id: 22,
    name: "Формула 22: Условное (condicional)",
    shortName: "Condicional",
    emoji: "💭",
    description: "Вежливые просьбы, гипотезы и желания — «я бы хотел», «мог бы»",
    rule: "infinitivo + -ía/-ías/-ía/-íamos/-íais/-ían",
    example: "Me gustaría un café",
    exampleRu: "Я бы хотел кофе",
    examples: [
      { es: "¿Podrías ayudarme?", ru: "Не мог бы ты мне помочь?" },
      { es: "Debería estudiar más", ru: "Мне следовало бы учиться больше" }
    ],
    quiz: [
      {
        question: "Я бы хотел кофе (вежливо)",
        options: ["Quiero un café", "Quisiera un café", "Me gustaría un café", "Me gustaba un café"],
        correct: 2,
        hint: "gustar в конdicional: me gustaría (мне бы понравился = я бы хотел)"
      },
      {
        question: "Не мог бы ты мне помочь?",
        options: ["¿Puedes ayudarme?", "¿Podrías ayudarme?", "¿Podías ayudarme?", "¿Podrás ayudarme?"],
        correct: 1,
        hint: "poder в конdicional: podría/podrías (мог бы). Звучит вежливее, чем puedes"
      },
      {
        question: "Мне следовало бы учиться больше",
        options: ["Debo estudiar más", "Debía estudiar más", "Debería estudiar más", "Deba estudiar más"],
        correct: 2,
        hint: "deber в конdicional: debería (следовало бы). Выражает мягкий совет"
      }
    ]
  },

  {
    id: 23,
    name: "Формула 23: Императив",
    shortName: "Imperativo",
    emoji: "📢",
    description: "Команды, просьбы и инструкции — «говори», «ешь», «иди»",
    rule: "tú: 3л.ед.ч. наст. | usted: субхунтиво | negación: no + субхунтиво",
    example: "Habla más despacio",
    exampleRu: "Говори медленнее",
    examples: [
      { es: "Come la verdura", ru: "Ешь овощи" },
      { es: "No hables tan rápido", ru: "Не говори так быстро" }
    ],
    quiz: [
      {
        question: "Говори (tú, позитивный)",
        options: ["Hablas", "Hablar", "Habla", "Hable"],
        correct: 2,
        hint: "Imperativo tú = форма 3-го лица ед.ч.: él habla → ¡Habla!"
      },
      {
        question: "Не говори (tú, негативный)",
        options: ["No habla", "No hablas", "No hablar", "No hables"],
        correct: 3,
        hint: "Негативный императив tú = no + субхунтиво: no hables"
      },
      {
        question: "Говорите (usted, вежливый)",
        options: ["Habla", "Hablas", "Hable", "Hablen"],
        correct: 2,
        hint: "Imperativo usted = форма субхунтиво: (que) hable → ¡Hable!"
      }
    ]
  },

  {
    id: 24,
    name: "Формула 24: Poder / Deber",
    shortName: "Poder / Deber",
    emoji: "⚙️",
    description: "Модальные глаголы — «могу/могу ли», «должен/следует»",
    rule: "poder/deber (conjugado) + infinitivo",
    example: "Puedo ayudarte",
    exampleRu: "Я могу тебе помочь",
    examples: [
      { es: "¿Puedo entrar?", ru: "Можно войти?" },
      { es: "Debes descansar", ru: "Тебе нужно отдохнуть" }
    ],
    quiz: [
      {
        question: "Я могу тебе помочь",
        options: ["Puedo ayudando", "Puedo a ayudar", "Poder ayudarte", "Puedo ayudarte"],
        correct: 3,
        hint: "poder (спряжённый) + инфинитив: puedo + ayudar"
      },
      {
        question: "Тебе нужно отдохнуть",
        options: ["Debes descansando", "Debes a descansar", "Debes descansar", "Deber descansar"],
        correct: 2,
        hint: "deber (спряжённый) + инфинитив: debes + descansar"
      },
      {
        question: "Можно войти? (вежливо)",
        options: ["¿Puedo entrar?", "¿Puedo entrando?", "¿Poder entrar?", "¿Puedo a entrar?"],
        correct: 0,
        hint: "¿Puedo + infinitivo? — вежливый запрос разрешения"
      }
    ]
  },

  {
    id: 25,
    name: "Формула 25: Acabar de",
    shortName: "Acabar de",
    emoji: "🕐",
    description: "Недавно завершённое действие — «только что сделал»",
    rule: "acabar (conjugado) + de + infinitivo",
    example: "Acabo de llegar",
    exampleRu: "Я только что пришёл",
    examples: [
      { es: "Acaban de comer", ru: "Они только что поели" },
      { es: "¿Acabas de llamar?", ru: "Ты только что звонил?" }
    ],
    quiz: [
      {
        question: "Я только что пришёл",
        options: ["Llegué ahora", "Acabo llegar", "Acabo de llegar", "Acabo de llegando"],
        correct: 2,
        hint: "acabar + de + инфинитив: acabo + de + llegar. «de» обязательно!"
      },
      {
        question: "Они только что поели",
        options: ["Acaban comer", "Acaban de comer", "Acaban de comiendo", "Acabaron de comer"],
        correct: 1,
        hint: "acaban (3л.мн.ч.) + de + comer. Настоящее время, не прошедшее!"
      },
      {
        question: "Мы только что посмотрели фильм",
        options: ["Acabamos ver la película", "Acabamos de viendo la película", "Acabamos de ver la película", "Acabamos a ver la película"],
        correct: 2,
        hint: "acabamos + de + ver (инфинитив). Не герундий (viendo)!"
      }
    ]
  },

  {
    id: 26,
    name: "Формула 26: Пассивная se",
    shortName: "Pasiva con se",
    emoji: "🔇",
    description: "Безличная пассивная конструкция — акцент на действии, не на деятеле",
    rule: "se + verbo (3л. ед. или мн.ч.)",
    example: "Se habla español",
    exampleRu: "Здесь говорят по-испански",
    examples: [
      { es: "Se venden pisos", ru: "Продаются квартиры" },
      { es: "Se busca cocinero", ru: "Требуется повар" }
    ],
    quiz: [
      {
        question: "Здесь говорят по-испански (безлично)",
        options: ["Hablan español aquí", "Se habla español", "Se hablan español", "Español se hablar"],
        correct: 1,
        hint: "se + verbo ед.ч., т.к. español (ед.ч.): se habla. Деятель не указан"
      },
      {
        question: "Продаются квартиры",
        options: ["Se vende pisos", "Pisos se venden", "Se venden pisos", "Se vender pisos"],
        correct: 2,
        hint: "pisos — мн.ч., поэтому глагол тоже мн.ч.: se venden"
      },
      {
        question: "Требуется секретарь",
        options: ["Se buscan secretario", "Se busca secretario", "Se buscar secretario", "Buscan secretario se"],
        correct: 1,
        hint: "secretario — ед.ч., глагол ед.ч.: se busca. Объявление о работе"
      }
    ]
  },

  {
    id: 27,
    name: "Формула 27: Перифразы (volver/seguir/dejar)",
    shortName: "Перифразы",
    emoji: "🔁",
    description: "Глагольные перифразы: снова, продолжать, перестать",
    rule: "volver a + inf | seguir + ger | dejar de + inf",
    example: "Vuelvo a intentarlo",
    exampleRu: "Я пробую снова",
    examples: [
      { es: "Sigo estudiando", ru: "Я продолжаю учиться" },
      { es: "Dejó de fumar", ru: "Он бросил курить" }
    ],
    quiz: [
      {
        question: "Я пробую снова",
        options: ["Intento de nuevo", "Vuelvo a intentarlo", "Vuelvo intentarlo", "Sigo a intentarlo"],
        correct: 1,
        hint: "volver a + инфинитив = делать снова. «a» обязательно!"
      },
      {
        question: "Она продолжает учиться",
        options: ["Ella sigue a estudiar", "Ella vuelve estudiando", "Ella sigue estudiar", "Ella sigue estudiando"],
        correct: 3,
        hint: "seguir + ГЕРУНДИЙ (не инфинитив!): sigue + estudiando"
      },
      {
        question: "Он бросил курить",
        options: ["Dejó fumar", "Dejó de fumando", "Dejó de fumar", "Dejó a fumar"],
        correct: 2,
        hint: "dejar de + инфинитив = перестать. «de» обязательно!"
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.FORMULAS_DATA = FORMULAS_DATA;
}
