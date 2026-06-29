import type { Locale } from './pool'

export interface CategoryTranslation {
  name: string
  description: string
}

export interface RawCategory {
  id: string
  slug: string
  icon: string
  color: string
  translations: Record<Locale, CategoryTranslation>
}

export interface Category {
  id: string
  slug: string
  icon: string
  color: string
  name: string
  description: string
}
