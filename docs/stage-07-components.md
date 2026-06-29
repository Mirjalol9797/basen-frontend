# Этап 7 — Компоненты

## 1. Архитектура (Atomic Design)

```
components/
├── ui/          — атомы и молекулы: Button, Badge, Input, Modal...
├── layout/      — оболочка: Header, Footer, BottomNav, Breadcrumb
├── pool/        — всё про один бассейн: Card, Gallery, Schedule...
├── catalog/     — каталог и фильтры: Grid, Filters, Sort
├── map/         — карта: View, Marker, Popup
└── home/        — блоки главной: Hero, Categories, Seasonal, Popular
```

**Правило:** компоненты `ui/` не знают о бассейнах. Компоненты `pool/` используют `ui/`.
Страницы собираются из `home/`, `catalog/`, `map/` — не из атомов напрямую.

---

## 2. Layout-компоненты

### AppHeader
```
Props: —
Slots: —
Поведение: прозрачный на главной (hero), белый при скролле >80px
           на мобайл скрыт (используется BottomNav)
Содержит: лого, dropdown-навигация, строка поиска, переключатель языка
```

### AppBottomNav *(только мобайл)*
```
Props: —
4 таба: Главная (HomeIcon) | Каталог (ListIcon) | Карта (MapIcon) | Поиск (SearchIcon)
Поведение: sticky bottom, z-50, скрывается при открытом drawer
```

### AppFooter
```
Содержит: лого, навигация по категориям, соцсети, копирайт, переключатель языка
Мобайл: упрощённый (только копирайт + навигация)
```

### AppBreadcrumb
```
Props: items: { label: string, to?: string }[]
Рендерит: ссылки + разделитель "/"
SEO: автоматически добавляет BreadcrumbList schema
```

### AppDrawer *(мобайл — bottom sheet)*
```
Props: modelValue: boolean, title?: string
Emits: update:modelValue
Анимация: translateY(100%) → translateY(0), 300ms ease-out
Overlay: полупрозрачный backdrop, клик → закрыть
Используется: фильтры каталога, галерея мобайл
```

### AppModal *(десктоп)*
```
Props: modelValue: boolean, size?: 'sm' | 'md' | 'lg' | 'full'
Emits: update:modelValue
Закрытие: Escape, клик по overlay, крестик
Используется: полная галерея фото
```

---

## 3. UI Атомы (`ui/`)

| Компонент | Props | Описание |
|-----------|-------|---------|
| `AppButton` | `variant: primary\|secondary\|ghost\|telegram`, `size: sm\|md\|lg`, `loading`, `disabled` | Единственная кнопка в проекте |
| `AppBadge` | `label`, `color`, `icon?` | Бейдж типа, сезона, статуса |
| `AppRating` | `value: number`, `count?: number`, `size?` | Звёзды + число отзывов |
| `AppSkeleton` | `width`, `height`, `rounded?` | Placeholder при загрузке |
| `AppInput` | `modelValue`, `placeholder`, `icon?`, `clearable` | Поисковый инпут |
| `AppToggle` | `modelValue`, `label` | Переключатель (сезон, вид) |
| `AppSelect` | `modelValue`, `options: {value, label}[]`, `placeholder` | Dropdown-список |
| `AppRangeSlider` | `modelValue: [number, number]`, `min`, `max`, `step` | Слайдер диапазона цен |

---

## 4. Pool-компоненты (`pool/`)

### PoolCard
Самый часто используемый компонент — карточка в каталоге, похожих, главной.

```
Props:
  pool: Pool
  variant?: 'default' | 'horizontal' | 'compact'

Содержит:
  - Фото (NuxtImage, lazy, aspect-ratio 4/3)
  - Бейдж категории (верхний левый угол)
  - "Открыто/Закрыто" (верхний правый, через isOpenNow)
  - Название (H3 для SEO)
  - Район + адрес (MapPinIcon)
  - Рейтинг (AppRating)
  - Цена от (минимальная из prices)
  - Сезонный тег (если summer → "Летний")

Поведение:
  - Hover: translateY(-4px) + shadow-card-hover, 200ms
  - Весь клик-таргет = ссылка на /catalog/[slug]
  - variant="horizontal": фото слева 1/3, контент справа 2/3 (для поиска)
  - variant="compact": без описания, только фото + название + цена
```

### PoolGallery
```
Props: images: string[], name: string

Десктоп: hero-фото (большое) + 4 миниатюры в grid
Мобайл: Swiper-слайдер, точки-индикаторы снизу
Кнопка "Все фото (N)" → открывает AppModal с полной галереей
В модалке: keyboard ← → для листания, счётчик "3 / 8"
```

### PoolSchedule
```
Props: schedule: ScheduleDay[]

Таблица 7 дней: день недели | время работы
Текущий день: выделен (font-semibold + primary-100 bg)
Выходной: "Закрыто" (red-500)
Показывает "Открыто сейчас до 22:00" или "Закрыто, откроется завтра в 08:00"
```

### PoolPrices
```
Props: prices: PriceItem[]

Таблица: лейбл (из i18n по key) | сумма (formatPrice)
Выделяет минимальную цену как "Самый популярный"
На мобайл: карточки вместо таблицы
```

### PoolContact
```
Props: pool: Pool

Десктоп (сайдбар):
  - Цены (краткий список)
  - Часы сегодня
  - Адрес + ссылка на карту
  - AppButton variant="telegram" "Написать в Telegram"  (если pool.telegram)
  - AppButton variant="primary"  "Позвонить"            (tel: ссылка)

Мобайл (sticky footer):
  - Название + рейтинг слева
  - Кнопки справа (компактные)
  z-index: 40, bg-white, border-top
```

### PoolReviews
```
Props: reviews: Review[], rating: number, count: number

Заголовок: рейтинг крупно + распределение по звёздам (progress bars)
Список отзывов: аватар-инициалы + имя + дата + звёзды + текст
Показывает первые 3, кнопка "Показать все" разворачивает остальные
```

### PoolSimilar
```
Props: pools: Pool[]

4 карточки PoolCard variant="compact"
Заголовок "Похожие бассейны"
Горизонтальный скролл на мобайл, grid на десктоп
```

---

## 5. Catalog-компоненты (`catalog/`)

### CatalogFilters
```
Props: modelValue: PoolFilters
Emits: update:modelValue

Десктоп: статичная боковая панель, ширина 280px
Мобайл: рендерится внутри AppDrawer

Секции:
  - Тип бассейна: чекбоксы
  - Район: AppSelect
  - Цена: AppRangeSlider
  - Услуги: чекбоксы (свёрнуты, раскрываются)
  - Сезон: AppToggle

Кнопка "Сбросить" — появляется при filters !== defaultFilters()
Применение — мгновенное (computed, без кнопки Submit)
```

### CatalogGrid
```
Props: pools: Pool[], loading: boolean

Сетка карточек PoolCard
Skeleton: 8 AppSkeleton карточек при loading=true
Empty state: иллюстрация + текст + кнопка "Сбросить фильтры"
Пагинация: 12 карточек, кнопка "Показать ещё +12"
```

### CatalogSort
```
Props: modelValue: SortOption
Emits: update:modelValue

AppSelect с опциями: По рейтингу | Цена ↑ | Цена ↓ | Новые
На мобайл вынесен в шапку каталога
```

---

## 6. Map-компоненты (`map/`)

### MapView
```
Props: pools: Pool[], selectedId?: string
Emits: select(pool: Pool)

Библиотека: MapLibre GL JS (бесплатные тайлы OpenStreetMap)
ClientOnly обёртка — карта не рендерится на сервере
При mounted: fitBounds по всем маркерам
Кнопка геолокации: useGeolocation() из VueUse
```

### MapMarker
```
Props: pool: Pool, active: boolean
Emits: click

Кастомная SVG-иконка по цвету категории (из Design Tokens)
Active: scale(1.3) + drop-shadow
```

### MapPopup *(мобайл — bottom sheet, десктоп — overlay)*
```
Props: pool: Pool | null
Emits: close, open-detail

Мобайл: bottom sheet с фото + info + кнопка "Подробнее"
Десктоп: позиционированный попап над маркером
Закрытие: клик вне, Escape, кнопка X
```

---

## 7. Home-компоненты (`home/`)

| Компонент | Описание |
|-----------|---------|
| `HomeHero` | Фон + H1 + AppInput поиск + быстрые теги |
| `HomeCategories` | 6 плиток категорий, grid, NuxtLink → /category/[type] |
| `HomeSeasonal` | Динамический блок: летом открытые, зимой крытые. `computed` по месяцу |
| `HomePopular` | `featured: true` из store → горизонтальный скролл PoolCard |
| `HomeMapPreview` | Статичный скриншот карты + кнопка "Открыть карту" |
| `HomeStats` | 3 цифры: "50+ бассейнов", "6 типов", "Все районы" |

---

## 8. Дерево компонентов детальной страницы

```
pages/catalog/[slug].vue
├── AppBreadcrumb
├── PoolGallery
├── AppBadge (категория, сезон)
├── AppRating
├── [desktop layout]
│   ├── [left column]
│   │   ├── описание (текст)
│   │   ├── services (AppBadge × N)
│   │   ├── PoolSchedule
│   │   ├── PoolPrices
│   │   ├── MapView (mini)
│   │   └── PoolReviews
│   └── [right sticky sidebar]
│       └── PoolContact
├── [mobile]
│   └── PoolContact (sticky footer)
└── PoolSimilar
```

---

**Этап 7 завершён.**
Жду подтверждения для перехода к Этапу 8 — SEO.
