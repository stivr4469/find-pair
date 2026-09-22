/**
 * Spanish Trainer — Mezcla (смешанное чтение)
 * 6 текстов, каждый разбит на смысловые токены {ru, es}
 */

const MEZCLA_DATA = [

  {
    id: 1,
    emoji: "🛒",
    title: "В магазине",
    titleEs: "En la tienda",
    tokens: [
      { ru: "Сегодня утром", es: "Esta mañana" },
      { ru: "я пошёл", es: "fui" },
      { ru: "в ближайший магазин", es: "a la tienda más cercana" },
      { ru: "чтобы купить продукты.", es: "a comprar productos." },
      { ru: "На входе", es: "A la entrada" },
      { ru: "я взял тележку", es: "cogí un carrito" },
      { ru: "и направился", es: "y me dirigí" },
      { ru: "в молочный отдел.", es: "a la sección de lácteos." },
      { ru: "Я нашёл", es: "Encontré" },
      { ru: "молоко, йогурт и масло.", es: "leche, yogur y mantequilla." },
      { ru: "Потом", es: "Luego" },
      { ru: "я выбрал", es: "elegí" },
      { ru: "свежие овощи и фрукты.", es: "verduras y frutas frescas." },
      { ru: "На кассе", es: "En la caja" },
      { ru: "была небольшая очередь.", es: "había una pequeña cola." },
      { ru: "Кассир улыбнулся", es: "El cajero me sonrió" },
      { ru: "и спросил:", es: "y preguntó:" },
      { ru: "«Пакет нужен?»", es: "«¿Necesita bolsa?»" },
      { ru: "Я заплатил картой", es: "Pagué con tarjeta" },
      { ru: "и вышел из магазина.", es: "y salí de la tienda." }
    ]
  },

  {
    id: 2,
    emoji: "🍽️",
    title: "В ресторане",
    titleEs: "En el restaurante",
    tokens: [
      { ru: "Вечером", es: "Por la tarde" },
      { ru: "мы пришли", es: "llegamos" },
      { ru: "в уютный ресторан", es: "a un restaurante acogedor" },
      { ru: "в центре города.", es: "en el centro de la ciudad." },
      { ru: "Официант встретил нас", es: "El camarero nos recibió" },
      { ru: "и проводил", es: "y nos llevó" },
      { ru: "к столику у окна.", es: "a la mesa junto a la ventana." },
      { ru: "Он принёс меню", es: "Trajo la carta" },
      { ru: "и порекомендовал", es: "y nos recomendó" },
      { ru: "сегодняшнее блюдо дня.", es: "el plato del día." },
      { ru: "Я заказал", es: "Pedí" },
      { ru: "суп и жареную рыбу.", es: "sopa y pescado a la plancha." },
      { ru: "На десерт", es: "De postre" },
      { ru: "мы взяли", es: "tomamos" },
      { ru: "шоколадный торт.", es: "tarta de chocolate." },
      { ru: "Счёт оказался", es: "La cuenta resultó" },
      { ru: "вполне разумным.", es: "bastante razonable." },
      { ru: "Мы оставили", es: "Dejamos" },
      { ru: "чаевые", es: "propina" },
      { ru: "и вышли довольные.", es: "y salimos contentos." }
    ]
  },

  {
    id: 3,
    emoji: "✈️",
    title: "В аэропорту",
    titleEs: "En el aeropuerto",
    tokens: [
      { ru: "Мы приехали", es: "Llegamos" },
      { ru: "в аэропорт", es: "al aeropuerto" },
      { ru: "за два часа", es: "dos horas" },
      { ru: "до вылета.", es: "antes del vuelo." },
      { ru: "На стойке регистрации", es: "En el mostrador de facturación" },
      { ru: "мы сдали багаж", es: "facturamos el equipaje" },
      { ru: "и получили посадочные талоны.", es: "y recibimos las tarjetas de embarque." },
      { ru: "На паспортном контроле", es: "En el control de pasaportes" },
      { ru: "очередь двигалась быстро.", es: "la cola avanzaba rápido." },
      { ru: "После досмотра", es: "Después del control de seguridad" },
      { ru: "мы нашли наш гейт", es: "encontramos nuestra puerta de embarque" },
      { ru: "и сели ждать.", es: "y nos sentamos a esperar." },
      { ru: "По громкой связи", es: "Por megafonía" },
      { ru: "объявили посадку", es: "anunciaron el embarque" },
      { ru: "на наш рейс.", es: "de nuestro vuelo." },
      { ru: "Мы встали в очередь", es: "Hicimos cola" },
      { ru: "и зашли в самолёт.", es: "y subimos al avión." },
      { ru: "Место у окна", es: "El asiento de ventanilla" },
      { ru: "было свободным.", es: "estaba libre." },
      { ru: "Отличное начало поездки!", es: "¡Un comienzo de viaje perfecto!" }
    ]
  },

  {
    id: 4,
    emoji: "🌳",
    title: "В парке",
    titleEs: "En el parque",
    tokens: [
      { ru: "В воскресенье", es: "El domingo" },
      { ru: "погода была чудесной:", es: "hacía un tiempo estupendo:" },
      { ru: "солнечно и тепло.", es: "soleado y cálido." },
      { ru: "Мы решили", es: "Decidimos" },
      { ru: "провести день", es: "pasar el día" },
      { ru: "в городском парке.", es: "en el parque de la ciudad." },
      { ru: "Дети бегали", es: "Los niños corrían" },
      { ru: "по дорожкам", es: "por los senderos" },
      { ru: "и играли с собаками.", es: "y jugaban con los perros." },
      { ru: "На скамейке", es: "En el banco" },
      { ru: "пожилая пара", es: "una pareja mayor" },
      { ru: "кормила голубей.", es: "daba de comer a las palomas." },
      { ru: "Мы расстелили плед", es: "Extendimos una manta" },
      { ru: "под большим деревом", es: "bajo un árbol grande" },
      { ru: "и достали бутерброды.", es: "y sacamos los bocadillos." },
      { ru: "Пруд", es: "El estanque" },
      { ru: "блестел на солнце.", es: "brillaba al sol." },
      { ru: "По воде", es: "Por el agua" },
      { ru: "плыли утки.", es: "nadaban los patos." },
      { ru: "Очень приятный день!", es: "¡Un día muy agradable!" }
    ]
  },

  {
    id: 5,
    emoji: "🤝",
    title: "Знакомство",
    titleEs: "El encuentro",
    tokens: [
      { ru: "На курсах испанского", es: "En las clases de español" },
      { ru: "я познакомился", es: "conocí" },
      { ru: "с интересным человеком.", es: "a una persona interesante." },
      { ru: "Его зовут Карлос,", es: "Se llama Carlos," },
      { ru: "он из Мадрида.", es: "es de Madrid." },
      { ru: "Мы разговорились", es: "Empezamos a charlar" },
      { ru: "во время перерыва.", es: "durante el descanso." },
      { ru: "Он рассказал,", es: "Me contó" },
      { ru: "что работает", es: "que trabaja" },
      { ru: "архитектором", es: "de arquitecto" },
      { ru: "и очень любит путешествовать.", es: "y que le encanta viajar." },
      { ru: "Я сказал,", es: "Le dije" },
      { ru: "что изучаю испанский", es: "que estudio español" },
      { ru: "уже полгода.", es: "desde hace medio año." },
      { ru: "Карлос удивился", es: "Carlos se sorprendió" },
      { ru: "и похвалил мой прогресс.", es: "y elogió mi progreso." },
      { ru: "Мы обменялись номерами", es: "Nos intercambiamos los números" },
      { ru: "и договорились", es: "y quedamos" },
      { ru: "встретиться снова", es: "en quedar otra vez" },
      { ru: "на следующей неделе.", es: "la semana que viene." }
    ]
  },

  {
    id: 6,
    emoji: "🌦️",
    title: "Погода и природа",
    titleEs: "El tiempo y la naturaleza",
    tokens: [
      { ru: "Осенью", es: "En otoño" },
      { ru: "природа меняется:", es: "la naturaleza cambia:" },
      { ru: "листья становятся", es: "las hojas se vuelven" },
      { ru: "жёлтыми и красными.", es: "amarillas y rojas." },
      { ru: "По утрам", es: "Por las mañanas" },
      { ru: "стоит густой туман.", es: "hay niebla densa." },
      { ru: "Дожди идут", es: "Las lluvias caen" },
      { ru: "почти каждый день.", es: "casi todos los días." },
      { ru: "Температура опустилась", es: "La temperatura bajó" },
      { ru: "до десяти градусов.", es: "hasta los diez grados." },
      { ru: "Люди надели", es: "La gente se puso" },
      { ru: "куртки и шарфы.", es: "abrigos y bufandas." },
      { ru: "По вечерам", es: "Por las noches" },
      { ru: "зажигаются фонари", es: "se encienden las farolas" },
      { ru: "уже в пять часов.", es: "ya a las cinco." },
      { ru: "Но иногда", es: "Pero a veces" },
      { ru: "выглядывает солнце", es: "sale el sol" },
      { ru: "и освещает", es: "e ilumina" },
      { ru: "мокрые улицы.", es: "las calles mojadas." },
      { ru: "Осень тоже бывает красивой.", es: "El otoño también puede ser bonito." }
    ]
  }

];
