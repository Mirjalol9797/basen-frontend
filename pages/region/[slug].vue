<template>
  <div>
    <!-- 404 -->
    <div v-if="!region" class="container py-24 text-center">
      <p class="text-6xl mb-4">🗺️</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('region.not_found') }}</h1>
      <p class="text-gray-400 mb-6">{{ $t('region.not_found_desc') }}</p>
      <NuxtLink :to="localePath('/catalog')" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors">
        {{ $t('region.see_catalog') }}
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-12 sm:py-16">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-1.5 text-sm text-primary-200 mb-6 flex-wrap">
            <NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink>
            <span>/</span>
            <span class="text-white">{{ regionName }}</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            {{ $t('region.hero_title', { name: regionNameForTitle }) }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-primary-100">
            <span>{{ $t('region.hero_subtitle') }}</span>
            <span class="bg-white/15 px-3 py-1 rounded-full text-sm font-medium">
              {{ $t('region.found', { count: pools.length }) }}
            </span>
          </div>
        </div>
      </section>

      <!-- Content -->
      <div class="container py-8">

        <!-- Filters -->
        <div v-if="pools.length > 0" class="bg-white rounded-2xl shadow-card p-4 mb-6 space-y-4">
          <!-- Categories -->
          <div>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {{ $t('filter.type') }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="cat in CATEGORIES"
                :key="cat"
                type="button"
                class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
                :class="selectedCategories.includes(cat)
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'"
                @click="toggleCategory(cat)"
              >
                {{ $t(`category.${cat}`) }}
              </button>
            </div>
          </div>

          <!-- District select (only Tashkent City) -->
          <div v-if="isTashkentCity">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {{ $t('filter.district') }}
            </p>
            <select
              v-model="selectedDistrict"
              class="w-full sm:w-64 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 cursor-pointer"
            >
              <option :value="null">{{ $t('filter.all_districts') }}</option>
              <option v-for="d in districts" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </div>

          <!-- Season + Reset -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex gap-2">
              <button
                v-for="s in SEASONS"
                :key="s.value"
                type="button"
                class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
                :class="selectedSeason === s.value
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'"
                @click="toggleSeason(s.value)"
              >
                {{ s.label }}
              </button>
            </div>
            <button
              v-if="hasActiveFilters"
              type="button"
              class="text-sm text-red-500 hover:text-red-600 font-medium"
              @click="resetFilters"
            >
              {{ $t('filter.reset') }}
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredPools.length === 0" class="text-center py-16">
          <p class="text-4xl mb-4">🏊</p>
          <p class="text-gray-500 mb-4">{{ $t('common.no_results') }}</p>
          <button v-if="hasActiveFilters" class="text-primary-600 hover:text-primary-700 font-medium" @click="resetFilters">
            {{ $t('common.reset_filters') }}
          </button>
          <NuxtLink v-else :to="localePath('/catalog')" class="text-primary-600 hover:text-primary-700 font-medium">
            {{ $t('region.see_catalog') }}
          </NuxtLink>
        </div>

        <!-- Pool grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <PoolCard v-for="pool in filteredPools" :key="pool.id" :pool="pool" />
        </div>

        <!-- Other regions -->
        <div class="mt-12 pt-8 border-t border-gray-100">
          <h2 class="text-lg font-bold text-gray-900 mb-4">{{ $t('region.regions_title') }}</h2>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="r in otherRegions"
              :key="r.id"
              :to="localePath(`/region/${r.id}`)"
              class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
            >
              {{ r.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const { regions, getRegionName, getRegionGenitive, getRegionById } = useRegions()
const { districts } = useDistricts()

const slug = route.params.slug as string
const region = computed(() => getRegionById(slug) ?? null)

const regionName = computed(() => getRegionName(slug))
const regionNameForTitle = computed(() => {
  if (locale.value === 'ru') return getRegionGenitive(slug)
  return getRegionName(slug)
})

const pools = computed(() =>
  poolsStore.all.filter(p => p.region === slug).sort((a, b) => b.rating - a.rating)
)

const otherRegions = computed(() =>
  regions.value.filter(r => r.id !== slug)
)

const isTashkentCity = computed(() => slug === 'tashkent-city')

// Local filters
const CATEGORIES: PoolCategory[] = ['open', 'indoor', 'children', 'sport', 'hotel', 'aquapark']
const SEASONS = computed(() => [
  { value: 'summer',     label: t('filter.season_summer') },
  { value: 'year-round', label: t('filter.season_yearround') },
])

const selectedCategories = ref<PoolCategory[]>([])
const selectedSeason = ref<string | null>(null)
const selectedDistrict = ref<string | null>(null)

const hasActiveFilters = computed(() =>
  selectedCategories.value.length > 0 || selectedSeason.value !== null || selectedDistrict.value !== null
)

function toggleCategory(cat: PoolCategory) {
  const idx = selectedCategories.value.indexOf(cat)
  if (idx > -1) selectedCategories.value.splice(idx, 1)
  else selectedCategories.value.push(cat)
}

function toggleSeason(val: string) {
  selectedSeason.value = selectedSeason.value === val ? null : val
}

function resetFilters() {
  selectedCategories.value = []
  selectedSeason.value = null
  selectedDistrict.value = null
}

const filteredPools = computed(() => {
  let result = pools.value
  if (selectedCategories.value.length > 0)
    result = result.filter(p => selectedCategories.value.includes(p.category))
  if (selectedSeason.value)
    result = result.filter(p => p.season === selectedSeason.value)
  if (selectedDistrict.value)
    result = result.filter(p => p.district === selectedDistrict.value)
  return result
})

watchEffect(() => {
  if (!region.value) return

  const BASE_URL = 'https://basen.uz'
  const nameForSeo = regionNameForTitle.value
  const count = pools.value.length

  usePageSeo({
    title: t('region.meta_title', { name: nameForSeo }),
    description: t('region.meta_desc', { name: nameForSeo, count }),
    canonical: `/region/${slug}`,
  })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('region.hero_title', { name: nameForSeo }),
    description: t('region.meta_desc', { name: nameForSeo, count }),
    numberOfItems: count,
    itemListElement: pools.value.map((pool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: pool.name,
      url: `${BASE_URL}/catalog/${pool.slug}`,
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: regionName.value, item: `${BASE_URL}/region/${slug}` },
    ],
  }

  useHead({
    script: [
      { type: 'application/ld+json', children: JSON.stringify(schema), key: 'schema-region' },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumb), key: 'schema-breadcrumb' },
    ],
  })
})
</script>
