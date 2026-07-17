import type { Pool, ScheduleDay } from '~/types/pool'
import districtData from '~/data/districts.json'

const BASE_URL = 'https://basen.uz'

function getDistrictName(districtId: string | null, locale: string): string {
  if (!districtId) return 'Ташкент'
  const entry = (districtData as { id: string; translations: Record<string, string> }[])
    .find(d => d.id === districtId)
  return entry?.translations[locale] ?? districtId
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
  const { locale } = useI18n()
  const price = minPrice(pool.prices)
  const priceClause = price > 0 ? `Цены от ${formatPrice(price)}, абонементы` : 'Абонементы'
  const districtName = getDistrictName(pool.district, locale.value)

  useSeoMeta({
    title: `${pool.name} — цены 2026, расписание, отзывы | Basen.uz`,
    description: `Бассейн ${pool.name} в ${districtName}, Ташкент. ${priceClause}, расписание и фото. Адрес, телефон и отзывы.`,
    ogTitle: `${pool.name} — бассейн в Ташкенте | Basen.uz`,
    ogDescription: `${pool.name}, ${districtName}, Ташкент. ${priceClause}, расписание.`,
    ogImage: pool.gallery[0] ? `${BASE_URL}${pool.gallery[0]}` : `${BASE_URL}/og/default.jpg`,
    ogType: 'website',
    ogUrl: `${BASE_URL}/catalog/${pool.slug}`,
    ogSiteName: 'Basen.uz',
    twitterCard: 'summary_large_image',
    twitterTitle: `${pool.name} | Basen.uz`,
    twitterDescription: price > 0
      ? `${pool.name} в Ташкенте. Цены от ${formatPrice(price)}.`
      : `${pool.name} в Ташкенте.`,
    twitterImage: pool.gallery[0] ? `${BASE_URL}${pool.gallery[0]}` : `${BASE_URL}/og/default.jpg`,
  })

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: pool.name,
    description: pool.description,
    url: `${BASE_URL}/catalog/${pool.slug}`,
    ...(pool.phone.length > 0 && { telephone: pool.phone }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: pool.address,
      addressLocality: 'Ташкент',
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
      { '@type': 'ListItem', position: 1, name: 'Главная', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${BASE_URL}/catalog` },
      { '@type': 'ListItem', position: 3, name: pool.name, item: `${BASE_URL}/catalog/${pool.slug}` },
    ],
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pool.name,
    url: `${BASE_URL}/catalog/${pool.slug}`,
    primaryImageOfPage: pool.gallery[0] ? `${BASE_URL}${pool.gallery[0]}` : `${BASE_URL}/og/default.jpg`,
    dateModified: pool.createdAt,
    inLanguage: locale.value,
  }

  useHead({
    link: [{ rel: 'canonical', href: `${BASE_URL}/catalog/${pool.slug}` }],
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
    useHead({
      link: [{ rel: 'canonical', href: `${BASE_URL}${opts.canonical}` }],
    })
  }
}
