<template>
  <div>
    <HomeHero />
    <HomeCategories />
    <HomeFeatured />
    <HomeMapBanner />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('home.hero_title') + ' | Basen.uz',
  description: t('home.hero_subtitle'),
  canonical: '/',
})
</script>
