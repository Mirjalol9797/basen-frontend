import type { Review } from '~/types/pool'

export const usePool = (slug: string) => {
  const store = usePoolsStore()

  const pool = computed(() => store.all.find(p => p.slug === slug) ?? null)

  const similar = computed(() =>
    store.all
      .filter(p => p.slug !== slug && p.category === pool.value?.category)
      .slice(0, 4)
  )

  return { pool, similar }
}

export const usePoolReviews = async (poolId: string): Promise<Review[]> => {
  const data = await import('~/data/reviews.json')
  return (data.default as Review[]).filter(r => r.poolId === poolId)
}
