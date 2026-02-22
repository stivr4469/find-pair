/**
 * Ser vs Estar Trainer - Data Module
 * 
 * Содержит:
 * - Таблицы спряжения SER и ESTAR (4 времени)
 * - Правила использования SER (DOCTOR)
 * - Правила использования ESTAR (PLACE)
 * - Примеры предложений для каждого правила
 */

// ============================================
// ТАБЛИЦЫ СПРЯЖЕНИЯ
// ============================================

const SER_CONJUGATIONS = {
    presente: {
        yo: "soy",
        tu: "eres",
        "el/ella": "es",
        nosotros: "somos",
        vosotros: "sois",
        ellos: "son"
    },
    indefinido: {
        yo: "fui",
        tu: "fuiste",
        "el/ella": "fue",
        nosotros: "fuimos",
        vosotros: "fuisteis",
        ellos: "fueron"
    },
    imperfecto: {
        yo: "era",
        tu: "eras",
        "el/ella": "era",
        nosotros: "éramos",
        vosotros: "erais",
        ellos: "eran"
    },
    futuro: {
        yo: "seré",
        tu: "serás",
        "el/ella": "será",
        nosotros: "seremos",
        vosotros: "seréis",
        ellos: "serán"
    }
};

const ESTAR_CONJUGATIONS = {
    presente: {
        yo: "estoy",
        tu: "estás",
        "el/ella": "está",
        nosotros: "estamos",
        vosotros: "estáis",
        ellos: "están"
    },
    indefinido: {
        yo: "estuve",
        tu: "estuviste",
        "el/ella": "estuvo",
        nosotros: "estuvimos",
        vosotros: "estuvisteis",
        ellos: "estuvieron"
    },
    imperfecto: {
        yo: "estaba",
        tu: "estabas",
        "el/ella": "estaba",
        nosotros: "estábamos",
        vosotros: "estabais",
        ellos: "estaban"
    },
    futuro: {
        yo: "estaré",
        tu: "estarás",
        "el/ella": "estará",
        nosotros: "estaremos",
        vosotros: "estaréis",
        ellos: "estarán"
    }
};

// ============================================
// ПРАВИЛА SER (DOCTOR)
// ============================================

const SER_RULES = {
    D: {
        name: "Description",
        description: "Физические или личностные характеристики (постоянные)",
        examples: [
            { es: "Ella es alta.", ru: "Она высокая." },
            { es: "Él es inteligente.", ru: "Он умный." },
            { es: "La casa es grande.", ru: "Дом большой." },
            { es: "Somos altos.", ru: "Мы высокие." },
            { es: "El coche es rojo.", ru: "Машина красная." }
        ]
    },
    O: {
        name: "Occupation",
        description: "Профессия, род занятий",
        examples: [
            { es: "Soy médico.", ru: "Я врач." },
            { es: "Ella es profesora.", ru: "Она учительница." },
            { es: "Somos estudiantes.", ru: "Мы студенты." },
            { es: "Él es ingeniero.", ru: "Он инженер." },
            { es: "Son abogados.", ru: "Они юристы." }
        ]
    },
    C: {
        name: "Characteristic",
        description: "Общие качества, характеристики",
        examples: [
            { es: "El libro es interesante.", ru: "Книга интересная." },
            { es: "La película es aburrida.", ru: "Фильм скучный." },
            { es: "Eres muy amable.", ru: "Ты очень добрый." },
            { es: "El examen es difícil.", ru: "Экзамен сложный." },
            { es: "Somos pacientes.", ru: "Мы терпеливые." }
        ]
    },
    T: {
        name: "Time",
        description: "Даты, дни, время",
        examples: [
            { es: "Hoy es lunes.", ru: "Сегодня понедельник." },
            { es: "Son las tres.", ru: "Три часа." },
            { es: "Mañana es martes.", ru: "Завтра вторник." },
            { es: "Es mediodía.", ru: "Полдень." },
            { es: "El concierto es a las ocho.", ru: "Концерт в восемь часов." }
        ]
    },
    O2: {
        name: "Origin",
        description: "Происхождение, откуда кто-то",
        examples: [
            { es: "Soy de España.", ru: "Я из Испании." },
            { es: "Ella es de México.", ru: "Она из Мексики." },
            { es: "Somos de Rusia.", ru: "Мы из России." },
            { es: "El vino es de Chile.", ru: "Вино из Чили." },
            { es: "¿De dónde eres?", ru: "Откуда ты?" }
        ]
    },
    R: {
        name: "Relationship",
        description: "Семейные отношения, дружба",
        examples: [
            { es: "Él es mi padre.", ru: "Он мой отец." },
            { es: "Ella es mi hermana.", ru: "Она моя сестра." },
            { es: "Somos amigos.", ru: "Мы друзья." },
            { es: "Son mis padres.", ru: "Они мои родители." },
            { es: "Eres mi mejor amigo.", ru: "Ты мой лучший друг." }
        ]
    }
};

// ============================================
// ПРАВИЛА ESTAR (PLACE)
// ============================================

const ESTAR_RULES = {
    P: {
        name: "Position",
        description: "Физическое положение в пространстве",
        examples: [
            { es: "Estoy sentado.", ru: "Я сижу (в положении сидя)." },
            { es: "El libro está abierto.", ru: "Книга открыта." },
            { es: "La puerta está cerrada.", ru: "Дверь закрыта." },
            { es: "Estamos de pie.", ru: "Мы стоим." },
            { es: "El gato está acostado.", ru: "Кот лежит." }
        ]
    },
    L: {
        name: "Location",
        description: "Местоположение (где что-то находится)",
        examples: [
            { es: "Estoy en casa.", ru: "Я дома." },
            { es: "Madrid está en España.", ru: "Мадрид в Испании." },
            { es: "El baño está aquí.", ru: "Ванная здесь." },
            { es: "Estamos en el parque.", ru: "Мы в парке." },
            { es: "¿Dónde está el banco?", ru: "Где банк?" }
        ]
    },
    A: {
        name: "Action",
        description: "Продолженное время (герундий)",
        examples: [
            { es: "Estoy comiendo.", ru: "Я ем (в процессе)." },
            { es: "Ella está estudiando.", ru: "Она учится (сейчас)." },
            { es: "Estamos trabajando.", ru: "Мы работаем (сейчас)." },
            { es: "Están jugando.", ru: "Они играют (сейчас)." },
            { es: "Estoy leyendo un libro.", ru: "Я читаю книгу (сейчас)." }
        ]
    },
    C: {
        name: "Condition",
        description: "Физическое или эмоциональное состояние (временное)",
        examples: [
            { es: "Estoy cansado.", ru: "Я устал." },
            { es: "La sopa está fría.", ru: "Суп холодный." },
            { es: "El café está caliente.", ru: "Кофе горячий." },
            { es: "Estamos ocupados.", ru: "Мы заняты." },
            { es: "La ventana está rota.", ru: "Окно разбито." }
        ]
    },
    E: {
        name: "Emotion",
        description: "Эмоции, настроение",
        examples: [
            { es: "Estoy feliz.", ru: "Я счастлив." },
            { es: "Ella está triste.", ru: "Она грустная." },
            { es: "Estamos emocionados.", ru: "Мы взволнованы." },
            { es: "Están enojados.", ru: "Они злы." },
            { es: "Estoy nervioso.", ru: "Я нервничаю." }
        ]
    }
};

// ============================================
// ПРЕДЛОЖЕНИЯ ДЛЯ MODE 1 (ВЫБОР ГЛАГОЛА)
// ============================================

const MODE1_SENTENCES = [
    {
        text: "Yo ___ alto.",
        correct: "soy",
        verb: "ser",
        rule: "D",
        options: ["soy", "estoy"],
        translation: "Я высокий.",
        explanation: "Постоянная физическая характеристика → SER"
    },
    {
        text: "Yo ___ cansado.",
        correct: "estoy",
        verb: "estar",
        rule: "C",
        options: ["soy", "estoy"],
        translation: "Я устал.",
        explanation: "Временное состояние → ESTAR"
    },
    {
        text: "Ella ___ de México.",
        correct: "es",
        verb: "ser",
        rule: "O2",
        options: ["es", "está"],
        translation: "Она из Мексики.",
        explanation: "Происхождение → SER"
    },
    {
        text: "Ella ___ en la oficina.",
        correct: "está",
        verb: "estar",
        rule: "L",
        options: ["es", "está"],
        translation: "Она в офисе.",
        explanation: "Местоположение → ESTAR"
    },
    {
        text: "Nosotros ___ estudiantes.",
        correct: "somos",
        verb: "ser",
        rule: "O",
        options: ["somos", "estamos"],
        translation: "Мы студенты.",
        explanation: "Профессия/род занятий → SER"
    },
    {
        text: "Nosotros ___ estudiando.",
        correct: "estamos",
        verb: "estar",
        rule: "A",
        options: ["somos", "estamos"],
        translation: "Мы учимся (сейчас).",
        explanation: "Продолженное действие → ESTAR"
    },
    {
        text: "Hoy ___ lunes.",
        correct: "es",
        verb: "ser",
        rule: "T",
        options: ["es", "está"],
        translation: "Сегодня понедельник.",
        explanation: "День недели → SER"
    },
    {
        text: "El libro ___ interesante.",
        correct: "es",
        verb: "ser",
        rule: "C",
        options: ["es", "está"],
        translation: "Книга интересная.",
        explanation: "Общая характеристика → SER"
    },
    {
        text: "Él ___ mi hermano.",
        correct: "es",
        verb: "ser",
        rule: "R",
        options: ["es", "está"],
        translation: "Он мой брат.",
        explanation: "Семейные отношения → SER"
    },
    {
        text: "Ellos ___ felices.",
        correct: "están",
        verb: "estar",
        rule: "E",
        options: ["son", "están"],
        translation: "Они счастливы.",
        explanation: "Эмоция (временное состояние) → ESTAR"
    },
    {
        text: "La puerta ___ abierta.",
        correct: "está",
        verb: "estar",
        rule: "P",
        options: ["es", "está"],
        translation: "Дверь открыта.",
        explanation: "Положение/состояние → ESTAR"
    },
    {
        text: "¿Qué hora ___?",
        correct: "es",
        verb: "ser",
        rule: "T",
        options: ["es", "está"],
        translation: "Который час?",
        explanation: "Время → SER"
    },
    {
        text: "La sopa ___ fría.",
        correct: "está",
        verb: "estar",
        rule: "C",
        options: ["es", "está"],
        translation: "Суп холодный.",
        explanation: "Временное физическое состояние → ESTAR"
    },
    {
        text: "El coche ___ rojo.",
        correct: "es",
        verb: "ser",
        rule: "D",
        options: ["es", "está"],
        translation: "Машина красная.",
        explanation: "Постоянная характеристика (цвет) → SER"
    },
    {
        text: "¿Dónde ___ el banco?",
        correct: "está",
        verb: "estar",
        rule: "L",
        options: ["es", "está"],
        translation: "Где банк?",
        explanation: "Местоположение → ESTAR"
    }
];

// ============================================
// ПРЕДЛОЖЕНИЯ ДЛЯ MODE 4 (ПЕРЕВОД)
// ============================================

const MODE4_TRANSLATIONS = [
    {
        ru: "Я высокий.",
        es: "Yo soy alto.",
        verb: "ser",
        form: "soy",
        options: ["soy", "estoy", "es"]
    },
    {
        ru: "Я устал.",
        es: "Yo estoy cansado.",
        verb: "estar",
        form: "estoy",
        options: ["estoy", "soy", "está"]
    },
    {
        ru: "Она из Испании.",
        es: "Ella es de España.",
        verb: "ser",
        form: "es",
        options: ["es", "está", "eres"]
    },
    {
        ru: "Она дома.",
        es: "Ella está en casa.",
        verb: "estar",
        form: "está",
        options: ["está", "es", "estoy"]
    },
    {
        ru: "Мы врачи.",
        es: "Nosotros somos médicos.",
        verb: "ser",
        form: "somos",
        options: ["somos", "estamos", "son"]
    },
    {
        ru: "Мы едим.",
        es: "Nosotros estamos comiendo.",
        verb: "estar",
        form: "estamos",
        options: ["estamos", "somos", "están"]
    },
    {
        ru: "Сегодня вторник.",
        es: "Hoy es martes.",
        verb: "ser",
        form: "es"
    },
    {
        ru: "Они счастливы.",
        es: "Ellos están felices.",
        verb: "estar",
        form: "están"
    },
    {
        ru: "Он мой друг.",
        es: "Él es mi amigo.",
        verb: "ser",
        form: "es"
    },
    {
        ru: "Они в парке.",
        es: "Ellos están en el parque.",
        verb: "estar",
        form: "están"
    },
    {
        ru: "Ты умный.",
        es: "Tú eres inteligente.",
        verb: "ser",
        form: "eres"
    },
    {
        ru: "Ты грустный.",
        es: "Tú estás triste.",
        verb: "estar",
        form: "estás"
    },
    {
        ru: "Книга интересная.",
        es: "El libro es interesante.",
        verb: "ser",
        form: "es"
    },
    {
        ru: "Окно открыто.",
        es: "La ventana está abierta.",
        verb: "estar",
        form: "está"
    },
    {
        ru: "Четыре часа.",
        es: "Son las cuatro.",
        verb: "ser",
        form: "son"
    }
];

// ============================================
// ВОПРОСЫ ДЛЯ MODE 3 (ПРАВИЛА)
// ============================================

const MODE3_QUESTIONS = [
    {
        sentence: "Ella es alta.",
        verb: "ser",
        correctRule: "D",
        ruleName: "Description",
        translation: "Она высокая."
    },
    {
        sentence: "Estoy en casa.",
        verb: "estar",
        correctRule: "L",
        ruleName: "Location",
        translation: "Я дома."
    },
    {
        sentence: "Soy médico.",
        verb: "ser",
        correctRule: "O",
        ruleName: "Occupation",
        translation: "Я врач."
    },
    {
        sentence: "Estoy comiendo.",
        verb: "estar",
        correctRule: "A",
        ruleName: "Action",
        translation: "Я ем."
    },
    {
        sentence: "Hoy es lunes.",
        verb: "ser",
        correctRule: "T",
        ruleName: "Time",
        translation: "Сегодня понедельник."
    },
    {
        sentence: "Estoy feliz.",
        verb: "estar",
        correctRule: "E",
        ruleName: "Emotion",
        translation: "Я счастлив."
    },
    {
        sentence: "Soy de Rusia.",
        verb: "ser",
        correctRule: "O2",
        ruleName: "Origin",
        translation: "Я из России."
    },
    {
        sentence: "Estoy cansado.",
        verb: "estar",
        correctRule: "C",
        ruleName: "Condition",
        translation: "Я устал."
    },
    {
        sentence: "Él es mi padre.",
        verb: "ser",
        correctRule: "R",
        ruleName: "Relationship",
        translation: "Он мой отец."
    },
    {
        sentence: "La puerta está cerrada.",
        verb: "estar",
        correctRule: "P",
        ruleName: "Position",
        translation: "Дверь закрыта."
    }
];

// ============================================
// ОБЪЕДИНЁННЫЕ ТАБЛИЦЫ СОПРЯЖЕНИЙ
// ============================================

const CONJUGATIONS = {
    ser: SER_CONJUGATIONS,
    estar: ESTAR_CONJUGATIONS
};

// ============================================
// ЭКСПОРТ ДЛЯ NODE.JS И БРАУЗЕРА
// ============================================

if (typeof window !== 'undefined') {
    window.SER_CONJUGATIONS = SER_CONJUGATIONS;
    window.ESTAR_CONJUGATIONS = ESTAR_CONJUGATIONS;
    window.CONJUGATIONS = CONJUGATIONS;
    window.SER_RULES = SER_RULES;
    window.ESTAR_RULES = ESTAR_RULES;
    window.MODE1_SENTENCES = MODE1_SENTENCES;
    window.MODE4_TRANSLATIONS = MODE4_TRANSLATIONS;
    window.MODE3_QUESTIONS = MODE3_QUESTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SER_CONJUGATIONS,
        ESTAR_CONJUGATIONS,
        CONJUGATIONS,
        SER_RULES,
        ESTAR_RULES,
        MODE1_SENTENCES,
        MODE4_TRANSLATIONS,
        MODE3_QUESTIONS
    };
}
