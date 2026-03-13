import type { PackagePolicyRecord } from './base'
import { legacyPackages } from './records'

export const packagePolicies: PackagePolicyRecord[] = legacyPackages
  .filter((pkg) => Boolean(pkg.policies))
  .map((pkg) => ({
    packageId: pkg.id,
    about: pkg.policies?.about ?? '',
    deliverables: pkg.policies?.deliverables,
    timeline: pkg.policies?.timeline,
    cancellation: pkg.policies?.cancellation ?? '',
    reschedule: pkg.policies?.reschedule ?? '',
  }))
