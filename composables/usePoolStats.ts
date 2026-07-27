import categoriesData from '~/data/categories.json'

/**
 * Живые цифры каталога для маркетинговых и SEO-текстов.
 * Всё считается из стора бассейнов, поэтому тексты сами следуют за данными:
 * добавили бассейн в data/pools.json — цифра во всех текстах обновилась.
 */
export const usePoolStats = () => {
  const store = usePoolsStore()

  /** Точное количество бассейнов в каталоге. */
  const total = computed(() => store.all.length)

  /**
   * Округление вниз до десятков для формулировок вида «90+».
   * Число кончается на 0, поэтому следующее за ним существительное
   * остаётся грамматически верным во всех трёх языках («90+ бассейнов»).
   */
  const totalRounded = computed(() =>
    total.value < 10 ? total.value : Math.floor(total.value / 10) * 10
  )

  /** Количество бассейнов по категориям (объект учитывается во всех своих категориях). */
  const byCategory = computed(() => {
    const counts: Record<string, number> = {}
    for (const pool of store.all)
      for (const category of poolCategories(pool))
        counts[category] = (counts[category] ?? 0) + 1
    return counts
  })

  const yearRound = computed(
    () => store.all.filter(p => p.season === 'year-round').length
  )
  const seasonal = computed(() => total.value - yearRound.value)

  const districts = computed(
    () => new Set(store.all.map(p => p.district).filter(Boolean)).size
  )
  const regions = computed(
    () => new Set(store.all.map(p => p.region).filter(Boolean)).size
  )
  /** Сколько типов бассейнов предлагает каталог — берётся из справочника категорий. */
  const types = computed(() => categoriesData.length)

  /** Бассейны с рейтингом 4,5 и выше. */
  const highRated = computed(
    () => store.all.filter(p => avgRating(p) >= 4.5).length
  )

  /**
   * Готовый набор параметров для интерполяции в $t().
   * Использование: `$t('home.hero_subtitle', copyParams)`.
   */
  const copyParams = computed(() => ({
    count: totalRounded.value,
    total: total.value,
    yearRound: yearRound.value,
    seasonal: seasonal.value,
    districts: districts.value,
    regions: regions.value,
    types: types.value,
    highRated: highRated.value,
    open: byCategory.value.open ?? 0,
    indoor: byCategory.value.indoor ?? 0,
    children: byCategory.value.children ?? 0,
    sport: byCategory.value.sport ?? 0,
    hotel: byCategory.value.hotel ?? 0,
    aquapark: byCategory.value.aquapark ?? 0,
  }))

  return {
    total,
    totalRounded,
    byCategory,
    yearRound,
    seasonal,
    districts,
    regions,
    types,
    highRated,
    copyParams,
  }
}
