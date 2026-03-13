import { Calculator } from 'lucide-react'

type StickyCTAProps = {
  totalMMK: number
  formatMMK: (value: number) => string
  ctaLabel: string
  onBookNow: () => void
  onOpenBudgetCalculator: () => void
}

export function StickyCTA({ totalMMK, formatMMK, ctaLabel, onBookNow, onOpenBudgetCalculator }: StickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-white/60 bg-white/90 px-4 py-3 backdrop-blur-md">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_28px_rgba(13,92,171,0.14)]">
        <div>
          <p className="text-xs text-[#6B7A90]">Estimated total</p>
          <p className="text-lg font-semibold text-[#0D5CAB]">
            {formatMMK(totalMMK)}
            <span className="text-[10px] font-semibold text-[#0D5CAB]/60"> MMK</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenBudgetCalculator}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1FB] text-[#0D5CAB] transition-colors hover:bg-[#CFE3FA] active:scale-[0.96]"
          aria-label="Open Budget Calculator"
        >
          <Calculator size={20} />
        </button>

        <button
          type="button"
          onClick={onBookNow}
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(13,92,171,0.28)] transition-transform active:scale-[0.96]"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}
