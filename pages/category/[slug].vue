<template>
  <div>
    <!-- 404 -->
    <div v-if="!category" class="container py-24 text-center">
      <p class="text-6xl mb-4">🏊</p>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('category.page_not_found') }}</h1>
      <p class="text-gray-400 mb-6">{{ $t('category.page_not_found_desc') }}</p>
      <NuxtLink :to="localePath('/catalog')" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors">
        {{ $t('errors.go_catalog') }}
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero -->
      <section class="text-white py-12 sm:py-16" :style="{ background: `linear-gradient(135deg, ${category.color}cc, ${category.color}99)` }">
        <div class="container">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-1.5 text-sm text-white/70 mb-6 flex-wrap">
            <NuxtLink :to="localePath('/')" class="hover:text-white transition-colors">{{ $t('nav.home') }}</NuxtLink>
            <span>/</span>
            <NuxtLink :to="localePath('/catalog')" class="hover:text-white transition-colors">{{ $t('nav.catalog') }}</NuxtLink>
            <span>/</span>
            <span class="text-white">{{ category.name }}</span>
          </nav>

          <h1 class="text-3xl sm:text-4xl font-bold mb-3">
            {{ $t('category.page_h1', { name: category.name }) }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-white/80">
            <span>{{ category.description }}</span>
            <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {{ $t('category.page_found', { count: pools.length }) }}
            </span>
          </div>
        </div>
      </section>

      <!-- SEO text block -->
      <div class="bg-white border-b border-gray-100">
        <div class="container py-5">
          <p class="text-sm text-gray-500 leading-relaxed max-w-3xl">
            {{ seoText }}
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="container py-8">
        <!-- Empty state -->
        <div v-if="pools.length === 0" class="text-center py-16">
          <p class="text-4xl mb-4">🏊</p>
          <p class="text-gray-500 mb-4">{{ $t('common.no_results') }}</p>
          <NuxtLink :to="localePath('/catalog')" class="text-primary-600 hover:text-primary-700 font-medium">
            {{ $t('errors.go_catalog') }}
          </NuxtLink>
        </div>

        <!-- Pool grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <PoolCard v-for="pool in pools" :key="pool.id" :pool="pool" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const poolsStore = usePoolsStore()
const { categories } = useCategories()

const slug = route.params.slug as string
const category = computed(() => categories.value.find(c => c.slug === slug) ?? null)

const pools = computed(() =>
  poolsStore.all
    .filter(p => p.category === (slug as PoolCategory))
    .sort((a, b) => b.rating - a.rating)
)

const seoText = computed(() => {
  const key = `category.seo_text.${slug}`
  const text = t(key)
  return text === key ? (category.value?.description ?? '') : text
})

watchEffect(() => {
  if (!category.value) return

  const BASE_URL = 'https://basen.uz'
  const name = category.value.name
  const count = pools.value.length

  usePageSeo({
    title: t('category.page_meta_title', { name, count }),
    description: t('category.page_meta_desc', { name, count }),
    canonical: `/category/${slug}`,
  })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${name} Ташкента`,
    description: category.value.description,
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
      { '@type': 'ListItem', position: 2, name: t('nav.catalog'), item: `${BASE_URL}/catalog` },
      { '@type': 'ListItem', position: 3, name: name, item: `${BASE_URL}/category/${slug}` },
    ],
  }

  useHead({
    script: [
      { type: 'application/ld+json', children: JSON.stringify(schema), key: 'schema-category' },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumb), key: 'schema-breadcrumb' },
    ],
  })
})
</script>
