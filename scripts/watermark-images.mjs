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

function svgWatermark(width, height) {
  const fontSize = Math.max(16, Math.round(width / 20))
  const strokeWidth = Math.max(2, Math.round(fontSize / 9))
  const paddingX = Math.round(fontSize * 0.9)
  const paddingY = Math.round(fontSize * 1.3)
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${width - paddingX}" y="${paddingY}"
        text-anchor="end"
        font-family="Arial, Helvetica, sans-serif"
        font-weight="700"
        font-size="${fontSize}"
        fill="rgba(255,255,255,0.9)"
        stroke="rgba(0,0,0,0.45)"
        stroke-width="${strokeWidth}"
        paint-order="stroke fill"
      >${TEXT}</text>
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
