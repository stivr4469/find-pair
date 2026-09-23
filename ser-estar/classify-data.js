/**
 * Ser vs Estar - Classify Mode Data
 * 40+ предложений, покрывающих все ключевые случаи SER и ESTAR
 */

const CLASSIFY_DATA = [
    // === SER: Профессия (Occupation) ===
    {
        sentence: "Mi hermano ___ médico",
        full: "Mi hermano es médico",
        verb: "es",
        answer: "SER",
        rule: "Профессия → SER",
        explanation: "Ser используется для профессий и занятий — это постоянная роль человека"
    },
    {
        sentence: "Ella ___ profesora de matemáticas",
        full: "Ella es profesora de matemáticas",
        verb: "es",
        answer: "SER",
        rule: "Профессия → SER",
        explanation: "Ser + профессия: описывает постоянный род деятельности"
    },
    {
        sentence: "Nosotros ___ ingenieros en esa empresa",
        full: "Nosotros somos ingenieros en esa empresa",
        verb: "somos",
        answer: "SER",
        rule: "Профессия → SER",
        explanation: "Профессии всегда требуют ser — это часть идентичности человека"
    },

    // === SER: Национальность и происхождение ===
    {
        sentence: "Yo ___ de México, pero vivo en España",
        full: "Yo soy de México, pero vivo en España",
        verb: "soy",
        answer: "SER",
        rule: "Происхождение → SER",
        explanation: "Ser de + место = происхождение. Это постоянная характеристика"
    },
    {
        sentence: "Ellos ___ argentinos",
        full: "Ellos son argentinos",
        verb: "son",
        answer: "SER",
        rule: "Национальность → SER",
        explanation: "Национальность — постоянная черта идентичности, поэтому ser"
    },
    {
        sentence: "Mi madre ___ española",
        full: "Mi madre es española",
        verb: "es",
        answer: "SER",
        rule: "Национальность → SER",
        explanation: "Ser используется для национальности как постоянного признака"
    },

    // === SER: Материал ===
    {
        sentence: "Esta mesa ___ de madera",
        full: "Esta mesa es de madera",
        verb: "es",
        answer: "SER",
        rule: "Материал → SER",
        explanation: "Ser de + материал описывает, из чего сделан предмет"
    },
    {
        sentence: "El anillo ___ de oro",
        full: "El anillo es de oro",
        verb: "es",
        answer: "SER",
        rule: "Материал → SER",
        explanation: "Материал, из которого изготовлен предмет, выражается через ser de"
    },

    // === SER: Характеристика (постоянная) ===
    {
        sentence: "Mi padre ___ muy simpático",
        full: "Mi padre es muy simpático",
        verb: "es",
        answer: "SER",
        rule: "Постоянная черта → SER",
        explanation: "Ser описывает постоянные черты характера и личности"
    },
    {
        sentence: "La casa ___ grande y moderna",
        full: "La casa es grande y moderna",
        verb: "es",
        answer: "SER",
        rule: "Постоянное свойство → SER",
        explanation: "Размер и постоянные свойства предметов описываются через ser"
    },
    {
        sentence: "Tu hermana ___ muy inteligente",
        full: "Tu hermana es muy inteligente",
        verb: "es",
        answer: "SER",
        rule: "Постоянная черта → SER",
        explanation: "Интеллект — устойчивая характеристика личности, используем ser"
    },

    // === SER: Время и дата ===
    {
        sentence: "Hoy ___ martes",
        full: "Hoy es martes",
        verb: "es",
        answer: "SER",
        rule: "День недели → SER",
        explanation: "Дни недели, даты и время всегда используют ser"
    },
    {
        sentence: "La reunión ___ a las tres",
        full: "La reunión es a las tres",
        verb: "es",
        answer: "SER",
        rule: "Время события → SER",
        explanation: "Время проведения событий выражается через ser"
    },
    {
        sentence: "Ahora ___ las ocho de la noche",
        full: "Ahora son las ocho de la noche",
        verb: "son",
        answer: "SER",
        rule: "Время → SER",
        explanation: "Для выражения времени суток используется ser"
    },

    // === SER: Владение ===
    {
        sentence: "Este libro ___ de Ana",
        full: "Este libro es de Ana",
        verb: "es",
        answer: "SER",
        rule: "Принадлежность → SER",
        explanation: "Ser de + лицо выражает принадлежность предмета"
    },
    {
        sentence: "¿De quién ___ este coche?",
        full: "¿De quién es este coche?",
        verb: "es",
        answer: "SER",
        rule: "Владение → SER",
        explanation: "Вопрос о принадлежности строится с ser de"
    },

    // === SER: Пассивный залог ===
    {
        sentence: "El libro ___ escrito por García Márquez",
        full: "El libro es escrito por García Márquez",
        verb: "es",
        answer: "SER",
        rule: "Пассивный залог → SER",
        explanation: "Ser + причастие образует пассивный залог (pasiva)"
    },
    {
        sentence: "La carta ___ firmada por el director",
        full: "La carta es firmada por el director",
        verb: "es",
        answer: "SER",
        rule: "Пассивный залог → SER",
        explanation: "Пассивная конструкция ser + participio всегда использует ser"
    },

    // === SER: Религия и убеждения ===
    {
        sentence: "Mi familia ___ católica",
        full: "Mi familia es católica",
        verb: "es",
        answer: "SER",
        rule: "Религия/убеждения → SER",
        explanation: "Религиозная и политическая принадлежность выражается через ser"
    },

    // === SER: Отношения ===
    {
        sentence: "Juan y Pedro ___ hermanos",
        full: "Juan y Pedro son hermanos",
        verb: "son",
        answer: "SER",
        rule: "Родство → SER",
        explanation: "Родственные отношения — постоянная характеристика, используем ser"
    },

    // === ESTAR: Местонахождение ===
    {
        sentence: "Las llaves ___ sobre la mesa",
        full: "Las llaves están sobre la mesa",
        verb: "están",
        answer: "ESTAR",
        rule: "Местонахождение → ESTAR",
        explanation: "Estar используется для обозначения местоположения предметов и людей"
    },
    {
        sentence: "Madrid ___ en el centro de España",
        full: "Madrid está en el centro de España",
        verb: "está",
        answer: "ESTAR",
        rule: "Расположение города → ESTAR",
        explanation: "Географическое положение мест выражается через estar"
    },
    {
        sentence: "Mi padre ___ en el trabajo ahora",
        full: "Mi padre está en el trabajo ahora",
        verb: "está",
        answer: "ESTAR",
        rule: "Местонахождение → ESTAR",
        explanation: "Estar показывает, где находится человек в данный момент"
    },
    {
        sentence: "¿Dónde ___ el baño?",
        full: "¿Dónde está el baño?",
        verb: "está",
        answer: "ESTAR",
        rule: "Вопрос о местонахождении → ESTAR",
        explanation: "Вопросы о местонахождении используют estar"
    },

    // === ESTAR: Состояние (эмоции) ===
    {
        sentence: "Yo ___ muy contento hoy",
        full: "Yo estoy muy contento hoy",
        verb: "estoy",
        answer: "ESTAR",
        rule: "Эмоциональное состояние → ESTAR",
        explanation: "Estar описывает временные эмоциональные состояния"
    },
    {
        sentence: "Ella ___ triste porque perdió el trabajo",
        full: "Ella está triste porque perdió el trabajo",
        verb: "está",
        answer: "ESTAR",
        rule: "Эмоция → ESTAR",
        explanation: "Грусть, радость и другие эмоции — временные состояния через estar"
    },
    {
        sentence: "Los niños ___ emocionados con el viaje",
        full: "Los niños están emocionados con el viaje",
        verb: "están",
        answer: "ESTAR",
        rule: "Эмоция → ESTAR",
        explanation: "Estar выражает временные эмоции, в отличие от характера через ser"
    },

    // === ESTAR: Состояние здоровья ===
    {
        sentence: "Mi abuela ___ enferma esta semana",
        full: "Mi abuela está enferma esta semana",
        verb: "está",
        answer: "ESTAR",
        rule: "Здоровье → ESTAR",
        explanation: "Самочувствие и состояние здоровья — временное состояние через estar"
    },
    {
        sentence: "Yo ___ cansado después del trabajo",
        full: "Yo estoy cansado después del trabajo",
        verb: "estoy",
        answer: "ESTAR",
        rule: "Физическое состояние → ESTAR",
        explanation: "Усталость — временное физическое состояние, используем estar"
    },

    // === ESTAR: Временное состояние ===
    {
        sentence: "La ventana ___ abierta",
        full: "La ventana está abierta",
        verb: "está",
        answer: "ESTAR",
        rule: "Результат действия → ESTAR",
        explanation: "Estar + причастие описывает состояние как результат действия"
    },
    {
        sentence: "La comida ___ lista",
        full: "La comida está lista",
        verb: "está",
        answer: "ESTAR",
        rule: "Готовность → ESTAR",
        explanation: "Estar listo = быть готовым (временное состояние)"
    },
    {
        sentence: "El café ___ frío",
        full: "El café está frío",
        verb: "está",
        answer: "ESTAR",
        rule: "Временная температура → ESTAR",
        explanation: "Температура еды и напитков — временное состояние через estar"
    },
    {
        sentence: "Las tiendas ___ cerradas hoy",
        full: "Las tiendas están cerradas hoy",
        verb: "están",
        answer: "ESTAR",
        rule: "Состояние (закрыт/открыт) → ESTAR",
        explanation: "Открытость или закрытость — результат действия, используем estar"
    },
    {
        sentence: "El piso ___ limpio",
        full: "El piso está limpio",
        verb: "está",
        answer: "ESTAR",
        rule: "Результат действия → ESTAR",
        explanation: "Estar describe el resultado de una acción — el piso fue limpiado"
    },

    // === ESTAR: Герундий (действие в процессе) ===
    {
        sentence: "Nosotros ___ comiendo ahora",
        full: "Nosotros estamos comiendo ahora",
        verb: "estamos",
        answer: "ESTAR",
        rule: "Герундий (действие) → ESTAR",
        explanation: "Estar + gerundio выражает действие, происходящее прямо сейчас"
    },
    {
        sentence: "Ella ___ estudiando para el examen",
        full: "Ella está estudiando para el examen",
        verb: "está",
        answer: "ESTAR",
        rule: "Действие в процессе → ESTAR",
        explanation: "Estar + -ando/-iendo = продолженное время (presente continuo)"
    },
    {
        sentence: "Los estudiantes ___ trabajando en grupo",
        full: "Los estudiantes están trabajando en grupo",
        verb: "están",
        answer: "ESTAR",
        rule: "Процессное действие → ESTAR",
        explanation: "Estar + gerundio описывает незавершённое текущее действие"
    },

    // === ESTAR: Особые случаи ===
    {
        sentence: "Mi abuelo ___ muerto",
        full: "Mi abuelo está muerto",
        verb: "está",
        answer: "ESTAR",
        rule: "Состояние жизни/смерти → ESTAR",
        explanation: "Смерть рассматривается как состояние (результат), поэтому estar"
    },
    {
        sentence: "Tú ___ equivocado",
        full: "Tú estás equivocado",
        verb: "estás",
        answer: "ESTAR",
        rule: "Временное состояние → ESTAR",
        explanation: "Estar equivocado = ошибаться в данный момент (не характер)"
    },
    {
        sentence: "El agua ___ muy caliente",
        full: "El agua está muy caliente",
        verb: "está",
        answer: "ESTAR",
        rule: "Температура → ESTAR",
        explanation: "Температура жидкости — временное состояние, используем estar"
    },

    // === SER: Дополнительные случаи ===
    {
        sentence: "La conferencia ___ en el auditorio",
        full: "La conferencia es en el auditorio",
        verb: "es",
        answer: "SER",
        rule: "Место события → SER",
        explanation: "Место проведения мероприятий выражается через ser (не путать с местонахождением предметов!)"
    },
    {
        sentence: "El examen ___ muy difícil",
        full: "El examen es muy difícil",
        verb: "es",
        answer: "SER",
        rule: "Характеристика → SER",
        explanation: "Ser описывает постоянные свойства — сложность экзамена как его качество"
    },
    {
        sentence: "El vino ___ de Chile",
        full: "El vino es de Chile",
        verb: "es",
        answer: "SER",
        rule: "Происхождение продукта → SER",
        explanation: "Ser de + место = происхождение товара или продукта"
    },

    // === ESTAR: Дополнительные случаи ===
    {
        sentence: "Yo ___ de acuerdo contigo",
        full: "Yo estoy de acuerdo contigo",
        verb: "estoy",
        answer: "ESTAR",
        rule: "Временное согласие → ESTAR",
        explanation: "Estar de acuerdo — идиоматическое выражение со estar для согласия"
    },
    {
        sentence: "El paciente ___ mejor hoy",
        full: "El paciente está mejor hoy",
        verb: "está",
        answer: "ESTAR",
        rule: "Улучшение состояния → ESTAR",
        explanation: "Estar mejor = чувствовать себя лучше (изменение состояния)"
    }
];

// Экспорт
if (typeof window !== 'undefined') {
    window.CLASSIFY_DATA = CLASSIFY_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLASSIFY_DATA };
}
