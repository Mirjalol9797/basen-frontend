import type { Pool, RawPool, Locale } from '~/types/pool'

export const normalizePool = (raw: RawPool, locale: Locale): Pool => {
  const t = raw.translations[locale] ?? raw.translations.ru
  const { translations, ...rest } = raw
  return { ...rest, name: t.name, address: t.address, description: t.description } as Pool
}
