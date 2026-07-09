<script setup lang="ts">
const i18nHead = useLocaleHead({ addSeoAttributes: true })

useHead(computed(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs ?? {},
  link: i18nHead.value.link ?? [],
  meta: i18nHead.value.meta ?? [],
})))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-1 pb-16 sm:pb-0">
      <slot />
    </main>
    <AppFooter />
    <MobileBottomNav />
    <ScrollToTop />
  </div>
</template>
