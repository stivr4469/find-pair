// spanish-trainer-app/tren/mode1-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 1: Data
 * Данные для режима "Выбор глагола"
 */

const MODE1_SENTENCES = [
    {
        text: "Yo ___ a casa ahora.",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Я иду домой сейчас.",
        explanation: "IR: движение ОТ говорящего к цели. 'Ir a casa' — двигаться к дому."
    },
    {
        text: "¿Tú ___ de la escuela?",
        correct: "vienes",
        options: ["vas", "vienes", "llegas"],
        translation: "Ты приходишь из школы?",
        explanation: "VENIR + de: движение К говорящему из какого-то места. De = откуда."
    },
    {
        text: "Él ___ a Madrid mañana.",
        correct: "llega",
        options: ["va", "viene", "llega"],
        translation: "Он прибывает в Мадрид завтра.",
        explanation: "LLEGAR: акцент на моменте прибытия в конечную точку. Не процесс, а результат."
    },
    {
        text: "Nosotros ___ al cine.",
        correct: "vamos",
        options: ["vamos", "venimos", "llegamos"],
        translation: "Мы идём в кино.",
        explanation: "IR: движение группы к цели. Al = a + el (слияние артикля с предлогом)."
    },
    {
        text: "Ellos ___ tarde.",
        correct: "llegan",
        options: ["van", "vienen", "llegan"],
        translation: "Они приходят поздно.",
        explanation: "LLEGAR: прибытие с указанием на время. Llegar tarde — опаздывать."
    },
    {
        text: "¿Vosotros ___ en tren?",
        correct: "venís",
        options: ["vais", "venís", "llegáis"],
        translation: "Вы приезжаете на поезде?",
        explanation: "VENIR + en + транспорт: движение к говорящему. En tren — на поезде."
    },
    {
        text: "Yo ___ a ser médico.",
        correct: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Я собираюсь стать врачом.",
        explanation: "IR + a + инфинитив = ближайшее будущее. 'Voy a ser' — я собираюсь стать."
    },
    {
        text: "Ella ___ de España.",
        correct: "viene",
        options: ["va", "viene", "llega"],
        translation: "Она приезжает из Испании.",
        explanation: "VENIR + de: место происхождения или откуда движется человек."
    },
    {
        text: "¿Cuándo ___ tú?",
        correct: "llegas",
        options: ["vas", "vienes", "llegas"],
        translation: "Когда ты приезжаешь?",
        explanation: "LLEGAR: вопрос о моменте прибытия. ¿Cuándo llegas? — Когда ты прибудешь?"
    },
    {
        text: "Nosotros ___ cansados.",
        correct: "llegamos",
        options: ["vamos", "venimos", "llegamos"],
        translation: "Мы приходим уставшими.",
        explanation: "LLEGAR + прилагательное: описывает состояние в момент прибытия."
    }
];

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.MODE1_SENTENCES = MODE1_SENTENCES;
}
