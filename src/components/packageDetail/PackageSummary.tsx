import { Clock, MapPin, Star } from 'lucide-react'
import type { Package } from '../../types/catalog'

type PackageSummaryProps = {
  pkg: Package
  formatMMK: (value: number) => string
}

export function PackageSummary({ pkg, formatMMK }: PackageSummaryProps) {
  return (
    <div className="mt-4 rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
      <h1 className="text-2xl font-semibold text-slate-900">{pkg.title}</h1>
      <p className="mt-1 text-sm text-[#6B7A90]">{pkg.vendorName}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1 text-[#0D5CAB]">
          <Star size={14} className="fill-[#F4C430] text-[#F4C430]" />
          {pkg.reviews[0]?.stars?.toFixed(1) ?? '4.8'} ({pkg.reviews.length} reviews)
        </span>
        <span className="text-[#6B7A90]">Starting from</span>
        <span className="text-lg font-semibold text-[#0D5CAB]">
          {formatMMK(pkg.priceMMK)} <span className="text-xs font-semibold text-[#0D5CAB]/60">MMK</span>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#6B7A90]">
        {pkg.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} className="text-[#0D5CAB]" /> {pkg.location}
          </span>
        )}
        {pkg.duration && (
          <span className="inline-flex items-center gap-1">
            <Clock size={14} className="text-[#0D5CAB]" /> {pkg.duration}
          </span>
        )}
        {pkg.guestRange && <span className="inline-flex items-center gap-1">{pkg.guestRange}</span>}
      </div>
    </div>
  )
}
