import { getPackageKind, type ServicePackageDetail } from './base'
import { legacyPackages } from './records'

export const servicePackageDetails: ServicePackageDetail[] = legacyPackages
  .filter((pkg) => getPackageKind(pkg) === 'SERVICE')
  .map((pkg) => ({
    packageId: pkg.id,
    durationMinutes: pkg.durationMinutes ?? null,
    serviceMeta: pkg.serviceMeta ? { ...pkg.serviceMeta } : undefined,
  }))
