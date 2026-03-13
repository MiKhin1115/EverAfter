import type { Shop } from '../../../types/catalog'
import { bridalBeautyShops } from './bridal-beauty'
import { cateringCakeShops } from './catering-cake'
import { clothingFashionShops } from './clothing-fashion'
import { decorationFloralShops } from './decoration-floral'
import { entertainmentHostingShops } from './entertainment-hosting'
import { healthFitnessShops } from './health-fitness'
import { honeymoonShops } from './honeymoon'
import { invitationShops } from './invitations'
import { jewelryShops } from './jewelry'
import { photographyShops } from './photography'
import { transportationShops } from './transportation'
import { venueShops } from './venue'
import { toCanonicalCategoryId } from '../packages/base'

const normalizeShop = (shop: {
  id: string
  name: string
  categoryId: string
  vendorCategoryLabel: string
  verified: boolean
  startingPriceMMK: number
  location: string | null
  city?: string | null
  phone?: string | null
  image: string
  rating: number | null
  reviewCount: number | null
  tags: readonly string[]
}): Shop => ({
  id: shop.id,
  name: shop.name,
  categoryId: toCanonicalCategoryId(shop.categoryId),
  vendorCategoryLabel: shop.vendorCategoryLabel,
  verified: shop.verified,
  startingPriceMMK: shop.startingPriceMMK ?? 0,
  location: shop.location ?? '',
  city: shop.city ?? shop.location ?? '',
  phone: shop.phone ?? '',
  image: shop.image,
  rating: shop.rating ?? 0,
  reviewCount: shop.reviewCount ?? 0,
  tags: [...shop.tags],
})

export const shops: Shop[] = [
  ...bridalBeautyShops,
  ...cateringCakeShops,
  ...clothingFashionShops,
  ...decorationFloralShops,
  ...entertainmentHostingShops,
  ...healthFitnessShops,
  ...honeymoonShops,
  ...invitationShops,
  ...jewelryShops,
  ...photographyShops,
  ...transportationShops,
  ...venueShops,
].map(normalizeShop)
