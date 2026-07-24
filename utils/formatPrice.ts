export const formatPrice = (amount: number, currency: 'UZS' | 'USD' = 'UZS'): string =>
  currency === 'USD'
    ? '$' + new Intl.NumberFormat('ru-UZ').format(amount)
    : new Intl.NumberFormat('ru-UZ').format(amount) + ' сум'

// Only UZS prices participate in the "from" price used for sorting, filtering,
// cards and SEO — a niche USD row (e.g. a 100$ group rental) must not become
// the displayed minimum.
export const minPrice = (prices: { amount: number; currency?: 'UZS' | 'USD' }[]): number => {
  const uzs = prices.filter(p => p.currency !== 'USD')
  return uzs.length ? Math.min(...uzs.map(p => p.amount)) : 0
}
