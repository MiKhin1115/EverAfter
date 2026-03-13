import { Star } from 'lucide-react'
import type { Review } from '../../types/catalog'

type ReviewsProps = {
  reviews: Review[]
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="mt-5 rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Reviews</h2>
      <div className="mt-3 space-y-3 text-sm text-slate-700">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="rounded-2xl border border-[#E8F1FB] bg-[#F8FAFF] p-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">{review.name}</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#0D5CAB]">
                <Star size={12} className="fill-[#F4C430] text-[#F4C430]" /> {review.stars.toFixed(1)}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#6B7A90]">{review.text}</p>
            <p className="mt-1 text-[11px] text-[#7A93B8]">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
