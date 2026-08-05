import { poolCategories } from './poolCategory'

/**
 * Минимум бассейнов, при котором страница «категория × регион» имеет смысл.
 *
 * Ниже порога страница получается тонкой: карточка одного-двух объектов,
 * обёрнутая в hero, перелинковку и FAQ. Google такое кладёт в «просканировано,
 * но не проиндексировано», и в проекте это уже осознанная политика — пустые
 * регионы и районы точно так же исключены из sitemap.
 */
export const REGION_PAGE_MIN_POOLS = 5

type PoolLike = Parameters<typeof poolCategories>[0] & { region: string }

export interface CategoryRegionPage {
  category: string
  region: string
  count: number
}

/**
 * Пары «категория × регион», которых достаточно для отдельной страницы.
 * Считается из данных, поэтому список не нужно поддерживать руками: как
 * только в регионе набирается пятый бассейн категории, страница появляется.
 *
 * Функция намеренно принимает пулы аргументом, а не импортирует pools.json:
 * её вызывает и приложение, и nuxt.config, где алиасы вида `~/data` не работают.
 */
export function categoryRegionPages(pools: PoolLike[]): CategoryRegionPage[] {
  const counts = new Map<string, number>()

  for (const pool of pools)
    for (const category of poolCategories(pool)) {
      const key = `${category}/${pool.region}`
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }

  return [...counts.entries()]
    .filter(([, count]) => count >= REGION_PAGE_MIN_POOLS)
    .map(([key, count]) => {
      const [category, region] = key.split('/')
      return { category, region, count }
    })
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category))
}
