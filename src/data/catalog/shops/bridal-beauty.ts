import type { Shop } from '../../../types/catalog'

type BridalBeautyShop = Shop & {
  serviceTypeText: string
  shortDescription: string
  payment: {
    inAppAllowed: boolean
  }
}

export const bridalBeautyShops: BridalBeautyShop[] = [
  {
    id: 'starlight-beauty-studio',
    name: 'Starlight Beauty Studio',
    categoryId: 'bridal-beauty',
    vendorCategoryLabel: 'Makeup',
    verified: true,
    rating: 4.8,
    reviewCount: 124,
    startingPriceMMK: 420000,
    location: 'Yangon',
    city: 'Yangon',
    phone: '+959 765 123 456',
    serviceTypeText: 'Studio & On-site available',
    shortDescription:
      'Luxury HD bridal makeup and modern hair styling tailored for wedding day, engagement, and photoshoot moments.',
    payment: {
      inAppAllowed: true,
    },
    image: '/images/vendors/bridal-beauty-05.jpg',
    tags: ['Bridal', 'Makeup', 'Hair', 'Studio', 'On-site'],
  },
  {
    id: 'everglow-beauty-lounge',
    name: 'EverGlow Beauty Lounge',
    categoryId: 'bridal-beauty',
    vendorCategoryLabel: 'Makeup',
    verified: true,
    rating: 4.7,
    reviewCount: 98,
    startingPriceMMK: 350000,
    location: 'Tamwe Township, Yangon',
    serviceTypeText: 'Studio available',
    shortDescription: 'Bridal and engagement makeup with natural-finish looks and trial support.',
    payment: {
      inAppAllowed: true,
    },
    image: '/images/vendors/bridal-beauty-02.jpg',
    tags: ['Bridal', 'Natural', 'Trial'],
  },
  {
    id: 'blush-and-bloom-studio',
    name: 'Blush & Bloom Studio',
    categoryId: 'bridal-beauty',
    vendorCategoryLabel: 'Makeup',
    verified: true,
    rating: 4.6,
    reviewCount: 87,
    startingPriceMMK: 320000,
    location: 'Chanmyathazi Township, Mandalay',
    serviceTypeText: 'Studio available',
    shortDescription: 'Soft glam bridal makeup and hair styling for ceremony and portraits.',
    payment: {
      inAppAllowed: true,
    },
    image: '/images/vendors/bridal-beauty-03.jpg',
    tags: ['Bridal', 'Soft Glam', 'Hair'],
  },
  {
    id: 'aura-bridal-atelier',
    name: 'Aura Bridal Atelier',
    categoryId: 'bridal-beauty',
    vendorCategoryLabel: 'Makeup',
    verified: true,
    rating: 4.8,
    reviewCount: 112,
    startingPriceMMK: 390000,
    location: 'Yankin Township, Yangon',
    serviceTypeText: 'Studio & On-site available',
    shortDescription: 'Premium bridal beauty service with high-end products and signature finishing.',
    payment: {
      inAppAllowed: true,
    },
    image: '/images/vendors/bridal-beauty-04.jpg',
    tags: ['Premium', 'Bridal', 'On-site'],
  },
  {
    id: 'golden-hour-beauty-team',
    name: 'Golden Hour Beauty Team',
    categoryId: 'bridal-beauty',
    vendorCategoryLabel: 'Makeup',
    verified: false,
    rating: 4.5,
    reviewCount: 73,
    startingPriceMMK: 280000,
    location: 'Sanchaung Township, Yangon',
    serviceTypeText: 'On-site available',
    shortDescription: 'Budget-friendly bridal and engagement glam service for photo-ready looks.',
    payment: {
      inAppAllowed: true,
    },
    image: '/images/vendors/bridal-beauty-01.jpg',
    tags: ['Bridal', 'Photoshoot', 'Groom Add-on'],
  },
]
