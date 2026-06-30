// Геокодирует бассейны без coordinates через Nominatim (OpenStreetMap)
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const poolsPath = join(__dir, '../data/pools.json')

const pools = JSON.parse(readFileSync(poolsPath, 'utf8'))

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&accept-language=ru`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Basen.uz pool catalog geocoder/1.0' }
  })
  const data = await res.json()
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
  }
  return null
}

let updated = 0
let failed = []

for (const pool of pools) {
  if (pool.coordinates?.lat !== null && pool.coordinates?.lng !== null) continue

  const address = pool.translations.ru.address
  process.stdout.write(`[${pool.slug}] ${address} ... `)

  try {
    // Попытка 1: точный адрес
    let coords = await geocode(address)
    await sleep(1100)

    // Попытка 2: упрощённый адрес (убираем номер дома, квартал, ориентиры)
    if (!coords) {
      // Берём только улицу + город/район
      const simplified = address
        .replace(/,\s*\d+[а-яА-ЯёЁ\/]*/g, '')  // убираем номера домов
        .replace(/\s+\d+-й\s+/g, ' ')            // убираем "7-й квартал" вид
        .replace(/\s+квартал.*?,/, ',')
        .replace(/\s+посёлок\s+/i, ' ')
        .trim()
      console.log(`\n  retry: ${simplified}`)
      coords = await geocode(simplified)
      await sleep(1100)
    }

    if (coords) {
      pool.coordinates = coords
      updated++
      console.log(`✓ ${coords.lat}, ${coords.lng}`)
    } else {
      failed.push({ slug: pool.slug, address })
      console.log(`✗ не найдено`)
    }
  } catch (e) {
    failed.push({ slug: pool.slug, address })
    console.log(`✗ ошибка: ${e.message}`)
    await sleep(1100)
  }
}

writeFileSync(poolsPath, JSON.stringify(pools, null, 2), 'utf8')
console.log(`\n✅ Обновлено: ${updated}`)
if (failed.length) {
  console.log(`❌ Не нашлось (${failed.length}):`)
  failed.forEach(f => console.log(`  ${f.slug}: ${f.address}`))
}
