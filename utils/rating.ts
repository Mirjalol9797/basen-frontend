export const avgRating = (p: { ratingGoogle: number; ratingYandex: number }): number =>
  Math.round(((p.ratingGoogle + p.ratingYandex) / 2) * 100) / 100
