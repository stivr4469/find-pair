// spanish-trainer-app/tren/mode3-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 3: Data
 * Данные для режима "Предлоги (a/de/en)"
 */

const MODE3_QUESTIONS_DATA = [
    {
        text: "Voy ___ casa.",
        correct: "a",
        translation: "Я иду ___ домой.",
        verb: "ir",
        explanation: "IR + a: направление к цели. 'Casa' без артикля = домой (устойчивое выражение)."
    },
    {
        text: "Vamos ___ la escuela.",
        correct: "a",
        translation: "Мы идём ___ в школу.",
        verb: "ir",
        explanation: "IR + a + место: указывает направление движения. A = в/к."
    },
    {
        text: "¿Vas ___ el cine?",
        correct: "a",
        translation: "Ты идёшь ___ в кино?",
        verb: "ir",
        explanation: "IR + a: движение к месту назначения. A — предлог цели."
    },
    {
        text: "Vengo ___ la escuela.",
        correct: "de",
        translation: "Я прихожу ___ из школы.",
        verb: "venir",
        explanation: "VENIR + de: источник движения, откуда пришёл. De = из/от."
    },
    {
        text: "¿Vienes ___ casa?",
        correct: "de",
        translation: "Ты приходишь ___ из дома?",
        verb: "venir",
        explanation: "VENIR + de: место, из которого движется человек. De = из."
    },
    {
        text: "Ella viene ___ España.",
        correct: "de",
        translation: "Она приезжает ___ из Испании.",
        verb: "venir",
        explanation: "VENIR + de + страна: происхождение или маршрут. De España = из Испании."
    },
    {
        text: "Llego ___ avión.",
        correct: "en",
        translation: "Я прибываю ___ на самолёте.",
        verb: "llegar",
        explanation: "LLEGAR + en + транспорт: способ прибытия. En avión = на самолёте."
    },
    {
        text: "¿Llegas ___ tren?",
        correct: "en",
        translation: "Ты прибываешь ___ на поезде?",
        verb: "llegar",
        explanation: "LLEGAR + en + транспорт: средство передвижения. En tren = на поезде."
    },
    {
        text: "Llego ___ casa tarde.",
        correct: "a",
        translation: "Я прибываю ___ домой поздно.",
        verb: "llegar",
        explanation: "LLEGAR + a: конечная точка прибытия. A casa = домой."
    },
    {
        text: "Vengo ___ correr.",
        correct: "de",
        translation: "Я прихожу ___ после пробежки.",
        verb: "venir",
        explanation: "VENIR + de + инфинитив: только что завершённое действие. De correr = после бега."
    }
];

if (typeof window !== 'undefined') {
    window.MODE3_QUESTIONS_DATA = MODE3_QUESTIONS_DATA;
}
