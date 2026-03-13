import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import https from 'https'

const root = process.cwd()
const files = [
  'src/App.tsx',
  'src/data/mock.ts',
  ...fs.readdirSync(path.join(root, 'src/data/catalog/shops')).map((name) => `src/data/catalog/shops/${name}`),
  ...fs.readdirSync(path.join(root, 'src/data/catalog/packages')).map((name) => `src/data/catalog/packages/${name}`),
]

const assetRoot = path.join(root, 'public', 'images')
for (const dir of ['vendors', 'packages', 'gallery', 'ads']) {
  fs.mkdirSync(path.join(assetRoot, dir), { recursive: true })
}

const urlToPath = new Map()

function gitHead(file) {
  return execSync(`git show HEAD:${file}`, { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 })
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

async function download(url, destination) {
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination)
    const request = https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close()
        fs.rmSync(destination, { force: true })
        download(response.headers.location, destination).then(resolve).catch(reject)
        return
      }
      if (response.statusCode !== 200) {
        file.close()
        fs.rmSync(destination, { force: true })
        reject(new Error(`Failed ${url}: ${response.statusCode}`))
        return
      }
      response.pipe(file)
      file.on('finish', () => file.close(resolve))
    })
    request.on('error', (error) => {
      file.close()
      fs.rmSync(destination, { force: true })
      reject(error)
    })
  })
}

for (const file of files) {
  const head = gitHead(file)
  let occurrence = 0
  const perRecord = new Map()

  for (const match of head.matchAll(/https:\/\/images\.unsplash\.com\/photo-[^'"\]\s)]+/g)) {
    const url = match[0]
    if (urlToPath.has(url)) continue

    occurrence += 1
    const prefix = head.slice(0, match.index)
    const recordId = latestRecordId(prefix) ?? `asset-${occurrence}`
    const count = (perRecord.get(recordId) ?? 0) + 1
    perRecord.set(recordId, count)

    const folder = folderFor(file)
    const fileName = file === 'src/App.tsx'
      ? `home-hero-${String(urlToPath.size + 1).padStart(2, '0')}.jpg`
      : `${recordId}${count > 1 ? `-${String(count).padStart(2, '0')}` : ''}.jpg`

    urlToPath.set(url, `/images/${folder}/${fileName}`)
  }
}

for (const [url, relPath] of urlToPath.entries()) {
  const destination = path.join(root, 'public', relPath.replace(/^\//, ''))
  if (!fs.existsSync(destination)) {
    console.log(`downloading ${relPath}`)
    await download(url, destination)
  }
}

for (const file of files) {
  const head = gitHead(file)
  const localized = head.replace(/https:\/\/images\.unsplash\.com\/photo-[^'"\]\s)]+/g, (url) => urlToPath.get(url) ?? url)
  fs.writeFileSync(path.join(root, file), localized)
  console.log(`updated ${file}`)
}
