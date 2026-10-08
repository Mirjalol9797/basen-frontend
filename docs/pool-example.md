# Промпт: сбор данных о бассейне для Basen.uz

**Как пользоваться:** скопируйте всё, что ниже линии, в Claude с включённым веб-поиском.
Заполните блок «Входные данные» (хватит названия и города, ссылки ускоряют поиск).
Готовый JSON из ответа вставляется в `data/pools.json`, фото кладутся в
`public/images/pools/<slug>/`.

---

## Задача

Ты помогаешь наполнять Basen.uz — каталог бассейнов Узбекистана. Найди в интернете всю
актуальную информацию о бассейне ниже и верни её **строго в формате JSON нашего
каталога** (описан ниже), плюс отчёт об источниках.

## Входные данные

```
Название:        [например: Бассейн Ulug'bek Hotel&Spa]
Город / область: [например: Шахрисабз, Кашкадарьинская область]
Ссылки, если есть (Google Maps, Яндекс Карты, Instagram, сайт):
[...]
Что уже известно (необязательно):
[...]
```

## Где искать

Проверь каждый источник, который существует для этого места:

1. **Google Maps** — рейтинг, число отзывов, часы, телефон, сайт, фото, отзывы с ценами.
2. **Яндекс Карты** — рейтинг, число отзывов, адрес, часы, телефон, координаты.
3. **2GIS** — адрес, часы, телефоны, услуги.
4. **Instagram и Telegram** заведения — актуальные цены, расписание, акции (смотри
   последние посты и закреплённые сообщения).
5. **Официальный сайт, Facebook, YouTube**.
6. Сайты бронирования отелей (Booking, Trip.com) — если бассейн при отеле.

## Правила качества (обязательно)

- **Ничего не выдумывай.** Если факт не найден — ставь `null` (или `[]` для массивов)
  и укажи это в отчёте. Пустое поле лучше неверного.
- **Свежесть.** Цены и расписание бери из источников 2025–2026 года. Если есть только
  старые данные — укажи год источника в отчёте.
- **Противоречия.** Если источники расходятся (разные часы, цены, телефоны) — выбери
  самый свежий официальный (сайт, Instagram заведения) и опиши расхождение в отчёте.
- **Координаты.** Бери точку самого здания, а не центр карты. В ссылке Яндекса
  параметр `ll=` — это центр экрана, он **неточный**; нужен `poi[point]=lng,lat` или
  `pt=`. В Google — блок `!3d<lat>!4d<lng>` в ссылке, а не `@lat,lng`. Проверь, что
  точка совпадает с адресом.
- **Телефоны** — только реальные номера заведения, не агрегаторов и не таксистов.
- **Рейтинги** — текущие значения со страниц Google и Яндекса, а не из чужих отзывов.
- **Описание** пиши сам на основе фактов, без рекламных клише («лучший», «уникальный»).

## Формат ответа

Ответ — три части по порядку.

### Часть 1. JSON

Один объект, готовый для вставки в `data/pools.json`:

```json
{
  "id": "ulugbek-hotel-basseyn-shahrisabz",
  "slug": "ulugbek-hotel-basseyn-shahrisabz",
  "translations": {
    "ru": {
      "name": "ULUG'BEK Hotel&Spa",
      "address": "ул. Ипак Йули, 98, Шахрисабз, Кашкадарьинская область",
      "description": "Крытый бассейн при отеле с зоной спа. Работает круглый год, вход доступен и для гостей не из отеля. Есть сауна, хаммам и парковка."
    },
    "uz": {
      "name": "ULUG'BEK Hotel&Spa",
      "address": "Ipak Yo'li ko'chasi, 98, Shahrisabz, Qashqadaryo viloyati",
      "description": "Mehmonxona qoshidagi yopiq basseyn va spa zonasi. Yil davomida ishlaydi, mehmonxonada yashamaydiganlar ham kirishi mumkin. Sauna, hammom va avtoturargoh bor."
    },
    "en": {
      "name": "ULUG'BEK Hotel&Spa",
      "address": "98 Ipak Yuli Street, Shahrisabz, Kashkadarya Region",
      "description": "Indoor hotel pool with a spa area. Open year-round, including for visitors who are not hotel guests. Sauna, hammam and parking on site."
    }
  },
  "category": "hotel",
  "categories": ["hotel", "indoor"],
  "district": null,
  "region": "kashkadarya",
  "city": null,
  "coordinates": { "lat": 39.054321, "lng": 66.834567 },
  "phone": ["+998 75 522-04-40"],
  "telegram": ["https://t.me/ulugbekhotel"],
  "instagram": "https://www.instagram.com/ulugbek.hotel/",
  "facebook": "https://www.facebook.com/ulugbekhotel/",
  "youtube": null,
  "email": "info@ulugbekhotel.uz",
  "website": "https://ulugbekhotel.uz",
  "gallery": [
    "/images/pools/ulugbek-hotel-basseyn-shahrisabz/1.webp",
    "/images/pools/ulugbek-hotel-basseyn-shahrisabz/2.webp"
  ],
  "prices": [
    { "key": "price.adult_single", "amount": 100000, "currency": "UZS" },
    { "key": "price.child_single", "amount": 50000, "currency": "UZS" }
  ],
  "schedule": [
    { "day": "mon", "open": "09:00", "close": "20:00" },
    { "day": "tue", "open": "09:00", "close": "20:00" },
    { "day": "wed", "open": "09:00", "close": "20:00" },
    { "day": "thu", "open": "09:00", "close": "20:00" },
    { "day": "fri", "open": "09:00", "close": "20:00" },
    { "day": "sat", "open": "09:00", "close": "20:00" },
    { "day": "sun", "closed": true, "open": "00:00", "close": "00:00" }
  ],
  "services": ["parking", "spa", "sauna", "turkish_hammam", "hotel"],
  "season": "year-round",
  "poolLength": 25,
  "poolDepthMin": 1.2,
  "poolDepthMax": 1.8,
  "ratingGoogle": 3.7,
  "ratingYandex": 4.4,
  "reviewCount": 58,
  "featured": false,
  "createdAt": "2026-10-08T00:00:00Z"
}
```

Значения в примере показывают **формат**, а не факты о реальном бассейне.

### Часть 2. Источники

Таблица: поле → найденное значение → ссылка на источник → дата источника (если видна).
Для полей со значением `null` напиши, где искал и почему не нашёл.

### Часть 3. Фото и сомнения

- Список прямых ссылок на 5–12 лучших фото **именно бассейна** (чаша, зона отдыха,
  раздевалки), без фото номеров отеля, еды и людей крупным планом.
- Список спорных моментов, которые стоит перепроверить вручную (звонком или в Instagram).

## Правила для каждого поля

| Поле | Правило |
|---|---|
| `id`, `slug` | Одинаковые. Латиница, нижний регистр, через дефис, без апострофов. Формат: `<название>-<город>`, например `aqualand-shahrisabz`, `basseyn-yakkabog`, `suv-sport-saroyi-qarshi`. Для Ташкента город не добавляется |
| `translations.*.name` | Бренд пишется как у заведения и не переводится. Если имени нет — «Бассейн в Яккабаге» / «Yakkabog'dagi basseyn» / «Yakkabog Pool» |
| `translations.ru.address` | «ул. …, N, город/район, область». Для Ташкента: «ул. …, N, … район, Ташкент» |
| `translations.uz.*` | Узбекский **на латинице**, апостроф обычный `'`: `o'`, `g'`, `ko'chasi`, `viloyati`, `tumani` |
| `translations.en.*` | «N … Street, City, … Region». Описание — естественный английский, не дословный перевод |
| `description` | 2–4 предложения: тип бассейна, чаши (взрослая, детская, размеры), что есть рядом, сезон, важные нюансы по входу и ценам. Одинаковые факты на трёх языках |
| `category` | Один главный тип из списка ниже |
| `categories` | Все подходящие типы, главный первым. Если тип один — `["hotel"]` |
| `region` | id из списка регионов ниже |
| `district` | Только для `tashkent-city` — id района из списка ниже. Для всех областей `null` |
| `city` | Всегда `null` (город определяется по адресу автоматически) |
| `coordinates` | Числа с 6 знаками после точки. Правила выше |
| `phone` | Массив строк в формате `+998 XX XXX-XX-XX`. Городские тоже: `+998 71 234-32-85` |
| `telegram` | **Массив** ссылок `https://t.me/...` (канал, бот или аккаунт администратора) |
| `instagram`, `facebook`, `youtube`, `website` | Строки — полные ссылки с `https://`. Нет — `null` |
| `email` | Строка без `mailto:`. Нет — `null` |
| `gallery` | Пути `/images/pools/<slug>/1.webp`, `2.webp`… — по одному на каждое фото из части 3 |
| `prices` | Массив `{ key, amount, currency }`. `amount` — число без пробелов, в сумах. `currency`: `UZS` или `USD`. Бесплатный вход — `amount: 0` и пояснение в описании |
| `schedule` | Ровно 7 элементов `mon`…`sun`, время `HH:MM`. Круглосуточно — `00:00`–`23:59`. Выходной — `"closed": true, "open": "00:00", "close": "00:00"`. Расписание неизвестно — `[]` |
| `services` | Только ключи из списка ниже |
| `season` | `summer` — открытый, работает только летом; `year-round` — круглый год |
| `poolLength` | Длина главной чаши в метрах, число (`25`, `50`). Не нашёл — `null` |
| `poolDepthMin` / `poolDepthMax` | Глубина в метрах, дробь через точку (`1.2`, `2.5`). Не нашёл — `null` |
| `ratingGoogle`, `ratingYandex` | Число 0–5, один знак после точки. Нет оценки — `0` |
| `reviewCount` | Сумма отзывов в Google и Яндексе, целое число |
| `featured` | Всегда `false` (решает владелец каталога) |
| `createdAt` | Сегодняшняя дата: `YYYY-MM-DDT00:00:00Z` |

## Допустимые значения

### `category` и `categories`

- `open` — открытый (уличный)
- `indoor` — крытый
- `children` — детский или с выделенной детской чашей
- `sport` — спортивный (дорожки, секции, школа плавания)
- `hotel` — при отеле или санатории
- `aquapark` — аквапарк (горки)

### `region`

`tashkent-city` (Ташкент), `tashkent-region` (Ташкентская обл.), `andijan`, `fergana`,
`namangan`, `samarkand`, `bukhara`, `navoi`, `kashkadarya`, `surkhandarya`, `jizzakh`,
`syrdarya`, `khorezm`, `karakalpakstan`.

### `district` (только для Ташкента)

`yunusabad` (Юнусабад), `chilanzar` (Чиланзар), `mirzo-ulugbek` (Мирзо-Улугбек),
`yakkasaray` (Яккасарай), `almazar` (Алмазар), `bektemir` (Бектемир), `yashnabad`
(Яшнабад), `sergeli` (Сергели), `uchtepa` (Учтепа), `shayhontohur` (Шайхонтохур),
`mirobod` (Мирабад).

### `services`

- **Базовые:** `parking`, `bike_parking`, `locker` (шкафчики), `wifi`, `card_payment`,
  `gift_certificate`, `first_aid`
- **Еда и досуг:** `cafe`, `restaurant`, `bar`, `disco_bar`, `food_delivery`,
  `karaoke`, `billiards`
- **У воды:** `sunbed` (лежаки платные), `free_sunbed` (лежаки бесплатные), `gazebo`
  (беседки/топчаны), `yurt`, `wave_pool`, `trampoline`, `children_zone`
- **Спа и здоровье:** `sauna`, `russian_banya`, `turkish_hammam`, `jacuzzi`, `spa`,
  `wellness_center`, `massage`, `peeling`, `rain_shower`, `gym`
- **Обучение:** `trainer` (тренер, секции, школа плавания)
- **Проживание и бизнес:** `hotel`, `cottages`, `resort`, `conference_room`,
  `business_center`
- **Доступность:** `accessible_toilet`, `accessible_parking`, `ramp`, `elevator`

Если есть важная услуга, которой нет в списке, — не добавляй её в JSON, а упомяни
в части 3.

### `prices` — ключи

| Ключ | Что значит |
|---|---|
| `price.adult_single` / `price.child_single` | Разовый вход, взрослый / детский |
| `price.morning` | Утренний вход |
| `price.adult_1h`, `price.adult_2h`, `price.adult_3h` | Взрослый за 1 / 2 / 3 часа |
| `price.child_1h`, `price.child_2h`, `price.child_3h` | Детский за 1 / 2 / 3 часа |
| `price.adult_weekday` / `price.adult_weekend` | Взрослый, будни / выходные |
| `price.child_weekday` / `price.child_weekend` | Детский, будни / выходные |
| `price.adult_fullday` / `price.child_fullday` | Весь день |
| `price.adult_after18` / `price.child_after18` | Вечерний вход после 18:00 |
| `price.adult_vip` / `price.child_vip` | VIP-зона |
| `price.monthly` | Абонемент на месяц |
| `price.group` | Групповое занятие |
| `price.individual_single` | Индивидуальное занятие с тренером |
| `price.annual_membership` | Годовой абонемент |
| `price.sunbed_large` / `price.sunbed_small` | Аренда лежака / топчана |
| `price.gazebo_rental_day` | Аренда беседки на день |

Если цена не подходит ни под один ключ — придумай ключ в том же стиле
(`price.<что>_<кому>_<когда>`) и в части 3 дай для него подписи на ru, uz и en.
Цены «от … до …» записывай двумя позициями или минимальной ценой с пояснением в описании.

## Финальная самопроверка

Перед ответом проверь:

- [ ] JSON валиден (двойные кавычки, без комментариев и висячих запятых)
- [ ] Название, адрес, описание есть на ru, uz (латиница) и en, факты совпадают
- [ ] `district` заполнен только для Ташкента, `city` = `null`
- [ ] Координаты взяты из точки здания и совпадают с адресом
- [ ] В `schedule` ровно 7 дней или `[]`
- [ ] Все `services`, `category`, `region`, ключи `prices` — из списков выше
- [ ] Ни одного значения, которого нет в источниках
