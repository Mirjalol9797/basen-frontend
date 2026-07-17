<template>
  <template v-for="block in regionBlocks" :key="block.id">
    <section class="py-12 sm:py-16 bg-white">
      <div class="container">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ $t('region.hero_title', { name: block.name }) }}
            </h2>
          </div>
          <NuxtLink
            :to="localePath(`/region/${block.id}`)"
            class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            {{ $t('common.show_all') }}
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <PoolCard v-for="pool in block.pools" :key="pool.id" :pool="pool" />
        </div>

        <!-- Mobile "show all" -->
        <div class="mt-8 text-center sm:hidden">
          <NuxtLink
            :to="localePath(`/region/${block.id}`)"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary-200 text-primary-700 font-medium text-sm hover:bg-primary-50 transition-colors"
          >
            {{ $t('common.show_all') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const { locale } = useI18n()
const { regions, getRegionName, getRegionGenitive } = useRegions()

const regionBlocks = computed(() =>
  regions.value
    .filter(r => r.id !== 'tashkent-city')
    .map(r => ({
      id: r.id,
      name: locale.value === 'ru' ? getRegionGenitive(r.id) : getRegionName(r.id),
      pools: poolsStore.all
        .filter(p => p.region === r.id)
        .sort((a, b) => b.ratingGoogle - a.ratingGoogle)
        .slice(0, 4),
    }))
    .filter(block => block.pools.length > 0)
    .sort((a, b) => b.pools.length - a.pools.length)
)
</script>
