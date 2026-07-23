import type { Pool, PoolCategory } from '~/types/pool'

/**
 * Все категории бассейна. Если задано мультикатегорийное поле `categories`,
 * используется оно, иначе — единственная `category`. Так объект может
 * выходить сразу в нескольких фильтрах (напр. Открытый + Крытый + Детский).
 */
export function poolCategories(pool: Pick<Pool, 'category' | 'categories'>): PoolCategory[] {
  return pool.categories && pool.categories.length ? pool.categories : [pool.category]
}

export function poolInCategory(
  pool: Pick<Pool, 'category' | 'categories'>,
  category: PoolCategory,
): boolean {
  return poolCategories(pool).includes(category)
}
