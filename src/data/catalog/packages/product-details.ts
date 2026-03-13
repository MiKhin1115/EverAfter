import { getPackageKind, type ProductPackageDetail } from './base'
import { legacyPackages } from './records'

export const productPackageDetails: ProductPackageDetail[] = legacyPackages
  .filter((pkg) => getPackageKind(pkg) === 'PRODUCT')
  .map((pkg) => ({
    packageId: pkg.id,
    priceUnit: pkg.priceUnit ?? null,
    purchaseMode: pkg.purchaseMode ?? null,
    rentalMinPriceMMK: pkg.rentalPriceMMKRange?.min ?? null,
    rentalMaxPriceMMK: pkg.rentalPriceMMKRange?.max ?? null,
    productMeta: pkg.productMeta ? { ...pkg.productMeta } : undefined,
  }))
