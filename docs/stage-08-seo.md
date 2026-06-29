# Этап 8 — SEO

## 1. SEO-стратегия

**Цель:** занять Топ-3 в Google по ключевым запросам за 3 месяца.
**Преимущество:** pools.uz занимает позиции, но слаб технически — легко перебить качеством.
**Фокус:** локальное SEO (Ташкент) + специализация (бассейны).

### Приоритетные ключевые запросы

| Кластер | Запросы | Страница |
|---------|---------|---------|
| Общий | "бассейны Ташкент", "бассейн Ташкент" | Главная, Каталог |
| Категории | "открытый бассейн Ташкент", "крытый бассейн Ташкент", "детский бассейн Ташкент" | `/category/[type]` |
| Объекты | "Malibu Sun Club цены", "Aqua Blue Ташкент" | `/catalog/[slug]` |
| Вопросы | "где поплавать в Ташкенте", "бассейн рядом со мной Ташкент" | Главная, FAQ |
| Цены | "цены бассейн Ташкент 2025", "стоимость посещения бассейна" | Каталог, Детальная |
| Узбекский | "Toshkentda basseyn", "bolalar basseynlari Toshkent" | `/uz/category/children` |
| Английский | "swimming pools Tashkent", "pool near me Tashkent" | `/en/catalog` |

---

## 2. Meta теги — шаблоны по страницам

### Главная `/`
```
title:       "Бассейны Ташкента — каталог, цены, расписание | Basen.uz"
description: "Все бассейны Ташкента в одном месте. 50+ объектов: открытые, крытые, детские, спортивные. Цены и расписание без звонков."
og:title:    "Basen.uz — лучший каталог бассейнов Ташкента"
og:image:    /og/home.jpg  (1200×630)
```

### Каталог `/catalog`
```
title:       "Каталог бассейнов Ташкента — 50+ объектов | Basen.uz"
description: "Полный каталог бассейнов Ташкента с ценами и расписанием. Фильтрация по типу, цене и району."
```

### Детальная `/catalog/[slug]`
```
title:       "{pool.name} — цены, расписание, фото | Basen.uz"
description: "{pool.name} в {district}. {category}. Цены от {minPrice} сум. Телефон, адрес, отзывы."
og:title:    "{pool.name} | Basen.uz"
og:image:    {pool.gallery[0]}
og:type:     place
```

### Категория `/category/[type]`
```
title:       "{category.name} Ташкента — цены и адреса | Basen.uz"
description: "{count} {category.name} в Ташкенте. {category.description}. Цены, расписание, фото."
```

### FAQ `/faq`
```
title:       "Вопросы о бассейнах Ташкента — FAQ | Basen.uz"
description: "Часто задаваемые вопросы: где найти бассейн, цены, расписание, тренеры."
```

---

## 3. OpenGraph + Twitter Cards

```ts
// composables/useSeo.ts
export const usePageSeo = (opts: {
  title: string
  description: string
  image?: string
  type?: string
}) => {
  const baseUrl = 'https://basen.uz'
  const image = opts.image ?? `${baseUrl}/og/default.jpg`

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogImage: image,
    ogType: opts.type ?? 'website',
    ogSiteName: 'Basen.uz',
    ogLocale: 'ru_UZ',
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: image,
  })

  useHead({
    link: [{ rel: 'canonical', href: `${baseUrl}${useRoute().path}` }],
  })
}
```

---

## 4. Schema.org — по страницам

### Главная — WebSite + SearchAction
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Basen.uz",
  "url": "https://basen.uz",
  "description": "Каталог бассейнов Ташкента",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://basen.uz/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Детальная — LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "Malibu Sun Club",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Амира Темура, 15",
    "addressLocality": "Ташкент",
    "addressCountry": "UZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3111,
    "longitude": 69.2797
  },
  "telephone": "+998712345678",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.6,
    "reviewCount": 38
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"],
      "opens": "08:00",
      "closes": "22:00"
    }
  ],
  "image": "https://basen.uz/images/pools/malibu-sun-club/1.jpg",
  "priceRange": "$$"
}
```

### FAQ — FAQPage (rich snippet в Google)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Как найти бассейн рядом с домом в Ташкенте?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Используйте карту на Basen.uz — включите геолокацию..."
      }
    }
  ]
}
```

### Категория — ItemList
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Детские бассейны Ташкента",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://basen.uz/catalog/aqua-blue" },
    { "@type": "ListItem", "position": 2, "url": "https://basen.uz/catalog/dos-hermanas" }
  ]
}
```

### BreadcrumbList — на всех внутренних страницах
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://basen.uz/" },
    { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "https://basen.uz/catalog" },
    { "@type": "ListItem", "position": 3, "name": "Malibu Sun Club" }
  ]
}
```

---

## 5. Технический SEO

### hreflang (мультиязычность)
```html
<link rel="alternate" hreflang="ru" href="https://basen.uz/catalog/malibu-sun-club" />
<link rel="alternate" hreflang="uz" href="https://basen.uz/uz/catalog/malibu-sun-club" />
<link rel="alternate" hreflang="en" href="https://basen.uz/en/catalog/malibu-sun-club" />
<link rel="alternate" hreflang="x-default" href="https://basen.uz/catalog/malibu-sun-club" />
```
Nuxt i18n генерирует эти теги автоматически при `strategy: 'prefix_except_default'`.

### robots.txt
```
User-agent: *
Allow: /

Disallow: /search
Disallow: /*/search

Sitemap: https://basen.uz/sitemap.xml
```

### sitemap.xml
```ts
// nuxt.config.ts — @nuxtjs/sitemap
sitemap: {
  hostname: 'https://basen.uz',
  routes: async () => {
    const pools = await import('./data/pools.json')
    return [
      ...pools.default.map(p => `/catalog/${p.slug}`),
      ...pools.default.map(p => `/uz/catalog/${p.slug}`),
      ...pools.default.map(p => `/en/catalog/${p.slug}`),
      '/category/open', '/category/indoor', '/category/children',
      '/category/sport', '/category/hotel', '/category/aquapark',
    ]
  },
  changefreq: 'weekly',
  priority: 0.8,
  defaults: { changefreq: 'monthly', priority: 0.5 },
}
```

---

## 6. Core Web Vitals — оптимизация

| Метрика | Цель | Решение |
|---------|------|---------|
| LCP | < 2.5s | `NuxtImage` + WebP + `fetchpriority="high"` на hero |
| CLS | < 0.1 | Явные размеры у всех `<img>`, skeleton для динамики |
| INP | < 200ms | Нет тяжёлых синхронных операций, фильтры через computed |
| TTFB | < 600ms | SSG prerender = статика, CDN раздача |

```html
<!-- Hero изображение — явный preload -->
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />
```

```ts
// nuxt.config.ts
app: {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    ]
  }
}
```

---

## 7. SEO-чеклист перед запуском

- [ ] Все страницы имеют уникальные title + description
- [ ] OG-изображения 1200×630 созданы для главных страниц
- [ ] Schema.org добавлен на все типы страниц
- [ ] hreflang настроен для ru / uz / en
- [ ] sitemap.xml генерируется и содержит все страницы
- [ ] robots.txt закрывает /search
- [ ] Canonical URL на каждой странице
- [ ] Google Search Console подключён
- [ ] PageSpeed Insights mobile ≥ 90
- [ ] Все изображения в WebP, с alt-текстами

---

**Этап 8 завершён.**
Жду подтверждения для перехода к Этапу 9 — Roadmap разработки.
