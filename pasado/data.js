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
        before: "Yo",
        after: "con ella ayer.",
        options: ["hablé", "hablaba", "hablaré", "hablado"],
        correct: 0,
        hint: "«Ayer/el lunes pasado» = сигнал Indefinido\nЗавершённое конкретное действие\nhablar + yo: habl + é = hablé"
      },
      {
        before: "Tú",
        after: "mucho ayer.",
        options: ["trabajé", "trabajaste", "trabajó", "trabajabas"],
        correct: 1,
        hint: "Indefinido tú (-AR): stem + aste\ntrabajabas = Imperfecto (привычка); trabajaste = конкретный факт\ntrabajaste"
      },
      {
        before: "Ella",
        after: "dos horas por el parque ayer.",
        options: ["caminé", "caminaste", "caminó", "caminaba"],
        correct: 2,
        hint: "Indefinido ella (-AR): stem + ó\ncaminó = завершённое действие; caminaba = привычка (Imperfecto)\ncaminar → caminó"
      },
      {
        before: "Nosotros",
        after: "tarde a la fiesta el sábado pasado.",
        options: ["llegamos", "llegábamos", "llegaron", "lleguemos"],
        correct: 0,
        hint: "Indefinido nosotros (-AR): stem + amos\n⚠️ Совпадает с Presente — контекст уточняет время\nllegar → llegamos"
      },
      {
        before: "Ayer mis amigos",
        after: "en la fiesta hasta tarde.",
        options: ["bailaron", "bailaban", "han bailado", "habían bailado"],
        correct: 0,
        hint: "«Ayer» = сигнал Indefinido\nbailaban = Imperfecto (привычка); han bailado = hoy/esta semana\nbailar + ellos: bail + aron = bailaron"
      },
      {
        before: "La semana pasada yo",
        after: "una camisa nueva.",
        options: ["compré", "compraba", "he comprado", "iba a comprar"],
        correct: 0,
        hint: "«La semana pasada» = завершённый период → Indefinido\ncompraba = привычка без даты; he comprado = esta semana\ncomprar + yo: compr + é = compré"
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
        before: "Yo",
        after: "paella anoche.",
        options: ["comé", "comí", "comía", "comeré"],
        correct: 1,
        hint: "«Ayer/anoche» = сигнал Indefinido\ncomer + yo: com + í = comí\ncomía = Imperfecto (ел регулярно)"
      },
      {
        before: "Tú",
        after: "allí tres años.",
        options: ["viví", "viviste", "vivía", "vivirás"],
        correct: 1,
        hint: "Indefinido tú (-IR): stem + iste\nviviste = завершённый конкретный период\nvivías = длящееся состояние без точки (Imperfecto)"
      },
      {
        before: "Ella",
        after: "una carta ayer.",
        options: ["escribé", "escribió", "escribía", "escribirá"],
        correct: 1,
        hint: "Indefinido ella (-IR): stem + ió\nescribió = завершённое действие; escribía = привычка\nescribir → escribió"
      },
      {
        before: "Nosotros",
        after: "el tema aquel día.",
        options: ["comprendemos", "comprendimos", "comprendíamos", "comprenderemos"],
        correct: 1,
        hint: "Indefinido nosotros (-ER): stem + imos\ncomprendíamos = длящееся состояние (Imperfecto)\ncomprender → comprendimos"
      },
      {
        before: "El martes pasado nosotros",
        after: "la lección completa.",
        options: ["comprendimos", "comprendíamos", "hemos comprendido", "habíamos comprendido"],
        correct: 0,
        hint: "«El martes pasado» = завершённый момент → Indefinido\ncomprendíamos = привычка без даты (Imperfecto)\ncomprender + nosotros: comprend + imos = comprendimos"
      },
      {
        before: "En 2019 ellos",
        after: "juntos en Buenos Aires.",
        options: ["vivimos", "vivieron", "vivían", "han vivido"],
        correct: 1,
        hint: "«En 2019» = конкретный завершённый период → Indefinido\nvivían = без точки в прошлом (Imperfecto)\nvivir + ellos: viv + ieron = vivieron"
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
        before: "Yo",
        after: "al supermercado ayer.",
        options: ["iba", "fui", "voy", "iría"],
        correct: 1,
        hint: "«Ayer/el lunes» = сигнал Indefinido\nir + yo: fui\n⚠️ ser и ir → одинаковые формы — контекст решает"
      },
      {
        before: "Él",
        after: "un buen amigo durante años.",
        options: ["era", "estaba", "fue", "es"],
        correct: 2,
        hint: "ser, Indefinido él: fue\nera = длительная характеристика (Imperfecto)\nfue = конкретный факт/период"
      },
      {
        before: "Nosotros",
        after: "al parque el domingo pasado.",
        options: ["íbamos", "fuimos", "vamos", "éramos"],
        correct: 1,
        hint: "ir, Indefinido nosotros: fuimos\níbamos = ходили регулярно (Imperfecto)\nfuimos = однократный конкретный выход"
      },
      {
        before: "Yo",
        after: "los deberes anoche.",
        options: ["hacé", "hice", "hacía", "haré"],
        correct: 1,
        hint: "hacer, Indefinido yo: hice\nhacía = делал каждый день (Imperfecto)\nhice = однократный завершённый факт"
      },
      {
        before: "¿Qué",
        after: "ayer por la tarde?",
        options: ["hiciste", "hacías", "has hecho", "habías hecho"],
        correct: 0,
        hint: "«Ayer» = сигнал Indefinido\nhacías = привычное действие (Imperfecto); has hecho = hoy/esta semana\nhacer + tú: hiciste (⚠️ c→z только у él: hizo)"
      },
      {
        before: "El verano pasado nosotros",
        after: "a la playa tres veces.",
        options: ["fuimos", "íbamos", "hemos ido", "habíamos ido"],
        correct: 0,
        hint: "«El verano pasado» + «tres veces» = факт с числом → Indefinido\níbamos = привычка без счёта (Imperfecto)\nir + nosotros: fuimos"
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
        before: "Yo",
        after: "terminar el trabajo aquel día.",
        options: ["podé", "podí", "pude", "podía"],
        correct: 2,
        hint: "poder, Indefinido yo: pude\npodía = мог вообще/регулярно (Imperfecto)\npude = в этот конкретный момент смог\npod- → pud-"
      },
      {
        before: "Yo",
        after: "en casa todo el día ayer.",
        options: ["estaba", "estuve", "esté", "estaré"],
        correct: 1,
        hint: "estar, Indefinido yo: estuve\nestaba = находился фоново (Imperfecto)\nestuve = конкретный завершённый период\nestuv-"
      },
      {
        before: "Yo",
        after: "llamarte el otro día.",
        options: ["quería", "quise", "querí", "querré"],
        correct: 1,
        hint: "querer, Indefinido yo: quise\nquería = длящееся желание; quise = желание в конкретный момент\nquer- → quis-"
      },
      {
        before: "Yo",
        after: "a verte ayer.",
        options: ["venía", "vine", "vengué", "vendré"],
        correct: 1,
        hint: "venir, Indefinido yo: vine\nvenía = приходил регулярно (Imperfecto)\nven- → vin-"
      },
      {
        before: "Anteayer yo",
        after: "la noticia y me sorprendí mucho.",
        options: ["sabía", "supe", "sabé", "he sabido"],
        correct: 1,
        hint: "«Anteayer» = сигнал Indefinido\nsabía = «знал» (состояние); supe = «узнал» (момент открытия)\nsaber + yo: sab- → sup- → supe"
      },
      {
        before: "Ayer ellos",
        after: "a la reunión sin avisar.",
        options: ["venían", "vinieron", "han venido", "habían venido"],
        correct: 1,
        hint: "«Ayer» = сигнал Indefinido\nvenían = приходили регулярно (Imperfecto)\nvenir + ellos: ven- → vin- → vinieron"
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
        before: "Yo",
        after: "mucho antes.",
        options: ["hablé", "hablaba", "hablo", "hablaré"],
        correct: 1,
        hint: "«Antes/раньше» = сигнал Imperfecto\nhablé = конкретный факт (Indefinido); hablaba = привычка/состояние\nhablar + yo: habl + aba = hablaba"
      },
      {
        before: "Tú",
        after: "cada día sin descanso.",
        options: ["trabajaste", "trabajabas", "trabajas", "trabajarás"],
        correct: 1,
        hint: "«Cada día» = сигнал Imperfecto (повторяющееся)\ntrabajaste = однократный факт; trabajabas = регулярная привычка\ntrabajabas"
      },
      {
        before: "Ella",
        after: "siempre en la cocina.",
        options: ["cantó", "cantaba", "canta", "cantará"],
        correct: 1,
        hint: "«Siempre» = сигнал Imperfecto\ncantó = один раз спела; cantaba = всегда/регулярно\ncantar + ella: cant + aba = cantaba"
      },
      {
        before: "Nosotros",
        after: "ir al cine cuando éramos jóvenes.",
        options: ["amamos", "amábamos", "amaremos", "hemos amado"],
        correct: 1,
        hint: "Предпочтение/привычка в прошлом → Imperfecto\namar + nosotros: am + ábamos = amábamos\n⚠️ ударение: ÁBamos"
      },
      {
        before: "Cada verano nosotros",
        after: "por la orilla del río.",
        options: ["caminamos", "caminábamos", "hemos caminado", "caminaremos"],
        correct: 1,
        hint: "«Cada verano» = повторяющееся действие → Imperfecto\ncaminamos = один конкретный раз (Indefinido)\ncaminar + nosotros: camin + ábamos = caminábamos"
      },
      {
        before: "Cuando llegué a casa, ella todavía",
        after: "la cena.",
        options: ["cocinó", "cocinaba", "ha cocinado", "cocinará"],
        correct: 1,
        hint: "Фоновое длящееся действие → Imperfecto\n«Cuando llegué» (Indefinido) застаёт «cocinaba» в процессе\ncocinar + ella: cocin + aba = cocinaba"
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
        before: "Yo",
        after: "mucho antes.",
        options: ["comí", "comía", "como", "comeré"],
        correct: 1,
        hint: "«Antes/раньше» = сигнал Imperfecto\ncomí = однократно поел; comía = ел регулярно\ncomer + yo: com + ía = comía"
      },
      {
        before: "Tú",
        after: "allí cuando eras niño.",
        options: ["viviste", "vivías", "vives", "vivirás"],
        correct: 1,
        hint: "Длительное состояние без конкретной точки → Imperfecto\nviviste = жил конкретный период (Indefinido)\nvivir + tú: viv + ías = vivías"
      },
      {
        before: "Él",
        after: "siempre la respuesta correcta.",
        options: ["supo", "sabía", "sabe", "sabrá"],
        correct: 1,
        hint: "«Знание» = состояние → Imperfecto\nsupo = «узнал» (момент открытия, Indefinido)\nsaber + él: sab + ía = sabía"
      },
      {
        before: "Nosotros",
        after: "cada día en aquella época.",
        options: ["leímos", "leíamos", "leemos", "leeremos"],
        correct: 1,
        hint: "«Cada día» = сигнал Imperfecto (привычка)\nleímos = прочитали конкретный раз (Indefinido)\nleer + nosotros: le + íamos = leíamos"
      },
      {
        before: "Cuando éramos jóvenes, nosotros",
        after: "en el campo.",
        options: ["vivimos", "vivíamos", "hemos vivido", "habíamos vivido"],
        correct: 1,
        hint: "«Cuando éramos jóvenes» = длительное прошлое состояние → Imperfecto\nvivimos = факт с конкретной точкой (Indefinido)\nvivir + nosotros: viv + íamos = vivíamos"
      },
      {
        before: "El perro",
        after: "en su cama cada noche.",
        options: ["durmió", "dormía", "ha dormido", "habrá dormido"],
        correct: 1,
        hint: "«Cada noche» = повторяющаяся привычка → Imperfecto\ndurmió = один конкретный раз (Indefinido)\ndormir + él: dorm + ía = dormía"
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
        before: "Yo",
        after: "muy feliz en aquella época.",
        options: ["fui", "era", "soy", "seré"],
        correct: 1,
        hint: "Длительное состояние/описание → Imperfecto\nfui = конкретный факт (Indefinido)\nser + yo: era"
      },
      {
        before: "Ella",
        after: "una persona muy amable antes.",
        options: ["fue", "era", "es", "será"],
        correct: 1,
        hint: "Характеристика/описание человека в прошлом → Imperfecto\nfue = была (завершённый факт: умерла, изменилась)\nser + ella: era (та же форма что yo)"
      },
      {
        before: "Nosotros",
        after: "buenos amigos de niños.",
        options: ["fuimos", "éramos", "somos", "seremos"],
        correct: 1,
        hint: "Длительная характеристика → Imperfecto\nfuimos = были (конкретный период, завершён)\nser + nosotros: éramos ⚠️ ударение: ÉRamos"
      },
      {
        before: "Yo",
        after: "al colegio a pie todos los días.",
        options: ["fui", "iba", "voy", "iré"],
        correct: 1,
        hint: "Регулярная привычка → Imperfecto\nfui = однажды пошёл (Indefinido)\nir + yo: iba (основа ib-, не -AR)"
      },
      {
        before: "De niña ella siempre",
        after: "al parque con su abuela.",
        options: ["fue", "iba", "ha ido", "irá"],
        correct: 1,
        hint: "«De niña + siempre» = привычка в детстве → Imperfecto\nfue = однократный конкретный выход (Indefinido)\nir + ella: iba"
      },
      {
        before: "Antes yo siempre",
        after: "las noticias por la noche.",
        options: ["vi", "veía", "he visto", "vería"],
        correct: 1,
        hint: "«Antes + siempre» = регулярная привычка → Imperfecto\nvi = один раз посмотрел (Indefinido)\nver + yo: ve + ía = veía"
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
        before: "De niño yo jugaba al fútbol cada día. Este ejemplo corresponde al",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Imperfecto для ПРИВЫЧНЫХ прошлых действий: 'каждый день, всегда, раньше...'"
      },
      {
        before: "Llovía y hacía frío. Esta descripción del pasado corresponde al",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Imperfecto рисует ФОНОВУЮ картину: погода, обстановка, описания"
      },
      {
        before: "Tenía 10 años cuando empecé a estudiar. El tiempo de «tenía» es el",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Presente"],
        correct: 1,
        hint: "Возраст в прошлом: tener + Imperfecto. Tenía 10 años cuando..."
      },
      {
        before: "Leía un libro cuando sonó el teléfono. El tiempo de «leía» es el",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "Imperfecto = длящееся ФОНОВОЕ действие. Indefinido = конкретный момент (зазвонил)"
      },
      {
        before: "Antes, ella siempre",
        after: "en ese mercado.",
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
        before: "Yo ya",
        after: "comido esta mañana.",
        options: ["tengo", "he", "hube", "había"],
        correct: 1,
        hint: "Perfecto Compuesto = haber + причастие\n«Ya/hoy» + связь с настоящим → Perfecto Compuesto\nyo: he comido"
      },
      {
        before: "¿Tú",
        after: "visto esto hoy?",
        options: ["tienes", "has", "habías", "hubo"],
        correct: 1,
        hint: "Perfecto Compuesto tú: has + причастие\n¿Has visto esto? — вопрос об опыте\nhabías = Pluscuamperfecto (ещё дальше в прошлом)"
      },
      {
        before: "Ella ya",
        after: "llegado hoy.",
        options: ["tiene", "ha", "había", "hube"],
        correct: 1,
        hint: "Perfecto Compuesto ella: ha + причастие\nha = Perfecto Comp. (связь с сейчас)\nhabía = Pluscuamperfecto"
      },
      {
        before: "Nosotros",
        after: "trabajado mucho esta semana.",
        options: ["tenemos", "hemos", "habíamos", "hubimos"],
        correct: 1,
        hint: "Perfecto Compuesto nosotros: hemos + причастие\nhabíamos = Pluscuamperfecto\nhemos trabajado"
      },
      {
        before: "Hoy vosotros",
        after: "una película increíble.",
        options: ["visteis", "veíais", "habéis visto", "habíais visto"],
        correct: 2,
        hint: "«Hoy» = сигнал Perfecto Compuesto\nvisteis = Indefinido (завершённый день прошлого)\nPerfecto Comp. vosotros: habéis + visto"
      },
      {
        before: "Este mes ellos",
        after: "tres veces.",
        options: ["salieron", "salían", "han salido", "habían salido"],
        correct: 2,
        hint: "«Este mes» = незавершённый текущий период → Perfecto Compuesto\nsalieron = Indefinido (el mes pasado)\nhan + salido (нестанд. причастие)"
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
        before: "Yo he",
        after: "con el director hoy.",
        options: ["hablado", "hablido", "habliendo", "hablando"],
        correct: 0,
        hint: "-AR глаголы → причастие -ado\nhablar → habl + ado = hablado\nhablando = герундий (сейчас говорит, не причастие!)"
      },
      {
        before: "Ella ha",
        after: "toda la pizza esta tarde.",
        options: ["comado", "comido", "comiendo", "comerdo"],
        correct: 1,
        hint: "-ER глаголы → причастие -ido\ncomer → com + ido = comido\ncomiendo = герундий"
      },
      {
        before: "Ellos han",
        after: "juntos este año.",
        options: ["vivado", "vivido", "viviendo", "vivirdo"],
        correct: 1,
        hint: "-IR глаголы → причастие -ido\nvivir → viv + ido = vivido\nviviendo = герундий"
      },
      {
        before: "Hoy por la mañana,",
        after: "con el director sobre el proyecto.",
        options: ["He hablado", "He hablido", "Hablo", "Hablé"],
        correct: 0,
        hint: "he + hablado (-AR → -ado)\nHablé = Indefinido (конкретный момент прошлого)\nHe hablado = связь с настоящим"
      },
      {
        before: "Esta semana yo",
        after: "mucho.",
        options: ["trabajé", "trabajaba", "he trabajado", "había trabajado"],
        correct: 2,
        hint: "«Esta semana» = незавершённый текущий период → Perfecto Compuesto\ntrabajé = Indefinido (la semana pasada)\nhe + trabajado (-AR → -ado)"
      },
      {
        before: "Ellos nunca",
        after: "en España.",
        options: ["vivieron", "vivían", "han vivido", "habían vivido"],
        correct: 2,
        hint: "«Nunca» + жизненный опыт → Perfecto Compuesto\nvivieron = факт Indefinido; habían vivido = Pluscuamperfecto\nvivir → vivido (-IR → -ido); han + vivido"
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
        before: "Yo he",
        after: "todo el trabajo hoy.",
        options: ["hacido", "hachado", "hecho", "hacendo"],
        correct: 2,
        hint: "hacer → hecho (нестандартное!). He hecho = я сделал"
      },
      {
        before: "Él me ha",
        after: "la verdad hoy.",
        options: ["decido", "dicho", "deciendo", "dicido"],
        correct: 1,
        hint: "decir → dicho. He dicho = я сказал"
      },
      {
        before: "Nosotros hemos",
        after: "esa película esta semana.",
        options: ["veído", "visto", "viendo", "verdo"],
        correct: 1,
        hint: "ver → visto. He visto = я видел"
      },
      {
        before: "Ella ha",
        after: "una carta hoy.",
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
        before: "Hoy yo ya he comido. Este ejemplo corresponde al",
        after: ".",
        options: ["Indefinido", "Perfecto Compuesto", "Imperfecto", "Pluscuamperfecto"],
        correct: 1,
        hint: "hoy (сегодня) — сигнал Perfecto Compuesto: he comido"
      },
      {
        before: "Esta semana he visto tres películas. Este tiempo verbal es el",
        after: ".",
        options: ["Indefinido", "Perfecto Compuesto", "Imperfecto", "Pluscuamperfecto"],
        correct: 1,
        hint: "esta semana (на этой неделе) — сигнал Perfecto Compuesto"
      },
      {
        before: "¿",
        after: "estado alguna vez en España?",
        options: ["Has", "Habías", "Hubo", "Hube"],
        correct: 0,
        hint: "alguna vez (когда-нибудь) + Perfecto Compuesto: ¿Has estado alguna vez...?"
      },
      {
        before: "Él",
        after: "nada así en su vida.",
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
        before: "Cuando llegué, yo ya",
        after: "comido.",
        options: ["he", "había", "hube", "era"],
        correct: 1,
        hint: "Pluscuamperfecto = había + причастие. había = Imperfecto от haber"
      },
      {
        before: "Cuando llegaste, tú ya",
        after: "terminado.",
        options: ["has", "habías", "huiste", "eras"],
        correct: 1,
        hint: "Pluscuamperfecto tú: habías + причастие. habías = Imperfecto tú от haber"
      },
      {
        before: "Cuando llegué, él ya",
        after: "salido.",
        options: ["ha", "había", "haya", "fue"],
        correct: 1,
        hint: "Pluscuamperfecto él/ella: había (та же форма что yo!)"
      },
      {
        before: "Cuando llegaron, nosotros ya",
        after: "terminado todo.",
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
        before: "Cuando llegué, él ya había salido. El tiempo de «había salido» es el",
        after: ".",
        options: ["Indefinido", "Pluscuamperfecto", "Imperfecto", "Perfecto Compuesto"],
        correct: 1,
        hint: "Pluscuamperfecto = действие, завершившееся ДО другого прошлого момента"
      },
      {
        before: "Cuando llegué, ella ya",
        after: "de casa.",
        options: ["salió", "había salido", "salía", "ha salido"],
        correct: 1,
        hint: "ya + Pluscuamperfecto: ya había salido. Она ушла ДО того, как я пришёл"
      },
      {
        before: "«Nunca había visto nada igual» significa",
        after: ".",
        options: ["Я никогда не видел ничего подобного", "Я никогда не вижу ничего похожего", "Я никогда не увижу подобного", "Я видел это однажды"],
        correct: 0,
        hint: "Nunca había visto = я никогда раньше не видел (до этого момента в прошлом)"
      },
      {
        before: "Cuando volvió a casa, los niños ya",
        after: ".",
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
        before: "Él me dijo que",
        after: "esa película.",
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
        before: "Cuando llegué, él ya",
        after: "todo.",
        options: ["Había hacido", "Había hecho", "Había haciendo", "Habría hecho"],
        correct: 1,
        hint: "hacer → hecho. Pluscuamperfecto: había hecho"
      },
      {
        before: "Cuando llegué, ella ya",
        after: "la noticia.",
        options: ["Había decido", "Había dicho", "Había diciendo", "Habría dicho"],
        correct: 1,
        hint: "decir → dicho. Pluscuamperfecto: había dicho"
      },
      {
        before: "Cuando llegué, ellos ya",
        after: "el informe.",
        options: ["Habían escribido", "Habían escrito", "Habían escribiendo", "Habrían escrito"],
        correct: 1,
        hint: "escribir → escrito. Pluscuamperfecto ellos: habían escrito"
      },
      {
        before: "Cuando nos llamaron, nosotros ya",
        after: "a casa.",
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
        before: "Ayer comí pizza. El tiempo verbal es el",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 0,
        hint: "ayer (вчера) = завершённое конкретное действие → Pretérito Indefinido"
      },
      {
        before: "De niño comía pizza cada semana. El tiempo verbal es el",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 1,
        hint: "de niño + cada semana = привычное прошлое → Imperfecto"
      },
      {
        before: "Hoy he comido pizza. El tiempo verbal es el",
        after: ".",
        options: ["Indefinido", "Imperfecto", "Perfecto Compuesto", "Pluscuamperfecto"],
        correct: 2,
        hint: "hoy (сегодня) = связь с настоящим → Perfecto Compuesto"
      },
      {
        before: "Cuando llegaste, yo ya había comido. El tiempo de «había comido» es el",
        after: ".",
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

// ══════════════════════════════════════════════════════════════
//  PASADO_INLINE — 28 предложений для Inline режима (7 × 4 времени)
// ══════════════════════════════════════════════════════════════

const PASADO_INLINE = [

  // ─── Indefinido (7 предложений) ──────────────────────────────────────────────
  {
    before: "Ayer yo",
    after: "al mercado con mi familia.",
    options: ["fui", "iba", "he ido", "había ido"],
    correct: 0,
    hint: "Indefinido: ayer + конкретное завершённое действие → fui",
    tts: "Ayer yo fui al mercado con mi familia."
  },
  {
    before: "La semana pasada ella",
    after: "una carta muy larga.",
    options: ["escribió", "escribía", "ha escrito", "había escrito"],
    correct: 0,
    hint: "Indefinido: la semana pasada + факт → escribió",
    tts: "La semana pasada ella escribió una carta muy larga."
  },
  {
    before: "Esta mañana nosotros",
    after: "el desayuno juntos.",
    options: ["hemos tomado", "tomamos", "tomábamos", "habíamos tomado"],
    correct: 0,
    hint: "Perfecto Compuesto: esta mañana (незавершённый период сегодня) → hemos tomado",
    tts: "Esta mañana nosotros hemos tomado el desayuno juntos."
  },
  {
    before: "El año pasado ellos",
    after: "a toda la familia.",
    options: ["visitaron", "visitaban", "han visitado", "habían visitado"],
    correct: 0,
    hint: "Indefinido: el año pasado (завершённый год) → visitaron",
    tts: "El año pasado ellos visitaron a toda la familia."
  },
  {
    before: "Ayer tú",
    after: "muy cansado después del trabajo.",
    options: ["estuviste", "estabas", "has estado", "habías estado"],
    correct: 0,
    hint: "Indefinido: ayer + конкретный момент → estuviste",
    tts: "Ayer tú estuviste muy cansado después del trabajo."
  },
  {
    before: "El lunes pasado María",
    after: "al médico por la mañana.",
    options: ["fue", "iba", "ha ido", "había ido"],
    correct: 0,
    hint: "Indefinido: el lunes pasado + конкретное действие → fue",
    tts: "El lunes pasado María fue al médico por la mañana."
  },
  {
    before: "Anoche yo no",
    after: "dormir bien.",
    options: ["pude", "podía", "he podido", "había podido"],
    correct: 0,
    hint: "Indefinido: anoche + конкретный факт → pude",
    tts: "Anoche yo no pude dormir bien."
  },

  // ─── Imperfecto (7 предложений) ──────────────────────────────────────────────
  {
    before: "Cuando era niño, yo",
    after: "al fútbol cada tarde.",
    options: ["jugaba", "jugué", "he jugado", "había jugado"],
    correct: 0,
    hint: "Imperfecto: cuando era niño + каждый день → jugaba (привычка)",
    tts: "Cuando era niño, yo jugaba al fútbol cada tarde."
  },
  {
    before: "De pequeña ella siempre",
    after: "libros de aventuras.",
    options: ["leía", "leyó", "ha leído", "había leído"],
    correct: 0,
    hint: "Imperfecto: siempre + привычное прошлое → leía",
    tts: "De pequeña ella siempre leía libros de aventuras."
  },
  {
    before: "Antes nosotros",
    after: "en una ciudad pequeña.",
    options: ["vivíamos", "vivimos", "hemos vivido", "habíamos vivido"],
    correct: 0,
    hint: "Imperfecto: antes + длительное состояние → vivíamos",
    tts: "Antes nosotros vivíamos en una ciudad pequeña."
  },
  {
    before: "Cuando llegué, él",
    after: "música tranquila.",
    options: ["escuchaba", "escuchó", "ha escuchado", "había escuchado"],
    correct: 0,
    hint: "Imperfecto: фоновое длящееся действие (когда я пришёл) → escuchaba",
    tts: "Cuando llegué, él escuchaba música tranquila."
  },
  {
    before: "Los niños",
    after: "en el parque todos los sábados.",
    options: ["jugaban", "jugaron", "han jugado", "habían jugado"],
    correct: 0,
    hint: "Imperfecto: todos los sábados + привычка → jugaban",
    tts: "Los niños jugaban en el parque todos los sábados."
  },
  {
    before: "Aquella noche",
    after: "mucho frío y llovía sin parar.",
    options: ["hacía", "hizo", "ha hecho", "había hecho"],
    correct: 0,
    hint: "Imperfecto: описание фона, погоды → hacía",
    tts: "Aquella noche hacía mucho frío y llovía sin parar."
  },
  {
    before: "Cuando era joven, ella",
    after: "muy bien la guitarra.",
    options: ["tocaba", "tocó", "ha tocado", "había tocado"],
    correct: 0,
    hint: "Imperfecto: cuando era joven + привычный навык → tocaba",
    tts: "Cuando era joven, ella tocaba muy bien la guitarra."
  },

  // ─── Perfecto Compuesto (7 предложений) ──────────────────────────────────────
  {
    before: "Hoy yo",
    after: "tres tazas de café.",
    options: ["he tomado", "tomé", "tomaba", "había tomado"],
    correct: 0,
    hint: "Perfecto Compuesto: hoy (незавершённый период) → he tomado",
    tts: "Hoy yo he tomado tres tazas de café."
  },
  {
    before: "Esta semana nosotros",
    after: "mucho para el examen.",
    options: ["hemos estudiado", "estudiamos", "estudiábamos", "habíamos estudiado"],
    correct: 0,
    hint: "Perfecto Compuesto: esta semana + незавершённый период → hemos estudiado",
    tts: "Esta semana nosotros hemos estudiado mucho para el examen."
  },
  {
    before: "¿Alguna vez tú",
    after: "sushi japonés?",
    options: ["has probado", "probaste", "probabas", "habías probado"],
    correct: 0,
    hint: "Perfecto Compuesto: alguna vez (жизненный опыт) → has probado",
    tts: "¿Alguna vez tú has probado sushi japonés?"
  },
  {
    before: "Nunca ella",
    after: "tanto miedo en su vida.",
    options: ["ha tenido", "tuvo", "tenía", "había tenido"],
    correct: 0,
    hint: "Perfecto Compuesto: nunca + жизненный опыт → ha tenido",
    tts: "Nunca ella ha tenido tanto miedo en su vida."
  },
  {
    before: "Todavía no ellos",
    after: "la película nueva.",
    options: ["han visto", "vieron", "veían", "habían visto"],
    correct: 0,
    hint: "Perfecto Compuesto: todavía no + незавершённое → han visto",
    tts: "Todavía no ellos han visto la película nueva."
  },
  {
    before: "Este año yo",
    after: "a tres países diferentes.",
    options: ["he viajado", "viajé", "viajaba", "había viajado"],
    correct: 0,
    hint: "Perfecto Compuesto: este año (незавершённый период) → he viajado",
    tts: "Este año yo he viajado a tres países diferentes."
  },
  {
    before: "Ya ella",
    after: "la tarea antes de las seis.",
    options: ["ha terminado", "terminó", "terminaba", "había terminado"],
    correct: 0,
    hint: "Perfecto Compuesto: ya + актуальность для настоящего → ha terminado",
    tts: "Ya ella ha terminado la tarea antes de las seis."
  },

  // ─── Pluscuamperfecto (7 предложений) ────────────────────────────────────────
  {
    before: "Cuando llegué a casa, ella ya",
    after: "la cena.",
    options: ["había preparado", "preparó", "preparaba", "ha preparado"],
    correct: 0,
    hint: "Pluscuamperfecto: ya + действие ДО другого прошлого → había preparado",
    tts: "Cuando llegué a casa, ella ya había preparado la cena."
  },
  {
    before: "No pude entrar porque",
    after: "las llaves en la oficina.",
    options: ["había dejado", "dejé", "dejaba", "he dejado"],
    correct: 0,
    hint: "Pluscuamperfecto: причина в прошлом до другого прошлого → había dejado",
    tts: "No pude entrar porque había dejado las llaves en la oficina."
  },
  {
    before: "Nunca antes yo",
    after: "una ciudad tan bella.",
    options: ["había visto", "vi", "veía", "he visto"],
    correct: 0,
    hint: "Pluscuamperfecto: nunca antes + до этого момента в прошлом → había visto",
    tts: "Nunca antes yo había visto una ciudad tan bella."
  },
  {
    before: "Cuando la llamé, ella ya",
    after: "del trabajo.",
    options: ["había salido", "salió", "salía", "ha salido"],
    correct: 0,
    hint: "Pluscuamperfecto: ya + ДО момента звонка → había salido",
    tts: "Cuando la llamé, ella ya había salido del trabajo."
  },
  {
    before: "Me dijo que él",
    after: "ese libro tres veces.",
    options: ["había leído", "leyó", "leía", "ha leído"],
    correct: 0,
    hint: "Pluscuamperfecto: dijo que + действие в прошлом прошлого → había leído",
    tts: "Me dijo que él había leído ese libro tres veces."
  },
  {
    before: "Cuando llegamos, los niños ya",
    after: "a dormir.",
    options: ["se habían ido", "se fueron", "se iban", "se han ido"],
    correct: 0,
    hint: "Pluscuamperfecto: ya + ДО нашего прихода → se habían ido",
    tts: "Cuando llegamos, los niños ya se habían ido a dormir."
  },
  {
    before: "No sabía que tú",
    after: "en Madrid antes.",
    options: ["habías vivido", "viviste", "vivías", "has vivido"],
    correct: 0,
    hint: "Pluscuamperfecto: no sabía que + факт из прошлого прошлого → habías vivido",
    tts: "No sabía que tú habías vivido en Madrid antes."
  }
];

// ══════════════════════════════════════════════════════════════
//  PASADO_CLASSIFY — 48 форм/предложений для классификации
// ══════════════════════════════════════════════════════════════

const PASADO_CLASSIFY = [

  // ─── Indefinido (12) ─────────────────────────────────────────────────────────
  { text: "fui", answer: "indefinido", hint: "fui = ir/ser, Indefinido 1л. ед.ч. — конкретный факт в прошлом" },
  { text: "Ayer comí paella", answer: "indefinido", hint: "ayer + конкретное прошлое действие → Indefinido" },
  { text: "hablé", answer: "indefinido", hint: "habl + é — окончание -é = Indefinido, 1л. ед.ч." },
  { text: "llegaron tarde", answer: "indefinido", hint: "llegar + aron — окончание -aron = Indefinido, 3л. мн.ч." },
  { text: "escribió", answer: "indefinido", hint: "escrib + ió — окончание -ió = Indefinido, 3л. ед.ч." },
  { text: "hice mis deberes", answer: "indefinido", hint: "hice = hacer, нерегулярный Indefinido 1л. ед.ч." },
  { text: "El lunes pasado salí", answer: "indefinido", hint: "el lunes pasado = сигнал завершённого прошлого → Indefinido" },
  { text: "tuve que esperar", answer: "indefinido", hint: "tuve = tener, нерегулярный Indefinido" },
  { text: "vivieron juntos", answer: "indefinido", hint: "viv + ieron = Indefinido, 3л. мн.ч." },
  { text: "pude terminar", answer: "indefinido", hint: "pude = poder, нерегулярный Indefinido 1л. ед.ч." },
  { text: "bebiste mucho", answer: "indefinido", hint: "beb + iste = Indefinido tú; -iste — маркёр Indefinido" },
  { text: "El año pasado viajamos", answer: "indefinido", hint: "el año pasado (завершённый год) → Indefinido" },

  // ─── Imperfecto (12) ─────────────────────────────────────────────────────────
  { text: "iba", answer: "imperfecto", hint: "ib + a = ir, Imperfecto — ir неправильный (ib-)" },
  { text: "Antes comía mucho", answer: "imperfecto", hint: "antes + привычка → Imperfecto" },
  { text: "hablaba", answer: "imperfecto", hint: "habl + aba = Imperfecto; -aba/-abas/-aba = маркёр -AR" },
  { text: "era feliz", answer: "imperfecto", hint: "era = ser, Imperfecto — один из 3 нерегулярных глаголов" },
  { text: "Cuando era niño jugaba", answer: "imperfecto", hint: "cuando era niño + jugaba = привычное детское прошлое → Imperfecto" },
  { text: "vivían en el campo", answer: "imperfecto", hint: "viv + ían = Imperfecto -ER/-IR; -ían маркёр" },
  { text: "Siempre llegaba tarde", answer: "imperfecto", hint: "siempre + привычка → Imperfecto" },
  { text: "comía pizza cada semana", answer: "imperfecto", hint: "com + ía = Imperfecto -ER; cada semana = привычка" },
  { text: "veía la televisión", answer: "imperfecto", hint: "veía = ver, Imperfecto — ve + ía (почти правильный)" },
  { text: "Llovía y hacía frío", answer: "imperfecto", hint: "описание фона, погоды в прошлом → Imperfecto" },
  { text: "Tenía 10 años", answer: "imperfecto", hint: "возраст в прошлом: tenía = Imperfecto" },
  { text: "leíamos todos los días", answer: "imperfecto", hint: "le + íamos = Imperfecto nosotros; todos los días = привычка" },

  // ─── Perfecto Compuesto (12) ─────────────────────────────────────────────────
  { text: "he ido", answer: "perfecto", hint: "he + participio = Perfecto Compuesto" },
  { text: "Hoy hemos comido", answer: "perfecto", hint: "hoy = сигнал Perfecto Compuesto" },
  { text: "ha llegado", answer: "perfecto", hint: "ha + participio = Perfecto Compuesto 3л. ед.ч." },
  { text: "¿Alguna vez has probado?", answer: "perfecto", hint: "alguna vez = сигнал жизненного опыта → Perfecto Compuesto" },
  { text: "Nunca he visto eso", answer: "perfecto", hint: "nunca + жизненный опыт → Perfecto Compuesto" },
  { text: "Esta semana han trabajado", answer: "perfecto", hint: "esta semana = незавершённый период → Perfecto Compuesto" },
  { text: "Todavía no he terminado", answer: "perfecto", hint: "todavía no = сигнал Perfecto Compuesto" },
  { text: "han salido ya", answer: "perfecto", hint: "han + participio = Perfecto Compuesto 3л. мн.ч." },
  { text: "Este año he viajado mucho", answer: "perfecto", hint: "este año (незавершённый год) → Perfecto Compuesto" },
  { text: "habéis visto eso", answer: "perfecto", hint: "habéis + participio = Perfecto Compuesto vosotros" },
  { text: "Últimamente he dormido mal", answer: "perfecto", hint: "últimamente = сигнал Perfecto Compuesto" },
  { text: "hemos hecho todo", answer: "perfecto", hint: "hemos + hecho (нестанд. причастие) = Perfecto Compuesto" },

  // ─── Pluscuamperfecto (12) ───────────────────────────────────────────────────
  { text: "había ido", answer: "pluscuamperfecto", hint: "había + participio = Pluscuamperfecto" },
  { text: "Cuando llegué, ya había salido", answer: "pluscuamperfecto", hint: "ya había + preterito = классическая схема Pluscuamperfecto" },
  { text: "habías comido", answer: "pluscuamperfecto", hint: "habías + participio = Pluscuamperfecto tú" },
  { text: "Nunca antes había visto", answer: "pluscuamperfecto", hint: "nunca antes + había = Pluscuamperfecto" },
  { text: "habían terminado", answer: "pluscuamperfecto", hint: "habían + participio = Pluscuamperfecto 3л. мн.ч." },
  { text: "habíamos llegado", answer: "pluscuamperfecto", hint: "habíamos + participio = Pluscuamperfecto nosotros" },
  { text: "Me dijo que había hecho", answer: "pluscuamperfecto", hint: "dijo que + había = прошлое внутри прошлого → Pluscuamperfecto" },
  { text: "ya se habían ido", answer: "pluscuamperfecto", hint: "ya se habían = Pluscuamperfecto, действие завершилось ДО" },
  { text: "No sabía que habías llamado", answer: "pluscuamperfecto", hint: "no sabía que + habías = Pluscuamperfecto" },
  { text: "había vivido allí antes", answer: "pluscuamperfecto", hint: "había + vivido = Pluscuamperfecto, prежнее состояние" },
  { text: "habíais visto esa película", answer: "pluscuamperfecto", hint: "habíais + participio = Pluscuamperfecto vosotros" },
  { text: "No pude porque había perdido", answer: "pluscuamperfecto", hint: "había perdido = причина в прошлом до другого прошлого → Pluscuamperfecto" }
];
