<template>
  <div>
    <!-- Hero -->
    <section class="bg-gray-900 text-white py-14 sm:py-20">
      <div class="container text-center">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('guide.title') }}</h1>
        <p class="text-gray-300 text-lg">{{ $t('guide.subtitle') }}</p>
      </div>
    </section>

    <div class="container py-12 sm:py-16">
      <!-- Empty state -->
      <div v-if="guides.length === 0" class="text-center py-16">
        <p class="text-4xl mb-4">📝</p>
        <p class="text-gray-700 font-semibold mb-1">{{ $t('guide.empty_title') }}</p>
        <p class="text-gray-500 mb-6">{{ $t('guide.empty_desc') }}</p>
        <NuxtLink
          :to="localePath('/catalog')"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          {{ $t('guide.see_catalog') }}
        </NuxtLink>
      </div>

      <!-- Guide cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <NuxtLink
          v-for="g in guides"
          :key="g.slug"
          :to="localePath(`/guide/${g.slug}`)"
          class="group block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 border border-gray-100"
        >
          <h2 class="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {{ g.title }}
          </h2>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ g.excerpt }}</p>
          <span class="text-sm font-semibold text-primary-600">{{ $t('guide.read_more') }} →</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { guides } = useGuides()

usePageSeo({
  title: t('guide.meta_title'),
  description: t('guide.meta_desc'),
  canonical: '/guide',
})

const BASE_URL = 'https://basen.uz'

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('nav.home'), item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: t('nav.guide'), item: `${BASE_URL}/guide` },
        ],
      }),
      key: 'schema-breadcrumb',
    },
  ],
})
</script>
