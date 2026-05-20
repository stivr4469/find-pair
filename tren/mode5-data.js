/**
 * Tren Ir/Venir/Llegar - Mode 5: Full Motion Data (80 Questions)
 * СТРОГО: Только глаголы движения и связанные предлоги.
 * Поле translation: Полный русский перевод без пропусков.
 * ЛОКАЛИЗАЦИЯ: Испания и Латинская Америка (без упоминания РФ).
 */

const MODE5_DATA = [
    // === КАТЕГОРИЯ 1: IR vs VENIR (Дейктический центр) - 20 вопросов ===
    {
        context: "Ты дома в Мадриде. Звонишь другу и приглашаешь его к себе.",
        question: "¿Quieres _____ a mi casa esta noche?",
        correct: "venir",
        options: ["ir", "venir", "llegar"],
        translation: "Хочешь прийти ко мне домой сегодня вечером?",
        explanation: "Используем VENIR, так как цель движения совпадает с местоположением говорящего."
    },
    {
        context: "Ты в офисе в Барселоне. Говоришь коллеге, что завтра не придешь.",
        question: "Mañana no _____ a la oficina.",
        correct: "vengo",
        options: ["voy", "vengo", "llega"],
        translation: "Завтра я не приду в офис.",
        explanation: "VENIR, так как ты говоришь о месте, в котором находишься сейчас."
    },
    {
        context: "Кто-то стучит в дверь твоего дома в Севилье. Ты отвечаешь 'Иду!'.",
        question: "¡_____!",
        correct: "Voy",
        options: ["¡Voy!", "¡Vengo!", "¡Llego!"],
        translation: "Иду!",
        explanation: "В испанском на зов всегда отвечают '¡Voy!' (движение к собеседнику)."
    },
    {
        context: "Ты звонишь маме из Валенсии. Мама в Барселоне. Ты говоришь, что поедешь к ней.",
        question: "El lunes _____ a Barcelona para verte.",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "В понедельник я поеду в Барселону, чтобы увидеться с тобой.",
        explanation: "IR, так как ты движешься ОТ себя к маме, в место, где тебя сейчас нет."
    },
    {
        context: "Ты на фиесте в Гранаде. Звонишь другу, чтобы он тоже пришел сюда.",
        question: "La fiesta es genial. ¡_____ ahora mismo!",
        correct: "Ven",
        options: ["Ve", "Ven", "Llega"],
        translation: "Вечеринка классная. Приходи прямо сейчас!",
        explanation: "VEN (императив Venir), так как ты приглашаешь человека туда, где находишься сам."
    },
    {
        context: "Ты в Мадриде. Говоришь, что друзья из Франции приедут в Мадрид.",
        question: "Mis amigos _____ a Madrid en agosto.",
        correct: "vienen",
        options: ["van", "vienen", "llegan"],
        translation: "Мои друзья приезжают в Мадрид в августе.",
        explanation: "VENIR, так как они движутся К тебе (в Мадрид)."
    },
    {
        context: "Ты в Лондоне. Рассказываешь, что поедешь в Испанию к друзьям.",
        question: "En agosto _____ a España a visitar a mis amigos.",
        correct: "voy",
        options: ["voy", "vienen", "llegan"],
        translation: "В августе я поеду в Испанию навестить друзей.",
        explanation: "IR, так как ты движешься ОТ себя (из Лондона)."
    },
    {
        context: "Ты договорился встретиться с другом в парке Ретиро. Ты уже там и звонишь ему.",
        question: "¿Dónde estás? Yo ya _____ al parque.",
        correct: "he llegado",
        options: ["he ido", "he venido", "he llegado"],
        translation: "Ты где? Я уже пришел в парк.",
        explanation: "LLEGAR фиксирует результат — факт прибытия в точку."
    },
    {
        context: "Ты в Мадриде. Рафаэль (в Париже) говорит, что завтра будет в Мадриде.",
        question: "Rafael me dijo: '_____ a Madrid mañana'.",
        correct: "Voy",
        options: ["Voy", "Vengo", "Llego"],
        translation: "Рафаэль мне сказал: 'Я еду в Мадрид завтра'.",
        explanation: "Рафаэль использует IR, потому что для него это движение ОТ себя (из Парижа)."
    },
    {
        context: "Ты ждешь курьера в Толедо. Он звонит и говорит, что уже подходит.",
        question: "El repartidor dice: '_____ a su casa en 5 minutos'.",
        correct: "Voy",
        options: ["Voy", "Vengo", "Llego"],
        translation: "Курьер говорит: 'Я буду у вашего дома через 5 минут'.",
        explanation: "Курьер движется к тебе, но для него это вектор ОТ его текущей позиции -> IR."
    },
    {
        context: "Ты приглашаешь гостя зайти внутрь твоего дома в Бильбао.",
        question: "¡_____ adelante, por favor!",
        correct: "Pasa",
        options: ["Ve", "Ven", "Pasa"],
        translation: "Проходи вперед, пожалуйста!",
        explanation: "PASAR используется для приглашения пройти внутрь помещения."
    },
    {
        context: "Ты хочешь спросить друга, когда он вернется из Ибицы.",
        question: "¿Cuándo _____ de Ibiza?",
        correct: "vuelves",
        options: ["vas", "vienes", "vuelves"],
        translation: "Когда ты возвращаешься из Ибицы?",
        explanation: "VOLVER — возвращаться в исходную точку."
    },
    {
        context: "Мама зовет тебя обедать. Ты в своей комнате, она в столовой. Ты идешь к ней.",
        question: "¡Ya _____!",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Уже иду!",
        explanation: "Движение к собеседнику — это IR (Voy)."
    },
    {
        context: "Ты в Барселоне. Спрашиваешь друга, когда он приедет к тебе.",
        question: "¿Cuándo _____ a Barcelona?",
        correct: "vienes",
        options: ["vas", "vienes", "llegas"],
        translation: "Когда ты приедешь в Барселону?",
        explanation: "VENIR, так как ты уже в Барселоне."
    },
    {
        context: "Ты в Мадриде. Спрашиваешь друга, когда он приедет в Барселону (вас обоих там нет).",
        question: "¿Cuándo _____ a Barcelona?",
        correct: "llegas",
        options: ["vas", "vienes", "llegas"],
        translation: "Когда ты приедешь в Барселону?",
        explanation: "LLEGAR, так как ты констатируешь факт прибытия в точку, где тебя нет."
    },
    {
        context: "Ты в кино в Малаге. Звонишь другу и говоришь, что уже на месте.",
        question: "Ya _____ al cine. ¿Y tú?",
        correct: "he llegado",
        options: ["he ido", "he venido", "he llegado"],
        translation: "Я уже пришел в кино. А ты?",
        explanation: "LLEGAR — результат достижения цели."
    },
    {
        context: "Друг приглашает тебя пойти с ним на матч Реал Мадрид.",
        question: "¿_____ conmigo al estadio?",
        correct: "Vienes",
        options: ["Vas", "Vienes", "Llegas"],
        translation: "Пойдешь со мной на стадион?",
        explanation: "Приглашение 'пойти со мной' часто звучит через VENIR ('присоединиться ко мне')."
    },
    {
        context: "Ты говоришь, что пора уходить из ресторана.",
        question: "Es tarde. Me _____.",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Поздно. Я ухожу.",
        explanation: "IRSE (me voy) — покидать место."
    },
    {
        context: "Ты хочешь сказать, что Рафаэль 'свалил' с работы пораньше.",
        question: "Rafael se _____ del trabajo temprano.",
        correct: "largó",
        options: ["fue", "vino", "largó"],
        translation: "Рафаэль свалил с работы пораньше.",
        explanation: "LARGARSE — разговорный синоним 'уйти/свалить'."
    },
    {
        context: "Ты приглашаешь друга в Мадрид выпить кофе.",
        question: "_____ a Madrid a tomar un café.",
        correct: "Ven",
        options: ["Ve", "Ven", "Llega"],
        translation: "Приезжай в Мадрид выпить кофе.",
        explanation: "VEN (Venir) — движение к говорящему."
    },

    // === КАТЕГОРИЯ 2: ПРЕДЛОГИ ДВИЖЕНИЯ - 20 вопросов ===
    {
        context: "Ты едешь на работу в Барселоне на метро.",
        question: "Voy al trabajo _____ metro.",
        correct: "en",
        options: ["a", "en", "por"],
        translation: "Я езжу на работу на метро.",
        explanation: "Транспорт = предлог EN без артикля."
    },
    {
        context: "Ты едешь в аэропорт Барахас на такси.",
        question: "Vamos al aeropuerto _____ taxi.",
        correct: "en",
        options: ["en", "en el", "por"],
        translation: "Мы едем в аэропорт на такси.",
        explanation: "Запомните: en taxi, а не en el taxi (артикль не нужен)."
    },
    {
        context: "Ты гуляешь по центру пешком.",
        question: "Prefiero ir _____ pie.",
        correct: "a",
        options: ["en", "a", "con"],
        translation: "Я предпочитаю идти пешком.",
        explanation: "Ir a pie — устойчивое выражение."
    },
    {
        context: "Ты пришел в парк Гуэль прогулочным шагом.",
        question: "He venido _____.",
        correct: "andando",
        options: ["a pie", "en pie", "andando"],
        translation: "Я пришел пешком (идя).",
        explanation: "Andando — синоним 'пешком', подчеркивающий процесс ходьбы."
    },
    {
        context: "Ты идешь по набережной Валенсии.",
        question: "Voy _____ el paseo marítimo.",
        correct: "por",
        options: ["a", "en", "por"],
        translation: "Я иду по набережной.",
        explanation: "POR — движение по поверхности."
    },
    {
        context: "Ты говоришь, что ты на середине пути в Аликанте.",
        question: "_____ por la mitad del camino.",
        correct: "Voy",
        options: ["Estoy", "Voy", "Vengo"],
        translation: "Я на середине пути.",
        explanation: "IR POR — показывать прогресс в процессе."
    },
    {
        context: "Ты идешь по магазинам на Гран Виа.",
        question: "_____ de compras.",
        correct: "Voy",
        options: ["Voy", "Estoy", "Vengo"],
        translation: "Я иду за покупками.",
        explanation: "IR DE compras — цель деятельности."
    },
    {
        context: "Ты возвращаешься из университета Саламанки.",
        question: "Vengo _____ la universidad.",
        correct: "de",
        options: ["a", "de", "en"],
        translation: "Я иду из университета.",
        explanation: "DE указывает на точку исхода."
    },
    {
        context: "Ты летишь на Тенерифе.",
        question: "Viajo _____ avión.",
        correct: "en",
        options: ["en", "con", "por"],
        translation: "Я путешествую на самолете.",
        explanation: "Авиационный транспорт — тоже EN."
    },
    {
        context: "Ты идешь навестить Карлоса.",
        question: "Voy _____ Carlos.",
        correct: "a ver a",
        options: ["a visitar", "a ver a", "con"],
        translation: "Я иду навестить Карлоса.",
        explanation: "Конструкция 'ir a ver a...' — естественный способ сказать 'навестить'."
    },
    {
        context: "Ты стоишь в очереди за билетами в Прадо.",
        question: "Estoy _____ pie en la cola.",
        correct: "de",
        options: ["a", "de", "en"],
        translation: "Я стою в очереди.",
        explanation: "Estar DE pie — находиться в вертикальном положении."
    },
    {
        context: "Ты проходишь через площадь Пласа-Майор.",
        question: "Paso _____ la Plaza Mayor.",
        correct: "por",
        options: ["a", "de", "por"],
        translation: "Я прохожу по площади Пласа-Майор.",
        explanation: "POR — движение через пространство."
    },
    {
        context: "Ты заходишь в собор Ла-Сеу.",
        question: "Entro _____ la catedral.",
        correct: "en",
        options: ["a", "en", "por"],
        translation: "Я вхожу в собор.",
        explanation: "Глагол ENTRAR требует предлога EN."
    },
    {
        context: "Ты выходишь из музея Пикассо.",
        question: "Salgo _____ museo.",
        correct: "del",
        options: ["de", "del", "en"],
        translation: "Я выхожу из музея.",
        explanation: "de + el = del."
    },
    {
        context: "Ты едешь в Мадрид на скоростном поезде AVE.",
        question: "Vengo _____ tren.",
        correct: "en",
        options: ["en", "en el", "con"],
        translation: "Я приехал на поезде.",
        explanation: "Поезд — транспорт, предлог EN."
    },
    {
        context: "Ты идешь на корриду (или стадион).",
        question: "Voy _____ plaza de toros.",
        correct: "a la",
        options: ["a", "a la", "en"],
        translation: "Я иду на арену для боя быков.",
        explanation: "Направление к цели женского рода: a la."
    },
    {
        context: "Ты идешь гулять по парку Марии Луизы.",
        question: "Voy a _____ por el parque.",
        correct: "pasear",
        options: ["pasar", "pasear", "ir"],
        translation: "Я иду гулять по парку.",
        explanation: "PASEAR — гулять ради удовольствия."
    },
    {
        context: "Ты идешь со своим испанским другом.",
        question: "Voy _____ mi amigo español.",
        correct: "con",
        options: ["con", "a", "de"],
        translation: "Я иду со своим испанским другом.",
        explanation: "CON — предлог компании."
    },
    {
        context: "Ты путешествуешь по Андалусии на машине.",
        question: "Viajamos _____ coche.",
        correct: "en",
        options: ["en", "por", "con"],
        translation: "Мы путешествуем на машине.",
        explanation: "En coche — стандарт."
    },
    {
        context: "Ты говоришь, что едешь в отпуск в Марбелью.",
        question: "_____ de vacaciones a Marbella.",
        correct: "Voy",
        options: ["Voy", "Vengo", "Estoy"],
        translation: "Я еду в отпуск в Марбелью.",
        explanation: "IR DE vacaciones — устойчивое выражение."
    },

    // === КАТЕГОРИЯ 3: ИДИОМЫ И ЖИВОЙ ЯЗЫК - 20 вопросов ===
    {
        context: "Тебя спрашивают, жарко ли в Севилье зимой, а ты отвечаешь 'Вовсе нет!'.",
        question: "— ¿Hace calor? — ¡_____!",
        correct: "Qué va",
        options: ["¡Qué va!", "¡Vaya!", "¡Vamos!"],
        translation: "— Жарко? — Вовсе нет!",
        explanation: "¡Qué va! — эмоциональное отрицание."
    },
    {
        context: "Ты подбадриваешь друга перед экзаменом по испанскому: 'Давай!'.",
        question: "¡_____, tú sabes mucho español!",
        correct: "Venga",
        options: ["¡Qué va!", "¡Venga!", "¡Vete!"],
        translation: "Давай, ты хорошо знаешь испанский!",
        explanation: "¡Venga! — призыв к действию."
    },
    {
        context: "Ты поражен красотой Альгамбры: 'Ого!'.",
        question: "¡_____! Es un lugar increíble.",
        correct: "Vaya",
        options: ["¡Vaya!", "¡Voy!", "¡Viene!"],
        translation: "Ого! Это невероятное место.",
        explanation: "¡Vaya! — выражение сильного впечатления."
    },
    {
        context: "Ты сердито говоришь шумным соседям: 'Уходите!'.",
        question: "¡_____ de aquí, por favor!",
        correct: "Váyanse",
        options: ["Vengan", "Váyanse", "Lleguen"],
        translation: "Уходите отсюда, пожалуйста!",
        explanation: "Váyanse — императив (вы) от Irse."
    },
    {
        context: "Ты сомневаешься: 'Кто его знает, когда закончится дождь'.",
        question: "¡_____ a saber cuándo parará!",
        correct: "Vete",
        options: ["¡Vete!", "¡Ven!", "¡Llega!"],
        translation: "Поди узнай, когда он кончится!",
        explanation: "Vete a saber — фраза неуверенности."
    },
    {
        context: "Кто-то сказал странную вещь, и ты спрашиваешь: 'К чему это?'.",
        question: "¿A qué _____ ese comentario?",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "К чему этот комментарий?",
        explanation: "¿A qué viene eso? — вопрос о причине неуместности."
    },
    {
        context: "Ты говоришь, что этот парень всегда делает что хочет.",
        question: "Ese chico siempre _____ a su bola.",
        correct: "va",
        options: ["va", "viene", "llega"],
        translation: "Этот парень всегда сам по себе.",
        explanation: "Ir a su bola — 'быть на своей волне'."
    },
    {
        context: "Ты торопишь друзей: 'Пошли уже!'.",
        question: "¡_____, que llegamos tarde!",
        correct: "Vamos",
        options: ["¡Vamos!", "¡Vaya!", "¡Qué va!"],
        translation: "Пошли, а то опоздаем!",
        explanation: "¡Vamos! — призыв к движению."
    },
    {
        context: "Ты рассуждаешь о том, что ждет Испанию 'в будущем'.",
        question: "En lo por _____, todo irá mejor.",
        correct: "venir",
        options: ["ir", "venir", "llegar"],
        translation: "В будущем всё будет лучше.",
        explanation: "Lo por venir — будущее."
    },
    {
        context: "Ты говоришь, что эта куртка тебе слишком велика.",
        question: "Esta chaqueta me _____ grande.",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "Эта куртка мне велика.",
        explanation: "Venir grande — не подходить по размеру (быть большим)."
    },
    {
        context: "Ты спрашиваешь знакомого в Мадриде: 'Как дела?'.",
        question: "¿Cómo te _____ todo por здесь?",
        correct: "va",
        options: ["va", "viene", "llega"],
        translation: "Как у тебя тут идут дела?",
        explanation: "¿Cómo te va? — стандартное приветствие."
    },
    {
        context: "Ты соглашаешься пойти в тапас-бар: 'Ладно!'.",
        question: "¡_____, vamos a tomar algo!",
        correct: "Vale",
        options: ["¡Vale!", "¡Vaya!", "¡Venga!"],
        translation: "Ладно, пойдем перекусим!",
        explanation: "Vale — согласие."
    },
    {
        context: "Ты рассказывал историю и забыл, на чем остановился.",
        question: "¿А qué _____ yo?",
        correct: "iba",
        options: ["iba", "venía", "llegaba"],
        translation: "О чем это я говорил?",
        explanation: "¿A qué iba? — возврат к мысли."
    },
    {
        context: "Ты говоришь, что 'в конечном счете' всё решилось.",
        question: "Todo _____ a solucionarse al final.",
        correct: "vino",
        options: ["fue", "vino", "llegó"],
        translation: "В конце концов всё решилось.",
        explanation: "Venir a... — финальный итог."
    },
    {
        context: "Ты восхищаешься талантом гитариста: 'Ну и ну!'.",
        question: "¡_____ arte tiene este músico!",
        correct: "Vaya",
        options: ["¡Vaya!", "¡Venga!", "¡Qué va!"],
        translation: "Ну и талант у этого музыканта!",
        explanation: "¡Vaya + [качество]! — восклицание."
    },
    {
        context: "Ты призываешь коллегу говорить прямо: 'Давай к сути!'.",
        question: "¡_____ al grano, por favor!",
        correct: "Vamos",
        options: ["¡Vamos!", "¡Venimos!", "¡Llegamos!"],
        translation: "Давай ближе к делу, пожалуйста!",
        explanation: "Ir al grano — 'к сути'."
    },
    {
        context: "Ты успокаиваешь плачущего ребенка: 'Ну же, не плачь'.",
        question: "¡_____, no llores más!",
        correct: "Venga",
        options: ["¡Venga!", "¡Vaya!", "¡Qué va!"],
        translation: "Ну же, не плачь больше!",
        explanation: "¡Venga! для утешения."
    },
    {
        context: "Ты говоришь: 'Это меня не касается'.",
        question: "A mí no _____ nada de ese lío.",
        correct: "me viene",
        options: ["me va", "me viene", "me llega"],
        translation: "Ко мне эта заваруха не имеет отношения.",
        explanation: "No me viene nada — 'меня не касается'."
    },
    {
        context: "Ты говоришь: 'Я потихоньку привыкаю к испанскому расписанию'.",
        question: "_____ acostumbrándome al horario.",
        correct: "Voy",
        options: ["Estoy", "Voy", "Vengo"],
        translation: "Я потихоньку привыкаю к расписанию.",
        explanation: "Ir + Gerundio — прогресс."
    },
    {
        context: "Ты жалуешься на сложность задачи: 'Ну и дела!'.",
        question: "¡_____ tela с этой задачей!",
        correct: "Vaya",
        options: ["¡Vaya!", "¡Venga!", "¡Vamos!"],
        translation: "Ну и дела с этой задачей!",
        explanation: "¡Vaya tela! — 'ну и ну' (о проблеме)."
    },

    // === КАТЕГОРИЯ 4: СОЦИАЛЬНЫЙ КОНТЕКСТ И СОСТОЯНИЕ - 20 вопросов ===
    {
        context: "Ты говоришь, что эти туфли отлично подходят к платью.",
        question: "Estos zapatos _____ muy bien con el vestido.",
        correct: "van",
        options: ["van", "vienen", "llegan"],
        translation: "Эти туфли очень хорошо подходят к платью.",
        explanation: "IR BIEN — сочетаться."
    },
    {
        context: "Тебе подходит время встречи в Мадриде.",
        question: "Me _____ bien quedar a las seis.",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "Мне удобно встретиться в шесть.",
        explanation: "VENIR BIEN — удобство."
    },
    {
        context: "Ты говоришь, что брюки тебе великоваты.",
        question: "Estos pantalones me _____ grandes.",
        correct: "vienen",
        options: ["van", "vienen", "están"],
        translation: "Эти брюки мне велики.",
        explanation: "Venir + [размер]."
    },
    {
        context: "Ты говоришь, что твой испанский становится лучше.",
        question: "Mi español _____ mejorando cada día.",
        correct: "va",
        options: ["va", "viene", "está"],
        translation: "Мой испанский становится лучше с каждым днем.",
        explanation: "IR + Gerundio — постепенное улучшение."
    },
    {
        context: "Ты выбрал изучение архитектуры в Барселоне.",
        question: "Voy _____ arquitectura.",
        correct: "por",
        options: ["a", "en", "por"],
        translation: "Я учусь на архитектора (выбрал это направление).",
        explanation: "Ir POR — направление карьеры."
    },
    {
        context: "Ты идешь навестить больного дядю в госпиталь.",
        question: "Voy _____ mi tío al hospital.",
        correct: "a ver a",
        options: ["a visitar", "a ver a", "a llegar"],
        translation: "Я иду навестить дядю в больнице.",
        explanation: "Ir a ver a..."
    },
    {
        context: "Ты говоришь, что тебе не хочется идти в клуб сегодня.",
        question: "No me apetece _____ de fiesta hoy.",
        correct: "ir",
        options: ["ir", "venir", "llegar"],
        translation: "Мне не хочется идти тусоваться сегодня.",
        explanation: "Движение ОТ дома."
    },
    {
        context: "Ты хочешь сказать, что эта дорога ведет в Гранаду.",
        question: "Esta carretera _____ a Granada.",
        correct: "va",
        options: ["va", "viene", "llega"],
        translation: "Эта дорога ведет в Гранаду.",
        explanation: "Дорога 'идет' (направлена) — IR."
    },
    {
        context: "Ты говоришь, что проект 'движется' успешно.",
        question: "El proyecto _____ muy bien.",
        correct: "va",
        options: ["va", "viene", "está"],
        translation: "Проект идет очень хорошо.",
        explanation: "IR BIEN — о ходе дел."
    },
    {
        context: "Ты говоришь, что 'пришел момент' сказать правду.",
        question: "_____ el momento de decir la verdad.",
        correct: "Ha llegado",
        options: ["Ha ido", "Ha venido", "Ha llegado"],
        translation: "Пришел момент сказать правду.",
        explanation: "Llegar — о времени."
    },
    {
        context: "Ты меришь шляпу в магазине в Малаге.",
        question: "Esta gorra me _____ fatal.",
        correct: "viene",
        options: ["va", "viene", "está"],
        translation: "Эта кепка мне совсем не идет (не подходит по размеру/форме).",
        explanation: "Venir — о том, как сидит вещь."
    },
    {
        context: "Ты говоришь, что 'потихоньку' понимаешь испанцев.",
        question: "_____ entendiendo a los españoles.",
        correct: "Voy",
        options: ["voy", "vengo", "estoy"],
        translation: "Я потихоньку начинаю понимать испанцев.",
        explanation: "Ir + Gerundio."
    },
    {
        context: "Ты говоришь другу: 'Иди прямо до площади'.",
        question: "_____ todo recto hasta la plaza.",
        correct: "Ve",
        options: ["Ve", "Ven", "Llega"],
        translation: "Иди всё время прямо до площади.",
        explanation: "Императив IR."
    },
    {
        context: "Ты хочешь сказать, что выставка 'открыта' в музее.",
        question: "La exposición _____ hasta el domingo.",
        correct: "va",
        options: ["va", "viene", "está"],
        translation: "Выставка продлится (идет) до воскресенья.",
        explanation: "О временных рамках процесса."
    },
    {
        context: "Ты говоришь, что синий цвет тебе 'к лицу'.",
        question: "El azul te _____ muy bien.",
        correct: "va",
        options: ["va", "viene", "está"],
        translation: "Тебе очень идет синий цвет.",
        explanation: "IR — эстетическая сочетаемость."
    },
    {
        context: "Ты спрашиваешь, подходит ли другу это место для обеда.",
        question: "¿Te _____ bien este restaurante?",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "Тебе подходит этот ресторан?",
        explanation: "Venir bien — удобство выбора."
    },
    {
        context: "Ты говоришь, что 'пришел' к соглашению с шефом.",
        question: "_____ a un acuerdo con mi jefe.",
        correct: "He llegado",
        options: ["He ido", "He venido", "He llegado"],
        translation: "Я пришел к соглашению со своим боссом.",
        explanation: "Llegar a un acuerdo — результат переговоров."
    },
    {
        context: "Ты хочешь сказать, что звук 'доносится' издалека.",
        question: "El sonido _____ de lejos.",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "Звук доносится издалека.",
        explanation: "VENIR — движение К источнику восприятия (слуху)."
    },
    {
        context: "Ты говоришь 'Я уже бегу!' (в ответ на зов).",
        question: "¡Ya _____!",
        correct: "voy",
        options: ["voy", "vengo", "estoy"],
        translation: "Уже бегу (иду)!",
        explanation: "На зов всегда Voy."
    },
    {
        context: "Ты хочешь сказать, что 'всё возвращается'.",
        question: "Todo lo que va, _____.",
        correct: "vuelve",
        options: ["viene", "vuelve", "llega"],
        translation: "Всё, что уходит, возвращается.",
        explanation: "VOLVER — возвращение."
    }
];

if (typeof window !== 'undefined') {
    window.MODE5_DATA = MODE5_DATA;
}
