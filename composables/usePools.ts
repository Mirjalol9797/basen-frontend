// Регионы, которые всегда показываем первыми, остальные — по числу бассейнов
const PINNED_REGIONS = ['tashkent-city', 'tashkent-region']

export const usePools = () => {
  const store = usePoolsStore()
  const filtersStore = useFiltersStore()

  // Порядок регионов: Ташкент → Ташкентская область → по убыванию числа бассейнов
  const regionRank = computed(() => {
    const counts = new Map<string, number>()
    for (const p of store.all)
      counts.set(p.region, (counts.get(p.region) ?? 0) + 1)

    const rest = [...counts.keys()]
      .filter(r => !PINNED_REGIONS.includes(r))
      .sort((a, b) => (counts.get(b)! - counts.get(a)!) || a.localeCompare(b))

    const rank = new Map<string, number>()
    for (const [i, id] of [...PINNED_REGIONS, ...rest].entries())
      rank.set(id, i)

    return rank
  })

  const filtered = computed(() => {
    let result = [...store.all]
    const f = filtersStore.active

    if (f.categories.length > 0)
      result = result.filter(p => poolCategories(p).some(c => f.categories.includes(c)))

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
        case 'rating':
          return avgRating(b) - avgRating(a)
        default: {
          const rank = regionRank.value
          const byRegion =
            (rank.get(a.region) ?? Number.MAX_SAFE_INTEGER) -
            (rank.get(b.region) ?? Number.MAX_SAFE_INTEGER)
          return byRegion !== 0 ? byRegion : avgRating(b) - avgRating(a)
        }
      }
    })

    return result
  })

  return { pools: filtered, total: computed(() => filtered.value.length) }
}
