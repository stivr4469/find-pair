// spanish-trainer-app/tren/mode3-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 3: Data
 * Данные для режима "Предлоги (a/de/en)"
 */

const MODE3_QUESTIONS_DATA = [
    { text: "Voy ___ casa.", correct: "a", translation: "Я иду ___ домой.", verb: "ir" },
    { text: "Vamos ___ la escuela.", correct: "a", translation: "Мы идём ___ в школу.", verb: "ir" },
    { text: "¿Vas ___ el cine?", correct: "a", translation: "Ты идёшь ___ в кино?", verb: "ir" },
    { text: "Vengo ___ la escuela.", correct: "de", translation: "Я прихожу ___ из школы.", verb: "venir" },
    { text: "¿Vienes ___ casa?", correct: "de", translation: "Ты приходишь ___ из дома?", verb: "venir" },
    { text: "Ella viene ___ España.", correct: "de", translation: "Она приезжает ___ из Испании.", verb: "venir" },
    { text: "Llego ___ avión.", correct: "en", translation: "Я прибываю ___ на самолёте.", verb: "llegar" },
    { text: "¿Llegas ___ tren?", correct: "en", translation: "Ты прибываешь ___ на поезде?", verb: "llegar" },
    { text: "Llego ___ casa tarde.", correct: "a", translation: "Я прибываю ___ домой поздно.", verb: "llegar" },
    { text: "Vengo ___ correr.", correct: "de", translation: "Я прихожу ___ после пробежки.", verb: "venir" }
];

if (typeof window !== 'undefined') {
    window.MODE3_QUESTIONS_DATA = MODE3_QUESTIONS_DATA;
}
