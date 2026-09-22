/**
 * Spanish Trainer — Прошедшее время
 * Data: 16 formulas × 6 quiz questions = 96 questions total
 * Groups: Indefinido (1-4), Imperfecto (5-8), Perfecto Compuesto (9-12), Pluscuamperfecto (13-16)
 */

const PASADO_DATA = [

  // ══════════════════════════════════════════════════════════════
  //  ГРУППА 1 — Pretérito Indefinido
  // ══════════════════════════════════════════════════════════════

  {
    id: 1,
    name: "Ф1: Indefinido — глаголы на -AR",
    shortName: "Indefinido -AR",
    emoji: "🔵",
    description: "Однократные завершённые действия в прошлом для глаголов на -AR",
    rule: "stem + é, aste, ó, amos, asteis, aron",
    example: "Ayer hablé con María",
    exampleRu: "Вчера я поговорил с Марией",
    examples: [
      { es: "Ayer hablé por teléfono", ru: "Вчера я говорил по телефону" },
      { es: "Tú trabajaste mucho hoy", ru: "Ты сегодня много работал" },
      { es: "Él caminó dos horas", ru: "Он шёл два часа" },
      { es: "Nosotros llegamos tarde", ru: "Мы пришли поздно" },
      { es: "Vosotros cantasteis bien", ru: "Вы хорошо пели" },
      { es: "Ellos viajaron a España", ru: "Они путешествовали в Испанию" },
      { es: "Ella bailó en la fiesta", ru: "Она танцевала на вечеринке" },
      { es: "Yo compré un libro nuevo", ru: "Я купил новую книгу" }
    ],
    quiz: [
      {
        question: "Я поговорил (hablar, yo)",
        options: ["hablé", "hablaba", "hablaré", "hablado"],
        correct: 0,
        hint: "Indefinido yo (-AR): stem + é. hablar → habl + é = hablé"
      },
      {
        question: "Ты работал сегодня (trabajar, tú)",
        options: ["trabajé", "trabajaste", "trabajó", "trabajabas"],
        correct: 1,
        hint: "Indefinido tú (-AR): stem + aste. trabajar → trabaj + aste = trabajaste"
      },
      {
        question: "Она шла два часа (caminar, ella)",
        options: ["caminé", "caminaste", "caminó", "caminaba"],
        correct: 2,
        hint: "Indefinido él/ella (-AR): stem + ó. caminar → camin + ó = caminó"
      },
      {
        question: "Мы пришли поздно (llegar, nosotros)",
        options: ["llegamos", "llegábamos", "llegamos", "lleguemos"],
        correct: 0,
        hint: "Indefinido nosotros (-AR): stem + amos. Форма совпадает с Present, контекст уточняет время"
      },
      {
        question: "Вы хорошо пели (cantar, vosotros)",
        options: ["cantamos", "cantasteis", "cantareis", "cantabais"],
        correct: 1,
        hint: "Indefinido vosotros (-AR): stem + asteis. cantar → cant + asteis = cantasteis"
      },
      {
        question: "Они путешествовали в Испанию (viajar, ellos)",
        options: ["viajamos", "viajaron", "viajaban", "viajarán"],
        correct: 1,
        hint: "Indefinido ellos (-AR): stem + aron. viajar → viaj + aron = viajaron"
      }
    ]
  },

  {
    id: 2,
    name: "Ф2: Indefinido — глаголы на -ER/-IR",
    shortName: "Indefinido -ER/-IR",
    emoji: "🟣",
    description: "Pretérito Indefinido для глаголов на -ER и -IR",
    rule: "stem + í, iste, ió, imos, isteis, ieron",
    example: "Ayer comí paella",
    exampleRu: "Вчера я ел паэлью",
    examples: [
      { es: "Ayer comí paella", ru: "Вчера я ел паэлью" },
      { es: "Tú bebiste mucho agua", ru: "Ты выпил много воды" },
      { es: "Él vivió en Madrid tres años", ru: "Он жил в Мадриде три года" },
      { es: "Ella escribió una carta", ru: "Она написала письмо" },
      { es: "Nosotros corrimos 10 km", ru: "Мы пробежали 10 км" },
      { es: "Vosotros comisteis en casa", ru: "Вы ели дома" },
      { es: "Ellos vivieron juntos", ru: "Они жили вместе" },
      { es: "Yo leí ese libro", ru: "Я прочитал эту книгу" }
    ],
    quiz: [
      {
        question: "Я поел (comer, yo)",
        options: ["comé", "comí", "comía", "comeré"],
        correct: 1,
        hint: "Indefinido yo (-ER): stem + í. comer → com + í = comí"
      },
      {
        question: "Ты жил там (vivir, tú)",
        options: ["viví", "viviste", "vivía", "vivirás"],
        correct: 1,
        hint: "Indefinido tú (-IR): stem + iste. vivir → viv + iste = viviste"
      },
      {
        question: "Она написала письмо (escribir, ella)",
        options: ["escribé", "escribió", "escribía", "escribirá"],
        correct: 1,
        hint: "Indefinido ella (-IR): stem + ió. escribir → escrib + ió = escribió"
      },
      {
        question: "Мы поняли тему (comprender, nosotros)",
        options: ["comprendemos", "comprendimos", "comprendíamos", "comprenderemos"],
        correct: 1,
        hint: "Indefinido nosotros (-ER): stem + imos. comprender → comprend + imos = comprendimos"
      },
      {
        question: "Вы поели дома (comer, vosotros)",
        options: ["comimos", "comisteis", "comíais", "comeréis"],
        correct: 1,
        hint: "Indefinido vosotros (-ER): stem + isteis. comer → com + isteis = comisteis"
      },
      {
        question: "Они жили вместе (vivir, ellos)",
        options: ["vivimos", "vivieron", "vivían", "vivirán"],
        correct: 1,
        hint: "Indefinido ellos (-IR): stem + ieron. vivir → viv + ieron = vivieron"
      }
    ]
  },

  {
    id: 3,
    name: "Ф3: Indefinido — ser, ir, hacer, tener",
    shortName: "Indefinido: нерег. гл.",
    emoji: "⚡",
    description: "Главные неправильные глаголы в Pretérito Indefinido",
    rule: "ser/ir: fui-fuiste-fue-fuimos-fuisteis-fueron | hacer: hice-hiciste-hizo | tener: tuve-tuviste-tuvo",
    example: "Ayer fui al médico",
    exampleRu: "Вчера я ходил к врачу",
    examples: [
      { es: "Ayer fui al médico", ru: "Вчера я ходил к врачу (ir)" },
      { es: "Juan fue un buen estudiante", ru: "Хуан был хорошим студентом (ser)" },
      { es: "¿Fuiste al concierto?", ru: "Ты ходил на концерт? (ir)" },
      { es: "Hice mis deberes", ru: "Я сделал домашнее задание (hacer)" },
      { es: "¿Qué hiciste ayer?", ru: "Что ты делал вчера? (hacer)" },
      { es: "Tuve que salir pronto", ru: "Мне пришлось уйти рано (tener)" },
      { es: "Tuvimos una reunión importante", ru: "У нас было важное собрание (tener)" },
      { es: "Fue una noche especial", ru: "Это была особая ночь (ser)" }
    ],
    quiz: [
      {
        question: "Я пошёл в магазин (ir, yo)",
        options: ["iba", "fui", "voy", "iría"],
        correct: 1,
        hint: "ir, Indefinido yo: fui. ser и ir имеют ОДИНАКОВЫЕ формы в Indefinido!"
      },
      {
        question: "Он был хорошим другом (ser, él)",
        options: ["era", "estaba", "fue", "es"],
        correct: 2,
        hint: "ser, Indefinido él: fue. Контекст подсказывает: ser это или ir"
      },
      {
        question: "Мы пошли в парк (ir, nosotros)",
        options: ["íbamos", "fuimos", "vamos", "éramos"],
        correct: 1,
        hint: "ir, Indefinido nosotros: fuimos (те же формы что у ser)"
      },
      {
        question: "Я сделал домашнее задание (hacer, yo)",
        options: ["hacé", "hice", "hacía", "haré"],
        correct: 1,
        hint: "hacer, Indefinido yo: hice. Обрати внимание: yo=hice, él=hizo (c→z)"
      },
      {
        question: "Он сделал ошибку (hacer, él)",
        options: ["hice", "hacía", "hizo", "hará"],
        correct: 2,
        hint: "hacer, Indefinido él: hizo (с буквой z, а не c!). yo=hice, él=hizo"
      },
      {
        question: "Мне пришлось уйти (tener que, yo)",
        options: ["tenía", "tuve", "tengo", "tendré"],
        correct: 1,
        hint: "tener, Indefinido yo: tuve. Основа меняется: ten- → tuv-"
      }
    ]
  },

  {
    id: 4,
    name: "Ф4: Indefinido — нестандартные основы",
    shortName: "Indefinido: stem-chang.",
    emoji: "🌀",
    description: "Глаголы с изменённой основой: poder, estar, querer, venir, saber, andar",
    rule: "poder: pud- | estar: estuv- | querer: quis- | venir: vin- | saber: sup- | andar: anduv-",
    example: "No pude terminar a tiempo",
    exampleRu: "Я не смог закончить вовремя",
    examples: [
      { es: "Pude terminar a tiempo", ru: "Я смог закончить вовремя (poder)" },
      { es: "Estuve en casa todo el día", ru: "Я провёл весь день дома (estar)" },
      { es: "Quise llamarte", ru: "Я хотел позвонить тебе (querer)" },
      { es: "Vine a verte", ru: "Я пришёл тебя навестить (venir)" },
      { es: "Supe la verdad ayer", ru: "Вчера я узнал правду (saber)" },
      { es: "Anduve por la ciudad toda la noche", ru: "Я ходил по городу всю ночь (andar)" },
      { es: "No pudo venir a la reunión", ru: "Он не смог прийти на собрание (poder)" },
      { es: "¿Cómo supiste eso?", ru: "Как ты это узнал? (saber)" }
    ],
    quiz: [
      {
        question: "Я смог закончить (poder, yo)",
        options: ["podé", "podí", "pude", "podía"],
        correct: 2,
        hint: "poder, Indefinido yo: pude. Основа меняется: pod- → pud-"
      },
      {
        question: "Я провёл день дома (estar, yo)",
        options: ["estaba", "estuve", "esté", "estaré"],
        correct: 1,
        hint: "estar, Indefinido yo: estuve. Основа: estuv-. Не путать с Imperfecto estaba!"
      },
      {
        question: "Я хотел тебе позвонить (querer, yo)",
        options: ["quería", "quise", "querí", "querré"],
        correct: 1,
        hint: "querer, Indefinido yo: quise. Основа quer- → quis-"
      },
      {
        question: "Я пришёл к тебе (venir, yo)",
        options: ["venía", "vine", "vengué", "vendré"],
        correct: 1,
        hint: "venir, Indefinido yo: vine. Основа ven- → vin-"
      },
      {
        question: "Я узнал правду (saber, yo)",
        options: ["sabía", "supe", "sabé", "sabré"],
        correct: 1,
        hint: "saber, Indefinido yo: supe. Основа sab- → sup-"
      },
      {
        question: "Я ходил по городу (andar, yo)",
        options: ["andé", "anduve", "andaba", "andaré"],
        correct: 1,
        hint: "andar, Indefinido yo: anduve. Нестандартная основа: anduv-"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  ГРУППА 2 — Pretérito Imperfecto
  // ══════════════════════════════════════════════════════════════

  {
    id: 5,
    name: "Ф5: Imperfecto — глаголы на -AR",
    shortName: "Imperfecto -AR",
    emoji: "🌊",
    description: "Привычные и повторяющиеся действия в прошлом для глаголов на -AR",
    rule: "stem + aba, abas, aba, ábamos, abais, aban",
    example: "Cuando era niño, hablaba mucho",
    exampleRu: "Когда я был ребёнком, много говорил",
    examples: [
      { es: "Cuando era niño, hablaba mucho", ru: "Когда я был ребёнком, много говорил" },
      { es: "Ella trabajaba en un banco", ru: "Она работала в банке" },
      { es: "Todos los días caminaba al colegio", ru: "Каждый день я шёл в школу пешком" },
      { es: "Nosotros cantábamos en el coro", ru: "Мы пели в хоре" },
      { es: "Vosotros bailabais muy bien", ru: "Вы очень хорошо танцевали" },
      { es: "Ellos siempre llegaban tarde", ru: "Они всегда приходили поздно" },
      { es: "Él tocaba la guitarra", ru: "Он играл на гитаре" },
      { es: "Yo estudiaba mucho en esa época", ru: "Я много занимался в то время" }
    ],
    quiz: [
      {
        question: "Я говорил (раньше, hablar, yo)",
        options: ["hablé", "hablaba", "hablo", "hablaré"],
        correct: 1,
        hint: "Imperfecto yo (-AR): stem + aba. hablar → habl + aba = hablaba"
      },
      {
        question: "Ты работал каждый день (trabajar, tú)",
        options: ["trabajaste", "trabajabas", "trabajas", "trabajarás"],
        correct: 1,
        hint: "Imperfecto tú (-AR): stem + abas. trabajar → trabaj + abas = trabajabas"
      },
      {
        question: "Она всегда пела (cantar, ella)",
        options: ["cantó", "cantaba", "canta", "cantará"],
        correct: 1,
        hint: "Imperfecto ella (-AR): stem + aba (та же форма что yo!). cantar → cantaba"
      },
      {
        question: "Мы любили ходить в кино (amar, nosotros)",
        options: ["amamos", "amábamos", "amaremos", "hemos amado"],
        correct: 1,
        hint: "Imperfecto nosotros (-AR): stem + ábamos (с ударением!). amar → am + ábamos"
      },
      {
        question: "Вы танцевали очень хорошо (bailar, vosotros)",
        options: ["bailasteis", "bailabais", "bailáis", "bailareis"],
        correct: 1,
        hint: "Imperfecto vosotros (-AR): stem + abais. bailar → bail + abais = bailabais"
      },
      {
        question: "Они всегда приходили поздно (llegar, ellos)",
        options: ["llegaron", "llegaban", "llegan", "llegarán"],
        correct: 1,
        hint: "Imperfecto ellos (-AR): stem + aban. llegar → lleg + aban = llegaban"
      }
    ]
  },

  {
    id: 6,
    name: "Ф6: Imperfecto — глаголы на -ER/-IR",
    shortName: "Imperfecto -ER/-IR",
    emoji: "💧",
    description: "Imperfecto для глаголов на -ER и -IR",
    rule: "stem + ía, ías, ía, íamos, íais, ían",
    example: "Antes comía mucho",
    exampleRu: "Раньше я много ел",
    examples: [
      { es: "Antes comía mucho", ru: "Раньше я много ел" },
      { es: "Vivíamos en el campo", ru: "Мы жили в деревне" },
      { es: "Él leía todos los días", ru: "Он читал каждый день" },
      { es: "Ella bebía té por las mañanas", ru: "Она пила чай по утрам" },
      { es: "Yo corría en el parque", ru: "Я бегал в парке" },
      { es: "Los niños dormían bien", ru: "Дети хорошо спали" },
      { es: "Vosotros corríais por las mañanas", ru: "Вы бегали по утрам" },
      { es: "Antes los trenes salían a tiempo", ru: "Раньше поезда отходили вовремя" }
    ],
    quiz: [
      {
        question: "Я раньше ел много (comer, yo)",
        options: ["comí", "comía", "como", "comeré"],
        correct: 1,
        hint: "Imperfecto yo (-ER): stem + ía. comer → com + ía = comía"
      },
      {
        question: "Ты жил там (vivir, tú)",
        options: ["viviste", "vivías", "vives", "vivirás"],
        correct: 1,
        hint: "Imperfecto tú (-IR): stem + ías. vivir → viv + ías = vivías"
      },
      {
        question: "Он знал ответ (saber, él)",
        options: ["supo", "sabía", "sabe", "sabrá"],
        correct: 1,
        hint: "Imperfecto él (-ER): stem + ía. saber → sab + ía = sabía"
      },
      {
        question: "Мы читали каждый день (leer, nosotros)",
        options: ["leímos", "leíamos", "leemos", "leeremos"],
        correct: 1,
        hint: "Imperfecto nosotros (-ER): stem + íamos. leer → le + íamos = leíamos"
      },
      {
        question: "Вы бегали по утрам (correr, vosotros)",
        options: ["corristeis", "corríais", "corréis", "correréis"],
        correct: 1,
        hint: "Imperfecto vosotros (-ER): stem + íais. correr → corr + íais = corríais"
      },
      {
        question: "Они хорошо спали (dormir, ellos)",
        options: ["durmieron", "dormían", "duermen", "dormirán"],
        correct: 1,
        hint: "Imperfecto ellos (-IR): stem + ían. dormir → dorm + ían = dormían"
      }
    ]
  },

  {
    id: 7,
    name: "Ф7: Imperfecto — ser, ir, ver",
    shortName: "Imperfecto: ser/ir/ver",
    emoji: "🔮",
    description: "Единственные три неправильных глагола в Imperfecto",
    rule: "ser: era/eras/era/éramos/erais/eran | ir: iba/ibas/iba/íbamos/ibais/iban | ver: veía/veías...",
    example: "De niño era muy tímido",
    exampleRu: "В детстве я был очень застенчивым",
    examples: [
      { es: "Era un día perfecto", ru: "Был идеальный день (ser)" },
      { es: "De niño era muy tímido", ru: "В детстве я был очень застенчивым (ser)" },
      { es: "Íbamos al parque cada domingo", ru: "Каждое воскресенье мы ходили в парк (ir)" },
      { es: "Ella iba al trabajo en metro", ru: "Она ездила на работу на метро (ir)" },
      { es: "Veía la televisión por las noches", ru: "По вечерам я смотрел телевизор (ver)" },
      { es: "Los niños veían dibujos animados", ru: "Дети смотрели мультфильмы (ver)" },
      { es: "Éramos buenos amigos", ru: "Мы были хорошими друзьями (ser)" },
      { es: "¿Adónde ibas?", ru: "Куда ты шёл? (ir)" }
    ],
    quiz: [
      {
        question: "Я был счастлив (ser, yo)",
        options: ["fui", "era", "soy", "seré"],
        correct: 1,
        hint: "ser, Imperfecto yo: era. ser — один из трёх неправильных глаголов в Imperfecto"
      },
      {
        question: "Она была добрым человеком (ser, ella)",
        options: ["fue", "era", "es", "será"],
        correct: 1,
        hint: "ser, Imperfecto ella: era (та же форма что yo). era = я был / он был / она была"
      },
      {
        question: "Мы были хорошими друзьями (ser, nosotros)",
        options: ["fuimos", "éramos", "somos", "seremos"],
        correct: 1,
        hint: "ser, Imperfecto nosotros: éramos. Обрати внимание на ударение: ÉRamos"
      },
      {
        question: "Я ходил в школу пешком (ir, yo)",
        options: ["fui", "iba", "voy", "iré"],
        correct: 1,
        hint: "ir, Imperfecto yo: iba. Stem ib- + окончания (не -AR, исключение!)"
      },
      {
        question: "Они каждый день ходили в парк (ir, ellos)",
        options: ["fueron", "iban", "van", "irán"],
        correct: 1,
        hint: "ir, Imperfecto ellos: iban. stem ib- + an = iban"
      },
      {
        question: "Ты смотрел телевизор (ver, tú)",
        options: ["viste", "veías", "ves", "verás"],
        correct: 1,
        hint: "ver, Imperfecto tú: veías. ver — почти правильный: ve + ías = veías"
      }
    ]
  },

  {
    id: 8,
    name: "Ф8: Когда использовать Imperfecto?",
    shortName: "Когда Imperfecto?",
    emoji: "🕰️",
    description: "Imperfecto: привычные действия, описание фона, состояния, возраст",
    rule: "привычка (siempre/antes/cada día) + описание фона + возраст/время + незавершённое действие",
    example: "Cuando era niño, jugaba al fútbol cada día",
    exampleRu: "Когда я был ребёнком, каждый день играл в футбол",
    examples: [
      { es: "Cuando era niño, jugaba al fútbol", ru: "В детстве я играл в футбол (привычка)" },
      { es: "Llovía y hacía frío", ru: "Шёл дождь и было холодно (фон)" },
      { es: "Tenía 8 años cuando empecé a estudiar", ru: "Мне было 8 лет, когда я начал учиться (возраст)" },
      { es: "Leía cuando sonó el teléfono", ru: "Я читал, когда зазвонил телефон (фон + прерывание)" },
      { es: "Antes vivíamos en otra ciudad", ru: "Раньше мы жили в другом городе (привычное состояние)" },
      { es: "Era tarde y todo el mundo dormía", ru: "Было поздно, и все спали (описание)" },
      { es: "Siempre llegaba antes que yo", ru: "Он всегда приходил раньше меня (привычка)" },
      { es: "Me dolía la cabeza", ru: "У меня болела голова (состояние)" }
    ],
    quiz: [
      {
        question: "В детстве я каждый день играл в футбол. Какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Imperfecto для ПРИВЫЧНЫХ прошлых действий: 'каждый день, всегда, раньше...'"
      },
      {
        question: "Шёл дождь и было холодно. Это описание погоды. Какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Imperfecto рисует ФОНОВУЮ картину: погода, обстановка, описания"
      },
      {
        question: "Мне было 10 лет, когда... Возраст в прошлом — какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Presente"],
        correct: 1,
        hint: "Возраст в прошлом: tener + Imperfecto. Tenía 10 años cuando..."
      },
      {
        question: "Я читал книгу, когда зазвонил телефон. 'Читал' — какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Imperfecto = длящееся ФОНОВОЕ действие. Indefinido = конкретный момент (зазвонил)"
      },
      {
        question: "Antes, ella siempre _____ (comprar) en ese mercado",
        options: ["compró", "compraba", "ha comprado", "había comprado"],
        correct: 1,
        hint: "Antes + siempre = сигналы Imperfecto (привычка). Правильно: compraba"
      },
      {
        question: "Раньше мы жили в Москве (vivir, nosotros)",
        options: ["Vivíamos", "Vivimos", "Hemos vivido", "Habíamos vivido"],
        correct: 0,
        hint: "Antes (раньше) + привычное состояние → Imperfecto: vivíamos"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  ГРУППА 3 — Pretérito Perfecto Compuesto
  // ══════════════════════════════════════════════════════════════

  {
    id: 9,
    name: "Ф9: Perfecto Compuesto — глагол haber",
    shortName: "haber (вспомог.)",
    emoji: "🔑",
    description: "Вспомогательный глагол haber спрягается, а не главный глагол",
    rule: "he / has / ha / hemos / habéis / han + participio",
    example: "He comido ya",
    exampleRu: "Я уже поел",
    examples: [
      { es: "He comido ya", ru: "Я уже поел (he)" },
      { es: "¿Has dormido bien?", ru: "Ты хорошо поспал? (has)" },
      { es: "Ella ha llegado", ru: "Она пришла (ha)" },
      { es: "Hemos trabajado mucho", ru: "Мы много работали (hemos)" },
      { es: "¿Habéis visto eso?", ru: "Вы это видели? (habéis)" },
      { es: "Ellos han salido", ru: "Они ушли (han)" },
      { es: "No he entendido nada", ru: "Я ничего не понял" },
      { es: "¿Han llamado?", ru: "Звонили?" }
    ],
    quiz: [
      {
        question: "Я уже поел — вспомогательный глагол (yo)?",
        options: ["tengo", "he", "hube", "había"],
        correct: 1,
        hint: "Perfecto Compuesto yo: he + причастие. He comido = я поел (сегодня/уже)"
      },
      {
        question: "Ты видел это? — вспомогательный (tú)?",
        options: ["tienes", "has", "habías", "hubo"],
        correct: 1,
        hint: "Perfecto Compuesto tú: has + причастие. ¿Has visto esto?"
      },
      {
        question: "Она пришла — вспомогательный (ella)?",
        options: ["tiene", "ha", "había", "hube"],
        correct: 1,
        hint: "Perfecto Compuesto él/ella: ha + причастие. Ella ha llegado."
      },
      {
        question: "Мы много работали — вспомогательный (nosotros)?",
        options: ["tenemos", "hemos", "habíamos", "hubimos"],
        correct: 1,
        hint: "Perfecto Compuesto nosotros: hemos + причастие. Hemos trabajado."
      },
      {
        question: "Вы это видели? — вспомогательный (vosotros)?",
        options: ["tenéis", "habéis", "habíais", "hubisteis"],
        correct: 1,
        hint: "Perfecto Compuesto vosotros: habéis + причастие. ¿Habéis visto eso?"
      },
      {
        question: "Они ушли — вспомогательный (ellos)?",
        options: ["tienen", "han", "habían", "hubieron"],
        correct: 1,
        hint: "Perfecto Compuesto ellos: han + причастие. Ellos han salido."
      }
    ]
  },

  {
    id: 10,
    name: "Ф10: Perfecto Compuesto — правильные причастия",
    shortName: "Причастия -ado/-ido",
    emoji: "📝",
    description: "Образование правильных причастий прошедшего времени",
    rule: "-AR → -ado (hablar→hablado) | -ER/-IR → -ido (comer→comido, vivir→vivido)",
    example: "He hablado con el director",
    exampleRu: "Я поговорил с директором",
    examples: [
      { es: "hablar → hablado", ru: "говорить → поговоривший (He hablado)" },
      { es: "trabajar → trabajado", ru: "работать → работавший (Ha trabajado)" },
      { es: "caminar → caminado", ru: "идти → прошедший (Hemos caminado)" },
      { es: "comer → comido", ru: "есть → поевший (He comido)" },
      { es: "beber → bebido", ru: "пить → выпивший (Has bebido)" },
      { es: "vivir → vivido", ru: "жить → живший (Han vivido)" },
      { es: "recibir → recibido", ru: "получать → получивший (Ha recibido)" },
      { es: "salir → salido", ru: "выходить → вышедший (He salido)" }
    ],
    quiz: [
      {
        question: "Причастие от hablar?",
        options: ["hablado", "hablido", "habliendo", "hablando"],
        correct: 0,
        hint: "-AR глаголы → причастие на -ado. hablar → habl + ado = hablado"
      },
      {
        question: "Причастие от comer?",
        options: ["comado", "comido", "comiendo", "comerdo"],
        correct: 1,
        hint: "-ER глаголы → причастие на -ido. comer → com + ido = comido"
      },
      {
        question: "Причастие от vivir?",
        options: ["vivado", "vivido", "viviendo", "vivirdo"],
        correct: 1,
        hint: "-IR глаголы → причастие на -ido. vivir → viv + ido = vivido"
      },
      {
        question: "Я говорил сегодня (hablar, Perf.Comp., yo)",
        options: ["He hablado", "He hablido", "Hablo", "Hablé"],
        correct: 0,
        hint: "he + hablado (-AR → -ado). He hablado = я говорил (сегодня/уже)"
      },
      {
        question: "Причастие от trabajar?",
        options: ["trabajido", "trabajando", "trabajado", "trabajaré"],
        correct: 2,
        hint: "-AR глагол trabajar → причastие: trabaj + ado = trabajado"
      },
      {
        question: "Он жил в Мадриде (vivir, Perf.Comp., él)",
        options: ["Ha vivido", "Ha vivado", "Ha viviendo", "Vivió"],
        correct: 0,
        hint: "vivir → vivido (-IR → -ido). Ha vivido = он жил (с отношением к настоящему)"
      }
    ]
  },

  {
    id: 11,
    name: "Ф11: Perfecto Compuesto — нестанд. причастия",
    shortName: "Нестанд. причастия",
    emoji: "⚠️",
    description: "Главные глаголы с нестандартными причастиями",
    rule: "hacer→hecho | decir→dicho | ver→visto | escribir→escrito | poner→puesto | volver→vuelto | abrir→abierto | romper→roto",
    example: "He hecho todo lo que pude",
    exampleRu: "Я сделал всё, что смог",
    examples: [
      { es: "hacer → hecho", ru: "сделать → сделанный (He hecho)" },
      { es: "decir → dicho", ru: "сказать → сказанный (He dicho)" },
      { es: "ver → visto", ru: "видеть → виденный (He visto)" },
      { es: "escribir → escrito", ru: "написать → написанный (He escrito)" },
      { es: "poner → puesto", ru: "ставить → поставленный (He puesto)" },
      { es: "volver → vuelto", ru: "вернуться → вернувшийся (Ha vuelto)" },
      { es: "abrir → abierto", ru: "открыть → открытый (Ha abierto)" },
      { es: "romper → roto", ru: "сломать → сломанный (Ha roto)" }
    ],
    quiz: [
      {
        question: "Причастие от hacer?",
        options: ["hacido", "hachado", "hecho", "hacendo"],
        correct: 2,
        hint: "hacer → hecho (нестандартное!). He hecho = я сделал"
      },
      {
        question: "Причастие от decir?",
        options: ["decido", "dicho", "deciendo", "dicido"],
        correct: 1,
        hint: "decir → dicho. He dicho = я сказал"
      },
      {
        question: "Причастие от ver?",
        options: ["veído", "visto", "viendo", "verdo"],
        correct: 1,
        hint: "ver → visto. He visto = я видел"
      },
      {
        question: "Причастие от escribir?",
        options: ["escribido", "escrito", "escribiendo", "escribado"],
        correct: 1,
        hint: "escribir → escrito. He escrito = я написал"
      },
      {
        question: "Причастие от volver?",
        options: ["volvido", "vueltado", "vuelto", "volviendo"],
        correct: 2,
        hint: "volver → vuelto. Ha vuelto = он вернулся"
      },
      {
        question: "Причастие от poner?",
        options: ["ponido", "puesto", "ponando", "ponecto"],
        correct: 1,
        hint: "poner → puesto. Han puesto = они поставили / положили"
      }
    ]
  },

  {
    id: 12,
    name: "Ф12: Когда Perfecto Compuesto?",
    shortName: "Когда Perfecto Comp.?",
    emoji: "📅",
    description: "Сигнальные слова и контексты для Perfecto Compuesto",
    rule: "hoy / esta semana / este año / ya / nunca / alguna vez / todavía no / últimamente",
    example: "Hoy he comido paella",
    exampleRu: "Сегодня я ел паэлью",
    examples: [
      { es: "Hoy he estudiado mucho", ru: "Сегодня я много занимался" },
      { es: "Esta semana hemos viajado", ru: "На этой неделе мы путешествовали" },
      { es: "Este año ha cambiado todo", ru: "В этом году всё изменилось" },
      { es: "¿Alguna vez has probado sushi?", ru: "Ты когда-нибудь пробовал суши?" },
      { es: "Nunca he estado en Japón", ru: "Я никогда не был в Японии" },
      { es: "Todavía no he terminado", ru: "Я ещё не закончил" },
      { es: "Ya ha llamado", ru: "Он уже позвонил" },
      { es: "¿Has visto esa película?", ru: "Ты видел этот фильм?" }
    ],
    quiz: [
      {
        question: "Я сегодня уже поел. Какое время?",
        options: ["Indefinido", "Perfecto Compuesto", "Imperfecto", "Pluscuamperfecto"],
        correct: 1,
        hint: "hoy (сегодня) — сигнал Perfecto Compuesto: he comido"
      },
      {
        question: "На этой неделе я посмотрел 3 фильма. Какое время?",
        options: ["Indefinido", "Perfecto Compuesto", "Imperfecto", "Pluscuamperfecto"],
        correct: 1,
        hint: "esta semana (на этой неделе) — сигнал Perfecto Compuesto"
      },
      {
        question: "¿___ estado alguna vez en España? (tú)",
        options: ["Has", "Habías", "Hubo", "Hube"],
        correct: 0,
        hint: "alguna vez (когда-нибудь) + Perfecto Compuesto: ¿Has estado alguna vez...?"
      },
      {
        question: "Он никогда в жизни не видел такого. Выберите правильный вариант:",
        options: ["nunca vio", "nunca ha visto", "nunca veía", "nunca verá"],
        correct: 1,
        hint: "nunca (никогда) + Perfecto Compuesto: nunca ha visto"
      },
      {
        question: "Я ещё не закончил (todavía no, terminar, yo)",
        options: ["Todavía no terminé", "Todavía no he terminado", "Todavía no terminaba", "Todavía no terminaré"],
        correct: 1,
        hint: "todavía no (ещё не) → Perfecto Compuesto: todavía no he terminado"
      },
      {
        question: "В этом году мы много работали (este año, trabajar)",
        options: ["Este año trabajamos mucho", "Este año hemos trabajado mucho", "Este año trabajábamos mucho", "Este año habíamos trabajado mucho"],
        correct: 1,
        hint: "este año (в этом году) — незавершённый период → Perfecto Compuesto: hemos trabajado"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  ГРУППА 4 — Pluscuamperfecto
  // ══════════════════════════════════════════════════════════════

  {
    id: 13,
    name: "Ф13: Pluscuamperfecto — образование",
    shortName: "Pluscuamperf.: форма",
    emoji: "🏛️",
    description: "Образование Pluscuamperfecto: Imperfecto от haber + причастие",
    rule: "había / habías / había / habíamos / habíais / habían + participio pasado",
    example: "Cuando llegué, ya había comido",
    exampleRu: "Когда я пришёл, я уже поел",
    examples: [
      { es: "Yo había comido", ru: "Я (уже) поел (до другого прошлого)" },
      { es: "Tú habías llegado", ru: "Ты (уже) пришёл" },
      { es: "Él había salido", ru: "Он (уже) ушёл" },
      { es: "Nosotros habíamos terminado", ru: "Мы (уже) закончили" },
      { es: "Vosotros habíais visto", ru: "Вы (уже) видели" },
      { es: "Ellos habían trabajado", ru: "Они (уже) работали" },
      { es: "Ella había vivido allí", ru: "Она раньше жила там" },
      { es: "Yo nunca había viajado solo", ru: "Я никогда раньше не путешествовал один" }
    ],
    quiz: [
      {
        question: "Вспомогательный глагол в Pluscuamperfecto (yo)?",
        options: ["he", "había", "hube", "era"],
        correct: 1,
        hint: "Pluscuamperfecto = había + причастие. había = Imperfecto от haber"
      },
      {
        question: "Вспомогательный глагол (tú)?",
        options: ["has", "habías", "huiste", "eras"],
        correct: 1,
        hint: "Pluscuamperfecto tú: habías + причастие. habías = Imperfecto tú от haber"
      },
      {
        question: "Вспомогательный глагол (él/ella)?",
        options: ["ha", "había", "haya", "fue"],
        correct: 1,
        hint: "Pluscuamperfecto él/ella: había (та же форма что yo!)"
      },
      {
        question: "Вспомогательный глагол (nosotros)?",
        options: ["hemos", "habíamos", "hubimos", "éramos"],
        correct: 1,
        hint: "Pluscuamperfecto nosotros: habíamos + причastие"
      },
      {
        question: "Вспомогательный глагол (ellos)?",
        options: ["han", "habían", "hubieron", "fueron"],
        correct: 1,
        hint: "Pluscuamperfecto ellos: habían + причastие"
      },
      {
        question: "Я уже поел (до того момента) — Pluscuamperfecto",
        options: ["He comido", "Había comido", "Hube comido", "Habré comido"],
        correct: 1,
        hint: "Pluscuamperfecto: había + причастие. había comido = я поел (до другого прошлого события)"
      }
    ]
  },

  {
    id: 14,
    name: "Ф14: Pluscuamperfecto — употребление",
    shortName: "Pluscuamperf.: когда?",
    emoji: "⏮️",
    description: "Pluscuamperfecto выражает действие, завершившееся ДО другого прошлого действия",
    rule: "Cuando llegué, ya había salido — прошлое до другого прошлого",
    example: "Cuando llegué, ella ya había salido",
    exampleRu: "Когда я пришёл, она уже ушла",
    examples: [
      { es: "Cuando llegué, ella ya había salido", ru: "Когда я пришёл, она уже ушла" },
      { es: "No pude entrar porque había perdido la llave", ru: "Я не мог войти, потому что потерял ключ" },
      { es: "Me dijo que había estado en París", ru: "Он сказал, что был в Париже" },
      { es: "Nunca había visto nada igual", ru: "Я никогда не видел ничего подобного" },
      { es: "Los niños ya se habían acostado", ru: "Дети уже легли спать" },
      { es: "Cuando la conocí, ya había terminado la universidad", ru: "Когда я познакомился с ней, она уже окончила университет" },
      { es: "Él me dijo que había hecho todo", ru: "Он сказал, что сделал всё" },
      { es: "No sabía que habías llamado", ru: "Я не знал, что ты звонил" }
    ],
    quiz: [
      {
        question: "Когда я пришёл, он уже ушёл. 'Он ушёл' — какое время?",
        options: ["Indefinido", "Pluscuamperfecto", "Imperfecto", "Perfecto Compuesto"],
        correct: 1,
        hint: "Pluscuamperfecto = действие, завершившееся ДО другого прошлого момента"
      },
      {
        question: "Cuando llegué, ella ya ___ (salir)",
        options: ["salió", "había salido", "salía", "ha salido"],
        correct: 1,
        hint: "ya + Pluscuamperfecto: ya había salido. Она ушла ДО того, как я пришёл"
      },
      {
        question: "Nunca había visto nada igual. Перевод?",
        options: ["Я никогда не видел ничего подобного", "Я никогда не вижу ничего похожего", "Я никогда не увижу подобного", "Я видел это однажды"],
        correct: 0,
        hint: "Nunca había visto = я никогда раньше не видел (до этого момента в прошлом)"
      },
      {
        question: "Cuando volvió a casa, los niños ya ___ (acostarse)",
        options: ["se acostaron", "se habían acostado", "se acostaban", "se han acostado"],
        correct: 1,
        hint: "ya + Pluscuamperfecto: se habían acostado — дети уже спали к моменту возвращения"
      },
      {
        question: "Мне нужен был ключ, но я его (до этого) потерял. Время для 'потерял'?",
        options: ["Indefinido", "Pluscuamperfecto", "Imperfecto", "Perfecto Compuesto"],
        correct: 1,
        hint: "Потеря произошла ДО нужды в ключе → Pluscuamperfecto: había perdido"
      },
      {
        question: "Él me dijo que ___ (ver) esa película.",
        options: ["vio", "había visto", "veía", "ha visto"],
        correct: 1,
        hint: "dijo que + прошлое внутри → Pluscuamperfecto: había visto"
      }
    ]
  },

  {
    id: 15,
    name: "Ф15: Pluscuamperfecto + нестанд. причастия",
    shortName: "Pluscuamperf. + нестанд.",
    emoji: "🔗",
    description: "Pluscuamperfecto с нестандартными причастиями (hecho, dicho, visto...)",
    rule: "había + hecho / dicho / visto / escrito / puesto / vuelto / abierto / roto",
    example: "Cuando llegué, ya había hecho todo",
    exampleRu: "Когда я пришёл, он уже всё сделал",
    examples: [
      { es: "Había hecho todo antes de salir", ru: "Он сделал всё до выхода" },
      { es: "Me habías dicho eso antes", ru: "Ты говорил мне это раньше" },
      { es: "Nunca habían visto tanta nieve", ru: "Они никогда не видели столько снега" },
      { es: "Ya habíamos abierto la puerta", ru: "Мы уже открыли дверь" },
      { es: "Ella había puesto las flores en el jarrón", ru: "Она поставила цветы в вазу" },
      { es: "No había vuelto desde entonces", ru: "Он не возвращался с тех пор" },
      { es: "Habían escrito el informe", ru: "Они написали отчёт" },
      { es: "Ya habíamos roto el trato", ru: "Мы уже нарушили договорённость" }
    ],
    quiz: [
      {
        question: "Он уже сделал это (hacer, él)",
        options: ["Había hacido", "Había hecho", "Había haciendo", "Habría hecho"],
        correct: 1,
        hint: "hacer → hecho. Pluscuamperfecto: había hecho"
      },
      {
        question: "Она уже сказала это (decir, ella)",
        options: ["Había decido", "Había dicho", "Había diciendo", "Habría dicho"],
        correct: 1,
        hint: "decir → dicho. Pluscuamperfecto: había dicho"
      },
      {
        question: "Они уже написали письмо (escribir, ellos)",
        options: ["Habían escribido", "Habían escrito", "Habían escribiendo", "Habrían escrito"],
        correct: 1,
        hint: "escribir → escrito. Pluscuamperfecto ellos: habían escrito"
      },
      {
        question: "Мы уже вернулись (volver, nosotros)",
        options: ["Habíamos volvido", "Habíamos vuelto", "Habíamos volviendo", "Habríamos vuelto"],
        correct: 1,
        hint: "volver → vuelto. Pluscuamperfecto nosotros: habíamos vuelto"
      },
      {
        question: "Кто положил это? (poner, él)",
        options: ["Había ponido", "Había puesto", "Había ponando", "Habría puesto"],
        correct: 1,
        hint: "poner → puesto. Pluscuamperfecto: había puesto"
      },
      {
        question: "Я уже видел этот фильм (ver, yo)",
        options: ["Había veído", "Había visto", "Había viendo", "Habría visto"],
        correct: 1,
        hint: "ver → visto. Pluscuamperfecto: había visto"
      }
    ]
  },

  {
    id: 16,
    name: "Ф16: Сравнение 4 прошедших времён",
    shortName: "4 времени: сравнение",
    emoji: "⚖️",
    description: "Как выбрать нужное прошедшее время — Indefinido, Imperfecto, Perfecto Compuesto или Pluscuamperfecto",
    rule: "Indef.=завершённый факт | Imperf.=привычка/фон | Perf.Comp.=недавнее/hoy | Pluscuamp.=до другого прошлого",
    example: "Ayer comí / Antes comía / Hoy he comido / Ya había comido",
    exampleRu: "Вчера съел / Раньше ел / Сегодня ел / Уже поел (до)",
    examples: [
      { es: "Ayer comí pizza (Indefinido)", ru: "Вчера я съел пиццу — завершённый факт" },
      { es: "Antes comía pizza cada semana (Imperfecto)", ru: "Раньше каждую неделю ел — привычка" },
      { es: "Hoy he comido pizza (Perfecto Compuesto)", ru: "Сегодня я ел — связь с настоящим" },
      { es: "Cuando llegaste, yo ya había comido (Pluscuamperfecto)", ru: "Уже поел до твоего прихода" },
      { es: "Ayer llovió todo el día (Indefinido)", ru: "Вчера весь день шёл дождь — факт" },
      { es: "Cuando era niño, llovía mucho (Imperfecto)", ru: "В детстве часто шёл дождь — описание/привычка" },
      { es: "Este mes ha llovido poco (Perfecto Compuesto)", ru: "В этом месяце мало дождей — незавершённый период" },
      { es: "Cuando llegué, ya había llovido (Pluscuamperfecto)", ru: "Когда я пришёл, дождь уже прошёл" }
    ],
    quiz: [
      {
        question: "Ayer comí pizza. (Вчера я съел пиццу.) Какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 0,
        hint: "ayer (вчера) = завершённое конкретное действие → Pretérito Indefinido"
      },
      {
        question: "De niño, comía pizza cada semana. (В детстве — каждую неделю.) Какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "de niño + cada semana = привычное прошлое → Imperfecto"
      },
      {
        question: "Hoy he comido pizza. (Сегодня я ел пиццу.) Какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 2,
        hint: "hoy (сегодня) = связь с настоящим → Perfecto Compuesto"
      },
      {
        question: "Cuando llegaste, yo ya había comido. 'Я уже поел' — какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 3,
        hint: "ya había... = завершилось ДО другого прошлого → Pluscuamperfecto"
      },
      {
        question: "Описание фона, погоды в прошлом — какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Описание состояния, погоды, обстановки в прошлом → Imperfecto"
      },
      {
        question: "Este año he viajado mucho. (В этом году я много путешествовал.) Какое время?",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 2,
        hint: "este año (в этом году) — незавершённый период, связь с настоящим → Perfecto Compuesto"
      }
    ]
  }

];
