#!/usr/bin/env node
// Watermarks pool photos in public/images/pools with "basen.uz" (top-right).
// Idempotent: tracks already-processed files in scripts/.watermarked.json.
import { readdirSync, statSync, readFileSync, writeFileSync, renameSync, unlinkSync } from 'node:fs'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOT = join(process.cwd(), 'public/images/pools')
const MANIFEST_PATH = join(process.cwd(), 'scripts/.watermarked.json')
const TEXT = 'basen.uz'

const manifest = new Set(
  (() => {
    try {
      return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    } catch {
      return []
    }
  })()
)

// Tiled diagonal pattern so the mark survives being cropped to any
// aspect ratio (hero 16:7, cards 4:3, thumbnails ~1.43, etc.) — a single
// corner mark gets cut off when a near-square source is center-cropped
// to a wide banner.
function svgWatermark(width, height) {
  const fontSize = Math.max(14, Math.round(Math.min(width, height) / 13))
  const strokeWidth = Math.max(1, Math.round(fontSize / 12))
  const stepX = fontSize * 7
  const stepY = fontSize * 5

  const diagonal = Math.ceil(Math.sqrt(width * width + height * height))
  const texts = []
  let row = 0
  for (let y = 0; y < diagonal + stepY; y += stepY) {
    const offsetX = row % 2 === 0 ? 0 : stepX / 2
    for (let x = 0; x < diagonal + stepX; x += stepX) {
      texts.push(
        `<text x="${x + offsetX}" y="${y}" text-anchor="middle">${TEXT}</text>`
      )
    }
    row++
  }

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <g
        font-family="Arial, Helvetica, sans-serif"
        font-weight="700"
        font-size="${fontSize}"
        fill="rgba(255,255,255,0.32)"
        stroke="rgba(0,0,0,0.18)"
        stroke-width="${strokeWidth}"
        paint-order="stroke fill"
        transform="translate(${width / 2}, ${height / 2}) rotate(-28) translate(${-diagonal / 2}, ${-diagonal / 2})"
      >
        ${texts.join('\n        ')}
      </g>
    </svg>
  `)
}

async function watermarkFile(filePath) {
  const ext = extname(filePath).toLowerCase()
  const inputBuffer = readFileSync(filePath)
  const img = sharp(inputBuffer)
  const meta = await img.metadata()
  const overlay = svgWatermark(meta.width, meta.height)
  const tmpPath = filePath + '.tmp'

  let pipeline = img.composite([{ input: overlay, top: 0, left: 0 }])
  if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: 90 })
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: 90 })
  else if (ext === '.png') pipeline = pipeline.png()

  await pipeline.toFile(tmpPath)
  try {
    unlinkSync(filePath)
  } catch {}
  renameSync(tmpPath, filePath)
}

async function main() {
  const onlySlug = process.argv[2] || null
  const poolDirs = readdirSync(ROOT).filter((d) => statSync(join(ROOT, d)).isDirectory())
  let processed = 0
  let skipped = 0

  for (const dir of poolDirs) {
    if (onlySlug && dir !== onlySlug) continue
    const dirPath = join(ROOT, dir)
    const files = readdirSync(dirPath).filter((f) =>
      ['.jpg', '.jpeg', '.webp', '.png'].includes(extname(f).toLowerCase())
    )
    for (const file of files) {
      const rel = `${dir}/${file}`
      if (manifest.has(rel)) {
        skipped++
        continue
      }
      const filePath = join(dirPath, file)
      await watermarkFile(filePath)
      manifest.add(rel)
      processed++
      console.log('watermarked:', rel)
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify([...manifest].sort(), null, 2))
  console.log(`\nDone. Watermarked ${processed}, skipped ${skipped} (already done).`)
}

main()
