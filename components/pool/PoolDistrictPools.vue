<template>
  <section v-if="pools.length > 0" class="mt-12">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl font-bold text-gray-900">
        {{ $t('common.other_in_district', { district: districtName }) }}
      </h2>
      <NuxtLink
        :to="localePath(`/district/${district}`)"
        class="text-sm font-semibold text-primary-600 hover:text-primary-700 shrink-0"
      >
        {{ $t('common.see_all_in_district') }} →
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

const props = defineProps<{ pools: Pool[]; district: string }>()

const localePath = useLocalePath()
const { getDistrictGenitive } = useDistricts()

const districtName = computed(() => getDistrictGenitive(props.district))
</script>
