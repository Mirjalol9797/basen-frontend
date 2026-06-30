<template>
  <div>
    <!-- Top row: categories + district + season -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <!-- Categories -->
      <div class="lg:col-span-2">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {{ $t('filter.type') }}
        </p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="cat in CATEGORIES"
            :key="cat"
            type="button"
            class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
            :class="filters.categories.includes(cat)
              ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'"
            @click="toggleCategory(cat)"
          >
            {{ $t(`category.${cat}`) }}
          </button>
        </div>
      </div>

      <!-- Region -->
      <div>
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {{ $t('filter.region') }}
        </p>
        <AppSelect
          :model-value="filters.region ?? ''"
          :options="regionOptions"
          :placeholder="$t('filter.all_regions')"
          @update:model-value="onRegionChange($event)"
        />
      </div>
    </div>

    <!-- District (only for Tashkent) -->
    <div v-if="showDistrict" class="mt-4">
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('filter.district') }}
      </p>
      <AppSelect
        :model-value="filters.district ?? ''"
        :options="districtOptions"
        :placeholder="$t('filter.all_districts')"
        @update:model-value="filters.district = $event || null"
      />
    </div>

    <!-- Second row: price + season -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

      <!-- Price -->
      <div>
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {{ $t('filter.price') }}
        </p>
        <AppRangeSlider
          :min="0"
          :max="500000"
          :model-min="filters.priceMin ?? 0"
          :model-max="filters.priceMax ?? 500000"
          :step="10000"
          @update:model-min="filters.priceMin = $event || null"
          @update:model-max="filters.priceMax = $event === 500000 ? null : $event"
        />
      </div>

      <!-- Season -->
      <div>
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {{ $t('filter.season') }}
        </p>
        <div class="flex gap-2">
          <button
            v-for="s in SEASONS"
            :key="s.value"
            type="button"
            class="flex-1 py-2 px-3 rounded-xl border text-sm font-medium transition-all duration-150"
            :class="filters.season === s.value
              ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'"
            @click="toggleSeason(s.value as 'summer' | 'year-round')"
          >
            {{ s.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Services -->
    <div class="mt-5">
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {{ $t('filter.services') }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="svc in SERVICES"
          :key="svc"
          type="button"
          class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
          :class="filters.services.includes(svc)
            ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'"
          @click="toggleService(svc)"
        >
          {{ $t(`service.${svc}`) }}
        </button>
      </div>
    </div>

    <!-- Footer: active count + reset -->
    <div class="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
      <span v-if="hasActiveFilters" class="text-sm text-primary-600 font-medium">
        {{ activeCount }} {{ activeCount === 1 ? 'фильтр' : 'фильтра' }} активно
      </span>
      <span v-else class="text-sm text-gray-400">Фильтры не выбраны</span>
      <button
        type="button"
        class="text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
        :class="hasActiveFilters
          ? 'text-red-500 hover:bg-red-50'
          : 'text-gray-300 cursor-not-allowed'"
        :disabled="!hasActiveFilters"
        @click="hasActiveFilters && reset()"
      >
        {{ $t('filter.reset') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const { t } = useI18n()
const { filters, hasActiveFilters, toggleCategory, reset } = useFilters()
const { districts } = useDistricts()
const { regions } = useRegions()

const CATEGORIES: PoolCategory[] = ['open', 'indoor', 'children', 'sport', 'hotel', 'aquapark']
const SERVICES = ['trainer', 'locker', 'parking', 'sauna', 'cafe', 'children_zone', 'jacuzzi', 'spa', 'wifi', 'shop']

const SEASONS = computed(() => [
  { value: 'summer',     label: t('filter.season_summer') },
  { value: 'year-round', label: t('filter.season_yearround') },
])

const regionOptions = computed(() =>
  regions.value.map(r => ({ value: r.id, label: r.name }))
)

const districtOptions = computed(() =>
  districts.value.map(d => ({ value: d.id, label: d.name }))
)

const showDistrict = computed(() =>
  !filters.region || filters.region === 'tashkent-city'
)

function onRegionChange(value: string) {
  filters.region = value || null
  if (value && value !== 'tashkent-city') {
    filters.district = null
  }
}

const activeCount = computed(() => {
  let n = 0
  if (filters.categories.length) n++
  if (filters.region) n++
  if (filters.district) n++
  if (filters.priceMin !== null || filters.priceMax !== null) n++
  if (filters.season) n++
  if (filters.services.length) n++
  return n
})

function toggleSeason(val: 'summer' | 'year-round') {
  filters.season = filters.season === val ? null : val
}

function toggleService(svc: string) {
  const idx = filters.services.indexOf(svc)
  if (idx > -1) filters.services.splice(idx, 1)
  else filters.services.push(svc)
}
</script>
