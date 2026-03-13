import type { CanonicalCategoryId, PackageAddonRecord } from './base'
import { toCanonicalCategoryId } from './base'
import { legacyPackages } from './records'

type CategoryBand = {
  small: number[]
  medium: number[]
  premium: number[]
}

const categoryBands: Record<CanonicalCategoryId, CategoryBand> = {
  'bridal-beauty': {
    small: [15000, 20000, 25000, 30000, 40000],
    medium: [50000, 60000, 70000, 80000, 90000],
    premium: [100000, 120000, 150000, 180000],
  },
  'catering-cake': {
    small: [30000, 50000, 60000, 80000],
    medium: [100000, 120000, 150000, 180000],
    premium: [200000, 250000, 300000, 350000],
  },
  'clothing-fashion': {
    small: [15000, 20000, 25000, 30000, 40000],
    medium: [50000, 60000, 70000, 80000],
    premium: [90000, 100000, 120000, 150000],
  },
  'decoration-floral': {
    small: [50000, 70000, 80000, 100000],
    medium: [120000, 150000, 180000, 220000, 250000],
    premium: [300000, 350000, 400000, 500000],
  },
  'entertainment-hosting': {
    small: [50000, 70000, 80000, 100000],
    medium: [120000, 150000, 180000, 220000],
    premium: [250000, 300000, 350000, 400000],
  },
  'health-fitness': {
    small: [15000, 20000, 25000, 30000],
    medium: [40000, 50000, 60000, 70000],
    premium: [80000, 100000, 120000],
  },
  honeymoon: {
    small: [50000, 70000, 80000, 100000],
    medium: [120000, 150000, 180000, 220000, 250000],
    premium: [300000, 350000, 400000, 500000, 600000],
  },
  'favors-invitations': {
    small: [10000, 15000, 20000, 25000],
    medium: [30000, 35000, 40000, 50000],
    premium: [60000, 70000, 80000, 90000],
  },
  jewelry: {
    small: [20000, 30000, 40000, 50000],
    medium: [60000, 80000, 100000, 120000],
    premium: [150000, 180000, 200000, 250000, 300000],
  },
  photography: {
    small: [50000, 70000, 80000, 100000],
    medium: [120000, 150000, 180000, 220000],
    premium: [250000, 300000, 350000, 400000],
  },
  transportation: {
    small: [30000, 40000, 50000, 70000],
    medium: [80000, 100000, 120000, 150000],
    premium: [180000, 200000, 250000, 300000],
  },
  venue: {
    small: [80000, 100000, 120000],
    medium: [150000, 180000, 220000, 250000],
    premium: [300000, 350000, 400000, 500000],
  },
}

const explicitCategoryPrices: Partial<Record<CanonicalCategoryId, Array<{ pattern: RegExp; price: number }>>> = {
  'bridal-beauty': [
    { pattern: /premium lashes/i, price: 20000 },
    { pattern: /touch-up/i, price: 40000 },
    { pattern: /trial makeup/i, price: 50000 },
    { pattern: /additional hairstyle|hair style/i, price: 60000 },
    { pattern: /assistant artist/i, price: 80000 },
    { pattern: /extra look change/i, price: 90000 },
    { pattern: /early morning/i, price: 40000 },
    { pattern: /premium skincare/i, price: 50000 },
    { pattern: /travel fee/i, price: 100000 },
  ],
  'catering-cake': [
    { pattern: /add 25 guests/i, price: 150000 },
    { pattern: /add 50 guests/i, price: 280000 },
    { pattern: /dessert table/i, price: 120000 },
    { pattern: /live .*station|live noodle station/i, price: 180000 },
    { pattern: /beverage corner/i, price: 100000 },
    { pattern: /premium tableware|premium cutlery/i, price: 90000 },
    { pattern: /extra serving staff/i, price: 120000 },
    { pattern: /custom cake tier/i, price: 200000 },
  ],
  'clothing-fashion': [
    { pattern: /gift packaging/i, price: 15000 },
    { pattern: /lining recommendation|cutting service/i, price: 20000 },
    { pattern: /matching accessories|accessories rental|accessory styling/i, price: 35000 },
    { pattern: /delivery/i, price: 25000 },
    { pattern: /express tailoring|express adjustment/i, price: 45000 },
    { pattern: /custom fitting|alteration/i, price: 50000 },
    { pattern: /veil upgrade/i, price: 80000 },
  ],
  'decoration-floral': [
    { pattern: /extra tables|centerpieces|candle tables/i, price: 120000 },
    { pattern: /photo booth|photo zone/i, price: 140000 },
    { pattern: /ambient lighting|spotlight|photo zone lighting/i, price: 150000 },
    { pattern: /fresh flower|bouquet|aisle flowers|floral aisle/i, price: 180000 },
    { pattern: /entrance arch|backdrop upgrade/i, price: 220000 },
    { pattern: /ceiling|hanging lights|hanging ceiling|ceiling florals/i, price: 300000 },
    { pattern: /premium .*stage|aisle & stage styling/i, price: 350000 },
    { pattern: /vip family table|vip table/i, price: 150000 },
    { pattern: /dance floor/i, price: 180000 },
    { pattern: /laser effect/i, price: 220000 },
    { pattern: /moving lights/i, price: 200000 },
    { pattern: /extra technician hours/i, price: 100000 },
  ],
  'entertainment-hosting': [
    { pattern: /mc extension/i, price: 120000 },
    { pattern: /extra hour/i, price: 120000 },
    { pattern: /extra performers?|second performer/i, price: 180000 },
    { pattern: /extra set/i, price: 100000 },
    { pattern: /sound upgrade|extra speakers/i, price: 150000 },
    { pattern: /lighting upgrade|lighting effects/i, price: 180000 },
    { pattern: /cold sparks/i, price: 180000 },
    { pattern: /confetti/i, price: 70000 },
    { pattern: /fireworks/i, price: 300000 },
    { pattern: /language option/i, price: 60000 },
  ],
  'health-fitness': [
    { pattern: /meal plan/i, price: 40000 },
    { pattern: /wellness consultation/i, price: 50000 },
    { pattern: /extra coaching|extra specialist/i, price: 50000 },
    { pattern: /written report/i, price: 30000 },
    { pattern: /body treatment/i, price: 80000 },
    { pattern: /home .*collection/i, price: 45000 },
    { pattern: /express result/i, price: 25000 },
  ],
  honeymoon: [
    { pattern: /room decoration/i, price: 80000 },
    { pattern: /travel insurance/i, price: 80000 },
    { pattern: /candlelight dinner/i, price: 120000 },
    { pattern: /airport lounge|vip transfer/i, price: 180000 },
    { pattern: /spa/i, price: 200000 },
    { pattern: /visa processing/i, price: 150000 },
    { pattern: /private excursion|photoshoot abroad/i, price: 350000 },
  ],
  'favors-invitations': [
    { pattern: /extra cards/i, price: 20000 },
    { pattern: /gallery/i, price: 25000 },
    { pattern: /background music/i, price: 20000 },
    { pattern: /story section/i, price: 18000 },
    { pattern: /donation insert/i, price: 20000 },
    { pattern: /wax seal/i, price: 25000 },
    { pattern: /custom domain/i, price: 50000 },
    { pattern: /extra language/i, price: 30000 },
    { pattern: /foil/i, price: 30000 },
    { pattern: /envelope/i, price: 35000 },
    { pattern: /laser cut/i, price: 50000 },
    { pattern: /rush printing/i, price: 50000 },
  ],
  jewelry: [
    { pattern: /gift box/i, price: 30000 },
    { pattern: /engraving/i, price: 50000 },
    { pattern: /resizing|sizing adjustment/i, price: 60000 },
    { pattern: /express delivery/i, price: 40000 },
    { pattern: /polishing/i, price: 40000 },
    { pattern: /matching accessory/i, price: 100000 },
    { pattern: /certificate|origin report/i, price: 80000 },
    { pattern: /setting upgrade/i, price: 180000 },
  ],
  photography: [
    { pattern: /extra hour/i, price: 100000 },
    { pattern: /extra album|photo book/i, price: 90000 },
    { pattern: /same-day edit/i, price: 150000 },
    { pattern: /drone/i, price: 180000 },
    { pattern: /additional photographer|second shooter/i, price: 250000 },
    { pattern: /additional videographer|teaser video/i, price: 220000 },
  ],
  transportation: [
    { pattern: /extra hour/i, price: 50000 },
    { pattern: /second pickup|extra pickup/i, price: 40000 },
    { pattern: /photo stop/i, price: 50000 },
    { pattern: /floral car decor|premium decoration/i, price: 80000 },
    { pattern: /weekend|peak date surcharge/i, price: 90000 },
    { pattern: /luxury vehicle upgrade|convoy support/i, price: 200000 },
  ],
  venue: [
    { pattern: /extra hour/i, price: 150000 },
    { pattern: /additional guest seating/i, price: 120000 },
    { pattern: /valet parking/i, price: 180000 },
    { pattern: /entrance floral upgrade/i, price: 220000 },
    { pattern: /enhanced lighting/i, price: 250000 },
    { pattern: /premium stage upgrade/i, price: 300000 },
  ],
}

const genericKeywordTiers: Array<{ pattern: RegExp; tier: keyof CategoryBand }> = [
  { pattern: /complimentary|free|included bonus/i, tier: 'small' },
  { pattern: /gift|basic|extra cards|story|music|delivery|report|pickup|language/i, tier: 'small' },
  { pattern: /hour|touch-up|trial|tailoring|alteration|fitting|gallery|wax seal|engraving|resizing|insurance/i, tier: 'medium' },
  { pattern: /upgrade|premium|vip|luxury|drone|same-day|stage|lighting|performer|fireworks|ceiling|floral|excursion|spa/i, tier: 'premium' },
]

const premiumKeywordBoosters = [/premium/i, /vip/i, /luxury/i, /deluxe/i]
const mediumKeywordBoosters = [/upgrade/i, /drone/i, /same-day/i, /extra hour/i, /stage/i, /lighting/i]

function isIntentionallyFree(name: string) {
  return /complimentary|free|included bonus/i.test(name)
}

function pickFromBand(categoryId: CanonicalCategoryId, tier: keyof CategoryBand, seed: string) {
  const options = categoryBands[categoryId][tier]
  const hash = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return options[hash % options.length]
}

function inferTier(name: string): keyof CategoryBand {
  for (const rule of genericKeywordTiers) {
    if (rule.pattern.test(name)) {
      return rule.tier
    }
  }

  return 'medium'
}

function applyBooster(name: string, tier: keyof CategoryBand): keyof CategoryBand {
  if (premiumKeywordBoosters.some((pattern) => pattern.test(name))) {
    return 'premium'
  }

  if (tier === 'small' && mediumKeywordBoosters.some((pattern) => pattern.test(name))) {
    return 'medium'
  }

  return tier
}

function getExplicitCategoryPrice(categoryId: CanonicalCategoryId, name: string) {
  const rules = explicitCategoryPrices[categoryId] ?? []
  return rules.find((rule) => rule.pattern.test(name))?.price ?? null
}

function getAddonPrice(categoryId: CanonicalCategoryId, name: string) {
  if (isIntentionallyFree(name)) {
    return 0
  }

  const explicitPrice = getExplicitCategoryPrice(categoryId, name)
  if (explicitPrice !== null) {
    return explicitPrice
  }

  const inferredTier = applyBooster(name, inferTier(name))
  return pickFromBand(categoryId, inferredTier, `${categoryId}:${name}`)
}

export const packageAddons: PackageAddonRecord[] = legacyPackages.flatMap((pkg) => {
  const categoryId = toCanonicalCategoryId(pkg.categoryId)

  return (pkg.addOnGroups ?? []).flatMap((group, groupIndex) =>
    group.items.map((item, itemIndex) => ({
      id: item.id,
      packageId: pkg.id,
      groupTitle: group.title,
      name: item.name,
      addPriceMMK: getAddonPrice(categoryId, item.name),
      note: item.note,
      sortOrder: groupIndex * 100 + itemIndex,
    })),
  )
})
