import type { PoolCategory } from './pool'

export type SortOption = 'rating' | 'price_asc' | 'price_desc' | 'newest'

export interface PoolFilters {
  categories: PoolCategory[]
  district: string | null
  priceMin: number | null
  priceMax: number | null
  services: string[]
  season: 'summer' | 'year-round' | null
  sortBy: SortOption
}

export const defaultFilters = (): PoolFilters => ({
  categories: [],
  district: null,
  priceMin: null,
  priceMax: null,
  services: [],
  season: null,
  sortBy: 'rating',
})
