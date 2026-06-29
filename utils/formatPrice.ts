export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('ru-UZ').format(amount) + ' сум'

export const minPrice = (prices: { amount: number }[]): number =>
  prices.length ? Math.min(...prices.map(p => p.amount)) : 0
