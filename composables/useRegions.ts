import regionData from '~/data/regions.json'

interface RegionEntry {
  id: string
  ru_genitive: string
  translations: Record<string, string>
}

export const useRegions = () => {
  const { locale } = useI18n()

  const getRegionName = (id: string): string => {
    const entry = (regionData as RegionEntry[]).find(r => r.id === id)
    return entry?.translations[locale.value] ?? id
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

  return { regions, getRegionName, getRegionGenitive, getRegionById }
}
