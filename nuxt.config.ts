import poolsData from './data/pools.json'
import regionsData from './data/regions.json'
import districtsData from './data/districts.json'
import { categoryRegionPages } from './utils/categoryRegions'

// В sitemap попадают только регионы и районы, где реально есть бассейны.
// Пустые страницы Google не индексирует («просканирована, но не
// проиндексирована»), а в sitemap они только съедают краулинговый бюджет.
// Список пересобирается из данных, руками его больше править не нужно.
const poolCount = (key: 'region' | 'district', id: string) =>
  (poolsData as { region: string; district: string | null }[])
    .filter(p => p[key] === id).length

const regionUrls = (regionsData as { id: string }[])
  .map(r => ({ id: r.id, count: poolCount('region', r.id) }))
  .filter(r => r.count > 0)
  .sort((a, b) => b.count - a.count)
  .map(r => ({
    loc: `/region/${r.id}`,
    priority: r.count >= 20 ? 0.9 : r.count >= 5 ? 0.8 : 0.7,
    changefreq: 'weekly' as const,
  }))

const districtUrls = (districtsData as { id: string }[])
  .map(d => ({ id: d.id, count: poolCount('district', d.id) }))
  .filter(d => d.count > 0)
  .map(d => ({ loc: `/district/${d.id}`, priority: 0.8, changefreq: 'weekly' as const }))

// @nuxtjs/sitemap добавляет в карту ВСЕ пререндеренные маршруты, поэтому мало
// не перечислить пустые страницы — их нужно явно исключить, вместе с языковыми
// версиями. Сами страницы при этом остаются доступными и отдают noindex.
// Страницы «категория × регион». Динамические маршруты Nitro сам не находит,
// поэтому перечисляем их явно — во всех трёх локалях.
const comboPages = categoryRegionPages(poolsData as never)
const comboRoutes = comboPages.flatMap(c => {
  const path = `/category/${c.category}/${c.region}`
  return [path, `/uz${path}`, `/en${path}`]
})

// Без этого списка комбо-страницы всё равно попадают в sitemap — модуль
// добавляет все пререндеренные маршруты, — но уходят туда без приоритета.
// Приоритет держим ниже родительской страницы категории (0.7–0.8): комбинация
// уже, чем категория, и шире, чем карточка бассейна.
const comboUrls = comboPages.map(c => ({
  loc: `/category/${c.category}/${c.region}`,
  priority: c.count >= 9 ? 0.7 : 0.6,
  changefreq: 'weekly' as const,
}))

const emptyPages = [
  ...(regionsData as { id: string }[])
    .filter(r => poolCount('region', r.id) === 0).map(r => `/region/${r.id}`),
  ...(districtsData as { id: string }[])
    .filter(d => poolCount('district', d.id) === 0).map(d => `/district/${d.id}`),
]
const sitemapExclude = emptyPages.flatMap(p => [p, `/uz${p}`, `/en${p}`])

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  runtimeConfig: {
    public: {
      yandexMapsKey: '',
    },
  },

  modules: [
    ["@nuxtjs/tailwindcss", { cssPath: "~/assets/css/main.css" }],
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
  ],

  i18n: {
    baseUrl: 'https://basen.uz',
    locales: [
      { code: "ru", language: "ru-RU", name: "Русский", file: "ru.json" },
      { code: "uz", language: "uz-UZ", name: "O'zbek", file: "uz.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "ru",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix_except_default",
    restructureDir: false,
  },

  image: {
    quality: 80,
    formats: ["webp"],
    screens: { xs: 390, sm: 640, md: 768, lg: 1024, xl: 1280 },
    provider: 'none',
  },

  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      meta: [
        { name: "yandex-verification", content: "e29d998d92d9cc06" },
        { name: "theme-color", content: "#0284C7" },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "author", content: "Basen.uz" },
        { name: "publisher", content: "Basen.uz" },
        { name: "geo.region", content: "UZ-TK" },
        { name: "geo.position", content: "41.2995;69.2401" },
        { name: "ICBM", content: "41.2995, 69.2401" },
      ],
      script: [
        { src: "https://www.googletagmanager.com/gtag/js?id=G-YBT2XJ63F5", async: true },
        { children: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-YBT2XJ63F5');" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: comboRoutes,
    },
  },

  routeRules: {
    "/":            { prerender: true },
    "/catalog":     { prerender: true },
    "/catalog/**":  { prerender: true },
    "/regions":     { prerender: true },
    "/category/**": { prerender: true },
    "/district/**": { prerender: true },
    "/region/**":   { prerender: true },
    "/guide":       { prerender: true },
    "/guide/**":    { prerender: true },
    "/map":         { ssr: true },
  },

  sitemap: {
    exclude: sitemapExclude,
    urls: [
      { loc: '/',                        priority: 1.0, changefreq: 'weekly'  },
      { loc: '/catalog',                 priority: 0.9, changefreq: 'daily'   },
      { loc: '/regions',                 priority: 0.8, changefreq: 'weekly'  },
      { loc: '/guide',                   priority: 0.7, changefreq: 'weekly'  },
      ...districtUrls,
      { loc: '/category/open',           priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/indoor',         priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/children',       priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/sport',          priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/hotel',          priority: 0.7, changefreq: 'weekly'  },
      { loc: '/category/aquapark',       priority: 0.7, changefreq: 'weekly'  },
      ...comboUrls,
      ...regionUrls,
      { loc: '/map',                     priority: 0.7, changefreq: 'weekly'  },
      { loc: '/about',                   priority: 0.6, changefreq: 'monthly' },
      { loc: '/faq',                     priority: 0.6, changefreq: 'monthly' },
      { loc: '/contacts',                priority: 0.4, changefreq: 'yearly'  },
      { loc: '/privacy',                 priority: 0.3, changefreq: 'yearly'  },
      { loc: '/terms',                   priority: 0.3, changefreq: 'yearly'  },
    ],
  },

  site: {
    url: "https://basen.uz",
    name: "Basen.uz",
  },
});
