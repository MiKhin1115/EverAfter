import fs from 'fs'
import path from 'path'
import https from 'https'

const root = process.cwd()
const publicRoot = path.join(root, 'public', 'images')
for (const dir of ['vendors', 'packages', 'gallery', 'ads']) {
  fs.mkdirSync(path.join(publicRoot, dir), { recursive: true })
}

const photo = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

const catalogs = {
  'bridal-beauty': {
    vendors: [photo(29352010), photo(29352013), photo(17540422), photo(30452733)],
    packages: [photo(29352010), photo(29352013), photo(17540422), photo(30452733)],
  },
  venue: {
    vendors: [photo(32593148), photo(24023407), photo(32368423), photo(16120230)],
    packages: [photo(32593148), photo(24023407), photo(32368423), photo(16120230)],
  },
  photography: {
    vendors: [photo(33554221), photo(19263431), photo(19263431)],
    packages: [photo(33554221), photo(19263431), photo(19263431)],
  },
  'decoration-floral': {
    vendors: [photo(33104579), photo(16120196), photo(34008845), photo(35279301)],
    packages: [photo(33104579), photo(16120196), photo(34008845), photo(35279301)],
  },
  honeymoon: {
    vendors: [photo(33836956), photo(5007465), photo(4538217), photo(3969611)],
    packages: [photo(33836956), photo(5007465), photo(4538217), photo(3969611)],
  },
  'catering-cake': {
    vendors: [photo(16120147), photo(14457533), photo(34596956), photo(17001817)],
    packages: [photo(16120147), photo(14457533), photo(34596956), photo(17001817)],
  },
  'clothing-fashion': {
    vendors: [photo(31205749), photo(32498362), photo(30138401), photo(34034504)],
    packages: [photo(31205749), photo(32498362), photo(30138401), photo(34034504)],
  },
  'entertainment-hosting': {
    vendors: [photo(8063149), photo(15865408)],
    packages: [photo(8063149), photo(15865408)],
  },
  'health-fitness': {
    vendors: [photo(30697233), photo(13899861), photo(5659008), photo(7222166)],
    packages: [photo(30697233), photo(13899861), photo(5659008), photo(7222166)],
  },
  invitations: {
    vendors: [photo(28948610), photo(29821867)],
    packages: [photo(28948610), photo(29821867)],
  },
  jewelry: {
    vendors: [photo(31728371), photo(31728281)],
    packages: [photo(31728371), photo(31728281)],
  },
  transportation: {
    vendors: [photo(35211711), photo(35211711)],
    packages: [photo(35211711), photo(35211711)],
  },
}

const galleryPhotos = [photo(33554221), photo(32593148), photo(33104579), photo(4538217), photo(16120147), photo(28948610)]
const adPhotos = [photo(32593148), photo(29352010), photo(33554221), photo(33836956), photo(16120147)]

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

async function fetchWithFallback(url, destination, fallbackUrl) {
  try {
    await download(url, destination)
  } catch (error) {
    console.log(`fallback for ${destination}`)
    await download(fallbackUrl, destination)
  }
}

async function ensureFiles() {
  for (const [category, sets] of Object.entries(catalogs)) {
    for (const [kind, urls] of Object.entries(sets)) {
      for (let index = 0; index < urls.length; index += 1) {
        const destination = path.join(publicRoot, kind, `${category}-${String(index + 1).padStart(2, '0')}.jpg`)
        if (!fs.existsSync(destination)) {
          console.log(`downloading ${destination}`)
          await fetchWithFallback(urls[index], destination, urls[0])
        }
      }
    }
  }

  for (let index = 0; index < galleryPhotos.length; index += 1) {
    const destination = path.join(publicRoot, 'gallery', `romantic-gallery-${String(index + 1).padStart(2, '0')}.jpg`)
    if (!fs.existsSync(destination)) {
      console.log(`downloading ${destination}`)
      await fetchWithFallback(galleryPhotos[index], destination, galleryPhotos[0])
    }
  }

  for (let index = 0; index < adPhotos.length; index += 1) {
    const destination = path.join(publicRoot, 'ads', `home-hero-${String(index + 1).padStart(2, '0')}.jpg`)
    if (!fs.existsSync(destination)) {
      console.log(`downloading ${destination}`)
      await fetchWithFallback(adPhotos[index], destination, adPhotos[0])
    }
  }

  const promoDestination = path.join(publicRoot, 'ads', 'wedding-promo.jpg')
  if (!fs.existsSync(promoDestination)) {
    await fetchWithFallback(photo(33104579), promoDestination, adPhotos[0])
  }
}

function rotate(list) {
  let index = 0
  return () => {
    const value = list[index % list.length]
    index += 1
    return value
  }
}

function localPaths(category, folder, count) {
  return Array.from({ length: count }, (_, index) => `/images/${folder}/${category}-${String((index % catalogs[category][folder].length) + 1).padStart(2, '0')}.jpg`)
}

function rewriteShops() {
  const shopsRoot = path.join(root, 'src/data/catalog/shops')
  for (const fileName of fs.readdirSync(shopsRoot)) {
    if (fileName === 'index.ts') continue
    const category = fileName.replace(/\.ts$/, '')
    const file = path.join(shopsRoot, fileName)
    let source = fs.readFileSync(file, 'utf8')
    const nextImage = rotate(localPaths(category, 'vendors', catalogs[category].vendors.length))
    source = source.replace(/image:\s*'\/images\/[^']+'/g, () => `image: '${nextImage()}'`)
    fs.writeFileSync(file, source)
  }
}

function rewritePackages() {
  const packagesRoot = path.join(root, 'src/data/catalog/packages')
  for (const fileName of fs.readdirSync(packagesRoot)) {
    if (fileName === 'index.ts' || fileName === 'base.ts' || fileName === 'records.ts' || fileName === 'addons.ts' || fileName === 'booking-rules.ts' || fileName === 'extra-sections.ts' || fileName === 'includes.ts' || fileName === 'policies.ts' || fileName === 'product-details.ts' || fileName === 'reviews.ts' || fileName === 'service-details.ts' || fileName === 'travel-details.ts') continue
    const category = fileName.replace(/\.ts$/, '')
    const file = path.join(packagesRoot, fileName)
    let source = fs.readFileSync(file, 'utf8')
    const packagePool = localPaths(category, 'packages', Math.max(catalogs[category].packages.length, 1))
    const nextImage = rotate(packagePool)
    source = source.replace(/'\/images\/[^']+\.(?:svg|jpg|jpeg|png|webp)'/g, () => `'${nextImage()}'`)
    fs.writeFileSync(file, source)
  }
}

function rewriteApp() {
  const file = path.join(root, 'src/App.tsx')
  let source = fs.readFileSync(file, 'utf8')
  const adPool = Array.from({ length: adPhotos.length }, (_, index) => `/images/ads/home-hero-${String(index + 1).padStart(2, '0')}.jpg`)
  const nextAd = rotate(adPool)
  source = source.replace(/'\/images\/ads\/home-hero-\d+\.(?:svg|jpg)'/g, () => `'${nextAd()}'`)
  fs.writeFileSync(file, source)
}

function rewriteMock() {
  const file = path.join(root, 'src/data/mock.ts')
  if (!fs.existsSync(file)) return
  let source = fs.readFileSync(file, 'utf8')
  const galleryPool = Array.from({ length: galleryPhotos.length }, (_, index) => `/images/gallery/romantic-gallery-${String(index + 1).padStart(2, '0')}.jpg`)
  const nextGallery = rotate(galleryPool)
  source = source.replace(/'\/images\/[^']+\.(?:svg|jpg|jpeg|png|webp)'/g, () => `'${nextGallery()}'`)
  fs.writeFileSync(file, source)
}

function rewriteVendorDetailFallbacks() {
  const file = path.join(root, 'src/views/VendorDetailView.tsx')
  let source = fs.readFileSync(file, 'utf8')
  source = source
    .replace(/\/images\/gallery\/romantic-gallery-01\.svg/g, '/images/gallery/romantic-gallery-01.jpg')
    .replace(/\/images\/gallery\/romantic-gallery-02\.svg/g, '/images/gallery/romantic-gallery-02.jpg')
    .replace(/\/images\/gallery\/romantic-gallery-03\.svg/g, '/images/gallery/romantic-gallery-03.jpg')
  fs.writeFileSync(file, source)
}

await ensureFiles()
rewriteShops()
rewritePackages()
rewriteApp()
rewriteMock()
rewriteVendorDetailFallbacks()
console.log('realistic image pass complete')
