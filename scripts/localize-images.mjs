import fs from 'fs'
import path from 'path'

const root = process.cwd()

const files = [
  'src/App.tsx',
  'src/data/mock.ts',
  ...fs.readdirSync(path.join(root, 'src/data/catalog/shops')).map((name) => `src/data/catalog/shops/${name}`),
  ...fs.readdirSync(path.join(root, 'src/data/catalog/packages')).map((name) => `src/data/catalog/packages/${name}`),
]

const palettes = [
  ['#0D5CAB', '#1A73D9', '#CFE3FA'],
  ['#7C3AED', '#A855F7', '#E9D5FF'],
  ['#D97706', '#F59E0B', '#FDE68A'],
  ['#047857', '#10B981', '#A7F3D0'],
  ['#BE185D', '#EC4899', '#FBCFE8'],
  ['#334155', '#64748B', '#CBD5E1'],
]

function titleize(value) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function makeSvg({ title, subtitle, accentIndex }) {
  const [start, end, soft] = palettes[accentIndex % palettes.length]
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${start}"/>
      <stop offset="100%" stop-color="${end}"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.46)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.1)"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1200" fill="url(#bg)"/>
  <circle cx="1260" cy="250" r="250" fill="${soft}" opacity="0.34"/>
  <circle cx="320" cy="970" r="300" fill="#ffffff" opacity="0.12"/>
  <path d="M0 900C240 820 386 738 610 772C887 815 1037 1044 1600 886V1200H0V900Z" fill="#ffffff" opacity="0.15"/>
  <rect x="112" y="130" width="1376" height="940" rx="42" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)"/>
  <rect x="186" y="214" width="1228" height="772" rx="34" fill="rgba(15,23,42,0.14)" stroke="rgba(255,255,255,0.16)"/>
  <rect x="236" y="264" width="1130" height="674" rx="28" fill="url(#glass)" stroke="rgba(255,255,255,0.25)"/>
  <text x="270" y="760" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="88" font-weight="700">${title}</text>
  <text x="270" y="838" fill="rgba(255,255,255,0.88)" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="500">${subtitle}</text>
</svg>`.trim()
}

function latestRecordId(prefix) {
  const matches = [...prefix.matchAll(/id:\s*'([^']+)'/g)]
  return matches.at(-1)?.[1] ?? null
}

function folderFor(file) {
  if (file === 'src/App.tsx') return 'ads'
  if (file.includes('/shops/')) return 'vendors'
  if (file.includes('/packages/')) return 'packages'
  return 'gallery'
}

function labelFor(file, recordId, count) {
  if (file === 'src/App.tsx') return {
    title: ['Elegant Wedding Moments', 'Curated Wedding Packages', 'Polished Vendor Network', 'Celebration Inspiration', 'Signature Wedding Details'][count - 1] ?? 'Wedding Inspiration',
    subtitle: 'Offline-ready image asset',
  }
  const base = file.split('/').at(-1)?.replace(/\.ts$/, '').replace(/\.tsx$/, '') ?? 'gallery'
  const theme = titleize(base)
  return {
    title: titleize(recordId ?? `${base}-${count}`),
    subtitle: `${theme} collection`,
  }
}

for (const file of files) {
  const abs = path.join(root, file)
  let source = fs.readFileSync(abs, 'utf8')
  let changed = false
  let occurrence = 0
  const perRecord = new Map()

  source = source.replace(/https:\/\/images\.unsplash\.com\/photo-[^'"\]\s)]+/g, (url, offset) => {
    changed = true
    occurrence += 1
    const prefix = source.slice(0, offset)
    const recordId = latestRecordId(prefix) ?? `asset-${occurrence}`
    const count = (perRecord.get(recordId) ?? 0) + 1
    perRecord.set(recordId, count)

    const folder = folderFor(file)
    const fileName = file === 'src/App.tsx'
      ? `home-hero-${String(count).padStart(2, '0')}.svg`
      : `${recordId}${count > 1 ? `-${String(count).padStart(2, '0')}` : ''}.svg`

    const relPath = `/images/${folder}/${fileName}`
    const outputPath = path.join(root, 'public', 'images', folder, fileName)
    const { title, subtitle } = labelFor(file, recordId, count)
    if (!fs.existsSync(outputPath)) {
      fs.writeFileSync(outputPath, makeSvg({ title, subtitle, accentIndex: occurrence + count }))
    }
    return relPath
  })

  if (changed) {
    fs.writeFileSync(abs, source)
    console.log(`updated ${file}`)
  }
}

const extras = [
  ['public/images/gallery/romantic-gallery-01.svg', 'Romantic Details', 'Vendor gallery fallback', 0],
  ['public/images/gallery/romantic-gallery-02.svg', 'Celebration Moments', 'Vendor gallery fallback', 1],
  ['public/images/gallery/romantic-gallery-03.svg', 'Signature Styling', 'Vendor gallery fallback', 2],
  ['public/images/ads/wedding-promo.svg', 'Wedding Promo', 'Seasonal campaign asset', 3],
]

for (const [file, title, subtitle, accentIndex] of extras) {
  const abs = path.join(root, file)
  if (!fs.existsSync(abs)) {
    fs.writeFileSync(abs, makeSvg({ title, subtitle, accentIndex }))
  }
}
