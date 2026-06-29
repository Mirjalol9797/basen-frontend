import type { Pool, RawPool, Locale } from '~/types/pool'

export const usePoolsStore = defineStore('pools', () => {
  const all = ref<Pool[]>([])
  const { locale } = useI18n()

  async function init() {
    const data = await import('~/data/pools.json')
    all.value = (data.default as RawPool[]).map(p =>
      normalizePool(p, locale.value as Locale)
    )
    // Future API migration (change only this store):
    // const data = await $fetch('/api/v1/pools', { headers: { 'Accept-Language': locale.value } })
    // all.value = data.items
  }

  watch(locale, async () => { await init() })

  return { all, init }
})
