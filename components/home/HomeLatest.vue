<template>
  <section class="py-12 sm:py-16">
    <div class="container">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ $t('home.latest_title') }}</h2>
        <p class="text-gray-500 mt-1">{{ $t('home.latest_subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <PoolCard v-for="pool in latestPools" :key="pool.id" :pool="pool" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const poolsStore = usePoolsStore()

const latestPools = computed(() =>
  [...poolsStore.all]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)
)
</script>
