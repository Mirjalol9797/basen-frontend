import type { Pool } from '~/types/pool'

const BASE_URL = 'https://basen.uz'

export const usePoolSeo = (pool: Pool) => {
  const price = minPrice(pool.prices)

  useSeoMeta({
    title: `${pool.name} — цены, расписание, фото | Basen.uz`,
    description: `${pool.name} в Ташкенте. Цены от ${formatPrice(price)}. Расписание, фото, адрес и контакты.`,
    ogTitle: `${pool.name} | Basen.uz`,
    ogDescription: `${pool.name} в Ташкенте. Цены от ${formatPrice(price)}.`,
    ogImage: pool.gallery[0] ? `${BASE_URL}${pool.gallery[0]}` : `${BASE_URL}/og/default.jpg`,
    ogType: 'website',
    ogSiteName: 'Basen.uz',
    twitterCard: 'summary_large_image',
  })

  useHead({
    link: [{ rel: 'canonical', href: `${BASE_URL}/catalog/${pool.slug}` }],
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
    ...(opts.noindex && { robots: 'noindex,nofollow' }),
  })

  if (opts.canonical) {
    useHead({
      link: [{ rel: 'canonical', href: `${BASE_URL}${opts.canonical}` }],
    })
  }
}
