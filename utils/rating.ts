export const avgRating = (p: { ratingGoogle: number; ratingYandex: number }): number =>
  (p.ratingGoogle + p.ratingYandex) / 2
