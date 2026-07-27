import type { Pool, ScheduleDay } from '~/types/pool'
import districtData from '~/data/districts.json'
import regionData from '~/data/regions.json'

const BASE_URL = 'https://basen.uz'

interface TranslatedEntry { id: string; translations: Record<string, string> }

const OG_LOCALE: Record<string, string> = { ru: 'ru_RU', uz: 'uz_UZ', en: 'en_US' }

function getDistrictName(districtId: string | null, locale: string): string | null {
  if (!districtId) return null
  const entry = (districtData as TranslatedEntry[]).find(d => d.id === districtId)
  return entry?.translations[locale] ?? null
}

// "Ташкент (город)" -> "Ташкент": уточнение в скобках нужно в списке регионов,
// но не в заголовке и описании страницы.
function getRegionName(regionId: string, locale: string): string | null {
  const name = (regionData as TranslatedEntry[]).find(r => r.id === regionId)?.translations[locale]
  return name ? name.replace(/\s*\(.+\)$/, '') : null
}

// Раньше во всех мета-тегах и в schema.org был захардкожен «Ташкент», из-за чего
// бассейны в Нукусе, Ургенче и Бухаре описывались как ташкентские.
function getPlace(pool: Pool, locale: string) {
  const region = getRegionName(pool.region, locale)
  const district = getDistrictName(pool.district, locale)
  // Район имеет смысл указывать только внутри города, для областей — само название области.
  const locality = pool.region === 'tashkent-city' ? region : null
  const full = district && locality ? `${district}, ${locality}` : region ?? ''
  return { region, locality, full }
}

const DAY_MAP: Record<ScheduleDay['day'], string> = {
  mon: 'Mo', tue: 'Tu', wed: 'We', thu: 'Th', fri: 'Fr', sat: 'Sa', sun: 'Su',
}

export function buildOpeningHours(schedule: ScheduleDay[] | null): string[] {
  if (!schedule) return []
  return schedule
    .filter(d => !d.closed)
    .map(d => `${DAY_MAP[d.day]} ${d.open}-${d.close}`)
}

export const usePoolSeo = (pool: Pool) => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const localePath = useLocalePath()
  // Self-referencing canonical for the CURRENT locale (route.path already carries /uz, /en prefix).
  const canonicalUrl = `${BASE_URL}${route.path}`
  const price = minPrice(pool.prices)
  const place = getPlace(pool, locale.value)
  const image = pool.gallery[0] ? `${BASE_URL}${pool.gallery[0]}` : `${BASE_URL}/og/default.jpg`

  // Title и description берём из локали: раньше они были захардкожены по-русски,
  // поэтому /uz/catalog/x и /en/catalog/x были точными копиями русской страницы
  // и Google помечал их как дубликаты.
  const title = t('pool.meta_title', { name: pool.name })
  const description = price > 0
    ? t('pool.meta_desc', {
        name: pool.name,
        place: place.full,
        price: new Intl.NumberFormat('ru-UZ').format(price),
      })
    : t('pool.meta_desc_noprice', { name: pool.name, place: place.full })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogSiteName: 'Basen.uz',
    ogLocale: OG_LOCALE[locale.value] ?? 'ru_RU',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: pool.name,
    description: pool.description,
    url: canonicalUrl,
    ...(pool.phone.length > 0 && { telephone: pool.phone }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: pool.address,
      ...(place.locality && { addressLocality: place.locality }),
      ...(place.region && { addressRegion: place.region }),
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: pool.coordinates.lat,
      longitude: pool.coordinates.lng,
    },
    openingHours: buildOpeningHours(pool.schedule),
    image: pool.gallery.map(img => `${BASE_URL}${img}`),
    ...(price > 0 && { priceRange: `от ${new Intl.NumberFormat('ru-UZ').format(price)} сум` }),
    ...(avgRating(pool) > 0 && pool.reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating(pool),
        reviewCount: pool.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(pool.website && { sameAs: pool.website }),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${BASE_URL}${localePath('/')}` },
      { '@type': 'ListItem', position: 2, name: t('nav.catalog'), item: `${BASE_URL}${localePath('/catalog')}` },
      { '@type': 'ListItem', position: 3, name: pool.name, item: canonicalUrl },
    ],
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pool.name,
    url: canonicalUrl,
    primaryImageOfPage: image,
    dateModified: pool.createdAt,
    inLanguage: locale.value,
  }

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
      { type: 'application/ld+json', children: JSON.stringify(schema), key: 'schema-pool' },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumb), key: 'schema-breadcrumb' },
      { type: 'application/ld+json', children: JSON.stringify(webPage), key: 'schema-webpage' },
    ],
  })
}

export const usePageSeo = (opts: {
  title: string
  description: string
  image?: string
  canonical?: string
  noindex?: boolean
}) => {
  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogImage: opts.image ?? `${BASE_URL}/og/default.jpg`,
    ogSiteName: 'Basen.uz',
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    ...(opts.noindex && { robots: 'noindex,nofollow' }),
  })

  if (opts.canonical) {
    // Self-referencing canonical for the current locale — route.path keeps the /uz, /en prefix,
    // so en/uz pages are no longer treated as duplicates of the default (ru) version.
    const route = useRoute()
    useHead({
      link: [{ rel: 'canonical', href: `${BASE_URL}${route.path}` }],
    })
  }
}
