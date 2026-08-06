<template>
  <section class="py-6 sm:py-12">
    <div class="container">
      <div class="mb-4 sm:mb-8">
        <h2 class="text-lg sm:text-2xl font-bold text-gray-900">{{ $t('home.latest_title') }}</h2>
        <p class="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{{ $t('home.latest_subtitle') }}</p>
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
