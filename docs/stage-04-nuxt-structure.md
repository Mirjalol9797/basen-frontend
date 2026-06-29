# Этап 4 — Структура Nuxt 3

## 1. Дерево проекта

```
basenuz-frontend/
├── assets/
│   └── css/
│       └── main.css          — глобальные стили, импорт Inter
├── components/
│   ├── ui/                   — атомарные: Button, Badge, Input, Card...
│   ├── layout/               — Header, Footer, BottomNav, Breadcrumb
│   ├── pool/                 — PoolCard, PoolGallery, PoolSchedule, PoolPrices...
│   ├── catalog/              — CatalogGrid, CatalogFilters, CatalogSort
│   ├── map/                  — MapView, MapMarker, MapPopup
│   └── home/                 — HomeHero, HomeCategories, HomePopular, HomeSeasonal
├── composables/
│   ├── usePool.ts            — один бассейн по slug
│   ├── usePools.ts           — список с фильтрацией
│   ├── useFilters.ts         — логика фильтров
│   ├── useSearch.ts          — поиск по строке
│   ├── useCategories.ts      — список категорий
│   └── useSeo.ts             — генерация SEO-мета
├── data/                     — JSON-файлы (источник данных)
│   ├── pools.json
│   ├── categories.json
│   ├── districts.json
│   └── reviews.json
├── layouts/
│   ├── default.vue           — с header + footer + bottom nav
│   └── minimal.vue           — для 404, ошибок
├── pages/
│   ├── index.vue             — Главная
│   ├── catalog/
│   │   ├── index.vue         — Каталог
│   │   └── [slug].vue        — Детальная страница
│   ├── category/
│   │   └── [type].vue        — Страница категории
│   ├── map.vue               — Карта
│   ├── search.vue            — Поиск
│   ├── about.vue             — О проекте
│   ├── faq.vue               — FAQ
│   └── [...slug].vue         — 404
├── public/
│   ├── images/pools/         — фото бассейнов (по slug/)
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── stores/
│   ├── pools.ts              — данные всех бассейнов
│   ├── filters.ts            — активные фильтры
│   └── ui.ts                 — состояние UI (drawer, modal)
├── types/
│   ├── pool.ts
│   ├── category.ts
│   └── filter.ts
├── utils/
│   ├── slugify.ts
│   ├── formatPrice.ts
│   └── isOpenNow.ts
├── app.vue
├── nuxt.config.ts
└── tailwind.config.ts
```

---

## 2. Nuxt-модули

| Модуль | Назначение |
|--------|-----------|
| `@nuxtjs/tailwindcss` | Стилизация через Tailwind |
| `@nuxtjs/i18n` | Русский + Узбекский + Английский языки |
| `@nuxt/image` | Оптимизация фото, lazy load, WebP |
| `@pinia/nuxt` | State management |
| `@vueuse/nuxt` | VueUse composables (useGeolocation и др.) |
| `@nuxtjs/sitemap` | Автогенерация sitemap.xml |
| `nuxt-schema-org` | Schema.org разметка для SEO |

---

## 3. nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
  ],

  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'uz', name: "O'zbek", file: 'uz.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    // ru → /  |  uz → /uz/  |  en → /en/
  },

  image: {
    quality: 80,
    formats: ['webp'],
    screens: { xs: 390, sm: 640, md: 768, lg: 1024, xl: 1280 },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      ],
    },
  },

  nitro: {
    prerender: { crawlLinks: true },
  },

  routeRules: {
    '/': { prerender: true },
    '/catalog': { prerender: true },
    '/catalog/**': { prerender: true },
    '/category/**': { prerender: true },
    '/map': { ssr: true },
  },
})
```

---

## 4. TypeScript типы

```ts
// types/pool.ts
export type PoolCategory =
  | 'open' | 'indoor' | 'children'
  | 'sport' | 'hotel' | 'aquapark'

export type Locale = 'ru' | 'uz' | 'en'

// ─── Тип в приложении — плоский, один язык ───────────────────────────────────
// Получаем через normalizePool(raw, locale) или напрямую из API
export interface Pool {
  id: string
  slug: string
  name: string        // уже на нужном языке
  address: string     // уже на нужном языке
  description: string // уже на нужном языке
  category: PoolCategory
  district: string
  coordinates: { lat: number; lng: number }
  phone: string
  telegram?: string
  website?: string
  gallery: string[]
  prices: PriceItem[]
  schedule: ScheduleDay[]
  services: string[]
  season: 'summer' | 'year-round'
  poolLength?: number
  poolDepthMin?: number
  poolDepthMax?: number
  rating: number
  reviewCount: number
  featured: boolean
  createdAt: string
}

// ─── Тип в JSON-файле — содержит все переводы ────────────────────────────────
// Используется только внутри data-слоя, наружу не выходит
export interface RawPool extends Omit<Pool, 'name' | 'address' | 'description'> {
  translations: Record<Locale, {
    name: string
    address: string
    description: string
  }>
}

export interface PriceItem {
  key: string        // i18n-ключ: 'price.adult_single', 'price.monthly'
  amount: number
  currency: 'UZS'
}

export interface ScheduleDay {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
  open: string
  close: string
  closed?: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
}
```

```ts
// types/filter.ts
export interface PoolFilters {
  categories: PoolCategory[]
  district: string | null
  priceMin: number | null
  priceMax: number | null
  services: string[]
  season: 'summer' | 'year-round' | null
  sortBy: 'rating' | 'price_asc' | 'price_desc' | 'newest'
}
```

---

## 5. Composables

```ts
// composables/usePools.ts
export const usePools = () => {
  const store = usePoolsStore()

  const filtered = computed(() =>
    store.all
      .filter(applyFilters(store.filters))
      .sort(applySorting(store.filters.sortBy))
  )

  return { pools: filtered, total: computed(() => filtered.value.length) }
}
```

```ts
// composables/usePool.ts
export const usePool = (slug: string) => {
  const store = usePoolsStore()
  const pool = computed(() => store.all.find(p => p.slug === slug))
  const similar = computed(() =>
    store.all
      .filter(p => p.slug !== slug && p.category === pool.value?.category)
      .slice(0, 4)
  )
  return { pool, similar }
}
```

```ts
// composables/useSeo.ts
export const useSeo = (pool: Pool) => {
  useSeoMeta({
    title: `${pool.name} — цены, расписание, фото | Basen.uz`,
    description: `${pool.name} в Ташкенте. Цены от ${minPrice(pool)} сум, расписание, фото, адрес и контакты.`,
    ogImage: pool.gallery[0],
  })
}
```

---

## 6. Pinia Stores

```ts
// stores/pools.ts
export const usePoolsStore = defineStore('pools', () => {
  const all = ref<Pool[]>([])
  const filters = ref<PoolFilters>(defaultFilters())
  const { locale } = useI18n()

  async function init() {
    // Сейчас: берём из JSON и нормализуем по текущему локалю
    const data = await import('~/data/pools.json')
    all.value = (data.default as RawPool[]).map(p => normalizePool(p, locale.value as Locale))

    // В будущем (API): передаём язык в заголовке, получаем уже плоский объект
    // const data = await $fetch('/api/v1/pools', {
    //   headers: { 'Accept-Language': locale.value }
    // })
    // all.value = data.items
  }

  // При смене языка перенормализуем данные
  watch(locale, async () => { await init() })

  return { all, filters, init }
})
```

```ts
// stores/ui.ts
export const useUiStore = defineStore('ui', () => {
  const isFilterDrawerOpen = ref(false)
  const isMapView = ref(false)

  return { isFilterDrawerOpen, isMapView }
})
```

---

## 7. Utils

```ts
// utils/normalizePool.ts
export const normalizePool = (raw: RawPool, locale: Locale): Pool => {
  const t = raw.translations[locale] ?? raw.translations['ru']
  const { translations, ...rest } = raw
  return { ...rest, name: t.name, address: t.address, description: t.description }
}

// utils/formatPrice.ts
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('ru-UZ').format(amount) + ' сум'

// utils/isOpenNow.ts
export const isOpenNow = (schedule: ScheduleDay[]): boolean => {
  const now = new Date()
  const day = ['sun','mon','tue','wed','thu','fri','sat'][now.getDay()]
  const entry = schedule.find(s => s.day === day)
  if (!entry || entry.closed) return false
  const [oh, om] = entry.open.split(':').map(Number)
  const [ch, cm] = entry.close.split(':').map(Number)
  const minutes = now.getHours() * 60 + now.getMinutes()
  return minutes >= oh * 60 + om && minutes <= ch * 60 + cm
}
```

---

## 8. Принцип Data Layer (замена JSON → API)

Вся работа с данными идёт **только через composables и stores**, не из `pages/` напрямую.

```
pages/catalog/[slug].vue
  └── usePool(slug)           ← composable
        └── usePoolsStore()   ← store
              └── data/pools.json  ← сейчас JSON
                  └── fetch('/api/pools')  ← замена на API в v2
```

Чтобы перейти на API — меняем только `stores/pools.ts`. Страницы и компоненты не трогаем.

---

**Этап 4 завершён.**
Жду подтверждения для перехода к Этапу 5 — Data Layer (JSON-схемы).
