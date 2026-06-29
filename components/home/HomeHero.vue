<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
    <!-- Decorative blobs -->
    <div class="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-aqua-500/20 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute top-1/2 right-1/4 w-48 h-48 bg-aqua-400/10 rounded-full blur-2xl pointer-events-none" />

    <div class="container relative z-10 py-16 sm:py-24">
      <div class="max-w-2xl mx-auto text-center">

        <!-- Live badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-sm mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          Ташкент · {{ poolCount }}+ бассейнов
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {{ $t('home.hero_title') }}
        </h1>
        <p class="text-lg sm:text-xl text-primary-100 mb-8">
          {{ $t('home.hero_subtitle') }}
        </p>

        <!-- Search -->
        <div class="relative max-w-lg mx-auto mb-8" ref="searchWrap">
          <div class="flex bg-white rounded-2xl shadow-2xl overflow-hidden ring-2 ring-white/20">
            <input
              v-model="query"
              type="text"
              :placeholder="$t('home.search_placeholder')"
              class="flex-1 px-5 py-4 text-gray-800 placeholder:text-gray-400 outline-none text-sm min-w-0"
              @focus="focused = true"
              @blur="onBlur"
              @keydown.enter="onEnter"
              @keydown.escape="closeSearch"
            />
            <button
              @click="onEnter"
              class="px-5 bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-150 shrink-0"
              aria-label="Поиск"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Suggestions dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showSuggestions"
              class="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-card-hover overflow-hidden z-30 border border-gray-100"
            >
              <NuxtLink
                v-for="pool in suggestions.slice(0, 5)"
                :key="pool.id"
                :to="localePath('/catalog/' + pool.slug)"
                class="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors text-left group"
                @mousedown.prevent
                @click="closeSearch"
              >
                <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <div class="text-sm font-medium text-gray-800 truncate">{{ pool.name }}</div>
                  <div class="text-xs text-gray-400 truncate">{{ pool.address }}</div>
                </div>
                <svg class="w-4 h-4 text-gray-300 group-hover:text-primary-400 transition-colors ml-auto shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- CTA link -->
        <NuxtLink
          :to="localePath('/catalog')"
          class="inline-flex items-center gap-2 text-primary-200 hover:text-white text-sm font-medium transition-colors duration-150"
        >
          {{ $t('common.show_all') }} {{ $t('common.pools_count') }}
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Stats -->
      <div class="mt-14 flex justify-center items-center gap-8 sm:gap-16 flex-wrap">
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-white tabular-nums">{{ poolCount }}+</div>
          <div class="text-primary-200 text-sm mt-1">{{ $t('common.pools_count') }}</div>
        </div>
        <div class="hidden sm:block w-px h-10 bg-white/20" />
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-white tabular-nums">6</div>
          <div class="text-primary-200 text-sm mt-1">типов</div>
        </div>
        <div class="hidden sm:block w-px h-10 bg-white/20" />
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-bold text-white tabular-nums">11</div>
          <div class="text-primary-200 text-sm mt-1">районов</div>
        </div>
      </div>
    </div>

    <!-- Wave divider -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full block">
        <path d="M0 48L480 16L960 36L1440 4V48H0Z" fill="#F9FAFB" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const router = useRouter()

const query = ref('')
const focused = ref(false)
const searchWrap = ref<HTMLElement | null>(null)

const suggestions = useSearch(query)
const showSuggestions = computed(() =>
  focused.value && query.value.length >= 2 && suggestions.value.length > 0
)
const poolCount = computed(() => poolsStore.all.length || 50)

const onBlur = () => {
  setTimeout(() => { focused.value = false }, 150)
}

const closeSearch = () => {
  query.value = ''
  focused.value = false
}

const onEnter = () => {
  if (suggestions.value.length === 1) {
    router.push(localePath('/catalog/' + suggestions.value[0].slug))
  } else {
    router.push(localePath('/catalog'))
  }
  closeSearch()
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
