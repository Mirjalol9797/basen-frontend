import type { RawCategory, Category } from '~/types/category'
import type { Locale } from '~/types/pool'
import rawData from '~/data/categories.json'

export const useCategories = () => {
  const { locale } = useI18n()

  const categories = computed((): Category[] =>
    (rawData as RawCategory[]).map(cat => {
      const t = cat.translations[locale.value as Locale] ?? cat.translations.ru
      const { translations, ...rest } = cat
      return { ...rest, name: t.name, description: t.description }
    })
  )

  return { categories }
}
