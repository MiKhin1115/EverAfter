import type { ReactNode } from 'react'

type StickyBottomBarProps = {
  price: number
  formatPrice: (value: number) => string
  ctaLabel: string
  onCtaClick?: () => void
  leftSlot?: ReactNode
}

export function StickyBottomBar({ price, formatPrice, ctaLabel, onCtaClick, leftSlot }: StickyBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-white/60 bg-white/90 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-[0_14px_28px_rgba(13,92,171,0.14)]">
        {leftSlot ?? (
          <div>
            <p className="text-xs text-[#6B7A90]">Total price</p>
            <p className="text-lg font-semibold text-[#0D5CAB]">
              {formatPrice(price)}
              <span className="text-[10px] font-semibold text-[#0D5CAB]/60"> MMK</span>
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(13,92,171,0.28)] transition-transform active:scale-[0.96]"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}
