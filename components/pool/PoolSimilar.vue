<template>
  <section v-if="pools.length > 0" class="mt-12">
    <h2 class="text-xl font-bold text-gray-900 mb-5">{{ $t('common.similar') }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <PoolCard
        v-for="pool in pools"
        :key="pool.id"
        :pool="pool"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Pool } from '~/types/pool'
defineProps<{ pools: Pool[] }>()
</script>
