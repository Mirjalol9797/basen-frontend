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
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="localePath(`/category/${cat.id}`)"
          class="group relative flex flex-col items-center text-center p-4 sm:p-5 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary-100"
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
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const { categories } = useCategories()

const countByCategory = computed(() => {
  const counts: Record<string, number> = {}
  for (const pool of poolsStore.all) {
    for (const c of poolCategories(pool))
      counts[c] = (counts[c] || 0) + 1
  }
  return counts
})

const iconPaths = categoryIconPaths

</script>
