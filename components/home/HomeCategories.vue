<template>
  <section class="py-8 sm:py-12 bg-gray-50">
    <div class="container">
      <div class="flex items-end justify-between mb-4 sm:mb-8">
        <div>
          <h2 class="text-lg sm:text-2xl font-bold text-gray-900">{{ $t('home.categories_title') }}</h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{{ $t('home.categories_subtitle') }}</p>
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
            v-if="byCategory[cat.id]"
            class="mt-1.5 text-xs text-gray-400"
          >
            {{ byCategory[cat.id] }} {{ poolsLabel(byCategory[cat.id]) }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()
const { categories } = useCategories()
const { byCategory } = usePoolStats()

const poolsLabel = (n: number) => poolsWord(n, locale.value)

const iconPaths = categoryIconPaths

</script>
