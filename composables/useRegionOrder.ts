import type { Pool } from '~/types/pool'

// Регионы, которые всегда показываем первыми, остальные — по числу бассейнов
const PINNED_REGIONS = ['tashkent-city', 'tashkent-region']

/**
 * Порядок регионов для списков бассейнов: Ташкент → Ташкентская область →
 * остальные по убыванию числа бассейнов.
 *
 * По умолчанию считается по всему каталогу (общий порядок для /catalog).
 * Если передать подмножество — например, только бассейны одной категории, —
 * количество считается внутри него, поэтому порядок незакреплённых регионов
 * меняется от страницы к странице: на спортивных бассейнах сразу после
 * Ташкента идёт Навои, где их 6 — больше, чем в любом другом регионе.
 */
export const useRegionOrder = (source?: Ref<Pool[]>) => {
  const store = usePoolsStore()
  const pools = computed(() => source?.value ?? store.all)

  const regionRank = computed(() => {
    const counts = new Map<string, number>()
    for (const p of pools.value)
      counts.set(p.region, (counts.get(p.region) ?? 0) + 1)

    const rest = [...counts.keys()]
      .filter(r => !PINNED_REGIONS.includes(r))
      .sort((a, b) => (counts.get(b)! - counts.get(a)!) || a.localeCompare(b))

    const rank = new Map<string, number>()
    for (const [i, id] of [...PINNED_REGIONS, ...rest].entries())
      rank.set(id, i)

    return rank
  })

  /** Сравнение для sort(): сначала по региону, внутри региона — по рейтингу. */
  const byRegionThenRating = (a: Pool, b: Pool): number => {
    const rank = regionRank.value
    const byRegion =
      (rank.get(a.region) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.region) ?? Number.MAX_SAFE_INTEGER)
    return byRegion !== 0 ? byRegion : avgRating(b) - avgRating(a)
  }

  return { regionRank, byRegionThenRating }
}
