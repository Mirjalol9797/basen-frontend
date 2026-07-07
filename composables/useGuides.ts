import type { RawGuide, Guide } from '~/types/guide'
import type { Locale } from '~/types/pool'
import rawData from '~/data/guides.json'

export const useGuides = () => {
  const { locale } = useI18n()

  const guides = computed((): Guide[] =>
    (rawData as RawGuide[]).map(g => {
      const t = g.translations[locale.value as Locale] ?? g.translations.ru
      const { translations, ...rest } = g
      return { ...rest, ...t }
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  )

  const getGuideBySlug = (slug: string): Guide | null =>
    guides.value.find(g => g.slug === slug) ?? null

  return { guides, getGuideBySlug }
}
