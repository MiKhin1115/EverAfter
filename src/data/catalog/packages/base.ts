import type { AddOnGroup, ExtraSection, IncludesGroup, PackageTemplate, Policy, Review } from '../../../types/catalog'

export const canonicalCategoryIds = [
  'bridal-beauty',
  'catering-cake',
  'clothing-fashion',
  'decoration-floral',
  'entertainment-hosting',
  'health-fitness',
  'honeymoon',
  'favors-invitations',
  'jewelry',
  'photography',
  'transportation',
  'venue',
] as const

export type CanonicalCategoryId = (typeof canonicalCategoryIds)[number]

export const categoryIdAliasMap: Record<string, CanonicalCategoryId> = {
  'bridal-beauty': 'bridal-beauty',
  'catering-cake': 'catering-cake',
  'clothing-fashion': 'clothing-fashion',
  'deco-floral': 'decoration-floral',
  'decoration-floral': 'decoration-floral',
  'entertainment-hosting': 'entertainment-hosting',
  'favors-invitations': 'favors-invitations',
  'health-fitness': 'health-fitness',
  honeymoon: 'honeymoon',
  'honeymoon-travel': 'honeymoon',
  invitations: 'favors-invitations',
  jewelry: 'jewelry',
  photography: 'photography',
  'photo-video': 'photography',
  transportation: 'transportation',
  venue: 'venue',
  'venue-setup': 'venue',
}

export const toCanonicalCategoryId = (categoryId: string): CanonicalCategoryId => categoryIdAliasMap[categoryId] ?? 'bridal-beauty'

export type PackageKind = 'SERVICE' | 'PRODUCT' | 'TRAVEL'

export type PackageRecord = {
  id: string
  shopId: string
  categoryId: string
  packageKind: PackageKind
  title: string
  tagline: string
  heroImages: string[]
  basePriceMMK: number | null
  minPriceMMK?: number | null
  maxPriceMMK?: number | null
  location?: string | null
  durationLabel?: string | null
  guestRange?: string | null
  ctaLabel?: string | null
}

export type ServicePackageDetail = {
  packageId: string
  durationMinutes?: number | null
  serviceMeta?: Record<string, unknown>
}

export type ProductPackageDetail = {
  packageId: string
  priceUnit?: string | null
  purchaseMode?: string | null
  rentalMinPriceMMK?: number | null
  rentalMaxPriceMMK?: number | null
  productMeta?: Record<string, unknown>
}

export type TravelPackageDetail = {
  packageId: string
  destination: string
  country: string
  durationDays: number
  durationNights: number
  travelMeta?: Record<string, unknown>
}

export type PackageIncludeRecord = {
  id: string
  packageId: string
  groupTitle: string
  itemText: string
  sortOrder: number
}

export type PackageAddonRecord = {
  id: string
  packageId: string
  groupTitle: string
  name: string
  addPriceMMK: number | null
  note?: string
  sortOrder: number
}

export type BookingRuleRecord = {
  packageId: string
  depositPercent?: number | null
  peakSeasonMonths?: string[] | null
  peakSeasonSurcharge?: number | null
  cancellationPolicyText?: string | null
  availabilityNote?: string | null
}

export type PackagePolicyRecord = {
  packageId: string
  about: string
  deliverables?: string
  timeline?: string
  cancellation: string
  reschedule: string
}

export type PackageReviewRecord = {
  id: string
  packageId: string
  name: string
  stars: number
  text: string
  date: string
}

export type UiIncludesGroup = IncludesGroup
export type UiAddOnGroup = AddOnGroup

export type LegacyBookingMeta = Record<string, unknown> | null | undefined

export type LegacyPriceRange = {
  min: number
  max: number
} | null

export type LegacyAddOnItem = {
  id: string
  name: string
  addPriceMMK: number | null
  note?: string
}

export type LegacyAddOnGroup = {
  title: string
  items: LegacyAddOnItem[] | readonly LegacyAddOnItem[]
}

export type LegacyPackageSource = {
  id: string
  shopId: string
  categoryId: string
  template: PackageTemplate
  title: string
  tagline: string
  verified?: boolean
  vendorName?: string
  heroImages: string[] | readonly string[]
  priceMMK?: number | null
  priceMMKRange?: LegacyPriceRange
  location?: string | null
  duration?: string | null
  guestRange?: string | null
  ctaLabel?: string | null
  includes?: string[] | readonly string[]
  includesGroups?: IncludesGroup[] | readonly IncludesGroup[]
  addOnGroups?: LegacyAddOnGroup[] | readonly LegacyAddOnGroup[]
  policies?: Policy
  reviews?: Review[] | readonly Review[]
  extraSections?: ExtraSection[] | readonly ExtraSection[]
  durationMinutes?: number | null
  durationDays?: number
  durationNights?: number
  destination?: string
  country?: string
  serviceMeta?: Record<string, unknown>
  productMeta?: Record<string, unknown>
  travelMeta?: Record<string, unknown>
  bookingMeta?: LegacyBookingMeta
  priceUnit?: string | null
  purchaseMode?: string | null
  rentalPriceMMKRange?: LegacyPriceRange
}

export const getPackageKind = (pkg: LegacyPackageSource): PackageKind => {
  const categoryId = toCanonicalCategoryId(pkg.categoryId)

  if (categoryId === 'honeymoon') {
    return 'TRAVEL'
  }

  if (pkg.template === 'PRODUCT') {
    return 'PRODUCT'
  }

  return 'SERVICE'
}

export const cloneStringArray = (items?: string[] | readonly string[] | null) => (items ? [...items] : [])

export const normalizePackageHeroImages = (items?: string[] | readonly string[] | null) => {
  const [primaryImage] = cloneStringArray(items)
  return primaryImage ? [primaryImage] : []
}

export const normalizePriceRange = (range?: LegacyPriceRange) => {
  if (!range) {
    return { min: null, max: null }
  }

  return {
    min: range.min,
    max: range.max,
  }
}

export const getBasePriceMMK = (pkg: LegacyPackageSource) => {
  if (typeof pkg.priceMMK === 'number') {
    return pkg.priceMMK
  }

  return pkg.priceMMKRange?.min ?? null
}
