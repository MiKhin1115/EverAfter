import type { AddOnGroup, ExtraSection, IncludesGroup, Package, Policy, Review } from '../../../types/catalog'
import { shops } from '../shops'
import { packageAddons } from './addons'
import { bookingRules } from './booking-rules'
import type {
  BookingRuleRecord,
  PackageAddonRecord,
  PackageKind,
  PackagePolicyRecord,
  PackageRecord,
  PackageReviewRecord,
  ProductPackageDetail,
  ServicePackageDetail,
  TravelPackageDetail,
} from './base'
import { packageExtraSections } from './extra-sections'
import { packageIncludes } from './includes'
import { packagePolicies } from './policies'
import { productPackageDetails } from './product-details'
import { legacyPackageMap, packageRecords } from './records'
import { packageReviews } from './reviews'
import { servicePackageDetails } from './service-details'
import { travelPackageDetails } from './travel-details'

export type FullPackage = Package & {
  packageKind: PackageKind
  basePriceMMK: number | null
  minPriceMMK?: number | null
  maxPriceMMK?: number | null
  priceMMKRange?: { min: number; max: number } | null
  durationMinutes?: number | null
  durationDays?: number
  durationNights?: number
  destination?: string
  country?: string
  priceUnit?: string | null
  purchaseMode?: string | null
  rentalPriceMMKRange?: { min: number; max: number } | null
  serviceMeta?: Record<string, unknown>
  productMeta?: Record<string, unknown>
  travelMeta?: Record<string, unknown>
  bookingMeta?: Record<string, unknown> | null
  bookingRules?: BookingRuleRecord
}

const groupByPackageId = <T extends { packageId: string }>(records: T[]) =>
  records.reduce<Map<string, T[]>>((map, record) => {
    const current = map.get(record.packageId) ?? []
    current.push(record)
    map.set(record.packageId, current)
    return map
  }, new Map())

const serviceDetailMap = new Map(servicePackageDetails.map((detail) => [detail.packageId, detail]))
const productDetailMap = new Map(productPackageDetails.map((detail) => [detail.packageId, detail]))
const travelDetailMap = new Map(travelPackageDetails.map((detail) => [detail.packageId, detail]))
const bookingRuleMap = new Map(bookingRules.map((rule) => [rule.packageId, rule]))
const policyMap = new Map(packagePolicies.map((policy) => [policy.packageId, policy]))
const reviewMap = groupByPackageId<PackageReviewRecord>(packageReviews)
const extraSectionMap = groupByPackageId(packageExtraSections)
const includeMap = groupByPackageId(packageIncludes)
const addonMap = groupByPackageId<PackageAddonRecord>(packageAddons)
const shopMap = new Map(shops.map((shop) => [shop.id, shop]))
const buildPackageHeroImages = (record: PackageRecord) => record.heroImages.slice(0, 1)

const buildIncludesGroups = (packageId: string): IncludesGroup[] => {
  const records = [...(includeMap.get(packageId) ?? [])].sort((a, b) => a.sortOrder - b.sortOrder)
  const grouped = new Map<string, string[]>()

  records.forEach((record) => {
    const current = grouped.get(record.groupTitle) ?? []
    current.push(record.itemText)
    grouped.set(record.groupTitle, current)
  })

  return Array.from(grouped.entries()).map(([title, items]) => ({ title, items }))
}

const buildAddOnGroups = (packageId: string): AddOnGroup[] => {
  const records = [...(addonMap.get(packageId) ?? [])].sort((a, b) => a.sortOrder - b.sortOrder)
  const grouped = new Map<string, AddOnGroup['items']>()

  records.forEach((record) => {
    const current = grouped.get(record.groupTitle) ?? []
    current.push({
      id: record.id,
      name: record.name,
      addPriceMMK: record.addPriceMMK ?? 0,
    })
    grouped.set(record.groupTitle, current)
  })

  return Array.from(grouped.entries()).map(([title, items]) => ({ title, items }))
}

const buildPolicy = (packageId: string): Policy => {
  const policy = policyMap.get(packageId)
  return {
    about: policy?.about ?? '',
    deliverables: policy?.deliverables,
    timeline: policy?.timeline,
    cancellation: policy?.cancellation ?? '',
    reschedule: policy?.reschedule ?? '',
  }
}

const buildReviews = (packageId: string): Review[] =>
  (reviewMap.get(packageId) ?? []).map((review) => ({
    id: review.id,
    name: review.name,
    stars: review.stars,
    text: review.text,
    date: review.date,
  }))

const buildExtraSections = (packageId: string): ExtraSection[] =>
  [...(extraSectionMap.get(packageId) ?? [])]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((record) => record.section)

const buildPriceRange = (record: PackageRecord) => {
  if (record.minPriceMMK == null && record.maxPriceMMK == null) {
    return null
  }

  return {
    min: record.minPriceMMK ?? record.basePriceMMK ?? 0,
    max: record.maxPriceMMK ?? record.basePriceMMK ?? 0,
  }
}

const buildFullPackage = (
  record: PackageRecord,
  serviceDetail?: ServicePackageDetail,
  productDetail?: ProductPackageDetail,
  travelDetail?: TravelPackageDetail,
  policy?: PackagePolicyRecord,
): FullPackage => {
  const shop = shopMap.get(record.shopId)
  const legacy = legacyPackageMap.get(record.id)

  return {
    id: record.id,
    shopId: record.shopId,
    categoryId: record.categoryId,
    template: legacy?.template ?? record.packageKind,
    packageKind: record.packageKind,
    title: record.title,
    tagline: record.tagline,
    verified: shop?.verified ?? legacy?.verified ?? false,
    vendorName: shop?.name ?? legacy?.vendorName ?? '',
    heroImages: buildPackageHeroImages(record),
    priceMMK: record.basePriceMMK ?? record.minPriceMMK ?? 0,
    basePriceMMK: record.basePriceMMK,
    minPriceMMK: record.minPriceMMK,
    maxPriceMMK: record.maxPriceMMK,
    priceMMKRange: buildPriceRange(record),
    location: record.location ?? undefined,
    duration: record.durationLabel ?? undefined,
    guestRange: record.guestRange ?? undefined,
    includesGroups: buildIncludesGroups(record.id),
    addOnGroups: buildAddOnGroups(record.id),
    policies: policy
      ? {
          about: policy.about,
          deliverables: policy.deliverables,
          timeline: policy.timeline,
          cancellation: policy.cancellation,
          reschedule: policy.reschedule,
        }
      : buildPolicy(record.id),
    reviews: buildReviews(record.id),
    extraSections: buildExtraSections(record.id),
    ctaLabel: record.ctaLabel ?? undefined,
    durationMinutes: serviceDetail?.durationMinutes ?? legacy?.durationMinutes ?? undefined,
    durationDays: travelDetail?.durationDays ?? legacy?.durationDays,
    durationNights: travelDetail?.durationNights ?? legacy?.durationNights,
    destination: travelDetail?.destination,
    country: travelDetail?.country,
    serviceMeta: serviceDetail?.serviceMeta ?? legacy?.serviceMeta,
    productMeta: productDetail?.productMeta ?? legacy?.productMeta,
    travelMeta: travelDetail?.travelMeta ?? legacy?.travelMeta,
    priceUnit: productDetail?.priceUnit ?? legacy?.priceUnit ?? undefined,
    purchaseMode: productDetail?.purchaseMode ?? legacy?.purchaseMode ?? undefined,
    rentalPriceMMKRange:
      productDetail?.rentalMinPriceMMK != null || productDetail?.rentalMaxPriceMMK != null
        ? {
            min: productDetail?.rentalMinPriceMMK ?? 0,
            max: productDetail?.rentalMaxPriceMMK ?? 0,
          }
        : legacy?.rentalPriceMMKRange ?? null,
    bookingMeta: (legacy?.bookingMeta as Record<string, unknown> | null | undefined) ?? null,
    bookingRules: bookingRuleMap.get(record.id),
  }
}

export const packages: FullPackage[] = packageRecords.map((record) =>
  buildFullPackage(
    record,
    serviceDetailMap.get(record.id),
    productDetailMap.get(record.id),
    travelDetailMap.get(record.id),
    policyMap.get(record.id),
  ),
)

export const getPackagesByShopId = (shopId: string) => packages.filter((item) => item.shopId === shopId)

export const getPackageById = (packageId: string) => packages.find((item) => item.id === packageId) ?? null

export const getPackagesByCategory = (categoryId: string) => {
  const canonicalCategoryId = toCanonicalCategoryId(categoryId)
  return packages.filter((item) => item.categoryId === canonicalCategoryId)
}

export const getFullPackageDetails = (packageId: string) => getPackageById(packageId)
