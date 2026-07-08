export type PoolCategory =
  | 'open' | 'indoor' | 'children'
  | 'sport' | 'hotel' | 'aquapark'

export type Locale = 'ru' | 'uz' | 'en'

export interface Pool {
  id: string
  slug: string
  name: string
  address: string
  description: string
  category: PoolCategory
  region: string
  district: string | null
  city: string | null
  coordinates: { lat: number; lng: number }
  phone: string[]
  telegram?: string
  website?: string | null
  gallery: string[]
  prices: PriceItem[]
  schedule: ScheduleDay[]
  services: string[]
  season: 'summer' | 'year-round'
  poolLength?: number
  poolDepthMin?: number
  poolDepthMax?: number
  rating: number
  reviewCount: number
  featured: boolean
  createdAt: string
}

export interface RawPool extends Omit<Pool, 'name' | 'address' | 'description'> {
  translations: Record<Locale, {
    name: string
    address: string
    description: string
  }>
}

export interface PriceItem {
  key: string
  amount: number
  currency: 'UZS'
}

export interface ScheduleDay {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
  open: string
  close: string
  closed?: boolean
}

export interface Review {
  id: string
  poolId: string
  author: string
  rating: number
  text: string
  date: string
}
