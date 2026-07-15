#!/usr/bin/env node
// Watermarks pool photos in public/images/pools with two "basen.uz" marks.
// Idempotent: tracks the content hash of each already-watermarked file in
// scripts/.watermarked.json, so replacing a file with a new photo under the
// same name is correctly re-watermarked instead of being skipped.
import { readdirSync, statSync, readFileSync, writeFileSync, renameSync, unlinkSync } from 'node:fs'
import { join, extname } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const ROOT = join(process.cwd(), 'public/images/pools')
const MANIFEST_PATH = join(process.cwd(), 'scripts/.watermarked.json')
const TEXT = 'basen.uz'

function loadManifest() {
  try {
    const raw = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    // Migrate from the old array-of-paths format if present.
    if (Array.isArray(raw)) return {}
    return raw
  } catch {
    return {}
  }
}

const manifest = loadManifest()

function hashOf(buffer) {
  return createHash('sha1').update(buffer).digest('hex')
}

// Two marks on the main diagonal (top-left area + bottom-right area) instead
// of a full tiled pattern — much less visually noisy, while still surviving
// moderate crops to other aspect ratios (hero 16:7, cards 4:3, thumbnails).
function svgWatermark(width, height) {
  const fontSize = Math.max(16, Math.round(Math.min(width, height) / 9))
  const strokeWidth = Math.max(1, Math.round(fontSize / 12))

  const positions = [
    { x: width * 0.28, y: height * 0.32 },
    { x: width * 0.72, y: height * 0.68 },
  ]
  const texts = positions
    .map(({ x, y }) => `<text x="${x}" y="${y}" text-anchor="middle" transform="rotate(-28 ${x} ${y})">${TEXT}</text>`)
    .join('\n        ')

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <g
        font-family="Arial, Helvetica, sans-serif"
        font-weight="700"
        font-size="${fontSize}"
        fill="rgba(255,255,255,0.35)"
        stroke="rgba(0,0,0,0.18)"
        stroke-width="${strokeWidth}"
        paint-order="stroke fill"
      >
        ${texts}
      </g>
    </svg>
  `)
}

async function watermarkFile(filePath, inputBuffer) {
  const ext = extname(filePath).toLowerCase()
  const img = sharp(inputBuffer)
  const meta = await img.metadata()
  const overlay = svgWatermark(meta.width, meta.height)
  const tmpPath = filePath + '.tmp'

  let pipeline = img.composite([{ input: overlay, top: 0, left: 0 }])
  if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: 90 })
  else if (ext === '.webp') pipeline = pipeline.webp({ quality: 90 })
  else if (ext === '.png') pipeline = pipeline.png()

  const outputBuffer = await pipeline.toBuffer()
  writeFileSync(tmpPath, outputBuffer)
  try {
    unlinkSync(filePath)
  } catch {}
  renameSync(tmpPath, filePath)
  return outputBuffer
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
      const filePath = join(dirPath, file)
      const currentBuffer = readFileSync(filePath)
      const currentHash = hashOf(currentBuffer)

      if (manifest[rel] === currentHash) {
        skipped++
        continue
      }

      const outputBuffer = await watermarkFile(filePath, currentBuffer)
      manifest[rel] = hashOf(outputBuffer)
      processed++
      console.log('watermarked:', rel)
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. Watermarked ${processed}, skipped ${skipped} (already done).`)
}

main()
