// spanish-trainer-app/tren/mode1-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 1: Data
 * Данные для режима "Выбор глагола"
 */

const MODE1_SENTENCES = [
    { text: "Yo ___ a casa ahora.", correct: "voy", options: ["voy", "vengo", "llego"], translation: "Я иду домой сейчас." },
    { text: "¿Tú ___ de la escuela?", correct: "vienes", options: ["vas", "vienes", "llegas"], translation: "Ты приходишь из школы?" },
    { text: "Él ___ a Madrid mañana.", correct: "llega", options: ["va", "viene", "llega"], translation: "Он прибывает в Мадрид завтра." },
    { text: "Nosotros ___ al cine.", correct: "vamos", options: ["vamos", "venimos", "llegamos"], translation: "Мы идём в кино." },
    { text: "Ellos ___ tarde.", correct: "llegan", options: ["van", "vienen", "llegan"], translation: "Они приходят поздно." },
    { text: "¿Vosotros ___ en tren?", correct: "venís", options: ["vais", "venís", "llegáis"], translation: "Вы приезжаете на поезде?" },
    { text: "Yo ___ a ser médico.", correct: "voy", options: ["voy", "vengo", "llego"], translation: "Я собираюсь стать врачом." },
    { text: "Ella ___ de España.", correct: "viene", options: ["va", "viene", "llega"], translation: "Она приезжает из Испании." },
    { text: "¿Cuándo ___ tú?", correct: "llegas", options: ["vas", "vienes", "llegas"], translation: "Когда ты приезжаешь?" },
    { text: "Nosotros ___ cansados.", correct: "llegamos", options: ["vamos", "venimos", "llegamos"], translation: "Мы приходим уставшими." }
];

// Экспорт для глобального доступа
if (typeof window !== 'undefined') {
    window.MODE1_SENTENCES = MODE1_SENTENCES;
}
