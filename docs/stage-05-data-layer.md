# Этап 5 — Data Layer (JSON-схемы)

## 1. Файлы данных

```
data/
├── pools.json        — все бассейны
├── categories.json   — 6 типов категорий
├── districts.json    — районы Ташкента
└── reviews.json      — отзывы (отдельно)
```

---

## 2. Принцип работы с языками

**Контракт API (будущее):** фронт отправляет заголовок `Accept-Language: ru|uz|en`,
бэкенд возвращает плоский объект с одним `name`, `address`, `description`.

**Текущий JSON:** переводы хранятся в объекте `translations`, функция `normalizePool()`
извлекает нужный язык и возвращает тот же плоский контракт.

```
JSON (translations.ru/uz/en)
    ↓ normalizePool(raw, locale)
Pool { name, address, description }  ←── тот же тип что вернёт API
```

Смена языка на фронте → `watch(locale)` → `init()` → данные перенормализуются.
При подключении API — меняем только одну строку в store.

---

## 3. categories.json

```json
[
  {
    "id": "open",
    "slug": "open",
    "icon": "sun",
    "color": "#0EA5E9",
    "translations": {
      "ru": { "name": "Открытые бассейны",       "description": "Сезонные бассейны под открытым небом" },
      "uz": { "name": "Ochiq basseynlar",         "description": "Ochiq havoda mavsumiy basseynlar" },
      "en": { "name": "Open Pools",               "description": "Seasonal outdoor swimming pools" }
    }
  },
  {
    "id": "indoor",
    "slug": "indoor",
    "icon": "building",
    "color": "#0284C7",
    "translations": {
      "ru": { "name": "Крытые бассейны",          "description": "Работают круглый год" },
      "uz": { "name": "Yopiq basseynlar",         "description": "Yil davomida ishlaydi" },
      "en": { "name": "Indoor Pools",             "description": "Open year-round" }
    }
  },
  {
    "id": "children",
    "slug": "children",
    "icon": "child",
    "color": "#06B6D4",
    "translations": {
      "ru": { "name": "Детские бассейны",         "description": "Безопасно для детей от 3 лет" },
      "uz": { "name": "Bolalar basseynlari",      "description": "3 yoshdan katta bolalar uchun" },
      "en": { "name": "Children Pools",           "description": "Safe for children from 3 years" }
    }
  },
  {
    "id": "sport",
    "slug": "sport",
    "icon": "swimmer",
    "color": "#0369A1",
    "translations": {
      "ru": { "name": "Спортивные бассейны",      "description": "Олимпийские дорожки, тренеры" },
      "uz": { "name": "Sport basseynlari",        "description": "Olimpik suzish, murabbiylar" },
      "en": { "name": "Sports Pools",             "description": "Olympic lanes, coaches" }
    }
  },
  {
    "id": "hotel",
    "slug": "hotel",
    "icon": "hotel",
    "color": "#0891B2",
    "translations": {
      "ru": { "name": "Бассейны в гостиницах",    "description": "Для гостей и посетителей" },
      "uz": { "name": "Mehmonxona basseynlari",   "description": "Mehmonlar uchun" },
      "en": { "name": "Hotel Pools",              "description": "For guests and visitors" }
    }
  },
  {
    "id": "aquapark",
    "slug": "aquapark",
    "icon": "waves",
    "color": "#F97316",
    "translations": {
      "ru": { "name": "Аквапарки",                "description": "Горки, аттракционы, семейный отдых" },
      "uz": { "name": "Akvapark",                 "description": "Slaydlar, attraksionlar, oilaviy dam" },
      "en": { "name": "Aquaparks",                "description": "Slides, attractions, family fun" }
    }
  }
]
```

---

## 4. districts.json

```json
[
  { "id": "yunusabad",     "translations": { "ru": "Юнусабад",       "uz": "Yunusobod",      "en": "Yunusabad" } },
  { "id": "chilanzar",     "translations": { "ru": "Чиланзар",       "uz": "Chilonzor",      "en": "Chilanzar" } },
  { "id": "mirzo-ulugbek", "translations": { "ru": "Мирзо-Улугбек", "uz": "Mirzo Ulug'bek", "en": "Mirzo-Ulugbek" } },
  { "id": "yakkasaray",    "translations": { "ru": "Яккасарай",      "uz": "Yakkasaroy",     "en": "Yakkasaray" } },
  { "id": "almazar",       "translations": { "ru": "Алмазар",        "uz": "Olmazor",        "en": "Almazar" } },
  { "id": "bektemir",      "translations": { "ru": "Бектемир",       "uz": "Bektemir",       "en": "Bektemir" } },
  { "id": "yashnabad",     "translations": { "ru": "Яшнабад",        "uz": "Yashnobod",      "en": "Yashnabad" } },
  { "id": "sergeli",       "translations": { "ru": "Сергели",        "uz": "Sergeli",        "en": "Sergeli" } },
  { "id": "uchtepa",       "translations": { "ru": "Учтепа",         "uz": "Uchtepa",        "en": "Uchtepa" } },
  { "id": "shayhantahur",  "translations": { "ru": "Шайхантахур",    "uz": "Shayxontohur",   "en": "Shayhantahur" } }
]
```

---

## 5. pools.json — схема одного объекта

```json
{
  "id": "malibu-sun-club",
  "slug": "malibu-sun-club",

  "translations": {
    "ru": {
      "name": "Malibu Sun Club",
      "address": "ул. Амира Темура, 15, Ташкент",
      "description": "Malibu Sun Club — открытый бассейн в Юнусабаде с чистой водой и удобной инфраструктурой."
    },
    "uz": {
      "name": "Malibu Sun Club",
      "address": "Amir Temur ko'chasi, 15, Toshkent",
      "description": "Malibu Sun Club — Yunusobodda joylashgan ochiq basseyni, toza suv va qulay infratuzilma."
    },
    "en": {
      "name": "Malibu Sun Club",
      "address": "15 Amir Temur Street, Tashkent",
      "description": "Malibu Sun Club is an open-air pool in Yunusabad with clean water and great facilities."
    }
  },

  "category": "open",
  "district": "yunusabad",
  "coordinates": { "lat": 41.3111, "lng": 69.2797 },

  "phone": "+998 71 234 56 78",
  "telegram": "https://t.me/malibu_tashkent",
  "website": null,

  "gallery": [
    "/images/pools/malibu-sun-club/1.jpg",
    "/images/pools/malibu-sun-club/2.jpg",
    "/images/pools/malibu-sun-club/3.jpg"
  ],

  "prices": [
    { "key": "price.adult_single",  "amount": 80000,  "currency": "UZS" },
    { "key": "price.child_single",  "amount": 50000,  "currency": "UZS" },
    { "key": "price.monthly",       "amount": 600000, "currency": "UZS" }
  ],

  "schedule": [
    { "day": "mon", "open": "08:00", "close": "22:00" },
    { "day": "tue", "open": "08:00", "close": "22:00" },
    { "day": "wed", "open": "08:00", "close": "22:00" },
    { "day": "thu", "open": "08:00", "close": "22:00" },
    { "day": "fri", "open": "08:00", "close": "23:00" },
    { "day": "sat", "open": "09:00", "close": "23:00" },
    { "day": "sun", "open": "09:00", "close": "21:00" }
  ],

  "services": ["trainer", "locker", "parking", "cafe", "children_zone"],

  "season": "summer",
  "poolLength": 50,
  "poolDepthMin": 1.2,
  "poolDepthMax": 2.0,

  "rating": 4.6,
  "reviewCount": 38,
  "featured": true,
  "createdAt": "2025-06-01T00:00:00Z"
}
```

---

## 6. reviews.json

```json
{
  "poolId": "malibu-sun-club",
  "reviews": [
    {
      "id": "r001",
      "author": "Азиз Каримов",
      "rating": 5,
      "text": "Отличный бассейн, чистая вода, вежливый персонал.",
      "date": "2025-06-15T10:00:00Z"
    }
  ]
}
```

---

## 7. i18n-ключи для price.key и services

Лейблы цен и услуг — в файлах `locales/*.json`, не в данных бассейна.
Данные остаются нейтральными к языку.

```json
// locales/ru.json (фрагмент)
{
  "price": {
    "adult_single": "Взрослый (разовый)",
    "child_single": "Детский (до 12 лет)",
    "monthly": "Абонемент (месяц)",
    "hourly": "Почасовой"
  },
  "service": {
    "trainer": "Тренер",
    "locker": "Раздевалка",
    "parking": "Парковка",
    "sauna": "Сауна",
    "cafe": "Кафе",
    "children_zone": "Детская зона",
    "jacuzzi": "Джакузи",
    "spa": "SPA",
    "wifi": "Wi-Fi",
    "shop": "Магазин"
  }
}
```

---

## 8. Схема замены JSON → API (итог)

| | Сейчас (JSON) | Будущее (API) |
|---|---|---|
| Источник | `import('~/data/pools.json')` | `$fetch('/api/v1/pools')` |
| Язык | `normalizePool(raw, locale)` | `headers: { 'Accept-Language': locale }` |
| Результат | `Pool` (плоский) | `Pool` (плоский) |
| Меняем | ничего в компонентах | только `stores/pools.ts` |

---

**Этап 5 завершён.**
Жду подтверждения для перехода к Этапу 6 — Страницы.
