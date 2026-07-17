import type { Review } from '~/types/pool'

export const usePool = (slug: Ref<string> | ComputedRef<string>) => {
  const store = usePoolsStore()

  const pool = computed(() => store.all.find(p => p.slug === slug.value) ?? null)

  const similar = computed(() =>
    store.all
      .filter(p => p.slug !== slug.value && p.category === pool.value?.category)
      .slice(0, 4)
  )

  const sameDistrict = computed(() => {
    const district = pool.value?.district
    if (!district) return []
    const similarSlugs = new Set(similar.value.map(p => p.slug))
    return store.all
      .filter(p => p.slug !== slug.value && p.district === district && !similarSlugs.has(p.slug))
      .slice(0, 4)
  })

  const sameRegion = computed(() => {
    const region = pool.value?.region
    if (!region) return []
    const similarSlugs = new Set(similar.value.map(p => p.slug))
    return store.all
      .filter(p => p.slug !== slug.value && p.region === region && !similarSlugs.has(p.slug))
      .sort((a, b) => b.ratingGoogle - a.ratingGoogle)
      .slice(0, 4)
  })

  return { pool, similar, sameDistrict, sameRegion }
}

export const usePoolReviews = async (poolId: string): Promise<Review[]> => {
  const data = await import('~/data/reviews.json')
  return (data.default as Review[]).filter(r => r.poolId === poolId)
}
