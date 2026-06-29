<template>
  <aside class="flex flex-col h-full bg-white border-r border-gray-100">

    <!-- Header -->
    <div class="px-4 pt-4 pb-3 border-b border-gray-100">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-bold text-gray-900">
          {{ $t('nav.map') }}
        </h2>
        <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {{ filteredPools.length }}
        </span>
      </div>

      <!-- Category filter chips -->
      <div class="flex gap-1.5 flex-wrap">
        <button
          class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-150"
          :class="activeCategory === null
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="activeCategory = null"
        >
          Все
        </button>
        <button
          v-for="cat in CATEGORIES"
          :key="cat.id"
          class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-150"
          :class="activeCategory === cat.id
            ? 'text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          :style="activeCategory === cat.id ? { backgroundColor: cat.color } : {}"
          @click="activeCategory = activeCategory === cat.id ? null : cat.id"
        >
          {{ $t(`category.${cat.id}`) }}
        </button>
      </div>
    </div>

    <!-- Pool list -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="filteredPools.length === 0" class="px-4 py-12 text-center">
        <p class="text-sm text-gray-400">{{ $t('common.no_results') }}</p>
      </div>

      <button
        v-for="pool in filteredPools"
        :key="pool.id"
        class="w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-primary-50 transition-colors duration-100 group"
        :class="{ 'bg-primary-50': activePoolId === pool.id }"
        @click="$emit('pool-select', pool)"
      >
        <div class="flex items-start gap-3">
          <!-- Category dot -->
          <div
            class="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
            :style="{ backgroundColor: COLORS[pool.category] }"
          />

          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-1 mb-0.5">
              <span
                class="text-sm font-semibold text-gray-800 line-clamp-1 leading-tight group-hover:text-primary-700"
                :class="{ 'text-primary-700': activePoolId === pool.id }"
              >{{ pool.name }}</span>
              <span class="text-xs text-amber-500 shrink-0 leading-tight">★ {{ pool.rating.toFixed(1) }}</span>
            </div>

            <div class="flex items-center gap-2 mb-1">
              <!-- Status dot -->
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="isOpenNow(pool.schedule) ? 'bg-emerald-400' : 'bg-gray-300'"
              />
              <span class="text-xs" :class="isOpenNow(pool.schedule) ? 'text-emerald-600' : 'text-gray-400'">
                {{ isOpenNow(pool.schedule) ? $t('schedule.open_now') : $t('schedule.closed_now') }}
              </span>
            </div>

            <div class="text-xs text-gray-400 line-clamp-1">{{ pool.address }}</div>

            <div class="text-xs text-gray-500 mt-1 font-medium">
              от {{ formatPrice(minPrice(pool.prices)) }}
            </div>
          </div>
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Pool, PoolCategory } from '~/types/pool'

const props = defineProps<{
  pools: Pool[]
  activePoolId: string | null
}>()

defineEmits<{
  'pool-select': [pool: Pool]
}>()

const COLORS: Record<string, string> = {
  open:     '#0EA5E9',
  indoor:   '#0284C7',
  children: '#06B6D4',
  sport:    '#0369A1',
  hotel:    '#0891B2',
  aquapark: '#F97316',
}

const CATEGORIES = [
  { id: 'open',     color: '#0EA5E9' },
  { id: 'indoor',   color: '#0284C7' },
  { id: 'children', color: '#06B6D4' },
  { id: 'sport',    color: '#0369A1' },
  { id: 'hotel',    color: '#0891B2' },
  { id: 'aquapark', color: '#F97316' },
] as const

const activeCategory = ref<PoolCategory | null>(null)

const filteredPools = computed(() =>
  activeCategory.value
    ? props.pools.filter(p => p.category === activeCategory.value)
    : props.pools
)
</script>
