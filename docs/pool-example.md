# Эталонная карточка бассейна

Пример записи в `data/pools.json`, где заполнены **все** поля. Собран из нескольких
реальных бассейнов: у каждого поля указано, откуда взят образец. Тип — `RawPool`
из `types/pool.ts`.

Это шаблон для заполнения, а не реальный бассейн: в `data/pools.json` его не добавлять.

## Полный JSON

```json
{
  "id": "olympic-sport-complex",
  "slug": "olympic-sport-complex",
  "translations": {
    "ru": {
      "name": "Олимпийский спорткомплекс",
      "address": "пр. Бунёдкор, 42, Ташкент",
      "description": "Профессиональный спортивный бассейн с 25-метровыми дорожками, работающий круглый год. Проводятся групповые занятия, индивидуальные тренировки с тренером и соревнования."
    },
    "uz": {
      "name": "Olimpiya sport majmuasi",
      "address": "Bunyodkor shoh ko'chasi, 42, Toshkent",
      "description": "25 metrli yo'lakli professional sport basseyn, yil davomida ochiq. Guruh mashg'ulotlari, murabbiy bilan individual trenirovkalar o'tkaziladi."
    },
    "en": {
      "name": "Olympic Sports Complex",
      "address": "42 Bunyodkor Avenue, Tashkent",
      "description": "Professional sports pool with 25-meter lanes, open year-round. Group classes, individual coaching sessions and competitions are held regularly."
    }
  },
  "category": "indoor",
  "categories": ["indoor", "sport", "children"],
  "district": "mirzo-ulugbek",
  "region": "tashkent-city",
  "city": null,
  "coordinates": {
    "lat": 41.226959,
    "lng": 69.369191
  },
  "phone": [
    "+998 71 234-32-85",
    "+998 99 129-07-00"
  ],
  "telegram": [
    "https://t.me/YunusobodSC"
  ],
  "instagram": "https://www.instagram.com/yunusabad.sc/",
  "facebook": "https://www.facebook.com/MalibuSunClub/",
  "youtube": "https://www.youtube.com/@grandarkbukhara",
  "email": "reservation@farovonkhiva.uz",
  "website": "https://olympic-sport.uz",
  "gallery": [
    "/images/pools/olympic-sport-complex/1.webp",
    "/images/pools/olympic-sport-complex/2.webp",
    "/images/pools/olympic-sport-complex/3.webp",
    "/images/pools/olympic-sport-complex/4.webp",
    "/images/pools/olympic-sport-complex/5.jpg"
  ],
  "prices": [
    { "key": "price.adult_single", "amount": 120000, "currency": "UZS" },
    { "key": "price.child_single", "amount": 80000, "currency": "UZS" },
    { "key": "price.morning", "amount": 90000, "currency": "UZS" },
    { "key": "price.monthly", "amount": 1000000, "currency": "UZS" }
  ],
  "schedule": [
    { "day": "mon", "open": "07:00", "close": "22:00" },
    { "day": "tue", "open": "07:00", "close": "22:00" },
    { "day": "wed", "open": "07:00", "close": "22:00" },
    { "day": "thu", "open": "07:00", "close": "22:00" },
    { "day": "fri", "open": "07:00", "close": "22:00" },
    { "day": "sat", "open": "09:00", "close": "20:00" },
    { "day": "sun", "closed": true, "open": "00:00", "close": "00:00" }
  ],
  "services": [
    "parking",
    "locker",
    "trainer",
    "sauna",
    "cafe",
    "wifi",
    "children_zone",
    "card_payment",
    "accessible_toilet"
  ],
  "season": "year-round",
  "poolLength": 25,
  "poolDepthMin": 1.5,
  "poolDepthMax": 2.5,
  "ratingGoogle": 4.2,
  "ratingYandex": 5,
  "reviewCount": 10,
  "featured": true,
  "createdAt": "2025-03-15T00:00:00Z"
}
```

## Поля и откуда взят образец

| Поле | Обязательно | Как заполнять | Образец из |
|---|---|---|---|
| `id` | да | Совпадает со `slug` | все бассейны |
| `slug` | да | Латиница, через дефис, для регионов с городом в конце: `basseyn-yakkabog`, `aqualand-shahrisabz` | все бассейны |
| `translations.ru/uz/en.name` | да | Название на трёх языках. Бренд не переводится (`Malibu Sun Club`) | `olympic-sport-complex` |
| `translations.*.address` | да | ru: «ул. …, N, район, Ташкент»; uz: «… ko'chasi, N, Toshkent»; en: «N … Street, Tashkent» | `olympic-sport-complex` |
| `translations.*.description` | да | 1–4 предложения: тип, чаши, что есть, нюансы цены. Сейчас uz/en есть только у 8 из 145 | `olympic-sport-complex` |
| `category` | да | Главный тип: `open`, `indoor`, `children`, `sport`, `hotel`, `aquapark` | все бассейны |
| `categories` | нет | Все подходящие типы, главный идёт первым | `atlantis-pool-bukhara`, `may-weather-resort` |
| `district` | да | Только для `tashkent-city`: id из `data/districts.json`. Для областей — `null` | `olympic-sport-complex` |
| `region` | да | id из `data/regions.json`: `tashkent-city`, `tashkent-region`, `karakalpakstan`, `khorezm`, `samarkand`, `bukhara`, `navoi`, `kashkadarya` | все бассейны |
| `city` | да | Всегда `null`. Город в области определяется по адресу через `data/regionCities.json` | все бассейны |
| `coordinates` | да | `lat`/`lng` числами, 6 знаков. В Яндексе брать `poi[point]`, а не `ll=` | `malibu-sun-club` |
| `phone` | да | Массив, формат `+998 XX XXX-XX-XX` | `dvorec-vodnogo-sporta` |
| `telegram` | нет | **Массив** полных ссылок `https://t.me/...` | `dvorec-vodnogo-sporta` |
| `instagram` | нет | Строка, полная ссылка со слешем в конце | `dvorec-vodnogo-sporta` |
| `facebook` | нет | Строка, полная ссылка | `malibu-sun-club` |
| `youtube` | нет | Строка, ссылка на канал `@...` (единственный пример) | `grand-ark-bukhara` |
| `email` | нет | Строка, без `mailto:` | `hotel-farovon-khiva` |
| `website` | нет | Строка, полная ссылка с `https://` | `olympic-sport-complex` |
| `gallery` | да | `/images/pools/<slug>/N.webp` (или `.jpg`), нумерация с 1, лучше 5+ фото | `malibu-sun-club` |
| `prices` | да | `key` — ключ `price.*` из `locales/*.json`, `amount` в сумах, `currency`: `UZS` или `USD`. Бесплатный вход — `amount: 0` | `dvorec-vodnogo-sporta` |
| `prices[].section` / `group` | нет | Только для длинных прайсов школ плавания: разбивка на разделы | `aq_sec_special` / `aq_special_personal` |
| `schedule` | да | Все 7 дней `mon`…`sun`, время `HH:MM`. Выходной: `"closed": true`, `open`/`close` = `00:00` | `olympic-sport-complex` |
| `services` | да | Ключи из списка ниже | `villa-grand`, `olympic-sport-complex` |
| `season` | да | `summer` (открытые, летние) или `year-round` | все бассейны |
| `poolLength` | нет | Длина в метрах, число: `25`, `50` | `olympic-sport-complex`, `suv-havzasi-beruni` |
| `poolDepthMin` / `poolDepthMax` | нет | Глубина в метрах, дробь через точку: `1.5`, `2.5` | `olympic-sport-complex` |
| `ratingGoogle` / `ratingYandex` | да | Число 0–5 с одним знаком после точки | `dvorec-vodnogo-sporta` |
| `reviewCount` | да | Целое число | `dvorec-vodnogo-sporta` |
| `featured` | да | `true` — показывать в подборках на главной | `olympic-sport-complex` |
| `createdAt` | да | ISO-дата `YYYY-MM-DDT00:00:00Z` | `olympic-sport-complex` |

## Допустимые услуги (`services`)

Ключи, которые уже используются в `data/pools.json` (подписи лежат в `locales/*.json`):

- **Базовые:** `parking`, `bike_parking`, `locker`, `wifi`, `card_payment`, `gift_certificate`, `first_aid`
- **Еда:** `cafe`, `restaurant`, `bar`, `disco_bar`, `food_delivery`, `karaoke`
- **Отдых у воды:** `sunbed`, `free_sunbed`, `gazebo`, `yurt`, `wave_pool`, `trampoline`, `children_zone`
- **Спа и здоровье:** `sauna`, `russian_banya`, `turkish_hammam`, `jacuzzi`, `spa`, `wellness_center`, `massage`, `peeling`, `rain_shower`, `gym`
- **Обучение:** `trainer`
- **Проживание и бизнес:** `hotel`, `cottages`, `resort`, `conference_room`, `business_center`, `billiards`
- **Доступность:** `accessible_toilet`, `accessible_parking`, `ramp`, `elevator`

## Частые ключи цен (`prices`)

- **Разовый вход:** `price.adult_single`, `price.child_single`, `price.morning`
- **По часам:** `price.adult_1h`, `price.adult_2h`, `price.adult_3h`, `price.child_1h`, `price.child_2h`, `price.child_3h`
- **Будни и выходные:** `price.adult_weekday`, `price.adult_weekend`, `price.child_weekday`, `price.child_weekend`
- **Весь день:** `price.adult_fullday`, `price.child_fullday`
- **Абонементы:** `price.monthly`, `price.group`, `price.annual_membership`
- **VIP:** `price.adult_vip`, `price.child_vip`

Для нового ключа цены добавить подпись во все три файла: `locales/ru.json`, `uz.json`, `en.json`.

## Чек-лист перед добавлением бассейна

- [ ] Название, адрес и описание на ru, uz и en
- [ ] `region` указан, `district` — только для Ташкента
- [ ] Координаты сверены по `poi[point]`
- [ ] Хотя бы один телефон и одна соцсеть
- [ ] Фото в `public/images/pools/<slug>/`, 5+ штук
- [ ] Расписание на все 7 дней
- [ ] Цены с ключами из `locales`
- [ ] Рейтинги Google и Яндекс, число отзывов
- [ ] `category`, а если типов несколько, ещё и `categories`
