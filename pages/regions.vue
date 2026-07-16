<template>
  <div>
    <!-- Hero -->
    <section class="bg-gray-900 text-white py-14 sm:py-20">
      <div class="container text-center">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ $t('home.regions_title') }}</h1>
        <p class="text-gray-300 text-lg">{{ $t('home.regions_subtitle') }}</p>
      </div>
    </section>

    <HomeRegions :show-heading="false" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('region.index_meta_title'),
  description: t('region.index_meta_desc'),
  canonical: '/regions',
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
          { '@type': 'ListItem', position: 2, name: t('nav.regions'), item: `${BASE_URL}/regions` },
        ],
      }),
      key: 'schema-breadcrumb',
    },
  ],
})
</script>
