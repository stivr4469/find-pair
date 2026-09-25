/**
 * Ser vs Estar — предложения для режимов спряжения (Базовое / Продвинутое).
 * CONJ_SENTENCES[verb][tense][person] = [{ text, ru }, ...]
 * В text пропуск ___ — туда встаёт форма CONJUGATIONS[verb][tense][person].
 * В каждом предложении есть подлежащее (лицо) и маркер времени — форму можно вывести из контекста.
 * По 2 предложения на комбинацию: Базовый режим проходит 2 круга по 6 лиц без повторов.
 */

const CONJ_SENTENCES = {
    ser: {
        presente: {
            yo:         [{ text: "Yo ___ estudiante de español.", ru: "Я изучаю испанский (я студент)." },
                         { text: "Yo ___ de Rusia, de Moscú.", ru: "Я из России, из Москвы." }],
            tu:         [{ text: "Tú ___ muy simpático.", ru: "Ты очень симпатичный." },
                         { text: "¿Tú ___ el hermano de Ana?", ru: "Ты брат Аны?" }],
            "el/ella":  [{ text: "Ella ___ médica en un hospital.", ru: "Она врач в больнице." },
                         { text: "Mi padre ___ muy alto.", ru: "Мой папа очень высокий." }],
            nosotros:   [{ text: "Nosotros ___ amigos desde el colegio.", ru: "Мы друзья со школы." },
                         { text: "Nosotros ___ de Barcelona.", ru: "Мы из Барселоны." }],
            vosotros:   [{ text: "Vosotros ___ muy buenos estudiantes.", ru: "Вы очень хорошие студенты." },
                         { text: "¿Vosotros ___ hermanos?", ru: "Вы братья?" }],
            ellos:      [{ text: "Ellos ___ profesores de música.", ru: "Они учителя музыки." },
                         { text: "Mis abuelos ___ de Valencia.", ru: "Мои бабушка и дедушка из Валенсии." }]
        },
        indefinido: {
            yo:         [{ text: "Ayer yo ___ el primero en llegar a clase.", ru: "Вчера я пришёл на урок первым." },
                         { text: "En 2015 yo ___ presidente del club.", ru: "В 2015 году я был президентом клуба." }],
            tu:         [{ text: "Ayer tú ___ muy amable conmigo.", ru: "Вчера ты был очень любезен со мной." },
                         { text: "El año pasado tú ___ el mejor jugador del equipo.", ru: "В прошлом году ты был лучшим игроком команды." }],
            "el/ella":  [{ text: "La fiesta de ayer ___ increíble.", ru: "Вчерашняя вечеринка была невероятной." },
                         { text: "La reunión del lunes ___ muy larga.", ru: "Собрание в понедельник было очень долгим." }],
            nosotros:   [{ text: "Anoche nosotros ___ los últimos en salir.", ru: "Вчера вечером мы ушли последними." },
                         { text: "En 2020 nosotros ___ campeones de la liga.", ru: "В 2020 году мы стали чемпионами лиги." }],
            vosotros:   [{ text: "Ayer vosotros ___ muy valientes.", ru: "Вчера вы были очень смелыми." },
                         { text: "El verano pasado vosotros ___ los organizadores del viaje.", ru: "Прошлым летом вы были организаторами поездки." }],
            ellos:      [{ text: "Los exámenes de ayer ___ muy difíciles.", ru: "Вчерашние экзамены были очень трудными." },
                         { text: "Aquellas vacaciones ___ inolvidables.", ru: "Те каникулы были незабываемыми." }]
        },
        imperfecto: {
            yo:         [{ text: "De niño yo ___ muy tímido.", ru: "В детстве я был очень застенчивым." },
                         { text: "Cuando yo ___ joven, vivía en Madrid.", ru: "Когда я был молодым, я жил в Мадриде." }],
            tu:         [{ text: "De pequeño tú ___ muy travieso.", ru: "В детстве ты был очень озорным." },
                         { text: "Cuando tú ___ niño, ¿te gustaba el fútbol?", ru: "Когда ты был ребёнком, тебе нравился футбол?" }],
            "el/ella":  [{ text: "Antes mi abuela ___ profesora.", ru: "Раньше моя бабушка была учительницей." },
                         { text: "Cuando ella ___ pequeña, tenía un perro.", ru: "Когда она была маленькой, у неё была собака." }],
            nosotros:   [{ text: "Antes nosotros ___ vecinos.", ru: "Раньше мы были соседями." },
                         { text: "Cuando nosotros ___ estudiantes, salíamos mucho.", ru: "Когда мы были студентами, мы часто гуляли." }],
            vosotros:   [{ text: "De niños vosotros ___ inseparables.", ru: "В детстве вы были неразлучны." },
                         { text: "Antes vosotros ___ muy buenos amigos, ¿verdad?", ru: "Раньше вы были очень хорошими друзьями, правда?" }],
            ellos:      [{ text: "Mis padres ___ muy jóvenes cuando se casaron.", ru: "Мои родители были очень молоды, когда поженились." },
                         { text: "Antes las calles ___ más tranquilas.", ru: "Раньше улицы были спокойнее." }]
        },
        futuro: {
            yo:         [{ text: "El año que viene yo ___ médico.", ru: "В следующем году я буду врачом." },
                         { text: "Mañana yo ___ el primero en llegar.", ru: "Завтра я приду первым." }],
            tu:         [{ text: "Algún día tú ___ un gran músico.", ru: "Когда-нибудь ты будешь великим музыкантом." },
                         { text: "Mañana tú ___ el responsable del grupo.", ru: "Завтра ты будешь ответственным за группу." }],
            "el/ella":  [{ text: "La boda ___ el próximo sábado.", ru: "Свадьба будет в следующую субботу." },
                         { text: "El concierto de mañana ___ en el parque.", ru: "Завтрашний концерт будет в парке." }],
            nosotros:   [{ text: "Dentro de diez años nosotros ___ abuelos.", ru: "Через десять лет мы будем бабушкой и дедушкой." },
                         { text: "Pronto nosotros ___ compañeros de trabajo.", ru: "Скоро мы будем коллегами." }],
            vosotros:   [{ text: "El próximo año vosotros ___ los profesores.", ru: "В следующем году учителями будете вы." },
                         { text: "Mañana vosotros ___ nuestros invitados.", ru: "Завтра вы будете нашими гостями." }],
            ellos:      [{ text: "En el futuro mis hijos ___ ingenieros.", ru: "В будущем мои дети будут инженерами." },
                         { text: "Las próximas vacaciones ___ en la playa.", ru: "Следующие каникулы будут на пляже." }]
        }
    },
    estar: {
        presente: {
            yo:         [{ text: "Hoy yo ___ muy cansado.", ru: "Сегодня я очень устал." },
                         { text: "Ahora yo ___ en casa.", ru: "Сейчас я дома." }],
            tu:         [{ text: "¿Dónde ___ tú ahora?", ru: "Где ты сейчас?" },
                         { text: "Hoy tú ___ muy guapa.", ru: "Сегодня ты очень красивая." }],
            "el/ella":  [{ text: "Madrid ___ en el centro de España.", ru: "Мадрид находится в центре Испании." },
                         { text: "La sopa ___ fría.", ru: "Суп холодный (остыл)." }],
            nosotros:   [{ text: "Ahora nosotros ___ en la playa.", ru: "Сейчас мы на пляже." },
                         { text: "Hoy nosotros ___ muy contentos.", ru: "Сегодня мы очень довольны." }],
            vosotros:   [{ text: "¿Vosotros ___ listos para salir?", ru: "Вы готовы выходить?" },
                         { text: "Ahora vosotros ___ en clase.", ru: "Сейчас вы на уроке." }],
            ellos:      [{ text: "Mis padres ___ de vacaciones.", ru: "Мои родители в отпуске." },
                         { text: "Las ventanas ___ abiertas.", ru: "Окна открыты." }]
        },
        indefinido: {
            yo:         [{ text: "Ayer yo ___ en casa todo el día.", ru: "Вчера я весь день был дома." },
                         { text: "El verano pasado yo ___ dos semanas en Italia.", ru: "Прошлым летом я две недели был в Италии." }],
            tu:         [{ text: "¿Tú ___ en la fiesta de anoche?", ru: "Ты был на вчерашней вечеринке?" },
                         { text: "El año pasado tú ___ enfermo una semana.", ru: "В прошлом году ты болел неделю." }],
            "el/ella":  [{ text: "Ayer mi hermano ___ tres horas en el hospital.", ru: "Вчера мой брат провёл три часа в больнице." },
                         { text: "El mes pasado ella ___ en París.", ru: "В прошлом месяце она была в Париже." }],
            nosotros:   [{ text: "Anoche nosotros ___ en un concierto.", ru: "Вчера вечером мы были на концерте." },
                         { text: "En 2019 nosotros ___ en México.", ru: "В 2019 году мы были в Мексике." }],
            vosotros:   [{ text: "¿Vosotros ___ en el museo ayer?", ru: "Вы были вчера в музее?" },
                         { text: "El sábado vosotros ___ todo el día en la playa.", ru: "В субботу вы весь день были на пляже." }],
            ellos:      [{ text: "Ayer los niños ___ en el parque toda la tarde.", ru: "Вчера дети весь вечер были в парке." },
                         { text: "El mes pasado mis tíos ___ en Sevilla.", ru: "В прошлом месяце мои дядя и тётя были в Севилье." }]
        },
        imperfecto: {
            yo:         [{ text: "Cuando sonó el teléfono, yo ___ en la ducha.", ru: "Когда зазвонил телефон, я был в душе." },
                         { text: "Aquella noche yo ___ muy nervioso.", ru: "В тот вечер я очень нервничал." }],
            tu:         [{ text: "¿Dónde ___ tú cuando te llamé?", ru: "Где ты был, когда я тебе звонил?" },
                         { text: "Antes tú siempre ___ de buen humor.", ru: "Раньше ты всегда был в хорошем настроении." }],
            "el/ella":  [{ text: "Cuando llegué, la puerta ___ cerrada.", ru: "Когда я пришёл, дверь была закрыта." },
                         { text: "Mi abuela siempre ___ en la cocina.", ru: "Моя бабушка всегда была на кухне." }],
            nosotros:   [{ text: "Cuando empezó a llover, nosotros ___ en el parque.", ru: "Когда начался дождь, мы были в парке." },
                         { text: "Antes nosotros siempre ___ juntos.", ru: "Раньше мы всегда были вместе." }],
            vosotros:   [{ text: "Cuando os llamé, vosotros ___ en el cine.", ru: "Когда я вам звонил, вы были в кино." },
                         { text: "De niños vosotros siempre ___ en la calle.", ru: "В детстве вы всё время были на улице." }],
            ellos:      [{ text: "Cuando entré, los niños ___ muy tranquilos.", ru: "Когда я вошёл, дети были очень спокойны." },
                         { text: "Antes las tiendas ___ cerradas los domingos.", ru: "Раньше магазины по воскресеньям были закрыты." }]
        },
        futuro: {
            yo:         [{ text: "Mañana yo ___ en la oficina todo el día.", ru: "Завтра я весь день буду в офисе." },
                         { text: "El lunes yo ___ de vacaciones.", ru: "В понедельник я буду в отпуске." }],
            tu:         [{ text: "¿Tú ___ en casa esta noche?", ru: "Ты будешь дома сегодня вечером?" },
                         { text: "Mañana tú ___ muy cansado.", ru: "Завтра ты будешь очень уставшим." }],
            "el/ella":  [{ text: "La cena ___ lista en diez minutos.", ru: "Ужин будет готов через десять минут." },
                         { text: "Mañana mi hermana ___ en Madrid.", ru: "Завтра моя сестра будет в Мадриде." }],
            nosotros:   [{ text: "El próximo verano nosotros ___ en la playa.", ru: "Следующим летом мы будем на пляже." },
                         { text: "A las nueve nosotros ___ en el aeropuerto.", ru: "В девять мы будем в аэропорту." }],
            vosotros:   [{ text: "Mañana vosotros ___ en clase a las diez.", ru: "Завтра в десять вы будете на уроке." },
                         { text: "¿Vosotros ___ listos a las ocho?", ru: "Вы будете готовы к восьми?" }],
            ellos:      [{ text: "Mis padres ___ en casa el domingo.", ru: "Мои родители будут дома в воскресенье." },
                         { text: "Las tiendas ___ cerradas mañana.", ru: "Завтра магазины будут закрыты." }]
        }
    }
};

if (typeof window !== 'undefined') {
    window.CONJ_SENTENCES = CONJ_SENTENCES;
}
