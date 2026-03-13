import type { BookingRuleRecord } from './base'
import { legacyPackages } from './records'

const buildCancellationText = (bookingMeta: Record<string, unknown>) => {
  if (typeof bookingMeta.cancellationPolicyText === 'string') {
    return bookingMeta.cancellationPolicyText
  }

  const policy = bookingMeta.cancellationPolicy
  if (!policy || typeof policy !== 'object') {
    return null
  }

  const freeWithinHours = typeof (policy as { freeWithinHours?: unknown }).freeWithinHours === 'number'
    ? (policy as { freeWithinHours: number }).freeWithinHours
    : null
  const refundBeforeDays = typeof (policy as { refundBeforeDays?: unknown }).refundBeforeDays === 'number'
    ? (policy as { refundBeforeDays: number }).refundBeforeDays
    : null
  const noRefundWithinDays = typeof (policy as { noRefundWithinDays?: unknown }).noRefundWithinDays === 'number'
    ? (policy as { noRefundWithinDays: number }).noRefundWithinDays
    : null

  const parts = [
    freeWithinHours ? `Free cancellation within ${freeWithinHours} hours` : null,
    refundBeforeDays ? `refund available before ${refundBeforeDays} days` : null,
    noRefundWithinDays ? `no refund within ${noRefundWithinDays} days` : null,
  ].filter(Boolean)

  return parts.length > 0 ? parts.join('; ') + '.' : null
}

export const bookingRules: BookingRuleRecord[] = legacyPackages.map((pkg) => {
  const bookingMeta = (pkg.bookingMeta ?? {}) as Record<string, unknown>

  return {
    packageId: pkg.id,
    depositPercent: typeof bookingMeta.depositPercent === 'number' ? bookingMeta.depositPercent : null,
    peakSeasonMonths: Array.isArray(bookingMeta.peakSeasonMonths)
      ? bookingMeta.peakSeasonMonths.map((month) => String(month))
      : null,
    peakSeasonSurcharge:
      typeof bookingMeta.peakSeasonSurcharge === 'number'
        ? bookingMeta.peakSeasonSurcharge
        : typeof bookingMeta.peakSeasonSurchargePercent === 'number'
          ? bookingMeta.peakSeasonSurchargePercent
          : null,
    cancellationPolicyText: buildCancellationText(bookingMeta),
    availabilityNote: typeof bookingMeta.availabilityNote === 'string' ? bookingMeta.availabilityNote : null,
  }
})
