// Обновляет координаты для бассейнов, найденных через 2GIS / Yandex / Nominatim
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const poolsPath = join(__dir, '../data/pools.json')
const pools = JSON.parse(readFileSync(poolsPath, 'utf8'))

const coords = {
  // 2GIS точные
  'malibu-sun-club':   { lat: 41.226843,  lng: 69.369055 },
  'atlantis':          { lat: 41.216388,  lng: 69.219441 },
  'monaco':            { lat: 41.333063,  lng: 69.374933 },
  'dos-hermanas':      { lat: 41.191654,  lng: 69.235156 },
  'le-grand-de-plaza': { lat: 41.310654,  lng: 69.286218 },
  // Yandex точные
  'oasis-aqua-park':   { lat: 41.290002,  lng: 69.218862 },
  'solnechniy-gorod':  { lat: 41.202458,  lng: 69.225344 },
  // Nominatim точные
  'astera-sea':        { lat: 41.217054,  lng: 69.213544 },
  'tao-yuan':          { lat: 41.307026,  lng: 69.308973 },
  'paradise':          { lat: 41.288519,  lng: 69.346927 },
  'aladdin':           { lat: 41.092261,  lng: 69.057497 },
  'azizbek-city-pool': { lat: 41.283076,  lng: 69.165959 },
  'dvorec-vodnogo-sporta': { lat: 41.347526, lng: 69.284958 },
  'mojito-povalazza':  { lat: 41.331150,  lng: 69.410130 },
  'zerom':             { lat: 41.496460,  lng: 69.617008 },
  // Nominatim приближённые (до района/города)
  'riviera':           { lat: 41.387348,  lng: 69.464458 },
  'aqua-blue':         { lat: 41.312896,  lng: 69.532460 },
  'sitora':            { lat: 41.201715,  lng: 69.162010 },
  'basseyin-tridex':   { lat: 41.201715,  lng: 69.168000 },
  // Одно поселение Ийк-Ота (три объекта)
  'three-palms':       { lat: 41.226843,  lng: 69.369055 },
  'edem-chimgan':      { lat: 41.227200,  lng: 69.370000 },
  'aleks':             { lat: 41.226400,  lng: 69.368500 },
}

let updated = 0
for (const pool of pools) {
  if (coords[pool.slug]) {
    pool.coordinates = coords[pool.slug]
    updated++
    console.log(`✓ ${pool.slug}`)
  }
}

writeFileSync(poolsPath, JSON.stringify(pools, null, 2), 'utf8')
console.log(`\nОбновлено: ${updated} бассейнов`)

// Итог
const noCoords = pools.filter(p => !p.coordinates?.lat)
console.log(`Осталось без координат: ${noCoords.length}`)
noCoords.forEach(p => console.log(' -', p.slug))
