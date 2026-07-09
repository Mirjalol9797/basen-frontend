<template>
  <div>

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1.5 text-sm text-gray-400 px-3 sm:px-4 py-2 border-b border-gray-100 flex-wrap">
      <NuxtLink :to="localePath('/')" class="hover:text-primary-600 transition-colors">{{ $t('nav.home') }}</NuxtLink>
      <span>/</span>
      <span class="text-gray-600">{{ $t('map.breadcrumb') }}</span>
    </nav>

    <div class="flex h-[calc(100vh-6.5rem)] overflow-hidden">

      <!-- Sidebar (desktop) -->
      <div class="hidden lg:flex flex-col w-80 xl:w-96 shrink-0">
        <MapSidebar
          :pools="poolsStore.all"
          :active-pool-id="activePoolId"
          @pool-select="onPoolSelect"
        />
      </div>

      <!-- Map area -->
      <div class="flex-1 relative flex flex-col">

        <!-- Mobile top bar -->
        <div class="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-100 shadow-sm z-10">
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="mobileTab === 'map' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'"
            @click="mobileTab = 'map'"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.452 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.764zM7.5 4.683l5 2.07v8.564l-5-2.07V4.683zm-1.5.583L3.5 6.17v8.615l2.5-1.035V5.266zm8.5 8.551l-2.5 1.034V5.266l2.5-1.034v9.585z" clip-rule="evenodd" />
            </svg>
            Карта
          </button>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="mobileTab === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'"
            @click="mobileTab = 'list'"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
            </svg>
            Список
            <span class="text-xs bg-white/30 px-1.5 rounded-full">{{ poolsStore.all.length }}</span>
          </button>
        </div>

        <!-- Mobile list panel -->
        <div
          v-if="mobileTab === 'list'"
          class="lg:hidden flex-1 overflow-hidden"
        >
          <MapSidebar
            :pools="poolsStore.all"
            :active-pool-id="activePoolId"
            @pool-select="onPoolSelectMobile"
          />
        </div>

        <!-- Leaflet map -->
        <div
          class="flex-1"
          :class="{ 'hidden lg:block': mobileTab === 'list' }"
        >
          <ClientOnly>
            <MapView
              :pools="poolsStore.all"
              :active-pool-id="activePoolId"
              @pool-click="onPoolSelect"
            />
            <template #fallback>
              <div class="w-full h-full flex items-center justify-center bg-gray-100">
                <div class="text-center">
                  <div class="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
                  <p class="text-sm text-gray-500">{{ $t('common.loading') }}</p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>

      </div>
    </div>

    <!-- FAQ -->
    <div class="container py-10 border-t border-gray-100">
      <h2 class="text-lg font-bold text-gray-900 mb-4">{{ $t('map.faq_title') }}</h2>
      <div class="space-y-2.5 max-w-3xl">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-white rounded-xl border border-gray-100 overflow-hidden"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors duration-150"
            :aria-expanded="openFaqIndex === index"
            @click="openFaqIndex = openFaqIndex === index ? null : index"
          >
            <span class="font-medium text-gray-900 text-sm leading-snug">{{ item.q }}</span>
            <svg
              class="w-4 h-4 shrink-0 text-primary-600 transition-transform duration-200"
              :class="{ 'rotate-180': openFaqIndex === index }"
              viewBox="0 0 20 20" fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <div v-if="openFaqIndex === index" class="px-4 pb-3.5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>

    <!-- Internal links -->
    <div class="container pb-10">
      <h2 class="text-lg font-bold text-gray-900 mb-4">{{ $t('map.links_title') }}</h2>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          :to="localePath('/catalog')"
          class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
        >
          {{ $t('map.link_catalog') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/catalog')"
          class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
        >
          {{ $t('map.link_districts') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/category/open')"
          class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
        >
          {{ $t('map.link_open') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/category/children')"
          class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
        >
          {{ $t('map.link_children') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/category/sport')"
          class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-150"
        >
          {{ $t('map.link_sport') }}
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Pool } from '~/types/pool'
import { buildOpeningHours } from '~/composables/useSeo'

const { t } = useI18n()
const localePath = useLocalePath()
const poolsStore = usePoolsStore()

const activePoolId = ref<string | null>(null)
const mobileTab = ref<'map' | 'list'>('map')

const onPoolSelect = (pool: Pool) => {
  activePoolId.value = pool.id
}

const onPoolSelectMobile = (pool: Pool) => {
  activePoolId.value = pool.id
  mobileTab.value = 'map'
}

usePageSeo({
  title: t('map.meta_title'),
  description: t('map.meta_desc'),
  canonical: '/map',
})

const faqItems = computed(() => [
  { q: t('map.faq.q1'), a: t('map.faq.a1') },
  { q: t('map.faq.q2'), a: t('map.faq.a2') },
  { q: t('map.faq.q3'), a: t('map.faq.a3') },
])
const openFaqIndex = ref<number | null>(null)

const BASE_URL = 'https://basen.uz'

watchEffect(() => {
  const pools = poolsStore.all

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('map.breadcrumb'),
    description: t('map.meta_desc'),
    url: `${BASE_URL}/map`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pools.length,
      itemListElement: pools.map((pool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SportsActivityLocation',
          name: pool.name,
          url: `${BASE_URL}/catalog/${pool.slug}`,
          ...(pool.phone.length > 0 && { telephone: pool.phone }),
          address: {
            '@type': 'PostalAddress',
            streetAddress: pool.address,
            addressLocality: 'Ташкент',
            addressCountry: 'UZ',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: pool.coordinates.lat,
            longitude: pool.coordinates.lng,
          },
          openingHours: buildOpeningHours(pool.schedule),
          ...(pool.gallery[0] && { image: `${BASE_URL}${pool.gallery[0]}` }),
        },
      })),
    },
  }

  const mapSchema = {
    '@context': 'https://schema.org',
    '@type': 'Map',
    name: t('map.breadcrumb'),
    url: `${BASE_URL}/map`,
    about: {
      '@type': 'Place',
      name: 'Ташкент',
      address: { '@type': 'PostalAddress', addressLocality: 'Ташкент', addressCountry: 'UZ' },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: t('map.breadcrumb'), item: `${BASE_URL}/map` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.value.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  useHead({
    script: [
      { type: 'application/ld+json', children: JSON.stringify(collectionSchema), key: 'schema-collection' },
      { type: 'application/ld+json', children: JSON.stringify(mapSchema), key: 'schema-map' },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema), key: 'schema-breadcrumb' },
      { type: 'application/ld+json', children: JSON.stringify(faqSchema), key: 'schema-faq' },
    ],
  })
})
</script>
