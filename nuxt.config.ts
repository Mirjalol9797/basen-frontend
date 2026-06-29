export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: '~/assets/css/main.css' }],
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
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
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

  site: {
    url: 'https://basen.uz',
    name: 'Basen.uz',
  },
})
