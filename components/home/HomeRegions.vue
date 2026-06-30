<template>
  <section class="py-12 sm:py-16">
    <div class="container">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.regions_title') }}</h2>
        <p class="text-gray-500 mt-1">{{ $t('home.regions_subtitle') }}</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <NuxtLink
          v-for="region in regionsWithCount"
          :key="region.id"
          :to="region.count > 0 ? localePath(`/region/${region.id}`) : undefined"
          class="group relative flex flex-col p-4 rounded-2xl border transition-all duration-200"
          :class="region.count > 0
            ? 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-card hover:-translate-y-0.5 cursor-pointer'
            : 'bg-gray-50 border-gray-100 cursor-default'"
        >
          <!-- Icon -->
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200"
            :class="region.count > 0
              ? 'bg-primary-50 group-hover:bg-primary-100'
              : 'bg-gray-100'"
          >
            <svg
              class="w-4 h-4 transition-colors duration-200"
              :class="region.count > 0 ? 'text-primary-500 group-hover:text-primary-600' : 'text-gray-300'"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>

          <!-- Name -->
          <span
            class="text-sm font-semibold leading-tight"
            :class="region.count > 0 ? 'text-gray-800' : 'text-gray-400'"
          >
            {{ region.name }}
          </span>

          <!-- Count or Coming soon -->
          <span class="mt-1.5 text-xs" :class="region.count > 0 ? 'text-gray-400' : 'text-gray-300'">
            {{ region.count > 0 ? `${region.count} ${$t('common.pools_count')}` : $t('home.regions_coming_soon') }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const { regions } = useRegions()

const countByRegion = computed(() => {
  const counts: Record<string, number> = {}
  for (const pool of poolsStore.all) {
    counts[pool.region] = (counts[pool.region] || 0) + 1
  }
  return counts
})

const regionsWithCount = computed(() =>
  regions.value.map(r => ({
    ...r,
    count: countByRegion.value[r.id] ?? 0,
  })).sort((a, b) => b.count - a.count)
)
</script>
