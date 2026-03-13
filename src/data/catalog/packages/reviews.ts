import type { PackageReviewRecord } from './base'
import { legacyPackages } from './records'

export const packageReviews: PackageReviewRecord[] = legacyPackages.flatMap((pkg) =>
  (pkg.reviews ?? []).map((review) => ({
    id: review.id,
    packageId: pkg.id,
    name: review.name,
    stars: review.stars,
    text: review.text,
    date: review.date,
  })),
)
