<script setup lang="ts">
const poolsStore = usePoolsStore()
await callOnce(poolsStore.init)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
