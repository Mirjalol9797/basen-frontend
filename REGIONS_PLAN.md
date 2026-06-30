# План расширения Basen.uz по регионам Узбекистана

## Текущее состояние

- 50 бассейнов, все в Ташкенте
- Pool.district = район Ташкента (yunusabad, chilanzar, ...)
- Маршруты: /district/[slug] — только 10 ташкентских районов
- Нет поля region, нет поля city

## Целевая иерархия

```
Region (Вилоят)
  └── City (Город / Район области)
        └── Pool (Бассейн)
```

Пример:
- fergana → fergana-city → Бассейн "Дельфин"
- andijan → andijan-city → Бассейн "Олимп"
- tashkent-city → yunusabad → Бассейн "Aqua Park" (уже работает)

---

## Шаг 1 — Новый файл data/regions.json

Создать `data/regions.json` с 14 регионами.

Структура одного региона:
```json
{
  "id": "fergana",
  "ru_genitive": "Ферганской области",
  "translations": {
    "ru": "Ферганская область",
    "uz": "Farg'ona viloyati",
    "en": "Fergana Region"
  }
}
```

Полный список регионов:

| id                | ru                           | uz                        | ru_genitive                   |
|-------------------|------------------------------|---------------------------|-------------------------------|
| tashkent-city     | Ташкент (город)              | Toshkent (shahar)         | Ташкента                      |
| tashkent-region   | Ташкентская область          | Toshkent viloyati         | Ташкентской области           |
| andijan           | Андижанская область          | Andijon viloyati          | Андижанской области           |
| fergana           | Ферганская область           | Farg'ona viloyati         | Ферганской области            |
| namangan          | Наманганская область         | Namangan viloyati         | Наманганской области          |
| samarkand         | Самаркандская область        | Samarqand viloyati        | Самаркандской области         |
| bukhara           | Бухарская область            | Buxoro viloyati           | Бухарской области             |
| navoi             | Навоийская область           | Navoiy viloyati           | Навоийской области            |
| kashkadarya       | Кашкадарьинская область      | Qashqadaryo viloyati      | Кашкадарьинской области       |
| surkhandarya      | Сурхандарьинская область     | Surxondaryo viloyati      | Сурхандарьинской области      |
| jizzakh           | Джизакская область           | Jizzax viloyati           | Джизакской области            |
| syrdarya          | Сырдарьинская область        | Sirdaryo viloyati         | Сырдарьинской области         |
| khorezm           | Хорезмская область           | Xorazm viloyati           | Хорезмской области            |
| karakalpakstan    | Республика Каракалпакстан    | Qoraqalpog'iston          | Республики Каракалпакстан     |

---

## Шаг 2 — Обновить types/pool.ts

Добавить два поля в интерфейс Pool и RawPool:

```typescript
region: string        // "tashkent-city" | "fergana" | "andijan" | ...
city: string | null   // для регионов: "fergana-city", для Ташкента: null
```

- Существующие 50 пулов: region = "tashkent-city", city = null
- Новые пулы в регионах: district = null, region = "fergana", city = "fergana-city"

---

## Шаг 3 — Обновить data/pools.json

Добавить `"region": "tashkent-city"` и `"city": null` ко всем 50 существующим пулам.
Новые пулы в регионах добавляются по мере готовности данных.

---

## Шаг 4 — Новый composable composables/useRegions.ts

По образцу useDistricts.ts:

```typescript
export const useRegions = () => {
  const { locale } = useI18n()

  const getRegionName = (id: string): string => { ... }
  const getRegionGenitive = (id: string): string => { ... }
  const getRegionById = (id: string): RegionEntry | undefined => { ... }

  const regions = computed(() => regionData.map(r => ({
    id: r.id,
    name: r.translations[locale.value] ?? r.id,
  })))

  return { regions, getRegionName, getRegionGenitive, getRegionById }
}
```

---

## Шаг 5 — Новая страница pages/region/[slug].vue

Маршрут: /region/fergana

- H1: "Бассейны Ферганской области — цены 2026" (с ru_genitive)
- Список всех бассейнов региона (фильтр по pool.region === slug)
- Список городов региона (подсчёт бассейнов по city)
- Schema.org ItemList + BreadcrumbList
- Breadcrumb: Главная → Регионы → Ферганская область

---

## Шаг 6 — Страница pages/region/[slug]/[city].vue  (опционально)

Маршрут: /region/fergana/fergana-city

- H1: "Бассейны города Фергана — цены 2026"
- Список бассейнов по (region + city)
- Breadcrumb: Главная → Ферганская область → г. Фергана

Можно пропустить на первом этапе если в регионе только один город.

---

## Шаг 7 — Обновить stores/filters.ts

Добавить поле region:

```typescript
interface PoolFilters {
  // существующие поля...
  region: string | null   // новое
}
```

---

## Шаг 8 — Фильтр по региону в каталоге

Файл: pages/catalog/index.vue + components/catalog/CatalogFilters.vue

- Добавить выпадающий список "Регион" в боковую панель фильтров
- При выборе региона — показывать подфильтр "Город" (если несколько городов)
- Для Ташкента — уже есть фильтр по районам, оставить как есть

---

## Шаг 9 — Секция регионов на главной странице

Файл: pages/index.vue + новый components/home/HomeRegions.vue

- Карточки регионов с количеством бассейнов
- Расставить по приоритету (Ферганская долина, Самарканд, Бухара первыми)
- Ссылки на /region/[slug]

---

## Шаг 10 — Обновить футер

Файл: components/layout/AppFooter.vue

- Колонка "Регионы" — ссылки на топ-6 регионов (заменить или добавить к районам)

---

## Шаг 11 — Обновить карту

Файл: pages/map.vue

- Масштаб по умолчанию — вся страна (не только Ташкент)
- Кластеры маркеров по регионам
- Центр карты: ~lat 41.3, lng 63.9 (центр Узбекистана)

---

## Шаг 12 — SEO: i18n ключи

Добавить в locales/ru.json, uz.json, en.json:

```json
"region": {
  "meta_title": "Бассейны {name} — цены 2026 | Basen.uz",
  "meta_desc": "{count} бассейнов в {name}. Цены, расписание, фото.",
  "hero_title": "Бассейны {name}",
  "hero_subtitle": "цены 2026 · расписание · фото",
  "found": "{count} бассейнов",
  "not_found": "Регион не найден",
  "not_found_desc": "Проверьте адрес или откройте полный каталог",
  "regions_title": "Регионы Узбекистана",
  "cities_in_region": "Города региона"
}
```

---

## Шаг 13 — Обновить nuxt.config.ts

Добавить routeRules и sitemap URLs:

```typescript
routeRules: {
  "/region/**": { prerender: true },  // новое
}

sitemap: {
  urls: [
    { loc: '/region/tashkent-city',   priority: 0.9 },
    { loc: '/region/fergana',         priority: 0.8 },
    { loc: '/region/andijan',         priority: 0.8 },
    { loc: '/region/samarkand',       priority: 0.8 },
    // ... остальные регионы
  ]
}
```

---

## Приоритет добавления бассейнов по регионам

### Высокий приоритет (много населения, много запросов)
1. **Андижан** — 450k чел, крупнейший после Ташкента
2. **Фергана** — туризм + промышленность
3. **Наманган** — 550k чел
4. **Самарканд** — туристический хаб

### Средний приоритет
5. **Бухара** — туристы
6. **Ташкентская область** — Нурафшон, Янгиюль, Алмалык
7. **Хорезм** — Ургенч

### Низкий приоритет (мало данных)
8. Навои, Кашкадарья (Карши), Сурхандарья (Термез)
9. Джизак, Сырдарья, Каракалпакстан

---

## Минимальный набор для запуска (MVP регионов)

Чтобы быстро запустить — сделать только это:

1. ✅ Шаг 1 — data/regions.json
2. ✅ Шаг 2 — types/pool.ts (добавить region + city)
3. ✅ Шаг 3 — pools.json (добавить region всем 50 пулам)
4. ✅ Шаг 4 — composables/useRegions.ts
5. ✅ Шаг 5 — pages/region/[slug].vue
6. ✅ Шаг 12 — i18n ключи
7. ✅ Шаг 13 — nuxt.config.ts
8. ✅ Добавить 3-5 пулов в Андижане / Фергане для теста

Шаги 6-11 — после того как MVP заработал.
