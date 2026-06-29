import districtData from '~/data/districts.json'

interface DistrictEntry {
  id: string
  translations: Record<string, string>
}

export const useDistricts = () => {
  const { locale } = useI18n()

  const getDistrictName = (id: string): string => {
    const entry = (districtData as DistrictEntry[]).find(d => d.id === id)
    return entry?.translations[locale.value] ?? id
  }

  const districts = computed(() =>
    (districtData as DistrictEntry[]).map(d => ({
      id: d.id,
      name: d.translations[locale.value] ?? d.id,
    }))
  )

  return { districts, getDistrictName }
}
