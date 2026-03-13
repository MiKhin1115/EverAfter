import { Star } from 'lucide-react'

type ReviewItem = {
  name: string
  note: string
}

type ReviewListProps = {
  reviews: ReviewItem[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="mt-3 space-y-3 text-sm text-slate-700">
      {reviews.map((review) => (
        <div key={review.name} className="rounded-2xl border border-[#E8F1FB] bg-[#F8FAFF] p-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">{review.name}</span>
            <span className="inline-flex items-center gap-1 text-xs text-[#0D5CAB]">
              <Star size={12} className="fill-[#F4C430] text-[#F4C430]" /> 5.0
            </span>
          </div>
          <p className="mt-2 text-sm text-[#6B7A90]">{review.note}</p>
        </div>
      ))}
    </div>
  )
}
