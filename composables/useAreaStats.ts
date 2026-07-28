import type { Pool } from '~/types/pool'
import regionCities from '~/data/regionCities.json'

/**
 * Цифры для текстов на страницах регионов и районов.
 *
 * Тексты в regionGuides / regionFaq / districtGuides / districtFaq написаны
 * с плейсхолдерами ({count}, {priceFrom}, {districts} и т. д.) и подставляются
 * отсюда. Это сделано специально: если вписать числа прямо в текст, они
 * разойдутся с каталогом при первом же добавленном бассейне.
 *
 * Не путать с usePoolStats — тот считает цифры по всему каталогу для главной
 * и общих текстов, этот — по одному набору бассейнов (регион или район).
 */

/** Ключи прайса, которые означают разовое взрослое посещение. Абонементы
 *  (monthly, annual, class_*) сюда не входят — иначе «цена входа» превращается
 *  в стоимость годового членства. */
const SINGLE_ADULT_KEYS = [
  'price.adult_single',
  'price.adult_fullday',
  'price.adult_weekday',
  'price.adult_weekend',
]

const CURRENCY: Record<string, string> = { ru: 'сум', uz: "so'm", en: 'UZS' }
const OTHER_PLACES: Record<string, string> = {
  ru: 'другие населённые пункты',
  uz: 'boshqa aholi punktlari',
  en: 'other localities',
}

interface CityEntry {
  match: Record<string, string>
  name: Record<string, string>
}

const fmt = (n: number, locale: string) =>
  `${new Intl.NumberFormat('ru-UZ').format(n)} ${CURRENCY[locale] ?? CURRENCY.ru}`

/** «Ургенч (11), Хива (4)» — список с количеством, по убыванию. */
const joinCounted = (entries: [string, number][]) =>
  entries.map(([name, n]) => `${name} (${n})`).join(', ')

/**
 * @param areaId  id региона (для {cities}) или id района. Для района список
 *                городов пуст — плейсхолдер {cities} на таких страницах
 *                не используется.
 */
export function buildAreaStats(
  pools: Pool[],
  areaId: string,
  locale: string,
  districtName: (id: string) => string,
): Record<string, string | number> {
  const count = pools.length

  const categories: Record<string, number> = {}
  for (const p of pools) {
    for (const c of poolCategories(p)) categories[c] = (categories[c] ?? 0) + 1
  }

  const service = (key: string) => pools.filter(p => p.services.includes(key)).length

  // Цены: только сумовые и только ненулевые. Ноль встречается легально —
  // например, у Malibu Sun Club вход в воду бесплатный, платят за лежак.
  const singleAdult = pools
    .flatMap(p => p.prices)
    .filter(x => SINGLE_ADULT_KEYS.includes(x.key) && x.currency !== 'USD' && x.amount > 0)
    .map(x => x.amount)
    .sort((a, b) => a - b)

  const priced = pools.filter(p =>
    p.prices.some(x => x.currency !== 'USD' && x.amount > 0),
  ).length

  // Районы — только для Ташкента, у остальных регионов district = null.
  const byDistrict = new Map<string, number>()
  for (const p of pools) {
    if (!p.district) continue
    byDistrict.set(p.district, (byDistrict.get(p.district) ?? 0) + 1)
  }
  const districtsSorted = [...byDistrict.entries()]
    .map(([id, n]) => [districtName(id), n] as [string, number])
    .sort((a, b) => b[1] - a[1])

  // Города: поиск подстроки по адресу, порядок из regionCities.json.
  const cityList = ((regionCities as Record<string, unknown>)[areaId] ?? []) as CityEntry[]
  const byCity = new Map<string, number>()
  let unmatched = 0
  for (const p of pools) {
    const hit = cityList.find(c => p.address.includes(c.match[locale] ?? c.match.ru))
    if (!hit) { unmatched++; continue }
    const name = hit.name[locale] ?? hit.name.ru
    byCity.set(name, (byCity.get(name) ?? 0) + 1)
  }
  const citiesSorted = [...byCity.entries()].sort((a, b) => b[1] - a[1])
  if (unmatched > 0) {
    citiesSorted.push([OTHER_PLACES[locale] ?? OTHER_PLACES.ru, unmatched])
  }

  return {
    count,
    yearRound: pools.filter(p => p.season === 'year-round').length,
    summer: pools.filter(p => p.season === 'summer').length,

    open: categories.open ?? 0,
    indoor: categories.indoor ?? 0,
    children: categories.children ?? 0,
    sport: categories.sport ?? 0,
    hotel: categories.hotel ?? 0,
    aquapark: categories.aquapark ?? 0,

    parking: service('parking'),
    cafe: service('cafe'),
    bar: service('bar'),
    childrenZone: service('children_zone'),
    trainer: service('trainer'),
    sauna: service('sauna'),
    wifi: service('wifi'),
    sunbed: service('sunbed'),
    jacuzzi: service('jacuzzi'),
    locker: service('locker'),
    restaurant: service('restaurant'),

    priced,
    priceFrom: singleAdult.length ? fmt(singleAdult[0]!, locale) : '',
    priceTo: singleAdult.length ? fmt(singleAdult[singleAdult.length - 1]!, locale) : '',
    priceMedian: singleAdult.length
      ? fmt(singleAdult[Math.floor(singleAdult.length / 2)]!, locale)
      : '',

    districts: joinCounted(districtsSorted),
    topDistrict: districtsSorted[0]?.[0] ?? '',
    cities: joinCounted(citiesSorted),
    topCity: citiesSorted[0]?.[0] ?? '',
  }
}

/** Подставляет {ключи} из stats. Неизвестный плейсхолдер оставляем как есть —
 *  так опечатка в тексте видна сразу, а не превращается в пустое место. */
export function interpolate(
  text: string,
  stats: Record<string, string | number>,
): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in stats ? String(stats[key]) : whole,
  )
}
