<template>
  <section v-if="pools.length > 0" class="mt-12">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl font-bold text-gray-900">
        {{ $t('common.other_in_region', { region: regionName }) }}
      </h2>
      <NuxtLink
        :to="localePath(`/region/${region}`)"
        class="text-sm font-semibold text-primary-600 hover:text-primary-700 shrink-0"
      >
        {{ $t('common.see_all_in_region') }} →
      </NuxtLink>
    </div>
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

const props = defineProps<{ pools: Pool[]; region: string }>()

const localePath = useLocalePath()
const { locale } = useI18n()
const { getRegionName, getRegionGenitive } = useRegions()

const regionName = computed(() =>
  locale.value === 'ru' ? getRegionGenitive(props.region) : getRegionName(props.region)
)
</script>
