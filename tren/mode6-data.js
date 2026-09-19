// spanish-trainer-app/tren/mode6-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 6: Data
 * Данные для режима "Выбор в предложении" (InlineChoice)
 * Глаголы: ir, venir, llegar — разные времена и лица
 */

const MODE6_SENTENCES = [
    // --- PRESENTE ---
    {
        sentence: "Yo ___ a casa todos los días.",
        options: ["voy", "vengo", "llego"],
        correct: "voy",
        translation: "Я хожу домой каждый день.",
        explanation: "IR: движение от говорящего к цели. 'Ir a casa' — двигаться к дому."
    },
    {
        sentence: "¿Tú ___ de la universidad ahora?",
        options: ["vas", "vienes", "llegas"],
        correct: "vienes",
        translation: "Ты сейчас идёшь с университета?",
        explanation: "VENIR + de: движение К говорящему из какого-то места. De = откуда исходит."
    },
    {
        sentence: "El tren ___ a las ocho en punto.",
        options: ["va", "viene", "llega"],
        correct: "llega",
        translation: "Поезд прибывает ровно в восемь.",
        explanation: "LLEGAR: акцент на моменте прибытия в конечную точку, не процесс, а факт."
    },
    {
        sentence: "Nosotros ___ al trabajo en metro.",
        options: ["vamos", "venimos", "llegamos"],
        correct: "vamos",
        translation: "Мы едем на работу на метро.",
        explanation: "IR: группа движется к цели (работе) от текущего места."
    },
    {
        sentence: "Ellos siempre ___ tarde a la reunión.",
        options: ["van", "vienen", "llegan"],
        correct: "llegan",
        translation: "Они всегда опаздывают на встречу.",
        explanation: "LLEGAR tarde — устойчивое выражение 'опаздывать'. Акцент на прибытии."
    },
    {
        sentence: "Mis amigos ___ de Madrid a visitarme.",
        options: ["van", "vienen", "llegan"],
        correct: "vienen",
        translation: "Мои друзья приезжают из Мадрида навестить меня.",
        explanation: "VENIR: движение направлено К говорящему (чтобы навестить его)."
    },

    // --- INDEFINIDO (PRETÉRITO) ---
    {
        sentence: "Ayer yo ___ a la fiesta muy tarde.",
        options: ["fui", "vine", "llegué"],
        correct: "llegué",
        translation: "Вчера я пришёл на вечеринку очень поздно.",
        explanation: "LLEGAR (indefinido): фиксируется конкретный момент прибытия в прошлом."
    },
    {
        sentence: "¿A qué hora ___ tú ayer del trabajo?",
        options: ["fuiste", "viniste", "llegaste"],
        correct: "llegaste",
        translation: "В котором часу ты вчера пришёл с работы?",
        explanation: "LLEGAR: вопрос о конкретном моменте прибытия домой в прошлом."
    },
    {
        sentence: "El año pasado nosotros ___ a Barcelona.",
        options: ["fuimos", "vinimos", "llegamos"],
        correct: "fuimos",
        translation: "В прошлом году мы ездили в Барселону.",
        explanation: "IR (indefinido): совершённая поездка в прошлом к определённому месту."
    },
    {
        sentence: "Ella ___ desde París para verme.",
        options: ["fue", "vino", "llegó"],
        correct: "vino",
        translation: "Она приехала из Парижа, чтобы увидеть меня.",
        explanation: "VENIR (indefinido): движение к говорящему из другого места в прошлом."
    },

    // --- IMPERFECTO ---
    {
        sentence: "De niño, yo siempre ___ al parque los domingos.",
        options: ["iba", "venía", "llegaba"],
        correct: "iba",
        translation: "В детстве я всегда ходил в парк по воскресеньям.",
        explanation: "IR (imperfecto): повторяющееся привычное действие в прошлом."
    },
    {
        sentence: "Cuando era pequeña, ella ___ de la escuela llorando.",
        options: ["iba", "venía", "llegaba"],
        correct: "llegaba",
        translation: "Когда она была маленькой, она приходила из школы плача.",
        explanation: "LLEGAR (imperfecto): описание состояния при прибытии, регулярное в прошлом."
    },
    {
        sentence: "Mis abuelos siempre ___ a visitarnos en verano.",
        options: ["iban", "venían", "llegaban"],
        correct: "venían",
        translation: "Мои бабушки и дедушки всегда приезжали к нам летом.",
        explanation: "VENIR (imperfecto): регулярные визиты к говорящему в прошлом."
    },

    // --- FUTURO ---
    {
        sentence: "Mañana yo ___ a verte al hospital.",
        options: ["iré", "vendré", "llegaré"],
        correct: "iré",
        translation: "Завтра я приду тебя навестить в больницу.",
        explanation: "IR (futuro): планируемое движение к определённой цели в будущем."
    },
    {
        sentence: "El vuelo ___ con dos horas de retraso.",
        options: ["irá", "vendrá", "llegará"],
        correct: "llegará",
        translation: "Самолёт прибудет с двухчасовым опозданием.",
        explanation: "LLEGAR (futuro): прибытие транспорта в будущем, акцент на факте прибытия."
    },
    {
        sentence: "¿Cuándo ___ tus padres a vivir contigo?",
        options: ["irán", "vendrán", "llegarán"],
        correct: "vendrán",
        translation: "Когда твои родители приедут жить к тебе?",
        explanation: "VENIR (futuro): движение к говорящему (к тебе домой) в будущем."
    }
];

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.MODE6_SENTENCES = MODE6_SENTENCES;
}
