export type Category = {
  id: string
  name: string
  iconKey:
    | 'Sparkles'
    | 'Shirt'
    | 'Camera'
    | 'Paintbrush'
    | 'MapPin'
    | 'Utensils'
    | 'Music'
    | 'Gift'
    | 'Car'
    | 'Store'
    | 'Stethoscope'
    | 'Plane'
}

export type Shop = {
  id: string
  name: string
  categoryId: string
  vendorCategoryLabel: string
  verified: boolean
  startingPriceMMK: number
  location: string
  city?: string
  phone?: string
  image: string
  rating: number
  reviewCount: number
  tags: string[]
}

export type PackageTemplate = 'SERVICE' | 'PRODUCT' | 'TRAVEL'

export type IncludesGroup = {
  title: string
  items: string[]
}

export type AddOnGroup = {
  title: string
  items: {
    id: string
    name: string
    addPriceMMK: number
  }[]
}

export type Policy = {
  about: string
  deliverables?: string
  timeline?: string
  cancellation: string
  reschedule: string
}

export type Review = {
  id: string
  name: string
  stars: number
  text: string
  date: string
}

export type StyleGallerySection = {
  type: 'STYLE_GALLERY'
  title: string
  items: {
    label: string
    image: string
  }[]
}

export type SpecTableSection = {
  type: 'SPEC_TABLE'
  title: string
  rows: {
    label: string
    value: string
  }[]
}

export type ChoiceChipsSection = {
  type: 'CHOICE_CHIPS'
  title: string
  key: string
  choices: string[]
}

export type MenuTiersSection = {
  type: 'MENU_TIERS'
  title: string
  tiers: {
    name: string
    priceAdd: number
    highlights: string[]
  }[]
}

export type TravelMonthsSection = {
  type: 'TRAVEL_MONTHS'
  title: string
  months: string[]
}

export type ExtraSection =
  | StyleGallerySection
  | SpecTableSection
  | ChoiceChipsSection
  | MenuTiersSection
  | TravelMonthsSection

export type Package = {
  id: string
  shopId: string
  categoryId: string
  template: PackageTemplate
  packageKind?: PackageTemplate
  title: string
  tagline: string
  verified: boolean
  vendorName: string
  heroImages: string[]
  priceMMK: number
  basePriceMMK?: number | null
  minPriceMMK?: number | null
  maxPriceMMK?: number | null
  priceMMKRange?: {
    min: number
    max: number
  } | null
  location?: string
  duration?: string
  durationMinutes?: number | null
  durationDays?: number
  durationNights?: number
  destination?: string
  country?: string
  guestRange?: string
  priceUnit?: string | null
  purchaseMode?: string | null
  rentalPriceMMKRange?: {
    min: number
    max: number
  } | null
  includesGroups: IncludesGroup[]
  addOnGroups: AddOnGroup[]
  policies: Policy
  reviews: Review[]
  extraSections: ExtraSection[]
  ctaLabel?: string
  serviceMeta?: Record<string, unknown>
  productMeta?: Record<string, unknown>
  travelMeta?: Record<string, unknown>
  bookingMeta?: Record<string, unknown> | null
  bookingRules?: {
    packageId: string
    depositPercent?: number | null
    peakSeasonMonths?: string[] | null
    peakSeasonSurcharge?: number | null
    cancellationPolicyText?: string | null
    availabilityNote?: string | null
  }
}
