import { bridalBeautyPackages } from './bridal-beauty'
import { cateringCakePackages } from './catering-cake'
import { clothingFashionPackages } from './clothing-fashion'
import { decorationFloralPackages } from './decoration-floral'
import { entertainmentHostingPackages } from './entertainment-hosting'
import { healthFitnessPackages } from './health-fitness'
import { honeymoonPackages } from './honeymoon'
import { invitationPackages } from './invitations'
import { jewelryPackages } from './jewelry'
import { photographyPackages } from './photography'
import { transportationPackages } from './transportation'
import { venuePackages } from './venue'
import {
  cloneStringArray,
  getBasePriceMMK,
  getPackageKind,
  normalizePackageHeroImages,
  normalizePriceRange,
  toCanonicalCategoryId,
  type LegacyPackageSource,
  type PackageRecord,
} from './base'

export const legacyPackages: LegacyPackageSource[] = [
  ...bridalBeautyPackages,
  ...cateringCakePackages,
  ...clothingFashionPackages,
  ...decorationFloralPackages,
  ...entertainmentHostingPackages,
  ...healthFitnessPackages,
  ...honeymoonPackages,
  ...invitationPackages,
  ...jewelryPackages,
  ...photographyPackages,
  ...transportationPackages,
  ...venuePackages,
] as LegacyPackageSource[]

export const legacyPackageMap = new Map(legacyPackages.map((pkg) => [pkg.id, pkg]))

export const packageRecords: PackageRecord[] = legacyPackages.map((pkg) => {
  const priceRange = normalizePriceRange(pkg.priceMMKRange)

  return {
    id: pkg.id,
    shopId: pkg.shopId,
    categoryId: toCanonicalCategoryId(pkg.categoryId),
    packageKind: getPackageKind(pkg),
    title: pkg.title,
    tagline: pkg.tagline,
    heroImages: normalizePackageHeroImages(pkg.heroImages),
    basePriceMMK: getBasePriceMMK(pkg),
    minPriceMMK: priceRange.min,
    maxPriceMMK: priceRange.max,
    location: pkg.location ?? null,
    durationLabel: pkg.duration ?? null,
    guestRange: pkg.guestRange ?? null,
    ctaLabel: pkg.ctaLabel ?? null,
  }
})
