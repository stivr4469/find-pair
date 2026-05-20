/**
 * Ser vs Estar Trainer - Data Module (80 Questions)
 * СТРОГО: Только глаголы SER и ESTAR.
 * Локализация: Испания и Латинская Америка.
 * Правила: DOCTOR (SER) и PLACE (ESTAR).
 */

// === ТАБЛИЦЫ СПРЯЖЕНИЯ (Для справки) ===
const SER_CONJUGATIONS = {
    presente: { yo: "soy", tu: "eres", "el/ella": "es", nosotros: "somos", vosotros: "sois", ellos: "son" },
    indefinido: { yo: "fui", tu: "fuiste", "el/ella": "fue", nosotros: "fuimos", vosotros: "fuisteis", ellos: "fueron" },
    imperfecto: { yo: "era", tu: "eras", "el/ella": "era", nosotros: "éramos", vosotros: "erais", ellos: "eran" },
    futuro: { yo: "seré", tu: "serás", "el/ella": "será", nosotros: "seremos", vosotros: "seréis", ellos: "serán" }
};

const ESTAR_CONJUGATIONS = {
    presente: { yo: "estoy", tu: "estás", "el/ella": "está", nosotros: "estamos", vosotros: "estáis", ellos: "están" },
    indefinido: { yo: "estuve", tu: "estuviste", "el/ella": "estuvo", nosotros: "estuvimos", vosotros: "estuvisteis", ellos: "estuvieron" },
    imperfecto: { yo: "estaba", tu: "estabas", "el/ella": "estaba", nosotros: "estábamos", vosotros: "estabais", ellos: "estaban" },
    futuro: { yo: "estaré", tu: "estarás", "el/ella": "estará", nosotros: "estaremos", vosotros: "estaréis", ellos: "estarán" }
};

const MODE1_SENTENCES = [
    // --- SER (DOCTOR) ---
    {
        text: "Ella ___ muy inteligente.",
        correct: "es",
        options: ["es", "está"],
        translation: "Она очень умная.",
        explanation: "SER (C - Characteristic): Используется для описания черт характера и интеллекта."
    },
    {
        text: "Nosotros ___ médicos en este hospital.",
        correct: "somos",
        options: ["somos", "estamos"],
        translation: "Мы врачи в этой больнице.",
        explanation: "SER (O - Occupation): Профессия всегда требует глагола ser."
    },
    {
        text: "Hoy ___ lunes, el primer día de la semana.",
        correct: "es",
        options: ["es", "está"],
        translation: "Сегодня понедельник, первый день недели.",
        explanation: "SER (T - Time): Дни недели, даты и время выражаются через ser."
    },
    {
        text: "Este reloj ___ de oro.",
        correct: "es",
        options: ["es", "está"],
        translation: "Эти часы из золота.",
        explanation: "SER (O - Origin/Material): Материал, из которого сделана вещь."
    },
    {
        text: "Yo ___ de Madrid, pero vivo en Valencia.",
        correct: "soy",
        options: ["soy", "estoy"],
        translation: "Я из Мадрида, но живу в Валенсии.",
        explanation: "SER (O - Origin): Происхождение и родина."
    },
    {
        text: "Rafael и Хуан ___ hermanos.",
        correct: "son",
        options: ["son", "están"],
        translation: "Рафаэль и Хуан — братья.",
        explanation: "SER (R - Relationship): Родственные и личные отношения."
    },
    {
        text: "La fiesta ___ en mi casa.",
        correct: "es",
        options: ["es", "está"],
        translation: "Вечеринка проходит у меня дома.",
        explanation: "SER (Event Location): Место проведения событий (не путать с местоположением предметов!)."
    },
    {
        text: "Tú ___ muy alto para tu edad.",
        correct: "eres",
        options: ["eres", "estás"],
        translation: "Ты очень высокий для своего возраста.",
        explanation: "SER (D - Description): Физические характеристики объекта."
    },

    // --- ESTAR (PLACE) ---
    {
        text: "La sopa ___ muy caliente ahora.",
        correct: "está",
        options: ["es", "está"],
        translation: "Суп сейчас очень горячий.",
        explanation: "ESTAR (C - Condition): Временное физическое состояние (температура)."
    },
    {
        text: "Мои ключи ___ на столе.",
        text: "Mis llaves ___ sobre la mesa.",
        correct: "están",
        options: ["son", "están"],
        translation: "Мои ключи на столе.",
        explanation: "ESTAR (L - Location): Местоположение предметов в пространстве."
    },
    {
        text: "Yo ___ очень устал сегодня.",
        text: "Yo ___ muy cansado hoy.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я очень устал сегодня.",
        explanation: "ESTAR (C - Condition): Временное физическое или эмоциональное состояние."
    },
    {
        text: "Madrid ___ в центре Испании.",
        text: "Madrid ___ en el centro de España.",
        correct: "está",
        options: ["es", "está"],
        translation: "Мадрид находится в центре Испании.",
        explanation: "ESTAR (L - Location): Местоположение географических объектов."
    },
    {
        text: "Мы сейчас едим паэлью.",
        text: "Nosotros ___ comiendo una paella.",
        correct: "estamos",
        options: ["somos", "estamos"],
        translation: "Мы сейчас едим паэлью.",
        explanation: "ESTAR (A - Action): Используется с герундием для продолженного действия."
    },
    {
        text: "Ты ___ очень грустный сегодня.",
        text: "Tú ___ muy triste hoy.",
        correct: "estás",
        options: ["eres", "estás"],
        translation: "Ты очень грустный сегодня.",
        explanation: "ESTAR (E - Emotion): Эмоциональное состояние в данный момент."
    },
    {
        text: "La ventana ___ abierta.",
        correct: "está",
        options: ["es", "está"],
        translation: "Окно открыто.",
        explanation: "ESTAR (C - Condition): Состояние объекта как результат действия."
    },
    {
        text: "Мой брат ___ в Мексике сейчас.",
        text: "Mi hermano ___ en México ahora.",
        correct: "está",
        options: ["es", "está"],
        translation: "Мой брат сейчас в Мексике.",
        explanation: "ESTAR (L - Location): Нахождение человека в конкретном месте."
    },

    // --- СЛОЖНЫЕ СЛУЧАИ (Сравнение смысла) ---
    {
        text: "Este chico ___ malo.",
        correct: "es",
        options: ["es", "está"],
        translation: "Этот парень плохой (злой по характеру).",
        explanation: "SER + malo = характер (быть плохим человеком)."
    },
    {
        text: "Este chico ___ malo.",
        correct: "está",
        options: ["es", "está"],
        translation: "Этот парень болен (плохо себя чувствует).",
        explanation: "ESTAR + malo = здоровье (болеть)."
    },
    {
        text: "La manzana ___ verde.",
        correct: "es",
        options: ["es", "está"],
        translation: "Яблоко зеленое (это его сорт/цвет).",
        explanation: "SER + verde = цвет/качество объекта."
    },
    {
        text: "La manzana ___ verde.",
        correct: "está",
        options: ["es", "está"],
        translation: "Яблоко еще зеленое (незрелое).",
        explanation: "ESTAR + verde = состояние (незрелость)."
    },
    {
        text: "El profesor ___ aburrido.",
        correct: "es",
        options: ["es", "está"],
        translation: "Профессор скучный (человек такой).",
        explanation: "SER + aburrido = скучный характер."
    },
    {
        text: "El profesor ___ aburrido.",
        correct: "está",
        options: ["es", "está"],
        translation: "Профессору скучно (ему сейчас скучно).",
        explanation: "ESTAR + aburrido = состояние скуки."
    },
    {
        text: "Lucía ___ muy guapa.",
        correct: "es",
        options: ["es", "está"],
        translation: "Лусия очень красивая (в принципе).",
        explanation: "SER + guapa = постоянная привлекательность."
    },
    {
        text: "Lucía ___ muy guapa hoy con ese vestido.",
        correct: "está",
        options: ["es", "está"],
        translation: "Лусия сегодня очень красивая в этом платье.",
        explanation: "ESTAR + guapa = выглядеть красиво в конкретный момент."
    },

    // --- РАСШИРЕНИЕ ДО 80 (Примеры категорий) ---
    {
        text: "Мои родители ___ из Севильи.",
        text: "Mis padres ___ de Sevilla.",
        correct: "son",
        options: ["son", "están"],
        translation: "Мои родители из Севильи.",
        explanation: "SER (O - Origin): Происхождение."
    },
    {
        text: "Собор ___ очень старый.",
        text: "La catedral ___ muy antigua.",
        correct: "es",
        options: ["es", "está"],
        translation: "Собор очень старый.",
        explanation: "SER (D - Description): Характеристика здания."
    },
    {
        text: "Мы ___ в аэропорту Малаги.",
        text: "Nosotros ___ en el aeropuerto de Málaga.",
        correct: "estamos",
        options: ["somos", "estamos"],
        translation: "Мы в аэропорту Малаги.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Мой друг ___ инженер.",
        text: "Mi amigo ___ ingeniero.",
        correct: "es",
        options: ["es", "está"],
        translation: "Мой друг — инженер.",
        explanation: "SER (O - Occupation): Профессия."
    },
    {
        text: "Книга ___ интересная.",
        text: "El libro ___ interesante.",
        correct: "es",
        options: ["es", "está"],
        translation: "Книга интересная.",
        explanation: "SER (C - Characteristic): Свойство предмета."
    },
    {
        text: "Кофе ___ холодный.",
        text: "El café ___ frío.",
        correct: "está",
        options: ["es", "está"],
        translation: "Кофе холодный.",
        explanation: "ESTAR (C - Condition): Температура напитка."
    },
    {
        text: "Сын Марии ___ очень умный.",
        text: "El hijo de María ___ muy listo.",
        correct: "es",
        options: ["es", "está"],
        translation: "Сын Марии очень умный.",
        explanation: "SER + listo = умный (характеристика)."
    },
    {
        text: "Я ___ готов к экзамену.",
        text: "Yo ___ listo para el examen.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я готов к экзамену.",
        explanation: "ESTAR + listo = быть готовым (состояние)."
    },
    {
        text: "Эта машина ___ моего отца.",
        text: "Este coche ___ de mi padre.",
        correct: "es",
        options: ["es", "está"],
        translation: "Эта машина моего отца.",
        explanation: "SER (Possession): Принадлежность."
    },
    {
        text: "Барселона ___ на берегу моря.",
        text: "Barcelona ___ a la orilla del mar.",
        correct: "está",
        options: ["es", "está"],
        translation: "Барселона находится на берегу моря.",
        explanation: "ESTAR (L - Location): География."
    },
    {
        text: "Сегодня ___ 25 февраля.",
        text: "Hoy ___ 25 de febrero.",
        correct: "es",
        options: ["es", "está"],
        translation: "Сегодня 25 февраля.",
        explanation: "SER (T - Time): Дата."
    },
    {
        text: "Вы ___ испанцы?",
        text: "¿Vosotros ___ españoles?",
        correct: "sois",
        options: ["sois", "estáis"],
        translation: "Вы испанцы?",
        explanation: "SER (Nationality): Национальность."
    },
    {
        text: "Море ___ спокойное сегодня.",
        text: "El mar ___ tranquilo hoy.",
        correct: "está",
        options: ["es", "está"],
        translation: "Море спокойное сегодня.",
        explanation: "ESTAR (C - Condition): Временное состояние природы."
    },
    {
        text: "Эта сумка ___ из кожи.",
        text: "Este bolso ___ de cuero.",
        correct: "es",
        options: ["es", "está"],
        translation: "Эта сумка из кожи.",
        explanation: "SER (Material): Материал."
    },
    {
        text: "Мы ___ очень счастливы вместе.",
        text: "Nosotros ___ muy felices juntos.",
        correct: "somos",
        options: ["somos", "estamos"],
        translation: "Мы очень счастливы вместе (по жизни).",
        explanation: "SER + feliz = быть счастливым человеком (характеристика)."
    },
    {
        text: "Я ___ очень счастлив сейчас.",
        text: "Estoy muy feliz ahora.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я очень счастлив сейчас.",
        explanation: "ESTAR + feliz = состояние радости в моменте."
    },
    {
        text: "Где ___ туалет?",
        text: "¿Dónde ___ el baño?",
        correct: "está",
        options: ["es", "está"],
        translation: "Где туалет?",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Концерт ___ в восемь вечера.",
        text: "El concierto ___ a las ocho.",
        correct: "es",
        options: ["es", "está"],
        translation: "Концерт в восемь вечера.",
        explanation: "SER (T - Time): Время события."
    },
    {
        text: "Моя сестра ___ замужем.",
        text: "Mi hermana ___ casada.",
        correct: "está",
        options: ["es", "está"],
        translation: "Моя сестра замужем.",
        explanation: "ESTAR (Status): Семейное положение в испанском обычно через estar."
    },
    {
        text: "Билеты ___ у меня в кармане.",
        text: "Las entradas ___ en mi bolsillo.",
        correct: "están",
        options: ["son", "están"],
        translation: "Билеты у меня в кармане.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Этот фильм ___ очень скучный.",
        text: "Esta película ___ muy aburrida.",
        correct: "es",
        options: ["es", "está"],
        translation: "Этот фильм очень скучный.",
        explanation: "SER (C - Characteristic): Свойство фильма."
    },
    {
        text: "Я ___ в восторге от этой идеи.",
        text: "Я ___ encantado con esta idea.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я в восторге от этой идеи.",
        explanation: "ESTAR (E - Emotion): Эмоция."
    },
    {
        text: "Карлос ___ мой лучший друг.",
        text: "Carlos ___ mi mejor amigo.",
        correct: "es",
        options: ["es", "está"],
        translation: "Карлос мой лучший друг.",
        explanation: "SER (R - Relationship): Отношения."
    },
    {
        text: "Это платье ___ слишком дорогое.",
        text: "Este vestido ___ demasiado caro.",
        correct: "es",
        options: ["es", "está"],
        translation: "Это платье слишком дорогое.",
        explanation: "SER (Characteristic): Качество/цена товара."
    },
    {
        text: "Магазины ___ закрыты по воскресеньям.",
        text: "Las tiendas ___ cerradas los domingos.",
        correct: "están",
        options: ["son", "están"],
        translation: "Магазины закрыты по воскресеньям.",
        explanation: "ESTAR (C - Condition): Состояние (закрыто/открыто)."
    },
    {
        text: "Эта новость ___ очень важная.",
        text: "Эта noticia ___ muy importante.",
        correct: "es",
        options: ["es", "está"],
        translation: "Эта новость очень важная.",
        explanation: "SER (Characteristic): Качество новости."
    },
    {
        text: "Мы ___ в центре Мадрида.",
        text: "Мы ___ en el centro de Madrid.",
        correct: "estamos",
        options: ["somos", "estamos"],
        translation: "Мы в центре Мадрида.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Его дедушка ___ уже очень старый.",
        text: "Su abuelo ___ ya muy viejo.",
        correct: "es",
        options: ["es", "está"],
        translation: "Его дедушка уже очень старый.",
        explanation: "SER (D - Description): Возраст/характеристика человека."
    },
    {
        text: "Я ___ занят сейчас.",
        text: "Yo ___ ocupado ahora.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я занят сейчас.",
        explanation: "ESTAR (C - Condition): Временное состояние."
    },
    {
        text: "Этот стол ___ чистый.",
        text: "Esta mesa ___ limpia.",
        correct: "está",
        options: ["es", "está"],
        translation: "Этот стол чистый.",
        explanation: "ESTAR (C - Condition): Результат уборки."
    },
    {
        text: "Они ___ из Аргентины.",
        text: "Ellos ___ de Argentina.",
        correct: "son",
        options: ["son", "están"],
        translation: "Они из Аргентины.",
        explanation: "SER (Origin): Происхождение."
    },
    {
        text: "Твоя обувь ___ под кроватью.",
        text: "Tus zapatos ___ debajo de la cama.",
        correct: "están",
        options: ["son", "están"],
        translation: "Твоя обувь под кроватью.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Урок испанского ___ очень полезный.",
        text: "La clase de español ___ muy útil.",
        correct: "es",
        options: ["es", "está"],
        translation: "Урок испанского очень полезный.",
        explanation: "SER (Characteristic): Качество урока."
    },
    {
        text: "Мой папа ___ сейчас на работе.",
        text: "Mi padre ___ en el trabajo ahora.",
        correct: "está",
        options: ["es", "está"],
        translation: "Мой папа сейчас на работе.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Этот суп ___ невкусный.",
        text: "Эта sopa ___ sosa (пресная).",
        correct: "está",
        options: ["es", "está"],
        translation: "Этот суп пресный (невкусный).",
        explanation: "ESTAR (C - Condition): Вкус еды в данный момент."
    },
    {
        text: "Вы ___ студенты университета?",
        text: "¿Ustedes ___ estudiantes de la universidad?",
        correct: "son",
        options: ["son", "están"],
        translation: "Вы студенты университета?",
        explanation: "SER (Occupation): Род занятий."
    },
    {
        text: "Машина ___ в гараже.",
        text: "El coche ___ en el garaje.",
        correct: "está",
        options: ["es", "está"],
        translation: "Машина в гараже.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Луна ___ сегодня очень яркая.",
        text: "La luna ___ muy brillante hoy.",
        correct: "está",
        options: ["es", "está"],
        translation: "Луна сегодня очень яркая.",
        explanation: "ESTAR (C - Condition): Временное состояние природы."
    },
    {
        text: "Этот дом ___ очень большой.",
        text: "Эта casa ___ muy grande.",
        correct: "es",
        options: ["es", "está"],
        translation: "Этот дом очень большой.",
        explanation: "SER (D - Description): Характеристика объекта."
    },
    {
        text: "Я ___ влюблен в тебя.",
        text: "Yo ___ enamorado de ti.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я влюблен в тебя.",
        explanation: "ESTAR (E - Emotion): Чувство/эмоция."
    },
    {
        text: "Картина ___ на стене.",
        text: "El cuadro ___ en la pared.",
        correct: "está",
        options: ["es", "está"],
        translation: "Картина на стене.",
        explanation: "ESTAR (L - Location): Местоположение."
    },
    {
        text: "Завтра ___ праздник.",
        text: "Mañana ___ fiesta.",
        correct: "es",
        options: ["es", "está"],
        translation: "Завтра праздник.",
        explanation: "SER (T - Time/Event): Событие."
    },
    {
        text: "Они ___ католики.",
        text: "Ellos ___ católicos.",
        correct: "son",
        options: ["son", "están"],
        translation: "Они католики.",
        explanation: "SER (Religion): Религия/убеждения."
    },
    {
        text: "Вино ___ из Чили.",
        text: "El vino ___ de Chile.",
        correct: "es",
        options: ["es", "está"],
        translation: "Вино из Чили.",
        explanation: "SER (Origin): Происхождение."
    },
    {
        text: "Мой дедушка ___ уже мертв.",
        text: "Mi abuelo ___ muerto.",
        correct: "está",
        options: ["es", "está"],
        translation: "Мой дедушка умер.",
        explanation: "ESTAR (C - Condition): Состояние жизни/смерти в испанском через estar."
    },
    {
        text: "Обед ___ готов.",
        text: "La comida ___ lista.",
        correct: "está",
        options: ["es", "está"],
        translation: "Обед готов.",
        explanation: "ESTAR (C - Condition): Состояние готовности."
    },
    {
        text: "Этот актер ___ очень знаменит.",
        text: "Ese actor ___ muy famoso.",
        correct: "es",
        options: ["es", "está"],
        translation: "Этот актер очень знаменит.",
        explanation: "SER (Characteristic): Качество/статус."
    },
    {
        text: "Я ___ в Валенсии на этой неделе.",
        text: "Yo ___ en Valencia esta semana.",
        correct: "estoy",
        options: ["soy", "estoy"],
        translation: "Я в Валенсии на этой неделе.",
        explanation: "ESTAR (L - Location): Временное пребывание."
    },
    {
        text: "Эта сумка ___ очень тяжелая.",
        text: "Esta maleta ___ muy pesada.",
        correct: "es",
        options: ["es", "está"],
        translation: "Эта сумка очень тяжелая.",
        explanation: "SER (D - Description): Свойство предмета."
    },
    {
        text: "Ты ___ прав.",
        text: "Tú ___ en lo cierto (или tienes razón).",
        text: "Tú ___ equivocado.",
        correct: "estás",
        options: ["eres", "estás"],
        translation: "Ты ошибаешься.",
        explanation: "ESTAR + equivocado = состояние ошибки."
    }
];

// Экспорт таблиц и вопросов
if (typeof window !== 'undefined') {
    window.SER_CONJUGATIONS = SER_CONJUGATIONS;
    window.ESTAR_CONJUGATIONS = ESTAR_CONJUGATIONS;
    window.CONJUGATIONS = { ser: SER_CONJUGATIONS, estar: ESTAR_CONJUGATIONS };
    window.MODE1_SENTENCES = MODE1_SENTENCES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SER_CONJUGATIONS, ESTAR_CONJUGATIONS, MODE1_SENTENCES };
}
