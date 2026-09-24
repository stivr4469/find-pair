/**
 * Ser vs Estar — Rules Data (DOCTOR / PLACE)
 * SER_RULES и ESTAR_RULES используются в ser-estar-rules-ui.js и ser-estar-mode3.js
 */

// SER — мнемоника DOCTOR
const SER_RULES = {
    'D — Description': {
        name: 'Description',
        description: 'Описание внешности и постоянных черт характера',
        examples: [
            { es: 'Ella es alta y delgada.', ru: 'Она высокая и стройная.' },
            { es: 'Mi padre es muy serio.', ru: 'Мой отец очень серьёзный.' },
            { es: 'Este edificio es muy antiguo.', ru: 'Это здание очень старое.' }
        ]
    },
    'O — Occupation': {
        name: 'Occupation',
        description: 'Профессия, занятие и роль',
        examples: [
            { es: 'Nosotros somos médicos.', ru: 'Мы врачи.' },
            { es: '¿Tú eres estudiante?', ru: 'Ты студент?' },
            { es: 'Ella es profesora de español.', ru: 'Она учитель испанского.' }
        ]
    },
    'C — Characteristic': {
        name: 'Characteristic',
        description: 'Постоянные свойства, материал и принадлежность',
        examples: [
            { es: 'Este reloj es de oro.', ru: 'Эти часы из золота.' },
            { es: 'La mesa es de madera.', ru: 'Стол деревянный.' },
            { es: 'El libro es de María.', ru: 'Книга принадлежит Марии.' }
        ]
    },
    'T — Time': {
        name: 'Time',
        description: 'Дата, время, день недели, сезон',
        examples: [
            { es: 'Hoy es lunes.', ru: 'Сегодня понедельник.' },
            { es: 'Son las tres de la tarde.', ru: 'Сейчас три часа дня.' },
            { es: 'La boda es el sábado.', ru: 'Свадьба в субботу.' }
        ]
    },
    'O — Origin': {
        name: 'Origin',
        description: 'Происхождение, национальность, место рождения',
        examples: [
            { es: 'Yo soy de Madrid.', ru: 'Я из Мадрида.' },
            { es: 'Ella es española.', ru: 'Она испанка.' },
            { es: 'El vino es de La Rioja.', ru: 'Вино из Риохи.' }
        ]
    },
    'R — Relationship': {
        name: 'Relationship',
        description: 'Родство, семейные и личные отношения',
        examples: [
            { es: 'Rafael y Juan son hermanos.', ru: 'Рафаэль и Хуан — братья.' },
            { es: 'Ella es mi novia.', ru: 'Она моя девушка.' },
            { es: 'Somos amigos desde niños.', ru: 'Мы друзья с детства.' }
        ]
    }
};

// ESTAR — мнемоника PLACE
const ESTAR_RULES = {
    'P — Position': {
        name: 'Position',
        description: 'Местоположение людей, предметов и географических объектов',
        examples: [
            { es: 'Madrid está en el centro de España.', ru: 'Мадрид находится в центре Испании.' },
            { es: 'Mis llaves están sobre la mesa.', ru: 'Мои ключи на столе.' },
            { es: 'Mi hermano está en México.', ru: 'Мой брат в Мексике.' }
        ]
    },
    'L — Linked state': {
        name: 'Linked state',
        description: 'Состояние как результат завершённого действия (estar + participio)',
        examples: [
            { es: 'La ventana está abierta.', ru: 'Окно открыто (кто-то открыл).' },
            { es: 'El vaso está roto.', ru: 'Стакан разбит.' },
            { es: 'La tarea está hecha.', ru: 'Задание выполнено.' }
        ]
    },
    'A — Action': {
        name: 'Action',
        description: 'Действие в процессе (estar + gerundio)',
        examples: [
            { es: 'Nosotros estamos comiendo paella.', ru: 'Мы сейчас едим паэлью.' },
            { es: 'Ella está estudiando español.', ru: 'Она сейчас учит испанский.' },
            { es: '¿Qué estás haciendo?', ru: 'Что ты сейчас делаешь?' }
        ]
    },
    'C — Condition': {
        name: 'Condition',
        description: 'Временное физическое состояние человека или предмета',
        examples: [
            { es: 'Yo estoy muy cansado hoy.', ru: 'Я сегодня очень устал.' },
            { es: 'La sopa está caliente.', ru: 'Суп горячий (сейчас).' },
            { es: 'Estás enfermo, quédate en casa.', ru: 'Ты болен — оставайся дома.' }
        ]
    },
    'E — Emotion': {
        name: 'Emotion',
        description: 'Эмоциональное состояние в данный момент',
        examples: [
            { es: 'Tú estás muy triste hoy.', ru: 'Ты сегодня очень грустный.' },
            { es: 'Estamos muy contentos con los resultados.', ru: 'Мы очень довольны результатами.' },
            { es: 'Ella está nerviosa antes del examen.', ru: 'Она нервничает перед экзаменом.' }
        ]
    }
};
