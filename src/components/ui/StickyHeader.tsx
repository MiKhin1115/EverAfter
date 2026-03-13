import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

type StickyHeaderProps = {
  title: string
  onBack: () => void
  rightSlot?: ReactNode
  subtitle?: ReactNode
  backIconSize?: number
  wrapperClassName?: string
  innerClassName?: string
  backButtonClassName?: string
  titleClassName?: string
}

export function StickyHeader({
  title,
  onBack,
  rightSlot,
  subtitle,
  backIconSize = 20,
  wrapperClassName = '',
  innerClassName = '',
  backButtonClassName = '',
  titleClassName = '',
}: StickyHeaderProps) {
  return (
    <header className={wrapperClassName}>
      <div className={innerClassName}>
        <button
          type="button"
          onClick={onBack}
          className={backButtonClassName}
          aria-label="Back"
        >
          <ArrowLeft size={backIconSize} />
        </button>
        <h1 className={titleClassName}>{title}</h1>
        {rightSlot}
      </div>
      {subtitle}
    </header>
  )
}
