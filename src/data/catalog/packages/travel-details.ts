import { getPackageKind, type TravelPackageDetail } from './base'
import { legacyPackages } from './records'

export const travelPackageDetails: TravelPackageDetail[] = legacyPackages
  .filter((pkg) => getPackageKind(pkg) === 'TRAVEL')
  .map((pkg) => ({
    packageId: pkg.id,
    destination: pkg.destination ?? String(pkg.serviceMeta?.destination ?? ''),
    country: pkg.country ?? String(pkg.serviceMeta?.country ?? ''),
    durationDays: pkg.durationDays ?? 0,
    durationNights: pkg.durationNights ?? 0,
    travelMeta: pkg.travelMeta
      ? { ...pkg.travelMeta }
      : pkg.serviceMeta
        ? { ...pkg.serviceMeta }
        : undefined,
  }))
