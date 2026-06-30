<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="container">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2 shrink-0">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-aqua-500 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zm0-4c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zM12 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5 5l3 3h-2v3h4v-3h-2l3-3"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-primary-900">Basen<span class="text-primary-500">.uz</span></span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="localePath(link.to)"
            class="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-150"
            active-class="text-primary-600 bg-primary-50"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </nav>

        <!-- Right: lang switcher + mobile btn -->
        <div class="flex items-center gap-2">

          <!-- Language switcher -->
          <div class="hidden sm:flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
            <NuxtLink
              v-for="loc in availableLocales"
              :key="loc.code"
              :to="switchLocalePath(loc.code)"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150"
              :class="locale === loc.code
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'"
            >
              {{ loc.code.toUpperCase() }}
            </NuxtLink>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            :aria-expanded="mobileOpen"
            aria-label="Меню"
            @click="mobileOpen = !mobileOpen"
          >
            <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu overlay (absolute, does not push content) -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden absolute top-full left-0 right-0 border-t border-gray-100 bg-white shadow-lg z-50">
        <div class="container py-3 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="localePath(link.to)"
            class="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="mobileOpen = false"
          >
            {{ $t(link.label) }}
          </NuxtLink>

          <!-- Language switcher mobile -->
          <div class="flex items-center gap-1 px-3 pt-2 border-t border-gray-100 mt-1">
            <span class="text-xs text-gray-400 mr-1">Язык:</span>
            <NuxtLink
              v-for="loc in availableLocales"
              :key="loc.code"
              :to="switchLocalePath(loc.code)"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150"
              :class="locale === loc.code
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'"
              @click="mobileOpen = false"
            >
              {{ loc.code.toUpperCase() }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const mobileOpen = ref(false)

watch(() => route.fullPath, () => { mobileOpen.value = false })

const navLinks = [
  { key: 'home',    to: '/',        label: 'nav.home' },
  { key: 'catalog', to: '/catalog', label: 'nav.catalog' },
  { key: 'map',     to: '/map',     label: 'nav.map' },
  { key: 'about',   to: '/about',   label: 'nav.about' },
]

const availableLocales = computed(() =>
  (locales.value as { code: string; name: string }[])
)
</script>
