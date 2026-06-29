import { defaultFilters } from '~/types/filter'
import type { PoolFilters } from '~/types/filter'

export const useFiltersStore = defineStore('filters', () => {
  const active = ref<PoolFilters>(defaultFilters())

  const hasActiveFilters = computed(() =>
    active.value.categories.length > 0 ||
    active.value.district !== null ||
    active.value.priceMin !== null ||
    active.value.priceMax !== null ||
    active.value.services.length > 0 ||
    active.value.season !== null
  )

  function reset() {
    active.value = defaultFilters()
  }

  return { active, hasActiveFilters, reset }
})
