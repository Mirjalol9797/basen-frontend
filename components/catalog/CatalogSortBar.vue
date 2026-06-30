<template>
  <div class="flex items-center justify-between gap-3 flex-wrap">

    <p class="text-sm text-gray-500 shrink-0">
      <span class="font-semibold text-gray-900">{{ total }}</span>
      {{ ' ' + $t('common.pools_count') }}
    </p>

    <div class="flex items-center gap-2 ml-auto">

      <!-- Sort -->
      <AppSelect
        v-model="sortBy"
        :options="sortOptions"
        size="sm"
        class="w-40"
      />

      <!-- Filter button -->
      <button
        type="button"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150"
        :class="hasActiveFilters
          ? 'border-primary-400 bg-primary-50 text-primary-700'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'"
        @click="uiStore.isFilterDrawerOpen ? uiStore.closeFilterDrawer() : uiStore.openFilterDrawer()"
      >
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.553.894l-4 2A1 1 0 016 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
        </svg>
        {{ $t('catalog.filters_btn') }}
        <span
          v-if="hasActiveFilters"
          class="w-2 h-2 rounded-full bg-primary-500 shrink-0"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ total: number }>()

const { t } = useI18n()
const filtersStore = useFiltersStore()
const uiStore = useUiStore()

const hasActiveFilters = computed(() => filtersStore.hasActiveFilters)

const sortBy = computed({
  get: () => filtersStore.active.sortBy,
  set: (v) => { filtersStore.active.sortBy = v as typeof filtersStore.active.sortBy },
})

const sortOptions = computed(() => [
  { value: 'rating',     label: t('sort.rating') },
  { value: 'price_asc',  label: t('sort.price_asc') },
  { value: 'price_desc', label: t('sort.price_desc') },
  { value: 'newest',     label: t('sort.newest') },
])
</script>
