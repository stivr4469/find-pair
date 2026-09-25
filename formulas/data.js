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
      { es: "El libro nuevo e interesante", ru: "Новая интересная книга" },
      { es: "El gato negro y pequeño", ru: "Чёрный маленький кот" },
      { es: "La chica alta y delgada", ru: "Высокая стройная девушка" },
      { es: "Un coche viejo pero rápido", ru: "Старая, но быстрая машина" },
      { es: "Una ciudad grande y moderna", ru: "Большой современный город" },
      { es: "El día frío e invernizo", ru: "Холодный зимний день" },
      { es: "Una película larga y aburrida", ru: "Длинный и скучный фильм" }
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
      },
      {
        question: "Высокая девушка",
        options: ["La alta chica", "La chica alta", "Alta la chica", "La chica es alta"],
        correct: 1,
        hint: "Прилагательное стоит ПОСЛЕ существительного: la chica alta (ж.р.)"
      },
      {
        question: "Красные машины",
        options: ["Los coches rojo", "Rojos los coches", "Los rojos coches", "Los coches rojos"],
        correct: 3,
        hint: "Во множественном числе прилагательное тоже принимает форму мн.ч.: coches rojos"
      },
      {
        question: "Старый и мудрый мужчина",
        options: ["El hombre viejo sabio", "El hombre viejo y sabio", "El viejo y sabio el hombre", "Viejo y sabio hombre"],
        correct: 1,
        hint: "Два прилагательных соединяются через y и стоят после существительного"
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
      { es: "Él trabaja diligentemente", ru: "Он работает усердно" },
      { es: "Hablas claramente", ru: "Ты говоришь чётко" },
      { es: "Conduce cuidadosamente", ru: "Он водит осторожно" },
      { es: "Responden correctamente", ru: "Они отвечают правильно" },
      { es: "Escucha atentamente", ru: "Она слушает внимательно" },
      { es: "Llegaron puntualmente", ru: "Они пришли вовремя" },
      { es: "Vive felizmente en Madrid", ru: "Он счастливо живёт в Мадриде" }
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
      },
      {
        question: "Он водит осторожно",
        options: ["Él conduce cuidadosa", "Él cuidadoso conduce", "Él conduce cuidadosamente", "Cuidadosamente él conduce"],
        correct: 2,
        hint: "Наречие образуется от женской формы прилагательного + -mente: cuidadosa → cuidadosamente"
      },
      {
        question: "Она отвечает правильно",
        options: ["Ella correctamente responde", "Ella responde correcto", "Ella responde correcta", "Ella responde correctamente"],
        correct: 3,
        hint: "Наречие ставится ПОСЛЕ глагола: responde + correctamente"
      },
      {
        question: "Ты говоришь чётко",
        options: ["Hablas claro mucho", "Hablas claramente", "Claramente tú habla", "Hablas en clara"],
        correct: 1,
        hint: "claro → форма ж.р. clara → claramente. Наречие после глагола"
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
      { es: "¿Quién es él?", ru: "Кто он?" },
      { es: "¿Dónde vives?", ru: "Где ты живёшь?" },
      { es: "¿Cuántos años tienes?", ru: "Сколько тебе лет?" },
      { es: "¿Cómo te llamas?", ru: "Как тебя зовут?" },
      { es: "¿Por qué estudias español?", ru: "Почему ты учишь испанский?" },
      { es: "¿Cuándo llega el tren?", ru: "Когда приходит поезд?" },
      { es: "¿Cuánto cuesta este libro?", ru: "Сколько стоит эта книга?" }
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
      },
      {
        question: "Почему ты учишь испанский?",
        options: ["¿Tú por qué estudias español?", "¿Por qué estudias español?", "Por qué estudias español?", "¿Por qué español estudias?"],
        correct: 1,
        hint: "¿Por qué + глагол + подлежащее? Нужны оба знака вопроса: ¿...?"
      },
      {
        question: "Когда приходит поезд?",
        options: ["¿El tren cuándo llega?", "Cuándo llega el tren?", "¿Cuándo el tren llega?", "¿Cuándo llega el tren?"],
        correct: 3,
        hint: "¿Cuándo + глагол + подлежащее? — вопросительное слово стоит первым"
      },
      {
        question: "Как тебя зовут?",
        options: ["¿Tú cómo te llamas?", "¿Cómo te llamas tú?", "Cómo te llamas?", "¿Te llamas cómo?"],
        correct: 1,
        hint: "¿Cómo + возвратный глагол + подлежащее? Оба знака вопроса обязательны"
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
      { es: "Ella me envía una carta a mí", ru: "Она отправляет письмо мне" },
      { es: "Te presto dinero a ti", ru: "Я одалживаю деньги тебе" },
      { es: "Les digo la verdad a mis hijos", ru: "Я говорю правду своим детям" },
      { es: "Nos trae la comida a nosotros", ru: "Он приносит нам еду" },
      { es: "Le explico la lección al estudiante", ru: "Я объясняю урок студенту" },
      { es: "Os mando un mensaje a vosotros", ru: "Я отправляю вам сообщение" },
      { es: "Le compra flores a su novia", ru: "Он покупает цветы своей девушке" }
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
      },
      {
        question: "Я показываю фотографии своим друзьям",
        options: ["Yo muestro fotos a mis amigos les", "Yo les muestro a mis amigos fotos", "Yo muestro les fotos mis amigos", "Yo les muestro fotos a mis amigos"],
        correct: 3,
        hint: "Множественное число: les (не le). les перед глаголом + прямое дополнение + «a mis amigos»"
      },
      {
        question: "Она говорит правду детям",
        options: ["Ella dice la verdad a los niños les", "Ella les dice a niños la verdad", "Ella les dice la verdad a los niños", "Ella dice les la verdad a los niños"],
        correct: 2,
        hint: "les стоит ПЕРЕД глаголом, прямое дополнение после глагола, «a los niños» — уточнение"
      },
      {
        question: "Я одалживаю деньги тебе",
        options: ["Yo presto dinero tú", "Yo presto te dinero a ti", "Yo te presto dinero a ti", "Yo a ti presto te dinero"],
        correct: 2,
        hint: "te (местоимение) стоит перед глаголом, «a ti» — уточнение в конце"
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
      { es: "Conozco a Pedro", ru: "Я знаю Педро" },
      { es: "Llamo a mi madre", ru: "Я звоню маме" },
      { es: "Busco a mi amigo", ru: "Я ищу своего друга" },
      { es: "Esperamos a nuestro profesor", ru: "Мы ждём нашего учителя" },
      { es: "Ayuda a los niños", ru: "Она помогает детям" },
      { es: "¿Ves a María en clase?", ru: "Ты видишь Марию на уроке?" },
      { es: "Extraño a mis padres", ru: "Я скучаю по родителям" }
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
      },
      {
        question: "Я ищу своего друга",
        options: ["Busco mi amigo", "Busco para mi amigo", "Busco de mi amigo", "Busco a mi amigo"],
        correct: 3,
        hint: "buscar + a + человек: личное «a» обязательно перед одушевлённым дополнением"
      },
      {
        question: "Я читаю книгу (неодушевлённое)",
        options: ["Leo a un libro", "Leo para un libro", "Leo un libro", "Leo de un libro"],
        correct: 2,
        hint: "С неодушевлёнными предметами личное «a» НЕ используется: leo un libro"
      },
      {
        question: "Они ждут своего учителя",
        options: ["Esperan su profesor", "Esperan para su profesor", "Esperan de su profesor", "Esperan a su profesor"],
        correct: 3,
        hint: "esperar + a + человек. Личное «a» обязательно перед конкретным человеком"
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
      { es: "Les escribo una carta a mis padres", ru: "Я пишу письмо своим родителям" },
      { es: "Le cuento la historia a él", ru: "Я рассказываю историю ему" },
      { es: "Les mando fotos a mis amigos", ru: "Я отправляю фото своим друзьям" },
      { es: "Le compro flores a mi madre", ru: "Я покупаю цветы маме" },
      { es: "Les explico el problema a ellos", ru: "Я объясняю проблему им" },
      { es: "Le pido ayuda a mi jefe", ru: "Я прошу помощи у начальника" },
      { es: "Les traigo café a los clientes", ru: "Я приношу кофе клиентам" }
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
      },
      {
        question: "Я рассказываю историю друзьям (с уточнением)",
        options: ["Cuento la historia a mis amigos", "Les cuento a mis amigos la historia les", "Les cuento la historia mis amigos", "Les cuento la historia a mis amigos"],
        correct: 3,
        hint: "Множественное число: les перед глаголом + прямое дополнение + «a mis amigos» в конце"
      },
      {
        question: "Я показываю дорогу ему (с уточнением)",
        options: ["Muestro el camino a él", "Le muestro el camino él", "Le al él muestro el camino", "Le muestro el camino a él"],
        correct: 3,
        hint: "le перед глаголом, прямое дополнение после, «a él» — уточнение в конце"
      },
      {
        question: "Я приношу кофе клиентам (с уточнением)",
        options: ["Traigo café a los clientes", "Le traigo café a los clientes", "Les a los clientes traigo café", "Les traigo café a los clientes"],
        correct: 3,
        hint: "Множественное число OI: les (не le). Порядок: les + глагол + OD + «a los clientes»"
      }
    ]
  },
  {
    id: 7,
    name: "Формула 7: Возвратные глаголы",
    shortName: "Возвратные",
    emoji: "",
    description: "Действия, направленные на самого субъекта",
    rule: "pronombre reflexivo (me/te/se/nos/os/se) + verbo reflexivo",
    example: "Jessica se maquilla",
    exampleRu: "Джессика красится",
    examples: [
      { es: "Me lavo las manos", ru: "Я мою руки" },
      { es: "Se visten rápidamente", ru: "Они быстро одеваются" },
      { es: "Te duchas por la mañana", ru: "Ты принимаешь душ утром" },
      { es: "Ella se peina cada día", ru: "Она расчёсывается каждый день" },
      { es: "Nos despertamos tarde", ru: "Мы просыпаемся поздно" },
      { es: "Se acuestan a las diez", ru: "Они ложатся спать в десять" },
      { es: "Me afeito por las mañanas", ru: "Я бреюсь по утрам" },
      { es: "Se sienta junto a la ventana", ru: "Он садится у окна" }
    ],
    quiz: [
      {
        before: "Cada mañana yo", after: "antes de desayunar.",
        options: ["lavo la cara", "me lavo la cara a mí", "lavo me la cara", "me lavo la cara"],
        correct: 3,
        hint: "Возвратное местоимение me стоит ПЕРЕД глаголом"
      },
      {
        before: "Por las mañanas, ella", after: "para ir al trabajo.",
        options: ["viste", "se ella viste", "se vestirse", "se viste"],
        correct: 3,
        hint: "se перед спрягаемым глаголом: Ella se viste"
      },
      {
        before: "Nosotros siempre", after: "en la misma mesa.",
        options: ["sentamos", "sentamos nos", "estamos sentado", "nos sentamos"],
        correct: 3,
        hint: "Возвратное nos стоит перед глаголом: nos sentamos"
      },
      {
        before: "Yo siempre", after: "temprano para ir al trabajo.",
        options: ["levanto", "me levanta", "me levanto", "levanto me"],
        correct: 2,
        hint: "me стоит ПЕРЕД спрягаемым глаголом: me levanto (levantarse, 1 л. ед.ч.)"
      },
      {
        before: "Él", after: "cada mañana antes de desayunar.",
        options: ["se afeita", "afeita", "se afeitar", "afeita se"],
        correct: 0,
        hint: "se перед спрягаемым глаголом: Él se afeita (afeitarse, 3 л. ед.ч.)"
      },
      {
        before: "Hola, yo", after: "Carlos. ¿Y tú, cómo te llamas?",
        options: ["me llamo", "me llama", "soy llamado", "llamo"],
        correct: 0,
        hint: "llamarse (называться): me llamo = «я называюсь». Возвратное me перед глаголом"
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
      { es: "Prefiero leer", ru: "Я предпочитаю читать" },
      { es: "Sé cocinar muy bien", ru: "Я умею очень хорошо готовить" },
      { es: "Odio levantarme temprano", ru: "Я ненавижу вставать рано" },
      { es: "Quieren viajar a España", ru: "Они хотят поехать в Испанию" },
      { es: "Pienso estudiar más", ru: "Я планирую учиться больше" },
      { es: "Espero terminar pronto", ru: "Я надеюсь закончить скоро" },
      { es: "Consigue hablar sin acento", ru: "Ему удаётся говорить без акцента" }
    ],
    quiz: [
      {
        before: "Yo", after: "español este año.",
        options: ["quiero que estudiar", "quiero estudiando", "quiero estudio", "quiero estudiar"],
        correct: 3,
        hint: "querer + инфинитив напрямую, без «que»"
      },
      {
        before: "Ella", after: "muy bien en el escenario.",
        options: ["puede canta", "puede cantando", "puede que canta", "puede cantar"],
        correct: 3,
        hint: "poder + инфинитив: puede + cantar"
      },
      {
        before: "Ellos", after: "mucho para pagar el alquiler.",
        options: ["necesitan que trabajar", "necesitan trabajando", "necesitan trabajan", "necesitan trabajar"],
        correct: 3,
        hint: "necesitar + инфинитив: necesitan + trabajar"
      },
      {
        before: "Yo", after: "muy bien — tomé clases de cocina.",
        options: ["sé que cocinar", "sé cocinando", "sé cocino", "sé cocinar"],
        correct: 3,
        hint: "saber + инфинитив напрямую: sé + cocinar (без «que»)"
      },
      {
        before: "Cuando tiene tiempo libre, ella",
        after: "en vez de ver la televisión.",
        options: ["prefiere leer", "prefiere que lea", "prefiere leyendo", "prefiere lee"],
        correct: 0,
        hint: "preferir + инфинитив: prefiere + leer. После preferir инфинитив без «que»"
      },
      {
        before: "Me duele la garganta, así que",
        after: "hoy.",
        options: ["no puedo cantar", "no puedo cantando", "no soy cantar", "no puedo que cante"],
        correct: 0,
        hint: "Отрицание ставится перед спрягаемым глаголом: no puedo + cantar (инфинитив)"
      }
    ]
  },
  {
    id: 9,
    name: "Формула 9: Hay que",
    shortName: "Hay que + инф.",
    emoji: "",
    description: "Безличное выражение необходимости",
    rule: "Hay que + infinitivo",
    example: "Hay que estudiar",
    exampleRu: "Нужно учиться",
    examples: [
      { es: "Hay que comer bien", ru: "Нужно хорошо питаться" },
      { es: "Hay que dormir ocho horas", ru: "Нужно спать восемь часов" },
      { es: "Hay que ser puntual", ru: "Нужно быть пунктуальным" },
      { es: "Hay que escuchar con atención", ru: "Нужно слушать внимательно" },
      { es: "Hay que respetar las reglas", ru: "Нужно соблюдать правила" },
      { es: "Hay que practicar cada día", ru: "Нужно практиковаться каждый день" },
      { es: "Hay que tener paciencia", ru: "Нужно иметь терпение" },
      { es: "Hay que beber mucha agua", ru: "Нужно пить много воды" }
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
      },
      {
        question: "Нужно быть вежливым (безлично)",
        options: ["Tienes que ser amable", "Hay que eres amable", "Hay ser amable", "Hay que ser amable"],
        correct: 3,
        hint: "Hay que + инфинитив: hay que ser. Форма всегда неизменна, не спрягается"
      },
      {
        question: "Не нужно кричать (безлично)",
        options: ["No tienes que gritar", "Hay que no gritar", "No hay gritar", "No hay que gritar"],
        correct: 3,
        hint: "Отрицание: no hay que + инфинитив. no стоит перед hay"
      },
      {
        question: "Нужно купить хлеб (безлично, не личная обязанность)",
        options: ["Tienes que comprar pan", "Hay que compra pan", "Hay comprar pan", "Hay que comprar pan"],
        correct: 3,
        hint: "Hay que — безличная форма (никто конкретный). Tienes que — личная. После hay que — инфинитив"
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
      { es: "Ella tiene que trabajar", ru: "Она должна работать" },
      { es: "Tienes que estudiar más", ru: "Тебе нужно учиться больше" },
      { es: "Tenemos que comprar comida", ru: "Нам нужно купить еду" },
      { es: "Él tiene que llamar al médico", ru: "Ему нужно позвонить врачу" },
      { es: "Tienen que llegar a tiempo", ru: "Им нужно прийти вовремя" },
      { es: "Tenéis que terminar el proyecto", ru: "Вам нужно завершить проект" },
      { es: "Tengo que hablar con mi jefe", ru: "Мне нужно поговорить с начальником" }
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
      },
      {
        question: "Вам (вы, мн.ч.) нужно позвонить врачу",
        options: ["Tenéis que llamas al médico", "Habéis que llamar al médico", "Tenéis llamar al médico", "Tenéis que llamar al médico"],
        correct: 3,
        hint: "tenéis (2 л. мн.ч. tener) + que + инфинитив llamar. После «que» — не спрягать глагол"
      },
      {
        question: "Им нужно поесть перед работой",
        options: ["Tienen comer antes de trabajar", "Tienen que come antes de trabajar", "Tienen que comer antes de trabajar", "Han que comer antes de trabajar"],
        correct: 2,
        hint: "tienen (3 л. мн.ч.) + que + инфинитив comer. Не «come» (спряжённая форма)"
      },
      {
        question: "Мне нужно вернуться домой рано?",
        options: ["¿Tengo que volver a casa pronto?", "¿Tengo volver a casa pronto?", "¿Hay que vuelvo a casa pronto?", "¿Tengo que vuelvo a casa pronto?"],
        correct: 0,
        hint: "Вопрос: ¿Tengo que + инфинитив? Личная форма tener + que + volver (инф.)"
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
      { es: "Ella ha escrito un libro", ru: "Она написала книгу" },
      { es: "He desayunado ya", ru: "Я уже позавтракал" },
      { es: "¿Has visitado Madrid?", ru: "Ты бывал в Мадриде?" },
      { es: "Han llegado tarde", ru: "Они опоздали (пришли поздно)" },
      { es: "Habéis trabajado mucho hoy", ru: "Вы много работали сегодня" },
      { es: "¿Has comido algo?", ru: "Ты что-нибудь ел?" },
      { es: "Se ha roto la silla", ru: "Стул сломался" }
    ],
    quiz: [
      {
        before: "Hoy yo", after: "en un restaurante italiano.",
        options: ["he comida", "he comidos", "comido he", "he comido"],
        correct: 3,
        hint: "Причастие в Pretérito Perfecto НЕ согласуется: всегда «comido», не «comida»"
      },
      {
        before: "Ella ya", after: "sobre su experiencia en Asia.",
        options: ["ha escrita un libro", "escribió un libro haber", "ha escribir un libro", "ha escrito un libro"],
        correct: 3,
        hint: "ha (3 л. ед.ч. haber) + причастие escrito (неправильное). Не «escrita»"
      },
      {
        before: "Esta semana nosotros", after: "en el cine — fue increíble.",
        options: ["hemos vistos la película", "han visto la película", "hemos ver la película", "hemos visto la película"],
        correct: 3,
        hint: "hemos (1 л. мн.ч.) + visto (неправильное причастие от ver). Не «vistos»"
      },
      {
        before: "¿Ya", after: "para el examen de mañana?",
        options: ["has hacido los deberes", "has hacer los deberes", "haces los deberes ya", "has hecho los deberes"],
        correct: 3,
        hint: "has (2 л. ед.ч. haber) + hecho (неправильное причастие от hacer). Не «hacido»"
      },
      {
        before: "Ella todavía no", after: "la verdad sobre lo que pasó.",
        options: ["ha dicho", "ha decido", "haber dicho", "ha decir"],
        correct: 0,
        hint: "ha + dicho (неправильное причастие от decir). Не «decido». Отрицание: no + ha + participio"
      },
      {
        before: "Vosotros", after: "las llaves en la mesa, ¿verdad?",
        options: ["habéis puesto", "habéis ponido", "habéis poner", "habéis puestos"],
        correct: 0,
        hint: "habéis + puesto (неправильное причастие от poner). Причастие не согласуется: puesto, не puestos"
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
      { es: "Él está leyendo", ru: "Он читает (сейчас)" },
      { es: "Estoy escuchando música", ru: "Я сейчас слушаю музыку" },
      { es: "Está lloviendo fuera", ru: "Сейчас идёт дождь на улице" },
      { es: "Estás durmiendo la siesta", ru: "Ты сейчас спишь днём" },
      { es: "Están hablando por teléfono", ru: "Они сейчас говорят по телефону" },
      { es: "Estoy trabajando desde casa", ru: "Я сейчас работаю из дома" },
      { es: "¿Qué estás haciendo?", ru: "Что ты сейчас делаешь?" }
    ],
    quiz: [
      {
        before: "Ahora mismo yo", after: "para el examen de mañana.",
        options: ["estoy estudiar", "soy estudiando", "estoy estudiado", "estoy estudiando"],
        correct: 3,
        hint: "estar + герундий: estoy + estudiando (не soy, не причастие)"
      },
      {
        before: "En este momento ella", after: "en el sofá — no la molestes.",
        options: ["está leer", "es leyendo", "está leído", "está leyendo"],
        correct: 3,
        hint: "está + leyendo (leer → leyendo, не «leído»). Глагол estar, не ser"
      },
      {
        before: "Ahora nosotros", after: "en la cocina — espera un momento.",
        options: ["estamos comer", "somos comiendo", "hemos comiendo", "estamos comiendo"],
        correct: 3,
        hint: "estamos + comiendo. Не haber, не ser — только estar для Progressive"
      },
      {
        before: "¿Vosotros", after: "por teléfono en este momento?",
        options: ["estáis hablar", "sois hablando", "estáis hablando", "estáis hablados"],
        correct: 2,
        hint: "estáis (2 л. мн.ч. estar) + hablando (герундий от hablar). Не ser"
      },
      {
        before: "Es tarde — todos", after: "porque están agotados.",
        options: ["están durmiendo", "están dormiendo", "son durmiendo", "están dormando"],
        correct: 0,
        hint: "dormir → durmiendo (неправильный герундий, чередование o→u). Не «dormiendo»"
      },
      {
        before: "¿A dónde", after: "ahora mismo?",
        options: ["estás yendo", "eres yendo", "estás ir", "estás ido"],
        correct: 0,
        hint: "ir → yendo (неправильный герундий). estás + yendo. Не «ir» (инфинитив) и не «ido» (причастие)"
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
      { es: "Llevan tres días viajando", ru: "Они путешествуют уже три дня" },
      { es: "Llevas media hora esperando", ru: "Ты ждёшь уже полчаса" },
      { es: "Lleva un mes aprendiendo italiano", ru: "Она учит итальянский уже месяц" },
      { es: "Llevamos años conociéndonos", ru: "Мы знаем друг друга уже годами" },
      { es: "Llevan dos horas discutiendo", ru: "Они спорят уже два часа" },
      { es: "Llevo toda la mañana trabajando", ru: "Я работаю всё утро" },
      { es: "¿Cuánto tiempo llevas estudiando español?", ru: "Сколько времени ты учишь испанский?" }
    ],
    quiz: [
      {
        before: "Yo", after: "— ¡ya no puedo más!",
        options: ["estoy dos horas estudiando", "llevo dos horas estudiar", "llevo estudiando dos horas ya", "llevo dos horas estudiando"],
        correct: 3,
        hint: "llevar + промежуток времени + герундий: llevo + dos horas + estudiando"
      },
      {
        before: "Ella", after: "— ya habla el idioma perfectamente.",
        options: ["está un año viviendo aquí", "lleva viviendo aquí un año", "lleva un año vivir aquí", "lleva un año viviendo aquí"],
        correct: 3,
        hint: "lleva (3 л. ед.ч.) + un año + viviendo. Порядок: llevar + время + герундий"
      },
      {
        before: "Ellos", after: "por toda Europa — ¡qué aventura!",
        options: ["están tres días viajando", "llevan tres días viajar", "llevan viajando tres días", "llevan tres días viajando"],
        correct: 3,
        hint: "llevan (3 л. мн.ч.) + tres días + viajando. Время — между глаголом и герундием"
      },
      {
        before: "¿Cuánto tiempo", after: "aquí? ¿Media hora ya?",
        options: ["llevas esperando", "llevas esperar", "estás llevas esperando", "llevas esperado"],
        correct: 0,
        hint: "¿Cuánto tiempo llevas + герундий? — вопрос о длительности. Не «esperar» (инф.) и не «esperado» (причастие)"
      },
      {
        before: "Nosotros", after: "el partido ya — ¡estamos agotados!",
        options: ["llevamos una hora viendo", "estamos una hora viendo", "llevamos una hora ver", "llevamos viendo una hora"],
        correct: 0,
        hint: "llevamos (1 л. мн.ч.) + una hora + viendo. Порядок: llevar + время + герундий"
      },
      {
        before: "Ellos", after: "sin parar — ¡qué hambre tenían!",
        options: ["llevan tres días viajando", "están tres días viajando", "llevan tres días viajar", "llevan viajando tres días"],
        correct: 0,
        hint: "llevan (3 л. мн.ч.) + tres días + viajando. Порядок: llevar + время + герундий"
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
      { es: "Lo hago por ti", ru: "Я делаю это ради тебя (причина)" },
      { es: "Estudio para aprender", ru: "Я учусь, чтобы знать (цель)" },
      { es: "Gracias por tu ayuda", ru: "Спасибо за твою помощь (за что)" },
      { es: "Este regalo es para mi madre", ru: "Этот подарок для мамы (получатель)" },
      { es: "Pagué veinte euros por la camisa", ru: "Я заплатил 20 евро за рубашку (обмен)" },
      { es: "Lo hicieron por miedo", ru: "Они сделали это из страха (причина)" },
      { es: "Un café para llevar, por favor", ru: "Кофе с собой, пожалуйста (назначение)" }
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
      },
      {
        question: "Я смотрел телевизор два часа (длительность)",
        options: ["Vi la televisión para dos horas", "Vi la televisión a dos horas", "Vi la televisión en dos horas", "Vi la televisión por dos horas"],
        correct: 3,
        hint: "por + промежуток времени = длительность действия. para + срок = дедлайн (к определённому моменту)"
      },
      {
        question: "Это задание нужно сдать к завтрашнему утру (срок)",
        options: ["Esta tarea es por mañana por la mañana", "Esta tarea es de mañana por la mañana", "Esta tarea es para mañana por la mañana", "Esta tarea es hasta mañana por la mañana"],
        correct: 2,
        hint: "para + срок/дедлайн: para mañana = к завтрашнему дню. por = причина или длительность"
      },
      {
        question: "Я купил этот словарь за десять евро (обмен/цена)",
        options: ["Compré este diccionario para diez euros", "Compré este diccionario de diez euros", "Compré este diccionario a diez euros", "Compré este diccionario por diez euros"],
        correct: 3,
        hint: "por + цена/обмен: compré por diez euros. para = назначение/получатель, не цена"
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
      { es: "Ella es tan alta como su hermano", ru: "Она такая же высокая, как её брат" },
      { es: "Mi casa es más grande que la tuya", ru: "Мой дом больше твоего" },
      { es: "Habla tan rápido como un nativo", ru: "Он говорит так же быстро, как носитель" },
      { es: "Este examen es menos difícil que el otro", ru: "Этот экзамен менее сложный, чем тот" },
      { es: "Gana tanto dinero como su jefe", ru: "Он зарабатывает столько же, сколько шеф" },
      { es: "El verano es más caluroso que el invierno", ru: "Лето жарче, чем зима" },
      { es: "Hablas español tan bien como yo", ru: "Ты говоришь по-испански так же хорошо, как я" }
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
      },
      {
        question: "Этот фильм менее скучный, чем тот",
        options: ["Esta película es menos aburrida como aquella", "Esta película es tan aburrida que aquella", "Esta película es más aburrida que aquella", "Esta película es menos aburrida que aquella"],
        correct: 3,
        hint: "menos + прилагательное + que. Сравнение неравенства (меньше): menos... que, не como"
      },
      {
        question: "У него столько же денег, сколько у неё",
        options: ["Él tiene tan dinero como ella", "Él tiene tanto dinero que ella", "Él tiene tanto dinero como ella", "Él tiene más dinero como ella"],
        correct: 2,
        hint: "tanto/a/os/as + существительное + como. dinero (м.р.) → tanto dinero como"
      },
      {
        question: "Этот ресторан лучший в городе (превосходная степень)",
        options: ["Este restaurante es el más bueno de la ciudad", "Este restaurante es el bien de la ciudad", "Este restaurante es el mayor de la ciudad", "Este restaurante es el mejor de la ciudad"],
        correct: 3,
        hint: "bueno имеет неправильную сравнительную форму: bueno → mejor, превосходная: el mejor. Не «más bueno»"
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
      { es: "Lo veo", ru: "Я вижу его/это (м.р.ед.ч.)" },
      { es: "Las compro", ru: "Я покупаю их (ж.р.мн.ч.)" },
      { es: "La llamo esta tarde", ru: "Я позвоню ей сегодня вечером" },
      { es: "Los necesito urgente", ru: "Мне они нужны срочно (м.р.мн.ч.)" },
      { es: "¿La ves? — Sí, la veo", ru: "Ты её видишь? — Да, вижу (ж.р.ед.ч.)" },
      { es: "¿Lo tienes? — No lo tengo", ru: "У тебя это есть? — Нет" },
      { es: "El libro — lo leo cada noche", ru: "Книгу — я читаю её каждый вечер" },
      { es: "Las llaves — las busco por todas partes", ru: "Ключи — я ищу их везде" }
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
      },
      {
        question: "Я выпил вино → Я его выпил (vino = м.р.)",
        options: ["La bebí", "Le bebí", "Los bebí", "Lo bebí"],
        correct: 3,
        hint: "vino = м.р. ед.ч. → lo. Не la (ж.р.), не los (мн.ч.)"
      },
      {
        question: "Мама купила яблоки → Она их купила (manzanas = ж.р. мн.ч.)",
        options: ["Ella lo compró", "Ella los compró", "Ella la compró", "Ella las compró"],
        correct: 3,
        hint: "manzanas = ж.р. мн.ч. → las. Не los (м.р. мн.ч.), не la (ед.ч.)"
      },
      {
        question: "Я хочу увидеть детей → Я хочу их увидеть (niños = м.р. мн.ч.)",
        options: ["Quiero verlos", "Quiero verlas", "Quiero lo ver", "Los quiero ver"],
        correct: 0,
        hint: "niños = м.р. мн.ч. → los. При инфинитиве местоимение присоединяется к нему: quiero ver + los = quiero verlos"
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
      { es: "Ella es guapísima", ru: "Она очень красивая" },
      { es: "La comida está riquísima", ru: "Еда очень вкусная" },
      { es: "Es muy cansado este trabajo", ru: "Эта работа очень утомительная" },
      { es: "El hotel era comodísimo", ru: "Отель был очень удобным" },
      { es: "Hablas muy bien español", ru: "Ты очень хорошо говоришь по-испански" },
      { es: "La película fue larguísima", ru: "Фильм был очень длинным" },
      { es: "Estoy muy cansado hoy", ru: "Я очень устал сегодня" }
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
      },
      {
        question: "Эта еда очень вкусная (неправильная форма -ísimo от rico)",
        options: ["La comida está muy ricísima", "La comida está ricoísima", "La comida está ricaísima", "La comida está riquísima"],
        correct: 3,
        hint: "rico → riquísimo (орфографическое изменение: c → qu перед -ísimo). Не ricísimo, не muy ricísimo"
      },
      {
        question: "Фильм был очень хорошим (неправильная форма)",
        options: ["La película fue buenísima", "La película fue muy buenísima", "La película fue buenísima", "La película fue lo mejor"],
        correct: 0,
        hint: "bueno → buenísimo (суффикс -ísimo к основе). Не muy + -ísimo вместе"
      },
      {
        question: "Она очень горячая (о еде/погоде) — через -ísimo (caliente → ?)",
        options: ["Es calientísima", "Es calienteísima", "Es mucho caliente", "Es calentísima"],
        correct: 3,
        hint: "прилагательные, оканчивающиеся на -e, теряют -e перед -ísimo: caliente → calent- → calentísima"
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
      { es: "Se la di", ru: "Я её ему/ей дал" },
      { es: "Se lo dije ayer", ru: "Я сказал ему это вчера" },
      { es: "Se los mandamos", ru: "Мы отправили им их (мн.ч.)" },
      { es: "Se la expliqué despacio", ru: "Я объяснил это ей медленно" },
      { es: "¿Se lo diste ya?", ru: "Ты уже отдал ему это?" },
      { es: "Se las enviamos por correo", ru: "Мы отправили им их по почте" },
      { es: "¿Se lo has contado a ella?", ru: "Ты рассказал ей об этом?" }
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
      },
      {
        question: "Мы отправили им (мн.ч.) документы (documentos = м.р. мн.ч.)",
        options: ["Les los mandamos", "Se los mandamos", "Se las mandamos", "Los les mandamos"],
        correct: 1,
        hint: "documentos = м.р. мн.ч. → los. les → se перед los. Порядок: se + los + глагол"
      },
      {
        question: "Ты уже отдал ему это?",
        options: ["¿Le lo has dado ya?", "¿Lo se has dado ya?", "¿Se lo has dado ya?", "¿Has dado se lo ya?"],
        correct: 2,
        hint: "le → se перед lo. Порядок: se lo + вспомогательный глагол + причастие: ¿Se lo has dado?"
      },
      {
        question: "Я им этого не говорил (история = ж.р.)",
        options: ["No les la dije", "No la se dije", "No se la dije", "No se lo dije"],
        correct: 2,
        hint: "historia = ж.р. → la. les → se перед la. Отрицание: No + se la + глагол. Не «se lo» (м.р.)"
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
      { es: "Les molesta el ruido", ru: "Их беспокоит шум" },
      { es: "Te gusta el café, ¿verdad?", ru: "Тебе нравится кофе, правда?" },
      { es: "Nos falta dinero", ru: "Нам не хватает денег" },
      { es: "Le duele la cabeza", ru: "У него болит голова" },
      { es: "Os interesa el español", ru: "Вам интересен испанский" },
      { es: "Me aburren las matemáticas", ru: "Математика мне надоедает / мне скучно на ней" },
      { es: "Le parece bien la idea", ru: "Ему нравится эта идея" }
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
      },
      {
        question: "Нам очень нравятся путешествия (encantar)",
        options: ["Nos encanta los viajes", "Nos encantan los viajes", "Nos encantamos los viajes", "Nos encanta de los viajes"],
        correct: 1,
        hint: "los viajes — мн.ч. → encantan. nos = нам. encantar работает как gustar: глагол согласуется с тем, что нравится"
      },
      {
        question: "У него болит спина (doler)",
        options: ["Le duelen la espalda", "Él duele la espalda", "Le duele la espalda", "Le duele las espaldas"],
        correct: 2,
        hint: "la espalda — ед.ч. → duele. le = ему. doler — глагол типа gustar, согласуется с подлежащим"
      },
      {
        question: "Вам (vosotros) не хватает практики (faltar)",
        options: ["Os faltan la práctica", "Os falta la práctica", "Os faltáis la práctica", "Os faltamos la práctica"],
        correct: 1,
        hint: "la práctica — ед.ч. → falta. os = вам (vosotros). faltar — глагол типа gustar"
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
      { es: "Dudo que lo sepa", ru: "Я сомневаюсь, что он это знает" },
      { es: "Espero que tengas razón", ru: "Я надеюсь, что ты прав" },
      { es: "Necesito que me ayudes", ru: "Мне нужно, чтобы ты мне помог" },
      { es: "Me alegra que estés aquí", ru: "Я рад, что ты здесь" },
      { es: "Ojalá haga buen tiempo", ru: "Хотелось бы, чтобы была хорошая погода" },
      { es: "Es importante que estudies", ru: "Важно, чтобы ты учился" },
      { es: "Recomiendo que pruebes el gazpacho", ru: "Рекомендую попробовать гаспачо" }
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
      },
      {
        question: "Мне нужно, чтобы ты мне помог (necesitar que)",
        options: ["Necesito que me ayudas", "Necesito que me ayudar", "Necesito me ayudes", "Necesito que me ayudes"],
        correct: 3,
        hint: "necesitar que + субхунтиво: ayudes (не ayudas — это индикатив). Обязательно «que»"
      },
      {
        question: "Я рад, что ты здесь (alegrarse de que)",
        options: ["Me alegra que estás aquí", "Me alegro de que estés aquí", "Me alegro que estás aquí", "Me alegra de que estar aquí"],
        correct: 1,
        hint: "alegrarse de que + субхунтиво: estés. Конструкция: me alegro de que + subjuntivo"
      },
      {
        question: "Я рекомендую тебе попробовать (recomendar que) — форма haga",
        options: ["Recomiendo que lo hace", "Recomiendo que lo haga", "Recomiendo que lo hacer", "Recomiendo lo haga"],
        correct: 1,
        hint: "recomendar que + субхунтиво: haga (нерегулярная форма hacer в субхунтиво). Обязательно «que»"
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
      { es: "¿Qué vas a hacer?", ru: "Что ты собираешься делать?" },
      { es: "Va a llover esta tarde", ru: "Сегодня вечером будет дождь" },
      { es: "Voy a llamarte después", ru: "Я позвоню тебе потом" },
      { es: "Van a abrir un restaurante nuevo", ru: "Они собираются открыть новый ресторан" },
      { es: "¿Vas a venir a la fiesta?", ru: "Ты придёшь на вечеринку?" },
      { es: "Voy a dormir temprano hoy", ru: "Я лягу спать рано сегодня" },
      { es: "Vamos a ver qué pasa", ru: "Посмотрим, что будет" }
    ],
    quiz: [
      {
        before: "Tengo hambre —", after: "algo en ese restaurante.",
        options: ["voy comer", "voy a comer", "voy a come", "iré a comer"],
        correct: 1,
        hint: "ir + a + ИНФИНИТИВ. «voy» (иду) + «a» + «comer» (есть)"
      },
      {
        before: "Esta tarde nosotros", after: "para el examen del viernes.",
        options: ["vamos estudiar mañana", "iremos a estudiar mañana", "vamos a estudiando", "vamos a estudiar"],
        correct: 3,
        hint: "vamos (мы идём) + a + infinitivo. Не герундий! estudiar, не estudiando"
      },
      {
        before: "¿Qué tú", after: "este fin de semana?",
        options: ["haces", "vas hacer", "vas a hacer", "irás a hacer"],
        correct: 2,
        hint: "¿Qué + vas + a + hacer? Предлог «a» обязателен"
      },
      {
        before: "Él tiene otra reunión, así que", after: "a nuestra fiesta.",
        options: ["no ir a venir", "no va venir", "no va a venir", "no voy a venir"],
        correct: 2,
        hint: "Отрицание: no + va + a + infinitivo. «a» сохраняется: no va a venir"
      },
      {
        before: "¿Vosotros", after: "descansar este fin de semana?",
        options: ["vais a", "van a", "váis a", "vais de"],
        correct: 0,
        hint: "vosotros → vais (не «van» — это ellos). vais + a + infinitivo"
      },
      {
        before: "¿Ellos", after: "un restaurante nuevo en el centro?",
        options: ["van a abrir", "vais a abrir", "irán a abrir", "van abrir"],
        correct: 0,
        hint: "ellos → van + a + infinitivo. «a» обязательно. Вопрос: ¿Van a abrir...?"
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
      { es: "Debería estudiar más", ru: "Мне следовало бы учиться больше" },
      { es: "Me gustaría vivir en España", ru: "Я бы хотел жить в Испании" },
      { es: "¿Podría ver la carta?", ru: "Можно мне посмотреть меню?" },
      { es: "Sería mejor salir temprano", ru: "Лучше было бы выйти пораньше" },
      { es: "¿Te gustaría venir conmigo?", ru: "Тебе хотелось бы пойти со мной?" },
      { es: "Yo en tu lugar, estudiaría más", ru: "На твоём месте я бы учился больше" },
      { es: "Hablaría con él, pero no me escucha", ru: "Я бы поговорил с ним, но он меня не слушает" }
    ],
    quiz: [
      {
        before: "Perdona, yo", after: "con leche, por favor.",
        options: ["quiero un café", "quisiera un café", "me gustaría un café", "me gustaba un café"],
        correct: 2,
        hint: "gustar в конdicional: me gustaría (мне бы понравился = я бы хотел)"
      },
      {
        before: "¿", after: "con las maletas? Son muy pesadas.",
        options: ["¿Puedes ayudarme", "¿Podrías ayudarme", "¿Podías ayudarme", "¿Podrás ayudarme"],
        correct: 1,
        hint: "poder в конdicional: podría/podrías (мог бы). Звучит вежливее, чем puedes"
      },
      {
        before: "Yo en tu lugar", after: "— tienes un examen mañana.",
        options: ["debo estudiar más", "debía estudiar más", "debería estudiar más", "deba estudiar más"],
        correct: 2,
        hint: "deber в конdicional: debería (следовало бы). Выражает мягкий совет"
      },
      {
        before: "Si tuviera su número, yo", after: "para aclarar el problema.",
        options: ["hablaría con él", "hablaré con él", "hablaba con él", "hablaría a él"],
        correct: 0,
        hint: "hablar + -ía = hablaría (кондисьональ, 1л. ед.ч.). Суффикс -ía добавляется к инфинитиву"
      },
      {
        before: "Si pudiera,", after: "a la fiesta, pero tiene que trabajar.",
        options: ["vendría", "venería", "veniría", "viniera"],
        correct: 0,
        hint: "venir — нерегулярный: основа vendr- + -ía = vendría. Не veniría!"
      },
      {
        before: "Si fuera necesario,", after: "los libros en la estantería.",
        options: ["pondríamos", "poneríamos", "podríamos", "pusimos"],
        correct: 0,
        hint: "poner — нерегулярный: основа pondr- + -íamos = pondríamos (1л. мн.ч.)"
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
      { es: "No hables tan rápido", ru: "Не говори так быстро" },
      { es: "Escucha bien la explicación", ru: "Слушай объяснение внимательно" },
      { es: "No comas tanta azúcar", ru: "Не ешь так много сахара" },
      { es: "Llame al médico, por favor", ru: "Позвоните врачу, пожалуйста (usted)" },
      { es: "No llegues tarde", ru: "Не опаздывай" },
      { es: "¡Ven aquí ahora mismo!", ru: "Иди сюда прямо сейчас!" },
      { es: "Hagan silencio, por favor", ru: "Тишина, пожалуйста (ustedes)" }
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
      },
      {
        question: "Ешь (tú, позитивный) vs Не ешь (tú, негативный) — выбери негативную форму",
        options: ["No come", "No comer", "No comiendo", "No comas"],
        correct: 3,
        hint: "Негативный императив tú = no + субхунтиво: no comas. Позитивный tú: ¡Come! (3л.ед.ч.)"
      },
      {
        question: "Иди сюда! (tú, нерегулярный императив от venir)",
        options: ["¡Viene!", "¡Vengas!", "¡Ven!", "¡Venir!"],
        correct: 2,
        hint: "venir — нерегулярный позитивный императив tú: ¡Ven! (не viene, не vengas)"
      },
      {
        question: "Говорите (ustedes, множественная вежливая форма)",
        options: ["Habla", "Hable", "Habláis", "Hablen"],
        correct: 3,
        hint: "Imperativo ustedes = субхунтиво 3л.мн.ч.: hablen. Не hable (usted ед.ч.) и не habláis (vosotros)"
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
      { es: "Debes descansar", ru: "Тебе нужно отдохнуть" },
      { es: "No puedo dormir", ru: "Я не могу спать" },
      { es: "Deben llegar a tiempo", ru: "Они должны прийти вовремя" },
      { es: "¿Puede repetirlo, por favor?", ru: "Вы можете повторить, пожалуйста?" },
      { es: "Deberías hablar con él", ru: "Тебе следует поговорить с ним" },
      { es: "No puedes fumar aquí", ru: "Здесь нельзя курить" },
      { es: "Podemos salir cuando quieras", ru: "Мы можем выйти, когда захочешь" }
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
      },
      {
        question: "Вы (vosotros) можете выйти сейчас",
        options: ["Pueden salir ahora", "Podéis salir ahora", "Podáis salir ahora", "Podéis a salir ahora"],
        correct: 1,
        hint: "vosotros → podéis (не pueden — это ellos). podéis + infinitivo без предлога"
      },
      {
        question: "Они должны прийти вовремя (deber)",
        options: ["Ellos pueden llegar a tiempo", "Ellos deben a llegar a tiempo", "Ellos deben llegar a tiempo", "Ellos debiendo llegar a tiempo"],
        correct: 2,
        hint: "deber (3л.мн.ч.) = deben + infinitivo. Без предлога «a»! deber = должны/обязаны"
      },
      {
        question: "Здесь нельзя курить (запрет через no puedes)",
        options: ["No debes fumar aquí", "No puedes fumar aquí", "No poder fumar aquí", "No puedes a fumar aquí"],
        correct: 1,
        hint: "no puedes + infinitivo = нельзя (запрет). no debes — тоже возможно, но означает «не следует» (moral). Без «a»!"
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
      { es: "¿Acabas de llamar?", ru: "Ты только что звонил?" },
      { es: "Acaba de salir de casa", ru: "Она только что вышла из дома" },
      { es: "Acabamos de hablar de eso", ru: "Мы только что говорили об этом" },
      { es: "Acabo de escuchar la noticia", ru: "Я только что услышал новость" },
      { es: "Acabáis de terminar el examen", ru: "Вы только что закончили экзамен" },
      { es: "¡Acaba de llegar!", ru: "Он только что приехал!" },
      { es: "Acabo de darme cuenta", ru: "Я только что понял (осознал)" }
    ],
    quiz: [
      {
        before: "Justo yo", after: "— la puerta aún está abierta.",
        options: ["llegué ahora", "acabo llegar", "acabo de llegar", "acabo de llegando"],
        correct: 2,
        hint: "acabar + de + инфинитив: acabo + de + llegar. «de» обязательно!"
      },
      {
        before: "En este momento ellos", after: "— todavía tienen los cubiertos en la mano.",
        options: ["acaban comer", "acaban de comer", "acaban de comiendo", "acabaron de comer"],
        correct: 1,
        hint: "acaban (3л.мн.ч.) + de + comer. Настоящее время, не прошедшее!"
      },
      {
        before: "Nosotros", after: "— todavía recordamos cada escena.",
        options: ["acabamos ver la película", "acabamos de viendo la película", "acabamos de ver la película", "acabamos a ver la película"],
        correct: 2,
        hint: "acabamos + de + ver (инфинитив). Не герундий (viendo)!"
      },
      {
        before: "Él", after: "— pregunta si quieres hablar.",
        options: ["acaba llamar", "acabó de llamar", "acaba de llamando", "acaba de llamar"],
        correct: 3,
        hint: "3л.ед.ч.: acaba + de + infinitivo. Настоящее время! «de» обязательно. Не герундий"
      },
      {
        before: "Vosotros", after: "de terminar el examen — ¡bien hecho!",
        options: ["acabáis", "acabéis", "acabasteis", "acabareis"],
        correct: 0,
        hint: "vosotros → acabáis + de + infinitivo. Настоящее время (не прошедшее acabasteis)"
      },
      {
        before: "¿", after: "de llamar? ¡El teléfono aún está caliente!",
        options: ["acabas", "acabaste", "acababas", "acaban"],
        correct: 0,
        hint: "Вопрос: ¿Acabas de + infinitivo? tú → acabas. Настоящее время! «de» обязательно"
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
      { es: "Se busca cocinero", ru: "Требуется повар" },
      { es: "Se abre a las nueve", ru: "Открывается в девять" },
      { es: "Se prohíbe fumar", ru: "Курить запрещено" },
      { es: "Se alquila habitación", ru: "Сдаётся комната" },
      { es: "Se necesitan camareros", ru: "Требуются официанты" },
      { es: "Aquí se come muy bien", ru: "Здесь едят очень хорошо" },
      { es: "Se dice que va a llover", ru: "Говорят, что будет дождь" }
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
      },
      {
        question: "Курить запрещено (se prohíbe)",
        options: ["Se prohíben fumar", "Se prohíbe a fumar", "Se prohíbe fumar", "Se prohibe fumando"],
        correct: 2,
        hint: "fumar (инфинитив, ед.ч.) → глагол ед.ч.: se prohíbe. Без «a», не герундий"
      },
      {
        question: "Продаётся квартира (ед.ч.) — выбери правильную форму",
        options: ["Se venden el piso", "Se vende el piso", "Se vender el piso", "Se vende los pisos"],
        correct: 1,
        hint: "el piso — ед.ч. → глагол ед.ч.: se vende. Cf: se venden pisos (мн.ч.)"
      },
      {
        question: "Говорят, что он богат (se dice que)",
        options: ["Se dicen que es rico", "Se dice de que es rico", "Se dice que es rico", "Se dices que es rico"],
        correct: 2,
        hint: "se dice que + indikativ — безличная конструкция, глагол всегда ед.ч. Без «de» перед «que»"
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
      { es: "Dejó de fumar", ru: "Он бросил курить" },
      { es: "Vuelve a intentarlo", ru: "Попробуй снова (он пробует снова)" },
      { es: "Sigue lloviendo", ru: "Дождь всё ещё идёт" },
      { es: "Dejé de beber café", ru: "Я перестал пить кофе" },
      { es: "Volvió a llamar", ru: "Он позвонил снова" },
      { es: "Siguen discutiendo", ru: "Они продолжают спорить" },
      { es: "Deja de quejarte", ru: "Перестань жаловаться" }
    ],
    quiz: [
      {
        before: "El ejercicio es difícil, pero yo", after: "hasta conseguirlo.",
        options: ["intento de nuevo", "vuelvo a intentarlo", "vuelvo intentarlo", "sigo a intentarlo"],
        correct: 1,
        hint: "volver a + инфинитив = делать снова. «a» обязательно!"
      },
      {
        before: "Aunque es tarde, ella", after: "para el examen de mañana.",
        options: ["sigue a estudiar", "vuelve estudiando", "sigue estudiar", "sigue estudiando"],
        correct: 3,
        hint: "seguir + ГЕРУНДИЙ (не инфинитив!): sigue + estudiando"
      },
      {
        before: "Por su salud, él", after: "hace dos años — ahora se siente mejor.",
        options: ["dejó fumar", "dejó de fumando", "dejó de fumar", "dejó a fumar"],
        correct: 2,
        hint: "dejar de + инфинитив = перестать. «de» обязательно!"
      },
      {
        before: "Después de tantos problemas, tú todavía", after: "— ¡ya basta!",
        options: ["sigues quejarte", "sigues de quejarte", "sigues quejándote", "sigues a quejarte"],
        correct: 2,
        hint: "seguir + ГЕРУНДИЙ: sigues + quejándote. Не инфинитив, не «de»!"
      },
      {
        before: "Al final,", after: "discutir y llegaron a un acuerdo.",
        options: ["dejaron de", "dejaron a", "dejaron", "siguieron de"],
        correct: 0,
        hint: "dejar de + ИНФИНИТИВ: dejaron de + discutir. «de» обязательно!"
      },
      {
        before: "Después del fracaso,", after: "intentarlo con más cuidado.",
        options: ["volvemos a", "volvemos de", "seguimos a", "dejamos de"],
        correct: 0,
        hint: "volver a + инфинитив: volvemos + a + intentarlo. Предлог «а» обязателен, не «de»"
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
      },
      {
        question: "У тебя разбился стакан (само разбилось)",
        options: ["Se me rompió el vaso", "Se te rompió el vaso", "Se te rompieron el vaso", "Te rompiste el vaso"],
        correct: 1,
        hint: "tú → te: se te rompió. vaso — ед.ч. → глагол ед.ч. rompió. Не путать me (я) и te (ты)"
      },
      {
        question: "Мы забыли билеты (они сами забылись у нас)",
        options: ["Se nos olvidó las entradas", "Se me olvidaron las entradas", "Se nos olvidaron las entradas", "Nos olvidamos las entradas"],
        correct: 2,
        hint: "nosotros → nos: se nos olvidaron. entradas — мн.ч. → глагол мн.ч. olvidaron. Согласование с объектом"
      },
      {
        question: "У него убежала собака (сама убежала)",
        options: ["Se le escaparon el perro", "Se les escapó el perro", "Se me escapó el perro", "Se le escapó el perro"],
        correct: 3,
        hint: "él → le: se le escapó. perro — ед.ч. → глагол ед.ч. escapó. Сравните: se les (им, мн.ч.)"
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
      },
      {
        question: "Я не ем мясо уже несколько месяцев (отрицательная конструкция)",
        options: ["Hace meses que no como carne", "Hace meses que no coma carne", "Desde meses no como carne", "Hace meses no como carne"],
        correct: 0,
        hint: "Отрицание: Hace + tiempo + que + no + глагол (presente). Союз 'que' обязателен; 'desde meses' — неверно"
      },
      {
        question: "Сколько времени ты изучаешь французский? (конструкция hace + que)",
        options: ["¿Cuánto hace que estudias francés?", "¿Desde cuándo estudias francés?", "¿Cuánto tiempo hace que estudias francés?", "¿Por cuánto tiempo estudias francés?"],
        correct: 2,
        hint: "¿Cuánto tiempo hace que + presente? — стандартный вопрос о давности. 'Desde cuándo' тоже возможно, но здесь требуется конструкция hace + que"
      },
      {
        question: "Он уже год как не звонил мне (незаконченное прошлое: hacía)",
        options: ["Hace un año que no me llama", "Hacía un año que no me llamaba", "Hace un año que no me llamó", "Desde un año no me llamó"],
        correct: 1,
        hint: "Прошедшее продолженное: Hacía + tiempo + que + imperfecto. 'Hacía un año que no me llamaba' = к тому моменту прошёл год"
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
      },
      {
        question: "Дома никого нет",
        options: ["Hay nadie en casa", "No hay alguien en casa", "No hay nadie en casa", "Nadie no hay en casa"],
        correct: 2,
        hint: "No hay nadie — двойное отрицание с глаголом 'hay'. 'Hay nadie' без 'no' — неграмматично в испанском"
      },
      {
        question: "У меня нет никаких проблем",
        options: ["No tengo ningún problema", "No tengo algún problema", "Tengo ningún problema", "No tengo ningunas problemas"],
        correct: 0,
        hint: "No tengo ningún problema — 'ningún' перед существительным м.р. ед.ч. Обычно ед.ч., даже если логически мн.ч."
      },
      {
        question: "Мне тоже не нравится (tampoco — тоже нет)",
        options: ["A mí también no me gusta", "A mí tampoco me gusta", "A mí tampoco no me gusta", "A mí no también me gusta"],
        correct: 1,
        hint: "'Tampoco' само по себе отрицание, 'no' перед глаголом не нужно. A mí tampoco me gusta = мне тоже не нравится"
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
      },
      {
        question: "Он ослеп (остался слепым навсегда — результат)",
        options: ["Se puso ciego", "Se quedó ciego", "Estuvo ciego", "Se volvió ciego"],
        correct: 1,
        hint: "Quedarse = остаться в состоянии как постоянный результат: se quedó ciego. Ponerse — лишь временная реакция"
      },
      {
        question: "Я обрадовался, когда услышал новость (внезапная реакция)",
        options: ["Me quedé contento", "Estuve contento", "Me puse contento", "Fui contento"],
        correct: 2,
        hint: "Ponerse + прилагательное = внезапная эмоциональная реакция: me puse contento. Quedarse — для длительного состояния"
      },
      {
        question: "Вы испугались (остались испуганными — вы, множ.ч.)",
        options: ["Os pusisteis asustados", "Os quedasteis asustados", "Os quedasteis asustado", "Nos quedamos asustados"],
        correct: 1,
        hint: "Quedarse = остаться в состоянии. vosotros → os quedasteis. Прилагательное мн.ч.: asustados. Не путать nos (мы) и os (вы)"
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
      },
      {
        question: "Если у неё будет время, она будет работать (ближайшее будущее с ir a)",
        options: ["Si tendrá tiempo, va a trabajar", "Si tiene tiempo, va a trabajar", "Si tiene tiempo, va trabajar", "Si tenga tiempo, va a trabajar"],
        correct: 1,
        hint: "Si + presente indicativo (tiene), результат — va a + infinitivo. Никогда 'si + tendrá' (futuro в условии)"
      },
      {
        question: "Если будет дождь, мы остаёмся дома (presente в результате)",
        options: ["Si llueve, nos quedamos en casa", "Si lloverá, nos quedamos en casa", "Si llueva, nos quedamos en casa", "Si llueve, nos quedaríamos en casa"],
        correct: 0,
        hint: "Реальное условие: Si + presente → presente (факт/привычка). Si llueve, nos quedamos — оба глагола в presente"
      },
      {
        question: "Если не будешь учиться, не сдашь экзамен (отрицание в условии)",
        options: ["Si no estudias, no aprobarás", "Si no estudiarás, no aprobarás", "Si no estudies, no aprobarás", "Si no estudias, no aprobarías"],
        correct: 0,
        hint: "Отрицание в условии: Si no + presente (estudias) + futuro (aprobarás). Модель та же, что и в положительном"
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
      },
      {
        question: "Женщина, которую я встретил, работает врачом (относительное для людей)",
        options: ["La mujer quien conocí es médica", "La mujer que conocí es médica", "La mujer la cual conocí es médica", "La mujer donde conocí es médica"],
        correct: 1,
        hint: "'Que' используется для людей и предметов в большинстве случаев. 'Quien' нужен только после предлога или без антецедента: la mujer que conocí"
      },
      {
        question: "Город, в котором я живу, очень красивый (предлог + относительное)",
        options: ["La ciudad que vivo es muy bonita", "La ciudad donde vivo es muy bonita", "La ciudad en la que vivo es muy bonita", "La ciudad en que vivo es muy bonita"],
        correct: 2,
        hint: "После предлога 'en' нужен артикль + que: en la que. 'Donde' — тоже допустимо, но здесь проверяется форма 'en la que'"
      },
      {
        question: "Ты знаешь, насколько это интересно? (восклицательное lo + adj)",
        options: ["¿Sabes lo que es interesante?", "¿Sabes que es muy interesante?", "¿Sabes lo interesante que es?", "¿Sabes cómo interesante es?"],
        correct: 2,
        hint: "Восклицательная/эмфатическая структура: lo + adj + que + es. ¿Sabes lo interesante que es? = 'знаешь, насколько это интересно'"
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
      },
      {
        question: "Любопытно то, что никто не заметил (lo curioso — подлежащее)",
        options: ["El curioso es que nadie lo notó", "Lo curioso que nadie lo notó", "Lo curioso es que nadie lo notó", "La curiosa es que nadie lo notó"],
        correct: 2,
        hint: "Lo curioso es que... — нейтральный артикль lo + прилагательное в роли подлежащего. Структура: Lo + adj + es + que + предложение"
      },
      {
        question: "Трудное в этом — найти время (lo difícil — с предлогом de)",
        options: ["El difícil de esto es encontrar tiempo", "Lo difícil de esto es encontrar tiempo", "Lo difícil en esto es encontrar tiempo", "Lo difícil esto es encontrar tiempo"],
        correct: 1,
        hint: "Lo difícil de esto — 'трудное в этом'. Предлог 'de' указывает, чего это касается. Не 'el difícil'"
      },
      {
        question: "Ты знаешь, насколько это скучно? (lo + adj в восклицании)",
        options: ["¿Sabes que es muy aburrido?", "¿Sabes lo aburrido que es?", "¿Sabes lo que es aburrido?", "¿Sabes cuán aburrido es?"],
        correct: 1,
        hint: "¿Sabes lo aburrido que es? — эмфаза через lo + adj + que + es. 'Lo que es aburrido' меняет смысл на 'то, что скучно'"
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
      },
      {
        question: "Отправляю тебе ссылку, чтобы ты мог прочитать (разные подлежащие)",
        options: ["Te mando el enlace para poder leer", "Te mando el enlace para que puedes leer", "Te mando el enlace para que puedas leer", "Te mando el enlace para que leer"],
        correct: 2,
        hint: "Разные подлежащие (я отправляю, ты читаешь) → para que + subjuntivo: puedas (от poder). Не 'puedes' (indicativo)"
      },
      {
        question: "Напоминаю им, чтобы они не забыли (разные подлежащие, отрицание)",
        options: ["Les recuerdo para que no se olvidan", "Les recuerdo para no olvidar", "Les recuerdo para que no se olviden", "Les recuerdo para que no olvidar"],
        correct: 2,
        hint: "Para que + subj: no se olviden (3л. мн.ч. субхунтиво от olvidarse). Разные подлежащие → нельзя para + infinitivo"
      },
      {
        question: "Она звонит, чтобы поговорить (одно подлежащее — она)",
        options: ["Llama para que hable", "Llama para que hablar", "Llama para hablar", "Llama para que hablemos"],
        correct: 2,
        hint: "Одно подлежащее → para + infinitivo (не 'para que'). Llama para hablar. 'Para que + subj' нужен только при смене подлежащего"
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
      },
      {
        question: "Если бы я был на твоём месте, поступил бы иначе (si + fuera)",
        options: ["Si sería tú, haría algo diferente", "Si fuera tú, haría algo diferente", "Si fuera tú, haré algo diferente", "Si fui tú, haría algo diferente"],
        correct: 1,
        hint: "fuera — imperfecto de subjuntivo от 'ser'. Si fuera tú → haría. Никогда 'si sería' (condicional в условии — грубая ошибка)"
      },
      {
        question: "Если бы я знал ответ, сказал бы тебе (si + supiera)",
        options: ["Si sabría la respuesta, te lo diría", "Si sé la respuesta, te lo diría", "Si supiera la respuesta, te lo diría", "Si supiera la respuesta, te lo diré"],
        correct: 2,
        hint: "supiera — imperfecto de subjuntivo от 'saber'. Si supiera → te lo diría (condicional). Никогда 'si sabría'"
      },
      {
        question: "Что бы ты сделал, если бы выиграл в лотерею?",
        options: ["¿Qué harías si ganarías la lotería?", "¿Qué harías si ganas la lotería?", "¿Qué harías si ganara la lotería?", "¿Qué harías si ganaste la lotería?"],
        correct: 2,
        hint: "Si + imperfecto de subjuntivo (ganara) + condicional (harías). 'Si ganarías' — ОШИБКА: condicional после si запрещён"
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.FORMULAS_DATA = FORMULAS_DATA;
}
