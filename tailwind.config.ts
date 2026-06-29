import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{ts,js}',
    './plugins/**/*.{ts,js}',
    './app.vue',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF8FF',
          100: '#DBEEFE',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          900: '#0C4A6E',
        },
        aqua: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
} satisfies Config
