<template>
  <section class="py-12 sm:py-16 bg-gray-50">
    <div class="container">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.categories_title') }}</h2>
          <p class="text-gray-500 mt-1">Выберите тип и смотрите подходящие бассейны</p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="group relative flex flex-col items-center text-center p-4 sm:p-5 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary-100"
          @click="goToCategory(cat.id)"
        >
          <!-- Icon circle -->
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110"
            :style="{ backgroundColor: cat.color + '18' }"
          >
            <svg
              class="w-6 h-6 sm:w-7 sm:h-7"
              :style="{ color: cat.color }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="iconPaths[cat.icon] ?? iconPaths.default" />
            </svg>
          </div>

          <!-- Name -->
          <span class="text-sm font-semibold text-gray-800 leading-tight">{{ cat.name }}</span>

          <!-- Count -->
          <span
            v-if="countByCategory[cat.id]"
            class="mt-1.5 text-xs text-gray-400"
          >
            {{ countByCategory[cat.id] }} бассейнов
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const localePath = useLocalePath()
const router = useRouter()
const filtersStore = useFiltersStore()
const poolsStore = usePoolsStore()
const { categories } = useCategories()

const countByCategory = computed(() => {
  const counts: Record<string, number> = {}
  for (const pool of poolsStore.all) {
    counts[pool.category] = (counts[pool.category] || 0) + 1
  }
  return counts
})

const iconPaths: Record<string, string> = {
  sun:      'M12 3v1m0 16v1M3 12h1m16 0h1m-3.343-7.657-.707.707M6.05 17.95l-.707.707m12.414 0-.707-.707M6.757 6.05l-.707-.707M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  building: 'M3 9.5V19h6v-4h6v4h6V9.5L12 3 3 9.5z',
  child:    'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-7 9a7 7 0 0 1 14 0',
  swimmer:  'M2 12c2 2 4 3 7 3s5-1 7-3M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 6v3M7 21c2-2 8-2 10 0',
  hotel:    'M3 21h18M3 7l9-4 9 4v14H3V7zm6 14v-4h6v4',
  waves:    'M2 12c1.5-2 3.5-3 5.5-3s4 1 6 1 4-1 6-1c2 0 4 1 2.5 3M2 17c1.5-2 3.5-3 5.5-3s4 1 6 1 4-1 6-1c2 0 4 1 2.5 3',
  default:  'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6',
}

const goToCategory = (categoryId: string) => {
  filtersStore.active.categories = [categoryId as PoolCategory]
  router.push(localePath('/catalog'))
}
</script>
