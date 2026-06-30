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
        <!-- Empty state -->
        <div v-if="pools.length === 0" class="text-center py-16">
          <p class="text-4xl mb-4">🏊</p>
          <p class="text-gray-500 mb-4">{{ $t('common.no_results') }}</p>
          <NuxtLink :to="localePath('/catalog')" class="text-primary-600 hover:text-primary-700 font-medium">
            {{ $t('region.see_catalog') }}
          </NuxtLink>
        </div>

        <!-- Pool grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <PoolCard v-for="pool in pools" :key="pool.id" :pool="pool" />
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
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const { regions, getRegionName, getRegionGenitive, getRegionById } = useRegions()

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
