<template>
  <div class="space-y-6">

    <!-- Categories -->
    <section>
      <h4 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('filter.type') }}</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          type="button"
          class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
          :class="filters.categories.includes(cat)
            ? 'bg-primary-100 text-primary-700 border-primary-300'
            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'"
          @click="toggleCategory(cat)"
        >
          {{ $t(`category.${cat}`) }}
        </button>
      </div>
    </section>

    <!-- District -->
    <section>
      <h4 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('filter.district') }}</h4>
      <AppSelect
        :model-value="filters.district ?? ''"
        :options="districtOptions"
        :placeholder="$t('filter.all_districts')"
        @update:model-value="filters.district = $event || null"
      />
    </section>

    <!-- Price -->
    <section>
      <h4 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('filter.price') }}</h4>
      <AppRangeSlider
        :min="0"
        :max="500000"
        :model-min="filters.priceMin ?? 0"
        :model-max="filters.priceMax ?? 500000"
        :step="10000"
        @update:model-min="filters.priceMin = $event || null"
        @update:model-max="filters.priceMax = $event === 500000 ? null : $event"
      />
    </section>

    <!-- Season -->
    <section>
      <h4 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('filter.season') }}</h4>
      <div class="flex gap-2">
        <button
          v-for="s in SEASONS"
          :key="s.value"
          type="button"
          class="flex-1 py-2 px-3 rounded-xl border text-sm font-medium transition-all duration-150"
          :class="filters.season === s.value
            ? 'bg-primary-100 text-primary-700 border-primary-300'
            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'"
          @click="toggleSeason(s.value as 'summer' | 'year-round')"
        >
          {{ s.label }}
        </button>
      </div>
    </section>

    <!-- Services -->
    <section>
      <h4 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('filter.services') }}</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="svc in SERVICES"
          :key="svc"
          type="button"
          class="px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-150"
          :class="filters.services.includes(svc)
            ? 'bg-primary-100 text-primary-700 border-primary-300'
            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'"
          @click="toggleService(svc)"
        >
          {{ $t(`service.${svc}`) }}
        </button>
      </div>
    </section>

    <!-- Reset -->
    <button
      v-if="hasActiveFilters"
      type="button"
      class="w-full py-2.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
      @click="reset()"
    >
      {{ $t('filter.reset') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PoolCategory } from '~/types/pool'

const { t } = useI18n()
const { filters, hasActiveFilters, toggleCategory, reset } = useFilters()
const { districts } = useDistricts()

const CATEGORIES: PoolCategory[] = ['open', 'indoor', 'children', 'sport', 'hotel', 'aquapark']
const SERVICES = ['trainer', 'locker', 'parking', 'sauna', 'cafe', 'children_zone', 'jacuzzi', 'spa', 'wifi', 'shop']

const SEASONS = computed(() => [
  { value: 'summer',     label: t('filter.season_summer') },
  { value: 'year-round', label: t('filter.season_yearround') },
])

const districtOptions = computed(() =>
  districts.value.map(d => ({ value: d.id, label: d.name }))
)

function toggleSeason(val: 'summer' | 'year-round') {
  filters.season = filters.season === val ? null : val
}

function toggleService(svc: string) {
  const idx = filters.services.indexOf(svc)
  if (idx > -1) filters.services.splice(idx, 1)
  else filters.services.push(svc)
}
</script>
