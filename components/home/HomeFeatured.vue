<template>
  <section class="py-12 sm:py-16 bg-white">
    <div class="container">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.popular_title') }}</h2>
          <p class="text-gray-500 mt-1">Лучшие по рейтингу и отзывам</p>
        </div>
        <NuxtLink
          :to="localePath('/catalog')"
          class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {{ $t('common.show_all') }}
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <PoolCardSkeleton v-for="i in 4" :key="i" />
      </div>

      <!-- Pool cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <PoolCard
          v-for="pool in featuredPools"
          :key="pool.id"
          :pool="pool"
        />
      </div>

      <!-- Mobile "show all" -->
      <div class="mt-8 text-center sm:hidden">
        <NuxtLink
          :to="localePath('/catalog')"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary-200 text-primary-700 font-medium text-sm hover:bg-primary-50 transition-colors"
        >
          {{ $t('common.show_all') }} {{ $t('common.pools_count') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const poolsStore = usePoolsStore()

const loading = computed(() => poolsStore.all.length === 0)

const featuredPools = computed(() => {
  const all = poolsStore.all
  const featured = all.filter(p => p.featured)
  if (featured.length >= 4) return featured.slice(0, 4)
  const extras = all
    .filter(p => !p.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4 - featured.length)
  return [...featured, ...extras]
})
</script>
