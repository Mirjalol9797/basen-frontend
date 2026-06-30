export const usePools = () => {
  const store = usePoolsStore()
  const filtersStore = useFiltersStore()

  const filtered = computed(() => {
    let result = [...store.all]
    const f = filtersStore.active

    if (f.categories.length > 0)
      result = result.filter(p => f.categories.includes(p.category))

    if (f.region)
      result = result.filter(p => p.region === f.region)

    if (f.district)
      result = result.filter(p => p.district === f.district)

    if (f.priceMin !== null)
      result = result.filter(p => p.prices.some(pr => pr.amount >= f.priceMin!))

    if (f.priceMax !== null)
      result = result.filter(p => p.prices.some(pr => pr.amount <= f.priceMax!))

    if (f.services.length > 0)
      result = result.filter(p => f.services.every(s => p.services.includes(s)))

    if (f.season)
      result = result.filter(p => p.season === f.season)

    result.sort((a, b) => {
      switch (f.sortBy) {
        case 'price_asc':
          return minPrice(a.prices) - minPrice(b.prices)
        case 'price_desc':
          return minPrice(b.prices) - minPrice(a.prices)
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return b.rating - a.rating
      }
    })

    return result
  })

  return { pools: filtered, total: computed(() => filtered.value.length) }
}
