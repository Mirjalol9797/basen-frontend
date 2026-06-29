<template>
  <div class="divide-y divide-gray-50">
    <div
      v-for="price in prices"
      :key="price.key"
      class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
    >
      <span class="text-sm text-gray-600">{{ $t(price.key) }}</span>
      <span class="text-sm font-semibold text-gray-900 tabular-nums">
        {{ formatPrice(price.amount) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PriceItem } from '~/types/pool'
defineProps<{ prices: PriceItem[] }>()
</script>
