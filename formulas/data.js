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
  },

  {
    id: 28,
    name: "Формула 28: Se me / Se te (непреднамеренное)",
    shortName: "Se me / Se te",
    emoji: "🤷",
    description: "Непреднамеренные действия — «я случайно», «само получилось», «не виноват»",
    rule: "se + me/te/le/nos/os/les + verbo (3л., согласован с субъектом)",
    example: "Se me olvidó el libro",
    exampleRu: "Я забыл книгу (само забылось мне)",
    examples: [
      { es: "Se me cayeron las llaves", ru: "Я уронил ключи (ключи упали сами)" },
      { es: "Se te rompió el teléfono", ru: "У тебя сломался телефон (само сломалось)" },
      { es: "Se le perdió el pasaporte", ru: "Он потерял паспорт (паспорт потерялся у него)" },
      { es: "Se nos fue el autobús", ru: "Мы опоздали на автобус (автобус ушёл сам)" },
      { es: "Se me quemó la comida", ru: "У меня сгорела еда (еда сгорела сама)" },
      { es: "Se te olvidaron las llaves", ru: "Ты забыл ключи (ключи забылись у тебя)" },
      { es: "Se le escapó el perro", ru: "У него убежала собака (собака убежала сама)" },
      { es: "Se nos acabó el tiempo", ru: "У нас кончилось время (время само кончилось)" },
      { es: "Se me derramó el café", ru: "Я пролил кофе (кофе разлился сам)" },
      { es: "Se te fue la idea", ru: "Ты забыл мысль (мысль сама ушла у тебя)" }
    ],
    quiz: [
      {
        question: "Я забыл книгу (случайно, не виноват)",
        options: [
          "Me olvidé el libro",
          "Yo olvidé el libro",
          "Se me olvidó el libro",
          "Se me olvidaron el libro"
        ],
        correct: 2,
        hint: "libro — ед.ч., глагол ед.ч.: se me olvidó. Порядок: se + me + verbo (ед.ч.)"
      },
      {
        question: "Я уронил ключи (они сами упали)",
        options: [
          "Se me cayó las llaves",
          "Me cayeron las llaves",
          "Se le cayeron las llaves",
          "Se me cayeron las llaves"
        ],
        correct: 3,
        hint: "llaves — мн.ч., глагол мн.ч.: se me cayeron. Глагол согласуется с ключами, не со мной"
      },
      {
        question: "У него закончились деньги (сами закончились)",
        options: [
          "Se le acabó el dinero",
          "Se me acabó el dinero",
          "Le acabó el dinero",
          "Se le acabaron el dinero"
        ],
        correct: 0,
        hint: "él → le: se le acabó. dinero — ед.ч. → глагол ед.ч. acabó"
      }
    ]
  },

  // ─── Формула 29 ────────────────────────────────────────────────────────────
  {
    id: 29,
    name: "Формула 29: Hace + tiempo + que (давность)",
    shortName: "Hace + que",
    emoji: "⏱️",
    description: "Выражает, как давно что-то происходит или произошло",
    rule: "Hace + [время] + que + [глагол в presente/pretérito]",
    example: "Hace dos años que vivo en Madrid",
    exampleRu: "Я живу в Мадриде уже два года",
    examples: [
      { es: "Hace una hora que espero", ru: "Я жду уже час" },
      { es: "Hace tres días que no duermo", ru: "Я не сплю уже три дня" },
      { es: "Hace un mes que estudia español", ru: "Он учит испанский уже месяц" },
      { es: "Hace diez años que nos conocemos", ru: "Мы знакомы уже десять лет" },
      { es: "Hace cinco minutos que empezó la clase", ru: "Урок начался пять минут назад" },
      { es: "¿Cuánto tiempo hace que vives aquí?", ru: "Сколько времени ты живёшь здесь?" }
    ],
    quiz: [
      {
        question: "Я живу в Мадриде уже два года",
        options: [
          "Vivo en Madrid desde dos años",
          "Hace dos años que vivo en Madrid",
          "Desde dos años vivo en Madrid",
          "Dos años hace que vivo en Madrid"
        ],
        correct: 1,
        hint: "Порядок строго: Hace + время + que + глагол (presente). Не 'desde dos años'"
      },
      {
        question: "Он учит испанский уже три месяца",
        options: [
          "Hace tres meses que estudia español",
          "Desde tres meses estudia español",
          "Estudia español desde tres meses",
          "Hace tres meses estudia español"
        ],
        correct: 0,
        hint: "Hace tres meses que + глагол (presente). Союз 'que' обязателен"
      },
      {
        question: "Сколько времени ты ждёшь? (конструкция hace + que)",
        options: [
          "¿Cuánto tiempo hace que esperas?",
          "¿Cuánto tiempo esperas?",
          "¿Desde cuándo esperas?",
          "¿Por cuánto tiempo esperas?"
        ],
        correct: 0,
        hint: "Вопрос: ¿Cuánto tiempo hace que + глагол presente? — давность действия"
      }
    ]
  },

  // ─── Формула 30 ────────────────────────────────────────────────────────────
  {
    id: 30,
    name: "Формула 30: Двойное отрицание (no + nada/nadie/nunca)",
    shortName: "Двойное отрицание",
    emoji: "🚫",
    description: "В испанском несколько отрицаний в предложении — норма, а не ошибка",
    rule: "No + verbo + nada / nadie / nunca / ningún...",
    example: "No sé nada",
    exampleRu: "Я ничего не знаю",
    examples: [
      { es: "No viene nadie", ru: "Никто не приходит" },
      { es: "No tengo nada", ru: "У меня ничего нет" },
      { es: "No lo he visto nunca", ru: "Я никогда его не видел" },
      { es: "No hay nadie en casa", ru: "Дома никого нет" },
      { es: "No quiero nada más", ru: "Я больше ничего не хочу" },
      { es: "No sé nada de eso", ru: "Я ничего об этом не знаю" },
      { es: "Nadie lo sabe", ru: "Никто не знает (nadie перед глаголом — одно отрицание)" }
    ],
    quiz: [
      {
        question: "Я ничего не знаю",
        options: [
          "No sé nada",
          "Sé nada",
          "No sé ninguna cosa",
          "Nada no sé"
        ],
        correct: 0,
        hint: "No + sé + nada — стандартное двойное отрицание. 'Sé nada' неграмматично"
      },
      {
        question: "Я никогда не ем рыбу (двойное отрицание)",
        options: [
          "Nunca como pescado",
          "No como nunca pescado",
          "No como pescado nunca",
          "No como nada pescado"
        ],
        correct: 2,
        hint: "No + глагол + nunca (после глагола). 'Nunca' перед глаголом — одно отрицание без 'no'"
      },
      {
        question: "У меня ничего нет",
        options: [
          "Tengo nada",
          "No tengo ninguna cosa",
          "No tengo nada",
          "Nada tengo yo"
        ],
        correct: 2,
        hint: "No tengo nada — двойное отрицание: 'no' + 'nada'. Это норма испанского языка"
      }
    ]
  },

  // ─── Формула 31 ────────────────────────────────────────────────────────────
  {
    id: 31,
    name: "Формула 31: Ponerse / Quedarse + прилагательное",
    shortName: "Ponerse / Quedarse",
    emoji: "😮",
    description: "Ponerse — внезапная реакция; Quedarse — оставаться в состоянии как результат",
    rule: "ponerse + adj (внезапно) | quedarse + adj (результат/оставаться)",
    example: "Se puso rojo de vergüenza",
    exampleRu: "Он покраснел от стыда",
    examples: [
      { es: "Me puse nervioso antes del examen", ru: "Я занервничал перед экзаменом" },
      { es: "Se quedó sorprendido con la noticia", ru: "Он остался удивлённым от новости" },
      { es: "Te pusiste muy contento", ru: "Ты обрадовался / стал очень радостным" },
      { es: "Nos quedamos sin palabras", ru: "Мы лишились слов / остались без слов" },
      { es: "Se puso triste al escuchar eso", ru: "Она загрустила, услышав это" },
      { es: "Me quedé dormido en el sofá", ru: "Я заснул на диване (и остался спать)" },
      { es: "Se puso pálido de miedo", ru: "Он побледнел от страха" }
    ],
    quiz: [
      {
        question: "Она покраснела (внезапная реакция)",
        options: [
          "Se quedó roja",
          "Se puso roja",
          "Está roja",
          "Se volvió roja"
        ],
        correct: 1,
        hint: "Ponerse = внезапная эмоциональная или физическая реакция: se puso roja"
      },
      {
        question: "Мы онемели от удивления (остались в этом состоянии)",
        options: [
          "Nos pusimos mudos",
          "Estuvimos mudos",
          "Nos quedamos mudos",
          "Fuimos mudos"
        ],
        correct: 2,
        hint: "Quedarse = оставаться в состоянии как результат события: nos quedamos mudos"
      },
      {
        question: "Я занервничал перед экзаменом",
        options: [
          "Me quedé nervioso",
          "Me puse nervioso",
          "Estuve nervioso",
          "Tuve nervioso"
        ],
        correct: 1,
        hint: "Ponerse nervioso — внезапная реакция на ситуацию. Quedarse nervioso — остаться в нервном состоянии"
      }
    ]
  },

  // ─── Формула 32 ────────────────────────────────────────────────────────────
  {
    id: 32,
    name: "Формула 32: Si + presente → futuro (реальное условие)",
    shortName: "Si real (если...то)",
    emoji: "🔀",
    description: "Реальное условие: если произойдёт X, то результат Y возможен",
    rule: "Si + presente indicativo → futuro / presente / imperativo",
    example: "Si tengo tiempo, te llamaré",
    exampleRu: "Если у меня будет время, я тебе позвоню",
    examples: [
      { es: "Si llueve, no salimos", ru: "Если будет дождь, не выходим" },
      { es: "Si estudias, aprobarás", ru: "Если будешь учиться, сдашь экзамен" },
      { es: "Si tienes hambre, come algo", ru: "Если голоден, поешь что-нибудь" },
      { es: "Si viene Pedro, avísame", ru: "Если придёт Педро, сообщи мне" },
      { es: "Si hace calor, vamos a la playa", ru: "Если жарко, идём на пляж" },
      { es: "Si no entiendes, pregunta", ru: "Если не понимаешь, спроси" }
    ],
    quiz: [
      {
        question: "Если у него будет время, он придёт",
        options: [
          "Si tendrá tiempo, vendrá",
          "Si tiene tiempo, vendrá",
          "Si tiene tiempo, vendría",
          "Si tuviera tiempo, vendrá"
        ],
        correct: 1,
        hint: "Реальное условие: Si + PRESENTE (не futuro!), + futuro. Никогда 'si + tendrá'"
      },
      {
        question: "Если будешь учиться, сдашь экзамен",
        options: [
          "Si estudiarás, aprobarás",
          "Si estudias, aprobas",
          "Si estudias, aprobarás",
          "Si estudies, aprobarás"
        ],
        correct: 2,
        hint: "Si + presente indicativo (estudias) + futuro (aprobarás). 'estudies' — субхунтиво, здесь неверно"
      },
      {
        question: "Если голоден — поешь (повелительное в результате)",
        options: [
          "Si tienes hambre, comerás",
          "Si tendrás hambre, come",
          "Si tienes hambre, come",
          "Si tienes hambre, comer"
        ],
        correct: 2,
        hint: "Si + presente, + imperativo — реальное условие с советом или приказом"
      }
    ]
  },

  // ─── Формула 33 ────────────────────────────────────────────────────────────
  {
    id: 33,
    name: "Формула 33: Придаточные определительные (que / donde / lo que)",
    shortName: "Que / Donde / Lo que",
    emoji: "🔗",
    description: "Связывают главное предложение с придаточным, уточняя существительное",
    rule: "[sustantivo] + que (для людей/вещей) / donde (для мест) / lo que (без антецедента)",
    example: "El libro que leí es interesante",
    exampleRu: "Книга, которую я прочитал, интересная",
    examples: [
      { es: "La ciudad donde vivo es bonita", ru: "Город, в котором я живу, красивый" },
      { es: "Lo que dices es verdad", ru: "То, что ты говоришь, — правда" },
      { es: "El chico que conocí es simpático", ru: "Парень, которого я встретил, симпатичный" },
      { es: "La película que vimos fue genial", ru: "Фильм, который мы посмотрели, был отличным" },
      { es: "La casa donde nació es muy antigua", ru: "Дом, где он родился, очень старый" },
      { es: "Lo que necesito es descansar", ru: "То, что мне нужно, — это отдохнуть" }
    ],
    quiz: [
      {
        question: "Книга, которую я купил, очень дорогая",
        options: [
          "El libro donde compré es muy caro",
          "El libro que compré es muy caro",
          "El libro lo que compré es muy caro",
          "El libro quien compré es muy caro"
        ],
        correct: 1,
        hint: "Для вещей — 'que', не 'quien' (quien — для людей) и не 'donde' (donde — для мест)"
      },
      {
        question: "Город, где я родился, находится на севере",
        options: [
          "La ciudad que nací está en el norte",
          "La ciudad lo que nací está en el norte",
          "La ciudad donde nací está en el norte",
          "La ciudad cuando nací está en el norte"
        ],
        correct: 2,
        hint: "'Donde' — для мест. La ciudad donde nací = 'город, где я родился'"
      },
      {
        question: "То, что ты говоришь, — правда",
        options: [
          "Que dices es verdad",
          "Lo que dices es verdad",
          "Eso que dices es verdad siempre",
          "Cual dices es verdad"
        ],
        correct: 1,
        hint: "'Lo que' = 'то, что' — без конкретного существительного. Lo que dices es verdad"
      }
    ]
  },

  // ─── Формула 34 ────────────────────────────────────────────────────────────
  {
    id: 34,
    name: "Формула 34: Lo + прилагательное (абстрактное значение)",
    shortName: "Lo + adj",
    emoji: "💡",
    description: "'Lo' + прилагательное = абстрактное существительное: 'главное', 'хорошее', 'важное'",
    rule: "Lo + adjetivo/participio = 'то, что является [прилагательным]'",
    example: "Lo importante es intentarlo",
    exampleRu: "Главное — это попробовать",
    examples: [
      { es: "Lo bueno de la vida es disfrutarla", ru: "Хорошее в жизни — наслаждаться ею" },
      { es: "Lo malo es que no hay tiempo", ru: "Плохое то, что времени нет" },
      { es: "Lo mejor de Madrid es el clima", ru: "Лучшее в Мадриде — это климат" },
      { es: "Lo difícil no es empezar", ru: "Трудное — это не начать" },
      { es: "Lo más importante es la salud", ru: "Самое главное — это здоровье" },
      { es: "Lo interesante es el final", ru: "Интересное — это финал" }
    ],
    quiz: [
      {
        question: "Главное — это быть здоровым",
        options: [
          "El importante es ser sano",
          "Lo importante es ser sano",
          "La importante es ser sano",
          "Importante es ser sano"
        ],
        correct: 1,
        hint: "Нейтральный артикль 'lo' + прилагательное = абстрактное понятие. Не 'el/la'"
      },
      {
        question: "Лучшее в путешествии — это встречи",
        options: [
          "El mejor del viaje son los encuentros",
          "Lo mejor del viaje son los encuentros",
          "La mejor del viaje son los encuentros",
          "Lo bueno del viaje son los encuentros"
        ],
        correct: 1,
        hint: "Lo mejor = 'лучшее'. Lo + превосходная степень прилагательного"
      },
      {
        question: "Плохое то, что уже поздно",
        options: [
          "El malo es que ya es tarde",
          "Lo malo que ya es tarde",
          "Lo malo es que ya es tarde",
          "El malo es ya tarde"
        ],
        correct: 2,
        hint: "Lo malo es que... — 'плохое то, что'. Структура: Lo + adj + es + que + предложение"
      }
    ]
  },

  // ─── Формула 35 ────────────────────────────────────────────────────────────
  {
    id: 35,
    name: "Формула 35: Para que + subjuntivo (цель для другого)",
    shortName: "Para que + subj",
    emoji: "🎯",
    description: "Цель для другого человека — 'чтобы ты...', 'для того, чтобы он...'",
    rule: "Para que + subjuntivo (разные подлежащие) | Para + infinitivo (одно подлежащее)",
    example: "Te lo digo para que lo sepas",
    exampleRu: "Говорю тебе, чтобы ты знал",
    examples: [
      { es: "Habla más despacio para que te entiendan", ru: "Говори медленнее, чтобы тебя поняли" },
      { es: "Te llamo para que no olvides", ru: "Звоню тебе, чтобы ты не забыл" },
      { es: "Explícalo para que todos comprendan", ru: "Объясни, чтобы все поняли" },
      { es: "Abre la ventana para que entre aire", ru: "Открой окно, чтобы вошёл воздух" },
      { es: "Lo escribo para no olvidarlo", ru: "Записываю, чтобы не забыть (одно подлежащее → infinitivo)" },
      { es: "Viene para que lo ayudemos", ru: "Он приходит, чтобы мы ему помогли" }
    ],
    quiz: [
      {
        question: "Говорю тебе, чтобы ты знал",
        options: [
          "Te lo digo para que sabes",
          "Te lo digo para saber",
          "Te lo digo para que sepas",
          "Te lo digo para que lo saber"
        ],
        correct: 2,
        hint: "Para que + SUBJUNTIVO: sepas (subj. presente от saber). Не 'sabes' (indicativo)!"
      },
      {
        question: "Объясни, чтобы все поняли",
        options: [
          "Explícalo para que todos entienden",
          "Explícalo para todos entender",
          "Explícalo para que todos entiendan",
          "Explícalo para entender todos"
        ],
        correct: 2,
        hint: "Para que + subj: entiendan (3л. мн.ч. субхунтиво от entender). Разные подлежащие → para que"
      },
      {
        question: "Записываю, чтобы не забыть (одно подлежащее — я)",
        options: [
          "Lo escribo para que no olvide",
          "Lo escribo para no olvidar",
          "Lo escribo para que no olvidas",
          "Lo escribo para que no olvidar"
        ],
        correct: 1,
        hint: "Одно подлежащее → para + infinitivo (не 'para que'). Para no olvidar"
      }
    ]
  },

  // ─── Формула 36 ────────────────────────────────────────────────────────────
  {
    id: 36,
    name: "Формула 36: Si + imperfecto subj → condicional (нереальное условие)",
    shortName: "Si irreal (если бы...)",
    emoji: "💭",
    description: "Нереальное или маловероятное условие — 'если бы у меня было..., я бы...'",
    rule: "Si + imperfecto de subjuntivo (-ra/-se), + condicional simple (-ría)",
    example: "Si tuviera dinero, viajaría por el mundo",
    exampleRu: "Если бы у меня были деньги, я бы путешествовал по миру",
    examples: [
      { es: "Si fuera rico, compraría una casa", ru: "Если бы я был богатым, купил бы дом" },
      { es: "Si hablara chino, encontraría trabajo fácil", ru: "Если бы я говорил по-китайски, легко нашёл бы работу" },
      { es: "Si tuviera tiempo, aprendería a tocar la guitarra", ru: "Если бы у меня было время, научился бы играть" },
      { es: "Si viviera en España, hablaría español mejor", ru: "Если бы я жил в Испании, говорил бы лучше" },
      { es: "Si pudiera, te ayudaría", ru: "Если бы я мог, помог бы тебе" },
      { es: "Si no lloviera tanto, saldríamos más", ru: "Если бы дождя было меньше, мы выходили бы чаще" }
    ],
    quiz: [
      {
        question: "Если бы у меня были деньги, я купил бы дом",
        options: [
          "Si tengo dinero, compraría una casa",
          "Si tendría dinero, compraría una casa",
          "Si tuviera dinero, compraría una casa",
          "Si tuviera dinero, compraré una casa"
        ],
        correct: 2,
        hint: "Si + imperfecto subj (tuviera) + condicional (compraría). Никогда 'si + condicional'!"
      },
      {
        question: "Если бы я жил в Мадриде, ходил бы в музеи каждую неделю",
        options: [
          "Si vivo en Madrid, iría a museos cada semana",
          "Si viviera en Madrid, iría a museos cada semana",
          "Si vivería en Madrid, iría a museos cada semana",
          "Si viviera en Madrid, iré a museos cada semana"
        ],
        correct: 1,
        hint: "Si viviera (imperfecto subj) → iría (condicional). Нереальное условие в настоящем"
      },
      {
        question: "Если бы я мог, помог бы тебе",
        options: [
          "Si puedo, te ayudaría",
          "Si podría, te ayudaría",
          "Si podré, te ayudaría",
          "Si pudiera, te ayudaría"
        ],
        correct: 3,
        hint: "pudiera — imperfecto de subjuntivo от 'poder'. Si pudiera → te ayudaría"
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.FORMULAS_DATA = FORMULAS_DATA;
}
