export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  css: ["leaflet/dist/leaflet.css"],

  modules: [
    ["@nuxtjs/tailwindcss", { cssPath: "~/assets/css/main.css" }],
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
  ],

  i18n: {
    locales: [
      { code: "ru", name: "Русский", file: "ru.json" },
      { code: "uz", name: "O'zbek", file: "uz.json" },
      { code: "en", name: "English", file: "en.json" },
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
  },

  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      link: [
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
      ignore: ["/_ipx/"],
    },
  },

  routeRules: {
    "/":           { prerender: true },
    "/catalog":    { prerender: true },
    "/catalog/**": { prerender: true },
    "/category/**":{ prerender: true },
    "/map":        { ssr: true },
  },

  sitemap: {
    urls: [
      { loc: '/',         priority: 1.0, changefreq: 'weekly'  },
      { loc: '/catalog',  priority: 0.9, changefreq: 'daily'   },
      { loc: '/map',      priority: 0.7, changefreq: 'weekly'  },
      { loc: '/about',    priority: 0.6, changefreq: 'monthly' },
      { loc: '/faq',      priority: 0.6, changefreq: 'monthly' },
      { loc: '/contacts', priority: 0.4, changefreq: 'yearly'  },
      { loc: '/privacy',  priority: 0.3, changefreq: 'yearly'  },
      { loc: '/terms',    priority: 0.3, changefreq: 'yearly'  },
    ],
  },

  site: {
    url: "https://basen.uz",
    name: "Basen.uz",
  },
});
