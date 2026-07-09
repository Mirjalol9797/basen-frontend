#!/usr/bin/env node
// Generates public/og/default.jpg — the site-wide fallback Open Graph image.
// Rasterized from SVG because Facebook/Telegram/Twitter/WhatsApp link
// previews don't reliably render SVG for og:image; a real JPG is required.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT_DIR = join(process.cwd(), 'public/og')
const OUT_PATH = join(OUT_DIR, 'default.jpg')

const WIDTH = 1200
const HEIGHT = 630

const wavePath = 'M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zm0-4c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1v2c-1.5 0-2.5-1-4-1s-2.5 1-4 1-2.5-1-4-1-2.5 1-4 1v-2zM12 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-5 5l3 3h-2v3h4v-3h-2l3-3'

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0891B2"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- decorative wave bands -->
  <path d="M0 520 C 200 480, 400 560, 1200 500 L 1200 630 L 0 630 Z" fill="rgba(255,255,255,0.06)"/>
  <path d="M0 560 C 250 610, 450 530, 1200 580 L 1200 630 L 0 630 Z" fill="rgba(255,255,255,0.08)"/>

  <!-- icon badge -->
  <rect x="100" y="215" width="200" height="200" rx="44" fill="white"/>
  <g transform="translate(148, 263) scale(4.35)">
    <path fill="#0284C7" d="${wavePath}"/>
  </g>

  <!-- wordmark -->
  <text x="340" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="92" fill="white">Basen.uz</text>

  <!-- tagline -->
  <text x="342" y="360" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="38" fill="rgba(255,255,255,0.92)">Бассейны Ташкента и Узбекистана</text>

  <!-- feature row -->
  <text x="342" y="405" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="28" fill="rgba(255,255,255,0.75)">Цены · Адреса · Фото · Расписание</text>
</svg>
`

mkdirSync(OUT_DIR, { recursive: true })

const buffer = await sharp(Buffer.from(svg))
  .jpeg({ quality: 92 })
  .toBuffer()

writeFileSync(OUT_PATH, buffer)
console.log('Generated', OUT_PATH, `(${buffer.length} bytes)`)
