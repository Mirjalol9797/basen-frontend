import type { PoolCategory } from '~/types/pool'

export const useFilters = () => {
  const filtersStore = useFiltersStore()

  function toggleCategory(category: PoolCategory) {
    const cats = filtersStore.active.categories
    const idx = cats.indexOf(category)
    if (idx > -1) cats.splice(idx, 1)
    else cats.push(category)
  }

  return {
    filters: filtersStore.active,
    hasActiveFilters: computed(() => filtersStore.hasActiveFilters),
    toggleCategory,
    reset: filtersStore.reset,
  }
}
