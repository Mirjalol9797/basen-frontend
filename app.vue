<script setup lang="ts">
const poolsStore = usePoolsStore()
await callOnce(poolsStore.init)

useHead({
  script: [{
    type: 'application/ld+json',
    key: 'schema-website',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Basen.uz',
      description: 'Каталог бассейнов Ташкента — цены, расписание, фото',
      url: 'https://basen.uz',
      inLanguage: ['ru', 'uz', 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://basen.uz/catalog?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
