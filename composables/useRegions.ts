import regionData from '~/data/regions.json'

interface RegionEntry {
  id: string
  ru_genitive: string
  translations: Record<string, string>
  /** Короткое название: «Ташкент», «Самарканд», «Ташкентская область». */
  short: Record<string, string>
  /** Форма для заголовков: ru — родительный падеж, uz — местный, en — «in …». */
  heading: Record<string, string>
}

export const useRegions = () => {
  const { locale } = useI18n()

  const getRegionName = (id: string): string => {
    const entry = (regionData as RegionEntry[]).find(r => r.id === id)
    return entry?.translations[locale.value] ?? id
  }

  /** Короткое название региона — для заголовков, ссылок и хлебных крошек. */
  const getRegionShort = (id: string): string => {
    const entry = (regionData as RegionEntry[]).find(r => r.id === id)
    return entry?.short?.[locale.value] ?? entry?.translations[locale.value] ?? id
  }

  /** Падежная форма для H1 вида «Открытые бассейны Самарканда». */
  const getRegionHeading = (id: string): string => {
    const entry = (regionData as RegionEntry[]).find(r => r.id === id)
    return entry?.heading?.[locale.value] ?? getRegionShort(id)
  }

  const getRegionGenitive = (id: string): string => {
    const entry = (regionData as RegionEntry[]).find(r => r.id === id)
    if (!entry) return id
    if (locale.value === 'ru') return entry.ru_genitive
    return entry.translations[locale.value] ?? id
  }

  const getRegionById = (id: string): RegionEntry | undefined => {
    return (regionData as RegionEntry[]).find(r => r.id === id)
  }

  const regions = computed(() =>
    (regionData as RegionEntry[]).map(r => ({
      id: r.id,
      name: r.translations[locale.value] ?? r.id,
    }))
  )

  return {
    regions,
    getRegionName,
    getRegionShort,
    getRegionHeading,
    getRegionGenitive,
    getRegionById,
  }
}
