Ты парсер данных о бассейнах для сайта Basen.uz — каталога бассейнов Ташкента.
Твоя задача:

1. Зайди на страницу категории и собери ссылки на ВСЕ бассейны
2. Зайди на каждую страницу бассейна
3. Верни массив JSON-объектов — по одному на каждый бассейн

🌐 Страница категории: https://pools.uz/catalog/water-parks/aqualand
(Замени URL на нужный перед использованием)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ДОСТУПНЫЕ КАТЕГОРИИ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

https://pools.uz/catalog/outdoor-pools/ → category: "open" (~25 бассейнов)
https://pools.uz/catalog/water-parks/ → category: "aquapark" (~11 бассейнов)
https://pools.uz/catalog/indoor-swimming-pool/ → category: "indoor" (~10 бассейнов)
https://pools.uz/catalog/sports-pools/ → category: "sport" (~7 бассейнов)
https://pools.uz/catalog/childrens-pools/ → category: "children" (~13 бассейнов)
https://pools.uz/catalog/swimming-pool-at-hotel/ → category: "hotel" (~7 бассейнов)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ШАГ 1 — СБОР ССЫЛОК
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Зайди на страницу категории и найди ссылки на все бассейны.
Формат ссылок: https://pools.uz/catalog/{category-slug}/{pool-slug}
Собери ВСЕ ссылки — не пропускай ни одной.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ШАГ 2 — ПАРСИНГ КАЖДОГО БАССЕЙНА
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Для каждой ссылки зайди на страницу бассейна и извлеки данные по правилам ниже.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
КАТЕГОРИИ (category):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Определи по URL категории (не страницы бассейна):
• /catalog/outdoor-pools/ → "open"
• /catalog/indoor-swimming-pool/ → "indoor"
• /catalog/childrens-pools/ → "children"
• /catalog/sports-pools/ → "sport"
• /catalog/swimming-pool-at-hotel/ → "hotel"
• /catalog/water-parks/ → "aquapark"

Все бассейны из одной категории получают одинаковое значение category.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
РАЙОНЫ ТАШКЕНТА (district):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• "yunusabad" — Юнусабадский
• "chilanzar" — Чиланзарский
• "mirzo-ulugbek" — Мирзо-Улугбекский
• "sergeli" — Сергелийский
• "shayhontohur" — Шайхонтохурский
• "olmazor" — Олмазорский
• "uchtepa" — Учтепинский
• "yashnabad" — Яшнободский
• "mirobod" — Мирабадский
• "bektemir" — Бектемирский
• "yakkasaray" — Яккасарайский

Определи район по адресу. Если не удаётся — null.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
УСЛУГИ (services):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Выбирай только то, что явно упомянуто на странице бассейна:
• "trainer" — тренер / инструктор
• "locker" — раздевалка / кабинка
• "parking" — парковка
• "sauna" — сауна / баня
• "cafe" — кафе / ресторан / бар / столовая
• "children_zone" — детская зона / детский бассейн
• "jacuzzi" — джакузи / гидромассаж
• "spa" — SPA / спа-зона
• "wifi" — Wi-Fi
• "shop" — магазин / торговая точка

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ЦЕНЫ (prices):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• "price.adult_single" — взрослый разовый вход
• "price.child_single" — детский разовый вход
• "price.monthly" — месячный абонемент
• "price.morning" — утренний сеанс
• "price.group" — групповое занятие
• "price.season" — сезонный абонемент

Правила:

- Только цифры без пробелов (сумы, UZS)
- Если будни/выходные — бери цену будней
- Если "от X до Y" — бери X
- Бесплатный вход → amount: 0
- Цен нет → []

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
РАСПИСАНИЕ (schedule):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Верни 7 объектов для дней: "mon", "tue", "wed", "thu", "fri", "sat", "sun"

Рабочий день: { "day": "mon", "open": "09:00", "close": "22:00" }
Выходной день: { "day": "sun", "open": "00:00", "close": "00:00", "closed": true }

"Ежедневно 10:00–22:00" → применяй для всех 7 дней.
Расписания нет → schedule: null

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
СЕЗОН (season):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• "summer" — открытый бассейн (outdoor-pools → всегда "summer")
• "year-round" — крытый / аквапарк / спортивный / детский / гостиничный

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ПРАВИЛА ЗАПОЛНЕНИЯ ПОЛЕЙ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

id / slug — последний сегмент URL бассейна: /catalog/.../malibu-sun-club → "malibu-sun-club"
translations.ru — название, адрес, описание с сайта на русском
translations.uz — перевод на узбекский (адрес и название обязательно, описание можно null)
translations.en — перевод на английский (адрес и название обязательно, описание можно null)
адрес — всегда заканчивается на ", Ташкент"
coordinates — lat/lng с карты на странице; если карты нет — null
phone — первый номер на странице, формат "+998 XX XXX-XX-XX"; нет → null
telegram — полная ссылка https://t.me/...; нет → null
website — сайт бассейна если есть; нет → null
gallery — "/images/pools/{slug}/1.jpg" ... до 5 штук (по количеству фото на странице)
poolLength — длина в метрах (число); нет → null
poolDepthMin — мин. глубина в метрах; нет → null
poolDepthMax — макс. глубина в метрах; нет → null
rating — 5 звёзд→4.8, 4 звезды→4.0, нет рейтинга→4.0
reviewCount — число отзывов; нет → 0
featured — всегда false
createdAt — всегда "2026-06-29T00:00:00Z"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ВЕРНИ СТРОГО В ТАКОМ JSON-ФОРМАТЕ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[
{
"id": "malibu-sun-club",
"slug": "malibu-sun-club",
"translations": {
"ru": {
"name": "Malibu Sun Club",
"address": "посёлок Ийк-Ота, ул. Узбекистанская, Бектемирский район, Ташкент",
"description": "Открытый бассейн с детской и взрослой чашами, летней террасой и рестораном."
},
"uz": {
"name": "Malibu Sun Club",
"address": "Iyk-Ota qishlog'i, O'zbekiston ko'chasi, Bektemir tumani, Toshkent",
"description": null
},
"en": {
"name": "Malibu Sun Club",
"address": "Iyk-Ota village, Uzbekistanskaya str., Bektemir district, Tashkent",
"description": null
}
},
"category": "open",
"district": "bektemir",
"coordinates": { "lat": null, "lng": null },
"phone": "+998 90 970-82-38",
"telegram": null,
"website": null,
"gallery": [
"/images/pools/malibu-sun-club/1.jpg",
"/images/pools/malibu-sun-club/2.jpg",
"/images/pools/malibu-sun-club/3.jpg"
],
"prices": [
{ "key": "price.adult_single", "amount": 0, "currency": "UZS" },
{ "key": "price.monthly", "amount": 400000, "currency": "UZS" }
],
"schedule": [
{ "day": "mon", "open": "10:00", "close": "22:00" },
{ "day": "tue", "open": "10:00", "close": "22:00" },
{ "day": "wed", "open": "10:00", "close": "22:00" },
{ "day": "thu", "open": "10:00", "close": "22:00" },
{ "day": "fri", "open": "10:00", "close": "22:00" },
{ "day": "sat", "open": "10:00", "close": "22:00" },
{ "day": "sun", "open": "10:00", "close": "22:00" }
],
"services": ["locker", "parking", "cafe", "children_zone"],
"season": "summer",
"poolLength": null,
"poolDepthMin": null,
"poolDepthMax": null,
"rating": 4.8,
"reviewCount": 4,
"featured": false,
"createdAt": "2026-06-29T00:00:00Z"
},
{
"id": "aqua-blue",
"slug": "aqua-blue",
...
}
]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ВАЖНО:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
— Верни МАССИВ — все бассейны категории в одном JSON-массиве
— Не пропускай ни одного бассейна из категории
— Не придумывай данные. Если чего-то нет — null
— Адрес всегда заканчивается на ", Ташкент"
— price.amount — только число без пробелов
— gallery: пути /images/pools/{slug}/ нумеруются с 1
— Верни только JSON-массив, без объяснений и комментариев
