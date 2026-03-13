import type { ExtraSection } from '../../../types/catalog'
import { legacyPackages } from './records'

export const packageExtraSections: { packageId: string; section: ExtraSection; sortOrder: number }[] = legacyPackages.flatMap((pkg) =>
  (pkg.extraSections ?? []).map((section, index) => ({
    packageId: pkg.id,
    section,
    sortOrder: index,
  })),
)
