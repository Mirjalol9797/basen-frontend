import type { Locale } from './pool'

export interface GuideTranslation {
  title: string
  excerpt: string
  metaDescription: string
  intro: string
  conclusion: string
}

export interface RawGuide {
  slug: string
  poolSlugs: string[]
  publishedAt: string
  translations: Partial<Record<Locale, GuideTranslation>> & { ru: GuideTranslation }
}

export interface Guide extends GuideTranslation {
  slug: string
  poolSlugs: string[]
  publishedAt: string
}
