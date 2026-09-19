// spanish-trainer-app/tren/mode7-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 7: Data
 * Данные для режима "Распределить по колонкам"
 */

const MODE7_ROUNDS = [
    {
        title: "Распредели формы глаголов (presente)",
        instruction: "Нажми на слово, затем нажми на нужную колонку",
        items: [
            { word: "voy", correctColumn: "ir" },
            { word: "vengo", correctColumn: "venir" },
            { word: "llego", correctColumn: "llegar" },
            { word: "vas", correctColumn: "ir" },
            { word: "vienes", correctColumn: "venir" },
            { word: "llegas", correctColumn: "llegar" },
            { word: "va", correctColumn: "ir" },
            { word: "viene", correctColumn: "venir" },
            { word: "llega", correctColumn: "llegar" },
            { word: "vamos", correctColumn: "ir" },
            { word: "venimos", correctColumn: "venir" },
            { word: "llegamos", correctColumn: "llegar" },
        ]
    },
    {
        title: "Распредели формы глаголов (indefinido)",
        instruction: "Нажми на слово, затем нажми на нужную колонку",
        items: [
            { word: "fui", correctColumn: "ir" },
            { word: "vine", correctColumn: "venir" },
            { word: "llegué", correctColumn: "llegar" },
            { word: "fuiste", correctColumn: "ir" },
            { word: "viniste", correctColumn: "venir" },
            { word: "llegaste", correctColumn: "llegar" },
            { word: "fue", correctColumn: "ir" },
            { word: "vino", correctColumn: "venir" },
            { word: "llegó", correctColumn: "llegar" },
            { word: "fuimos", correctColumn: "ir" },
            { word: "vinimos", correctColumn: "venir" },
            { word: "llegamos", correctColumn: "llegar" },
        ]
    },
    {
        title: "Распредели формы глаголов (imperfecto)",
        instruction: "Нажми на слово, затем нажми на нужную колонку",
        items: [
            { word: "iba", correctColumn: "ir" },
            { word: "venía", correctColumn: "venir" },
            { word: "llegaba", correctColumn: "llegar" },
            { word: "ibas", correctColumn: "ir" },
            { word: "venías", correctColumn: "venir" },
            { word: "llegabas", correctColumn: "llegar" },
            { word: "iban", correctColumn: "ir" },
            { word: "venían", correctColumn: "venir" },
            { word: "llegaban", correctColumn: "llegar" },
            { word: "íbamos", correctColumn: "ir" },
            { word: "veníamos", correctColumn: "venir" },
            { word: "llegábamos", correctColumn: "llegar" },
        ]
    },
    {
        title: "Распредели формы глаголов (futuro)",
        instruction: "Нажми на слово, затем нажми на нужную колонку",
        items: [
            { word: "iré", correctColumn: "ir" },
            { word: "vendré", correctColumn: "venir" },
            { word: "llegaré", correctColumn: "llegar" },
            { word: "irás", correctColumn: "ir" },
            { word: "vendrás", correctColumn: "venir" },
            { word: "llegarás", correctColumn: "llegar" },
            { word: "irá", correctColumn: "ir" },
            { word: "vendrá", correctColumn: "venir" },
            { word: "llegará", correctColumn: "llegar" },
            { word: "iremos", correctColumn: "ir" },
            { word: "vendremos", correctColumn: "venir" },
            { word: "llegaremos", correctColumn: "llegar" },
        ]
    },
    {
        title: "Смешанный раунд — все времена",
        instruction: "Определи глагол по форме и распредели по колонкам",
        items: [
            { word: "voy", correctColumn: "ir" },
            { word: "vine", correctColumn: "venir" },
            { word: "llegó", correctColumn: "llegar" },
            { word: "irás", correctColumn: "ir" },
            { word: "venía", correctColumn: "venir" },
            { word: "llegaste", correctColumn: "llegar" },
            { word: "fue", correctColumn: "ir" },
            { word: "vendrá", correctColumn: "venir" },
            { word: "llego", correctColumn: "llegar" },
            { word: "íbamos", correctColumn: "ir" },
            { word: "venimos", correctColumn: "venir" },
            { word: "llegaremos", correctColumn: "llegar" },
        ]
    },
    {
        title: "Бонусный раунд — 2-е и 3-е лица",
        instruction: "Распредели формы правильно — кто говорит или о ком речь?",
        items: [
            { word: "vas", correctColumn: "ir" },
            { word: "vienes", correctColumn: "venir" },
            { word: "llegas", correctColumn: "llegar" },
            { word: "fuiste", correctColumn: "ir" },
            { word: "viniste", correctColumn: "venir" },
            { word: "llegaste", correctColumn: "llegar" },
            { word: "va", correctColumn: "ir" },
            { word: "vino", correctColumn: "venir" },
            { word: "llegó", correctColumn: "llegar" },
            { word: "vendrás", correctColumn: "venir" },
            { word: "irá", correctColumn: "ir" },
            { word: "llegará", correctColumn: "llegar" },
        ]
    }
];
