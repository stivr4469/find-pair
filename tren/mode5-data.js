// spanish-trainer-app/tren/mode5-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 5: Context Sentences Data
 * Данные предложений для режима "Контекст"
 */

const MODE5_SENTENCES = [
    {
        text: "Yo ___ a la escuela todos los días.",
        correctVerb: "ir",
        correctForm: "voy",
        options: ["voy", "vengo", "llego"],
        translation: "Я хожу в школу каждый день."
    },
    {
        text: "¿De dónde ___ tú?",
        correctVerb: "venir",
        correctForm: "vienes",
        options: ["vas", "vienes", "llegas"],
        translation: "Откуда ты?"
    },
    {
        text: "Él ___ a Madrid mañana en avión.",
        correctVerb: "llegar",
        correctForm: "llega",
        options: ["va", "viene", "llega"],
        translation: "Он прибывает в Мадрид завтра на самолете."
    },
    {
        text: "Nosotros ___ al cine.",
        correctVerb: "ir",
        correctForm: "vamos",
        options: ["vamos", "venimos", "llegamos"],
        translation: "Мы идем в кино."
    },
    {
        text: "Ellos ___ de la fiesta muy tarde.",
        correctVerb: "venir",
        correctForm: "vienen",
        options: ["van", "vienen", "llegan"],
        translation: "Они приходят с вечеринки очень поздно."
    },
    {
        text: "¿Cuándo ___ vosotros?",
        correctVerb: "llegar",
        correctForm: "llegáis",
        options: ["vais", "venís", "llegáis"],
        translation: "Когда вы приезжаете?"
    },
    {
        text: "Ella ___ del trabajo ahora mismo.",
        correctVerb: "venir",
        correctForm: "viene",
        options: ["va", "viene", "llega"],
        translation: "Она приходит с работы прямо сейчас."
    },
    {
        text: "Mis amigos ___ a mi casa para cenar.",
        correctVerb: "venir",
        correctForm: "vienen",
        options: ["van", "vienen", "llegan"],
        translation: "Мои друзья приходят ко мне ужинать."
    },
    {
        text: "El tren ___ a la estación en cinco minutos.",
        correctVerb: "llegar",
        correctForm: "llega",
        options: ["va", "viene", "llega"],
        translation: "Поезд прибывает на станцию через пять минут."
    },
    {
        text: "¿Adónde ___ tú de vacaciones?",
        correctVerb: "ir",
        correctForm: "vas",
        options: ["vas", "vienes", "llegas"],
        translation: "Куда ты едешь в отпуск?"
    }
];

// Для экспорта в браузере
if (typeof window !== 'undefined') {
    window.MODE5_SENTENCES = MODE5_SENTENCES;
}

// Для использования в Node.js (если потребуется для тестов)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MODE5_SENTENCES };
}
