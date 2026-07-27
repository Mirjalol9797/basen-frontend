/**
 * Русская форма существительного по числу: 1 объект, 2 объекта, 5 объектов.
 * Нужна там, где число подставляется из данных и заранее неизвестно.
 */
export const pluralRu = (
  n: number,
  forms: [one: string, few: string, many: string]
): string => {
  const rest100 = Math.abs(n) % 100
  const rest10 = rest100 % 10
  if (rest100 > 10 && rest100 < 20) return forms[2]
  if (rest10 > 1 && rest10 < 5) return forms[1]
  if (rest10 === 1) return forms[0]
  return forms[2]
}

/** Слово «объект» в нужной форме для текущего языка. */
export const objectsWord = (n: number, locale: string): string => {
  if (locale === 'uz') return 'obyekt'
  if (locale === 'en') return n === 1 ? 'venue' : 'venues'
  return pluralRu(n, ['объект', 'объекта', 'объектов'])
}

/** Слово «бассейн» в нужной форме для текущего языка. */
export const poolsWord = (n: number, locale: string): string => {
  if (locale === 'uz') return 'basseyn'
  if (locale === 'en') return n === 1 ? 'pool' : 'pools'
  return pluralRu(n, ['бассейн', 'бассейна', 'бассейнов'])
}
