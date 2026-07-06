<template>
  <div>
    <HomeHero />
    <HomeCategories />
    <HomeRegions />
    <HomeFeatured />
    <HomeMapBanner />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('home.meta_title'),
  description: t('home.meta_desc'),
  canonical: '/',
})
</script>
