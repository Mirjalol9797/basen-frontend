// Скачивает фото бассейнов с pools.uz в public/images/pools/{slug}/
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const poolsPath = join(__dir, '../data/pools.json')
const pools = JSON.parse(readFileSync(poolsPath, 'utf8'))

const sleep = ms => new Promise(r => setTimeout(r, ms))

const catMap = {
  open: 'outdoor-pools',
  aquapark: 'water-parks',
  indoor: 'indoor-swimming-pool',
  sport: 'sports-pools',
  children: 'childrens-pools',
  hotel: 'swimming-pool-at-hotel',
}

// Извлекает средние изображения пула (listings/m/{id}.jpg) из HTML страницы
function extractImages(html, maxCount) {
  const matches = [...html.matchAll(/listings\/m\/(\d+)\.jpg/g)]
  const seen = new Set()
  const ids = []
  for (const m of matches) {
    if (!seen.has(m[1])) { seen.add(m[1]); ids.push(m[1]) }
    if (ids.length >= maxCount) break
  }
  return ids.map(id => `https://pools.uz/components/com_mtree/img/listings/m/${id}.jpg`)
}

async function downloadImage(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(destPath, buf)
  return buf.length
}

let totalDownloaded = 0
let totalFailed = []

for (const pool of pools) {
  if (!pool.gallery || pool.gallery.length === 0) continue

  const catSlug = catMap[pool.category]
  const pageUrl = `https://pools.uz/catalog/${catSlug}/${pool.slug}`
  const destDir = join(__dir, '../public/images/pools', pool.slug)

  // Пропускаем если уже есть файлы
  const firstImg = join(destDir, '1.jpg')
  if (existsSync(firstImg)) {
    console.log(`[skip] ${pool.slug} — уже скачано`)
    continue
  }

  process.stdout.write(`[${pool.slug}] Загружаем страницу... `)

  let imageUrls = []
  try {
    const res = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Basen.uz bot)' }
    })
    const html = await res.text()
    imageUrls = extractImages(html, pool.gallery.length)
    await sleep(800)
  } catch (e) {
    console.log(`✗ страница (${e.message})`)
    await sleep(1000)
    continue
  }

  if (imageUrls.length === 0) {
    console.log(`✗ изображений не найдено`)
    continue
  }

  console.log(`${imageUrls.length} фото`)
  mkdirSync(destDir, { recursive: true })

  for (let i = 0; i < imageUrls.length; i++) {
    const destFile = join(destDir, `${i + 1}.jpg`)
    try {
      const bytes = await downloadImage(imageUrls[i], destFile)
      process.stdout.write(`  ${i + 1}.jpg (${Math.round(bytes/1024)}kb) ✓\n`)
      totalDownloaded++
    } catch (e) {
      process.stdout.write(`  ${i + 1}.jpg ✗ ${e.message}\n`)
      totalFailed.push(`${pool.slug}/${i+1}`)
    }
    await sleep(300)
  }
}

console.log(`\n✅ Скачано: ${totalDownloaded} файлов`)
if (totalFailed.length) {
  console.log(`❌ Ошибки (${totalFailed.length}):`, totalFailed.join(', '))
}
