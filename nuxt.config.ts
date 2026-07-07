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
      ],
      script: [
        { src: "https://www.googletagmanager.com/gtag/js?id=G-YBT2XJ63F5", async: true },
        { children: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-YBT2XJ63F5');" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
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
    },
  },

  routeRules: {
    "/":            { prerender: true },
    "/catalog":     { prerender: true },
    "/catalog/**":  { prerender: true },
    "/category/**": { prerender: true },
    "/district/**": { prerender: true },
    "/region/**":   { prerender: true },
    "/map":         { ssr: true },
  },

  sitemap: {
    urls: [
      { loc: '/',                        priority: 1.0, changefreq: 'weekly'  },
      { loc: '/catalog',                 priority: 0.9, changefreq: 'daily'   },
      { loc: '/district/yunusabad',      priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/chilanzar',      priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/mirzo-ulugbek',  priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/yakkasaray',     priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/almazar',        priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/bektemir',       priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/yashnabad',      priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/sergeli',        priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/uchtepa',        priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/shayhontohur',   priority: 0.8, changefreq: 'weekly'  },
      { loc: '/district/mirobod',        priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/open',           priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/indoor',         priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/children',       priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/sport',          priority: 0.8, changefreq: 'weekly'  },
      { loc: '/category/hotel',          priority: 0.7, changefreq: 'weekly'  },
      { loc: '/category/aquapark',       priority: 0.7, changefreq: 'weekly'  },
      { loc: '/region/tashkent-city',    priority: 0.9, changefreq: 'weekly'  },
      { loc: '/region/andijan',          priority: 0.8, changefreq: 'weekly'  },
      { loc: '/region/fergana',          priority: 0.8, changefreq: 'weekly'  },
      { loc: '/region/namangan',         priority: 0.8, changefreq: 'weekly'  },
      { loc: '/region/samarkand',        priority: 0.8, changefreq: 'weekly'  },
      { loc: '/region/bukhara',          priority: 0.7, changefreq: 'weekly'  },
      { loc: '/region/tashkent-region',  priority: 0.7, changefreq: 'weekly'  },
      { loc: '/region/khorezm',          priority: 0.7, changefreq: 'weekly'  },
      { loc: '/region/kashkadarya',      priority: 0.6, changefreq: 'monthly' },
      { loc: '/region/surkhandarya',     priority: 0.6, changefreq: 'monthly' },
      { loc: '/region/navoi',            priority: 0.6, changefreq: 'monthly' },
      { loc: '/region/jizzakh',          priority: 0.5, changefreq: 'monthly' },
      { loc: '/region/syrdarya',         priority: 0.5, changefreq: 'monthly' },
      { loc: '/region/karakalpakstan',   priority: 0.5, changefreq: 'monthly' },
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
