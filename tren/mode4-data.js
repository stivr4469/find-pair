// spanish-trainer-app/tren/mode4-data.js
/**
 * Tren Ir/Venir/Llegar - Mode 4: Data
 * Данные для режима "Перевод"
 */

const MODE4_TRANSLATIONS = [
    {
        russian: "Я иду домой сейчас.",
        spanish: "Voy a casa ahora.",
        options: ["Voy a casa ahora.", "Vengo a casa ahora.", "Llego a casa ahora.", "Fui a casa ahora."],
        verb: "ir", tense: "presente", person: "yo",
        explanation: "IR (presente, yo): движение к цели. Voy = я иду/еду."
    },
    {
        russian: "Ты идёшь в школу.",
        spanish: "Vas a la escuela.",
        options: ["Vas a la escuela.", "Vienes de la escuela.", "Llegas a la escuela.", "Fuiste a la escuela."],
        verb: "ir", tense: "presente", person: "tu",
        explanation: "IR (presente, tú): Vas = ты идёшь. Глагол ir неправильный: voy, vas, va..."
    },
    {
        russian: "Он идёт в Мадрид завтра.",
        spanish: "Va a Madrid mañana.",
        options: ["Va a Madrid mañana.", "Viene de Madrid mañana.", "Llega a Madrid mañana.", "Fue a Madrid mañana."],
        verb: "ir", tense: "presente", person: "el/ella",
        explanation: "IR (presente, él): Va = он идёт. Presente для запланированного будущего."
    },
    {
        russian: "Мы идём в кино.",
        spanish: "Vamos al cine.",
        options: ["Vamos al cine.", "Venimos del cine.", "Llegamos al cine.", "Fuimos al cine."],
        verb: "ir", tense: "presente", person: "nosotros",
        explanation: "IR (presente, nosotros): Vamos = мы идём. Al = a + el (слияние)."
    },
    {
        russian: "Они идут на вечеринку.",
        spanish: "Van a la fiesta.",
        options: ["Van a la fiesta.", "Vienen de la fiesta.", "Llegan a la fiesta.", "Fueron a la fiesta."],
        verb: "ir", tense: "presente", person: "ellos",
        explanation: "IR (presente, ellos): Van = они идут. IR указывает на направление движения."
    },
    {
        russian: "Я пошёл домой вчера.",
        spanish: "Fui a casa ayer.",
        options: ["Fui a casa ayer.", "Vine a casa ayer.", "Llegué a casa ayer.", "Voy a casa ayer."],
        verb: "ir", tense: "indefinido", person: "yo",
        explanation: "IR (indefinido, yo): Fui = я пошёл. Indefinido — завершённое прошедшее действие."
    },
    {
        russian: "Ты пошёл на работу.",
        spanish: "Fuiste al trabajo.",
        options: ["Fuiste al trabajo.", "Viniste del trabajo.", "Llegaste al trabajo.", "Vas al trabajo."],
        verb: "ir", tense: "indefinido", person: "tu",
        explanation: "IR (indefinido, tú): Fuiste = ты пошёл. IR и SER имеют одинаковые формы в indefinido!"
    },
    {
        russian: "Она пошла в библиотеку.",
        spanish: "Fue a la biblioteca.",
        options: ["Fue a la biblioteca.", "Vino de la biblioteca.", "Llegó a la biblioteca.", "Va a la biblioteca."],
        verb: "ir", tense: "indefinido", person: "el/ella",
        explanation: "IR (indefinido, ella): Fue = она пошла. Контекст определяет: IR или SER."
    },
    {
        russian: "Я прихожу из школы.",
        spanish: "Vengo de la escuela.",
        options: ["Vengo de la escuela.", "Voy a la escuela.", "Llego de la escuela.", "Vine de la escuela."],
        verb: "venir", tense: "presente", person: "yo",
        explanation: "VENIR (presente, yo): Vengo = я прихожу. Venir + de = движение от места."
    },
    {
        russian: "Ты приходишь с работы.",
        spanish: "Vienes del trabajo.",
        options: ["Vienes del trabajo.", "Vas al trabajo.", "Llegas del trabajo.", "Viniste del trabajo."],
        verb: "venir", tense: "presente", person: "tu",
        explanation: "VENIR (presente, tú): Vienes = ты приходишь. Del = de + el (слияние)."
    },
    {
        russian: "Она приходит из Испании.",
        spanish: "Viene de España.",
        options: ["Viene de España.", "Va a España.", "Llega de España.", "Vino de España."],
        verb: "venir", tense: "presente", person: "el/ella",
        explanation: "VENIR (presente, ella): Viene = она приходит. De España — из Испании."
    },
    {
        russian: "Мы приходим из библиотеки.",
        spanish: "Venimos de la biblioteca.",
        options: ["Venimos de la biblioteca.", "Vamos a la biblioteca.", "Llegamos de la biblioteca.", "Vinimos de la biblioteca."],
        verb: "venir", tense: "presente", person: "nosotros",
        explanation: "VENIR (presente, nosotros): Venimos = мы приходим. Форма правильная."
    },
    {
        russian: "Они приходят с вечеринки.",
        spanish: "Vienen de la fiesta.",
        options: ["Vienen de la fiesta.", "Van a la fiesta.", "Llegan de la fiesta.", "Vinieron de la fiesta."],
        verb: "venir", tense: "presente", person: "ellos",
        explanation: "VENIR (presente, ellos): Vienen = они приходят. De la fiesta — с вечеринки."
    },
    {
        russian: "Я пришёл домой поздно.",
        spanish: "Llegué a casa tarde.",
        options: ["Llegué a casa tarde.", "Vine a casa tarde.", "Fui a casa tarde.", "Llego a casa tarde."],
        verb: "llegar", tense: "indefinido", person: "yo",
        explanation: "LLEGAR (indefinido, yo): Llegué = я пришёл. Акцент на факте прибытия в прошлом."
    },
    {
        russian: "Ты пришёл с работы уставшим.",
        spanish: "Llegaste del trabajo cansado.",
        options: ["Llegaste del trabajo cansado.", "Viniste del trabajo cansado.", "Fuiste del trabajo cansado.", "Llegas del trabajo cansado."],
        verb: "llegar", tense: "indefinido", person: "tu",
        explanation: "LLEGAR (indefinido, tú): Llegaste = ты пришёл. Прилагательное описывает состояние."
    },
    {
        russian: "Она пришла из школы рано.",
        spanish: "Llegó de la escuela temprano.",
        options: ["Llegó de la escuela temprano.", "Vino de la escuela temprano.", "Fue de la escuela temprano.", "Llega de la escuela temprano."],
        verb: "llegar", tense: "indefinido", person: "el/ella",
        explanation: "LLEGAR (indefinido, ella): Llegó = она пришла. Акцент на точке прибытия."
    },
    {
        russian: "Я прибываю на поезде.",
        spanish: "Llego en tren.",
        options: ["Llego en tren.", "Vengo en tren.", "Voy en tren.", "Llegué en tren."],
        verb: "llegar", tense: "presente", person: "yo",
        explanation: "LLEGAR + en + транспорт: En tren = на поезде. LLEGAR подчёркивает момент прибытия."
    },
    {
        russian: "Ты прибываешь на станцию.",
        spanish: "Llegas a la estación.",
        options: ["Llegas a la estación.", "Vienes a la estación.", "Vas a la estación.", "Llegaste a la estación."],
        verb: "llegar", tense: "presente", person: "tu",
        explanation: "LLEGAR + a + место: Llegas a la estación = ты прибываешь на станцию."
    },
    {
        russian: "Она прибывает на самолёте.",
        spanish: "Llega en avión.",
        options: ["Llega en avión.", "Viene en avión.", "Va en avión.", "Llegó en avión."],
        verb: "llegar", tense: "presente", person: "el/ella",
        explanation: "LLEGAR + en avión: способ прибытия. LLEGAR — конечная точка маршрута."
    },
    {
        russian: "Мы прибываем вовремя.",
        spanish: "Llegamos a tiempo.",
        options: ["Llegamos a tiempo.", "Venimos a tiempo.", "Vamos a tiempo.", "Llegamos a tiempo."],
        verb: "llegar", tense: "presente", person: "nosotros",
        explanation: "LLEGAR a tiempo: устойчивое выражение — прибыть/прийти вовремя."
    },
    {
        russian: "Они прибывают на автобусе.",
        spanish: "Llegan en autobús.",
        options: ["Llegan en autobús.", "Vienen en autobús.", "Van en autobús.", "Llegaron en autobús."],
        verb: "llegar", tense: "presente", person: "ellos",
        explanation: "LLEGAR + en + транспорт: En autobús = на автобусе. Llegan = они прибывают."
    },
    {
        russian: "Я пойду домой завтра.",
        spanish: "Iré a casa mañana.",
        options: ["Iré a casa mañana.", "Vendré a casa mañana.", "Llegaré a casa mañana.", "Voy a casa mañana."],
        verb: "ir", tense: "futuro", person: "yo",
        explanation: "IR (futuro, yo): Iré = я пойду. Futuro simple — действие в будущем."
    },
    {
        russian: "Ты придёшь с работы поздно.",
        spanish: "Vendrás del trabajo tarde.",
        options: ["Vendrás del trabajo tarde.", "Irás del trabajo tarde.", "Llegarás del trabajo tarde.", "Vienes del trabajo tarde."],
        verb: "venir", tense: "futuro", person: "tu",
        explanation: "VENIR (futuro, tú): Vendrás = ты придёшь. Неправильная форма: venir → vendr-."
    },
    {
        russian: "Она придёт на самолёте.",
        spanish: "Vendrá en avión.",
        options: ["Vendrá en avión.", "Irá en avión.", "Llegará en avión.", "Viene en avión."],
        verb: "venir", tense: "futuro", person: "el/ella",
        explanation: "VENIR (futuro, ella): Vendrá = она придёт. Vendr- — неправильная основа."
    },
    {
        russian: "Я шёл домой, когда встретил друга. (imperfecto)",
        spanish: "Iba a casa cuando encontré a un amigo.",
        options: ["Iba a casa cuando encontré a un amigo.", "Venía a casa cuando encontré a un amigo.", "Llegaba a casa cuando encontré a un amigo.", "Fui a casa cuando encontré a un amigo."],
        verb: "ir", tense: "imperfecto", person: "yo",
        explanation: "IR (imperfecto): Iba = шёл (процесс). Imperfecto + indefinido: фон + событие."
    },
    {
        russian: "Ты приходил с работы уставшим. (imperfecto)",
        spanish: "Venías del trabajo cansado.",
        options: ["Venías del trabajo cansado.", "Ibas del trabajo cansado.", "Llegabas del trabajo cansado.", "Viniste del trabajo cansado."],
        verb: "venir", tense: "imperfecto", person: "tu",
        explanation: "VENIR (imperfecto, tú): Venías = ты приходил (регулярно/в процессе)."
    },
    {
        russian: "Она прибывала на поезде каждый день. (imperfecto)",
        spanish: "Llegaba en tren todos los días.",
        options: ["Llegaba en tren todos los días.", "Venía en tren todos los días.", "Iba en tren todos los días.", "Llegó en tren todos los días."],
        verb: "llegar", tense: "imperfecto", person: "el/ella",
        explanation: "LLEGAR (imperfecto): Llegaba = прибывала (привычное действие в прошлом)."
    }
];

if (typeof window !== 'undefined') {
    window.MODE4_TRANSLATIONS = MODE4_TRANSLATIONS;
}
