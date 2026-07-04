declare const ymaps: any

let loadPromise: Promise<void> | null = null

export const loadYandexMaps = (apiKey: string): Promise<void> => {
  if (typeof ymaps !== 'undefined') return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
    script.async = true
    script.onload = () => ymaps.ready(resolve)
    script.onerror = () => reject(new Error('Yandex Maps failed to load'))
    document.head.appendChild(script)
  })

  return loadPromise
}
