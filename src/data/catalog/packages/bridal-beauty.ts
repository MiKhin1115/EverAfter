import type { ExtraSection, IncludesGroup, Review } from '../../../types/catalog'
import { bridalBeautyShops } from '../shops/bridal-beauty'

type BeautyServiceType = 'Bridal' | 'Engagement' | 'PreWedding' | 'HairOnly' | 'GroomAddOn'
type BeautyTimeSlot = 'Morning' | 'Afternoon' | 'Evening'

type BeautyAddOnItem = {
  id: string
  name: string
  addPriceMMK: number | null
  note?: string
}

type BeautyAddOnGroup = {
  title: string
  items: BeautyAddOnItem[]
}

type BeautyServiceMeta = {
  serviceType: BeautyServiceType
  trialIncluded: boolean
  touchUpIncluded: boolean
  touchUpKitIncluded: boolean
  lookChangesAllowed: number
  onSiteAvailable: boolean | null
  travelFeeRequired: boolean | null
  timeSlots: BeautyTimeSlot[]
}

type BeautyBookingMeta = {
  depositPercent: number | null
  peakSeasonMonths: string[] | null
  peakSeasonSurcharge: number | null
  cancellationPolicyText: string | null
  availabilityNote: string | null
}

export type BeautyPackage = {
  id: string
  shopId: string
  categoryId: 'bridal-beauty'
  template: 'SERVICE'
  title: string
  tagline: string
  verified: boolean
  vendorName: string
  heroImages: string[]
  priceMMK: number
  location: string
  duration: string
  durationMinutes: number | null
  durationBreakdown?: {
    trialMinutes?: number
    weddingDayMinutes?: number
  }
  includes: string[]
  includesGroups: IncludesGroup[]
  addOnGroups: BeautyAddOnGroup[]
  policies: {
    about: string
    deliverables?: string
    timeline?: string
    cancellation: string
    reschedule: string
  }
  reviews: Review[]
  extraSections: ExtraSection[]
  tags: string[]
  serviceMeta: BeautyServiceMeta
  bookingMeta: BeautyBookingMeta
}

const starlight = bridalBeautyShops.find((shop) => shop.id === 'starlight-beauty-studio')

if (!starlight) {
  throw new Error('starlight-beauty-studio shop is required in bridalBeautyShops.')
}

const beautySections: ExtraSection[] = [
  {
    type: 'STYLE_GALLERY',
    title: 'Bridal Looks',
    items: [
      {
        label: 'Soft Glam',
        image: '/images/packages/bridal-beauty-01.jpg',
      },
      {
        label: 'Classic Glow',
        image: '/images/packages/bridal-beauty-02.jpg',
      },
    ],
  },
  {
    type: 'CHOICE_CHIPS',
    title: 'Look Style',
    key: 'lookStyle',
    choices: ['Natural', 'Soft Glam', 'Bold Glam'],
  },
]

const bookingMetaDefault: BeautyBookingMeta = {
  depositPercent: 30,
  cancellationPolicyText: 'Refundable within 7 days before event',
  availabilityNote: 'Limited slots per day',
  peakSeasonMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  peakSeasonSurcharge: null,
}

const buildStandardAddOns = (prefix: string): BeautyAddOnGroup[] => [
  {
    title: 'Customization',
    items: [
      {
        id: `${prefix}-extra-look-change`,
        name: 'Extra Look Change',
        addPriceMMK: 300000,
      },
      {
        id: `${prefix}-early-morning-booking`,
        name: 'Early Morning Booking',
        addPriceMMK: 200000,
      },
      {
        id: `${prefix}-premium-skincare-prep`,
        name: 'Premium Skincare Prep',
        addPriceMMK: 150000,
      },
      {
        id: `${prefix}-travel-fee-outside-yangon`,
        name: 'Travel Fee (Outside Yangon)',
        addPriceMMK: null,
        note: 'Based on location',
      },
    ],
  },
]

const buildReviews = (prefix: string): Review[] => [
  {
    id: `${prefix}-review-1`,
    name: 'Moe Thandar',
    stars: 5,
    text: 'Long-lasting look and very professional artist team.',
    date: '16 Feb 2026',
  },
  {
    id: `${prefix}-review-2`,
    name: 'Su Pyae',
    stars: 5,
    text: 'Excellent service quality and smooth communication.',
    date: '02 Feb 2026',
  },
]

const buildStarlightPackage = (params: {
  id: string
  title: string
  tagline: string
  heroImage: string
  priceMMK: number
  duration: string
  durationMinutes: number
  includesGroups: IncludesGroup[]
  serviceMeta: BeautyServiceMeta
  tags: string[]
  durationBreakdown?: {
    trialMinutes?: number
    weddingDayMinutes?: number
  }
}): BeautyPackage => {
  const flatIncludes = params.includesGroups.flatMap((group) => group.items)

  return {
    id: params.id,
    shopId: starlight.id,
    categoryId: 'bridal-beauty',
    template: 'SERVICE',
    title: params.title,
    tagline: params.tagline,
    verified: starlight.verified,
    vendorName: starlight.name,
    heroImages: [params.heroImage],
    priceMMK: params.priceMMK,
    location: starlight.location,
    duration: params.duration,
    durationMinutes: params.durationMinutes,
    durationBreakdown: params.durationBreakdown,
    includes: flatIncludes,
    includesGroups: params.includesGroups,
    addOnGroups: buildStandardAddOns(params.id),
    policies: {
      about: 'Luxury HD bridal makeup and hair service tailored for wedding day and ceremony moments.',
      deliverables: 'Primary look completion with finishing touches and final readiness support.',
      timeline: 'Please confirm booking at least 7 days before event date.',
      cancellation: 'Refundable within 7 days before event',
      reschedule: 'One reschedule allowed subject to artist availability.',
    },
    reviews: buildReviews(params.id),
    extraSections: beautySections,
    tags: params.tags,
    serviceMeta: params.serviceMeta,
    bookingMeta: bookingMetaDefault,
  }
}

export const bridalBeautyPackages: BeautyPackage[] = [
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-1',
    title: 'Starlight Bridal Signature Package',
    tagline: 'Essential bridal glam with HD finish.',
    heroImage: '/images/packages/Starlight-Beauty-signature.jpg',
    priceMMK: 1260000,
    duration: '3 hours',
    durationMinutes: 180,
    includesGroups: [
      {
        title: 'Makeup & Hair',
        items: ['HD bridal makeup', 'Classic bridal hair styling', 'Skin prep and primer'],
      },
      {
        title: 'Final Touches',
        items: ['Lashes and setting spray', 'Veil placement support'],
      },
    ],
    serviceMeta: {
      serviceType: 'Bridal',
      trialIncluded: false,
      touchUpIncluded: false,
      touchUpKitIncluded: false,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['Bridal', 'HD', 'Makeup', 'Hair'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-2',
    title: 'Starlight Premium Experience',
    tagline: 'Upgraded glam with premium products and kit.',
    heroImage: '/images/packages/Starlight-Beauty-premium.jpg',
    priceMMK: 1890000,
    duration: '4 hours',
    durationMinutes: 240,
    includesGroups: [
      {
        title: 'Premium Beauty',
        items: ['Airbrush-finish bridal makeup', 'Premium hairstyle sculpting', 'Detailed eye and contour work'],
      },
      {
        title: 'Kit Support',
        items: ['Touch-up kit', 'Lip and blotting essentials for event'],
      },
    ],
    serviceMeta: {
      serviceType: 'Bridal',
      trialIncluded: false,
      touchUpIncluded: false,
      touchUpKitIncluded: true,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['Bridal', 'Premium', 'Touch-up Kit', 'Airbrush'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-3',
    title: 'Luxe Trial + Wedding Package',
    tagline: 'Trial session plus full wedding-day execution.',
    heroImage: '/images/packages/Starlight-Beauty-luxe.jpg',
    priceMMK: 2200000,
    duration: '5 hours',
    durationMinutes: 300,
    durationBreakdown: {
      trialMinutes: 120,
      weddingDayMinutes: 180,
    },
    includesGroups: [
      {
        title: 'Trial Session',
        items: ['120-minute trial appointment', 'Look planning consultation'],
      },
      {
        title: 'Wedding Day Service',
        items: ['Bridal makeup application', 'Hair styling and finishing'],
      },
    ],
    serviceMeta: {
      serviceType: 'Bridal',
      trialIncluded: true,
      touchUpIncluded: false,
      touchUpKitIncluded: false,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['Bridal', 'Trial', 'HD', 'Wedding Day'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-4',
    title: 'All-Day Bridal Support Package',
    tagline: 'All-day artist support with multiple look transitions.',
    heroImage: '/images/packages/Starlight-Beauty-all-day.jpg',
    priceMMK: 3000000,
    duration: '8 hours',
    durationMinutes: 480,
    includesGroups: [
      {
        title: 'All-Day Coverage',
        items: ['Bridal makeup and hair application', 'Artist stays for touch-ups', '2 look changes'],
      },
      {
        title: 'Event Support',
        items: ['Accessory and veil adjustments', 'Photo-ready touch refinements'],
      },
    ],
    serviceMeta: {
      serviceType: 'Bridal',
      trialIncluded: false,
      touchUpIncluded: true,
      touchUpKitIncluded: false,
      lookChangesAllowed: 2,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['Bridal', 'Full-day Support', 'Touch-up', '2 Looks'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-5',
    title: 'Engagement Makeup & Hair',
    tagline: 'Elegant engagement-day makeup and hairstyle service.',
    heroImage: '/images/packages/Starlight-Beauty-engagement.jpg',
    priceMMK: 650000,
    duration: '2.5 hours',
    durationMinutes: 150,
    includesGroups: [
      {
        title: 'Engagement Look',
        items: ['Event makeup application', 'Hair styling for engagement theme'],
      },
      {
        title: 'Prep',
        items: ['Skin prep and balancing', 'Final setting support'],
      },
    ],
    serviceMeta: {
      serviceType: 'Engagement',
      trialIncluded: false,
      touchUpIncluded: false,
      touchUpKitIncluded: false,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['Engagement', 'Makeup', 'Hair'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-6',
    title: 'Pre-Wedding Photoshoot Glam',
    tagline: 'Camera-ready glam styling for pre-wedding shoot sessions.',
    heroImage: '/images/packages/Starlight-Beauty-pre-wedding.jpg',
    priceMMK: 850000,
    duration: '3 hours',
    durationMinutes: 180,
    includesGroups: [
      {
        title: 'Shoot Glam',
        items: ['Photoshoot makeup', 'Hairstyling for concept'],
      },
      {
        title: 'Shoot Support',
        items: ['Quick refinements between shots', 'Lighting-friendly finish'],
      },
    ],
    serviceMeta: {
      serviceType: 'PreWedding',
      trialIncluded: false,
      touchUpIncluded: false,
      touchUpKitIncluded: false,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['PreWedding', 'Photoshoot', 'Glam'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-7',
    title: 'Hair Styling Only',
    tagline: 'Hair-only service for event-ready bridal styling.',
    heroImage: '/images/packages/Starlight-Beauty-hairstyle.jpg',
    priceMMK: 250000,
    duration: '1.5 hours',
    durationMinutes: 90,
    includesGroups: [
      {
        title: 'Hair Service',
        items: ['Hair styling and fixing', 'Accessory placement'],
      },
      {
        title: 'Finishing',
        items: ['Hold and anti-frizz finishing', 'Final hairline cleanup'],
      },
    ],
    serviceMeta: {
      serviceType: 'HairOnly',
      trialIncluded: false,
      touchUpIncluded: false,
      touchUpKitIncluded: false,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['HairOnly', 'Styling'],
  }),
  buildStarlightPackage({
    id: 'starlight-beauty-studio-pkg-8',
    title: 'Groom Makeup (Add-on)',
    tagline: 'Natural matte groom look as an add-on service.',
    heroImage: '/images/packages/Starlight-Beauty-groom.jpg',
    priceMMK: 180000,
    duration: '30 minutes',
    durationMinutes: 30,
    includesGroups: [
      {
        title: 'Groom Prep',
        items: ['Basic groom makeup', 'Shine control and skin balancing'],
      },
      {
        title: 'Quick Finish',
        items: ['Hair grooming touch', 'Photo-ready matte finish'],
      },
    ],
    serviceMeta: {
      serviceType: 'GroomAddOn',
      trialIncluded: false,
      touchUpIncluded: false,
      touchUpKitIncluded: false,
      lookChangesAllowed: 0,
      onSiteAvailable: true,
      travelFeeRequired: false,
      timeSlots: ['Morning', 'Afternoon', 'Evening'],
    },
    tags: ['Groom', 'Add-on', 'Makeup'],
  }),
]

export const bridalBeautyPackageIdAliasMap: Record<string, string> = {
  'bridal-beauty-shop-1-pkg-1': 'starlight-beauty-studio-pkg-1',
  'bridal-beauty-shop-1-pkg-2': 'starlight-beauty-studio-pkg-2',
  'bridal-beauty-shop-1-pkg-3': 'starlight-beauty-studio-pkg-4',
}

export const getBeautyPackagesByShop = (shopId: string) => bridalBeautyPackages.filter((pkg) => pkg.shopId === shopId)

export const filterBeautyPackages = (query: {
  serviceType?: BeautyServiceType
  maxPriceMMK?: number
  trialIncluded?: boolean
  touchUpIncluded?: boolean
  onSiteAvailable?: boolean
}) => {
  return bridalBeautyPackages.filter((pkg) => {
    if (query.serviceType && pkg.serviceMeta.serviceType !== query.serviceType) return false
    if (typeof query.maxPriceMMK === 'number' && pkg.priceMMK > query.maxPriceMMK) return false
    if (typeof query.trialIncluded === 'boolean' && pkg.serviceMeta.trialIncluded !== query.trialIncluded) return false
    if (typeof query.touchUpIncluded === 'boolean' && pkg.serviceMeta.touchUpIncluded !== query.touchUpIncluded) return false
    if (typeof query.onSiteAvailable === 'boolean' && pkg.serviceMeta.onSiteAvailable !== query.onSiteAvailable) return false
    return true
  })
}
